import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AppMenus } from '@/app/layout/common/sider/menus.component';

@Component({
  selector: 'app-sider',
  imports: [NzLayoutModule, NzIconModule, AppMenus],
  template: `
    <nz-sider [nzCollapsed]="collapsed()" [nzWidth]="200" [nzCollapsedWidth]="0" class="app-sider-container">
      <!-- Sider header with branding -->
      <div class="app-sider-header">
        <div class="app-sider-branding">
          <div class="app-sider-logo">
            <nz-icon nzType="dashboard" class="app-sider-logo-icon" />
          </div>
          <div class="app-sider-title">
            <span class="app-sider-title-text">Ops Admin</span>
          </div>
        </div>
      </div>
      <!-- Scrollable content area - fills remaining space -->
      <div class="app-sider-content app-sider-hidden-scrollbar" [class.app-sider-collapsed]="collapsed()">
        <app-menus [collapsed]="collapsed()" />
      </div>
      <!-- Sider footer -->
      <div class="app-sider-footer">
        <p>v6.1.0</p>
      </div>
    </nz-sider>
  `,
  styleUrl: './sider.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSider {
  collapsed = input<boolean>(false);
}
