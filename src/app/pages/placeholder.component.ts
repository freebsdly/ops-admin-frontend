import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-placeholder',
  imports: [TranslateModule],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-semibold mb-4">{{ titleKey | translate }}</h1>
      <p class="text-gray-600">
        {{ 'COMMON.PLACEHOLDER_PAGE' | translate : { title: (titleKey | translate) } }}
      </p>
      <div class="mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
        <p class="text-blue-700">
          {{ 'COMMON.PLACEHOLDER_MESSAGE' | translate }}
        </p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderComponent {
  private route = inject(ActivatedRoute);

  get titleKey(): string {
    return this.route.snapshot.data['titleKey'] || 'COMMON.PLACEHOLDER';
  }
}
