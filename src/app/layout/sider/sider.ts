import { Component, ChangeDetectionStrategy, input, output, OnInit } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzIconService } from 'ng-zorro-antd/icon';
import { MenuFoldOutline, MenuUnfoldOutline } from '@ant-design/icons-angular/icons';
import { Menus } from '@/app/layout/sider/menus';

@Component({
  selector: 'app-sider',
  imports: [NzIconModule, NzButtonModule, NzLayoutModule, NzTooltipModule, Menus],
  template: `
    <nz-sider [nzCollapsed]="collapsed()" [nzWidth]="240" [nzCollapsedWidth]="48" class="!bg-gray-100 flex flex-col full-height relative">
          <!-- Collapse button - half circle on right border at bottom -->
      <button
        nz-button
        nzType="primary"
        nzShape="circle"
        (click)="onToggleCollapsed.emit()"
        class="collapse-button"
        nzTooltipPlacement="right"
      >
        <span nz-icon [nzType]="collapsed() ? 'menu-unfold' : 'menu-fold'"></span>
      </button>  
    <!-- Scrollable menu area - fills remaining space -->
      <div class="flex-1 min-h-0 overflow-y-auto hidden-scrollbar bg-gray-100" [class.overflow-x-hidden]="!collapsed()">
        <app-menus
          [collapsed]="collapsed()"
          (onToggleCollapsed)="onToggleCollapsed.emit()"
          class="block h-auto"
        />
      </div>
      <!-- Sidebar footer (collapsible trigger) - fixed at bottom -->
      <div class="sidebar-footer border-t border-gray-200 flex items-center justify-center mt-auto">
        <p>v6.1.0</p>
      </div>
    </nz-sider>
  `,
  styleUrl: './sider.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sider implements OnInit {
  collapsed = input<boolean>(false);

  onToggleCollapsed = output<void>();

  constructor(private iconService: NzIconService) {}

  ngOnInit(): void {
    this.iconService.addIcon(MenuFoldOutline, MenuUnfoldOutline);
  }
}
