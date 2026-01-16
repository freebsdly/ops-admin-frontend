import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';

export interface MenuItem {
  key: string;
  label: string;
  level: number;
  icon?: string;
  path?: string;
  children?: MenuItem[];
  open?: boolean;
  selected?: boolean;
  disabled?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuData: MenuItem[] = [
    {
      key: 'home',
      label: 'Home',
      level: 1,
      icon: 'home',
      path: '/home',
      open: false,
      selected: false,
      disabled: false,
    },
    {
      key: 'dashboard',
      label: 'Dashboard',
      level: 1,
      icon: 'dashboard',
      path: '/dashboard',
      open: false,
      selected: false,
      disabled: false,
    },
    {
      key: 'analytics',
      label: 'Analytics',
      level: 1,
      icon: 'bar-chart',
      path: '/analytics',
      open: false,
      selected: false,
      disabled: false,
    },
    {
      key: 'reports',
      label: 'Reports',
      level: 1,
      icon: 'file-text',
      path: '/reports',
      open: false,
      selected: false,
      disabled: false,
    },
    {
      key: 'security',
      label: 'Security',
      level: 1,
      icon: 'safety',
      open: false,
      selected: false,
      disabled: false,
      children: [
        {
          key: 'users',
          label: 'User Management',
          level: 2,
          icon: 'user',
          path: '/users',
          open: false,
          selected: false,
          disabled: false,
        },
        {
          key: 'roles',
          label: 'Role Management',
          level: 2,
          icon: 'team',
          path: '/roles',
          open: false,
          selected: false,
          disabled: false,
        },
        {
          key: 'permissions',
          label: 'Permission Management',
          level: 2,
          icon: 'safety-certificate',
          path: '/permissions',
          open: false,
          selected: false,
          disabled: false,
        },
        {
          key: 'audit',
          label: 'Audit Log',
          level: 2,
          icon: 'database',
          path: '/audit',
          open: false,
          selected: false,
          disabled: false,
        },
      ],
    },
    {
      key: 'notifications',
      label: 'Notifications',
      level: 1,
      icon: 'bell',
      path: '/notifications',
      open: false,
      selected: false,
      disabled: false,
    },
    {
      key: 'operations',
      label: 'Operations',
      level: 1,
      icon: 'appstore',
      open: false,
      selected: false,
      disabled: false,
      children: [
        {
          key: 'inventory',
          label: 'Inventory',
          level: 2,
          icon: 'appstore',
          path: '/inventory',
          open: false,
          selected: false,
          disabled: false,
        },
        {
          key: 'orders',
          label: 'Orders',
          level: 2,
          icon: 'shopping',
          path: '/orders',
          open: false,
          selected: false,
          disabled: false,
        },
        {
          key: 'customers',
          label: 'Customers',
          level: 2,
          icon: 'team',
          path: '/customers',
          open: false,
          selected: false,
          disabled: false,
        },
      ],
    },
    {
      key: 'products',
      label: 'Products',
      level: 1,
      icon: 'database',
      path: '/products',
      open: false,
      selected: false,
      disabled: false,
    },
    {
      key: 'categories',
      label: 'Categories',
      level: 1,
      icon: 'appstore',
      path: '/categories',
      open: false,
      selected: false,
      disabled: false,
    },
    {
      key: 'warehouses',
      label: 'Warehouses',
      level: 1,
      icon: 'home',
      path: '/warehouses',
      open: false,
      selected: false,
      disabled: false,
    },
    {
      key: 'shipping',
      label: 'Shipping',
      level: 1,
      icon: 'car',
      path: '/shipping',
      open: false,
      selected: false,
      disabled: false,
    },
    {
      key: 'finance',
      label: 'Finance',
      level: 1,
      icon: 'dollar',
      open: false,
      selected: false,
      disabled: false,
      children: [
        {
          key: 'billing',
          label: 'Billing',
          level: 2,
          icon: 'dollar',
          path: '/billing',
          open: false,
          selected: false,
          disabled: false,
        },
        {
          key: 'invoices',
          label: 'Invoices',
          level: 2,
          icon: 'file-text',
          path: '/invoices',
          open: false,
          selected: false,
          disabled: false,
        },
        {
          key: 'payments',
          label: 'Payments',
          level: 2,
          icon: 'credit-card',
          path: '/payments',
          open: false,
          selected: false,
          disabled: false,
        },
      ],
    },
    {
      key: 'nested-demo',
      label: 'Nested Demo',
      level: 1,
      icon: 'appstore',
      open: false,
      selected: false,
      disabled: false,
      children: [
        {
          key: 'level2-item1',
          label: 'Level 2 - Item 1',
          level: 2,
          icon: 'appstore',
          open: false,
          selected: false,
          disabled: false,
          children: [
            {
              key: 'level3-item1',
              label: 'Level 3 - Item 1',
              level: 3,
              icon: 'appstore',
              path: '/nested/level3/item1',
              open: false,
              selected: false,
              disabled: false,
            },
            {
              key: 'level3-item2',
              label: 'Level 3 - Item 2',
              level: 3,
              icon: 'appstore',
              path: '/nested/level3/item2',
              open: false,
              selected: false,
              disabled: true,
            }
          ]
        },
        {
          key: 'level2-item2',
          label: 'Level 2 - Item 2',
          level: 2,
          icon: 'appstore',
          path: '/nested/level2/item2',
          open: false,
          selected: true,
          disabled: false,
        },
        {
          key: 'level2-item3',
          label: 'Level 2 - Item 3',
          level: 2,
          icon: 'appstore',
          path: '/nested/level2/item3',
          open: false,
          selected: false,
          disabled: false,
        }
      ]
    },
    {
      key: 'settings',
      label: 'Settings',
      level: 1,
      icon: 'setting',
      path: '/settings',
      open: false,
      selected: false,
      disabled: false,
    },
  ];

  private selectedMenuItemKey = 'home';
  private menuDataSubject = new BehaviorSubject<MenuItem[]>(this.menuData);

  constructor() {
    this.updateMenuSelection();
  }

  getMenuData(): Observable<MenuItem[]> {
    return this.menuDataSubject.asObservable();
  }

  getMenuByKey(key: string): Observable<MenuItem | undefined> {
    const menuItem = this.menuData.find(item => item.key === key);
    return of(menuItem);
  }

  selectMenuItemByKey(key: string): void {
    this.selectedMenuItemKey = key;
    this.updateMenuSelection();
  }

  selectMenuItemByPath(path: string): void {
    const menuItem = this.findMenuItemByPath(this.menuData, path);
    if (menuItem) {
      this.selectedMenuItemKey = menuItem.key;
      this.updateMenuSelection();
    }
  }

  private findMenuItemByPath(items: MenuItem[], path: string): MenuItem | undefined {
    for (const item of items) {
      if (item.path === path) {
        return item;
      }
      if (item.children) {
        const found = this.findMenuItemByPath(item.children, path);
        if (found) {
          return found;
        }
      }
    }
    return undefined;
  }

  private updateMenuSelection(): void {
    const selectedKey = this.selectedMenuItemKey;
    
    const updateSelection = (items: MenuItem[]): MenuItem[] => {
      return items.map(item => {
        const isSelected = item.key === selectedKey;
        
        const updatedItem: MenuItem = {
          ...item,
          selected: isSelected,
        };
        
        if (item.children && item.children.length > 0) {
          updatedItem.children = updateSelection(item.children);
        }
        
        return updatedItem;
      });
    };
    
    this.menuData = updateSelection(this.menuData);
    this.menuDataSubject.next(this.menuData);
  }
}
