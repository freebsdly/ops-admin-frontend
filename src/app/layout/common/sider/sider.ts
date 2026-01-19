import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { AppMenus } from '@/app/layout/common/sider/menus';

@Component({
  selector: 'app-sider',
  imports: [NzLayoutModule, AppMenus],
  template: `
    <nz-sider [nzCollapsed]="collapsed()" [nzWidth]="200" [nzCollapsedWidth]="0" class="!bg-gray-100 flex flex-col h-full relative">
      <!-- Scrollable menu area - fills remaining space -->
      <div class="flex-1 min-h-0 overflow-y-auto app-sider-hidden-scrollbar bg-gray-100" [class.overflow-x-hidden]="!collapsed()">
        <app-menus [collapsed]="collapsed()" />
      </div>
      <!-- Sidebar footer (collapsible trigger) - fixed at bottom -->
      <div class="app-sider-footer border-t border-gray-200 flex items-center justify-center mt-auto">
        <p>v6.1.0</p>
      </div>
    </nz-sider>
  `,
  styleUrl: './sider.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSider {
  collapsed = input<boolean>(false);
}
