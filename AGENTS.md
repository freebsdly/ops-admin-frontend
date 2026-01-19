# Ops Admin Frontend - Development Guide

You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices. This guide will help you work effectively in the Ops Admin Frontend codebase.

## Project Overview

- **Project Name**: ops-admin-frontend
- **Version**: 1.0.0
- **Framework**: Angular v21.0.0
- **Package Manager**: pnpm v10.28.0
- **Build Tool**: Angular CLI (@angular/build)
- **UI Library**: NG-ZORRO-ANTD v21.0.0 + Ant Design Icons
- **Styling**: Tailwind CSS v4.1.12 (via @tailwindcss/postcss)
- **Language**: TypeScript ~5.9.2
- **Internationalization**: @ngx-translate/core v17.0.0 (English, Chinese)
- **Testing**: Vitest v4.0.8

## Essential Commands

### Development

```bash
npm start              # Start development server (http://localhost:4200)
npm run ng serve      # Same as npm start
npm run watch         # Build and watch for changes in development mode
npm run start:dev     # Start dev server with dev configuration
```

### Build

```bash
npm run build         # Build for production (outputs to dist/)
npm run build -- --configuration development  # Build for development
npm run build:dev    # Build for development
npm run build:prod   # Build for production
```

### Testing

```bash
npm run test          # Run unit tests using Angular test runner
npm run test:coverage # Run tests with coverage report
```

### Code Quality

```bash
npm run lint          # Run ESLint/TSLint
npm run format        # Format code with Prettier
```

### Angular CLI Commands

```bash
npm run ng generate component component-name  # Generate new component
npm run ng generate directive directive-name  # Generate new directive
npm run ng generate pipe pipe-name            # Generate new pipe
npm run ng generate service service-name      # Generate new service
npm run ng generate --help                    # List all available schematics
```

## Project Structure

```
D:/projects/ops-admin-frontend/
├── src/                           # Source code directory
│   ├── main.ts                    # Application entry point
│   ├── index.html                 # Main HTML file
│   ├── styles.css                 # Global styles (Tailwind CSS)
│   ├── assets/                    # Static assets
│   │   └── i18n/                 # Internationalization files
│   │       ├── en.json            # English translations
│   │       └── zh.json            # Chinese translations
│   └── app/                       # Root application module
│       ├── app.ts                 # Root component (App)
│       ├── app.html               # Root component template
│       ├── app.css                # Root component styles
│       ├── app.config.ts          # Application configuration (includes i18n setup)
│       ├── app.routes.ts          # Route definitions with AuthGuard
│       ├── app.spec.ts            # Root component tests
│       ├── services/              # Application services
│       │   ├── auth.service.ts     # Authentication service
│       │   ├── menu.service.ts     # Navigation menu service
│       │   ├── icon.service.ts    # Icon registration service (NG-ZORRO)
│       │   ├── route-config.service.ts # Route configuration and tab management
│       │   └── route-loading.service.ts # Route loading state service
│       ├── guards/                # Route guards
│       │   └── auth.guard.ts      # Authentication guard
│       ├── layout/                # Layout components
│       │   └── common/            # Shared layout components
│       │       ├── app-layout.ts  # Main application layout
│       │       ├── header/         # Header component
│       │       │   ├── header.ts
│       │       │   └── header.css
│       │       ├── sider/         # Sidebar component (named sider, not sidebar)
│       │       │   ├── sider.ts
│       │       │   ├── sider.css
│       │       │   └── menus/     # Menu components
│       │       │       ├── menus.ts
│       │       │       └── menus.css
│       │       ├── tabs/          # Tab bar component
│       │       │   └── tabs.ts    # Implements multi-tab navigation
│       │       ├── user-info/     # User info card component
│       │       │   └── user-info.component.ts
│       │       ├── notification-icon/ # Notification bell component
│       │       │   └── notification-icon.component.ts
│       │       └── loading/       # Route loading indicator
│       │           └── route-loading-indicator.component.ts
│       ├── pages/                 # Page components
│       │   ├── home/              # Home page (implemented)
│       │   │   └── home.component.ts
│       │   ├── login/             # Login page (implemented)
│       │   │   └── login.component.ts
│       │   ├── user-profile/      # User profile page (implemented)
│       │   │   ├── user-profile.component.ts
│       │   │   └── user-profile.component.css
│       │   ├── messages/           # Messages page (implemented)
│       │   │   └── messages.component.ts
│       │   └── placeholder.component.ts  # Generic placeholder for unimplemented pages
│       └── language-switcher/     # Language switcher component
│           └── language-switcher.component.ts
├── public/                        # Static assets
│   ├── favicon.ico               # Application icon
│   ├── logo.svg                  # Application logo (120x40)
│   ├── logo-expanded.svg         # Full logo for expanded sidebar (200x48)
│   └── logo-collapsed.svg        # Icon-only logo for collapsed sidebar (48x48)
├── angular.json                   # Angular CLI configuration
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── tsconfig.app.json              # TypeScript configuration for app
├── tsconfig.spec.json             # TypeScript configuration for tests
├── .editorconfig                  # Editor configuration
├── .gitignore                     # Git ignore rules
├── .postcssrc.json                # PostCSS configuration (Tailwind)
└── README.md                      # Project documentation
```

