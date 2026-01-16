import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  effect,
  DestroyRef,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { RouteConfigService } from '../../services/route-config.service';

export interface TabItem {
  key: string;
  label: string;
  path: string;
  icon?: string;
  closable?: boolean;
}

@Component({
  selector: 'app-tabs',
  imports: [TranslateModule, NzIconModule, NzDropdownModule, NzButtonModule, NzSpaceModule],
  template: `
    <div class="bg-gray-100 border-b border-gray-200">
      <div
        class="tab-container flex items-center h-8 px-4 overflow-x-auto overflow-y-hidden"
      >
        <!-- Hidden dropdown trigger for context menu -->
        <div
          nz-dropdown
          [nzDropdownMenu]="tabManagementMenu"
          nzTrigger="click"
          class="!opacity-0 !pointer-events-none"
        >
          <button #dropdownTrigger nz-button nzType="text" class="!w-0 !h-0 !p-0 !opacity-0"></button>
        </div>

        <nz-space [nzSize]="1">
          @for (tab of tabs(); track tab.key; let i = $index) {
        <button
          class="flex items-center gap-2 px-3 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap"
          [class]="
            i === selectedIndex()
              ? 'bg-white text-blue-600 border-t-2 border-blue-500 border-b-0'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-b border-gray-300'
          "
          (click)="onTabClick(i)"
          (contextmenu)="onTabContextMenu(i, $event)"
        >
          @if (tab.icon) {
          <nz-icon [nzType]="tab.icon" class="text-gray-600" />
          }
          <span>{{ tab.label | translate }}</span>
          @if (tab.closable !== false && !isDefaultTab(tab.key)) {
          <button class="ml-1 text-gray-500 hover:text-gray-700" (click)="closeTab(i, $event)">
            ×
          </button>
          }
        </button>
          }
        </nz-space>
      </div>
    </div>

    <!-- Tab Management Dropdown Menu -->
    <nz-dropdown-menu #tabManagementMenu="nzDropdownMenu">
      <ul nz-menu>
        <li nz-menu-item (click)="closeCurrentTab()">
          <span>{{ 'TABS.MANAGEMENT.CLOSE_CURRENT_TAB' | translate }}</span>
        </li>
        <li nz-menu-item (click)="closeOtherTabs()">
          <span>{{ 'TABS.MANAGEMENT.CLOSE_OTHER_TABS' | translate }}</span>
        </li>
        <li nz-menu-item (click)="closeAllTabs()">
          <span>{{ 'TABS.MANAGEMENT.CLOSE_ALL_TABS' | translate }}</span>
        </li>
        <li nz-menu-divider></li>
        <li nz-menu-item (click)="reloadCurrentTab()">
          <span>{{ 'TABS.MANAGEMENT.RELOAD_CURRENT_TAB' | translate }}</span>
        </li>
        <li nz-menu-item (click)="duplicateCurrentTab()">
          <span>{{ 'TABS.MANAGEMENT.DUPLICATE_CURRENT_TAB' | translate }}</span>
        </li>
        <li nz-menu-divider></li>
        <li nz-menu-item (click)="pinCurrentTab()">
          <span>{{ 'TABS.MANAGEMENT.PIN_CURRENT_TAB' | translate }}</span>
        </li>
        <li nz-menu-item (click)="unpinCurrentTab()">
          <span>{{ 'TABS.MANAGEMENT.UNPIN_CURRENT_TAB' | translate }}</span>
        </li>
      </ul>
    </nz-dropdown-menu>
  `,
  styles: `
    :host {
      display: block;
    }

    /* Hide scrollbar for tab container */
    .tab-container::-webkit-scrollbar {
      display: none;
    }

    .tab-container {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
      scroll-behavior: smooth;
    }

    /* Ensure tab buttons don't shrink and maintain consistent appearance */
    .tab-container button {
      flex-shrink: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tabs {
  @ViewChild('dropdownTrigger') dropdownTrigger!: ElementRef<HTMLButtonElement>;
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly routeConfigService = inject(RouteConfigService);
  private readonly tabsStorageKey = 'app_tabs';

  // Initialize tabs from localStorage or with default home tab
  tabs = signal<TabItem[]>(this.loadTabsFromStorage());

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

  onTabClick(index: number): void {
    this.selectedIndex.set(index);
    const tab = this.tabs()[index];
    if (tab && tab.path) {
      this.router.navigate([tab.path]);
    }
  }

  closeTab(index: number, event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }

    const tab = this.tabs()[index];

    // Don't close default tabs (dashboard/home)
    if (tab && this.isDefaultTab(tab.key)) {
      return;
    }

    const currentTabs = [...this.tabs()];
    currentTabs.splice(index, 1);
    this.tabs.set(currentTabs);

    // If closed tab was active, navigate to next available tab or default
    if (index === this.selectedIndex()) {
      if (currentTabs.length > 0) {
        const newIndex = Math.min(index, currentTabs.length - 1);
        this.selectedIndex.set(newIndex);
        this.router.navigate([currentTabs[newIndex].path]);
      } else {
        // Default to dashboard if no tabs left
        this.router.navigate(['/home']);
      }
    }
  }

  onTabContextMenu(index: number, event: MouseEvent): void {
    event.preventDefault();
    this.contextMenuIndex.set(index);
    // Programmatically trigger dropdown
    if (this.dropdownTrigger && this.dropdownTrigger.nativeElement) {
      this.dropdownTrigger.nativeElement.click();
    }
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

    if (currentTab && !this.isDefaultTab(currentTab.key)) {
      // Keep only the current tab and default tabs
      const defaultTabs = this.tabs().filter((tab) => this.isDefaultTab(tab.key));
      const newTabs = [...defaultTabs, currentTab];

      // Remove duplicates if current tab is already a default tab
      const uniqueTabs = newTabs.filter(
        (tab, index, self) => index === self.findIndex((t) => t.key === tab.key)
      );

      this.tabs.set(uniqueTabs);

      // Update selected index to the current tab's new position
      const newIndex = uniqueTabs.findIndex((tab) => tab.key === currentTab.key);
      if (newIndex !== -1) {
        this.selectedIndex.set(newIndex);
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

    if (currentTab && currentTab.closable !== false && !this.isDefaultTab(currentTab.key)) {
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

    if (currentTab && !this.isDefaultTab(currentTab.key)) {
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

    if (currentTab && !this.isDefaultTab(currentTab.key)) {
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
