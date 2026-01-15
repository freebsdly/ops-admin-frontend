import { Component, ChangeDetectionStrategy, signal, inject, effect, DestroyRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzIconModule } from 'ng-zorro-antd/icon';

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
    // Map route to tab configuration
    const tabConfig = this.getTabConfigForPath(path);
    
    if (tabConfig) {
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
  }
  
  getTabConfigForPath(path: string): { key: string; label: string; icon?: string } | null {
    // Map paths to tab configurations
    const routeMap: Record<string, { key: string; label: string; icon?: string }> = {
      '/': { key: 'home', label: 'MENU.HOME', icon: 'home' },
      '/home': { key: 'home', label: 'MENU.HOME', icon: 'home' },
      '/dashboard': { key: 'dashboard', label: 'MENU.DASHBOARD', icon: 'dashboard' },
      '/analytics': { key: 'analytics', label: 'MENU.ANALYTICS', icon: 'bar-chart' },
      '/reports': { key: 'reports', label: 'MENU.REPORTS', icon: 'file-text' },
      '/users': { key: 'user-management', label: 'MENU.USER_MANAGEMENT', icon: 'user' },
      '/roles': { key: 'role-management', label: 'MENU.ROLE_MANAGEMENT', icon: 'team' },
      '/permissions': { key: 'permission-management', label: 'MENU.PERMISSION_MANAGEMENT', icon: 'safety-certificate' },
      '/audit': { key: 'audit', label: 'MENU.AUDIT', icon: 'database' },
      '/notifications': { key: 'notifications', label: 'MENU.NOTIFICATIONS', icon: 'bell' },
      '/inventory': { key: 'inventory', label: 'MENU.INVENTORY', icon: 'appstore' },
      '/orders': { key: 'orders', label: 'MENU.ORDERS', icon: 'shopping' },
      '/customers': { key: 'customers', label: 'MENU.CUSTOMERS', icon: 'team' },
      '/products': { key: 'products', label: 'MENU.PRODUCTS', icon: 'database' },
      '/categories': { key: 'categories', label: 'MENU.CATEGORIES', icon: 'appstore' },
      '/warehouses': { key: 'warehouses', label: 'MENU.WAREHOUSES', icon: 'home' },
      '/shipping': { key: 'shipping', label: 'MENU.SHIPPING', icon: 'car' },
      '/billing': { key: 'billing', label: 'MENU.BILLING', icon: 'dollar' },
      '/invoices': { key: 'invoices', label: 'MENU.INVOICES', icon: 'file-text' },
      '/payments': { key: 'payments', label: 'MENU.PAYMENTS', icon: 'credit-card' },
      '/nested/level3/item1': { key: 'level3-item1', label: 'MENU.LEVEL3_ITEM1', icon: 'appstore' },
      '/nested/level3/item2': { key: 'level3-item2', label: 'MENU.LEVEL3_ITEM2', icon: 'appstore' },
      '/nested/level2/item2': { key: 'level2-item2', label: 'MENU.LEVEL2_ITEM2', icon: 'appstore' },
      '/nested/level2/item3': { key: 'level2-item3', label: 'MENU.LEVEL2_ITEM3', icon: 'appstore' },
      '/settings': { key: 'settings', label: 'MENU.SETTINGS', icon: 'setting' },
      '/profile': { key: 'profile', label: 'LAYOUT.HEADER.PROFILE', icon: 'user' },
      '/test-loading': { key: 'test-loading', label: 'TEST.LOADING', icon: 'appstore' }
    };
    
    // Check exact match first
    if (routeMap[path]) {
      return routeMap[path];
    }
    
    // Check for dynamic routes (e.g., /users/123)
    const basePath = path.split('/').slice(0, 2).join('/') || '/';
    if (routeMap[basePath]) {
      const config = routeMap[basePath];
      return {
        key: config.key,
        label: config.label,
        icon: config.icon
      };
    }
    
    // Default fallback for unknown routes
    const routeName = path.split('/').pop() || 'page';
    return {
      key: `page-${routeName}`,
      label: `MENU.${routeName.toUpperCase()}`,
      icon: 'appstore'
    };
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