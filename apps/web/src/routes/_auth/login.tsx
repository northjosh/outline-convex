import SignInForm from "@/components/sign-in-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
});

/**
 * Decorative illustration: compass with radiating paths — represents
 * guidance and finding your way back.
 */
function CompassIllustration() {
  return (
    <svg
      viewBox="0 0 280 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary/20 mx-auto w-full max-w-[260px]"
      aria-hidden="true"
    >
      {/* Outer compass ring */}
      <circle cx="140" cy="110" r="70" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <circle cx="140" cy="110" r="55" stroke="currentColor" strokeWidth="1" opacity="0.25" />

      {/* Cardinal tick marks */}
      <line x1="140" y1="40" x2="140" y2="50" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      <line
        x1="140"
        y1="170"
        x2="140"
        y2="180"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.6"
      />
      <line x1="70" y1="110" x2="80" y2="110" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      <line
        x1="200"
        y1="110"
        x2="210"
        y2="110"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.6"
      />

      {/* Compass needle — north (filled) */}
      <polygon points="140,55 133,110 147,110" fill="currentColor" opacity="0.7" />
      {/* Compass needle — south (outline) */}
      <polygon
        points="140,165 133,110 147,110"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />

      {/* Center dot */}
      <circle cx="140" cy="110" r="4" fill="currentColor" opacity="0.6" />

      {/* Radiating paths — knowledge directions */}
      <line x1="90" y1="60" x2="60" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <line x1="190" y1="60" x2="220" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <line x1="90" y1="160" x2="60" y2="190" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <line
        x1="190"
        y1="160"
        x2="220"
        y2="190"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.2"
      />

      {/* Stars at path endpoints */}
      <circle cx="55" cy="25" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="225" cy="25" r="2.5" fill="currentColor" opacity="0.4" />
      <circle cx="55" cy="195" r="2" fill="currentColor" opacity="0.35" />
      <circle cx="225" cy="195" r="2.5" fill="currentColor" opacity="0.3" />

      {/* Extra floating dots */}
      <circle cx="40" cy="100" r="2" fill="currentColor" opacity="0.2" />
      <circle cx="240" cy="120" r="2" fill="currentColor" opacity="0.2" />
      <circle cx="120" cy="20" r="1.5" fill="currentColor" opacity="0.25" />
      <circle cx="160" cy="200" r="1.5" fill="currentColor" opacity="0.25" />
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
          <CompassIllustration />

          <div className="space-y-3">
            <h1 className="text-foreground text-2xl font-bold tracking-tight">
              Welcome back, scholar
            </h1>
            <p className="text-muted-foreground text-balance leading-relaxed">
              Your learning journey continues. Pick up where you left off with your tutors, study
              materials, and upcoming sessions.
            </p>
          </div>

          <div className="text-muted-foreground/60 flex items-center justify-center gap-6 pt-4 text-sm">
            <div className="flex items-center gap-1.5">
              <span className="bg-chart-4 inline-block h-1.5 w-1.5 rounded-full" />
              Resume sessions
            </div>
            <div className="flex items-center gap-1.5">
              <span className="bg-chart-4 inline-block h-1.5 w-1.5 rounded-full" />
              Track progress
            </div>
            <div className="flex items-center gap-1.5">
              <span className="bg-chart-4 inline-block h-1.5 w-1.5 rounded-full" />
              Stay on track
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile-only header */}
          <div className="space-y-1 lg:hidden">
            <h1 className="text-foreground text-xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground text-sm">
              Sign in to continue your learning journey.
            </p>
          </div>

          {/* Desktop header */}
          <div className="hidden space-y-1 lg:block">
            <h1 className="text-foreground text-xl font-bold tracking-tight">Sign in</h1>
            <p className="text-muted-foreground text-sm">
              Welcome back — enter your credentials to continue.
            </p>
          </div>

          <SignInForm
            onSwitchToSignUp={() => navigate({ to: "/signup" })}
            onSuccess={() => navigate({ to: "/dashboard" })}
          />
        </div>
      </div>
    </div>
  );
}
