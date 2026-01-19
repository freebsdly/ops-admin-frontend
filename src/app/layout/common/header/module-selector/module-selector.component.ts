import { Component, inject, computed, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { TranslateModule } from '@ngx-translate/core';
import { MenuService, MenuItem } from '@/app/services/menu.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';

export interface ModuleItem {
  key: string;
  label: string;
  icon: string;
  defaultPath: string;
  isActive: boolean;
}

@Component({
  selector: 'app-module-selector',
  standalone: true,
  imports: [
    NzDropdownModule,
    NzCardModule,
    NzIconModule,
    NzSpaceModule,
    TranslateModule,
  ],
  template: `
    <div class="module-selector">
      <button
        nz-dropdown
        [nzDropdownMenu]="moduleMenu"
        nzTrigger="hover"
        nzPlacement="bottomLeft"
        [nzOverlayStyle]="{ minWidth: '280px', padding: '0' }"
        class="module-selector-button"
      >
        <nz-space [nzSize]="8" class="module-selector-content">
          <span nz-icon [nzType]="currentModuleIcon()" class="module-icon"></span>
          <span class="module-label">{{ currentModuleLabel() | translate }}</span>
          <span nz-icon nzType="down" class="module-dropdown-icon"></span>
        </nz-space>
      </button>

      <nz-dropdown-menu #moduleMenu="nzDropdownMenu">
        <nz-card class="module-card" [nzBordered]="false" [nzHoverable]="false">
          <div class="module-grid">
            @for (module of availableModules(); track module.key) {
              <div
                class="module-item"
                [class.module-item-active]="module.isActive"
                (click)="selectModule(module)"
              >
                <div class="module-item-content">
                  <nz-space [nzSize]="12" [nzDirection]="'vertical'">
                    <nz-icon [nzType]="module.icon" class="module-item-icon"></nz-icon>
                    <span class="module-item-label">{{ module.label | translate }}</span>
                  </nz-space>
                </div>
              </div>
            }
          </div>
        </nz-card>
      </nz-dropdown-menu>
    </div>
  `,
  styles: `
    .module-selector {
      display: inline-block;
    }

    .module-selector-button {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      background-color: white;
      border: 1px solid #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s;
      height: 40px;
      min-width: 140px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
    }

    .module-selector-button:hover {
      border-color: #1677ff;
      color: #1677ff;
      box-shadow: 0 2px 4px rgba(24, 144, 255, 0.15);
    }

    .module-selector-button:active {
      border-color: #0958d9;
    }

    .module-selector-content {
      align-items: center;
    }

    .module-icon {
      font-size: 16px;
      color: #1677ff;
    }

    .module-label {
      font-size: 14px;
      font-weight: 500;
      color: #262626;
      flex: 1;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .module-dropdown-icon {
      font-size: 12px;
      color: #8c8c8c;
    }

    .module-card {
      box-shadow: 0 6px 16px -8px rgba(0, 0, 0, 0.08), 0 9px 28px 0 rgba(0, 0, 0, 0.05), 0 12px 48px 16px rgba(0, 0, 0, 0.03);
      border-radius: 8px;
      overflow: hidden;
    }

    .module-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      padding: 12px;
    }

    .module-item {
      padding: 16px;
      border-radius: 8px;
      border: 1px solid #f0f0f0;
      background-color: #fafafa;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .module-item:hover {
      background-color: #e6f7ff;
      border-color: #91d5ff;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15);
    }

    .module-item-active {
      background-color: #1890ff;
      border-color: #1890ff;
    }

    .module-item-active:hover {
      background-color: #1677ff;
      border-color: #1677ff;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15);
    }

    .module-item-content {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    .module-item-icon {
      font-size: 24px;
      color: #8c8c8c;
    }

    .module-item:hover .module-item-icon {
      color: #1677ff;
    }

    .module-item-active .module-item-icon {
      color: white;
    }

    .module-item-label {
      font-size: 13px;
      font-weight: 500;
      color: #262626;
      text-align: center;
    }

    .module-item:hover .module-item-label {
      color: #1677ff;
    }

    .module-item-active .module-item-label {
      color: white;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleSelectorComponent {
  private readonly router = inject(Router);
  private readonly menuService = inject(MenuService);

  // Get all menu items from menu service
  readonly menuItems = toSignal(this.menuService.getMenuData(), { initialValue: [] });

  // Current URL signal
  readonly currentUrl = signal<string>(this.router.url);

  // Active module key from menu service (already a signal)
  readonly activeModuleKey = this.menuService.activeModuleKey;

  constructor() {
    // Subscribe to router navigation updates
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe((event) => {
        this.currentUrl.set(event.urlAfterRedirects);
      });
  }

  // Extract first layer modules (Level 1)
  readonly availableModules = computed(() => {
    const activeKey = this.activeModuleKey();
    return this.menuItems()
      .filter(item => item.level === 1)
      .map(module => {
        const defaultPath = this.findModuleDefaultPath(module);
        return {
          key: module.key,
          label: module.key,
          icon: module.icon || 'appstore',
          defaultPath: defaultPath,
          isActive: module.key === activeKey,
        } as ModuleItem;
      });
  });

  // Current active module
  readonly currentModule = computed(() => {
    return this.availableModules().find(m => m.isActive) || this.availableModules()[0];
  });

  readonly currentModuleLabel = computed(() => {
    return this.currentModule()?.label || 'MENU.HOME';
  });

  readonly currentModuleIcon = computed(() => {
    return this.currentModule()?.icon || 'home';
  });

  // Find default route path for a module (first child with path)
  private findModuleDefaultPath(module: MenuItem): string {
    if (module.children && module.children.length > 0) {
      // Find first child with a path
      const childWithPath = module.children.find(child => child.path);
      if (childWithPath) {
        return childWithPath.path || '';
      }
      // If no direct path, search recursively
      for (const child of module.children) {
        const path = this.findModuleDefaultPath(child);
        if (path) return path;
      }
    }
    return '';
  }

  // Select module and navigate
  selectModule(module: ModuleItem): void {
    if (module.defaultPath) {
      this.router.navigate([module.defaultPath]);
    }
  }
}
