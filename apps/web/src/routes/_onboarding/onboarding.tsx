import OnboardingWizard from "@/components/learner-onboarding/wizard";
import { api } from "@outline-convex/backend/convex/_generated/api";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { useEffect } from "react";

export const Route = createFileRoute("/_onboarding/onboarding")({
  component: OnboardingPage,
});

function OnboardingPage() {
  const navigate = useNavigate();
  const learnerProfile = useQuery(api.learnerProfiles.getLearnerProfile);

  useEffect(() => {
    if (learnerProfile !== undefined && learnerProfile !== null) {
      navigate({ to: "/dashboard" });
    }
  }, [learnerProfile, navigate]);

  // Still loading or redirecting
  if (learnerProfile === undefined || learnerProfile !== null) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return <OnboardingWizard />;
}
