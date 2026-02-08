# Todo Task Manager

A modern, feature-rich task management application with multiple view modes, internationalization, and a beautiful UI. Built with React 19, TypeScript, and the latest web technologies for optimal performance and developer experience.

## ✨ Core Features

### 📊 Multiple View Modes

- **Calendar View** - Visualize tasks in a weekly calendar layout with drag-and-drop support
- **Kanban Board** - Organize tasks by status with an intuitive card-based interface
- **List View** - Manage tasks in a sortable, filterable table with advanced grouping

### 📝 Task Management

- **CRUD Operations** - Create, read, update, and delete tasks with ease
- **Status Tracking** - Four status levels: To Do, In Progress, Review, Done
- **Priority Levels** - Organize by Low, Medium, and High priority with color-coded badges
- **Task Details** - Add descriptions, assignees, due dates, and tags
- **Quick Actions** - Inline editing, status updates, and bulk operations

### 🎨 User Experience

- **Dark Mode** - Seamless light/dark theme switching with system preference detection
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Internationalization** - Multi-language support (English, French) with i18next
- **Sidebar Navigation** - Collapsible sidebar with page management and quick access
- **Smart Filtering** - Filter tasks by status, priority, assignee, and date range
- **Search & Sort** - Real-time search with customizable sorting options

### 🎯 Advanced Features

- **Status Icons** - Visual status indicators with color-coded icons across all views
- **Task Grouping** - Automatic grouping by status in list and kanban views
- **Responsive Headers** - Mobile-optimized breadcrumb navigation with progressive disclosure
- **Touch Support** - Enhanced mobile interactions with touch-optimized controls
- **Accessibility** - WCAG compliant with keyboard navigation and screen reader support

## 🚀 Tech Stack

### Core Technologies

- **Framework:** React 19.2.0 - Latest React with improved performance and concurrent features
- **Language:** TypeScript 5.9.3 - Type-safe development with strict mode enabled
- **Build Tool:** Vite (Rolldown) - Lightning-fast HMR and optimized production builds
- **Styling:** Tailwind CSS v4.1 - Utility-first CSS with OKLCH color space
- **UI Components:** shadcn/ui - Accessible, customizable component library

### State & Data Management

- **Routing:** React Router v7 - Modern data router with nested routes
- **State Management:** Zustand 5.0 - Lightweight, scalable state management
- **Data Fetching:** TanStack Query v5 - Powerful async state management with caching
- **Table Management:** TanStack Table v8 - Headless table library for complex data grids
- **Internationalization:** i18next 25.8 + react-i18next 16.5 - Multi-language support

### Developer Experience

- **Testing:** Vitest + React Testing Library - Fast, Jest-compatible unit testing
- **E2E Testing:** Cypress - Comprehensive end-to-end testing framework
- **Code Quality:** ESLint 9 + Prettier - Automated code formatting and linting
- **Type Checking:** TypeScript strict mode - Maximum type safety
- **CI/CD:** GitHub Actions - Automated testing and deployment

### UI & Icons

- **Icons:** Lucide React - Beautiful, consistent icon library (563+ icons)
- **Animations:** Tailwind transitions - Smooth, performant CSS animations
- **Components:** Radix UI - Unstyled, accessible component primitives
- **Utilities:** clsx + tailwind-merge - Efficient className management

## 🚀 Quick Start

### Prerequisites

- **Node.js:** 20.x or higher
- **npm:** 10.x or higher

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Todo-Task-Manager-Challenge

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 🎯 Key Highlights

- ⚡ **Lightning Fast** - Built with Vite (Rolldown) for instant HMR and optimized builds
- 🎨 **Modern UI** - Beautiful, responsive interface with dark mode support
- 🌍 **Multi-language** - English and French translations with easy language switching
- 📱 **Mobile First** - Touch-optimized interface that works perfectly on all devices
- ♿ **Accessible** - WCAG compliant with keyboard navigation and screen reader support
- 🧪 **Well Tested** - Comprehensive unit and E2E tests with high coverage
- 🔧 **Developer Friendly** - TypeScript strict mode, ESLint, Prettier, and helpful tooling
- 📦 **Production Ready** - Optimized builds with code splitting and lazy loading

## 📜 Available Scripts

### Development

```bash
npm run dev          # Start development server with HMR
npm run preview      # Preview production build locally
```

### Building

```bash
npm run build        # Type check + production build
npm run type-check   # Run TypeScript type checking
```

### Code Quality

```bash
npm run lint         # Check code for linting errors
npm run lint:fix     # Auto-fix linting issues
npm run format       # Format code with Prettier
npm run format:check # Check if code is formatted
```

### Testing

