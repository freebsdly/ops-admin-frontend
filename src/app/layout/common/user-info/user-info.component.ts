import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  signal,
} from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

export interface UserInfo {
  name: string;
  avatar?: string;
  role?: string;
}

@Component({
  selector: 'app-user-info',
  imports: [
    NzAvatarModule,
    NzButtonModule,
    NzMenuModule,
    NzIconModule,
    NzDropdownModule,
    NzCardModule,
    NzStatisticModule,
    NzSpaceModule,
    RouterLink,
    TranslateModule,
  ],
  template: `
    @if (user()) {
      <!-- Avatar trigger -->
      <div
        #userInfoArea
        nz-dropdown
        [nzDropdownMenu]="userMenu"
        nzTrigger="hover"
        nzPlacement="bottomRight"
        [nzOverlayStyle]="dropdownStyle()"
        class="app-user-info-trigger"
      >
        <nz-avatar
          nzSize="default"
          [nzSrc]="user()?.avatar"
          nzText="{{ user()?.name?.charAt(0) || 'U' }}"
          class="app-user-info-trigger-avatar"
        ></nz-avatar>
      </div>

      <!-- Dropdown menu with user card -->
      <nz-dropdown-menu #userMenu="nzDropdownMenu">
        <nz-card class="app-user-info-card" [nzBordered]="false">
          <!-- User profile header -->
          <div class="app-user-info-profile-header">
            <nz-space [nzSize]="'large'" nzAlign="center">
              <nz-avatar
                nzSize="large"
                [nzSrc]="user()?.avatar"
                nzText="{{ user()?.name?.charAt(0) || 'U' }}"
                class="app-user-info-profile-avatar"
              ></nz-avatar>
              <div>
                <div class="app-user-info-name">{{ user()?.name }}</div>
                @if (user()?.role) {
                  <div class="app-user-info-role">{{ user()?.role }}</div>
                }
                <div class="app-user-info-status">
                  <span nz-icon nzType="check-circle" nzTheme="outline" class="app-user-info-status-icon"></span>
                  <span>{{ 'USER_CARD.STATUS_ONLINE' | translate }}</span>
                </div>
              </div>
            </nz-space>
          </div>

          <!-- Quick stats/info -->
          <div class="app-user-info-stats">
            <nz-statistic [nzTitle]="'USER_CARD.STATS_PROJECTS' | translate" [nzValue]="12"></nz-statistic>
            <nz-statistic [nzTitle]="'USER_CARD.STATS_TASKS' | translate" [nzValue]="47"></nz-statistic>
            <nz-statistic [nzTitle]="'USER_CARD.STATS_TEAMS' | translate" [nzValue]="3"></nz-statistic>
          </div>

          <!-- Navigation menu -->
          <ul nz-menu nzSelectable="false" class="app-user-info-menu">
            <li nz-menu-item routerLink="/profile" class="app-user-info-menu-item">
              <nz-space [nzSize]="'middle'">
                <span nz-icon nzType="user" nzTheme="outline" class="app-user-info-menu-icon app-user-info-menu-icon-blue"></span>
                <div class="app-user-info-menu-text">
                  <div class="app-user-info-menu-title">{{ 'LAYOUT.HEADER.PROFILE' | translate }}</div>
                  <div class="app-user-info-menu-desc">{{ 'USER_CARD.PROFILE_DESCRIPTION' | translate }}</div>
                </div>
              </nz-space>
            </li>
            <li nz-menu-item routerLink="/settings" class="app-user-info-menu-item">
              <nz-space [nzSize]="'middle'">
                <span nz-icon nzType="setting" nzTheme="outline" class="app-user-info-menu-icon app-user-info-menu-icon-purple"></span>
                <div class="app-user-info-menu-text">
                  <div class="app-user-info-menu-title">{{ 'LAYOUT.HEADER.SETTINGS' | translate }}</div>
                  <div class="app-user-info-menu-desc">{{ 'USER_CARD.SETTINGS_DESCRIPTION' | translate }}</div>
                </div>
              </nz-space>
            </li>
            <li nz-menu-item routerLink="/notifications" class="app-user-info-menu-item">
              <nz-space [nzSize]="'middle'">
                <span nz-icon nzType="bell" nzTheme="outline" class="app-user-info-menu-icon app-user-info-menu-icon-yellow"></span>
                <div class="app-user-info-menu-text">
                  <div class="app-user-info-menu-title">{{ 'USER_CARD.NOTIFICATIONS' | translate }}</div>
                  <div class="app-user-info-menu-desc">{{ 'USER_CARD.NOTIFICATIONS_DESCRIPTION' | translate }}</div>
                </div>
              </nz-space>
            </li>
            <li nz-menu-item routerLink="/help" class="app-user-info-menu-item">
              <nz-space [nzSize]="'middle'">
                <span nz-icon nzType="question-circle" nzTheme="outline" class="app-user-info-menu-icon app-user-info-menu-icon-green"></span>
                <div class="app-user-info-menu-text">
                  <div class="app-user-info-menu-title">{{ 'USER_CARD.HELP_SUPPORT' | translate }}</div>
                  <div class="app-user-info-menu-desc">{{ 'USER_CARD.HELP_DESCRIPTION' | translate }}</div>
                </div>
              </nz-space>
            </li>
          </ul>

          <!-- Footer with logout -->
          <div class="app-user-info-footer">
            <button
              nz-button
              nzType="default"
              nzDanger
              nzBlock
              (click)="onLogout.emit()"
              class="app-user-info-logout-button"
            >
              <span nz-icon nzType="logout" nzTheme="outline"></span>
              <span>{{ 'LAYOUT.HEADER.LOGOUT' | translate }}</span>
            </button>
          </div>
        </nz-card>
      </nz-dropdown-menu>
    }
  `,
  styleUrl: './user-info.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent implements AfterViewInit, OnDestroy {
  user = input<UserInfo | null>(null);
  onLogout = output<void>();

  @ViewChild('userInfoArea') userInfoArea!: ElementRef<HTMLDivElement>;

  private resizeObserver: ResizeObserver | null = null;

  dropdownStyle = signal<{ [key: string]: string }>({});

  ngAfterViewInit() {
    this.updateDropdownWidth();

    // Observe resize of user info area
    this.resizeObserver = new ResizeObserver(() => {
      this.updateDropdownWidth();
    });

    this.resizeObserver.observe(this.userInfoArea.nativeElement);
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private updateDropdownWidth() {
    // Fixed width for the redesigned user card (320px = w-80)
    this.dropdownStyle.set({ width: '320px' });
  }
}