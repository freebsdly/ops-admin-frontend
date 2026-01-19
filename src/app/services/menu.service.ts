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
    // Layer 1: Home Module
    {
      key: 'MENU.HOME',
      label: 'Home',
      level: 1,
      icon: 'home',
      open: false,
      selected: false,
      disabled: false,
      children: [
        {
          key: 'MENU.HOME_DASHBOARD',
          label: 'Dashboard',
          level: 2,
          icon: 'home',
          path: '/home',
          open: false,
          selected: false,
          disabled: false,
        },
      ],
    },

    // Layer 1: Dashboard Module
    {
      key: 'MENU.DASHBOARD',
      label: 'Dashboard',
      level: 1,
      icon: 'dashboard',
      open: false,
      selected: false,
      disabled: false,
      children: [
        {
          key: 'MENU.DASHBOARD_OVERVIEW',
          label: 'Overview',
          level: 2,
          icon: 'dashboard',
          path: '/dashboard',
          open: false,
          selected: false,
          disabled: false,
        },
        {
          key: 'MENU.ANALYTICS',
          label: 'Analytics',
          level: 2,
          icon: 'bar-chart',
          open: false,
          selected: false,
          disabled: false,
          children: [
            {
              key: 'MENU.ANALYTICS_TRAFFIC',
              label: 'Traffic',
              level: 3,
              icon: 'bar-chart',
              path: '/analytics/traffic',
              open: false,
              selected: false,
              disabled: false,
            },
            {
              key: 'MENU.ANALYTICS_PERFORMANCE',
              label: 'Performance',
              level: 3,
              icon: 'bar-chart',
              path: '/analytics/performance',
              open: false,
              selected: false,
              disabled: false,
            },
            {
              key: 'MENU.ANALYTICS_CONVERSIONS',
              label: 'Conversions',
              level: 3,
              icon: 'bar-chart',
              path: '/analytics/conversions',
              open: false,
              selected: false,
              disabled: false,
            },
          ],
        },
        {
          key: 'MENU.REPORTS',
          label: 'Reports',
          level: 2,
          icon: 'file-text',
          open: false,
          selected: false,
          disabled: false,
          children: [
            {
              key: 'MENU.REPORTS_SYSTEM',
              label: 'System Reports',
              level: 3,
              icon: 'file-text',
              path: '/reports/system',
              open: false,
              selected: false,
              disabled: false,
            },
            {
              key: 'MENU.REPORTS_USERS',
              label: 'User Reports',
              level: 3,
              icon: 'file-text',
              path: '/reports/users',
              open: false,
              selected: false,
              disabled: false,
            },
            {
              key: 'MENU.REPORTS_PERFORMANCE',
              label: 'Performance Reports',
              level: 3,
              icon: 'file-text',
              path: '/reports/performance',
              open: false,
              selected: false,
              disabled: false,
            },
          ],
        },
      ],
    },

    // Layer 1: Security Module
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
          label: 'Permissions',
          level: 2,
          icon: 'safety-certificate',
          open: false,
          selected: false,
          disabled: false,
          children: [
            {
              key: 'MENU.PERMISSIONS_USERS',
              label: 'User Permissions',
              level: 3,
              icon: 'safety-certificate',
              path: '/permissions/users',
              open: false,
              selected: false,
              disabled: false,
            },
            {
              key: 'MENU.PERMISSIONS_ROLES',
              label: 'Role Permissions',
              level: 3,
              icon: 'safety-certificate',
              path: '/permissions/roles',
              open: false,
              selected: false,
              disabled: false,
            },
          ],
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

    // Layer 1: Operations Module
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
          open: false,
          selected: false,
          disabled: false,
          children: [
            {
              key: 'MENU.ORDERS_ALL',
              label: 'All Orders',
              level: 3,
              icon: 'shopping',
              path: '/orders/all',
              open: false,
              selected: false,
              disabled: false,
            },
            {
              key: 'MENU.ORDERS_PENDING',
              label: 'Pending',
              level: 3,
              icon: 'shopping',
              path: '/orders/pending',
              open: false,
              selected: false,
              disabled: false,
            },
            {
              key: 'MENU.ORDERS_COMPLETED',
              label: 'Completed',
              level: 3,
              icon: 'shopping',
              path: '/orders/completed',
              open: false,
              selected: false,
              disabled: false,
            },
          ],
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

    // Layer 1: Products Module
    {
      key: 'MENU.PRODUCTS',
      label: 'Products',
      level: 1,
      icon: 'database',
      open: false,
      selected: false,
      disabled: false,
      children: [
        {
          key: 'MENU.PRODUCTS_LIST',
          label: 'Products',
          level: 2,
          icon: 'database',
          path: '/products',
          open: false,
          selected: false,
          disabled: false,
        },
        {
          key: 'MENU.CATEGORIES',
          label: 'Categories',
          level: 2,
          icon: 'appstore',
          path: '/categories',
          open: false,
          selected: false,
          disabled: false,
        },
        {
          key: 'MENU.WAREHOUSES',
          label: 'Warehouses',
          level: 2,
          icon: 'home',
          open: false,
          selected: false,
          disabled: false,
          children: [
            {
              key: 'MENU.WAREHOUSES_ALL',
              label: 'All Warehouses',
              level: 3,
              icon: 'home',
              path: '/warehouses/all',
              open: false,
              selected: false,
              disabled: false,
            },
            {
              key: 'MENU.WAREHOUSES_LOCATIONS',
              label: 'Locations',
              level: 3,
              icon: 'home',
              path: '/warehouses/locations',
              open: false,
              selected: false,
              disabled: false,
            },
            {
              key: 'MENU.WAREHOUSES_CAPACITY',
              label: 'Capacity',
              level: 3,
              icon: 'home',
              path: '/warehouses/capacity',
              open: false,
              selected: false,
              disabled: false,
            },
          ],
        },
        {
          key: 'MENU.SHIPPING',
          label: 'Shipping',
          level: 2,
          icon: 'car',
          open: false,
          selected: false,
          disabled: false,
          children: [
            {
              key: 'MENU.SHIPPING_DOMESTIC',
              label: 'Domestic',
              level: 3,
              icon: 'car',
              path: '/shipping/domestic',
              open: false,
              selected: false,
              disabled: false,
            },
            {
              key: 'MENU.SHIPPING_INTERNATIONAL',
              label: 'International',
              level: 3,
              icon: 'car',
              path: '/shipping/international',
              open: false,
              selected: false,
              disabled: false,
            },
            {
              key: 'MENU.SHIPPING_TRACKING',
              label: 'Tracking',
              level: 3,
              icon: 'car',
              path: '/shipping/tracking',
              open: false,
              selected: false,
              disabled: false,
            },
          ],
        },
      ],
    },

    // Layer 1: Finance Module
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
          open: false,
          selected: false,
          disabled: false,
          children: [
            {
              key: 'MENU.INVOICES_ALL',
              label: 'All Invoices',
              level: 3,
              icon: 'file-text',
              path: '/invoices/all',
              open: false,
              selected: false,
              disabled: false,
            },
            {
              key: 'MENU.INVOICES_PAID',
              label: 'Paid',
              level: 3,
              icon: 'file-text',
              path: '/invoices/paid',
              open: false,
              selected: false,
              disabled: false,
            },
            {
              key: 'MENU.INVOICES_PENDING',
              label: 'Pending',
              level: 3,
              icon: 'file-text',
              path: '/invoices/pending',
              open: false,
              selected: false,
              disabled: false,
            },
            {
              key: 'MENU.INVOICES_OVERDUE',
              label: 'Overdue',
              level: 3,
              icon: 'file-text',
              path: '/invoices/overdue',
              open: false,
              selected: false,
              disabled: false,
            },
          ],
        },
        {
          key: 'MENU.PAYMENTS',
          label: 'Payments',
          level: 2,
          icon: 'credit-card',
          open: false,
          selected: false,
          disabled: false,
          children: [
            {
              key: 'MENU.PAYMENTS_ALL',
              label: 'All Payments',
              level: 3,
              icon: 'credit-card',
              path: '/payments/all',
              open: false,
              selected: false,
              disabled: false,
            },
            {
              key: 'MENU.PAYMENTS_RECEIVED',
              label: 'Received',
              level: 3,
              icon: 'credit-card',
              path: '/payments/received',
              open: false,
              selected: false,
              disabled: false,
            },
            {
              key: 'MENU.PAYMENTS_REFUNDED',
              label: 'Refunded',
              level: 3,
              icon: 'credit-card',
              path: '/payments/refunded',
              open: false,
              selected: false,
              disabled: false,
            },
          ],
        },
      ],
    },

    // Layer 1: System Module
    {
      key: 'MENU.SYSTEM',
      label: 'System',
      level: 1,
      icon: 'setting',
      open: false,
      selected: false,
      disabled: false,
      children: [
        {
          key: 'MENU.NOTIFICATIONS',
          label: 'Notifications',
          level: 2,
          icon: 'bell',
          open: false,
          selected: false,
          disabled: false,
          children: [
            {
              key: 'MENU.NOTIFICATIONS_ALL',
              label: 'All Notifications',
              level: 3,
              icon: 'bell',
              path: '/notifications/all',
              open: false,
              selected: false,
              disabled: false,
            },
            {
              key: 'MENU.NOTIFICATIONS_UNREAD',
              label: 'Unread',
              level: 3,
              icon: 'bell',
              path: '/notifications/unread',
              open: false,
              selected: false,
              disabled: false,
            },
            {
              key: 'MENU.NOTIFICATIONS_IMPORTANT',
              label: 'Important',
              level: 3,
              icon: 'bell',
              path: '/notifications/important',
              open: false,
              selected: false,
              disabled: false,
            },
          ],
        },
        {
          key: 'MENU.SETTINGS',
          label: 'Settings',
          level: 2,
          icon: 'setting',
          open: false,
          selected: false,
          disabled: false,
          children: [
            {
              key: 'MENU.SETTINGS_GENERAL',
              label: 'General',
              level: 3,
              icon: 'setting',
              path: '/settings/general',
              open: false,
              selected: false,
              disabled: false,
            },
            {
              key: 'MENU.SETTINGS_AUTH',
              label: 'Authentication',
              level: 3,
              icon: 'setting',
              path: '/settings/authentication',
              open: false,
              selected: false,
              disabled: false,
            },
            {
              key: 'MENU.SETTINGS_NOTIFICATIONS',
              label: 'Notifications',
              level: 3,
              icon: 'setting',
              path: '/settings/notifications',
              open: false,
              selected: false,
              disabled: false,
            },
            {
              key: 'MENU.SETTINGS_ENCRYPTION',
              label: 'Encryption',
              level: 3,
              icon: 'setting',
              path: '/settings/encryption',
              open: false,
              selected: false,
              disabled: false,
            },
          ],
        },
      ],
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
