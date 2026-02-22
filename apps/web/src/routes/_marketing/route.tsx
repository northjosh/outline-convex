import { Outlet, createFileRoute } from "@tanstack/react-router";

import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingNav } from "@/components/landing/landing-nav";

export const Route = createFileRoute("/_marketing")({
  component: MarketingLayout,
});

function MarketingLayout() {
  return (
    <div className="min-h-svh">
      <LandingNav />
      <main>
        <Outlet />
      </main>
      <LandingFooter />
    </div>
  );
}
