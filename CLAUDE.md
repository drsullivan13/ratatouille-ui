# Ratatouille UI - Development Guide

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Code Style Guidelines
- **Imports**: Group imports by type: React/Next.js, third-party libs, then local components
- **Component Structure**: Use functional components with hooks
- **State Management**: Use React hooks (useState, useEffect) for state
- **Naming**: PascalCase for components, camelCase for variables/functions
- **Error Handling**: Use try/catch blocks with specific error messages
- **CSS**: Tailwind classes for styling with amber/yellow color palette
- **Client Directives**: Use 'use client' directive at top of client components
- **Formatting**: Double quotes for imports, single quotes for JSX strings
- **Types**: Project uses JavaScript; ensure props are documented
- **Animations**: Use Framer Motion for transitions and animations

## Project Architecture
- Next.js App Router structure
- API routes in /api directory
- Components in /components directory
- TailwindCSS for styling