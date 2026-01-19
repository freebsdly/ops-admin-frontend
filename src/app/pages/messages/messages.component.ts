import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
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
  selector: 'app-messages',
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    NzIconModule,
    NzCardModule,
    NzListModule,
    NzTagModule,
    NzButtonModule,
    NzEmptyModule,
  ],
  template: `
    <div class="messages-container">
      <nz-card [nzBordered]="false" class="messages-card">
        <div nz-card-title class="messages-title">
          <span>{{ 'MESSAGES.TITLE' | translate }}</span>
          @if (unreadCount() > 0) {
            <nz-tag nzColor="red">{{ unreadCount() }} {{ 'MESSAGES.UNREAD' | translate }}</nz-tag>
          }
        </div>

        <div nz-card-body class="messages-body">
          @if (messages().length === 0) {
            <nz-empty [nzNotFoundContent]="null">
              <span nz-empty-description>{{ 'MESSAGES.NO_MESSAGES' | translate }}</span>
            </nz-empty>
          } @else {
            <nz-list [nzDataSource]="messages()" [nzRenderItem]="itemTemplate">
              <ng-template #itemTemplate let-item>
                <nz-list-item
                  [nzActions]="[actionTemplate]"
                  class="message-item"
                >
                  <nz-list-item-meta
                    [nzAvatar]="avatarTemplate"
                    [nzTitle]="titleTemplate"
                    [nzDescription]="descriptionTemplate"
                  >
                    <ng-template #avatarTemplate>
                      <div [class]="'message-avatar ' + item.type">
                        <span nz-icon [nzType]="getIconType(item.type)"></span>
                      </div>
                    </ng-template>
                    <ng-template #titleTemplate>
                      <div class="message-title-wrapper">
                        <span class="message-title">{{ item.title }}</span>
                        @if (!item.read) {
                          <nz-tag nzColor="blue" class="message-tag">{{ 'MESSAGES.NEW' | translate }}</nz-tag>
                        }
                      </div>
                    </ng-template>
                    <ng-template #descriptionTemplate>
                      <div class="message-content">{{ item.content }}</div>
                      <div class="message-time">{{ formatTime(item.timestamp) }}</div>
                    </ng-template>
                  </nz-list-item-meta>

                  <ng-template #actionTemplate>
                    @if (!item.read) {
                      <a (click)="markAsRead(item.id)" class="message-action">{{ 'MESSAGES.MARK_AS_READ' | translate }}</a>
                    } @else {
                      <span class="message-action-read">{{ 'MESSAGES.READ' | translate }}</span>
                    }
                  </ng-template>
                </nz-list-item>
              </ng-template>
            </nz-list>

            @if (messages().length > 10) {
              <div class="messages-pagination">
                <button nz-button nzType="default" (click)="loadMore()">
                  {{ 'MESSAGES.LOAD_MORE' | translate }}
                </button>
              </div>
            }
          }
        </div>
      </nz-card>
    </div>
  `,
  styleUrl: './messages.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent implements OnInit {
  private iconService = inject(NzIconService);
  private translate = inject(TranslateService);

  messages = signal<Message[]>([]);
  unreadCount = signal<number>(0);

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
      {
        id: '13',
        title: 'Disk Cleanup Required',
        content: 'Temporary files exceeded 10GB, cleanup recommended',
        type: 'warning',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 200),
        read: true,
      },
      {
        id: '14',
        title: 'SSL Certificate Expiring',
        content: 'SSL certificate will expire in 30 days',
        type: 'error',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 250),
        read: true,
      },
      {
        id: '15',
        title: 'Backup Failed',
        content: 'Incremental backup failed due to storage quota',
        type: 'error',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 300),
        read: true,
      },
    ];

    this.messages.set(mockMessages);
    this.updateUnreadCount();
  }

  updateUnreadCount() {
    this.unreadCount.set(this.messages().filter(m => !m.read).length);
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

  loadMore() {
    alert('Load more messages - In production, this would fetch more from the API');
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
