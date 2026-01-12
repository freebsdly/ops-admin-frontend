import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-list',
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">Service Management</h2>
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4">Service List</h3>
        <p class="text-gray-600">This section is accessible to operators and above.</p>
        <div class="mt-4 p-4 bg-green-50 border border-green-200 rounded">
          <p class="text-sm text-green-800">
            <strong>Role Required:</strong> Operator<br>
            <strong>Current Role:</strong> Operator+
          </p>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceListComponent {}