import { createFileRoute } from "@tanstack/react-router";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import posthog from "posthog-js";
import { useState } from "react";

import SignInForm from "@/components/sign-in-form";
import SignUpForm from "@/components/sign-up-form";
import UserMenu from "@/components/user-menu";
import { useCurrentProfile } from "@/hooks/use-current-profile";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  onEnter: () => {
    posthog.capture("dashboard_viewed");
  },
});

function DashboardContent() {
  const { profile, isLoading } = useCurrentProfile();

  if (isLoading) return <div>Loading profile...</div>;
  if (!profile) return <div>No profile found</div>;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <UserMenu />
      </div>
      <div className="space-y-2 rounded-lg border p-4">
        <p>
          <strong>Name:</strong> {profile.fullName}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Role:</strong> {profile.role}
        </p>
      </div>
    </div>
  );
}

function RouteComponent() {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <>
      <Authenticated>
        <DashboardContent />
      </Authenticated>
      <Unauthenticated>
        {showSignIn ? (
          <SignInForm onSwitchToSignUp={() => setShowSignIn(false)} />
        ) : (
          <SignUpForm onSwitchToSignIn={() => setShowSignIn(true)} />
        )}
      </Unauthenticated>
      <AuthLoading>
        <div>Loading...</div>
      </AuthLoading>
    </>
  );
}
