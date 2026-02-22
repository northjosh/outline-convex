import { IllustCalendar, IllustLearn, IllustSearch } from "./illustrations";

const STEPS = [
  {
    number: 1,
    title: "Search & Discover",
    description:
      "Browse our curated catalog of educators and services. Filter by subject, level, and type to find exactly what you need.",
    Illustration: IllustSearch,
  },
  {
    number: 2,
    title: "Book & Schedule",
    description:
      "Choose your preferred time slot and pay securely via MTN MoMo or card. Instant confirmation, no hassle.",
    Illustration: IllustCalendar,
  },
  {
    number: 3,
    title: "Learn & Excel",
    description:
      "Join live sessions, access digital materials, or get personalized help. Track your progress and ace your exams.",
    Illustration: IllustLearn,
  },
] as const;

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-y border-border bg-muted/30 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">How It Works</h2>
          <p className="mt-3 text-muted-foreground">Get started in three simple steps</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {STEPS.map(({ number, title, description, Illustration }) => (
            <div
              key={number}
              className="card-depth flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center"
            >
              <div className="bg-primary text-primary-foreground font-display mb-4 flex size-10 items-center justify-center rounded-full text-lg font-bold">
                {number}
              </div>
              <Illustration className="mb-4 h-32 w-full dark:opacity-90" />
              <h3 className="text-base font-semibold">{title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
