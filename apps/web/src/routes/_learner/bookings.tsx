import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_learner/bookings")({
  component: BookingsPage,
});

function BookingsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">My Bookings</h1>
      <div className="rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">Your booked sessions will appear here.</p>
      </div>
    </div>
  );
}
