import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings-notifications',
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">Notification Settings</h2>
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4">Notification Configuration</h3>
        <p class="text-gray-600">This section is accessible to managers and above.</p>
        <div class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <p class="text-sm text-yellow-800">
            <strong>Role Required:</strong> Manager<br>
            <strong>Current Role:</strong> Manager+
          </p>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsNotificationsComponent {}