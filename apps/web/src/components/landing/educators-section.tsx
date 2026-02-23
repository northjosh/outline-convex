import { useState } from "react";

import { Link } from "@tanstack/react-router";

import { buttonVariants } from "@/components/ui/button";
import { IllustArrowRight, IllustStar, illustrationColors as c } from "./illustrations";

function EducatorCard({
  name,
  headline,
  subjects,
  rating,
  sessions,
  avatar,
  color,
}: {
  name: string;
  headline: string;
  subjects: readonly string[];
  rating: number;
  sessions: number;
  avatar: string;
  color: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-card flex-[0_0_auto] rounded-xl p-6 transition-all duration-150"
      style={{
        minWidth: 240,
        border: `1px solid ${hovered ? `${c.accent.base}40` : "#E8E4E0"}`,
        boxShadow: hovered ? `0 6px 0 ${c.accent.base}20` : "0 4px 0 #E0DCD6",
      }}
    >
      {/* Avatar + name */}
      <div className="mb-3.5 flex items-center gap-3">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white"
          style={{
            background: `linear-gradient(135deg, ${color}, ${color}CC)`,
            boxShadow: `0 3px 0 ${color}80`,
            border: "2px solid #FEFDFB",
          }}
        >
          {avatar}
        </div>
        <div>
          <div className="text-[15px] font-semibold">{name}</div>
          <div className="text-muted-foreground text-xs">{headline}</div>
        </div>
      </div>

      {/* Subject tags */}
      <div className="mb-3.5 flex flex-wrap gap-1">
        {subjects.map((s) => (
          <span
            key={s}
            className="text-muted-foreground rounded-sm px-2 py-0.5 text-[11px] font-medium"
            style={{ background: c.surface.active }}
          >
            {s}
          </span>
        ))}
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2.5">
        <span
          className="flex items-center gap-1 text-[13px] font-semibold"
          style={{ color: c.accent.emphasis }}
        >
          <IllustStar size={14} /> {rating}
        </span>
        <span className="text-xs" style={{ color: c.text.faint }}>
          ·
        </span>
        <span className="text-xs" style={{ color: c.text.subtle }}>
          {sessions} sessions
        </span>
      </div>
    </div>
  );
}

const EDUCATORS = [
  {
    name: "Efua Owusu",
    headline: "English & Literature · WASSCE",
    subjects: ["English", "Literature"],
    rating: 4.7,
    sessions: 342,
    avatar: "E",
    color: c.info.base,
  },
  {
    name: "Ama Darko",
    headline: "Chemistry · Cambridge A-Level",
    subjects: ["Chemistry", "Biology"],
    rating: 4.9,
    sessions: 218,
    avatar: "A",
    color: c.purple.base,
  },
  {
    name: "Kwame Mensah",
    headline: "Mathematics · WASSCE & Cambridge",
    subjects: ["Maths", "Add Maths", "Physics"],
    rating: 4.8,
    sessions: 567,
    avatar: "K",
    color: c.accent.base,
  },
  {
    name: "Nana Adjei",
    headline: "ICT & Business · WASSCE",
    subjects: ["ICT", "Business"],
    rating: 4.6,
    sessions: 189,
    avatar: "N",
    color: c.success.base,
  },
] as const;

export function EducatorsSection() {
  return (
    <section id="educators" className="mx-auto max-w-[1100px] px-6 pb-[72px]">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="mb-2 text-[11px] font-semibold tracking-[1.2px] text-amber-700 uppercase">
            Educators
          </div>
          <h2 className="font-display text-[28px] font-bold tracking-tight">Meet the team</h2>
        </div>
        <Link
          to="/services"
          className={buttonVariants({ variant: "outline", size: "sm", className: "gap-1.5" })}
        >
          View all educators
          <IllustArrowRight size={14} color={c.text.default} />
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {EDUCATORS.map((edu) => (
          <EducatorCard key={edu.name} {...edu} />
        ))}
      </div>
    </section>
  );
}
