<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Outline app (React + TanStack Router, file-based routing). Here is a summary of every change made:

- **`posthog-js` installed** as a dependency in `apps/web`
- **`apps/web/.env`** — `VITE_PUBLIC_POSTHOG_KEY` and `VITE_PUBLIC_POSTHOG_HOST` written (never hardcoded in source)
- **`packages/env/src/web.ts`** — Added `VITE_PUBLIC_POSTHOG_KEY` and `VITE_PUBLIC_POSTHOG_HOST` to the shared env validation schema so they are type-safe across the monorepo
- **`apps/web/vite.config.ts`** — Added a `/ingest` reverse proxy to route PostHog ingestion calls through the dev server, avoiding ad-blocker interference
- **`apps/web/src/routes/__root.tsx`** — Wrapped the entire app in `<PostHogProvider>` with `capture_exceptions: true` (automatic error tracking) and `debug` mode in development
- **`apps/web/src/components/sign-in-form.tsx`** — On success: `posthog.identify()` + `posthog.capture("user_signed_in")`; on error: `posthog.capture("user_sign_in_failed")`
- **`apps/web/src/components/sign-up-form.tsx`** — On success: `posthog.identify()` + `posthog.capture("user_signed_up")`; on error: `posthog.capture("user_sign_up_failed")`
- **`apps/web/src/components/user-menu.tsx`** — On sign-out click: `posthog.capture("user_signed_out")` + `posthog.reset()` to clear the identified user
- **`apps/web/src/routes/dashboard.tsx`** — `posthog.capture("dashboard_viewed")` fired via TanStack Router's `onEnter` callback (no `useEffect`)

## Events

| Event                 | Description                                                        | File                                       |
| --------------------- | ------------------------------------------------------------------ | ------------------------------------------ |
| `user_signed_in`      | User successfully signed in with email and password                | `apps/web/src/components/sign-in-form.tsx` |
| `user_sign_in_failed` | User attempted to sign in but received an error                    | `apps/web/src/components/sign-in-form.tsx` |
| `user_signed_up`      | User successfully created a new account                            | `apps/web/src/components/sign-up-form.tsx` |
| `user_sign_up_failed` | User attempted to sign up but received an error                    | `apps/web/src/components/sign-up-form.tsx` |
| `user_signed_out`     | User clicked sign out from their account menu                      | `apps/web/src/components/user-menu.tsx`    |
| `dashboard_viewed`    | Authenticated user loaded the dashboard (top of engagement funnel) | `apps/web/src/routes/dashboard.tsx`        |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- 📊 **Dashboard** — [Analytics basics](https://us.posthog.com/project/319613/dashboard/1297169)
- 📈 **Sign Ups & Sign Ins over time** — [View insight](https://us.posthog.com/project/319613/insights/o1j4m4uS)
- 🔀 **Sign Up → Dashboard conversion funnel** — [View insight](https://us.posthog.com/project/319613/insights/xi1xfivQ)
- ⚠️ **Auth failure rates** — [View insight](https://us.posthog.com/project/319613/insights/IYfEEiVg)
- 🚪 **User sign-outs (churn signal)** — [View insight](https://us.posthog.com/project/319613/insights/BY1C5W4I)
- 👥 **Weekly active users** — [View insight](https://us.posthog.com/project/319613/insights/iQ1rmqfq)

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/posthog-integration-react-tanstack-router-file-based/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
