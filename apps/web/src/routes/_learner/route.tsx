import Header from "@/components/header";
import { useCurrentProfile } from "@/hooks/use-current-profile";
import { Link, Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { useEffect } from "react";

export const Route = createFileRoute("/_learner")({
  component: LearnerLayout,
});

function RedirectToLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/login" });
  }, [navigate]);

  return null;
}

function LearnerContent() {
  const { isLearner, isTeamMember, isAdmin, isLoading } = useCurrentProfile();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (isTeamMember) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Wrong portal</h1>
        <p className="text-muted-foreground">
          You're an educator — head to your teaching dashboard.
        </p>
        <Link to="/educator" className="text-sm underline">
          Go to Educator Dashboard
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

function LearnerLayout() {
  return (
    <div className="grid h-svh grid-rows-[auto_1fr]">
      <Header />
      <Authenticated>
        <LearnerContent />
      </Authenticated>
      <Unauthenticated>
        <RedirectToLogin />
      </Unauthenticated>
      <AuthLoading>
        <div className="flex h-full items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </AuthLoading>
    </div>
  );
}
