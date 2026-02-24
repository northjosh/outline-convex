import { Link } from "@tanstack/react-router";

import { useCurrentProfile } from "@/hooks/use-current-profile";

import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";

export default function Header() {
  const { isAuthenticated, isAdmin, isTeamMember, isLearner } = useCurrentProfile();

  const links = [
    { to: "/", label: "Home", show: true },
    { to: "/services", label: "Services", show: true },
    { to: "/dashboard", label: "Dashboard", show: isLearner },
    { to: "/educator", label: "Dashboard", show: isTeamMember },
    { to: "/admin", label: "Admin", show: isAdmin },
  ] as const;

  return (
    <div>
      <div className="flex flex-row items-center justify-between px-2 py-1">
        <nav className="flex gap-4 text-lg">
          {links
            .filter((l) => l.show)
            .map(({ to, label }) => {
              return (
                <Link key={to} to={to}>
                  {label}
                </Link>
              );
            })}
        </nav>
        <div className="flex items-center gap-2">
          {/* <ModeToggle /> */}
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">
              Sign In
            </Link>
          )}
        </div>
      </div>
      <hr />
    </div>
  );
}
