# Outline

Mobile-first PWA connecting Ghanaian educators with WASSCE/Cambridge students. Built with Better-T-Stack.

## Commands

```bash
pnpm dev              # Start all services (web + convex backend)
pnpm dev:web          # Frontend only (Vite on :5173)
pnpm dev:server       # Convex backend only
pnpm build            # Build all packages
pnpm check-types      # TypeScript check across monorepo
pnpm check            # Lint + format (oxlint + oxfmt)
```

### Backend-specific

```bash
cd packages/backend
npx convex typecheck          # Typecheck Convex functions
npx convex dev --once         # Push schema + functions once
npx convex run admin:seedAdmin '{"email":"..."}'  # Promote first admin
```

## Architecture

Turborepo monorepo:

- `apps/web` — React + TanStack Router + Tailwind (Vite)
- `packages/backend` — Convex (schema, mutations, queries, triggers, HTTP actions)
- `packages/env` — Shared environment validation
- `packages/infra` — Alchemy deployment (SST-like)
- `packages/config` — Shared config

## Key Files

- `packages/backend/convex/schema.ts` — All table definitions
- `packages/backend/convex/auth.ts` — Better Auth setup + user lifecycle triggers
- `packages/backend/convex/lib/auth.ts` — Role-based auth helpers (requireAuth, requireAdmin, requireTeamMember)
- `apps/web/src/routes/` — TanStack Router file-based routes

## Code Style

- Linter: oxlint (not ESLint)
- Formatter: oxfmt (not Prettier)
- Pre-commit: husky + lint-staged runs `oxlint` and `oxfmt --write` on all staged files
- Tabs for indentation

## Roles

Three roles: `learner` (default on signup), `team_member` (via invite), `admin` (via seed script). Single role per user, stored on `profiles` table.

## Gotchas

- Convex uses `triggers` (not Better Auth's `databaseHooks`) for user lifecycle — see `auth.ts`
- `npx convex dev --once` fails if local backend is already running on :3210 — use `npx convex typecheck` for CI-free type checking
- Don't commit plan docs in `docs/plans/` — design docs only
- The `services` table is missing a `teamMemberId` field — needs a schema migration before NOR-15

## Workflow

- Linear project: [Outline](https://linear.app/northjosh/project/outline-a9fde47cc044)
- Branch naming: `feature/<NOR-XX>`
- Assign Linear issue to user, move to In Progress, create branch, implement, PR
- Don't add Co-Authored-By unless told to
