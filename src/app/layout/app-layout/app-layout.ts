import { Component, ChangeDetectionStrategy, computed } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { IconDefinition } from '@ant-design/icons-angular';
import { UserOutline, LogoutOutline, HomeOutline } from '@ant-design/icons-angular/icons';

@Component({
  selector: 'app-app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzIconModule,
    NzDropdownModule,
    NzAvatarModule,
    NzSpaceModule,
    NzBreadCrumbModule,
  ],
  template: `
    <nz-layout class="min-h-screen">
      <nz-header class="!bg-white !px-0 shadow-sm border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <!-- Logo/Brand -->
            <div class="flex items-center">
              <h1 class="text-xl font-bold text-gray-900 m-0">
                Ops Admin
              </h1>
            </div>

            <!-- Navigation Menu -->
            <ul nz-menu nzMode="horizontal" class="!border-0 !bg-transparent hidden md:flex">
              <li nz-menu-item nzMatchRouter>
                <a routerLink="/home" routerLinkActive="active">
                  <span nz-icon nzType="home" nzTheme="outline"></span>
                  <span>Home</span>
                </a>
              </li>
            </ul>

            <!-- User Menu -->
            @if (user()) {
            <div class="flex items-center">
              <div nz-dropdown [nzDropdownMenu]="userMenu" nzPlacement="bottomRight" class="flex items-center cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
                  <nz-avatar nzSize="small" nzText="{{ user()?.name?.charAt(0) || 'U' }}" class="mr-2"></nz-avatar>
                  <span class="text-sm text-gray-700 mr-1">{{ user()?.name }}</span>
                </div>
                <nz-dropdown-menu #userMenu="nzDropdownMenu">
                  <ul nz-menu nzSelectable="false">
                    <li nz-menu-item (click)="logout()">
                      <span nz-icon nzType="logout" nzTheme="outline"></span>
                      <span>Logout</span>
                    </li>
                  </ul>
                </nz-dropdown-menu>
            </div>
            }
          </div>
        </div>
      </nz-header>

      <nz-content class="flex-grow bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <router-outlet />
        </div>
      </nz-content>

      <nz-footer class="!bg-white border-t border-gray-200 text-center">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center">
            <p class="text-sm text-gray-500 mb-0">
              © 2026 Ops Admin. All rights reserved.
            </p>
            <div class="flex space-x-6">
              <a href="#" class="text-sm text-gray-500 hover:text-gray-700">
                Privacy
              </a>
              <a href="#" class="text-sm text-gray-500 hover:text-gray-700">
                Terms
              </a>
            </div>
          </div>
        </div>
      </nz-footer>
    </nz-layout>
  `,
  styleUrl: './app-layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayout {
  user = computed(() => this.authService.user());

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Register icons
    const icons: IconDefinition[] = [UserOutline, LogoutOutline, HomeOutline];
    // Note: In a real app, you would use NzIconService.addIcon() here
    // but for standalone components, we need to handle this differently
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
