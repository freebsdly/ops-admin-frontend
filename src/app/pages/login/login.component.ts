import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { CommonModule } from '@angular/common';
import { UserRole, ROLE_DESCRIPTIONS } from '../../../types/roles';

interface RoleOption {
  value: UserRole;
  label: string;
  description: string;
  badgeColor: string;
}

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzCardModule,
    NzIconModule,
    NzGridModule,
    NzAlertModule,
    NzSelectModule,
    NzDescriptionsModule,
  ],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md">
        <nz-card class="shadow-xl rounded-2xl overflow-hidden">
          <div class="text-center mb-8">
            <div class="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <span nz-icon nzType="lock" nzTheme="outline" class="text-white text-2xl"></span>
            </div>
            <h2 class="text-3xl font-bold text-gray-900">
              Welcome Back
            </h2>
            <p class="mt-2 text-sm text-gray-600">
              Sign in to your Ops Admin account
            </p>
          </div>

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" nz-form nzLayout="vertical">
            <nz-form-item>
              <nz-form-control nzErrorTip="Please enter a valid email">
                <nz-input-group nzPrefixIcon="user" nzSize="large">
                  <input
                    nz-input
                    placeholder="Email address"
                    formControlName="email"
                    type="email"
                    autocomplete="email"
                  />
                </nz-input-group>
              </nz-form-control>
            </nz-form-item>

            <nz-form-item>
              <nz-form-control nzErrorTip="Password must be at least 6 characters">
                <nz-input-group nzPrefixIcon="lock" nzSize="large">
                  <input
                    nz-input
                    placeholder="Password"
                    formControlName="password"
                    type="password"
                    autocomplete="current-password"
                  />
                </nz-input-group>
              </nz-form-control>
            </nz-form-item>

            <nz-form-item>
              <nz-form-control nzErrorTip="Please select a role">
                <nz-select
                  nzSize="large"
                  nzPlaceHolder="Select role"
                  formControlName="role"
                  class="w-full"
                >
                  @for (roleOption of roleOptions; track roleOption.value) {
                    <nz-option
                      [nzValue]="roleOption.value"
                      [nzLabel]="roleOption.label"
                    >
                      <div class="flex items-center justify-between">
                        <span>{{ roleOption.label }}</span>
                        <span class="text-xs font-medium px-2 py-0.5 rounded"
                          [class]="roleOption.badgeColor">
                          {{ roleOption.value }}
                        </span>
                      </div>
                    </nz-option>
                  }
                </nz-select>
              </nz-form-control>
            </nz-form-item>

            <!-- Role information panel -->
            @if (selectedRole()) {
              <div class="mb-4 p-4 bg-gray-50 rounded-lg border">
                <h4 class="font-semibold text-gray-800 mb-2">Role Information</h4>
                <nz-descriptions nzSize="small" [nzColumn]="1">
                  <nz-descriptions-item nzTitle="Role">
                    {{ ROLE_DESCRIPTIONS[selectedRole()!] }}
                  </nz-descriptions-item>
                  <nz-descriptions-item nzTitle="Permissions">
                    @if (selectedRole() === 'admin') {
                      Full system access including user management and settings
                    } @else if (selectedRole() === 'manager') {
                      Access to monitoring logs, deployments, and notifications
                    } @else if (selectedRole() === 'operator') {
                      Access to service management, alerts, and basic monitoring
                    } @else {
                      View-only access to metrics and documents
                    }
                  </nz-descriptions-item>
                </nz-descriptions>
              </div>
            }

            <div class="flex items-center justify-between mb-6">
              <label nz-checkbox formControlName="rememberMe">
                <span>Remember me</span>
              </label>
              <a class="text-sm text-blue-600 hover:text-blue-500" href="#">
                Forgot password?
              </a>
            </div>

            <button
              nz-button
              nzType="primary"
              nzBlock
              nzSize="large"
              [nzLoading]="loading"
              [disabled]="loginForm.invalid || loading"
              type="submit"
              class="mb-4"
            >
              Sign in as {{ selectedRoleLabel() }}
            </button>

            <div class="text-center">
              <span class="text-sm text-gray-600">
                Don't have an account?
                <a class="text-blue-600 hover:text-blue-500 font-medium" href="#">
                  Sign up
                </a>
              </span>
            </div>
          </form>
        </nz-card>

        @if (error) {
        <nz-alert
          nzType="error"
          [nzMessage]="error"
          class="mt-4"
          nzShowIcon
        ></nz-alert>
        }
      </div>
    </div>
  `,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  error: string | null = null;

  roleOptions: RoleOption[] = [
    { value: 'admin', label: 'Administrator', description: 'Full system access', badgeColor: 'bg-red-100 text-red-800' },
    { value: 'manager', label: 'Manager', description: 'Team and deployment access', badgeColor: 'bg-yellow-100 text-yellow-800' },
    { value: 'operator', label: 'Operator', description: 'Service management access', badgeColor: 'bg-green-100 text-green-800' },
    { value: 'viewer', label: 'Viewer', description: 'Read-only access', badgeColor: 'bg-gray-100 text-gray-800' },
  ];

  selectedRole = signal<UserRole | null>('viewer');
  selectedRoleLabel = signal<string>('Viewer');
  ROLE_DESCRIPTIONS = ROLE_DESCRIPTIONS;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['demo@example.com', [Validators.required, Validators.email]],
      password: ['password', [Validators.required, Validators.minLength(6)]],
      role: ['viewer', [Validators.required]],
      rememberMe: [false],
    });

    // Watch for role changes
    this.loginForm.get('role')?.valueChanges.subscribe((role: UserRole) => {
      this.selectedRole.set(role);
      const roleOption = this.roleOptions.find(r => r.value === role);
      this.selectedRoleLabel.set(roleOption?.label || 'User');
    });

    // Initialize with current value
    const initialRole = this.loginForm.get('role')?.value;
    this.selectedRole.set(initialRole);
    const initialRoleOption = this.roleOptions.find(r => r.value === initialRole);
    this.selectedRoleLabel.set(initialRoleOption?.label || 'User');
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = null;

    const { email, password, role } = this.loginForm.value;

    this.authService.login(email, password, role).then((success: boolean) => {
      this.loading = false;

      if (success) {
        this.message.success(`Login successful as ${ROLE_DESCRIPTIONS[role as UserRole]}!`);
        const returnUrl = this.router.routerState.snapshot.root.queryParams['returnUrl'] || '/dashboard';
        this.router.navigateByUrl(returnUrl);
      } else {
        this.message.error('Invalid email or password');
        this.error = 'Invalid email or password';
      }
    }).catch(() => {
      this.loading = false;
      this.message.error('An error occurred during login');
      this.error = 'An error occurred during login';
    });
  }
}
