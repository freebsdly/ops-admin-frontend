import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">User Management</h2>
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4">User List</h3>
        <p class="text-gray-600">This section is only accessible to administrators.</p>
        <div class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
          <p class="text-sm text-blue-800">
            <strong>Role Required:</strong> Admin<br>
            <strong>Current Role:</strong> Admin
          </p>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {}