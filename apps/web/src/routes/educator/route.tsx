import Header from "@/components/header";
import { useCurrentProfile } from "@/hooks/use-current-profile";
import { Link, Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { useEffect } from "react";

export const Route = createFileRoute("/educator")({
  component: EducatorLayout,
});

function RedirectToEducatorLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/educator/login" });
  }, [navigate]);

  return null;
}

function EducatorContent() {
  const { isTeamMember, isLearner, isAdmin, isLoading } = useCurrentProfile();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (isLearner) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Wrong portal</h1>
        <p className="text-muted-foreground">You're a learner — head to your dashboard.</p>
        <Link to="/dashboard" className="text-sm underline">
          Go to Dashboard
        </Link>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Wrong portal</h1>
        <p className="text-muted-foreground">You're an admin — head to the admin dashboard.</p>
        <Link to="/admin" className="text-sm underline">
          Go to Admin Dashboard
        </Link>
      </div>
    );
  }

  return <Outlet />;
}

function EducatorLayout() {
  return (
    <div className="grid h-svh grid-rows-[auto_1fr]">
      <Header />
      <Authenticated>
        <EducatorContent />
      </Authenticated>
      <Unauthenticated>
        <RedirectToEducatorLogin />
      </Unauthenticated>
      <AuthLoading>
        <div className="flex h-full items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </AuthLoading>
    </div>
  );
}
