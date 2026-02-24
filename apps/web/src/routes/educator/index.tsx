import { createFileRoute } from "@tanstack/react-router";
import posthog from "posthog-js";
import { useEffect } from "react";

import UserMenu from "@/components/user-menu";
import { useCurrentProfile } from "@/hooks/use-current-profile";

export const Route = createFileRoute("/educator/")({
  component: EducatorDashboard,
});

function EducatorDashboard() {
  const { profile, isLoading } = useCurrentProfile();

  useEffect(() => {
    posthog.capture("educator_dashboard_viewed");
  }, []);

  if (isLoading) return <div>Loading profile...</div>;
  if (!profile) return <div>No profile found</div>;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Educator Dashboard</h1>
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
