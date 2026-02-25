import SignUpForm from "@/components/sign-up-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/signup")({
  component: RouteComponent,
});

/**
 * Decorative illustration: open book with floating knowledge particles.
 * Uses currentColor so it inherits the theme's muted-foreground.
 */
function BookIllustration() {
  return (
    <svg
      viewBox="0 0 280 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary/20 mx-auto w-full max-w-[260px]"
      aria-hidden="true"
    >
      {/* Open book */}
      <path
        d="M140 170 C140 170 80 165 40 145 L40 55 C80 75 140 80 140 80 C140 80 200 75 240 55 L240 145 C200 165 140 170 140 170Z"
        fill="currentColor"
        opacity="0.5"
      />
      <path
        d="M140 170 C140 170 80 165 40 145 L40 55 C80 75 140 80 140 80Z"
        fill="currentColor"
        opacity="0.7"
      />
      <path d="M140 80V170" stroke="currentColor" strokeWidth="1" opacity="0.8" />

      {/* Page lines */}
      <path d="M65 95 L125 100" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path d="M70 110 L120 113" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <path d="M75 125 L118 127" stroke="currentColor" strokeWidth="1" opacity="0.25" />
      <path d="M155 100 L215 95" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path d="M160 113 L210 110" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <path d="M162 127 L205 125" stroke="currentColor" strokeWidth="1" opacity="0.25" />

      {/* Floating particles — knowledge rising from the book */}
      <circle cx="100" cy="45" r="4" fill="currentColor" opacity="0.6" />
      <circle cx="170" cy="35" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="130" cy="25" r="2.5" fill="currentColor" opacity="0.4" />
      <circle cx="155" cy="50" r="3.5" fill="currentColor" opacity="0.5" />
      <circle cx="115" cy="60" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="185" cy="55" r="2" fill="currentColor" opacity="0.35" />
      <circle cx="80" cy="30" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="200" cy="40" r="2.5" fill="currentColor" opacity="0.25" />

      {/* Graduation cap */}
      <path d="M140 10 L110 25 L140 40 L170 25 Z" fill="currentColor" opacity="0.7" />
      <path
        d="M125 30 L125 48 C125 48 140 55 155 48 L155 30"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      <line
        x1="170"
        y1="25"
        x2="170"
        y2="50"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <circle cx="170" cy="52" r="2" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      {/* Left panel — illustration & copy (hidden on mobile) */}
      <div className="bg-muted/30 hidden flex-1 flex-col items-center justify-center gap-8 p-12 lg:flex">
        <div className="max-w-sm space-y-6 text-center">
          <BookIllustration />

          <div className="space-y-3">
            <h1 className="text-foreground text-2xl font-bold tracking-tight">
              Your academic future starts here
            </h1>
            <p className="text-muted-foreground text-balance leading-relaxed">
              Connect with Ghana&apos;s top educators for WASSCE, Cambridge &amp; GES exam prep.
              Live tutoring, curated study materials, and expert guidance — all in one place.
            </p>
          </div>

          <div className="text-muted-foreground/60 flex items-center justify-center gap-6 pt-4 text-sm">
            <div className="flex items-center gap-1.5">
              <span className="bg-chart-4 inline-block h-1.5 w-1.5 rounded-full" />
              Verified educators
            </div>
            <div className="flex items-center gap-1.5">
              <span className="bg-chart-4 inline-block h-1.5 w-1.5 rounded-full" />
              Live sessions
            </div>
            <div className="flex items-center gap-1.5">
              <span className="bg-chart-4 inline-block h-1.5 w-1.5 rounded-full" />
              Study materials
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile-only header */}
          <div className="space-y-1 lg:hidden">
            <h1 className="text-foreground text-xl font-bold tracking-tight">
              Create your account
            </h1>
            <p className="text-muted-foreground text-sm">
              Join thousands of students preparing for WASSCE &amp; Cambridge exams.
            </p>
          </div>

          {/* Desktop header */}
          <div className="hidden space-y-1 lg:block">
            <h1 className="text-foreground text-xl font-bold tracking-tight">Get started</h1>
            <p className="text-muted-foreground text-sm">
              Create your free account to get started.
            </p>
          </div>

          <SignUpForm
            onSwitchToSignIn={() => navigate({ to: "/login" })}
            onSuccess={() => navigate({ to: "/onboarding" })}
          />
        </div>
      </div>
    </div>
  );
}
