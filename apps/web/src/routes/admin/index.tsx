import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: AdminOverviewPage,
});

function AdminOverviewPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Admin Overview</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Total Services</h3>
          <p className="mt-1 text-2xl font-bold">—</p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Team Members</h3>
          <p className="mt-1 text-2xl font-bold">—</p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Active Learners</h3>
          <p className="mt-1 text-2xl font-bold">—</p>
        </div>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Admin dashboard with live metrics coming soon.
      </p>
    </div>
  );
}
