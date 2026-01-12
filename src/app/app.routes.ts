import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AppLayout } from './layout/app-layout/app-layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: AppLayout,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: HomeComponent,
      },
      {
        path: 'users',
        loadChildren: () => import('./pages/users/users.routes').then(m => m.USER_ROUTES),
      },
      {
        path: 'services',
        loadChildren: () => import('./pages/services/services.routes').then(m => m.SERVICE_ROUTES),
      },
      {
        path: 'monitoring',
        loadChildren: () => import('./pages/monitoring/monitoring.routes').then(m => m.MONITORING_ROUTES),
      },
      {
        path: 'database',
        component: HomeComponent,
      },
      {
        path: 'documents',
        component: HomeComponent,
      },
      {
        path: 'audit',
        component: HomeComponent,
      },
      {
        path: 'settings',
        loadChildren: () => import('./pages/settings/settings.routes').then(m => m.SETTINGS_ROUTES),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
