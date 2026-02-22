import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/services")({
  component: AdminServicesPage,
});

function AdminServicesPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Manage Services</h1>
      <div className="rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">Service management interface coming soon.</p>
      </div>
    </div>
  );
}