## UI Library: NG-ZORRO-ANTD

- **Version**: 21.0.0
- **Icons**: @ant-design/icons-angular
- **Key Components Used**: Layout, Menu, Button, Icon, Dropdown, Avatar, Tooltip, Card, Statistic, Grid, Table, Tag, Alert, Breadcrumb, Space, Badge, Empty, Context Menu
- **Import Pattern**: Import individual component modules (e.g., `NzLayoutModule`, `NzCardModule`)
- **Icon Registration**: Use `IconService` (singleton) that registers all icons at app startup

### Icon Handling Guidelines
- All icons are registered in `IconService` (see `src/app/services/icon.service.ts`)
- Icon service is initialized via `provideAppInitializer()` in `app.config.ts`
- Use registered icon names in templates (e.g., 'dashboard', 'user', 'setting')
- No need to manually register icons in individual components
- Registered icons: Dashboard, Team, Setting, Appstore, FileText, BarChart, Database, Bell, MenuFold, MenuUnfold, Home, SafetyCertificate, Global, User, Lock, Logout, Safety, Shopping, Car, Dollar, CreditCard, Plus, Tool, Edit, CheckCircle, QuestionCircle, Mail, ArrowUp

### I18n (Internationalization)
- **Library**: @ngx-translate/core v17.0.0
- **HTTP Loader**: @ngx-translate/http-loader
- **Supported Languages**: English (en), Chinese (zh)
- **Default Language**: en (English)
- **Translation Files**: Located in `/assets/i18n/`
- **Translation Keys**: Organized by feature (APP, LOGIN, HOME, MENU, LAYOUT, BUTTONS, COMMON, SETTINGS, LANGUAGE, USER_CARD, ACTIVITIES, TABS, MESSAGES, SEARCH)
- **NG-ZORRO Locale**: Also configured (en_US, zh_CN) for component localization

## TypeScript Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.
- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead
- Services use `signal()` for reactive state (e.g., `AuthService.isAuthenticated`)
- Follow reactive patterns with RxJS observables for async operations

### Authentication Pattern
- Use `AuthGuard` for protected routes
- Implement `AuthService` with signals for auth state
- Store JWT token in localStorage (demo only - use secure storage in production)
- Conditionally show layout based on auth state in `App` component
- Redirect to `/login` when not authenticated

### Routing Structure
- Protected routes: home, profile, messages, dashboard, analytics, reports, users, roles, permissions, audit, notifications, inventory, orders, customers, products, categories, warehouses, shipping, billing, invoices, payments, settings (require auth)
- Public routes: login
- Default redirect: `/` → `/home`
- 404 handling: `**` → `/home`
- Routes use data property for i18n translation keys (e.g., `data: { titleKey: 'MENU.DASHBOARD' }`)

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.
- Do not write arrow functions in templates (they are not supported).
- Use translation pipe `{{ 'KEY' | translate }}` for all user-facing text

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection
- Use `signal()` for reactive state in services
- Follow dependency injection patterns for testability
- Example patterns: `AuthService` (auth state), `MenuService` (navigation data), `IconService` (icon registration), `RouteConfigService` (route metadata), `RouteLoadingService` (loading state)

