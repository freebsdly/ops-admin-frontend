import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'app-user-profile',
  imports: [
    NzCardModule,
    NzAvatarModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzSpaceModule,
  ],
  template: `
    <div class="p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">User Profile</h2>
      
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
            Edit Profile
          </button>
        </div>
      </nz-card>

      <nz-card nzTitle="Personal Information">
        <form nz-form layout="vertical">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div nz-form-control>
              <label nz-form-label>Full Name</label>
              <input nz-input value="John Doe" readonly />
            </div>
            <div nz-form-control>
              <label nz-form-label>Email Address</label>
              <input nz-input value="john.doe@example.com" readonly />
            </div>
            <div nz-form-control>
              <label nz-form-label>Phone Number</label>
              <input nz-input value="+1 234 567 8900" readonly />
            </div>
            <div nz-form-control>
              <label nz-form-label>Role</label>
              <input nz-input value="Administrator" readonly />
            </div>
            <div nz-form-control class="md:col-span-2">
              <label nz-form-label>Bio</label>
              <textarea nz-input rows="4" readonly>
Experienced DevOps engineer with 10+ years of experience in managing cloud infrastructure and CI/CD pipelines.
              </textarea>
            </div>
          </div>
        </form>
      </nz-card>

      <nz-card nzTitle="Account Settings" class="mt-6">
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-gray-700">Two-Factor Authentication</span>
            <span class="text-gray-500 text-sm">Disabled</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-700">Email Notifications</span>
            <span class="text-gray-500 text-sm">Enabled</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-700">Password Expiry</span>
            <span class="text-gray-500 text-sm">30 days</span>
          </div>
        </div>
      </nz-card>
    </div>
  `,
  styleUrl: './user-profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent {}