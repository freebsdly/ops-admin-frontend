import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-monitoring',
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">Service Monitoring</h2>
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4">Service Health</h3>
        <p class="text-gray-600">This section is accessible to viewers and above.</p>
        <div class="mt-4 p-4 bg-gray-50 border border-gray-200 rounded">
          <p class="text-sm text-gray-800">
            <strong>Role Required:</strong> Viewer<br>
            <strong>Current Role:</strong> Viewer+
          </p>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceMonitoringComponent {}