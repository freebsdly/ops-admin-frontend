import { Routes } from '@angular/router';

export const MONITORING_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'metrics',
    pathMatch: 'full',
  },
  {
    path: 'metrics',
    loadComponent: () => import('./monitoring-metrics/monitoring-metrics.component').then(m => m.MonitoringMetricsComponent),
  },
  {
    path: 'alerts',
    loadComponent: () => import('./monitoring-alerts/monitoring-alerts.component').then(m => m.MonitoringAlertsComponent),
  },
  {
    path: 'logs',
    loadComponent: () => import('./monitoring-logs/monitoring-logs.component').then(m => m.MonitoringLogsComponent),
  },
];