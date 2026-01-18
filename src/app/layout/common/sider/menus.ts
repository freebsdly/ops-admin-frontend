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
            <span>{{ menu.key | translate }}</span>
          </a>
        </li>
        } @else {
        <li
          nz-submenu
          [nzPaddingLeft]="menu.level * 16"
          [nzOpen]="collapsed() ? undefined : menu.open"
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
export class AppMenus {
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

  getTranslatedTitle(key: string): string {
    return this.translateService.instant(key);
  }
}
