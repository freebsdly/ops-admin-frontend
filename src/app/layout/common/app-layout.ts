import { Component, ChangeDetectionStrategy, computed, signal, OnInit } from '@angular/core';
import { AuthService } from '@/app/services/auth.service';
import { Router } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzIconService } from 'ng-zorro-antd/icon';
import { MenuFoldOutline, MenuUnfoldOutline } from '@ant-design/icons-angular/icons';
import { AppSider } from '@/app/layout/common/sider/sider.component';
import { AppHeader } from '@/app/layout/common/header/header';
import { AppTabBar } from '@/app/layout/common/tabs/tabs';
import { LanguageSwitcherComponent } from '@/app/language-switcher/language-switcher.component';
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
    NzTooltipModule,
    AppSider,
    AppHeader,
    AppTabBar,
    LanguageSwitcherComponent,
    TranslateModule,
  ],
  template: `
    <!-- Main layout container -->
    <div class="flex flex-col h-screen">
      <!-- Header (full width at top) -->
      <app-header
        [user]="user()"
        [sidebarCollapsed]="sidebarCollapsed()"
        (onToggleSidebar)="toggleSidebar()"
        (onLogout)="logout()"
        class="h-12"
      />

      <!-- Main content area with sidebar -->
      <div class="flex-1 flex min-h-0 relative">
        <!-- Left column: Sidebar component -->
        <app-sider [collapsed]="sidebarCollapsed()" />

        <!-- Collapse button - half circle on sider right border -->
        <button
          nz-button
          nzType="primary"
          nzShape="circle"
          (click)="toggleSidebar()"
          class="app-layout-collapse-button"
          [class.app-layout-collapse-button-collapsed]="sidebarCollapsed()"
          [class.app-layout-collapse-button-expanded]="!sidebarCollapsed()"
          nzTooltipPlacement="right"
        >
          <span nz-icon [nzType]="sidebarCollapsed() ? 'menu-unfold' : 'menu-fold'"></span>
        </button>

        <!-- Right column: Content area -->
        <div class="flex-1 flex flex-col min-w-0">
          <!-- Tab Bar -->
          <app-tabbar class="h-8 border-b border-gray-200" />

        <!-- Main content area -->
        <div class="flex-1 min-h-0 overflow-auto bg-white p-4 content-area">
          <ng-content />
        </div>

        <!-- Footer -->
        @if (showFooter()) {
        <div class="h-12 bg-white border-t border-gray-200 flex items-center justify-between px-4">
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
export class AppLayout implements OnInit {
  user = computed(() => this.authService.user());
  sidebarCollapsed = signal(false);
  showFooter = signal(false);

  constructor(private authService: AuthService, private router: Router, private iconService: NzIconService) {}

  ngOnInit(): void {
    this.iconService.addIcon(MenuFoldOutline, MenuUnfoldOutline);
  }

  toggleSidebar(): void {
    this.sidebarCollapsed.set(!this.sidebarCollapsed());
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
