import { Link } from "@tanstack/react-router";

const FOOTER_LINKS = {
  Platform: [
    { label: "Browse Services", to: "/services" },
    { label: "For Educators", href: "#educators" },
    { label: "Pricing", href: "#pricing" },
  ],
  Resources: [
    { label: "WASSCE Prep", href: "#" },
    { label: "Cambridge Guide", href: "#" },
    { label: "Study Tips", href: "#" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "FAQ", href: "#" },
  ],
  Legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
} as const;

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <span className="font-display text-lg font-bold">Syllabi</span>
            <p className="text-muted-foreground mt-2 text-sm">
              Connecting Ghanaian students with expert educators for WASSCE & Cambridge success.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold">{category}</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    {"to" in link ? (
                      <Link
                        to={link.to}
                        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="border-border my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-muted-foreground text-xs">
            &copy; {new Date().getFullYear()} Syllabi. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs">Made with ❤️ in Ghana 🇬🇭</p>
        </div>
      </div>
    </footer>
  );
}
