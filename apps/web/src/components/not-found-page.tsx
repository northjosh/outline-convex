import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

/**
 * Decorative illustration: broken compass with a question mark —
 * represents being lost, fitting the "page not found" theme.
 */
function LostCompassIllustration() {
  return (
    <svg
      viewBox="0 0 280 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary/20 mx-auto w-full max-w-[220px]"
      aria-hidden="true"
    >
      {/* Outer compass ring — dashed to suggest "broken" */}
      <circle
        cx="140"
        cy="110"
        r="70"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="8 4"
        opacity="0.4"
      />
      <circle cx="140" cy="110" r="55" stroke="currentColor" strokeWidth="1" opacity="0.2" />

      {/* Cardinal tick marks — some missing to look broken */}
      <line x1="140" y1="40" x2="140" y2="50" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <line
        x1="140"
        y1="170"
        x2="140"
        y2="180"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.3"
      />
      <line
        x1="200"
        y1="110"
        x2="210"
        y2="110"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.5"
      />

      {/* Compass needle — tilted/broken */}
      <line
        x1="140"
        y1="85"
        x2="155"
        y2="70"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <line
        x1="140"
        y1="135"
        x2="128"
        y2="148"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.35"
      />

      {/* Center dot */}
      <circle cx="140" cy="110" r="4" fill="currentColor" opacity="0.5" />

      {/* Question mark */}
      <text
        x="140"
        y="118"
        textAnchor="middle"
        fill="currentColor"
        fontSize="28"
        fontFamily="serif"
        fontWeight="bold"
        opacity="0.6"
      >
        ?
      </text>

      {/* Scattered dots — lost particles */}
      <circle cx="45" cy="55" r="2" fill="currentColor" opacity="0.2" />
      <circle cx="235" cy="65" r="2.5" fill="currentColor" opacity="0.2" />
      <circle cx="30" cy="140" r="1.5" fill="currentColor" opacity="0.15" />
      <circle cx="250" cy="155" r="2" fill="currentColor" opacity="0.15" />
      <circle cx="60" cy="180" r="1.5" fill="currentColor" opacity="0.1" />
      <circle cx="220" cy="40" r="2" fill="currentColor" opacity="0.1" />
    </svg>
  );
}

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <LostCompassIllustration />

      <h1 className="text-foreground mt-6 text-6xl font-extrabold tracking-tight">404</h1>
      <p className="text-foreground mt-3 text-lg font-medium">
        Looks like this page took an unexcused absence.
      </p>
      <p className="text-muted-foreground mt-1 max-w-sm text-sm text-balance">
        The page you&apos;re looking for has either been moved, deleted, or is playing hooky.
      </p>

      <Link to="/" className="mt-8">
        <Button size="lg" variant="outline" className="gap-2">
          Back to class
        </Button>
      </Link>
    </div>
  );
}
