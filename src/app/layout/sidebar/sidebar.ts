import { Component, ChangeDetectionStrategy, input, output, signal, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  DashboardOutline,
  TeamOutline,
  SettingOutline,
  AppstoreOutline,
  FileTextOutline,
  BarChartOutline,
  DatabaseOutline,
  BellOutline,
  MenuFoldOutline,
  MenuUnfoldOutline
} from '@ant-design/icons-angular/icons';

export interface SidebarItem {
  label: string;
  icon: IconDefinition;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    NzIconModule,
    NzMenuModule,
    NzButtonModule,
    NzTooltipModule,
  ],
  template: `
    @if (collapsed()) {
      <!-- Collapsed sidebar - just icons with tooltips -->
      <div class="h-full border-gray-200 flex flex-col">
        <!-- Menu items -->
        <ul nz-menu nzMode="inline" class="!border-0 flex-1" [nzInlineCollapsed]="collapsed()">
          @for (item of items(); track item.route) {
            <li nz-menu-item>
              <a [routerLink]="item.route" routerLinkActive="active" class="flex items-center h-12 no-wrap"
                [class.justify-center]="collapsed()"
              >
                <span nz-icon [nzType]="item.icon.name" nzTheme="outline" class="text-lg"></span>
                @if (!collapsed()) {
                  <span class="ml-3 whitespace-nowrap">{{ item.label }}</span>
                }
              </a>
            </li>
          }
        </ul>
      </div>
    } @else {
      <!-- Expanded sidebar -->
      <div class="h-full bg-white border-gray-200 w-full flex flex-col transition-all duration-200">
        <!-- Menu items -->
        <ul nz-menu nzMode="inline" class="!border-0 flex-1 pt-6" [nzInlineCollapsed]="collapsed()">
          @for (item of items(); track item.route) {
            <li nz-menu-item>
              <a [routerLink]="item.route" routerLinkActive="active" class="p-4 flex items-center">
                <span nz-icon [nzType]="item.icon.name" nzTheme="outline" class="mr-3"></span>
                <span>{{ item.label }}</span>
              </a>
            </li>
          }
        </ul>
      </div>
    }
  `,
  styleUrl: './sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar implements OnInit {
  private readonly iconService = inject(NzIconService);

  items = input<SidebarItem[]>([
    { label: 'Dashboard', icon: DashboardOutline, route: '/dashboard' },
    { label: 'Users', icon: TeamOutline, route: '/users' },
    { label: 'Services', icon: AppstoreOutline, route: '/services' },
    { label: 'Monitoring', icon: BarChartOutline, route: '/monitoring' },
    { label: 'Database', icon: DatabaseOutline, route: '/database' },
    { label: 'Documents', icon: FileTextOutline, route: '/documents' },
    { label: 'Alerts', icon: BellOutline, route: '/alerts' },
    { label: 'Settings', icon: SettingOutline, route: '/settings' },
  ]);

  collapsed = input<boolean>(false);

  onToggleCollapsed = output<boolean>();

  ngOnInit() {
    // Register all icons
    const icons: IconDefinition[] = [
      DashboardOutline,
      TeamOutline,
      SettingOutline,
      AppstoreOutline,
      FileTextOutline,
      BarChartOutline,
      DatabaseOutline,
      BellOutline,
      MenuFoldOutline,
      MenuUnfoldOutline
    ];

    this.iconService.addIcon(...icons);
  }
}
