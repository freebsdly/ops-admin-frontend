import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';

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
    TranslateModule
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
              <span class="text-gray-600">{{ getIcon(tab.icon) }}</span>
            }
            <span>{{ tab.label | translate }}</span>
            @if (tab.closable !== false) {
              <button
                class="ml-1 text-gray-500 hover:text-gray-700"
                (click)="closeTab(i, $event)"
              >
                ×
              </button>
            }
          </button>
        }
        
        <!-- Add new tab button -->
        <button
          class="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          (click)="addTab()"
          title="{{ 'TABS.ADD_TOOLTIP' | translate }}"
        >
          +
        </button>
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
  
  // Default tabs configuration
  tabs = signal<TabItem[]>([
    { 
      key: 'dashboard',
      label: 'MENU.DASHBOARD',
      path: '/home',
      icon: 'dashboard',
      closable: false
    },
    { 
      key: 'user-management',
      label: 'MENU.USER_MANAGEMENT',
      path: '/users',
      icon: 'team'
    },
    { 
      key: 'reports',
      label: 'MENU.REPORTS',
      path: '/reports',
      icon: 'file-text'
    },
    { 
      key: 'settings',
      label: 'MENU.SETTINGS',
      path: '/settings',
      icon: 'setting'
    }
  ]);
  
  selectedIndex = signal(0);
  
  constructor() {
    // Monitor route changes to update active tab
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveTab();
    });
    
    // Initial tab update
    this.updateActiveTab();
  }
  
  getIcon(iconName?: string): string {
    // Map icon names to Ant Design icon names
    const iconMap: Record<string, string> = {
      home: '🏠',
      dashboard: '📊',
      'bar-chart': '📈',
      'file-text': '📄',
      user: '👤',
      team: '👥',
      safety: '🛡️',
      'safety-certificate': '📜',
      database: '🗄️',
      bell: '🔔',
      appstore: '📱',
      shopping: '🛒',
      car: '🚗',
      dollar: '💵',
      'credit-card': '💳',
      setting: '⚙️',
      file: '📁'
    };
    return iconMap[iconName || ''] || '📋';
  }
  
  updateActiveTab(): void {
    const currentPath = this.router.url.split('?')[0];
    const index = this.tabs().findIndex(tab => tab.path === currentPath);
    if (index !== -1) {
      this.selectedIndex.set(index);
    }
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
    
    // Don't close unclosable tabs
    if (tab && tab.closable === false) {
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
  
  addTab(): void {
    const newTab: TabItem = {
      key: `new-tab-${Date.now()}`,
      label: 'TABS.NEW_TAB',
      path: '/placeholder',
      icon: 'file'
    };
    
    const currentTabs = [...this.tabs(), newTab];
    this.tabs.set(currentTabs);
    this.selectedIndex.set(currentTabs.length - 1);
    this.router.navigate([newTab.path]);
  }
}