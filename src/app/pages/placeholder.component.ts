import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-placeholder',
  imports: [],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-semibold mb-4">{{ title }}</h1>
      <p class="text-gray-600">This is a placeholder page for {{ title }}</p>
      <div class="mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
        <p class="text-blue-700">
          This page will be implemented with full functionality in a future update.
        </p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderComponent {
  private route = inject(ActivatedRoute);
  
  get title(): string {
    return this.route.snapshot.data['title'] || 'Placeholder Page';
  }
}