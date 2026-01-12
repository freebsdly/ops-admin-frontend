import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    loadComponent: () => import('./user-list/user-list.component').then(m => m.UserListComponent),
  },
  {
    path: 'roles',
    loadComponent: () => import('./user-roles/user-roles.component').then(m => m.UserRolesComponent),
  },
  {
    path: 'permissions',
    loadComponent: () => import('./user-permissions/user-permissions.component').then(m => m.UserPermissionsComponent),
  },
];