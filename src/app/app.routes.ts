import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { PlaceholderComponent } from './pages/placeholder.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  // Dashboard routes
  {
    path: 'dashboard',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.DASHBOARD' },
  },
  {
    path: 'analytics',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.ANALYTICS' },
  },
  {
    path: 'reports',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.REPORTS' },
  },
  // Security submenu routes
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
  {
    path: 'permissions',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.PERMISSION_MANAGEMENT' },
  },
  {
    path: 'audit',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.AUDIT' },
  },
  // Notifications route
  {
    path: 'notifications',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.NOTIFICATIONS' },
  },
  // Operations submenu routes
  {
    path: 'inventory',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.INVENTORY' },
  },
  {
    path: 'orders',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.ORDERS' },
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
    data: { titleKey: 'MENU.PRODUCTS' },
  },
  {
    path: 'categories',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.CATEGORIES' },
  },
  {
    path: 'warehouses',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.WAREHOUSES' },
  },
  // Shipping route
  {
    path: 'shipping',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.SHIPPING' },
  },
  // Finance submenu routes
  {
    path: 'billing',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.BILLING' },
  },
  {
    path: 'invoices',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.INVOICES' },
  },
  {
    path: 'payments',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.PAYMENTS' },
  },
  // Nested demo routes
  {
    path: 'nested/level3/item1',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.LEVEL3_ITEM1' },
  },
  {
    path: 'nested/level3/item2',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.LEVEL3_ITEM2' },
  },
  {
    path: 'nested/level2/item2',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.LEVEL2_ITEM2' },
  },
  {
    path: 'nested/level2/item3',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.LEVEL2_ITEM3' },
  },
  // Settings route
  {
    path: 'settings',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { titleKey: 'MENU.SETTINGS' },
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
