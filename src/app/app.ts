import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { AppLayout } from '@/app/layout/app-layout';
import { AuthService } from '@/app/services/auth.service';
import { RouteLoadingIndicatorComponent } from '@/app/components/route-loading-indicator.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppLayout, TranslateModule, RouteLoadingIndicatorComponent],
  template: `
    <!-- Global route loading indicator -->
    <app-route-loading-indicator />

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
export class App implements OnInit {
  protected readonly title = signal('ops-admin-frontend');

  constructor(
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    // Check for stored language preference
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang && (storedLang === 'zh' || storedLang === 'en')) {
      this.translate.use(storedLang);
    } else {
      this.translate.use('zh'); // Default to Chinese
    }
  }

  showLayout = computed(() => {
    const currentUrl = this.router.url;
    const isAuthenticated = this.authService.isAuthenticated();

    // Show layout only when authenticated and not on login page
    return isAuthenticated && !currentUrl.startsWith('/login');
  });
}
