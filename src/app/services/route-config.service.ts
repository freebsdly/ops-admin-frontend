import { Injectable } from '@angular/core';

export interface RouteConfig {
  path: string;
  key: string;
  titleKey: string;
  icon?: string;
  component?: any;
  canActivate?: any[];
  children?: RouteConfig[];
  data?: Record<string, any>;
}

@Injectable({
  providedIn: 'root',
})
export class RouteConfigService {
  private readonly routeConfigs: RouteConfig[] = [
    // Home
    {
      path: '/home',
      key: 'home',
      titleKey: 'MENU.HOME',
      icon: 'home',
    },
    // Dashboard routes
    {
      path: '/dashboard',
      key: 'dashboard',
      titleKey: 'MENU.DASHBOARD',
      icon: 'dashboard',
    },
    {
      path: '/analytics',
      key: 'analytics',
      titleKey: 'MENU.ANALYTICS',
      icon: 'bar-chart',
    },
    {
      path: '/reports',
      key: 'reports',
      titleKey: 'MENU.REPORTS',
      icon: 'file-text',
    },
    // Security submenu routes
    {
      path: '/users',
      key: 'user-management',
      titleKey: 'MENU.USER_MANAGEMENT',
      icon: 'user',
    },
    {
      path: '/roles',
      key: 'role-management',
      titleKey: 'MENU.ROLE_MANAGEMENT',
      icon: 'team',
    },
    {
      path: '/permissions',
      key: 'permission-management',
      titleKey: 'MENU.PERMISSION_MANAGEMENT',
      icon: 'safety-certificate',
    },
    {
      path: '/audit',
      key: 'audit',
      titleKey: 'MENU.AUDIT',
      icon: 'database',
    },
    // Notifications route
    {
      path: '/notifications',
      key: 'notifications',
      titleKey: 'MENU.NOTIFICATIONS',
      icon: 'bell',
    },
    // Operations submenu routes
    {
      path: '/inventory',
      key: 'inventory',
      titleKey: 'MENU.INVENTORY',
      icon: 'appstore',
    },
    {
      path: '/orders',
      key: 'orders',
      titleKey: 'MENU.ORDERS',
      icon: 'shopping',
    },
    {
      path: '/customers',
      key: 'customers',
      titleKey: 'MENU.CUSTOMERS',
      icon: 'team',
    },
    // Products routes
    {
      path: '/products',
      key: 'products',
      titleKey: 'MENU.PRODUCTS',
      icon: 'database',
    },
    {
      path: '/categories',
      key: 'categories',
      titleKey: 'MENU.CATEGORIES',
      icon: 'appstore',
    },
    {
      path: '/warehouses',
      key: 'warehouses',
      titleKey: 'MENU.WAREHOUSES',
      icon: 'home',
    },
    // Shipping route
    {
      path: '/shipping',
      key: 'shipping',
      titleKey: 'MENU.SHIPPING',
      icon: 'car',
    },
    // Finance submenu routes
    {
      path: '/billing',
      key: 'billing',
      titleKey: 'MENU.BILLING',
      icon: 'dollar',
    },
    {
      path: '/invoices',
      key: 'invoices',
      titleKey: 'MENU.INVOICES',
      icon: 'file-text',
    },
    {
      path: '/payments',
      key: 'payments',
      titleKey: 'MENU.PAYMENTS',
      icon: 'credit-card',
    },
    // Nested demo routes
    {
      path: '/nested/level3/item1',
      key: 'level3-item1',
      titleKey: 'MENU.LEVEL3_ITEM1',
      icon: 'appstore',
    },
    {
      path: '/nested/level3/item2',
      key: 'level3-item2',
      titleKey: 'MENU.LEVEL3_ITEM2',
      icon: 'appstore',
    },
    {
      path: '/nested/level2/item2',
      key: 'level2-item2',
      titleKey: 'MENU.LEVEL2_ITEM2',
      icon: 'appstore',
    },
    {
      path: '/nested/level2/item3',
      key: 'level2-item3',
      titleKey: 'MENU.LEVEL2_ITEM3',
      icon: 'appstore',
    },
    // Settings route
    {
      path: '/settings',
      key: 'settings',
      titleKey: 'MENU.SETTINGS',
      icon: 'setting',
    },
    // Profile route
    {
      path: '/profile',
      key: 'profile',
      titleKey: 'LAYOUT.HEADER.PROFILE',
      icon: 'user',
    },
    // Messages route
    {
      path: '/messages',
      key: 'messages',
      titleKey: 'MESSAGES.TITLE',
      icon: 'message',
    },
    // Test loading route
    {
      path: '/test-loading',
      key: 'test-loading',
      titleKey: 'TEST.LOADING',
      icon: 'appstore',
    },
    // Root route (maps to home)
    {
      path: '/',
      key: 'home',
      titleKey: 'MENU.HOME',
      icon: 'home',
    },
  ];

  /**
   * Get route configuration by path
   */
  getRouteConfig(path: string): RouteConfig | undefined {
    // Check exact match first
    const exactMatch = this.routeConfigs.find(config => config.path === path);
    if (exactMatch) {
      return exactMatch;
    }

    // Check for dynamic routes (e.g., /users/123)
    const basePath = path.split('/').slice(0, 2).join('/') || '/';
    const baseMatch = this.routeConfigs.find(config => config.path === basePath);
    if (baseMatch) {
      return {
        ...baseMatch,
        path: path,
      };
    }

    return undefined;
  }

  /**
   * Get tab configuration for a route path
   */
  getTabConfig(path: string): { key: string; label: string; icon?: string } {
    const config = this.getRouteConfig(path);
    
    if (config) {
      return {
        key: config.key,
        label: config.titleKey,
        icon: config.icon,
      };
    }

    // Default fallback for unknown routes
    const routeName = path.split('/').pop() || 'page';
    return {
      key: `page-${routeName}`,
      label: `MENU.${routeName.toUpperCase()}`,
      icon: 'appstore',
    };
  }

  /**
   * Get all route configurations
   */
  getAllRouteConfigs(): RouteConfig[] {
    return this.routeConfigs;
  }

  /**
   * Get menu structure from route configurations
   */
  getMenuStructure(): Array<{
    key: string;
    label: string;
    level: number;
    icon?: string;
    path?: string;
    open?: boolean;
    selected?: boolean;
    disabled?: boolean;
    children?: any[];
  }> {
    // This would return a structured menu based on route hierarchy
    // For now, return flat structure with paths that have icons and titles
    return this.routeConfigs
      .filter(config => config.path !== '/' && config.path !== '/home') // Exclude root and home (already default tab)
      .map(config => ({
        key: config.key,
        label: config.titleKey,
        level: 1,
        icon: config.icon,
        path: config.path,
        open: false,
        selected: false,
        disabled: false,
      }));
  }
}