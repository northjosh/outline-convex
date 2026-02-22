import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export function FinalCtaSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4">
        <div className="bg-primary text-primary-foreground rounded-2xl px-6 py-12 text-center md:px-12 md:py-16">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Start Learning Today</h2>
          <p className="mx-auto mt-3 max-w-lg opacity-90">
            Join thousands of Ghanaian students already achieving their academic goals with Syllabi.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/services">
              <Button size="lg" variant="secondary" className="px-6 text-base">
                Browse Services
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                size="lg"
                variant="outline"
                className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 px-6 text-base"
              >
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
