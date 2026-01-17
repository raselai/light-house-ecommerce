# Repository Guidelines

## Project Structure & Module Organization
- `src/app/` holds Next.js App Router pages, layouts, and API routes (see `src/app/api/products` for primary CRUD).
- `src/components/`, `src/hooks/`, `src/lib/`, and `src/types/` contain UI, hooks, business logic, and shared types.
- `src/app/data/` and `data/` store static data (e.g., `data/products.json`).
- `public/` hosts static assets, while `scripts/` contains one-off migration utilities.
- `.next/` is build output and should not be edited by hand.

## Build, Test, and Development Commands
- `npm run dev`: start the local dev server on `http://localhost:3000`.
- `npm run build`: production build; run this before committing changes.
- `npm start`: serve the production build locally.
- `npm run lint`: run ESLint with the Next.js config.

## Coding Style & Naming Conventions
- TypeScript + React; use 2-space indentation and single quotes as seen in `src/app`.
- Use `@/` path aliases for imports from `src/` (configured in `tsconfig.json`).
- Component names are PascalCase (e.g., `AddProductForm.tsx`); hooks use `useX` naming.
- Tailwind utility classes are standard; global styles live in `src/app/globals.css`.

## Testing Guidelines
- There is no automated test runner configured.
- For image/storage checks, use the manual script: `node test-cloudinary.js`.
- Validate changes with `npm run build` to catch type or build errors.

## Commit & Pull Request Guidelines
- Follow existing commit style: `feat:`, `fix:`, `optimize:`, or scoped forms like `feat(admin): ...`.
- PRs should include a concise summary, testing performed, and screenshots for UI changes.
- Link related issues and call out any breaking or migration-impacting updates.

## Security & Configuration Tips
- Firebase credentials currently live in `src/lib/firebase.ts`; move to `.env.local` if revisiting config.
- Default admin credentials are listed in `DEPLOYMENT.md` and should be rotated before production.
- Product APIs should use `/api/products` (legacy variants exist but are deprecated).
