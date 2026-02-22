export function IllustDigital({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" fill="none" className={className}>
      {/* Tablet / document */}
      <rect
        x="120"
        y="50"
        width="160"
        height="200"
        rx="12"
        fill="#FAF8F5"
        stroke="#E8973A"
        strokeWidth="2"
      />

      {/* Document header */}
      <rect x="140" y="70" width="120" height="8" rx="4" fill="#D4851F" opacity="0.6" />

      {/* Content blocks */}
      <rect x="140" y="90" width="100" height="4" rx="2" fill="#2C1810" opacity="0.2" />
      <rect x="140" y="100" width="80" height="4" rx="2" fill="#2C1810" opacity="0.15" />
      <rect x="140" y="110" width="110" height="4" rx="2" fill="#2C1810" opacity="0.2" />

      {/* Chart/graph */}
      <rect x="140" y="130" width="120" height="60" rx="4" fill="#E8973A" opacity="0.1" />
      <rect x="150" y="170" width="16" height="16" rx="2" fill="#D4851F" opacity="0.5" />
      <rect x="172" y="155" width="16" height="31" rx="2" fill="#E8973A" opacity="0.5" />
      <rect x="194" y="145" width="16" height="41" rx="2" fill="#D4851F" opacity="0.6" />
      <rect x="216" y="135" width="16" height="51" rx="2" fill="#E8973A" opacity="0.7" />

      {/* Progress indicator */}
      <rect x="140" y="205" width="120" height="6" rx="3" fill="#F5EDE3" />
      <rect x="140" y="205" width="80" height="6" rx="3" fill="#D4851F" opacity="0.6" />

      {/* Download arrow */}
      <circle cx="320" cy="200" r="18" fill="#E8973A" opacity="0.15" />
      <line
        x1="320"
        y1="190"
        x2="320"
        y2="210"
        stroke="#D4851F"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <polyline
        points="312,204 320,212 328,204"
        stroke="#D4851F"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Floating dots */}
      <circle cx="80" cy="120" r="4" fill="#E8973A" opacity="0.3" />
      <circle cx="340" cy="80" r="3" fill="#D4851F" opacity="0.4" />
    </svg>
  );
}
