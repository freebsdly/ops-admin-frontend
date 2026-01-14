import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, NzDropdownModule, NzIconModule, TranslateModule],
  template: `
    <a nz-dropdown [nzDropdownMenu]="menu" nzPlacement="bottomRight">
      <span nz-icon nzType="global"></span>
      {{ 'LANGUAGE.SELECT' | translate }}
    </a>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu>
        <li nz-menu-item (click)="changeLanguage('zh')">
          <span>{{ 'LANGUAGE.ZH' | translate }}</span>
        </li>
        <li nz-menu-item (click)="changeLanguage('en')">
          <span>{{ 'LANGUAGE.EN' | translate }}</span>
        </li>
      </ul>
    </nz-dropdown-menu>
  `,
  styles: `
    :host {
      display: inline-block;
    }
    
    a {
      color: inherit;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 4px;
      transition: background-color 0.3s;
      
      &:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }
    }
  `,
})
export class LanguageSwitcherComponent {
  private translate = inject(TranslateService);

  currentLanguage = 'zh';

  constructor() {
    this.currentLanguage = this.translate.currentLang || 'zh';
  }

  changeLanguage(lang: string): void {
    this.currentLanguage = lang;
    this.translate.use(lang);

    // Store language preference in localStorage
    localStorage.setItem('preferredLanguage', lang);

    // Reload page to apply NG-ZORRO locale changes
    window.location.reload();
  }
}
