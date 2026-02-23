import { Link } from "@tanstack/react-router";

import { buttonVariants } from "@/components/ui/button";
import {
  IllustArrowRight,
  IllustGrad,
  IllustHero,
  IllustPhone,
  IllustSearch,
  IllustWallet,
} from "./illustrations";

export function HeroSection() {
  return (
    <section className="pt-16 pb-10 md:pt-20 md:pb-16">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="flex flex-wrap items-center gap-10">
          {/* Text content */}
          <div className="min-w-[300px] flex-1">
            {/* Overline badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200/40 bg-amber-50 py-1.5 pr-4 pl-2.5">
              <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white">
                NEW
              </span>
              <span className="text-[13px] font-medium text-amber-700">
                WASSCE & Cambridge prep, reimagined
              </span>
            </div>

            <h1 className="font-display mb-4 text-[clamp(34px,5vw,52px)] leading-[1.1] font-extrabold tracking-tight">
              Your exams called.{" "}
              <span className="text-primary underline decoration-amber-400/40 decoration-[3px] underline-offset-[6px]">
                They're scared.
              </span>
            </h1>

            <p className="text-muted-foreground mb-7 max-w-[480px] text-[17px] leading-relaxed">
              Ghana's top WASSCE and Cambridge educators, one tap away. Book sessions, grab study
              packs, and crush your results.
            </p>

            <div className="mb-8 flex flex-wrap gap-3">
              <Link
                to="/services"
                className={buttonVariants({
                  size: "lg",
                  className: "gap-2 px-6 text-[15px]",
                })}
              >
                Start learning
                <IllustArrowRight size={16} color="#fff" />
              </Link>
              <Link
                to="/services"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "gap-2 px-6 text-[15px]",
                })}
              >
                <IllustSearch size={18} />
                Browse educators
              </Link>
            </div>

            {/* Trust bar */}
            <div className="flex flex-wrap gap-6">
              {[
                { icon: <IllustGrad size={22} />, label: "WASSCE & Cambridge" },
                { icon: <IllustWallet size={22} />, label: "Pay with MoMo" },
                { icon: <IllustPhone size={22} />, label: "Works on any phone" },
              ].map((item) => (
                <span
                  key={item.label}
                  className="text-muted-foreground flex items-center gap-2 text-[13px]"
                >
                  {item.icon}
                  {item.label}
                </span>
              ))}
            </div>
          </div>

          {/* Hero illustration */}
          <div className="flex flex-[0_1_340px] justify-center">
            <IllustHero size={320} />
          </div>
        </div>
      </div>
    </section>
  );
}
