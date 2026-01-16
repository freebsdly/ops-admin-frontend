import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-profile',
  imports: [
    NzCardModule,
    NzAvatarModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzSpaceModule,
    TranslateModule,
  ],
  template: `
    <div class="p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">{{ 'USER_PROFILE.TITLE' | translate }}</h2>

      <nz-card class="mb-6">
        <div class="flex items-center space-x-6">
          <nz-avatar nzSize="large" nzText="U" class="flex-shrink-0"></nz-avatar>
          <div class="flex-1">
            <h3 class="text-xl font-semibold text-gray-900">John Doe</h3>
            <p class="text-gray-600">Administrator</p>
            <p class="text-gray-500 text-sm mt-1">john.doe@example.com</p>
          </div>
          <button nz-button nzType="primary">
            <span nz-icon nzType="edit" nzTheme="outline"></span>
            {{ 'BUTTONS.EDIT_PROFILE' | translate }}
          </button>
        </div>
      </nz-card>

      <nz-card [nzTitle]="'USER_PROFILE.PERSONAL_INFO' | translate">
        <form nz-form layout="vertical">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div nz-form-control>
              <label nz-form-label>{{ 'COMMON.FULL_NAME' | translate }}</label>
              <input nz-input value="John Doe" readonly />
            </div>
            <div nz-form-control>
              <label nz-form-label>{{ 'COMMON.EMAIL_ADDRESS' | translate }}</label>
              <input nz-input value="john.doe@example.com" readonly />
            </div>
            <div nz-form-control>
              <label nz-form-label>{{ 'COMMON.PHONE_NUMBER' | translate }}</label>
              <input nz-input value="+1 234 567 8900" readonly />
            </div>
            <div nz-form-control>
              <label nz-form-label>{{ 'COMMON.ROLE' | translate }}</label>
              <input nz-input value="Administrator" readonly />
            </div>
            <div nz-form-control class="md:col-span-2">
              <label nz-form-label>{{ 'COMMON.BIO' | translate }}</label>
              <textarea nz-input rows="4" readonly>
Experienced DevOps engineer with 10+ years of experience in managing cloud infrastructure and CI/CD pipelines.
              </textarea
              >
            </div>
          </div>
        </form>
      </nz-card>

      <nz-card [nzTitle]="'USER_PROFILE.SETTINGS' | translate" class="mt-6">
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-gray-700">{{ 'SETTINGS.TWO_FACTOR_AUTH' | translate }}</span>
            <span class="text-gray-500 text-sm">{{ 'COMMON.DISABLED' | translate }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-700">{{ 'SETTINGS.EMAIL_NOTIFICATIONS' | translate }}</span>
            <span class="text-gray-500 text-sm">{{ 'COMMON.ENABLED' | translate }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-700">{{ 'SETTINGS.PASSWORD_EXPIRY' | translate }}</span>
            <span class="text-gray-500 text-sm">{{ 'COMMON.DAYS_30' | translate }}</span>
          </div>
        </div>
      </nz-card>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent {}
