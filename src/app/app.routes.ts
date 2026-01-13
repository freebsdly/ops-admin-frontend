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
    data: { title: 'Dashboard' },
  },
  {
    path: 'analytics',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { title: 'Analytics' },
  },
  {
    path: 'reports',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { title: 'Reports' },
  },
  // Security submenu routes
  {
    path: 'users',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { title: 'User Management' },
  },
  {
    path: 'roles',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { title: 'Role Management' },
  },
  {
    path: 'permissions',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { title: 'Permission Management' },
  },
  {
    path: 'audit',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { title: 'Audit Log' },
  },
  // Notifications route
  {
    path: 'notifications',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { title: 'Notifications' },
  },
  // Operations submenu routes
  {
    path: 'inventory',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { title: 'Inventory' },
  },
  {
    path: 'orders',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { title: 'Orders' },
  },
  {
    path: 'customers',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { title: 'Customers' },
  },
  // Products routes
  {
    path: 'products',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { title: 'Products' },
  },
  {
    path: 'categories',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { title: 'Categories' },
  },
  {
    path: 'warehouses',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { title: 'Warehouses' },
  },
  // Shipping route
  {
    path: 'shipping',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { title: 'Shipping' },
  },
  // Finance submenu routes
  {
    path: 'billing',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { title: 'Billing' },
  },
  {
    path: 'invoices',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { title: 'Invoices' },
  },
  {
    path: 'payments',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { title: 'Payments' },
  },
  // Settings route
  {
    path: 'settings',
    component: PlaceholderComponent,
    canActivate: [AuthGuard],
    data: { title: 'Settings' },
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
