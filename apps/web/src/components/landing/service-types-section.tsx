import { type ReactNode, useState } from "react";

import {
  IllustCheck,
  IllustPackage,
  IllustPencil,
  IllustVideo,
  illustrationColors as c,
} from "./illustrations";

function Badge({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span
      className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
      style={{ background: `${color}14`, color }}
    >
      {children}
    </span>
  );
}

function ServiceTypeCard({
  icon,
  title,
  description,
  tag,
  color,
  features,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  tag: string;
  color: string;
  features: string[];
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-card flex-1 overflow-hidden rounded-xl transition-all duration-150"
      style={{
        minWidth: 230,
        border: `1px solid ${hovered ? `${color}40` : "#E8E4E0"}`,
        boxShadow: hovered ? `0 6px 0 ${color}20` : "0 4px 0 #E0DCD6",
      }}
    >
      <div
        className="h-1 transition-opacity duration-150"
        style={{ background: color, opacity: hovered ? 1 : 0.5 }}
      />
      <div className="p-[22px] pb-6">
        <div className="mb-3.5 flex items-start justify-between">
          {icon}
          <Badge color={color}>{tag}</Badge>
        </div>
        <h3 className="mb-1.5 text-[17px] font-semibold">{title}</h3>
        <p className="text-muted-foreground mb-4 text-[13px] leading-[1.55]">{description}</p>
        <div className="flex flex-col gap-1.5">
          {features.map((f) => (
            <div key={f} className="text-muted-foreground flex items-center gap-2 text-xs">
              <IllustCheck size={14} color={c.success.base} />
              {f}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ServiceTypesSection() {
  return (
    <section className="mx-auto max-w-[1100px] px-6 pb-[72px]">
      <div className="mb-8 text-center">
        <div className="mb-2 text-[11px] font-semibold tracking-[1.2px] text-amber-700 uppercase">
          Services
        </div>
        <h2 className="font-display text-[28px] font-bold tracking-tight">
          More than just tutoring
        </h2>
      </div>

      <div className="flex flex-wrap gap-4">
        <ServiceTypeCard
          icon={<IllustVideo size={44} />}
          title="Live Sessions"
          tag="Book now"
          color={c.info.base}
          description="One-on-one or group sessions with expert educators. Online via Zoom or meet in-person."
          features={[
            "Flexible scheduling",
            "Online & in-person",
            "MTN MoMo & card payments",
            "Instant confirmation",
          ]}
        />
        <ServiceTypeCard
          icon={<IllustPackage size={44} />}
          title="Study Packs"
          tag="Coming soon"
          color={c.success.base}
          description="Past questions, marking schemes, study guides, and revision notes — download and own forever."
          features={[
            "WASSCE past questions",
            "Cambridge resources",
            "Detailed solutions",
            "Instant download",
          ]}
        />
        <ServiceTypeCard
          icon={<IllustPencil size={44} />}
          title="Custom Requests"
          tag="Coming soon"
          color={c.accent.base}
          description="Need a personalized study plan or course outline? Request custom content from our educators."
          features={[
            "Tailored to your syllabus",
            "Personal study plans",
            "Exam strategy guides",
            "Direct from educators",
          ]}
        />
      </div>
    </section>
  );
}
