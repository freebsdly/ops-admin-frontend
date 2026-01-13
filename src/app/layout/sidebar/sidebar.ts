import { Component, ChangeDetectionStrategy, input, output, signal, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
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
  SafetyCertificateOutline,
  ShoppingOutline,
  CarOutline,
  DollarOutline,
  CreditCardOutline,
  UserOutline,
  SafetyOutline
} from '@ant-design/icons-angular/icons';
import { MenuService, MenuItem } from '../../services/menu.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgTemplateOutlet,
    NzIconModule,
    NzMenuModule,
    NzButtonModule,
    NzTooltipModule,
  ],
  template: `
    <ul nz-menu nzMode="inline" style="width: 256px;" [nzInlineCollapsed]="collapsed()">
      <ng-container *ngTemplateOutlet="menuTpl; context: { $implicit: menuItems() }"></ng-container>
      <ng-template #menuTpl let-menus>
        @for (menu of menus; track menu.key) {
          @if (!menu.children || menu.children.length === 0) {
            <li
              nz-menu-item
              [nzPaddingLeft]="menu.level * 24"
              [nzDisabled]="menu.disabled"
              [nzSelected]="menu.selected"
            >
              <a [routerLink]="menu.path" routerLinkActive="active">
                @if (menu.icon) {
                  <nz-icon [nzType]="getIcon(menu.icon)" />
                }
                <span>{{ menu.label }}</span>
              </a>
            </li>
          } @else {
            <li
              nz-submenu
              [nzPaddingLeft]="menu.level * 24"
              [nzOpen]="menu.open"
              [nzTitle]="menu.label"
              [nzIcon]="getIcon(menu.icon)"
              [nzDisabled]="menu.disabled"
            >
              <ul>
                <ng-container *ngTemplateOutlet="menuTpl; context: { $implicit: menu.children }" />
              </ul>
            </li>
          }
        }
      </ng-template>
    </ul>
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
      SafetyCertificateOutline,
      ShoppingOutline,
      CarOutline,
      DollarOutline,
      CreditCardOutline,
      UserOutline,
      SafetyOutline
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
      'bar-chart': 'bar-chart',
      'file-text': 'file-text',
      user: 'user',
      team: 'team',
      safety: 'safety',
      'safety-certificate': 'safety-certificate',
      database: 'database',
      bell: 'bell',
      appstore: 'appstore',
      shopping: 'shopping',
      car: 'car',
      dollar: 'dollar',
      'credit-card': 'credit-card',
      setting: 'setting'
    };
    return iconMap[iconName || ''] || 'appstore';
  }
}