```bash
npm test             # Run all tests once
npm run test:watch   # Run tests in watch mode
npm run test:ui      # Open Vitest UI interface
npm run test:coverage # Generate coverage report
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui base components (button, dropdown, sidebar, etc.)
│   ├── calendar/       # Calendar view components (CalendarView, TaskCard, hooks)
│   ├── kanban/         # Kanban board components (KanbanBoard, KanbanColumn, KanbanCard)
│   ├── list/           # List view components (ListView, ListViewTable, columns)
│   ├── sidebar/        # Sidebar navigation components
│   └── PageHeader.tsx  # Reusable page header with breadcrumbs
├── hooks/              # Custom React hooks
│   └── useExampleQuery.ts
├── layouts/            # Layout components
│   └── RootLayout.tsx  # Main app layout with sidebar
├── lib/
│   ├── config/         # Configuration files
│   │   └── queryClient.ts  # TanStack Query configuration
│   └── utils/          # Utility functions
│       └── index.ts    # clsx + tailwind-merge utilities
├── pages/              # Page components
│   ├── HomePage.tsx    # Main dashboard page
│   └── NotFoundPage.tsx  # 404 error page
├── routes/             # Route definitions
│   └── index.tsx       # React Router configuration
├── assets/             # Static assets (images, fonts, etc.)
├── App.tsx             # Root application component
├── main.tsx            # Application entry point
└── index.css           # Global styles + Tailwind directives
```

### Key Directories

- **`components/calendar/`** - Calendar view with weekly layout, task cards, and time-based overlap detection
- **`components/kanban/`** - Kanban board with status columns, drag-and-drop, and task cards
- **`components/list/`** - Table view with TanStack Table, sorting, filtering, and grouping
- **`components/ui/`** - Base UI components from shadcn/ui with custom styling
- **`layouts/`** - Page layouts with sidebar integration and responsive behavior

## 🎨 Styling

### Tailwind CSS v4

Modern Tailwind CSS setup using:

- CSS-first configuration via `@theme` directive
- OKLCH color space for better color manipulation
- Class-based dark mode (`.dark`)
- Custom CSS variables for theming

### shadcn/ui

- **Style:** New York
- **Base Color:** Neutral
- **CSS Variables:** Enabled
- **Icon Library:** Lucide React

## 🧪 Testing Strategy

### Unit Tests (Vitest)

- Component testing with React Testing Library
- Test setup with jest-dom matchers
- Coverage reporting enabled

### E2E Tests (Cypress)

- End-to-end testing for critical user flows
- Component testing support

## 🔧 Configuration Files

| File                 | Purpose                                              |
| -------------------- | ---------------------------------------------------- |
| `tsconfig.json`      | Base TypeScript configuration                        |
| `tsconfig.app.json`  | App-specific TypeScript config (strict mode enabled) |
| `tsconfig.node.json` | Node/tooling TypeScript config                       |
| `vite.config.ts`     | Vite build configuration                             |
| `vitest.config.ts`   | Vitest test configuration                            |
| `eslint.config.js`   | ESLint flat config with TypeScript rules             |
| `.prettierrc`        | Prettier code formatting rules                       |
| `components.json`    | shadcn/ui configuration                              |

## 🚦 CI/CD Pipeline

GitHub Actions workflows automatically run on PRs:

1. **Format Check** - Ensures code is properly formatted
2. **Type Check** - Validates TypeScript types
3. **Lint** - Checks for code quality issues
4. **Build** - Verifies production build succeeds
5. **Test** - Runs all unit tests

## 🏗️ Architecture Decisions

### TypeScript Configuration

- **Strict Mode:** Enabled for maximum type safety
- **Path Aliases:** `@/` mapped to `src/`
- **Module Resolution:** Bundler mode for optimal Vite integration

### Routing

- **Router Type:** `createBrowserRouter` (Data Router API)
- **Layout Pattern:** Root layout with nested routes
- **404 Handling:** Catch-all route with dedicated 404 page

### State Management

- **Zustand:** Primary state management solution with localStorage persistence
  - Manages all task data (CRUD operations)
  - Persists tasks to localStorage for offline availability
  - Provides optimized selectors for filtering tasks by status

### Styling Approach

- **Utility-First:** Tailwind CSS for rapid development
- **Component Library:** shadcn/ui for accessible, customizable components
- **CSS Variables:** For dynamic theming support

## 🤝 Development Workflow

1. Create a feature branch from `develop`
2. Make your changes with meaningful commits
3. Run `npm run format` before committing
4. Ensure all checks pass: `npm run type-check && npm run lint && npm test`
5. Push and create a Pull Request
6. CI will automatically run all checks
7. Request code review

## 📝 Code Style

- **Quotes:** Double quotes for strings
- **Semicolons:** Required
- **Indentation:** 2 spaces
- **Line Length:** 100 characters max
- **Trailing Commas:** ES5 compatible

Code formatting is enforced by Prettier and checked in CI.

## Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vite Guide](https://vitejs.dev/guide)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [React Router Docs](https://reactrouter.com)
- [Zustand Documentation](https://zustand-demo.pmnd.rs)
- [Lucide Icons](https://lucide.dev)

## 📄 License

MIT
