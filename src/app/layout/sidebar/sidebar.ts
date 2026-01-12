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
  MenuUnfoldOutline,
  HomeOutline,
  SafetyCertificateOutline
} from '@ant-design/icons-angular/icons';
import { MenuService, MenuItem } from '../../services/menu.service';
import { Observable, map } from 'rxjs';

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
          @for (item of menuItems(); track item.path) {
            <li nz-menu-item>
              <a [routerLink]="item.path" routerLinkActive="active" class="flex items-center h-12 no-wrap"
                [class.justify-center]="collapsed()"
              >
                <span nz-icon [nzType]="getIcon(item.icon)" nzTheme="outline" class="text-lg"></span>
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
          @for (item of menuItems(); track item.path) {
            <li nz-menu-item>
              <a [routerLink]="item.path" routerLinkActive="active" class="p-4 flex items-center">
                <span nz-icon [nzType]="getIcon(item.icon)" nzTheme="outline" class="mr-3"></span>
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
  private readonly menuService = inject(MenuService);
  
  menuItems = signal<MenuItem[]>([]);

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
      MenuUnfoldOutline,
      HomeOutline,
      SafetyCertificateOutline
    ];

    this.iconService.addIcon(...icons);

    // Load menu data from service
    this.menuService.getMenuData().subscribe(data => {
      this.menuItems.set(data);
    });
  }

  getIcon(iconName?: string): string {
    // Map service icon names to Ant Design icon names
    const iconMap: Record<string, string> = {
      home: 'home',
      dashboard: 'dashboard',
      user: 'user',
      team: 'team',
      safety: 'safety-certificate',
      setting: 'setting'
    };
    return iconMap[iconName || ''] || 'appstore';
  }
}
