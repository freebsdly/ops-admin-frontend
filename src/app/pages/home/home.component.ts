import { Component, inject, computed } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MenuService } from '../../services/menu.service';
import { UserRole, ROLE_DESCRIPTIONS } from '../../../types/roles';

@Component({
  selector: 'app-home',
  imports: [CommonModule, NzCardModule, NzStatisticModule, NzGridModule, NzIconModule, NzButtonModule, NzTableModule, NzTagModule, NzAvatarModule, NzAlertModule],
  template: `
    <div class="space-y-6">
      <!-- Welcome message with role info -->
      <nz-card>
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 mb-1">Welcome back, {{ user()?.name }}!</h1>
            <p class="text-gray-600">You are logged in as 
              <nz-tag [nzColor]="roleBadgeColor()">{{ currentRoleName() }}</nz-tag>
            </p>
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-500">Access Level</p>
            <p class="text-lg font-semibold">{{ currentRoleHierarchy() }}/4</p>
          </div>
        </div>
      </nz-card>

      <!-- Role-based access information -->
      <nz-alert nzType="info" nzMessage="Role-Based Access Control" [nzDescription]="roleDescription()" nzShowIcon></nz-alert>

      <!-- Available Sections -->
      <nz-card nzTitle="Available Sections for Your Role">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          @for (menuItem of menuItems(); track menuItem.route) {
            <nz-card [nzHoverable]="true" 
              class="cursor-pointer hover:shadow-lg transition-shadow"
              (click)="navigateTo(menuItem.route)">
              <div class="flex items-center">
                <span nz-icon [nzType]="menuItem.icon.name" nzTheme="outline" class="text-xl mr-3"></span>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-1">{{ menuItem.label }}</h3>
                  <p class="text-sm text-gray-500">{{ menuItem.description }}</p>
                  <div class="mt-2">
                    <nz-tag nzSize="small" [nzColor]="getRoleColor(menuItem.requiredRole)">
                      {{ getRoleDescription(menuItem.requiredRole) }}
                    </nz-tag>
                  </div>
                </div>
              </div>
            </nz-card>
          }
        </div>
      </nz-card>

      <!-- Quick Role Statistics -->
      <nz-row [nzGutter]="16">
        <nz-col [nzSpan]="6">
          <nz-card>
            <nz-statistic
              nzTitle="Admin Access"
              [nzValue]="adminItemsCount()"
              [nzPrefix]="adminIcon"
              [nzValueStyle]="{ color: '#cf1322' }"
            ></nz-statistic>
            <ng-template #adminIcon><span nz-icon nzType="crown" nzTheme="outline"></span></ng-template>
          </nz-card>
        </nz-col>
        <nz-col [nzSpan]="6">
          <nz-card>
            <nz-statistic
              nzTitle="Manager Access"
              [nzValue]="managerItemsCount()"
              [nzPrefix]="managerIcon"
              [nzValueStyle]="{ color: '#faad14' }"
            ></nz-statistic>
            <ng-template #managerIcon><span nz-icon nzType="team" nzTheme="outline"></span></ng-template>
          </nz-card>
        </nz-col>
        <nz-col [nzSpan]="6">
          <nz-card>
            <nz-statistic
              nzTitle="Operator Access"
              [nzValue]="operatorItemsCount()"
              [nzPrefix]="operatorIcon"
              [nzValueStyle]="{ color: '#52c41a' }"
            ></nz-statistic>
            <ng-template #operatorIcon><span nz-icon nzType="tool" nzTheme="outline"></span></ng-template>
          </nz-card>
        </nz-col>
        <nz-col [nzSpan]="6">
          <nz-card>
            <nz-statistic
              nzTitle="Viewer Access"
              [nzValue]="viewerItemsCount()"
              [nzPrefix]="viewerIcon"
              [nzValueStyle]="{ color: '#1890ff' }"
            ></nz-statistic>
            <ng-template #viewerIcon><span nz-icon nzType="eye" nzTheme="outline"></span></ng-template>
          </nz-card>
        </nz-col>
      </nz-row>

      <!-- Recent Activity -->
      <nz-card nzTitle="Recent Activity">
        <nz-table #basicTable [nzData]="filteredActivities()" [nzShowPagination]="false">
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Role Required</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            @for (data of basicTable.data; track data.id) {
            <tr>
              <td>
                <nz-avatar nzSize="small" nzText="{{ data.user.charAt(0) }}" class="mr-2"></nz-avatar>
                {{ data.user }}
              </td>
              <td>{{ data.action }}</td>
              <td>
                <nz-tag [nzColor]="getRoleColor(data.roleRequired)">{{ getRoleDescription(data.roleRequired) }}</nz-tag>
              </td>
              <td>{{ data.time }}</td>
            </tr>
            }
          </tbody>
        </nz-table>
      </nz-card>
    </div>
  `,
})
export class HomeComponent {
  private authService = inject(AuthService);
  private menuService = inject(MenuService);

