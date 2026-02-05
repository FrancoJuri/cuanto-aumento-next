# AGENTS.md

Purpose
- Guidance for agentic coding assistants working in this repo.
- Reflects current tooling, code patterns, and conventions in the codebase.

Project Snapshot
- Framework: Next.js App Router (app/).
- Language: TypeScript with strict mode.
- Styling: Tailwind CSS v4 via `@import "tailwindcss"` + CSS variables.
- API: Axios client in `lib/api.ts` using `NEXT_PUBLIC_API_URL`.

Repository Layout
- `app/` Next.js App Router routes and layouts.
- `components/` React UI components (grouped by feature).
- `hooks/` React hooks.
- `lib/` API client and shared utilities.
- `types/` domain types and shared interfaces.

Commands
- Install: `npm install`
- Dev server: `npm run dev`
- Production build: `npm run build`
- Start production server: `npm run start`
- Lint: `npm run lint`

Linting
- ESLint config in `eslint.config.mjs`.
- Uses `eslint-config-next` (core-web-vitals + typescript).
- Custom ignores override defaults: `.next/`, `out/`, `build/`, `next-env.d.ts`.

Testing
- No test runner configured in this repo.
- No `test` script in `package.json`.
- No test config (Jest/Vitest/Playwright/Cypress) detected.

Running a Single Test
- Not applicable yet; add a test runner before single-test commands exist.
- If you add one, update this file with the exact command.

TypeScript
- Strict mode enabled in `tsconfig.json`.
- Module resolution: `bundler`.
- Path alias: `@/*` -> project root.

Code Style Guidelines

General
- Match existing formatting: 2-space indentation, semicolons, double quotes.
- Prefer small, focused components; avoid mixed concerns.
- Keep files ASCII unless existing file already uses non-ASCII.

Imports
- Use the `@/` alias for internal modules when available.
- Type-only imports use `import type { ... }`.
- Organize imports by source type: framework, external, internal.

Components
- Prefer function components; use `export default` for components.
- Mark client components with the `"use client"` directive at top.
- Use descriptive component names in PascalCase.
- Keep JSX readable; split complex UI into subcomponents.

Hooks
- Hooks are named `useX` and exported as named exports.
- Keep hook return types explicit in public hooks.
- Manage async state in hooks with loading/error flags.

Types
- Shared types live in `types/` and `lib/api.ts`.
- Reuse existing interfaces instead of duplicating shapes.
- Prefer explicit types for API responses and hook returns.

Naming Conventions
- Components: `PascalCase` filenames and identifiers.
- Hooks: `camelCase` with `use` prefix.
- Functions/variables: `camelCase`.
- Constants: `UPPER_SNAKE_CASE` only for truly constant values.

Error Handling
- Use `try/catch` around async API calls.
- Surface user-facing error messages via state (see `useProductSearch`).
- Log unexpected errors with `console.error` for diagnostics.

Data Fetching
- API calls live in `lib/api.ts` via a shared Axios instance.
- Use typed responses and return `response.data`.
- Prefer async server components where possible; use `Suspense` for loading.

Styling
- Tailwind classes are used extensively in components.
- Global CSS variables live in `app/globals.css`.
- Branding colors are defined as CSS variables for reuse.

Formatting & Lint
- No Prettier config detected; rely on ESLint + existing style.
- Keep line lengths reasonable; prefer wrapping long JSX props.

Accessibility
- Provide `aria-label` for icon-only buttons.
- Use semantic elements (`header`, `article`, etc.) as shown in components.

Internationalization
- UI copy is in Spanish; keep new copy consistent with existing tone.

Assets & Fonts
- Fonts are managed via `next/font` in `app/layout.tsx`.
- Keep font variables consistent with `--font-*` usage.

Environment
- API base URL: `NEXT_PUBLIC_API_URL` in `.env` (not committed).
- Default dev API fallback: `http://localhost:4000/api`.

Cursor / Copilot Rules
- No `.cursor/rules/`, `.cursorrules`, or `.github/copilot-instructions.md` found.
- If added later, update this section to include them verbatim.

Suggested Workflow for Agents
- Read nearby files before editing to match patterns.
- Update types and API interfaces first, then components.
- Run `npm run lint` after non-trivial edits.
- Note: No tests to run; keep changes minimal and scoped.
