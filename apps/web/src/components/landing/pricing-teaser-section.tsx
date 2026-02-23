import { Link } from "@tanstack/react-router";

import { buttonVariants } from "@/components/ui/button";
import { IllustArrowRight, IllustWallet } from "./illustrations";

export function PricingTeaserSection() {
  return (
    <section id="pricing" className="mx-auto max-w-[1100px] px-6 pb-[72px]">
      <div
        className="bg-card rounded-xl border p-10 text-center"
        style={{
          borderColor: "#E8E4E0",
          boxShadow: "0 4px 0 #E0DCD6",
        }}
      >
        <div className="mb-4 flex justify-center">
          <IllustWallet size={56} />
        </div>

        <h2 className="font-display mb-2 text-2xl font-bold tracking-tight">
          Transparent pricing. No surprises.
        </h2>

        <p className="text-muted-foreground mx-auto mb-2 max-w-[480px] text-sm leading-relaxed">
          Sessions start from <strong className="text-foreground">GH₵ 50/hr</strong>. Pay per
          session — no subscriptions, no commitments. Just results.
        </p>

        <p className="text-muted-foreground mb-6 text-[13px]" style={{ color: "#9A9590" }}>
          MTN MoMo · Vodafone Cash · Visa · Mastercard
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/services"
            className={buttonVariants({
              size: "lg",
              className: "gap-2",
            })}
          >
            Find an educator
            <IllustArrowRight size={15} color="#fff" />
          </Link>
          <Link
            to="/services"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
            })}
          >
            See all services
          </Link>
        </div>
      </div>
    </section>
  );
}