### Service Details

**IconService**:
- Singleton service that registers all NG-ZORRO icons at app startup
- Icons registered include layout, navigation, user, auth, content, and UI elements
- Used via `provideAppInitializer()` in `app.config.ts`

**RouteConfigService**:
- Provides route configuration metadata for tabs and menus
- Contains centralized route definitions with keys, paths, icons, and translation keys
- Methods: `getRouteConfig()`, `getTabConfig()`, `getAllRouteConfigs()`, `getMenuStructure()`
- Integrates with `AppTabBar` for dynamic tab creation

**RouteLoadingService**:
- Provides reactive loading state signal for route navigation
- Listens to router events (NavigationStart, NavigationEnd, NavigationCancel, NavigationError)
- Exposes `loading` signal as read-only for components to consume
- Includes 50ms delay to prevent flicker on fast route changes

**MenuService**:
- Manages menu data and selection state
- Provides menu hierarchy structure
- Integrates with route navigation

## Styling

- **Framework**: Tailwind CSS v4.1.12
- **Global Styles**: `src/styles.css`
- **Component Styles**: Each component has its own CSS file
- **PostCSS**: Configured with Tailwind CSS
- **Class Naming**: Use Tailwind's utility-first approach
- **Design System**: Gray-100/200 for backgrounds, blue/indigo gradients for accents

## Code Style

- **Formatter**: Prettier
- **Configuration**:
  - Print width: 100 characters
  - Single quotes: Yes
  - HTML parser: Angular-specific

## Testing

- **Framework**: Angular Test Runner (via `@angular/build:unit-test`)
- **Test Runner**: Vitest v4.0.8
- **Test Files**: Located alongside source files with `.spec.ts` extension
- **Running Tests**: `npm run test`
- **Coverage**: `npm run test:coverage`
- **Approach**: Component testing with TestBed, service testing with mocks
- **Key Dependencies**: @angular/core/testing, rxjs for async operations

## Build and Deployment

- **Build Targets**:
  - Production: `npm run build` or `npm run build:prod`
  - Development: `npm run build:dev`
- **Output Directory**: `dist/`
- **Code Splitting**: Automatic via Angular's build system
- **Asset Optimization**: Enabled for production builds

### Logo Implementation

**SVG Logo Files**:
- `/logo-expanded.svg`: Full logo for expanded sidebar (200x48)
- `/logo-collapsed.svg`: Icon-only logo for collapsed sidebar (48x48)
- `/logo.svg`: Original logo (120x40) - kept for compatibility

**Logo Usage**:
- **Header**: Shows `logo-expanded.svg` (full logo in left section)
- **Sider (Expanded)**: No logo in sidebar footer (only version display)
- **Sider (Collapsed)**: Sider width set to 0 (completely collapsed)

