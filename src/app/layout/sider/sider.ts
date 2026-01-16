import { Component, ChangeDetectionStrategy, input, output, signal, inject } from '@angular/core';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { IconDefinition } from '@ant-design/icons-angular';
import { MenuFoldOutline, MenuUnfoldOutline } from '@ant-design/icons-angular/icons';
import { Menus } from './menus';

@Component({
  selector: 'app-sider',
  imports: [
    NzIconModule,
    NzButtonModule,
    NzLayoutModule,
    Menus,
  ],
  template: `
    <nz-sider
      [nzCollapsed]="collapsed()"
      [nzWidth]="collapsed() ? 48 : 200"
      class="border-r border-gray-200 !bg-gray-100 flex flex-col full-height"
    >
      <!-- Sidebar header (contains logo area) - fixed at top -->
      <div class="sidebar-header border-b border-gray-200 flex items-center justify-center"
        [class.justify-center]="collapsed()">
        @if (!collapsed()) {
          <!-- Expanded logo: SVG that fills the sider width -->
          <div class="flex items-center justify-center w-full">
            <img src="/logo-expanded.svg" alt="Ops Admin Logo" class="w-full h-12 object-contain" />
          </div>
        } @else {
          <!-- Collapsed logo: SVG icon that fills the area -->
          <div class="flex items-center justify-center w-full h-full">
            <img src="/logo-collapsed.svg" alt="Ops Admin Logo" class="h-12 w-full object-contain" />
          </div>
        }
      </div>

      <!-- Scrollable menu area - fills remaining space -->
      <div class="flex-1 min-h-0 overflow-y-auto overflow-x-hidden hidden-scrollbar bg-gray-100">
        <app-menus
          [collapsed]="collapsed()"
          (onToggleCollapsed)="onToggleCollapsed.emit()"
          class="block h-auto"
        />
      </div>

      <!-- Sidebar footer (collapsible trigger) - fixed at bottom -->
      <div class="sidebar-footer border-t border-gray-200 flex items-center justify-center mt-auto">
        <button
          nz-button
          nzType="text"
          (click)="onToggleCollapsed.emit()"
          class="w-full h-12 flex items-center justify-center text-gray-600"
        >
          <span nz-icon [nzType]="collapsed() ? 'menu-unfold' : 'menu-fold'" nzTheme="outline"></span>
        </button>
      </div>
    </nz-sider>
  `,
  styleUrl: './sider.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sider {
  private readonly iconService = inject(NzIconService);

  collapsed = input<boolean>(false);
  
  onToggleCollapsed = output<void>();

  constructor() {
    // Register icons
    const icons: IconDefinition[] = [MenuFoldOutline, MenuUnfoldOutline];
    this.iconService.addIcon(...icons);
  }
}