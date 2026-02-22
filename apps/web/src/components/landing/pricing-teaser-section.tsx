import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export function PricingTeaserSection() {
  return (
    <section id="pricing" className="border-y border-border bg-muted/30 py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="font-display text-3xl font-bold md:text-4xl">Affordable Learning</h2>
        <p className="text-muted-foreground mt-3">Quality education that fits your budget</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
          <div className="card-depth rounded-xl border border-border bg-card p-6">
            <p className="text-muted-foreground text-sm">Live Sessions from</p>
            <p className="font-display mt-1 text-3xl font-bold">GH₵ 20</p>
            <p className="text-muted-foreground mt-1 text-xs">per session</p>
          </div>
          <div className="card-depth rounded-xl border border-border bg-card p-6">
            <p className="text-muted-foreground text-sm">Study Materials from</p>
            <p className="font-display mt-1 text-3xl font-bold">GH₵ 5</p>
            <p className="text-muted-foreground mt-1 text-xs">per download</p>
          </div>
        </div>

        <p className="text-muted-foreground mt-6 text-sm">
          Pay securely with MTN MoMo, Vodafone Cash, or card
        </p>
        <Link to="/services" className="mt-4 inline-block">
          <Button size="lg">Browse Services</Button>
        </Link>
      </div>
    </section>
  );
}
