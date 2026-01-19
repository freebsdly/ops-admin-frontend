import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { TranslateModule } from '@ngx-translate/core';
import { AppLanguageSwitcher } from '@/app/language-switcher/language-switcher.component';
import { UserInfoComponent, UserInfo } from '@/app/layout/common/user-info/user-info.component';
import { AppHeaderNotification } from '@/app/layout/common/notification-icon/notification-icon.component';
import { AppModuleSelector } from '@/app/layout/common/module-selector/module-selector.component';

@Component({
  selector: 'app-header',
  imports: [
    NzIconModule,
    NzButtonModule,
    NzSpaceModule,
    TranslateModule,
    AppLanguageSwitcher,
    UserInfoComponent,
    AppHeaderNotification,
    AppModuleSelector,
  ],
  template: `
    <div class="app-header-container">
      <!-- Left section: Logo area -->
      <div class="app-header-logo-area">
        <img src="/logo-expanded.svg" alt="Ops Admin Logo" class="app-header-logo-img" />
      </div>

      <!-- Module selector area -->
      <div class="app-header-module-selector">
        <app-module-selector />
      </div>

      <!-- Spacer for content area -->
      <div class="app-header-actions">
        @if (user()) {
          <nz-space [nzSize]="8">
            <!-- Notification icon -->
            <app-notification-icon />

            <!-- Language switcher -->
            <app-language-switcher />

            <!-- User info component -->
            <app-user-info [user]="user()" (onLogout)="onLogout.emit()" />
          </nz-space>
        }
      </div>
    </div>
  `,
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeader {
  user = input<UserInfo | null>(null);
  sidebarCollapsed = input<boolean>(false);

  onToggleSidebar = output<void>();
  onLogout = output<void>();
}
