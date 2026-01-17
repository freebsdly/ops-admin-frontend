import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { Menus } from '@/app/layout/sider/menus';

@Component({
  selector: 'app-sider',
  imports: [NzIconModule, NzButtonModule, NzLayoutModule, Menus],
  template: `
    <nz-sider [nzCollapsed]="collapsed()" [nzWidth]="220" [nzCollapsedWidth]="48" class="!bg-gray-100 flex flex-col full-height">
      <!-- Scrollable menu area - fills remaining space -->
      <div class="flex-1 min-h-0 overflow-y-auto hidden-scrollbar bg-gray-100" [class.overflow-x-hidden]="!collapsed()">
        <app-menus
          [collapsed]="collapsed()"
          (onToggleCollapsed)="onToggleCollapsed.emit()"
          class="block h-auto"
        />
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
