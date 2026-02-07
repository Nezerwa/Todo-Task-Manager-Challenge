# Todo Task Manager

A modern, production-ready task management application built with React, TypeScript, and Vite.

## 🚀 Tech Stack

- **Framework:** React 19.2.0
- **Language:** TypeScript 5.9.3
- **Build Tool:** Vite (with Rolldown)
- **Styling:** Tailwind CSS v4.1 + shadcn/ui
- **Routing:** React Router v7
- **State Management:** Zustand 5.0
- **Data Fetching:** TanStack Query v5
- **Table Management:** TanStack Table v8
- **Testing:** Vitest + React Testing Library
- **E2E Testing:** Cypress
- **Code Quality:** ESLint 9 + Prettier
- **CI/CD:** GitHub Actions

## 📋 Prerequisites

- **Node.js:** 20.x or higher
- **npm:** 10.x or higher

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd Todo-Task-Manager-Challenge
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

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
├── components/       # Reusable UI components
│   └── ui/          # shadcn/ui components
├── hooks/           # Custom React hooks
├── layouts/         # Layout components
├── lib/
│   ├── config/      # Configuration files (queryClient, etc.)
│   └── utils/       # Utility functions
├── pages/           # Page components
├── routes/          # Route definitions
├── App.tsx          # Root application component
├── main.tsx         # Application entry point
└── index.css        # Global styles + Tailwind
```

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

- **Zustand:** For global state
- **TanStack Query:** For server state and caching
- **React Context:** For component-specific state when needed

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

## 🔒 Environment Variables

For local development, copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

All environment variables must be prefixed with `VITE_` to be exposed to the application.

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vite Guide](https://vitejs.dev/guide)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [React Router Docs](https://reactrouter.com)

## 📄 License

MIT
