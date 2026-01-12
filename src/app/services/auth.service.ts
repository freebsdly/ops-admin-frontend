import { Injectable, signal } from '@angular/core';
import { User, UserRole } from '../../types/roles';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'auth_token';
  private readonly userKey = 'user';
  
  isAuthenticated = signal<boolean>(!!localStorage.getItem(this.tokenKey));
  user = signal<User | null>(
    localStorage.getItem(this.userKey) 
      ? JSON.parse(localStorage.getItem(this.userKey)!) 
      : null
  );

  login(email: string, password: string, role: UserRole = 'viewer'): Promise<boolean> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock successful login (any email/password combination works for demo)
        const token = 'mock_jwt_token_' + Date.now();
        const user: User = {
          id: 'user_' + Date.now(),
          name: role === 'admin' ? 'Admin User' : 
                role === 'manager' ? 'Manager User' :
                role === 'operator' ? 'Operator User' : 'Viewer User',
          email: email,
          role: role,
        };
        
        localStorage.setItem(this.tokenKey, token);
        localStorage.setItem(this.userKey, JSON.stringify(user));
        
        this.isAuthenticated.set(true);
        this.user.set(user);
        resolve(true);
      }, 500);
    });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.isAuthenticated.set(false);
    this.user.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserRole(): UserRole | null {
    const user = this.user();
    return user ? user.role : null;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

  isManager(): boolean {
    return this.getUserRole() === 'manager' || this.isAdmin();
  }

  isOperator(): boolean {
    return this.getUserRole() === 'operator' || this.isManager();
  }

  isViewer(): boolean {
    return this.getUserRole() === 'viewer' || this.isOperator();
  }

  hasPermission(requiredRole: UserRole): boolean {
    const userRole = this.getUserRole();
    if (!userRole) return false;
    
    // For simplicity, use hierarchy - admin can do everything, etc.
    const hierarchy: Record<UserRole, number> = {
      admin: 4,
      manager: 3,
      operator: 2,
      viewer: 1,
    };
    
    return hierarchy[userRole] >= hierarchy[requiredRole];
  }

  // Demo login with different roles
  loginAsAdmin(email: string, password: string): Promise<boolean> {
    return this.login(email, password, 'admin');
  }

  loginAsManager(email: string, password: string): Promise<boolean> {
    return this.login(email, password, 'manager');
  }

  loginAsOperator(email: string, password: string): Promise<boolean> {
    return this.login(email, password, 'operator');
  }

  loginAsViewer(email: string, password: string): Promise<boolean> {
    return this.login(email, password, 'viewer');
  }
}