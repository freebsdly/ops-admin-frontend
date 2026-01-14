import { Component, ChangeDetectionStrategy, input, output, ViewChild, ElementRef, AfterViewInit, OnDestroy, signal, computed } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzCardModule } from 'ng-zorro-antd/card';
import { RouterLink } from '@angular/router';

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
    NzCardModule,
    RouterLink,
  ],
  template: `
    <div class="h-full bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <!-- Left section: Page title or breadcrumbs can go here -->
      <div class="flex-1">
        <!-- Breadcrumbs or page title area -->
      </div>

      <!-- Right section: User info area -->
      <div class="flex items-center justify-end">
        @if (user()) {
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
              
              <!-- User name and role -->
              <div class="flex flex-col">
                <span class="text-sm font-medium text-gray-800">{{ user()?.name }}</span>
                @if (user()?.role) {
                  <span class="text-xs text-gray-500">{{ user()?.role }}</span>
                }
              </div>
            </div>
          </div>
          
          <!-- Dropdown menu -->
          <nz-dropdown-menu #userMenu="nzDropdownMenu" class="user-info-dropdown">
            <!-- User card with basic info in header -->
            <nz-card nzSize="small" class="!border-0 !shadow-none !p-0">
              <!-- Card header with user basic info -->
              <div nz-card-header class="!px-4 !py-3 !border-b !border-gray-200">
                <div class="flex items-center gap-3">
                  <nz-avatar 
                    nzSize="default" 
                    [nzSrc]="user()?.avatar" 
                    nzText="{{ user()?.name?.charAt(0) || 'U' }}"
                    class="!h-10 !w-10"
                  ></nz-avatar>
                  <div class="flex flex-col">
                    <span class="text-sm font-medium text-gray-800">{{ user()?.name }}</span>
                    @if (user()?.role) {
                      <span class="text-xs text-gray-500">{{ user()?.role }}</span>
                    }
                  </div>
                </div>
              </div>
              
              <!-- Card body with menu items -->
              <div nz-card-body class="!p-0">
                <ul nz-menu nzSelectable="false" class="!border-0">
                  <li nz-menu-item routerLink="/profile" class="!h-10 !px-4">
                    <span nz-icon nzType="user" nzTheme="outline" class="mr-2"></span>
                    <span>Profile</span>
                  </li>
                  <li nz-menu-item routerLink="/settings" class="!h-10 !px-4">
                    <span nz-icon nzType="setting" nzTheme="outline" class="mr-2"></span>
                    <span>Settings</span>
                  </li>
                </ul>
              </div>
              
              <!-- Card footer with button area -->
              <div nz-card-actions class="!px-4 !py-3 !border-t !border-gray-200">
                <button 
                  nz-button 
                  nzType="primary" 
                  nzDanger 
                  nzBlock
                  (click)="onLogout.emit()"
                  class="!h-8 !text-sm"
                >
                  <span nz-icon nzType="logout" nzTheme="outline" class="mr-1"></span>
                  Logout
                </button>
              </div>
            </nz-card>
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
  sidebarCollapsed = input<boolean>(false);

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
    if (!this.userInfoArea?.nativeElement) return;
    
    const width = this.userInfoArea.nativeElement.offsetWidth;
    // Ensure dropdown is at least 280px wide (large)
    const finalWidth = Math.max(width, 280);
    this.dropdownStyle.set({ width: `${finalWidth}px` });
  }
}
