import { Link, useMatchRoute } from "@tanstack/react-router";

const navItems = [
  { to: "/admin", label: "Overview", exact: true },
  { to: "/admin/services", label: "Services" },
  { to: "/admin/team", label: "Team" },
] as const;

export default function AdminSidebar() {
  const matchRoute = useMatchRoute();

  return (
    <aside className="w-56 shrink-0 border-r">
      <div className="px-4 py-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Admin
        </h2>
        <nav className="flex flex-col gap-1">
          {navItems.map(({ to, label, ...rest }) => {
            const isActive = matchRoute({
              to,
              fuzzy: !("exact" in rest && rest.exact),
            });
            return (
              <Link
                key={to}
                to={to}
                className={`rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-accent font-medium text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
