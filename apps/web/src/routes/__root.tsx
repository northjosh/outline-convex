import { env } from "@outline-convex/env/web";
import { HeadContent, Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { PostHogProvider } from "posthog-js/react";

import NotFoundPage from "@/components/not-found-page";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import "../index.css";

export interface RouterAppContext {}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  notFoundComponent: NotFoundPage,
  head: () => ({
    meta: [
      {
        title: "Syllabi — Academic Excellence in Ghana",
      },
      {
        name: "description",
        content:
          "Connect with Ghana's top educators for WASSCE, Cambridge & GES exam prep. Live tutoring, study materials and expert guidance.",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
  }),
});

function RootComponent() {
  const content = (
    <>
      <HeadContent />
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        disableTransitionOnChange
        storageKey="vite-ui-theme"
      >
        <Outlet />
        <Toaster richColors />
      </ThemeProvider>
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );

  const key = env.VITE_PUBLIC_POSTHOG_KEY;
  if (key) {
    return (
      <PostHogProvider
        apiKey={key}
        options={{
          api_host: "/ingest",
          ui_host: env.VITE_PUBLIC_POSTHOG_HOST,
          defaults: "2026-01-30",
          capture_exceptions: true,
          debug: import.meta.env.DEV,
        }}
      >
        {content}
      </PostHogProvider>
    );
  }
  return content;
}