**Design Features**:
- Consistent gradient across both logos (#1890ff → #52c41a)
- Gear icon representing DevOps operations
- White text on gradient background for expanded logo
- Responsive sizing fills available area appropriately
- Logo appears in header for clean interface

## Features

### Header
- Logo area with full logo
- Right-aligned user actions section
- Language switcher dropdown (en/zh with flag emojis)
- Notification bell with unread badge
- User avatar dropdown with user info card
- User info card includes profile picture, name, role, status, stats, and navigation menu

### Tab Bar
- Multi-tab navigation system
- Automatic tab creation on route navigation
- Context menu for tab management (close, close others, close all, reload, duplicate, pin/unpin)
- Overflow handling with dropdown menu
- Tabs persisted in localStorage
- Home tab is always present and non-closable
- Route-aware tab activation

### Sidebar (Sider)
- Hierarchical menu structure with nested submenus
- Icons for all menu items
- Translation support for menu labels
- Collapsible (completely hidden when collapsed)
- Version display in footer
- Smooth collapse/expand animations

### Notifications
- Notification bell icon in header
- Badge showing unread count
- Dropdown with message list (up to 10 messages displayed)
- Message types: info, success, warning, error (color-coded)
- Read/unread status tracking
- Time formatting (just now, X minutes ago, etc.)
- Link to full messages page
- Mock data for demo purposes

### Language Switcher
- Dropdown in header with flag emojis
- Supports English (🇺🇸) and Chinese (🇨🇳)
- Persists language preference in localStorage
- Reloads page to apply NG-ZORRO locale changes

### Route Loading
- Full-screen loading overlay during navigation
- Blur effect on background
- Spinner and loading text
- Automatic 50ms delay to prevent flicker
- Reactive signal-based state

## Gotchas and Non-Obvious Patterns

1. **Angular v20+ Changes**: Standalone components are default; no need to set `standalone: true`
2. **Signals for State**: Use signals in services and components for reactive state
3. **NG-ZORRO-ANTD UI**: Follow NG-ZORRO patterns for consistent UI components
4. **Authentication Flow**: Protected routes with `AuthGuard`, conditional layout rendering
5. **Package Manager**: Uses pnpm (not npm) - note the difference in package resolution
6. **File Naming**: Sidebar component is named `sider.ts` (not `sidebar.ts`) - follows NG-ZORRO naming convention
7. **Icon Registration**: All icons are registered globally via `IconService` - don't register manually in components
8. **I18n Integration**: NG-ZORRO locale and @ngx-translate are separate systems - language switcher reloads page to sync NG-ZORRO locale
9. **Tab Persistence**: Tabs are stored in localStorage with key `app_tabs` including tab data and selected index
10. **Route Loading**: Loading state is reactive and based on router events with 50ms debounce
11. **Sidebar Collapse**: When collapsed, sidebar width is 0 (completely hidden), not just narrow
12. **Header Layout**: Logo on left, user actions on right with notification icon, language switcher, and user dropdown
13. **Mock Data**: Authentication, user data, notifications, and messages are mock implementations for demo purposes
14. **Translation Keys**: All UI text uses translation pipes with nested keys (e.g., 'MENU.DASHBOARD', 'LAYOUT.HEADER.PROFILE')
15. **Route Data**: Routes include `data: { titleKey: '...' }` for dynamic title translation

## Future Development Guidelines

1. **Page Implementation Priority**:
   - Dashboard and Analytics pages with charts and statistics
   - Reports page with system, user, and performance reports
   - Settings sections (General, Authentication, Notifications, Encryption)
   - Security modules (User, Role, Permission management with actual RBAC)
   - Operations modules (Inventory, Orders, Customers)
   - Products modules (Products, Categories, Warehouses)
   - Finance modules (Billing, Invoices, Payments)

2. **Component Generation**: Use Angular CLI to generate new components for placeholder pages

3. **Route Configuration**: Replace placeholder routes with actual page components, maintaining data.titleKey pattern

4. **State Management**: Use signals for local state, services for shared state, consider NgRx for complex global state

5. **Authentication**: Replace mock AuthService with real API integration (JWT, OAuth, etc.)

6. **Testing**: Write Angular TestBed tests for all components and services, aim for >80% coverage

7. **Role-Based Features**: Implement actual role-based menu generation and access control with permissions

8. **Responsive Design**: Ensure all components work on mobile breakpoints (sidebar collapse, tab overflow handling)

9. **Performance**: Implement lazy loading for large feature modules, optimize bundle size with Angular CLI

10. **I18n Expansion**: Add more languages (Japanese, Korean, Spanish, French, German, etc.) as needed

11. **Real Notifications**: Replace mock notifications with real notification system (WebSocket or polling)

12. **Real Messages**: Implement actual messaging system with backend integration

13. **Search Functionality**: Implement global search across all resources

14. **Error Handling**: Add global error handler and user-friendly error pages

15. **API Integration**: Create HTTP interceptors for auth tokens, error handling, and request/response logging
