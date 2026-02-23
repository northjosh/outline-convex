import { useEffect, useRef, useState } from "react";

import { IllustCheck, IllustGrad, IllustStar, IllustUsers } from "./illustrations";

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - (1 - progress) ** 3;
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const STATS = [
  {
    value: 2400,
    suffix: "+",
    label: "Students",
    icon: <IllustUsers size={18} color="#D08A18" />,
  },
  {
    value: 35,
    suffix: "",
    label: "Expert educators",
    icon: <IllustGrad size={18} />,
  },
  {
    value: 12000,
    suffix: "+",
    label: "Sessions completed",
    icon: <IllustCheck size={18} color="#D08A18" />,
  },
  {
    value: 4.8,
    suffix: "",
    label: "Average rating",
    icon: <IllustStar size={18} />,
    decimal: true,
  },
] as const;

export function StatsBar() {
  return (
    <section className="mx-auto mb-16 max-w-[1100px] px-6">
      <div className="card-depth bg-card border-border flex flex-wrap justify-center overflow-hidden rounded-xl border">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`border-border flex min-w-[160px] flex-1 flex-col items-center gap-0.5 px-5 py-[22px] text-center${i < 3 ? " border-r" : ""}`}
          >
            <span className="mb-1.5 flex justify-center">{stat.icon}</span>
            <div className="font-display text-[28px] font-bold">
              {"decimal" in stat ? stat.value : <Counter end={stat.value} suffix={stat.suffix} />}
            </div>
            <div className="text-muted-foreground mt-0.5 text-xs">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
