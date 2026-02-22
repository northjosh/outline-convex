import { createFileRoute } from "@tanstack/react-router";

import { useCurrentProfile } from "@/hooks/use-current-profile";

export const Route = createFileRoute("/_authed/bookings")({
  component: BookingsPage,
});

function BookingsPage() {
  const { isTeamMember, isLoading } = useCurrentProfile();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">{isTeamMember ? "My Schedule" : "My Bookings"}</h1>
      <div className="rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">
          {isTeamMember
            ? "Your teaching schedule will appear here."
            : "Your booked sessions will appear here."}
        </p>
      </div>
    </div>
  );
}
