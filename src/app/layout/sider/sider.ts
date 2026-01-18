import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { Menus } from '@/app/layout/sider/menus';

@Component({
  selector: 'app-sider',
  imports: [NzLayoutModule, Menus],
  template: `
    <nz-sider [nzCollapsed]="collapsed()" [nzWidth]="240" [nzCollapsedWidth]="48" class="!bg-gray-100 flex flex-col full-height relative">
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
export class Sider {
  collapsed = input<boolean>(false);

  onToggleCollapsed = output<void>();

  constructor() {}
}
