import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/team")({
  component: AdminTeamPage,
});

function AdminTeamPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Team Management</h1>
      <div className="rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">Team member and invite management coming soon.</p>
      </div>
    </div>
  );
}
