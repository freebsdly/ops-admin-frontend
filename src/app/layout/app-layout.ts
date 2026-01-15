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
import { UserOutline, LogoutOutline, HomeOutline, SettingOutline, GlobalOutline } from '@ant-design/icons-angular/icons';
import { Sider } from './sider/sider';
import { AppHeader } from './header/header';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  imports: [
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzIconModule,
    NzDropdownModule,
    NzAvatarModule,
    NzSpaceModule,
    NzBreadCrumbModule,
    Sider,
    AppHeader,
    LanguageSwitcherComponent,
    TranslateModule,
  ],
  template: `
    <!-- Main two-column layout -->
    <div class="app-layout-container h-screen flex">
      <!-- Left column: Sidebar component -->
      <app-sider
        [collapsed]="sidebarCollapsed()"
        (onToggleCollapsed)="toggleSidebar()"
      />

      <!-- Right column: Content area -->
      <div class="flex-1 flex flex-col h-full min-w-0">
        <!-- Header (same height as sidebar header) -->
        <app-header
          [user]="user()"
          (onToggleSidebar)="toggleSidebar()"
          (onLogout)="logout()"
          class="h-12"
        />

        <!-- Main content area -->
        <div class="flex-1 min-h-0 overflow-auto bg-gray-50 p-6">
          <ng-content />
        </div>

        <!-- Footer -->
        @if (showFooter()) {
          <div class="h-12 bg-white border-t border-gray-200 flex items-center justify-between px-6">
            <p class="text-sm text-gray-500 mb-0">
              {{ 'APP.TITLE' | translate }} © 2026. {{ 'COMMON.ALL_RIGHTS_RESERVED' | translate }}
            </p>
            <div class="flex items-center space-x-6">
              <app-language-switcher />
              <a href="#" class="text-sm text-gray-500 hover:text-gray-700">
                {{ 'BUTTONS.PRIVACY' | translate }}
              </a>
              <a href="#" class="text-sm text-gray-500 hover:text-gray-700">
                {{ 'BUTTONS.TERMS' | translate }}
              </a>
            </div>
          </div>
        }
      </div>
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
    const icons: IconDefinition[] = [UserOutline, LogoutOutline, HomeOutline, SettingOutline, GlobalOutline];
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
