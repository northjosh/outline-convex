import { createFileRoute } from "@tanstack/react-router";

import { EducatorsSection } from "@/components/landing/educators-section";
import { FinalCtaSection } from "@/components/landing/final-cta-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { PricingTeaserSection } from "@/components/landing/pricing-teaser-section";
import { ReviewsSection } from "@/components/landing/reviews-section";
import { ServiceTypesSection } from "@/components/landing/service-types-section";
import { StatsBar } from "@/components/landing/stats-bar";
import { SubjectsSection } from "@/components/landing/subjects-section";

export const Route = createFileRoute("/_marketing/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <SubjectsSection />
      <HowItWorksSection />
      <ServiceTypesSection />
      <EducatorsSection />
      <ReviewsSection />
      <PricingTeaserSection />
      <FinalCtaSection />
    </>
  );
}
