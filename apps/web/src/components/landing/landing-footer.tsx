import { IconInstagram, IconLinkedIn, IconX, illustrationColors as c } from "./illustrations";

const FOOTER_COLUMNS = [
  { title: "Learn", links: ["Subjects", "Educators", "Study Packs", "Pricing"] },
  { title: "Company", links: ["About", "Careers", "Contact", "Blog"] },
  { title: "Support", links: ["Help Center", "Privacy", "Terms", "Refunds"] },
] as const;

export function LandingFooter() {
  return (
    <footer style={{ borderTop: `1px solid ${c.border.default}20` }} className="px-6 py-10">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-start justify-between gap-8">
        {/* Brand */}
        <div className="max-w-[260px]">
          <div className="mb-3 flex items-center gap-2">
            <div
              className="font-display flex h-7 w-7 items-center justify-center rounded-md text-sm font-bold text-white"
              style={{
                background: c.accent.base,
                boxShadow: `0 2px 0 ${c.accent.strong}`,
              }}
            >
              S
            </div>
            <span className="font-display text-[17px] font-bold">Syllabi</span>
          </div>
          <p className="text-muted-foreground text-[13px] leading-relaxed">
            Connecting Ghana's best educators with students who want to win.
          </p>
        </div>

        {/* Link columns */}
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <div
              className="mb-3 text-[11px] font-semibold uppercase tracking-[1px]"
              style={{ color: c.text.subtle }}
            >
              {col.title}
            </div>
            {col.links.map((link) => (
              <div
                key={link}
                className="text-muted-foreground hover:text-foreground mb-2 cursor-pointer text-[13px] transition-colors"
              >
                {link}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        className="mx-auto mt-6 flex max-w-[1100px] flex-wrap items-center justify-between gap-3 pt-5"
        style={{ borderTop: `1px solid ${c.border.default}20` }}
      >
        <span className="text-xs" style={{ color: c.text.faint }}>
          © 2026 Syllabi. Made in Ghana
        </span>
        <div className="flex gap-2">
          {[<IconX key="x" />, <IconInstagram key="ig" />, <IconLinkedIn key="li" />].map(
            (icon) => (
              <div
                key={icon.key}
                className="bg-card flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border"
                style={{
                  borderColor: c.border.default,
                  boxShadow: "0 2px 0 #C4C0B8",
                }}
              >
                {icon}
              </div>
            ),
          )}
        </div>
      </div>
    </footer>
  );
}
