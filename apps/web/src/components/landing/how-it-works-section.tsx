import type { ReactNode } from "react";

import { IllustCalendar, IllustRocket, IllustSearch } from "./illustrations";

function StepCard({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="card-depth bg-card border-border flex min-w-[200px] flex-1 flex-col rounded-xl border px-[22px] py-6">
      <div className="mb-3.5 flex items-center gap-2.5">
        <div className="flex items-center justify-center">{icon}</div>
        <span className="text-muted-foreground/60 text-[11px] font-bold tracking-[1.5px] uppercase">
          Step {number}
        </span>
      </div>
      <h3 className="mb-1.5 text-base font-semibold">{title}</h3>
      <p className="text-muted-foreground text-[13px] leading-[1.55]">{description}</p>
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section className="mx-auto max-w-[1100px] px-6 pb-[72px]">
      <div className="mb-8 text-center">
        <div className="text-[11px] font-semibold tracking-[1.2px] text-amber-700 uppercase mb-2">
          How it works
        </div>
        <h2 className="font-display text-[28px] font-bold tracking-tight">
          Three taps to your next A
        </h2>
      </div>

      <div className="flex flex-wrap gap-4">
        <StepCard
          number="1"
          icon={<IllustSearch size={40} />}
          title="Find your match"
          description="Browse educators by subject and level. See their ratings, experience, and availability in real time."
        />
        <StepCard
          number="2"
          icon={<IllustCalendar size={40} />}
          title="Book & pay instantly"
          description="Pick a time that works, pay with MoMo or card. Confirmation hits your phone in seconds."
        />
        <StepCard
          number="3"
          icon={<IllustRocket size={40} />}
          title="Level up"
          description="Join your session on Zoom or meet in person. Rate your educator after — help the community."
        />
      </div>
    </section>
  );
}
