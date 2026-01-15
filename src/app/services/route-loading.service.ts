import { Injectable, signal } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Event } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteLoadingService {
  private readonly isLoading = signal<boolean>(false);

  // Public read-only signal
  readonly loading = this.isLoading.asReadonly();

  constructor(private router: Router) {
    this.setupRouterEvents();
  }

  private setupRouterEvents(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isLoading.set(true);
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        // Small delay to prevent flicker for fast route changes
        setTimeout(() => {
          this.isLoading.set(false);
        }, 50);
      }
    });
  }

  /**
   * Manually set loading state
   */
  setLoading(state: boolean): void {
    this.isLoading.set(state);
  }

  /**
   * Get current loading state
   */
  getLoading(): boolean {
    return this.loading();
  }
}