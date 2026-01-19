import { Component, inject, computed, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzFlexModule } from 'ng-zorro-antd/flex';
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
    NzFlexModule,
    TranslateModule,
  ],
  template: `
    <div class="app-module-selector">
      <button
        nz-dropdown
        [nzDropdownMenu]="moduleMenu"
        nzTrigger="hover"
        nzPlacement="bottomLeft"
        [nzOverlayStyle]="{ minWidth: '280px', padding: '0' }"
        class="app-module-selector-button"
      >
        <nz-space [nzSize]="8" class="app-module-selector-content">
          <span nz-icon [nzType]="currentModuleIcon()" class="app-module-selector-icon"></span>
          <span class="app-module-selector-label">{{ currentModuleLabel() | translate }}</span>
          <span nz-icon nzType="down" class="app-module-selector-dropdown-icon"></span>
        </nz-space>
      </button>

      <nz-dropdown-menu #moduleMenu="nzDropdownMenu">
        <nz-card class="app-module-selector-card" [nzBordered]="false" [nzHoverable]="false">
          <nz-flex [nzWrap]="'wrap'" [nzGap]="'small'">
            @for (module of availableModules(); track module.key) {
              <div
                class="app-module-selector-item"
                [class.app-module-selector-item-active]="module.isActive"
                (click)="selectModule(module)"
              >
                <div class="app-module-selector-item-content">
                  <nz-space [nzSize]="8" [nzDirection]="'vertical'">
                    <nz-icon [nzType]="module.icon" class="app-module-selector-item-icon"></nz-icon>
                    <span class="app-module-selector-item-label">{{ module.label | translate }}</span>
                  </nz-space>
                </div>
              </div>
            }
          </nz-flex>
        </nz-card>
      </nz-dropdown-menu>
    </div>
  `,
  styleUrl: './module-selector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppModuleSelector {
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
