import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteLoadingService } from '@/app/services/route-loading.service';

@Component({
  selector: 'app-route-loading-indicator',
  imports: [CommonModule],
  template: `
    @if (loadingService.loading()) {
      <div class="route-loading-indicator">
        <div class="loading-overlay"></div>
        <div class="loading-content">
          <div class="loading-spinner"></div>
          <div class="loading-text">Loading...</div>
        </div>
      </div>
    }
  `,
  styleUrl: './route-loading-indicator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteLoadingIndicatorComponent {
  readonly loadingService = inject(RouteLoadingService);
}
