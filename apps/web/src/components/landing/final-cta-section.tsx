import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { IllustArrowRight, IllustCTA, illustrationColors as c } from "./illustrations";

export function FinalCtaSection() {
  return (
    <section className="mx-auto max-w-[1100px] px-6 pb-20">
      <div
        className="relative overflow-hidden rounded-xl px-8 py-14 text-center"
        style={{
          background: c.text.primary,
          boxShadow: "0 6px 0 #0D0B08",
        }}
      >
        {/* Gradient top bar */}
        <div
          className="absolute top-0 right-0 left-0 h-1"
          style={{
            background: `linear-gradient(90deg, ${c.accent.base}, ${c.info.base}, ${c.purple.base}, ${c.success.base})`,
          }}
        />

        <div className="mb-5 flex justify-center">
          <IllustCTA size={240} />
        </div>

        <h2
          className="font-display mb-3 font-extrabold tracking-tight text-white"
          style={{ fontSize: "clamp(24px, 4vw, 36px)", lineHeight: 1.15 }}
        >
          Your future self will thank you.
        </h2>

        <p
          className="mx-auto mb-7 max-w-[440px] text-[15px] leading-relaxed"
          style={{ color: "#ffffff90" }}
        >
          Join thousands of students across Ghana already crushing their WASSCE and Cambridge exams.
        </p>

        <Link to="/services">
          <Button size="lg" className="gap-2 px-8 text-base">
            Get started — it's free
            <IllustArrowRight size={16} color="#fff" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
