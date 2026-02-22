export function IllustCustom({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" fill="none" className={className}>
      {/* Chat bubbles */}
      <rect
        x="80"
        y="80"
        width="160"
        height="60"
        rx="12"
        fill="#F5EDE3"
        stroke="#E8973A"
        strokeWidth="2"
      />
      <polygon points="120,140 130,155 140,140" fill="#F5EDE3" stroke="#E8973A" strokeWidth="2" />
      <rect x="100" y="98" width="100" height="4" rx="2" fill="#D4851F" opacity="0.4" />
      <rect x="100" y="110" width="70" height="4" rx="2" fill="#2C1810" opacity="0.2" />
      <rect x="100" y="122" width="120" height="4" rx="2" fill="#2C1810" opacity="0.15" />

      {/* Reply bubble */}
      <rect x="160" y="160" width="160" height="50" rx="12" fill="#D4851F" opacity="0.15" />
      <polygon points="280,210 270,225 260,210" fill="#D4851F" opacity="0.15" />
      <rect x="180" y="175" width="100" height="4" rx="2" fill="#D4851F" opacity="0.4" />
      <rect x="180" y="185" width="80" height="4" rx="2" fill="#D4851F" opacity="0.3" />

      {/* Person icon */}
      <circle cx="60" cy="180" r="16" fill="#8B6914" />
      <rect x="48" y="196" width="24" height="20" rx="6" fill="#D4851F" />

      {/* Pencil icon */}
      <rect
        x="310"
        y="80"
        width="40"
        height="10"
        rx="3"
        fill="#E8973A"
        transform="rotate(-45 330 85)"
      />
      <polygon points="306,120 300,135 315,129" fill="#D4851F" />

      {/* Stars */}
      <circle cx="340" cy="200" r="4" fill="#E8973A" opacity="0.4" />
      <circle cx="80" cy="50" r="3" fill="#D4851F" opacity="0.5" />
      <circle cx="300" cy="50" r="5" fill="#E8973A" opacity="0.3" />
    </svg>
  );
}
