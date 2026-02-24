import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/educator/schedule")({
  component: SchedulePage,
});

function SchedulePage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">My Schedule</h1>
      <div className="rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">Your teaching schedule will appear here.</p>
      </div>
    </div>
  );
}
