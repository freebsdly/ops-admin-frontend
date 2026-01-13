import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface MenuItem {
  key: string;
  label: string;
  icon?: string;
  path?: string;
  children?: MenuItem[];
  isCollapsible?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuData: MenuItem[] = [
    {
      key: 'home',
      label: 'Home',
      icon: 'home',
      path: '/home',
    },
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      path: '/dashboard',
    },
    {
      key: 'analytics',
      label: 'Analytics',
      icon: 'bar-chart',
      path: '/analytics',
    },
    {
      key: 'reports',
      label: 'Reports',
      icon: 'file-text',
      path: '/reports',
    },
    {
      key: 'security',
      label: 'Security',
      icon: 'safety',
      isCollapsible: true,
      children: [
        {
          key: 'users',
          label: 'User Management',
          icon: 'user',
          path: '/users',
        },
        {
          key: 'roles',
          label: 'Role Management',
          icon: 'team',
          path: '/roles',
        },
        {
          key: 'permissions',
          label: 'Permission Management',
          icon: 'safety-certificate',
          path: '/permissions',
        },
        {
          key: 'audit',
          label: 'Audit Log',
          icon: 'database',
          path: '/audit',
        },
      ],
    },
    {
      key: 'notifications',
      label: 'Notifications',
      icon: 'bell',
      path: '/notifications',
    },
    {
      key: 'operations',
      label: 'Operations',
      icon: 'appstore',
      isCollapsible: true,
      children: [
        {
          key: 'inventory',
          label: 'Inventory',
          icon: 'appstore',
          path: '/inventory',
        },
        {
          key: 'orders',
          label: 'Orders',
          icon: 'shopping',
          path: '/orders',
        },
        {
          key: 'customers',
          label: 'Customers',
          icon: 'team',
          path: '/customers',
        },
      ],
    },
    {
      key: 'products',
      label: 'Products',
      icon: 'database',
      path: '/products',
    },
    {
      key: 'categories',
      label: 'Categories',
      icon: 'appstore',
      path: '/categories',
    },
    {
      key: 'warehouses',
      label: 'Warehouses',
      icon: 'home',
      path: '/warehouses',
    },
    {
      key: 'shipping',
      label: 'Shipping',
      icon: 'car',
      path: '/shipping',
    },
    {
      key: 'finance',
      label: 'Finance',
      icon: 'dollar',
      isCollapsible: true,
      children: [
        {
          key: 'billing',
          label: 'Billing',
          icon: 'dollar',
          path: '/billing',
        },
        {
          key: 'invoices',
          label: 'Invoices',
          icon: 'file-text',
          path: '/invoices',
        },
        {
          key: 'payments',
          label: 'Payments',
          icon: 'credit-card',
          path: '/payments',
        },
      ],
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: 'setting',
      path: '/settings',
    },
  ];

  getMenuData(): Observable<MenuItem[]> {
    return of(this.menuData);
  }

  getMenuByKey(key: string): Observable<MenuItem | undefined> {
    return of(this.menuData.find(item => item.key === key));
  }
}