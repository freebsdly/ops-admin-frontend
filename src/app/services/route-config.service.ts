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
    // Home routes
    {
      path: '/home',
      key: 'home',
      titleKey: 'MENU.HOME_DASHBOARD',
      icon: 'home',
    },

    // Dashboard routes
    {
      path: '/dashboard',
      key: 'dashboard',
      titleKey: 'MENU.DASHBOARD_OVERVIEW',
      icon: 'dashboard',
    },

    // Analytics routes
    {
      path: '/analytics/traffic',
      key: 'analytics-traffic',
      titleKey: 'MENU.ANALYTICS_TRAFFIC',
      icon: 'bar-chart',
    },
    {
      path: '/analytics/performance',
      key: 'analytics-performance',
      titleKey: 'MENU.ANALYTICS_PERFORMANCE',
      icon: 'bar-chart',
    },
    {
      path: '/analytics/conversions',
      key: 'analytics-conversions',
      titleKey: 'MENU.ANALYTICS_CONVERSIONS',
      icon: 'bar-chart',
    },

    // Reports routes
    {
      path: '/reports/system',
      key: 'reports-system',
      titleKey: 'MENU.REPORTS_SYSTEM',
      icon: 'file-text',
    },
    {
      path: '/reports/users',
      key: 'reports-users',
      titleKey: 'MENU.REPORTS_USERS',
      icon: 'file-text',
    },
    {
      path: '/reports/performance',
      key: 'reports-performance',
      titleKey: 'MENU.REPORTS_PERFORMANCE',
      icon: 'file-text',
    },

    // Security routes
    {
      path: '/users',
      key: 'users',
      titleKey: 'MENU.USER_MANAGEMENT',
      icon: 'user',
    },
    {
      path: '/roles',
      key: 'roles',
      titleKey: 'MENU.ROLE_MANAGEMENT',
      icon: 'team',
    },

    // Permissions routes
    {
      path: '/permissions/users',
      key: 'permissions-users',
      titleKey: 'MENU.PERMISSIONS_USERS',
      icon: 'safety-certificate',
    },
    {
      path: '/permissions/roles',
      key: 'permissions-roles',
      titleKey: 'MENU.PERMISSIONS_ROLES',
      icon: 'safety-certificate',
    },

    {
      path: '/audit',
      key: 'audit',
      titleKey: 'MENU.AUDIT',
      icon: 'database',
    },

    // Operations routes
    {
      path: '/inventory',
      key: 'inventory',
      titleKey: 'MENU.INVENTORY',
      icon: 'appstore',
    },

    // Orders routes
    {
      path: '/orders/all',
      key: 'orders-all',
      titleKey: 'MENU.ORDERS_ALL',
      icon: 'shopping',
    },
    {
      path: '/orders/pending',
      key: 'orders-pending',
      titleKey: 'MENU.ORDERS_PENDING',
      icon: 'shopping',
    },
    {
      path: '/orders/completed',
      key: 'orders-completed',
      titleKey: 'MENU.ORDERS_COMPLETED',
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
      titleKey: 'MENU.PRODUCTS_LIST',
      icon: 'database',
    },
    {
      path: '/categories',
      key: 'categories',
      titleKey: 'MENU.CATEGORIES',
      icon: 'appstore',
    },

    // Warehouses routes
    {
      path: '/warehouses/all',
      key: 'warehouses-all',
      titleKey: 'MENU.WAREHOUSES_ALL',
      icon: 'home',
    },
    {
      path: '/warehouses/locations',
      key: 'warehouses-locations',
      titleKey: 'MENU.WAREHOUSES_LOCATIONS',
      icon: 'home',
    },
    {
      path: '/warehouses/capacity',
      key: 'warehouses-capacity',
      titleKey: 'MENU.WAREHOUSES_CAPACITY',
      icon: 'home',
    },

    // Shipping routes
    {
      path: '/shipping/domestic',
      key: 'shipping-domestic',
      titleKey: 'MENU.SHIPPING_DOMESTIC',
      icon: 'car',
    },
    {
      path: '/shipping/international',
      key: 'shipping-international',
      titleKey: 'MENU.SHIPPING_INTERNATIONAL',
      icon: 'car',
    },
    {
      path: '/shipping/tracking',
      key: 'shipping-tracking',
      titleKey: 'MENU.SHIPPING_TRACKING',
      icon: 'car',
    },

    // Finance routes
    {
      path: '/billing',
      key: 'billing',
      titleKey: 'MENU.BILLING',
      icon: 'dollar',
    },

    // Invoices routes
    {
      path: '/invoices/all',
      key: 'invoices-all',
      titleKey: 'MENU.INVOICES_ALL',
      icon: 'file-text',
    },
    {
      path: '/invoices/paid',
      key: 'invoices-paid',
      titleKey: 'MENU.INVOICES_PAID',
      icon: 'file-text',
    },
    {
      path: '/invoices/pending',
      key: 'invoices-pending',
      titleKey: 'MENU.INVOICES_PENDING',
      icon: 'file-text',
    },
    {
      path: '/invoices/overdue',
      key: 'invoices-overdue',
      titleKey: 'MENU.INVOICES_OVERDUE',
      icon: 'file-text',
    },

    // Payments routes
    {
      path: '/payments/all',
      key: 'payments-all',
      titleKey: 'MENU.PAYMENTS_ALL',
      icon: 'credit-card',
    },
    {
      path: '/payments/received',
      key: 'payments-received',
      titleKey: 'MENU.PAYMENTS_RECEIVED',
      icon: 'credit-card',
    },
    {
      path: '/payments/refunded',
      key: 'payments-refunded',
      titleKey: 'MENU.PAYMENTS_REFUNDED',
      icon: 'credit-card',
    },

    // System routes - Notifications
    {
      path: '/notifications/all',
      key: 'notifications-all',
      titleKey: 'MENU.NOTIFICATIONS_ALL',
      icon: 'bell',
    },
    {
      path: '/notifications/unread',
      key: 'notifications-unread',
      titleKey: 'MENU.NOTIFICATIONS_UNREAD',
      icon: 'bell',
    },
    {
      path: '/notifications/important',
      key: 'notifications-important',
      titleKey: 'MENU.NOTIFICATIONS_IMPORTANT',
      icon: 'bell',
    },

    // System routes - Settings
    {
      path: '/settings/general',
      key: 'settings-general',
      titleKey: 'MENU.SETTINGS_GENERAL',
      icon: 'setting',
    },
    {
      path: '/settings/authentication',
      key: 'settings-auth',
      titleKey: 'MENU.SETTINGS_AUTH',
      icon: 'setting',
    },
    {
      path: '/settings/notifications',
      key: 'settings-notifications',
      titleKey: 'MENU.SETTINGS_NOTIFICATIONS',
      icon: 'setting',
    },
    {
      path: '/settings/encryption',
      key: 'settings-encryption',
      titleKey: 'MENU.SETTINGS_ENCRYPTION',
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
      icon: 'mail',
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