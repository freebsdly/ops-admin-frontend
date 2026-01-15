import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouteLoadingService } from '../services/route-loading.service';

@Component({
  selector: 'app-route-loading-test',
  imports: [CommonModule],
  template: `
    <div class="p-6 space-y-6">
      <h1 class="text-2xl font-bold">Route Loading Test</h1>
      
      <div class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold mb-2">Test Routes</h2>
          <div class="flex flex-wrap gap-2">
            <button 
              (click)="navigateTo('home')"
              class="px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
            >
              Go to Home
            </button>
            <button 
              (click)="navigateTo('profile')"
              class="px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
            >
              Go to Profile
            </button>
            <button 
              (click)="navigateTo('dashboard')"
              class="px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
            >
              Go to Dashboard
            </button>
            <button 
              (click)="navigateTo('reports')"
              class="px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
            >
              Go to Reports
            </button>
          </div>
        </div>

        <div>
          <h2 class="text-lg font-semibold mb-2">Manual Loading Control</h2>
          <div class="flex flex-wrap gap-2">
            <button 
              (click)="setLoading(true)"
              class="px-4 py-2 bg-green-100 text-green-800 rounded hover:bg-green-200"
            >
              Start Loading
            </button>
            <button 
              (click)="setLoading(false)"
              class="px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
            >
              Stop Loading
            </button>
          </div>
        </div>

        <div>
          <h2 class="text-lg font-semibold mb-2">Current Loading State</h2>
          <div class="p-4 bg-gray-100 rounded">
            <div class="flex items-center gap-2">
              <div 
                [class]="loadingService.loading() ? 'w-3 h-3 bg-green-500 rounded-full animate-pulse' : 'w-3 h-3 bg-gray-400 rounded-full'"
              ></div>
              <span class="text-sm">
                {{ loadingService.loading() ? 'Loading...' : 'Not loading' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteLoadingTestComponent {
  private readonly router = inject(Router);
  readonly loadingService = inject(RouteLoadingService);

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  setLoading(state: boolean): void {
    this.loadingService.setLoading(state);
  }
}