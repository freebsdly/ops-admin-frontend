import { Component, ChangeDetectionStrategy, signal, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconService } from 'ng-zorro-antd/icon';
import { BellOutline, InfoCircleOutline, CheckCircleOutline, ExclamationCircleOutline, CloseCircleOutline } from '@ant-design/icons-angular/icons';

export interface Message {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

@Component({
  selector: 'app-notification-icon',
  imports: [CommonModule, TranslateModule, NzIconModule, NzBadgeModule, NzDropDownModule, NzEmptyModule, NzButtonModule],
  template: `
    <span
      nz-dropdown
      nzTrigger="hover"
      nzPlacement="bottomRight"
      [nzDropdownMenu]="notificationMenu"
      [nzOverlayStyle]="{ width: '360px', maxHeight: '400px' }"
      class="notification-button"
    >
      <nz-badge [nzCount]="unreadCount()" [nzOverflowCount]="99">
        <span nz-icon nzType="bell" class="notification-icon"></span>
      </nz-badge>

      <nz-dropdown-menu #notificationMenu="nzDropdownMenu">
        <div class="notification-dropdown">
          <div class="notification-header">
            <span class="notification-title">{{ 'MESSAGES.NOTIFICATIONS' | translate }}</span>
            @if (unreadCount() > 0) {
              <span class="notification-badge">{{ unreadCount() }} {{ 'MESSAGES.NEW' | translate }}</span>
            }
          </div>

          <div class="notification-list">
            @if (messages().length === 0) {
              <nz-empty [nzNotFoundContent]="null">
                <span nz-empty-description>{{ 'MESSAGES.NO_NOTIFICATIONS' | translate }}</span>
              </nz-empty>
            } @else {
              @for (msg of displayedMessages(); track msg.id) {
                <div class="notification-item" (click)="markAsRead(msg.id)">
                  <div [class]="'notification-item-icon ' + msg.type">
                    <span nz-icon [nzType]="getIconType(msg.type)"></span>
                  </div>
                  <div class="notification-item-content">
                    <div class="notification-item-title">
                      {{ msg.title }}
                      @if (!msg.read) {
                        <span class="notification-item-tag">{{ 'MESSAGES.NEW' | translate }}</span>
                      }
                    </div>
                    <div class="notification-item-text">{{ msg.content }}</div>
                    <div class="notification-item-time">{{ formatTime(msg.timestamp) }}</div>
                  </div>
                </div>
              }
            }
          </div>

          @if (messages().length > 0) {
            <div class="notification-footer">
              <a (click)="goToMessages()">{{ 'MESSAGES.VIEW_ALL_MESSAGES' | translate }}</a>
            </div>
          }
        </div>
      </nz-dropdown-menu>
    </span>
  `,
  styleUrl: './notification-icon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationIconComponent {
  private router = inject(Router);
  private iconService = inject(NzIconService);
  private translate = inject(TranslateService);

  messages = signal<Message[]>([]);
  unreadCount = signal<number>(0);

  displayedMessages = signal<Message[]>([]);

  ngOnInit() {
    this.iconService.addIcon(
      BellOutline,
      InfoCircleOutline,
      CheckCircleOutline,
      ExclamationCircleOutline,
      CloseCircleOutline
    );

    this.loadMockMessages();
  }

  loadMockMessages() {
    const mockMessages: Message[] = [
      {
        id: '1',
        title: 'New User Registration',
        content: 'User john.doe@example.com has registered successfully',
        type: 'success',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        read: false,
      },
      {
        id: '2',
        title: 'System Update',
        content: 'System will be under maintenance on January 20th',
        type: 'info',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: false,
      },
      {
        id: '3',
        title: 'Failed Login Attempt',
        content: 'Multiple failed login attempts detected for user admin',
        type: 'warning',
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        read: true,
      },
      {
        id: '4',
        title: 'Database Backup Completed',
        content: 'Daily backup completed successfully at 3:00 AM',
        type: 'success',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        read: true,
      },
      {
        id: '5',
        title: 'Server CPU Warning',
        content: 'Server CPU usage exceeded 90% threshold',
        type: 'error',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
        read: true,
      },
      {
        id: '6',
        title: 'New Feature Available',
        content: 'Analytics dashboard is now available for all users',
        type: 'info',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
        read: true,
      },
      {
        id: '7',
        title: 'Storage Capacity Alert',
        content: 'Storage usage reached 85% capacity',
        type: 'warning',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
        read: true,
      },
      {
        id: '8',
        title: 'Password Expiry Reminder',
        content: 'Your password will expire in 7 days',
        type: 'warning',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        read: true,
      },
      {
        id: '9',
        title: 'Payment Processed',
        content: 'Invoice #2024-001 has been processed successfully',
        type: 'success',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
        read: true,
      },
      {
        id: '10',
        title: 'API Rate Limit',
        content: 'API rate limit has been reached for endpoint /api/users',
        type: 'error',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
        read: true,
      },
      {
        id: '11',
        title: 'Report Generated',
        content: 'Monthly sales report has been generated',
        type: 'info',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120),
        read: true,
      },
      {
        id: '12',
        title: 'Security Scan Results',
        content: 'Weekly security scan completed - no vulnerabilities found',
        type: 'success',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 168),
        read: true,
      },
    ];

    this.messages.set(mockMessages);
    this.updateUnreadCount();
    this.updateDisplayedMessages();
  }

  updateUnreadCount() {
    this.unreadCount.set(this.messages().filter(m => !m.read).length);
  }

  updateDisplayedMessages() {
    this.displayedMessages.set(this.messages().slice(0, 10));
  }

  markAsRead(messageId: string) {
    const currentMessages = this.messages();
    const updatedMessages = currentMessages.map(msg =>
      msg.id === messageId ? { ...msg, read: true } : msg
    );
    this.messages.set(updatedMessages);
    this.updateUnreadCount();
  }

  markAllAsRead() {
    const currentMessages = this.messages();
    const updatedMessages = currentMessages.map(msg => ({ ...msg, read: true }));
    this.messages.set(updatedMessages);
    this.updateUnreadCount();
  }

  goToMessages() {
    this.router.navigate(['/messages']);
  }

  getIconType(type: Message['type']): string {
    const iconMap = {
      info: 'info-circle',
      success: 'check-circle',
      warning: 'exclamation-circle',
      error: 'close-circle',
    };
    return iconMap[type];
  }

  formatTime(timestamp: Date): string {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) {
      return this.translate.instant('MESSAGES.JUST_NOW');
    } else if (minutes < 60) {
      return this.translate.instant('MESSAGES.MINUTES_AGO', { count: minutes });
    } else if (hours < 24) {
      return this.translate.instant('MESSAGES.HOURS_AGO', { count: hours });
    } else if (days < 7) {
      return this.translate.instant('MESSAGES.DAYS_AGO', { count: days });
    } else {
      return timestamp.toLocaleDateString();
    }
  }
}
