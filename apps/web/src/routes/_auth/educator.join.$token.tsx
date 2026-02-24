import SignUpForm from "@/components/sign-up-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/educator/join/$token")({
  component: EducatorJoinPage,
});

/**
 * Decorative illustration: handshake with connection nodes —
 * represents joining a team and professional collaboration.
 */
function JoinIllustration() {
  return (
    <svg
      viewBox="0 0 280 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary/20 mx-auto w-full max-w-[260px]"
      aria-hidden="true"
    >
      {/* Connected nodes — network */}
      <circle cx="80" cy="60" r="12" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <circle cx="200" cy="60" r="12" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <circle
        cx="140"
        cy="100"
        r="16"
        stroke="currentColor"
        strokeWidth="2"
        fill="currentColor"
        opacity="0.15"
      />
      <circle
        cx="140"
        cy="100"
        r="16"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />

      {/* Connection lines */}
      <line
        x1="92"
        y1="65"
        x2="124"
        y2="95"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.3"
      />
      <line
        x1="188"
        y1="65"
        x2="156"
        y2="95"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.3"
      />

      {/* Plus icon in center node */}
      <line
        x1="134"
        y1="100"
        x2="146"
        y2="100"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.6"
      />
      <line
        x1="140"
        y1="94"
        x2="140"
        y2="106"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.6"
      />

      {/* Person icons in side nodes */}
      <circle cx="80" cy="56" r="4" fill="currentColor" opacity="0.5" />
      <path
        d="M72 68 C72 63 88 63 88 68"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />

      <circle cx="200" cy="56" r="4" fill="currentColor" opacity="0.5" />
      <path
        d="M192 68 C192 63 208 63 208 68"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />

      {/* Lower decoration — welcome path */}
      <path
        d="M80 140 C100 130 120 150 140 140 C160 130 180 150 200 140"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.25"
      />
      <path
        d="M90 160 C110 150 130 170 150 160 C170 150 190 170 210 160"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.15"
      />

      {/* Floating dots */}
      <circle cx="50" cy="100" r="2" fill="currentColor" opacity="0.2" />
      <circle cx="230" cy="100" r="2" fill="currentColor" opacity="0.2" />
      <circle cx="140" cy="40" r="2.5" fill="currentColor" opacity="0.3" />
      <circle cx="60" cy="170" r="1.5" fill="currentColor" opacity="0.15" />
      <circle cx="220" cy="175" r="1.5" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

function EducatorJoinPage() {
  const { token } = Route.useParams();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      {/* Left panel — illustration & copy (hidden on mobile) */}
      <div className="bg-muted/30 hidden flex-1 flex-col items-center justify-center gap-8 p-12 lg:flex">
        <div className="max-w-sm space-y-6 text-center">
          <JoinIllustration />

          <div className="space-y-3">
            <h1 className="text-foreground text-2xl font-bold tracking-tight">
              Join Outline as an educator
            </h1>
            <p className="text-muted-foreground text-balance leading-relaxed">
              You&apos;ve been invited to join our community of educators. Create your account to
              start teaching, managing sessions, and making an impact.
            </p>
          </div>

          <div className="text-muted-foreground/60 flex items-center justify-center gap-6 pt-4 text-sm">
            <div className="flex items-center gap-1.5">
              <span className="bg-chart-4 inline-block h-1.5 w-1.5 rounded-full" />
              Set your schedule
            </div>
            <div className="flex items-center gap-1.5">
              <span className="bg-chart-4 inline-block h-1.5 w-1.5 rounded-full" />
              Reach students
            </div>
            <div className="flex items-center gap-1.5">
              <span className="bg-chart-4 inline-block h-1.5 w-1.5 rounded-full" />
              Earn income
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
              Join as an educator
            </h1>
            <p className="text-muted-foreground text-sm">
              Create your educator account to get started.
            </p>
          </div>

          {/* Desktop header */}
          <div className="hidden space-y-1 lg:block">
            <h1 className="text-foreground text-xl font-bold tracking-tight">
              Create your educator account
            </h1>
            <p className="text-muted-foreground text-sm">
              Complete your profile to start teaching on Outline.
            </p>
          </div>

          <SignUpForm
            onSwitchToSignIn={() => navigate({ to: "/educator/login" })}
            onSuccess={() => navigate({ to: "/educator" })}
          />
        </div>
      </div>
    </div>
  );
}
