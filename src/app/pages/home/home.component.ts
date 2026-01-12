import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'app-home',
  imports: [NzCardModule, NzStatisticModule, NzGridModule, NzIconModule, NzButtonModule, NzTableModule, NzTagModule, NzAvatarModule],
  template: `
    <div class="space-y-6">
      <!-- Welcome Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Ops Admin!
        </h1>
        <p class="text-xl text-gray-600">
          You are now logged in and can access all features.
        </p>
      </div>

      <!-- Statistics Cards -->
      <nz-row [nzGutter]="16">
        <nz-col [nzSpan]="6">
          <nz-card>
            <nz-statistic
              nzTitle="Active Users"
              [nzValue]="2847"
              [nzPrefix]="userIcon"
              [nzValueStyle]="{ color: '#3f8600' }"
            ></nz-statistic>
            <ng-template #userIcon><span nz-icon nzType="user"></span></ng-template>
          </nz-card>
        </nz-col>
        <nz-col [nzSpan]="6">
          <nz-card>
            <nz-statistic
              nzTitle="Total Revenue"
              [nzValue]="'¥89,342'"
              [nzPrefix]="dollarIcon"
              [nzValueStyle]="{ color: '#cf1322' }"
            ></nz-statistic>
            <ng-template #dollarIcon><span nz-icon nzType="dollar"></span></ng-template>
          </nz-card>
        </nz-col>
        <nz-col [nzSpan]="6">
          <nz-card>
            <nz-statistic
              nzTitle="Orders"
              [nzValue]="1234"
              [nzPrefix]="shoppingIcon"
              [nzValueStyle]="{ color: '#1890ff' }"
            ></nz-statistic>
            <ng-template #shoppingIcon><span nz-icon nzType="shopping-cart"></span></ng-template>
          </nz-card>
        </nz-col>
        <nz-col [nzSpan]="6">
          <nz-card>
            <nz-statistic
              nzTitle="Growth Rate"
              [nzValue]="'23.5%'"
              [nzPrefix]="arrowIcon"
              [nzValueStyle]="{ color: '#3f8600' }"
            ></nz-statistic>
            <ng-template #arrowIcon><span nz-icon nzType="arrow-up"></span></ng-template>
          </nz-card>
        </nz-col>
      </nz-row>

      <!-- Recent Activity Table -->
      <nz-card nzTitle="Recent Activity" [nzExtra]="extraTemplate">
        <ng-template #extraTemplate>
          <button nz-button nzType="primary">View All</button>
        </ng-template>
        
        <nz-table #basicTable [nzData]="recentActivities" [nzShowPagination]="false">
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            @for (data of basicTable.data; track data.id) {
            <tr>
              <td>
                <nz-avatar nzSize="small" nzText="{{ data.user.charAt(0) }}" class="mr-2"></nz-avatar>
                {{ data.user }}
              </td>
              <td>{{ data.action }}</td>
              <td>
                <nz-tag [nzColor]="data.statusColor">{{ data.status }}</nz-tag>
              </td>
              <td>{{ data.time }}</td>
            </tr>
            }
          </tbody>
        </nz-table>
      </nz-card>

      <!-- Quick Actions -->
      <nz-card nzTitle="Quick Actions">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button nz-button nzBlock nzSize="large">
            <span nz-icon nzType="user-add" class="mr-2"></span>
            Add User
          </button>
          <button nz-button nzBlock nzSize="large">
            <span nz-icon nzType="file-add" class="mr-2"></span>
            New Report
          </button>
          <button nz-button nzBlock nzSize="large">
            <span nz-icon nzType="setting" class="mr-2"></span>
            Settings
          </button>
          <button nz-button nzBlock nzSize="large">
            <span nz-icon nzType="mail" class="mr-2"></span>
            Messages
          </button>
        </div>
      </nz-card>
    </div>
  `,
})
export class HomeComponent {
  recentActivities = [
    { id: 1, user: 'John Doe', action: 'Created new user', status: 'Success', statusColor: 'green', time: '2 minutes ago' },
    { id: 2, user: 'Jane Smith', action: 'Updated settings', status: 'Pending', statusColor: 'orange', time: '5 minutes ago' },
    { id: 3, user: 'Bob Johnson', action: 'Deleted report', status: 'Success', statusColor: 'green', time: '10 minutes ago' },
    { id: 4, user: 'Alice Brown', action: 'Generated report', status: 'Failed', statusColor: 'red', time: '15 minutes ago' },
  ];
}
