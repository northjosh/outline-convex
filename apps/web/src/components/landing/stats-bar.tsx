import { useEffect, useRef, useState } from "react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const STATS: StatItem[] = [
  { value: 5000, suffix: "+", label: "Students Learning" },
  { value: 200, suffix: "+", label: "Expert Educators" },
  { value: 15, suffix: "+", label: "Subjects Covered" },
  { value: 4.8, suffix: "★", label: "Average Rating" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
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
          const isFloat = value % 1 !== 0;

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - (1 - progress) ** 3;
            const current = eased * value;
            setCount(isFloat ? Math.round(current * 10) / 10 : Math.floor(current));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  const display = value % 1 !== 0 ? count.toFixed(1) : count.toLocaleString();

  return (
    <span ref={ref} className="font-display text-3xl font-bold md:text-4xl">
      {display}
      {suffix}
    </span>
  );
}

export function StatsBar() {
  return (
    <section className="border-y border-border bg-muted/30 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
              <Counter value={stat.value} suffix={stat.suffix} />
              <span className="text-muted-foreground text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
