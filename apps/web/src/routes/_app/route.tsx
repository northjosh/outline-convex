import { Outlet, createFileRoute } from "@tanstack/react-router";

import Header from "@/components/header";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="grid grid-rows-[auto_1fr] h-svh">
      <Header />
      <Outlet />
    </div>
  );
}
