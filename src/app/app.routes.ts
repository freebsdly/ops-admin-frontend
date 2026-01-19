import { Routes } from '@angular/router';
import { AuthGuard } from '@/app/guards/auth.guard';
import { HomeComponent } from '@/app/pages/home/home.component';
import { LoginComponent } from '@/app/pages/login/login.component';
import { UserProfileComponent } from '@/app/pages/user-profile/user-profile.component';
import { MessagesComponent } from '@/app/pages/messages/messages.component';
import { PlaceholderComponent } from '@/app/pages/placeholder.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  // Home routes
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },

  // Profile route
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },

  // Messages route
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [AuthGuard],
  },

  // Dashboard routes
  {
    path: 'dashboard',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.DASHBOARD_OVERVIEW' },
  },

  // Analytics routes
  {
    path: 'analytics/traffic',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.ANALYTICS_TRAFFIC' },
  },
  {
    path: 'analytics/performance',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.ANALYTICS_PERFORMANCE' },
  },
  {
    path: 'analytics/conversions',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.ANALYTICS_CONVERSIONS' },
  },

  // Reports routes
  {
    path: 'reports/system',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.REPORTS_SYSTEM' },
  },
  {
    path: 'reports/users',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.REPORTS_USERS' },
  },
  {
    path: 'reports/performance',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.REPORTS_PERFORMANCE' },
  },

  // Security routes
  {
    path: 'users',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.USER_MANAGEMENT' },
  },
  {
    path: 'roles',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.ROLE_MANAGEMENT' },
  },

  // Permissions routes
  {
    path: 'permissions/users',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.PERMISSIONS_USERS' },
  },
  {
    path: 'permissions/roles',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.PERMISSIONS_ROLES' },
  },

  {
    path: 'audit',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.AUDIT' },
  },

  // Operations routes
  {
    path: 'inventory',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.INVENTORY' },
  },

  // Orders routes
  {
    path: 'orders/all',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.ORDERS_ALL' },
  },
  {
    path: 'orders/pending',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.ORDERS_PENDING' },
  },
  {
    path: 'orders/completed',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.ORDERS_COMPLETED' },
  },

  {
    path: 'customers',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.CUSTOMERS' },
  },

  // Products routes
  {
    path: 'products',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.PRODUCTS_LIST' },
  },
  {
    path: 'categories',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.CATEGORIES' },
  },

  // Warehouses routes
  {
    path: 'warehouses/all',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.WAREHOUSES_ALL' },
  },
  {
    path: 'warehouses/locations',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.WAREHOUSES_LOCATIONS' },
  },
  {
    path: 'warehouses/capacity',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.WAREHOUSES_CAPACITY' },
  },

  // Shipping routes
  {
    path: 'shipping/domestic',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.SHIPPING_DOMESTIC' },
  },
  {
    path: 'shipping/international',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.SHIPPING_INTERNATIONAL' },
  },
  {
    path: 'shipping/tracking',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.SHIPPING_TRACKING' },
  },

  // Finance routes
  {
    path: 'billing',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.BILLING' },
  },

  // Invoices routes
  {
    path: 'invoices/all',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.INVOICES_ALL' },
  },
  {
    path: 'invoices/paid',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.INVOICES_PAID' },
  },
  {
    path: 'invoices/pending',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.INVOICES_PENDING' },
  },
  {
    path: 'invoices/overdue',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.INVOICES_OVERDUE' },
  },

  // Payments routes
  {
    path: 'payments/all',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.PAYMENTS_ALL' },
  },
  {
    path: 'payments/received',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.PAYMENTS_RECEIVED' },
  },
  {
    path: 'payments/refunded',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.PAYMENTS_REFUNDED' },
  },

  // System routes - Notifications
  {
    path: 'notifications/all',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.NOTIFICATIONS_ALL' },
  },
  {
    path: 'notifications/unread',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.NOTIFICATIONS_UNREAD' },
  },
  {
    path: 'notifications/important',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.NOTIFICATIONS_IMPORTANT' },
  },

  // System routes - Settings
  {
    path: 'settings/general',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.SETTINGS_GENERAL' },
  },
  {
    path: 'settings/authentication',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.SETTINGS_AUTH' },
  },
  {
    path: 'settings/notifications',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.SETTINGS_NOTIFICATIONS' },
  },
  {
    path: 'settings/encryption',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.SETTINGS_ENCRYPTION' },
  },

  // Test loading route
  {
    path: 'test-loading',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'TEST.LOADING' },
  },

  {
    path: '**',
    redirectTo: 'home',
  },
];
