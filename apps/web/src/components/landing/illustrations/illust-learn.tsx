export function IllustLearn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" fill="none" className={className}>
      {/* Open book */}
      <path
        d="M200 220 L100 200 L100 100 L200 120 Z"
        fill="#FAF8F5"
        stroke="#D4851F"
        strokeWidth="2"
      />
      <path
        d="M200 220 L300 200 L300 100 L200 120 Z"
        fill="#FAF8F5"
        stroke="#D4851F"
        strokeWidth="2"
      />
      <line x1="200" y1="120" x2="200" y2="220" stroke="#D4851F" strokeWidth="2" />

      {/* Text lines on left page */}
      <rect x="115" y="130" width="70" height="3" rx="1.5" fill="#2C1810" opacity="0.2" />
      <rect x="115" y="140" width="60" height="3" rx="1.5" fill="#2C1810" opacity="0.15" />
      <rect x="115" y="150" width="65" height="3" rx="1.5" fill="#2C1810" opacity="0.2" />
      <rect x="115" y="160" width="50" height="3" rx="1.5" fill="#2C1810" opacity="0.15" />

      {/* Text lines on right page */}
      <rect x="215" y="130" width="70" height="3" rx="1.5" fill="#2C1810" opacity="0.2" />
      <rect x="215" y="140" width="55" height="3" rx="1.5" fill="#2C1810" opacity="0.15" />
      <rect x="215" y="150" width="65" height="3" rx="1.5" fill="#2C1810" opacity="0.2" />

      {/* Graduation cap */}
      <polygon points="200,50 240,70 200,90 160,70" fill="#D4851F" />
      <line x1="200" y1="70" x2="200" y2="95" stroke="#2C1810" strokeWidth="2" />
      <rect x="194" y="60" width="12" height="8" rx="2" fill="#E8973A" />
      <line x1="240" y1="70" x2="240" y2="95" stroke="#D4851F" strokeWidth="2" />
      <circle cx="240" cy="97" r="3" fill="#E8973A" />

      {/* Stars */}
      <circle cx="80" cy="80" r="4" fill="#E8973A" opacity="0.5" />
      <circle cx="330" cy="100" r="3" fill="#D4851F" opacity="0.4" />
      <circle cx="320" cy="180" r="5" fill="#E8973A" opacity="0.3" />
    </svg>
  );
}
