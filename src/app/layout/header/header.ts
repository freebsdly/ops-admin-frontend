import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

export interface UserInfo {
  name: string;
  avatar?: string;
  role?: string;
}

@Component({
  selector: 'app-header',
  imports: [
    NzIconModule,
    NzButtonModule,
    NzAvatarModule,
    NzDropdownModule,
    NzMenuModule,
    NzTooltipModule,
  ],
  template: `
    <div class="h-16 bg-white border-gray-200 flex items-center justify-between sticky top-0 z-50 shadow-sm px-6">
      <!-- Left section: Logo and sidebar toggle -->
      <div class="flex items-center space-x-4">
        <!-- Logo -->
        <div class="flex items-center">
          <h1 class="text-xl font-bold text-gray-900 m-0">Ops Admin</h1>
        </div>
      </div>

      <!-- Right section: User menu -->
      <div class="flex items-center space-x-4">
        @if (user()) {
          <div nz-dropdown [nzDropdownMenu]="userMenu" nzPlacement="bottomRight" class="flex items-center cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
            <nz-avatar nzSize="small" nzText="{{ user()?.name?.charAt(0) || 'U' }}" class="mr-2"></nz-avatar>
            <span class="text-sm text-gray-700 mr-1">{{ user()?.name }}</span>
            @if (user()?.role) {
              <span class="text-xs text-gray-500 ml-2">({{ user()?.role }})</span>
            }
          </div>
          <nz-dropdown-menu #userMenu="nzDropdownMenu">
            <ul nz-menu nzSelectable="false">
              <li nz-menu-item (click)="onLogout.emit()">
                <span nz-icon nzType="logout" nzTheme="outline"></span>
                <span>Logout</span>
              </li>
            </ul>
          </nz-dropdown-menu>
        }
      </div>
    </div>
  `,
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeader {
  user = input<UserInfo | null>(null);
  sidebarCollapsed = input<boolean>(false);

  onToggleSidebar = output<void>();
  onLogout = output<void>();
}
