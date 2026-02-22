export function IllustSearch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" fill="none" className={className}>
      {/* Magnifying glass */}
      <circle cx="180" cy="130" r="50" stroke="#D4851F" strokeWidth="6" fill="none" />
      <line
        x1="216"
        y1="166"
        x2="260"
        y2="210"
        stroke="#D4851F"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Search result cards */}
      <rect x="120" y="80" width="120" height="16" rx="4" fill="#F5EDE3" />
      <rect x="128" y="84" width="60" height="8" rx="2" fill="#E8973A" opacity="0.6" />

      <rect x="120" y="120" width="120" height="16" rx="4" fill="#F5EDE3" />
      <rect x="128" y="124" width="80" height="8" rx="2" fill="#D4851F" opacity="0.5" />

      <rect x="120" y="160" width="120" height="16" rx="4" fill="#F5EDE3" />
      <rect x="128" y="164" width="50" height="8" rx="2" fill="#E8973A" opacity="0.4" />

      {/* Floating elements */}
      <rect x="280" y="90" width="60" height="60" rx="8" fill="#E8973A" opacity="0.15" />
      <rect x="290" y="100" width="40" height="4" rx="2" fill="#D4851F" opacity="0.4" />
      <rect x="290" y="110" width="30" height="4" rx="2" fill="#D4851F" opacity="0.3" />
      <circle cx="310" cy="130" r="8" fill="#D4851F" opacity="0.2" />

      {/* Decorative dots */}
      <circle cx="70" cy="100" r="4" fill="#E8973A" opacity="0.3" />
      <circle cx="340" cy="200" r="5" fill="#D4851F" opacity="0.3" />
    </svg>
  );
}
