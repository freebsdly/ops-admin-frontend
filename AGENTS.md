# Ops Admin Frontend - Development Guide

You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices. This guide will help you work effectively in the Ops Admin Frontend codebase.

## Project Overview

- **Project Name**: ops-admin-frontend
- **Version**: 0.0.0
- **Framework**: Angular v21.0.0
- **Package Manager**: npm v10.9.2
- **Build Tool**: Angular CLI
- **Test Runner**: Vitest
- **Styling**: Tailwind CSS v4.1.12
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
npm run test          # Run unit tests using Vitest
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
│       ├── app.routes.ts          # Route definitions
│       ├── app.spec.ts            # Root component tests
│       └── layout/                # Layout components
│           └── app-layout/        # AppLayout component
│               ├── app-layout.ts  # AppLayout component logic
│               ├── app-layout.css # AppLayout component styles
├── public/                        # Static assets
│   └── favicon.ico               # Application icon
├── angular.json                   # Angular CLI configuration
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── tsconfig.app.json              # TypeScript configuration for app
├── tsconfig.spec.json             # TypeScript configuration for tests
├── .editorconfig                  # Editor configuration
├── .gitignore                     # Git ignore rules
└── README.md                      # Project documentation
```

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

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

- **Framework**: Vitest (unit testing)
- **Test Files**: Located alongside source files with `.spec.ts` extension
- **Running Tests**: `npm run test`
- **Vitest Features**: Supports TypeScript, ES modules, and Angular testing utilities

## Build and Deployment

- **Build Targets**:
  - Production: `npm run build` (default)
  - Development: `npm run build -- --configuration development`
- **Output Directory**: `dist/`
- **Code Splitting**: Automatic via Angular's build system
- **Asset Optimization**: Enabled for production builds

## Gotchas and Non-Obvious Patterns

1. **Angular v20+ Changes**: Standalone components are default; no need to set `standalone: true`
2. **Signals Instead of NgRx**: Signals are the recommended state management approach for most use cases
3. **Tailwind CSS v4**: Uses PostCSS integration with `@tailwindcss/postcss` plugin
4. **Vitest Configuration**: Configured as the default test runner (not Karma)
5. **No NgModules**: Application uses standalone components exclusively

## Existing Components

### Root Component (App)

- **File**: `src/app/app.ts`
- **Selector**: `app-root`
- **Template**: `app.html`
- **State**: Uses signal for `title` property
- **Imports**: RouterOutlet, AppLayout

### AppLayout Component

- **File**: `src/app/layout/app-layout/app-layout.ts`
- **Selector**: `app-app-layout`
- **Template**: Inline template with simple text
- **Change Detection**: OnPush strategy
- **Purpose**: Main application layout container

## Future Development Guidelines

1. **Component Generation**: Use Angular CLI to generate new components
2. **Route Configuration**: Add routes to `app.routes.ts`
3. **State Management**: Use signals for local state, consider NgRx for complex state
4. **Styling**: Leverage Tailwind CSS utility classes
5. **Testing**: Write Vitest tests for all new components and services
