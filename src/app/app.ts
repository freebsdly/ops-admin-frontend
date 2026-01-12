import { Component, signal, computed } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AppLayout } from './layout/app-layout';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppLayout],
  template: `
    @if (showLayout()) {
      <app-layout>
        <router-outlet />
      </app-layout>
    } @else {
      <router-outlet />
    }
  `,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ops-admin-frontend');
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  showLayout = computed(() => {
    const currentUrl = this.router.url;
    const isAuthenticated = this.authService.isAuthenticated();
    
    // Show layout only when authenticated and not on login page
    return isAuthenticated && !currentUrl.startsWith('/login');
  });
}