import { ApplicationConfig, provideAppInitializer } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { en_US, zh_CN, provideNzI18n, NZ_I18N } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import zh from '@angular/common/locales/zh';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { IconService } from '@/app/services/icon.service';

registerLocaleData(en);
registerLocaleData(zh);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json',
      }),
      fallbackLang: 'en',
      lang: 'en',
    }),
    provideNzI18n(zh_CN),
    { provide: NZ_I18N, useValue: zh_CN },
    
    // Initialize icon service at app startup
    provideAppInitializer(() => {
      const iconService = new IconService();
      return Promise.resolve();
    }),
  ],
};
