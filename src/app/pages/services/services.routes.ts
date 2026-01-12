import { Routes } from '@angular/router';

export const SERVICE_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    loadComponent: () => import('./service-list/service-list.component').then(m => m.ServiceListComponent),
  },
  {
    path: 'deployments',
    loadComponent: () => import('./service-deployments/service-deployments.component').then(m => m.ServiceDeploymentsComponent),
  },
  {
    path: 'monitoring',
    loadComponent: () => import('./service-monitoring/service-monitoring.component').then(m => m.ServiceMonitoringComponent),
  },
];