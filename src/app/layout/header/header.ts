import { Component, ChangeDetectionStrategy, input, output, ViewChild, ElementRef, AfterViewInit, OnDestroy, signal, computed } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
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
    RouterLink,
  ],
  template: `
    <div class="h-16 bg-white border-b border-gray-200 flex items-center justify-between sticky top-0 z-0 shadow-sm">
      <!-- Logo area: width matches sidebar, height matches header -->
      <div class="h-16 flex items-center justify-center border-r border-gray-200 box-border transition-all duration-200" [style.width.px]="sidebarCollapsed() ? 80 : 256">
        <img src="/logo.svg" alt="Ops Admin Logo" class="h-10 w-auto" />
      </div>

      <!-- Right section: User info area -->
      <div class="flex-1 flex items-center justify-end">
        @if (user()) {
          <!-- User info area with same height as header -->
          <div 
            #userInfoArea
            nz-dropdown 
            [nzDropdownMenu]="userMenu" 
            nzPlacement="bottomRight"
            [nzOverlayStyle]="dropdownStyle()"
            class="h-16 flex items-center cursor-pointer hover:bg-gray-50 px-6 border-l border-gray-200 transition-colors"
          >
            <!-- User avatar/image -->
            <div class="flex items-center gap-3">
              <nz-avatar 
                nzSize="default" 
                [nzSrc]="user()?.avatar" 
                nzText="{{ user()?.name?.charAt(0) || 'U' }}"
                class="!h-12 !w-12"
              ></nz-avatar>
              
              <!-- User name and role (hidden when sidebar collapsed) -->
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
            <ul nz-menu nzSelectable="false">
              <li nz-menu-item routerLink="/profile">
                <span nz-icon nzType="user" nzTheme="outline"></span>
                <span>Profile</span>
              </li>
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
    this.dropdownStyle.set({ width: `${width}px` });
  }
}
