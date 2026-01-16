import { Injectable, inject } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  // Layout & Navigation
  DashboardOutline,
  TeamOutline,
  SettingOutline,
  AppstoreOutline,
  FileTextOutline,
  BarChartOutline,
  DatabaseOutline,
  BellOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  HomeOutline,
  SafetyCertificateOutline,
  GlobalOutline,
  
  // User & Auth
  UserOutline,
  LockOutline,
  LogoutOutline,
  SafetyOutline,
  
  // Content
  ShoppingOutline,
  CarOutline,
  DollarOutline,
  CreditCardOutline,
  PlusOutline,
  ToolOutline,
  
  // UI Elements
  EditOutline,
  CheckCircleOutline,
  QuestionCircleOutline,
  MailOutline,
  ArrowUpOutline
} from '@ant-design/icons-angular/icons';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  private readonly iconService = inject(NzIconService);

  constructor() {
    this.registerIcons();
  }

  private registerIcons(): void {
    const icons: IconDefinition[] = [
      // Layout & Navigation
      DashboardOutline,
      TeamOutline,
      SettingOutline,
      AppstoreOutline,
      FileTextOutline,
      BarChartOutline,
      DatabaseOutline,
      BellOutline,
      MenuFoldOutline,
      MenuUnfoldOutline,
      HomeOutline,
      SafetyCertificateOutline,
      GlobalOutline,
      
      // User & Auth
      UserOutline,
      LockOutline,
      LogoutOutline,
      SafetyOutline,
      
      // Content
      ShoppingOutline,
      CarOutline,
      DollarOutline,
      CreditCardOutline,
      PlusOutline,
      ToolOutline,
      
      // UI Elements
      EditOutline,
      CheckCircleOutline,
      QuestionCircleOutline,
      MailOutline,
      ArrowUpOutline
    ];
    
    this.iconService.addIcon(...icons);
    console.log(`Registered ${icons.length} icons for the application`);
  }
}