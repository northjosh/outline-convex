import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { IllustHero } from "./illustrations";

export function HeroSection() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text content */}
          <div className="flex flex-col gap-6">
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Your Path to <span className="text-primary">Academic Excellence</span> in Ghana
            </h1>
            <p className="text-muted-foreground max-w-lg text-lg leading-relaxed">
              Connect with expert educators for personalized WASSCE and Cambridge exam preparation.
              Live tutoring, study materials, and more.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/services">
                <Button size="lg" className="px-6 text-base">
                  Browse Services
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" size="lg" className="px-6 text-base">
                  I'm an Educator
                </Button>
              </Link>
            </div>
          </div>

          {/* Illustration */}
          <div className="flex justify-center lg:justify-end">
            <IllustHero className="w-full max-w-md dark:opacity-90" />
          </div>
        </div>
      </div>
    </section>
  );
}
