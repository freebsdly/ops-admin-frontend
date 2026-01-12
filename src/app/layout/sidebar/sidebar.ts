import { Component, ChangeDetectionStrategy, input, output, signal, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
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
  MenuFoldOutline,
  MenuUnfoldOutline,
  SecurityScanOutline,
  AuditOutline,
  UserSwitchOutline,
  CloudServerOutline,
} from '@ant-design/icons-angular/icons';
import { MenuService } from '../../services/menu.service';
import { AuthService } from '../../services/auth.service';
import { UserRole, ROLE_DESCRIPTIONS } from '../../../types/roles';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    NzIconModule,
    NzMenuModule,
    NzButtonModule,
    NzTooltipModule,
  ],
  template: `
    <div class="h-full bg-white border-gray-200 flex flex-col">
      <!-- Current role display -->
      <div class="p-4 border-b">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-gray-700">Current Role</span>
          <span class="text-xs font-bold px-2 py-1 rounded" [ngClass]="roleBadgeClass()">
            {{ currentRoleName() }}
          </span>
        </div>
        <div class="text-xs text-gray-500">{{ user()?.name }}</div>
      </div>
      
      <!-- Menu items -->
      <div class="flex-1 overflow-y-auto">
        <ul nz-menu nzMode="inline" class="!border-0 pt-4">
          @for (item of menuItems(); track item.route) {
            <li nz-menu-item>
              <a [routerLink]="item.route" routerLinkActive="active" class="flex items-center">
                <span nz-icon [nzType]="item.icon.name" nzTheme="outline" class="mr-3"></span>
                <span>{{ item.label }}</span>
              </a>
            </li>
          }
        </ul>
      </div>
      
      <!-- Role switcher (for demo only) -->
      <div class="p-4 border-t">
        <div class="text-sm font-medium text-gray-700 mb-2">Demo: Switch Role</div>
        <div class="flex flex-wrap gap-1">
          @for (role of allRoles; track role) {
            <button nz-button nzSize="small" 
              [nzType]="currentRole() === role ? 'primary' : 'default'"
              (click)="switchRole(role)">
              {{ ROLE_DESCRIPTIONS[role] }}
            </button>
          }
        </div>
      </div>
    </div>
  `,
  styleUrl: './sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar implements OnInit {
  private readonly iconService = inject(NzIconService);
  private readonly menuService = inject(MenuService);
  private readonly authService = inject(AuthService);

  user = computed(() => this.authService.user());
  currentRole = computed(() => this.authService.getUserRole());
  currentRoleName = computed(() => {
    const role = this.currentRole();
    return role ? ROLE_DESCRIPTIONS[role] : 'No Role';
  });
  
  menuItems = computed(() => {
    const role = this.currentRole();
    return this.menuService.getMenuForRole(role);
  });

  allRoles: UserRole[] = ['admin', 'manager', 'operator', 'viewer'];
  ROLE_DESCRIPTIONS = ROLE_DESCRIPTIONS;

  collapsed = input<boolean>(false);
  onToggleCollapsed = output<boolean>();

  ngOnInit() {
    // Register all icons
    const icons: IconDefinition[] = [
      DashboardOutline,
      TeamOutline,
      SettingOutline,
      AppstoreOutline,
      FileTextOutline,
      BarChartOutline,
      DatabaseOutline,
      BellOutline,
      MenuFoldOutline,
      MenuUnfoldOutline,
      SecurityScanOutline,
      AuditOutline,
      UserSwitchOutline,
      CloudServerOutline,
    ];

    this.iconService.addIcon(...icons);
  }

  roleBadgeClass() {
    const role = this.currentRole();
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'manager': return 'bg-yellow-100 text-yellow-800';
      case 'operator': return 'bg-green-100 text-green-800';
      case 'viewer': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  switchRole(role: UserRole) {
    // For demo purposes only - in a real app, this would call an API
    const currentUser = this.authService.user();
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        role: role,
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      this.authService.user.set(updatedUser);
    }
  }
}
