import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";

import AdminSidebar from "@/components/admin-sidebar";
import { useCurrentProfile } from "@/hooks/use-current-profile";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminContent() {
  const { isAdmin, isLoading } = useCurrentProfile();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground">You don't have permission to access this area.</p>
        <Link to="/dashboard" className="text-sm underline">
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}

function AdminLayout() {
  return (
    <>
      <Authenticated>
        <AdminContent />
      </Authenticated>
      <Unauthenticated>
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">Please sign in to access this area.</p>
          <Link to="/login" className="text-sm underline">
            Sign In
          </Link>
        </div>
      </Unauthenticated>
      <AuthLoading>
        <div className="flex h-full items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </AuthLoading>
    </>
  );
}
