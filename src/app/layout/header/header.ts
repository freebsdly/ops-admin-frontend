import { Component, ChangeDetectionStrategy, input, output, ViewChild, ElementRef, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../../language-switcher/language-switcher.component';
import { UserInfoCardComponent, UserInfo } from '../../components/user-info-card/user-info-card.component';

@Component({
  selector: 'app-header',
  imports: [
    NzIconModule,
    NzButtonModule,
    NzAvatarModule,
    NzDropdownModule,
    NzMenuModule,
    NzTooltipModule,
    NzCardModule,
    NzSpaceModule,
    TranslateModule,
    LanguageSwitcherComponent,
    UserInfoCardComponent,
  ],
  template: `
    <div class="h-full bg-white border-b border-gray-200 flex items-center justify-between px-4">
      <!-- Left section: Page title or breadcrumbs area -->
      <div class="flex-1">
        <!-- Breadcrumbs or page title can go here -->
      </div>

      <!-- Right section: User info area -->
      <div class="flex items-center justify-end">
        @if (user()) {
          <nz-space [nzSize]="8">
            <!-- Language switcher -->
            <app-language-switcher />

            <!-- User info area -->
            <div
              #userInfoArea
              nz-dropdown
              [nzDropdownMenu]="userMenu"
              nzPlacement="bottomRight"
              [nzOverlayStyle]="dropdownStyle()"
              class="h-full flex items-center cursor-pointer hover:bg-gray-50 px-4 border-l border-gray-200 transition-colors"
            >
              <!-- User avatar/image -->
              <div class="flex items-center gap-3">
                <nz-avatar
                  nzSize="default"
                  [nzSrc]="user()?.avatar"
                  nzText="{{ user()?.name?.charAt(0) || 'U' }}"
                  class="!h-8 !w-8"
                ></nz-avatar>
              </div>
            </div>
          </nz-space>

          <!-- Dropdown menu -->
          <nz-dropdown-menu #userMenu="nzDropdownMenu" class="user-info-dropdown">
            <app-user-info-card
              [user]="user()"
              (onLogout)="onLogout.emit()"
            />
          </nz-dropdown-menu>
        }
      </div>
    </div>
  `,
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeader implements AfterViewInit, OnDestroy {
  user = input<UserInfo | null>(null);

  onToggleSidebar = output<void>();
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
