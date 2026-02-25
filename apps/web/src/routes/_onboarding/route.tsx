import { Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { useEffect } from "react";

export const Route = createFileRoute("/_onboarding")({
  component: OnboardingLayout,
});

function RedirectToLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/login" });
  }, [navigate]);

  return null;
}

function OnboardingLayout() {
  return (
    <>
      <Authenticated>
        <Outlet />
      </Authenticated>
      <Unauthenticated>
        <RedirectToLogin />
      </Unauthenticated>
      <AuthLoading>
        <div className="flex min-h-svh items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </AuthLoading>
    </>
  );
}
