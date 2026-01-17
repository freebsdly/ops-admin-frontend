import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  inject,
  OnInit,
  DestroyRef,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MenuService, MenuItem } from '@/app/services/menu.service';

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
          [nzPaddingLeft]="menu.level * 16"
          [nzDisabled]="menu.disabled"
          [nzSelected]="menu.selected"
        >
          <a [routerLink]="menu.path" routerLinkActive="active">
            @if (menu.icon) {
            <nz-icon [nzType]="menu.icon" />
            }
            <span>{{ getTranslatedLabel(menu.key) | translate }}</span>
          </a>
        </li>
        } @else {
        <li
          nz-submenu
          [nzPaddingLeft]="menu.level * 16"
          [nzOpen]="menu.open"
          [nzIcon]="menu.icon"
          [nzTitle]="getTranslatedTitle(menu.key)"
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
export class Menus {
  private readonly menuService = inject(MenuService);
  private readonly translateService = inject(TranslateService);
  private destroyRef = inject(DestroyRef);

  menuItems = signal<MenuItem[]>([]);

  collapsed = input<boolean>(false);

  onToggleCollapsed = output<boolean>();

  constructor() {
    // Subscribe to menu data updates
    this.menuService.getMenuData().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((data) => {
      this.menuItems.set(data);
    });
  }



  getTranslatedLabel(key: string): string {
    // Map menu keys to translation keys
    const translationMap: Record<string, string> = {
      home: 'MENU.HOME',
      dashboard: 'MENU.DASHBOARD',
      analytics: 'MENU.ANALYTICS',
      reports: 'MENU.REPORTS',
      security: 'MENU.SECURITY',
      users: 'MENU.USER_MANAGEMENT',
      roles: 'MENU.ROLE_MANAGEMENT',
      permissions: 'MENU.PERMISSION_MANAGEMENT',
      audit: 'MENU.AUDIT',
      notifications: 'MENU.NOTIFICATIONS',
      operations: 'MENU.OPERATIONS',
      inventory: 'MENU.INVENTORY',
      orders: 'MENU.ORDERS',
      customers: 'MENU.CUSTOMERS',
      products: 'MENU.PRODUCTS',
      categories: 'MENU.CATEGORIES',
      warehouses: 'MENU.WAREHOUSES',
      shipping: 'MENU.SHIPPING',
      finance: 'MENU.FINANCE',
      billing: 'MENU.BILLING',
      invoices: 'MENU.INVOICES',
      payments: 'MENU.PAYMENTS',
      'nested-demo': 'MENU.NESTED_DEMO',
      'level2-item1': 'MENU.LEVEL2_ITEM1',
      'level3-item1': 'MENU.LEVEL3_ITEM1',
      'level3-item2': 'MENU.LEVEL3_ITEM2',
      'level2-item2': 'MENU.LEVEL2_ITEM2',
      'level2-item3': 'MENU.LEVEL2_ITEM3',
      settings: 'MENU.SETTINGS',
    };

    const translationKey = translationMap[key] || `MENU.${key.toUpperCase().replace(/-/g, '_')}`;
    return translationKey;
  }

  getTranslatedTitle(key: string): string {
    const translationKey = this.getTranslatedLabel(key);
    return this.translateService.instant(translationKey);
  }
}
