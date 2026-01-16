# Ops Admin Frontend

> A modern Angular 21 Ops Admin frontend with Ant Design UI, featuring comprehensive management dashboards, user authentication, multilingual support, and responsive design.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Angular](https://img.shields.io/badge/Angular-21.0.0-red.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🌟 Features

- **Modern Tech Stack**: Built with Angular 21, TypeScript 5.9, and Tailwind CSS 4
- **Beautiful UI**: Powered by NG-ZORRO Ant Design components
- **Responsive Layout**: Collapsible sidebar with smart menu behavior
- **Multilingual Support**: Integrated with ngx-translate for i18n (English/Chinese)
- **Authentication**: Secure user authentication with route guards
- **Dynamic Tabs**: Multi-tab navigation with right-click context menus
- **Theme Support**: Light gray theme for sidebar and tabbar, white for content
- **Route Loading**: Visual loading indicators for navigation
- **Path Aliases**: Using `@/` for cleaner imports
- **State Management**: Angular Signals for reactive state
- **Type Safety**: Full TypeScript strict mode enabled

## 📋 Prerequisites

- **Node.js**: >= 18.0.0
- **Package Manager**: pnpm 10.28.0
- **Angular CLI**: 21.0.4

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
pnpm install
```

### Development Server

```bash
# Start development server
pnpm start

# Or with custom configuration
pnpm run start:dev
```

Open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Build

```bash
# Production build
pnpm run build

# Development build
pnpm run build:dev

# Watch mode for development
pnpm run watch
```

Build artifacts will be stored in `dist/` directory.

## 🧪 Testing

```bash
# Run unit tests
pnpm test

# Run tests with coverage
pnpm run test:coverage
```

Tests use Vitest as the test runner.

## 📁 Project Structure

```
src/
├── app/
│   ├── layout/           # Layout components
│   │   ├── app-layout/    # Main layout container
│   │   ├── header/        # Header component
│   │   ├── sider/         # Sidebar with menus
│   │   └── tabs/         # Tab navigation
│   ├── pages/            # Page components
│   │   ├── home/         # Dashboard home
│   │   ├── login/        # Login page
│   │   └── user-profile/ # User profile
│   ├── components/       # Shared components
│   │   └── user-info-card/
│   ├── guards/          # Route guards
│   │   └── auth.guard.ts
│   ├── services/        # Application services
│   │   ├── auth.service.ts
│   │   ├── menu.service.ts
│   │   ├── route-config.service.ts
│   │   └── route-loading.service.ts
│   ├── app.config.ts    # App configuration
│   ├── app.routes.ts    # App routes
│   └── app.ts          # Root component
├── assets/
│   └── i18n/          # Translation files
├── styles.css         # Global styles
├── main.ts           # Application entry point
└── index.html        # HTML template
```

## 🎨 Layout Features

### Sidebar
- **Width**: 220px (expanded) / 48px (collapsed)
- **Background**: Light gray (#f3f4f6)
- **Behavior**:
  - Collapses to 48px with icons only
  - Submenus open on hover when collapsed
  - Submenus expand/collapse on click when expanded

### Header
- **Height**: 48px
- **Background**: White
- **Features**:
  - Language switcher (EN/ZH)
  - User profile dropdown
  - Responsive spacing with nz-space

### Tabbar
- **Height**: 32px
- **Background**: White
- **Features**:
  - Multi-tab navigation
  - Right-click context menus
  - Tab management (close, reload, duplicate, pin)
  - Active tab highlighting

### Content Area
- **Background**: White
- **Scroll**: Thin scrollbar (6px width)
- **Padding**: 16px (p-4)

## 🔧 Configuration

### Path Aliases

The project uses `@/` as a path alias for the `src` directory:

```typescript
// Instead of:
import { AuthService } from '../services/auth.service';

// Use:
import { AuthService } from '@/services/auth.service';
```

Configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"]
    }
  }
}
```

### Translation Keys

All translation keys follow this pattern:

```typescript
// Format: MODULE.KEY_NAME
'MENU.HOME'
'BUTTONS.SUBMIT'
'COMMON.USER'
```

Available in:
- `src/assets/i18n/en.json`
- `src/assets/i18n/zh.json`

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `pnpm start` | Start development server |
| `pnpm start:dev` | Start with dev configuration |
| `pnpm build` | Production build |
| `pnpm build:dev` | Development build |
| `pnpm build:prod` | Production build (explicit) |
| `pnpm watch` | Watch mode for development |
| `pnpm test` | Run unit tests |
| `pnpm run test:coverage` | Run tests with coverage |
| `pnpm run lint` | Run linting |
| `pnpm run format` | Format code with Prettier |

## 🛠️ Technology Stack

- **Framework**: Angular 21.0.0
- **Language**: TypeScript 5.9.2
- **UI Library**: NG-ZORRO Ant Design 21.0.0
- **Styling**: Tailwind CSS 4.1.12
- **Icons**: Ant Design Icons Angular 21.0.0
- **Forms**: Angular Reactive Forms
- **HTTP**: Angular HttpClient
- **Routing**: Angular Router
- **Translation**: ngx-translate 17.0.0
- **Testing**: Vitest 4.0.8
- **Build Tool**: Angular CLI 21.0.4
- **Package Manager**: pnpm 10.28.0

## 📝 Known Issues

- Test setup requires TranslateService mocking
- ng-zorro locale should be dynamic based on user language preference

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Angular Documentation](https://angular.dev)
- [NG-ZORRO Documentation](https://ng.ant.design)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [TypeScript Documentation](https://www.typescriptlang.org)

---

**Made with ❤️ using Angular 21**
