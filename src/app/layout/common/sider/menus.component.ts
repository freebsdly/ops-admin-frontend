import {
  Component,
  ChangeDetectionStrategy,
  input,
  inject,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { MenuService, MenuItem } from '@/app/services/menu.service';

@Component({
  selector: 'app-menus',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgTemplateOutlet,
    NzIconModule,
    NzMenuModule,
    NzTooltipModule,
    TranslateModule,
  ],
  template: `
    <ul
      nz-menu
      nzMode="inline"
      class="app-layout-sidebar-width"
      [nzInlineCollapsed]="collapsed()"
      nzMenuTooltipPlacement="right"
    >
      <ng-container *ngTemplateOutlet="menuTpl; context: { $implicit: menuItems() }"></ng-container>
      <ng-template #menuTpl let-menus>
        @for (menu of menus; track menu.key) { @if (!menu.children || menu.children.length === 0) {
        <li
          nz-menu-item
          [nzPaddingLeft]="menu.level * 8"
          [nzDisabled]="menu.disabled"
          [nzSelected]="menu.selected"
        >
          <a [routerLink]="menu.path" routerLinkActive="active">
            @if (menu.icon) {
            <nz-icon [nzType]="menu.icon" />
            }
            <span>{{ menu.key | translate }}</span>
          </a>
        </li>
        } @else {
        <li
          nz-submenu
          [nzPaddingLeft]="menu.level * 8"
          [nzOpen]="collapsed() ? undefined : menu.open"
          [nzIcon]="menu.icon"
          [nzTitle]="menu.key | translate"
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
  styleUrl: './menus.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppMenus {
  collapsed = input<boolean>(false);

  private readonly menuService = inject(MenuService);
  readonly menuItems = this.menuService.selectedModuleMenuItems;
}
