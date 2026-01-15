import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

export interface UserInfo {
  name: string;
  avatar?: string;
  role?: string;
}

@Component({
  selector: 'app-user-info-card',
  imports: [
    NzAvatarModule,
    NzButtonModule,
    NzMenuModule,
    NzIconModule,
    RouterLink,
    TranslateModule,
  ],
  template: `
    <!-- Modern user card design -->
    <div class="w-80 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      <!-- User profile header -->
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
        <div class="flex items-center gap-4">
          <nz-avatar 
            nzSize="large"
            [nzSrc]="user()?.avatar" 
            nzText="{{ user()?.name?.charAt(0) || 'U' }}"
            class="!h-16 !w-16 border-4 border-white shadow-sm"
          ></nz-avatar>
          <div class="flex flex-col">
            <span class="text-lg font-semibold text-gray-900">{{ user()?.name }}</span>
            @if (user()?.role) {
              <span class="text-sm text-gray-600">{{ user()?.role }}</span>
            }
            <div class="mt-2 flex items-center gap-2 text-sm text-gray-500">
              <span nz-icon nzType="check-circle" nzTheme="outline" class="text-green-500"></span>
              <span>Online</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Quick stats/info -->
      <div class="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <div class="grid grid-cols-3 gap-4 text-center">
          <div>
            <div class="text-sm text-gray-500">Projects</div>
            <div class="text-xl font-bold text-gray-800">12</div>
          </div>
          <div>
            <div class="text-sm text-gray-500">Tasks</div>
            <div class="text-xl font-bold text-gray-800">47</div>
          </div>
          <div>
            <div class="text-sm text-gray-500">Teams</div>
            <div class="text-xl font-bold text-gray-800">3</div>
          </div>
        </div>
      </div>
      
      <!-- Navigation menu -->
      <div class="py-2">
        <ul nz-menu nzSelectable="false" class="!border-0">
          <li nz-menu-item routerLink="/profile" class="!h-12 !px-6 hover:bg-blue-50">
            <div class="flex items-center gap-3">
              <div class="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                <span nz-icon nzType="user" nzTheme="outline" class="text-blue-600"></span>
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-medium text-gray-800">{{ 'LAYOUT.HEADER.PROFILE' | translate }}</span>
                <span class="text-xs text-gray-500">View and edit your profile</span>
              </div>
            </div>
          </li>
          <li nz-menu-item routerLink="/settings" class="!h-12 !px-6 hover:bg-blue-50">
            <div class="flex items-center gap-3">
              <div class="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100">
                <span nz-icon nzType="setting" nzTheme="outline" class="text-purple-600"></span>
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-medium text-gray-800">{{ 'LAYOUT.HEADER.SETTINGS' | translate }}</span>
                <span class="text-xs text-gray-500">Configure your preferences</span>
              </div>
            </div>
          </li>
          <li nz-menu-item routerLink="/notifications" class="!h-12 !px-6 hover:bg-blue-50">
            <div class="flex items-center gap-3">
              <div class="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100">
                <span nz-icon nzType="bell" nzTheme="outline" class="text-yellow-600"></span>
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-medium text-gray-800">Notifications</span>
                <span class="text-xs text-gray-500">Manage your alerts</span>
              </div>
            </div>
          </li>
          <li nz-menu-item routerLink="/help" class="!h-12 !px-6 hover:bg-blue-50">
            <div class="flex items-center gap-3">
              <div class="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                <span nz-icon nzType="question-circle" nzTheme="outline" class="text-green-600"></span>
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-medium text-gray-800">Help & Support</span>
                <span class="text-xs text-gray-500">Get assistance</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      
      <!-- Footer with logout -->
      <div class="px-6 py-4 border-t border-gray-100 bg-gray-50">
        <button 
          nz-button 
          nzType="default" 
          nzDanger
          nzBlock
          (click)="onLogout.emit()"
          class="!h-10 !text-sm hover:!bg-red-50 hover:!border-red-200 hover:!text-red-600 transition-colors"
        >
          <div class="flex items-center justify-center gap-2">
            <span nz-icon nzType="logout" nzTheme="outline"></span>
            <span>{{ 'LAYOUT.HEADER.LOGOUT' | translate }}</span>
          </div>
        </button>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoCardComponent {
  user = input<UserInfo | null>(null);
  onLogout = output<void>();
}