import { createFileRoute } from "@tanstack/react-router";

import { useCurrentProfile } from "@/hooks/use-current-profile";

export const Route = createFileRoute("/_app/_authed/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { profile, isLoading } = useCurrentProfile();

  if (isLoading) return <div>Loading profile...</div>;
  if (!profile) return <div>No profile found</div>;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Profile</h1>
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
      <p className="mt-4 text-sm text-muted-foreground">Profile editing coming soon.</p>
    </div>
  );
}
