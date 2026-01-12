import { Injectable, signal, computed, inject } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  DashboardOutline,
  TeamOutline,
  SettingOutline,
  AppstoreOutline,
  FileTextOutline,
  BarChartOutline,
  DatabaseOutline,
  BellOutline,
  SecurityScanOutline,
  AuditOutline,
  UserSwitchOutline,
  CloudServerOutline,
} from '@ant-design/icons-angular/icons';
import { UserRole, hasRolePermission } from '../../types/roles';

export interface MenuItem {
  label: string;
  icon: IconDefinition;
  route: string;
  requiredRole: UserRole;
  description?: string;
  children?: MenuItem[];
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private readonly allMenuItems = signal<MenuItem[]>([
    {
      label: 'Dashboard',
      icon: DashboardOutline,
      route: '/dashboard',
      requiredRole: 'viewer',
      description: 'System overview and metrics',
    },
    {
      label: 'User Management',
      icon: TeamOutline,
      route: '/users',
      requiredRole: 'admin',
      description: 'Manage user accounts and permissions',
      children: [
        {
          label: 'Users',
          icon: TeamOutline,
          route: '/users/list',
          requiredRole: 'admin',
        },
        {
          label: 'Roles',
          icon: UserSwitchOutline,
          route: '/users/roles',
          requiredRole: 'admin',
        },
        {
          label: 'Permissions',
          icon: SecurityScanOutline,
          route: '/users/permissions',
          requiredRole: 'admin',
        },
      ],
    },
    {
      label: 'Service Management',
      icon: AppstoreOutline,
      route: '/services',
      requiredRole: 'operator',
      description: 'Manage system services',
      children: [
        {
          label: 'Service List',
          icon: AppstoreOutline,
          route: '/services/list',
          requiredRole: 'operator',
        },
        {
          label: 'Deployments',
          icon: CloudServerOutline,
          route: '/services/deployments',
          requiredRole: 'manager',
        },
        {
          label: 'Monitoring',
          icon: BarChartOutline,
          route: '/services/monitoring',
          requiredRole: 'viewer',
        },
      ],
    },
    {
      label: 'Monitoring',
      icon: BarChartOutline,
      route: '/monitoring',
      requiredRole: 'viewer',
      description: 'System monitoring and alerts',
      children: [
        {
          label: 'Metrics',
          icon: BarChartOutline,
          route: '/monitoring/metrics',
          requiredRole: 'viewer',
        },
        {
          label: 'Alerts',
          icon: BellOutline,
          route: '/monitoring/alerts',
          requiredRole: 'operator',
        },
        {
          label: 'Logs',
          icon: FileTextOutline,
          route: '/monitoring/logs',
          requiredRole: 'manager',
        },
      ],
    },
    {
      label: 'Database',
      icon: DatabaseOutline,
      route: '/database',
      requiredRole: 'manager',
      description: 'Database management and queries',
    },
    {
      label: 'Documents',
      icon: FileTextOutline,
      route: '/documents',
      requiredRole: 'viewer',
      description: 'Document repository',
    },
    {
      label: 'Audit Logs',
      icon: AuditOutline,
      route: '/audit',
      requiredRole: 'manager',
      description: 'System audit trails',
    },
    {
      label: 'Settings',
      icon: SettingOutline,
      route: '/settings',
      requiredRole: 'admin',
      description: 'System configuration',
      children: [
        {
          label: 'General',
          icon: SettingOutline,
          route: '/settings/general',
          requiredRole: 'admin',
        },
        {
          label: 'Security',
          icon: SecurityScanOutline,
          route: '/settings/security',
          requiredRole: 'admin',
        },
        {
          label: 'Notifications',
          icon: BellOutline,
          route: '/settings/notifications',
          requiredRole: 'manager',
        },
      ],
    },
  ]);

  /**
   * Get all menu items for a specific role
   */
  getMenuForRole(userRole: UserRole | null): MenuItem[] {
    if (!userRole) {
      return [];
    }

    return this.allMenuItems()
      .filter(item => hasRolePermission(userRole, item.requiredRole))
      .map(item => ({
        ...item,
        children: item.children
          ? item.children.filter(child => hasRolePermission(userRole, child.requiredRole))
          : undefined,
      }))
      .filter(item => !item.children || item.children.length > 0);
  }

  /**
   * Get a flat list of all accessible routes for a role
   */
  getAccessibleRoutes(userRole: UserRole | null): string[] {
    if (!userRole) {
      return [];
    }

    const routes: string[] = [];

    const addRoute = (item: MenuItem) => {
      if (hasRolePermission(userRole, item.requiredRole)) {
        routes.push(item.route);
      }
      if (item.children) {
        item.children.forEach(child => addRoute(child));
      }
    };

    this.allMenuItems().forEach(item => addRoute(item));
    return routes;
  }

  /**
   * Check if a route is accessible for a given role
   */
  canAccessRoute(userRole: UserRole | null, route: string): boolean {
    if (!userRole) {
      return false;
    }

    const checkItem = (item: MenuItem): boolean => {
      if (item.route === route) {
        return hasRolePermission(userRole, item.requiredRole);
      }
      if (item.children) {
        return item.children.some(child => checkItem(child));
      }
      return false;
    };

    return this.allMenuItems().some(item => checkItem(item));
  }
}