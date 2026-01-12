import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface MenuItem {
  key: string;
  label: string;
  icon?: string;
  path?: string;
  children?: MenuItem[];
  isCollapsible?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuData: MenuItem[] = [
    {
      key: 'home',
      label: 'Home',
      icon: 'home',
      path: '/home',
    },
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      path: '/dashboard',
    },
    {
      key: 'users',
      label: 'User Management',
      icon: 'user',
      path: '/users',
    },
    {
      key: 'roles',
      label: 'Role Management',
      icon: 'team',
      path: '/roles',
    },
    {
      key: 'permissions',
      label: 'Permission Management',
      icon: 'safety',
      path: '/permissions',
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: 'setting',
      path: '/settings',
    },
  ];

  getMenuData(): Observable<MenuItem[]> {
    return of(this.menuData);
  }

  getMenuByKey(key: string): Observable<MenuItem | undefined> {
    return of(this.menuData.find(item => item.key === key));
  }
}