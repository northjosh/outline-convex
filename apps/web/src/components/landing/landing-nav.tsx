import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Cancel01Icon, Menu02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const NAV_LINKS = [
  { href: "#subjects", label: "Subjects" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#educators", label: "Educators" },
  { href: "#pricing", label: "Pricing" },
] as const;

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  }, []);

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-200 ${
        scrolled ? "bg-background/80 border-b border-border backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="font-display text-xl font-bold tracking-tight">
          Syllabi
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <button
              key={href}
              type="button"
              onClick={() => scrollToSection(href)}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-2 md:flex">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link to="/services">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <HugeiconsIcon icon={mobileOpen ? Cancel01Icon : Menu02Icon} size={24} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="bg-background border-t border-border px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-2 pt-2">
            {NAV_LINKS.map(({ href, label }) => (
              <button
                key={href}
                type="button"
                onClick={() => scrollToSection(href)}
                className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg px-3 py-2 text-left text-sm transition-colors"
              >
                {label}
              </button>
            ))}
            <hr className="border-border my-2" />
            <Link to="/login" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                Sign In
              </Button>
            </Link>
            <Link to="/services" onClick={() => setMobileOpen(false)}>
              <Button size="sm" className="w-full">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
