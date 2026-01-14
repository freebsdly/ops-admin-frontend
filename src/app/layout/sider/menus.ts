import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  inject,
  OnInit,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { TranslateModule } from '@ngx-translate/core';
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
  SafetyOutline,
} from '@ant-design/icons-angular/icons';
import { MenuService, MenuItem } from '../../services/menu.service';

@Component({
  selector: 'app-menus',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgTemplateOutlet,
    NzIconModule,
    NzMenuModule,
    NzButtonModule,
    NzTooltipModule,
    TranslateModule,
  ],
  template: `
    <ul
      nz-menu
      nzMode="inline"
      class="sidebar-width"
      [nzInlineCollapsed]="collapsed()"
      nzMenuTooltipPlacement="right"
    >
      <ng-container *ngTemplateOutlet="menuTpl; context: { $implicit: menuItems() }"></ng-container>
      <ng-template #menuTpl let-menus>
        @for (menu of menus; track menu.key) { @if (!menu.children || menu.children.length === 0) {
        <li
          nz-menu-item
          [nzPaddingLeft]="menu.level * 16 + 4"
          [nzDisabled]="menu.disabled"
          [nzSelected]="menu.selected"
        >
          <a [routerLink]="menu.path" routerLinkActive="active">
            @if (menu.icon) {
            <nz-icon [nzType]="getIcon(menu.icon)" />
            }
            <span>{{ getTranslatedLabel(menu.key) | translate}}</span>
          </a>
        </li>
        } @else {
        <li
          nz-submenu
          [nzPaddingLeft]="menu.level * 16 + 4"
          [nzOpen]="menu.open"
          [nzTitle]="getTranslatedLabel(menu.key)"
          [nzIcon]="getIcon(menu.icon)"
          [nzDisabled]="menu.disabled"
        >
          <ul>
            <ng-container *ngTemplateOutlet="menuTpl; context: { $implicit: menu.children }" />
          </ul>
        </li>
        } }
      </ng-template>
    </ul>
  `,
  styleUrl: './menus.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menus implements OnInit {
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
      SafetyOutline,
    ];

    this.iconService.addIcon(...icons);

    // Load menu data from service
    this.menuService.getMenuData().subscribe((data) => {
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
      setting: 'setting',
    };
    return iconMap[iconName || ''] || 'appstore';
  }

  getTranslatedLabel(key: string): string {
    // Map menu keys to translation keys
    const translationMap: Record<string, string> = {
      home: 'MENU.DASHBOARD',
      profile: 'MENU.USER_MANAGEMENT',
      roles: 'MENU.ROLE_MANAGEMENT',
      permissions: 'MENU.PERMISSION_MANAGEMENT',
      reports: 'MENU.REPORTS',
      'system-reports': 'MENU.SYSTEM_REPORTS',
      'user-reports': 'MENU.USER_REPORTS',
      'performance-reports': 'MENU.PERFORMANCE_REPORTS',
      settings: 'MENU.SETTINGS',
      'general-settings': 'MENU.GENERAL_SETTINGS',
      'authentication-settings': 'MENU.AUTHENTICATION_SETTINGS',
      'notifications-settings': 'MENU.NOTIFICATIONS_SETTINGS',
      'encryption-settings': 'MENU.ENCRYPTION_SETTINGS',
      logout: 'MENU.LOGOUT',
    };

    const translationKey = translationMap[key] || `MENU.${key.toUpperCase().replace(/-/g, '_')}`;
    return translationKey;
  }
}
