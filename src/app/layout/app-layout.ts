import { Component, ChangeDetectionStrategy, computed, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { IconDefinition } from '@ant-design/icons-angular';
import { UserOutline, LogoutOutline, HomeOutline, SettingOutline } from '@ant-design/icons-angular/icons';
import { Sidebar } from './sidebar/sidebar';
import { AppHeader } from './header/header';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzIconModule,
    NzDropdownModule,
    NzAvatarModule,
    NzSpaceModule,
    NzBreadCrumbModule,
    Sidebar,
    AppHeader,
  ],
  template: `
    <!-- AppHeader at the top -->
    <app-header
      [user]="user()"
      [sidebarCollapsed]="sidebarCollapsed()"
      (onToggleSidebar)="toggleSidebar()"
      (onLogout)="logout()"
      class="sticky top-0 z-50"
    />

    <!-- Main content area with sidebar and content -->
    <div class="app-layout-container">
      <nz-layout class="h-full">
        <nz-sider
          [nzCollapsed]="sidebarCollapsed()"
          [nzWidth]="sidebarCollapsed() ? 56 : 256"
          nzCollapsible
          (nzCollapsedChange)="sidebarCollapsed.set($event)"
          class="border-r border-gray-200 !bg-white"
          style="height: 100%;"
        >
          <app-sidebar
            [collapsed]="sidebarCollapsed()"
            (onToggleCollapsed)="toggleSidebar()"
            class="block h-full"
          />
        </nz-sider>

        <nz-layout class="flex-col h-full">
          <nz-content class="flex-grow bg-gray-50 p-6 min-h-0 overflow-auto">
            <router-outlet />
          </nz-content>

          @if (showFooter()) {
            <nz-footer class="!bg-white border-t border-gray-200 py-4">
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
            </nz-footer>
          }
        </nz-layout>
      </nz-layout>
    </div>
  `,
  styleUrl: './app-layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayout {
  private readonly iconService = inject(NzIconService);

  user = computed(() => this.authService.user());
  sidebarCollapsed = signal(false);
  showFooter = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Register icons
    const icons: IconDefinition[] = [UserOutline, LogoutOutline, HomeOutline, SettingOutline];
    this.iconService.addIcon(...icons);
  }

  toggleSidebar(): void {
    this.sidebarCollapsed.set(!this.sidebarCollapsed());
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
