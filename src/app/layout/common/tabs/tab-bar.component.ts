import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
  effect,
  DestroyRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropdownModule, NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { RouteConfigService } from '@/app/services/route-config.service';
import { MenuService } from '@/app/services/menu.service';

export interface TabItem {
  key: string;
  label: string;
  path: string;
  icon?: string;
  closable?: boolean;
}

@Component({
  selector: 'app-tab-bar',
  imports: [TranslateModule, NzIconModule, NzDropdownModule, NzButtonModule, NzSpaceModule],
  template: `
    <div class="app-tab-bar">
      <div #tabContainer class="app-tab-bar-container">
        <div #tabsWrapper class="app-tab-bar-wrapper">
          @for (tab of visibleTabs(); track tab.key; let i = $index) {
          <button
            class="app-tab-bar-tab"
            [class.app-tab-bar-tab-active]="i === selectedIndex()"
            (click)="onTabClick(i)"
            (contextmenu)="onTabContextMenu(i, $event, tabManagementMenu)"
          >
            <div class="app-tab-bar-tab-content">
              @if (tab.icon) {
              <nz-icon class="app-tab-bar-tab-icon" [class.app-tab-bar-tab-icon-active]="i === selectedIndex()" [class.app-tab-bar-tab-icon-inactive]="i !== selectedIndex()" [nzType]="tab.icon" />
              }
              <span class="app-tab-bar-tab-label" [attr.title]="tab.label | translate">
                {{ tab.label | translate }}
              </span>
            </div>
            <button
              class="app-tab-bar-tab-close"
              [class.invisible]="tab.closable === false"
              [class.pointer-events-none]="tab.closable === false"
              (click)="tab.closable !== false ? closeTab(i, $event) : null"
            >
              ×
            </button>
          </button>
          }

          @if (overflowTabs().length > 0) {
          <button
            nz-dropdown
            [nzDropdownMenu]="overflowMenu"
            nzPlacement="bottomRight"
            class="app-tab-bar-overflow"
          >
            <nz-icon nzType="ellipsis" />
          </button>
          }
        </div>
      </div>
    </div>

    <!-- Overflow Tabs Dropdown Menu -->
    <nz-dropdown-menu #overflowMenu="nzDropdownMenu">
      <ul nz-menu>
        @for (tab of overflowTabs(); track tab.key; let i = $index) {
        <li nz-menu-item
          [class.ant-menu-item-selected]="tab.key === tabs()[selectedIndex()]?.key"
          (click)="onOverflowTabClick(tab)"
        >
          <span class="app-tab-bar-menu-item">
            @if (tab.icon) {
            <nz-icon class="app-tab-bar-menu-item-icon" [nzType]="tab.icon" />
            }
            <span>{{ tab.label | translate }}</span>
          </span>
        </li>
        }
      </ul>
    </nz-dropdown-menu>

    <!-- Tab Management Dropdown Menu -->
    <nz-dropdown-menu #tabManagementMenu="nzDropdownMenu">
      <ul nz-menu>
        <li nz-menu-item 
          (click)="closeCurrentTab()" 
          [nzDisabled]="!isTabClosable()">
          <span>{{ 'TABS.MANAGEMENT.CLOSE_CURRENT_TAB' | translate }}</span>
        </li>
        <li nz-menu-item 
          (click)="closeOtherTabs()">
          <span>{{ 'TABS.MANAGEMENT.CLOSE_OTHER_TABS' | translate }}</span>
        </li>
        <li nz-menu-item (click)="closeAllTabs()">
          <span>{{ 'TABS.MANAGEMENT.CLOSE_ALL_TABS' | translate }}</span>
        </li>
        <li nz-menu-divider></li>
        <li nz-menu-item (click)="reloadCurrentTab()">
          <span>{{ 'TABS.MANAGEMENT.RELOAD_CURRENT_TAB' | translate }}</span>
        </li>
        <li nz-menu-divider></li>
        <li nz-menu-item 
          (click)="pinCurrentTab()" 
          [nzDisabled]="isTabPinned() || isTabDefault()">
          <span>{{ 'TABS.MANAGEMENT.PIN_CURRENT_TAB' | translate }}</span>
        </li>
        <li nz-menu-item 
          (click)="unpinCurrentTab()" 
          [nzDisabled]="!isTabPinned()">
          <span>{{ 'TABS.MANAGEMENT.UNPIN_CURRENT_TAB' | translate }}</span>
        </li>
      </ul>
    </nz-dropdown-menu>
  `,
  styleUrl: './tab-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTabBar {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly routeConfigService = inject(RouteConfigService);
  private readonly menuService = inject(MenuService);
  private readonly contextMenuService = inject(NzContextMenuService);
  private readonly tabsStorageKey = 'app_tabs';

  @ViewChild('tabContainer') tabContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('tabsWrapper') tabsWrapper!: ElementRef<HTMLDivElement>;

  private resizeObserver: ResizeObserver | null = null;

  // Initialize tabs from localStorage or with default home tab
  tabs = signal<TabItem[]>(this.loadTabsFromStorage());

  visibleTabs = computed(() => {
    const allTabs = this.tabs();
    return allTabs.slice(0, this.maxVisibleTabs());
  });

  overflowTabs = computed(() => {
    const allTabs = this.tabs();
    return allTabs.slice(this.maxVisibleTabs());
  });

  maxVisibleTabs = signal(10);

  selectedIndex = signal(this.loadSelectedIndexFromStorage());
  contextMenuIndex = signal(0);

  constructor() {
    // Monitor route changes to update active tab and add new tabs
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.handleRouteChange();
      });

    // Save tabs to localStorage when they change
    effect(() => {
      const currentTabs = this.tabs();
      const currentIndex = this.selectedIndex();
      this.saveTabsToStorage(currentTabs, currentIndex);
    });

    // Initial tab update
    this.handleRouteChange();
  }

  ngAfterViewInit() {
    // Observe container size to adjust visible tabs
    this.resizeObserver = new ResizeObserver(() => {
      this.calculateVisibleTabs();
    });

    if (this.tabContainer) {
      this.resizeObserver.observe(this.tabContainer.nativeElement);
    }
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private calculateVisibleTabs(): void {
    if (!this.tabContainer || !this.tabsWrapper) {
      return;
    }

    const containerWidth = this.tabContainer.nativeElement.clientWidth;
    const tabWidth = 144; // average of min-width (8rem) and max-width (10rem)
    const dropdownWidth = 32; // approx width for dropdown button
    const gap = 4; // 0.125rem gap between tabs
    const padding = 16; // 0.5rem padding on container
    const availableWidth = containerWidth - dropdownWidth - padding * 2;
    const maxTabs = Math.floor((availableWidth + gap) / (tabWidth + gap));

    this.maxVisibleTabs.set(Math.max(1, maxTabs));
  }

  private loadTabsFromStorage(): TabItem[] {
    try {
      const stored = localStorage.getItem(this.tabsStorageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure we always have at least the home tab
        const tabs = parsed.tabs || [];
        const hasHome = tabs.some((tab: TabItem) => tab.key === 'home');

        if (!hasHome) {
          return [
            {
              key: 'home',
              label: 'MENU.HOME',
              path: '/home',
              icon: 'home',
              closable: false,
            },
            ...tabs,
          ];
        }
        return tabs;
      }
    } catch (error) {
      console.error('Error loading tabs from storage:', error);
    }

    // Default tab if no storage or error
    return [
      {
        key: 'home',
        label: 'MENU.HOME',
        path: '/home',
        icon: 'home',
        closable: false,
      },
    ];
  }

  private loadSelectedIndexFromStorage(): number {
    try {
      const stored = localStorage.getItem(this.tabsStorageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.selectedIndex || 0;
      }
    } catch (error) {
      console.error('Error loading selected index from storage:', error);
    }
    return 0;
  }

  private saveTabsToStorage(tabs: TabItem[], selectedIndex: number): void {
    try {
      const data = {
        tabs: tabs,
        selectedIndex: selectedIndex,
      };
      localStorage.setItem(this.tabsStorageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving tabs to storage:', error);
    }
  }

  handleRouteChange(): void {
    const currentPath = this.router.url.split('?')[0];

    // Don't handle tabs for login route
    if (currentPath === '/login') {
      return;
    }

    const currentTab = this.tabs().find((tab) => tab.path === currentPath);

    // If we're at a new route that's not already a tab, add it
    if (!currentTab) {
      this.addTabFromRoute(currentPath);
    }

    // Update selected index
    const index = this.tabs().findIndex((tab) => tab.path === currentPath);
    if (index !== -1) {
      this.selectedIndex.set(index);
      // Notify MenuService to select corresponding menu item
      this.menuService.selectMenuItemByPath(currentPath);
    }
  }

  addTabFromRoute(path: string): void {
    // Don't add tab for login route
    if (path === '/login') {
      return;
    }

    // Get tab configuration from unified service
    const tabConfig = this.routeConfigService.getTabConfig(path);

    const existingTabIndex = this.tabs().findIndex((tab) => tab.key === tabConfig.key);

    if (existingTabIndex === -1) {
      // Add new tab
      const newTab: TabItem = {
        key: tabConfig.key,
        label: tabConfig.label,
        path: path,
        icon: tabConfig.icon,
        closable: true,
      };

      const currentTabs = [...this.tabs(), newTab];
      this.tabs.set(currentTabs);
      this.selectedIndex.set(currentTabs.length - 1);
    } else {
      // Tab already exists, just activate it
      this.selectedIndex.set(existingTabIndex);
    }
  }

  isDefaultTab(key: string): boolean {
    return ['home'].includes(key);
  }

  isTabClosable(): boolean {
    const currentTab = this.tabs()[this.contextMenuIndex()];
    return currentTab ? currentTab.closable !== false : false;
  }

  isTabPinned(): boolean {
    const currentTab = this.tabs()[this.contextMenuIndex()];
    return currentTab ? currentTab.closable === false : false;
  }

  isTabDefault(): boolean {
    const currentTab = this.tabs()[this.contextMenuIndex()];
    return currentTab ? this.isDefaultTab(currentTab.key) : false;
  }

  onTabClick(index: number): void {
    this.selectedIndex.set(index);
    const tab = this.tabs()[index];
    if (tab && tab.path) {
      this.router.navigate([tab.path]);
    }
  }

  onOverflowTabClick(tab: TabItem): void {
    // Find the actual index in all tabs
    const index = this.tabs().findIndex((t) => t.key === tab.key);
    if (index !== -1) {
      this.onTabClick(index);
    }
  }

  closeTab(index: number, event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }

    const tab = this.tabs()[index];

    // Don't close if tab is marked as non-closable
    if (tab && tab.closable === false) {
      return;
    }

    const currentTabs = [...this.tabs()];
    currentTabs.splice(index, 1);
    this.tabs.set(currentTabs);

    const currentSelectedIndex = this.selectedIndex();
    
    // Update selected index if closed tab was before the selected tab
    if (index < currentSelectedIndex) {
      // Selected tab moves left
      this.selectedIndex.set(currentSelectedIndex - 1);
    } else if (index === currentSelectedIndex) {
      // Closed tab was active, navigate to next available tab or default
      if (currentTabs.length > 0) {
        const newIndex = Math.min(index, currentTabs.length - 1);
        this.selectedIndex.set(newIndex);
        this.router.navigate([currentTabs[newIndex].path]);
      } else {
        // Default to dashboard if no tabs left
        this.router.navigate(['/home']);
      }
    }
    // If index > currentSelectedIndex, selected index stays the same
  }

  onTabContextMenu(index: number, event: MouseEvent, menu: NzDropdownMenuComponent): void {
    event.preventDefault();
    event.stopPropagation();
    this.contextMenuIndex.set(index);
    
    // Show the context menu using the service
    this.contextMenuService.create(event, menu);
  }

  // Tab Management Methods
  closeCurrentTab(): void {
    const currentIndex = this.contextMenuIndex();
    if (currentIndex >= 0 && currentIndex < this.tabs().length) {
      this.closeTab(currentIndex);
    }
  }

  closeOtherTabs(): void {
    const currentIndex = this.contextMenuIndex();
    const currentTab = this.tabs()[currentIndex];

    if (currentTab) {
      // Keep only the current tab and default tabs
      const defaultTabs = this.tabs().filter((tab) => this.isDefaultTab(tab.key));
      const newTabs = [...defaultTabs, currentTab];

      // Remove duplicates if current tab is already a default tab
      const uniqueTabs = newTabs.filter(
        (tab, index, self) => index === self.findIndex((t) => t.key === tab.key)
      );

      this.tabs.set(uniqueTabs);

      // Update selected index to the current tab's new position and navigate
      const newIndex = uniqueTabs.findIndex((tab) => tab.key === currentTab.key);
      if (newIndex !== -1) {
        this.selectedIndex.set(newIndex);
        // Navigate to the current tab's path
        this.router.navigate([currentTab.path]);
      }
    }
  }

  closeAllTabs(): void {
    // Keep only default tabs (home)
    const defaultTabs = this.tabs().filter((tab) => this.isDefaultTab(tab.key));
    this.tabs.set(defaultTabs);
    this.selectedIndex.set(0);

    // Navigate to home if not already there
    if (this.router.url !== '/home') {
      this.router.navigate(['/home']);
    }
  }

  reloadCurrentTab(): void {
    const currentTab = this.tabs()[this.contextMenuIndex()];
    if (currentTab && currentTab.path) {
      this.router.navigate([currentTab.path]).then(() => {
        // Force a hard reload of the component
        window.location.reload();
      });
    }
  }

  duplicateCurrentTab(): void {
    const currentIndex = this.contextMenuIndex();
    const currentTab = this.tabs()[currentIndex];

    if (currentTab && currentTab.closable !== false) {
      // Create a duplicate tab with a unique key
      const duplicateTab: TabItem = {
        ...currentTab,
        key: `${currentTab.key}-copy-${Date.now()}`,
      };

      const currentTabs = [...this.tabs(), duplicateTab];
      this.tabs.set(currentTabs);
      this.selectedIndex.set(currentTabs.length - 1);

      // Navigate to the duplicated tab's path
      this.router.navigate([duplicateTab.path]);
    }
  }

  pinCurrentTab(): void {
    const currentIndex = this.contextMenuIndex();
    const currentTab = this.tabs()[currentIndex];

    if (currentTab && currentTab.closable !== false) {
      // For now, we'll just make the tab non-closable (pinned)
      const updatedTabs = [...this.tabs()];
      updatedTabs[currentIndex] = {
        ...currentTab,
        closable: false,
      };

      this.tabs.set(updatedTabs);
    }
  }

  unpinCurrentTab(): void {
    const currentIndex = this.contextMenuIndex();
    const currentTab = this.tabs()[currentIndex];

    if (currentTab && currentTab.closable === false) {
      // Make the tab closable again (unpinned)
      const updatedTabs = [...this.tabs()];
      updatedTabs[currentIndex] = {
        ...currentTab,
        closable: true,
      };

      this.tabs.set(updatedTabs);
    }
  }
}
