import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Cancel01Icon, Menu02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { IllustArrowRight, illustrationColors as c } from "./illustrations";

const NAV_LINKS = ["Subjects", "Educators", "Pricing"] as const;

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  }, []);

  return (
    <nav
      className="fixed top-0 right-0 left-0 z-50 transition-all duration-200"
      style={{
        background: scrolled ? "#FAF8F5E8" : "#FAF8F5",
        backdropFilter: scrolled ? "blur(12px)" : undefined,
        borderBottom: `1px solid ${c.border.default}20`,
      }}
    >
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div
            className="font-display flex h-[34px] w-[34px] items-center justify-center rounded-md text-lg font-bold text-white"
            style={{
              background: c.accent.base,
              boxShadow: `0 2px 0 ${c.accent.strong}`,
            }}
          >
            S
          </div>
          <span
            className="font-display text-xl font-bold tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Syllabi
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1.5 md:flex">
          {NAV_LINKS.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => scrollToSection(label)}
              className="text-muted-foreground hover:text-foreground rounded-md px-3 py-1.5 text-sm transition-colors"
            >
              {label}
            </button>
          ))}
          <div className="mx-1.5 h-5 w-px" style={{ background: c.border.default }} />
          <Link to="/login">
            <Button variant="outline" size="sm">
              Log in
            </Button>
          </Link>
          <Link to="/services">
            <Button size="sm" className="gap-1.5">
              Start learning
              <IllustArrowRight size={14} color="#fff" />
            </Button>
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
        <div
          className="bg-background border-t px-6 pb-4 md:hidden"
          style={{ borderColor: "#E8E4E0" }}
        >
          <div className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => scrollToSection(label)}
                className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg px-3 py-2 text-left text-sm transition-colors"
              >
                {label}
              </button>
            ))}
            <hr className="my-2" style={{ borderColor: "#E8E4E0" }} />
            <Link to="/login" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">
                Log in
              </Button>
            </Link>
            <Link to="/services" onClick={() => setMobileOpen(false)}>
              <Button size="sm" className="w-full gap-1.5">
                Start learning
                <IllustArrowRight size={14} color="#fff" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