  user = computed(() => this.authService.user());
  currentRoleName = computed(() => {
    const role = this.authService.getUserRole();
    return role ? ROLE_DESCRIPTIONS[role] : 'No Role';
  });

  roleBadgeColor = computed(() => {
    const role = this.authService.getUserRole();
    switch (role) {
      case 'admin': return '#ff4d4f';
      case 'manager': return '#fa8c16';
      case 'operator': return '#52c41a';
      case 'viewer': return '#1890ff';
      default: return '#d9d9d9';
    }
  });

  currentRoleHierarchy = computed(() => {
    const role = this.authService.getUserRole();
    const hierarchy: Record<string, number> = {
      'admin': 4,
      'manager': 3,
      'operator': 2,
      'viewer': 1,
    };
    return hierarchy[role || ''] || 0;
  });

  roleDescription = computed(() => {
    const role = this.authService.getUserRole();
    switch (role) {
      case 'admin':
        return 'You have full system access including user management, settings, and all monitoring features.';
      case 'manager':
        return 'You can manage deployments, view logs, configure notifications, and access basic monitoring.';
      case 'operator':
        return 'You can manage services, handle alerts, and access basic monitoring features.';
      case 'viewer':
        return 'You have read-only access to metrics, documents, and basic monitoring information.';
      default:
        return 'Please select a role to access system features.';
    }
  });

  menuItems = computed(() => {
    const role = this.authService.getUserRole();
    return this.menuService.getMenuForRole(role);
  });

  adminItemsCount = computed(() => this.menuItems().filter(item => item.requiredRole === 'admin').length);
  managerItemsCount = computed(() => this.menuItems().filter(item => item.requiredRole === 'manager').length);
  operatorItemsCount = computed(() => this.menuItems().filter(item => item.requiredRole === 'operator').length);
  viewerItemsCount = computed(() => this.menuItems().filter(item => item.requiredRole === 'viewer').length);

  allActivities = [
    { id: 1, user: 'Admin User', action: 'Created new role', roleRequired: 'admin', time: '2 minutes ago' },
    { id: 2, user: 'Manager User', action: 'Approved deployment', roleRequired: 'manager', time: '5 minutes ago' },
    { id: 3, user: 'Operator User', action: 'Restarted service', roleRequired: 'operator', time: '10 minutes ago' },
    { id: 4, user: 'Viewer User', action: 'Viewed metrics', roleRequired: 'viewer', time: '15 minutes ago' },
    { id: 5, user: 'Admin User', action: 'Modified permissions', roleRequired: 'admin', time: '20 minutes ago' },
    { id: 6, user: 'Operator User', action: 'Configured alert', roleRequired: 'operator', time: '25 minutes ago' },
  ];

  filteredActivities = computed(() => {
    const userRole = this.authService.getUserRole();
    const hierarchy: Record<string, number> = {
      'admin': 4,
      'manager': 3,
      'operator': 2,
      'viewer': 1,
    };
    
    return this.allActivities.filter(activity => {
      const activityLevel = hierarchy[activity.roleRequired];
      const userLevel = hierarchy[userRole || ''];
      return activityLevel <= userLevel;
    });
  });

  getRoleColor(role: string): string {
    switch (role) {
      case 'admin': return 'red';
      case 'manager': return 'orange';
      case 'operator': return 'green';
      case 'viewer': return 'blue';
      default: return 'default';
    }
  }

  getRoleDescription(role: string): string {
    return ROLE_DESCRIPTIONS[role as UserRole] || role;
  }

  navigateTo(route: string): void {
    window.location.href = route;
  }
}