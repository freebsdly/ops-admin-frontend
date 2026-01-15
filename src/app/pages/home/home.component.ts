import { Component, inject, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [NzCardModule, NzStatisticModule, NzGridModule, NzIconModule, NzButtonModule, NzTableModule, NzTagModule, NzAvatarModule, TranslateModule],
  template: `
    <div class="space-y-6">
      <!-- Statistics Cards -->
      <nz-row [nzGutter]="16">
        <nz-col [nzSpan]="6">
          <nz-card>
            <nz-statistic
              [nzTitle]="'HOME.ACTIVE_USERS' | translate"
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
              [nzTitle]="'HOME.TOTAL_REVENUE' | translate"
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
              [nzTitle]="'HOME.ORDERS' | translate"
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
              [nzTitle]="'HOME.GROWTH_RATE' | translate"
              [nzValue]="'23.5%'"
              [nzPrefix]="arrowIcon"
              [nzValueStyle]="{ color: '#3f8600' }"
            ></nz-statistic>
            <ng-template #arrowIcon><span nz-icon nzType="arrow-up"></span></ng-template>
          </nz-card>
        </nz-col>
      </nz-row>

      <!-- Recent Activity Table -->
      <nz-card [nzTitle]="'HOME.RECENT_ACTIVITY' | translate" [nzExtra]="extraTemplate">
        <ng-template #extraTemplate>
          <button nz-button nzType="primary">{{ 'BUTTONS.VIEW_ALL' | translate }}</button>
        </ng-template>

        <nz-table #basicTable [nzData]="recentActivities" [nzShowPagination]="false">
          <thead>
            <tr>
              <th>{{ 'COMMON.USER' | translate }}</th>
              <th>{{ 'COMMON.ACTION' | translate }}</th>
              <th>{{ 'COMMON.STATUS' | translate }}</th>
              <th>{{ 'COMMON.TIME' | translate }}</th>
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
      <nz-card [nzTitle]="'HOME.QUICK_ACTIONS' | translate">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button nz-button nzBlock nzSize="large">
            <span nz-icon nzType="user-add" class="mr-2"></span>
            {{ 'BUTTONS.ADD_USER' | translate }}
          </button>
          <button nz-button nzBlock nzSize="large">
            <span nz-icon nzType="file-add" class="mr-2"></span>
            {{ 'BUTTONS.NEW_REPORT' | translate }}
          </button>
          <button nz-button nzBlock nzSize="large">
            <span nz-icon nzType="setting" class="mr-2"></span>
            {{ 'BUTTONS.SETTINGS' | translate }}
          </button>
          <button nz-button nzBlock nzSize="large">
            <span nz-icon nzType="mail" class="mr-2"></span>
            {{ 'BUTTONS.MESSAGES' | translate }}
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
