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
      key: 'MENU.HOME',
      label: 'Home',
      level: 1,
      icon: 'home',
      path: '/home',
      open: false,
      selected: false,
      disabled: false,
    },
    {
      key: 'MENU.DASHBOARD',
      label: 'Dashboard',
      level: 1,
      icon: 'dashboard',
      path: '/dashboard',
      open: false,
      selected: false,
      disabled: false,
    },
    {
      key: 'MENU.ANALYTICS',
      label: 'Analytics',
      level: 1,
      icon: 'bar-chart',
      path: '/analytics',
      open: false,
      selected: false,
      disabled: false,
    },
    {
      key: 'MENU.REPORTS',
      label: 'Reports',
      level: 1,
      icon: 'file-text',
      path: '/reports',
      open: false,
      selected: false,
      disabled: false,
    },
    {
      key: 'MENU.SECURITY',
      label: 'Security',
      level: 1,
      icon: 'safety',
      open: false,
      selected: false,
      disabled: false,
      children: [
        {
          key: 'MENU.USER_MANAGEMENT',
          label: 'User Management',
          level: 2,
          icon: 'user',
          path: '/users',
          open: false,
          selected: false,
          disabled: false,
        },
        {
          key: 'MENU.ROLE_MANAGEMENT',
          label: 'Role Management',
          level: 2,
          icon: 'team',
          path: '/roles',
          open: false,
          selected: false,
          disabled: false,
        },
        {
          key: 'MENU.PERMISSION_MANAGEMENT',
          label: 'Permission Management',
          level: 2,
          icon: 'safety-certificate',
          path: '/permissions',
          open: false,
          selected: false,
          disabled: false,
        },
        {
          key: 'MENU.AUDIT',
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
      key: 'MENU.NOTIFICATIONS',
      label: 'Notifications',
      level: 1,
      icon: 'bell',
      path: '/notifications',
      open: false,
      selected: false,
      disabled: false,
    },
    {
      key: 'MENU.OPERATIONS',
      label: 'Operations',
      level: 1,
      icon: 'appstore',
      open: false,
      selected: false,
      disabled: false,
      children: [
        {
          key: 'MENU.INVENTORY',
          label: 'Inventory',
          level: 2,
          icon: 'appstore',
          path: '/inventory',
          open: false,
          selected: false,
          disabled: false,
        },
        {
          key: 'MENU.ORDERS',
          label: 'Orders',
          level: 2,
          icon: 'shopping',
          path: '/orders',
          open: false,
          selected: false,
          disabled: false,
        },
        {
          key: 'MENU.CUSTOMERS',
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
      key: 'MENU.PRODUCTS',
      label: 'Products',
      level: 1,
      icon: 'database',
      path: '/products',
      open: false,
      selected: false,
      disabled: false,
    },
    {
      key: 'MENU.CATEGORIES',
      label: 'Categories',
      level: 1,
      icon: 'appstore',
      path: '/categories',
      open: false,
      selected: false,
      disabled: false,
    },
    {
      key: 'MENU.WAREHOUSES',
      label: 'Warehouses',
      level: 1,
      icon: 'home',
      path: '/warehouses',
      open: false,
      selected: false,
      disabled: false,
    },
    {
      key: 'MENU.SHIPPING',
      label: 'Shipping',
      level: 1,
      icon: 'car',
      path: '/shipping',
      open: false,
      selected: false,
      disabled: false,
    },
    {
      key: 'MENU.FINANCE',
      label: 'Finance',
      level: 1,
      icon: 'dollar',
      open: false,
      selected: false,
      disabled: false,
      children: [
        {
          key: 'MENU.BILLING',
          label: 'Billing',
          level: 2,
          icon: 'dollar',
          path: '/billing',
          open: false,
          selected: false,
          disabled: false,
        },
        {
          key: 'MENU.INVOICES',
          label: 'Invoices',
          level: 2,
          icon: 'file-text',
          path: '/invoices',
          open: false,
          selected: false,
          disabled: false,
        },
        {
          key: 'MENU.PAYMENTS',
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
      key: 'MENU.NESTED_DEMO',
      label: 'Nested Demo',
      level: 1,
      icon: 'appstore',
      open: false,
      selected: false,
      disabled: false,
      children: [
        {
          key: 'MENU.LEVEL2_ITEM1',
          label: 'Level 2 - Item 1',
          level: 2,
          icon: 'appstore',
          open: false,
          selected: false,
          disabled: false,
          children: [
            {
              key: 'MENU.LEVEL3_ITEM1',
              label: 'Level 3 - Item 1',
              level: 3,
              icon: 'appstore',
              path: '/nested/level3/item1',
              open: false,
              selected: false,
              disabled: false,
            },
            {
              key: 'MENU.LEVEL3_ITEM2',
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
          key: 'MENU.LEVEL2_ITEM2',
          label: 'Level 2 - Item 2',
          level: 2,
          icon: 'appstore',
          path: '/nested/level2/item2',
          open: false,
          selected: true,
          disabled: false,
        },
        {
          key: 'MENU.LEVEL2_ITEM3',
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
      key: 'MENU.SETTINGS',
      label: 'Settings',
      level: 1,
      icon: 'setting',
      path: '/settings',
      open: false,
      selected: false,
      disabled: false,
    },
  ];

  private selectedMenuItemKey = 'MENU.HOME';
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
