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
      [nzWidth]="collapsed() ? 56 : 256"
      class="border-r border-gray-200 !bg-white flex flex-col full-height"
    >
      <!-- Sidebar header (contains logo area) - fixed at top -->
      <div class="sidebar-header h-14 border-b border-gray-200 flex items-center justify-center"
        [class.justify-center]="collapsed()">
        @if (!collapsed()) {
          <div class="flex items-center gap-2">
            <img src="/logo.svg" alt="Ops Admin Logo" class="h-8 w-auto" />
            <span class="text-lg font-semibold text-gray-800">Ops Admin</span>
          </div>
        } @else {
          <img src="/logo.svg" alt="Ops Admin Logo" class="h-8 w-auto" />
        }
      </div>

      <!-- Scrollable menu area - fills remaining space -->
      <div class="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
        <app-menus
          [collapsed]="collapsed()"
          (onToggleCollapsed)="onToggleCollapsed.emit()"
          class="block h-auto"
        />
      </div>

      <!-- Sidebar footer (collapsible trigger) - fixed at bottom -->
      <div class="sidebar-footer h-14 border-t border-gray-200 flex items-center justify-center mt-auto">
        <button
          nz-button
          nzType="text"
          (click)="onToggleCollapsed.emit()"
          class="w-full h-14 flex items-center justify-center text-gray-600 hover:text-gray-800"
        >
          <span nz-icon [nzType]="collapsed() ? 'menu-unfold' : 'menu-fold'" nzTheme="outline" class="mr-2"></span>
          @if (!collapsed()) {
            <span>Collapse Menu</span>
          }
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