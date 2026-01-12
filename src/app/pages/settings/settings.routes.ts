import { Routes } from '@angular/router';

export const SETTINGS_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'general',
    pathMatch: 'full',
  },
  {
    path: 'general',
    loadComponent: () => import('./settings-general/settings-general.component').then(m => m.SettingsGeneralComponent),
  },
  {
    path: 'security',
    loadComponent: () => import('./settings-security/settings-security.component').then(m => m.SettingsSecurityComponent),
  },
  {
    path: 'notifications',
    loadComponent: () => import('./settings-notifications/settings-notifications.component').then(m => m.SettingsNotificationsComponent),
  },
];