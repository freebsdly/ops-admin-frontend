import { Component, ChangeDetectionStrategy, signal, inject, effect, DestroyRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzIconModule } from 'ng-zorro-antd/icon';
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
  imports: [
    TranslateModule,
    NzIconModule
  ],
  template: `
    <div class="bg-white border-b border-gray-200">
      <div class="flex items-center h-10 px-4 space-x-2 overflow-x-auto">
        @for (tab of tabs(); track tab.key; let i = $index) {
          <button
            class="flex items-center gap-2 px-3 py-1.5 rounded-t-md text-xs font-medium transition-colors whitespace-nowrap"
            [class]="i === selectedIndex() ? 
              'bg-white text-blue-600 border-t border-l border-r border-gray-300 shadow-sm' : 
              'bg-gray-100 text-gray-700 hover:bg-gray-200'"
            (click)="onTabClick(i)"
          >
            @if (tab.icon) {
              <nz-icon [nzType]="tab.icon" class="text-gray-600" />
            }
            <span>{{ tab.label | translate }}</span>
            @if (tab.closable !== false && !isDefaultTab(tab.key)) {
              <button
                class="ml-1 text-gray-500 hover:text-gray-700"
                (click)="closeTab(i, $event)"
              >
                ×
              </button>
            }
          </button>
        }
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Tabs {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly routeConfigService = inject(RouteConfigService);
  
  // Default tabs configuration
  tabs = signal<TabItem[]>([
    { 
      key: 'home',
      label: 'MENU.HOME',
      path: '/home',
      icon: 'home',
      closable: false
    }
  ]);
  
  selectedIndex = signal(0);
  
  constructor() {
    // Monitor route changes to update active tab and add new tabs
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntilDestroyed()
    ).subscribe(() => {
      this.handleRouteChange();
    });
    
    // Initial tab update
    this.handleRouteChange();
  }
  
  handleRouteChange(): void {
    const currentPath = this.router.url.split('?')[0];
    const currentTab = this.tabs().find(tab => tab.path === currentPath);
    
    // If we're at a new route that's not already a tab, add it
    if (!currentTab) {
      this.addTabFromRoute(currentPath);
    }
    
    // Update selected index
    const index = this.tabs().findIndex(tab => tab.path === currentPath);
    if (index !== -1) {
      this.selectedIndex.set(index);
    }
  }
  
  addTabFromRoute(path: string): void {
    // Get tab configuration from unified service
    const tabConfig = this.routeConfigService.getTabConfig(path);
    
    const existingTabIndex = this.tabs().findIndex(tab => tab.key === tabConfig.key);
    
    if (existingTabIndex === -1) {
      // Add new tab
      const newTab: TabItem = {
        key: tabConfig.key,
        label: tabConfig.label,
        path: path,
        icon: tabConfig.icon,
        closable: true
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
}