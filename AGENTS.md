# Ops Admin Frontend - Development Guide

You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices. This guide will help you work effectively in the Ops Admin Frontend codebase.

## Project Overview

- **Project Name**: ops-admin-frontend
- **Version**: 0.0.0
- **Framework**: Angular v21.0.0
- **Package Manager**: pnpm v10.28.0
- **Build Tool**: Angular CLI (@angular/build)
- **UI Library**: NG-ZORRO-ANTD v21.0.0 + Ant Design Icons
- **Styling**: Tailwind CSS v4.1.12 (via @tailwindcss/postcss)
- **Language**: TypeScript ~5.9.2

## Essential Commands

### Development

```bash
npm start              # Start development server (http://localhost:4200)
npm run ng serve      # Same as npm start
npm run watch         # Build and watch for changes in development mode
```

### Build

```bash
npm run build         # Build for production (outputs to dist/)
npm run build -- --configuration development  # Build for development
```

### Testing

```bash
npm run test          # Run unit tests using Angular test runner
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
│   └── app/                       # Root application module
│       ├── app.ts                 # Root component (App)
│       ├── app.html               # Root component template
│       ├── app.css                # Root component styles
│       ├── app.config.ts          # Application configuration
│       ├── app.routes.ts          # Route definitions with AuthGuard
│       ├── app.spec.ts            # Root component tests
│       ├── services/              # Application services
│       │   ├── auth.service.ts    # Authentication service
│       │   └── menu.service.ts    # Navigation menu service
│       ├── guards/                # Route guards
│       │   └── auth.guard.ts      # Authentication guard
│       ├── layout/                # Layout components
│       │   ├── app-layout.ts      # Main application layout
│       │   ├── app-layout.css
│       │   ├── header/            # Header component
│       │   │   ├── header.ts
│       │   │   └── header.css
│       │   └── sidebar/           # Sidebar component
│       │       ├── sidebar.ts
│       │       └── sidebar.css
│       └── pages/                 # Page components
│           ├── home/              # Home page
│           │   └── home.component.ts
│           ├── login/             # Login page
│           │   └── login.component.ts
│           └── user-profile/      # User profile page
│               ├── user-profile.component.ts
│               └── user-profile.component.css
├── public/                        # Static assets
│   ├── favicon.ico               # Application icon
│   └── logo.svg                  # Application logo
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
- **Key Components Used**: Layout, Menu, Button, Icon, Dropdown, Avatar, Tooltip, Card, Statistic, Grid, Table, Tag, Alert, Breadcrumb, Space
- **Import Pattern**: Import individual component modules (e.g., `NzLayoutModule`, `NzCardModule`)
- **Icon Registration**: Use `NzIconService.addIcon()` in component `ngOnInit()` or constructor

### Icon Handling Guidelines
- Register icons before using them in templates
- Use Ant Design icon names (e.g., 'dashboard', 'user', 'setting')
- Import icon definitions from '@ant-design/icons-angular/icons'
- Register in component constructors or `ngOnInit()`

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## TypeScript Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

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
- Protected routes: `home`, `profile` (require auth)
- Public routes: `login`
- Default redirect: `/` → `/home`
- 404 handling: `**` → `/home`

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.
- Do not write arrow functions in templates (they are not supported).

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection
- Use `signal()` for reactive state in services
- Follow dependency injection patterns for testability
- Example patterns: `AuthService` (auth state), `MenuService` (navigation data)

## Styling

- **Framework**: Tailwind CSS v4.1.12
- **Global Styles**: `src/styles.css`
- **Component Styles**: Each component has its own CSS file
- **PostCSS**: Configured with Tailwind CSS
- **Class Naming**: Use Tailwind's utility-first approach

## Code Style

- **Formatter**: Prettier
- **Configuration**:
  - Print width: 100 characters
  - Single quotes: Yes
  - HTML parser: Angular-specific

## Testing

- **Framework**: Angular Test Runner (via `@angular/build:unit-test`)
- **Test Files**: Located alongside source files with `.spec.ts` extension
- **Running Tests**: `npm run test`
- **Approach**: Component testing with TestBed, service testing with mocks
- **Key Dependencies**: @angular/core/testing, rxjs for async operations

## Build and Deployment

- **Build Targets**:
  - Production: `npm run build` (default)
  - Development: `npm run build -- --configuration development`
- **Output Directory**: `dist/`
- **Code Splitting**: Automatic via Angular's build system
- **Asset Optimization**: Enabled for production builds

## Gotchas and Non-Obvious Patterns

1. **Angular v20+ Changes**: Standalone components are default; no need to set `standalone: true`
2. **Signals for State**: Use signals in services and components for reactive state
3. **NG-ZORRO-ANTD UI**: Follow NG-ZORRO patterns for consistent UI components
4. **Authentication Flow**: Protected routes with `AuthGuard`, conditional layout rendering
5. **Package Manager**: Uses pnpm (not npm) - note the difference in package resolution

## Future Development Guidelines

1. **Component Generation**: Use Angular CLI to generate new components
2. **Route Configuration**: Add routes to `app.routes.ts` with appropriate guards
3. **State Management**: Use signals for local state, services for shared state
4. **Styling**: Combine Tailwind CSS with NG-ZORRO component styling
5. **Testing**: Write Angular TestBed tests for components and services
6. **Authentication**: Extend AuthService with real API integration
7. **Navigation**: Expand MenuService for dynamic menu generation based on roles
8. **Responsive Design**: Ensure all components work on mobile breakpoints
