import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MenuService } from '../services/menu.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private menuService: MenuService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authService.isAuthenticated()) {
      // Store the attempted URL for redirecting
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    // Check if the user has permission to access this route
    const userRole = this.authService.getUserRole();
    const requestedRoute = state.url;
    
    const canAccess = this.menuService.canAccessRoute(userRole, requestedRoute);
    
    if (!canAccess) {
      // Redirect to dashboard if user doesn't have permission
      this.router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }
}