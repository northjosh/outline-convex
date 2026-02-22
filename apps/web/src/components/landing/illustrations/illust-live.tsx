export function IllustLive({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" fill="none" className={className}>
      {/* Video call frame */}
      <rect x="80" y="60" width="240" height="160" rx="12" fill="#2C1810" />
      <rect x="88" y="68" width="224" height="136" rx="8" fill="#F5EDE3" />

      {/* Person on video */}
      <circle cx="200" cy="120" r="24" fill="#8B6914" />
      <rect x="176" y="144" width="48" height="40" rx="10" fill="#D4851F" />

      {/* Whiteboard content */}
      <rect x="100" y="80" width="50" height="30" rx="4" fill="#E8973A" opacity="0.2" />
      <rect x="106" y="86" width="30" height="3" rx="1.5" fill="#D4851F" opacity="0.4" />
      <rect x="106" y="94" width="38" height="3" rx="1.5" fill="#D4851F" opacity="0.3" />

      {/* Camera indicator */}
      <circle cx="200" cy="230" r="8" fill="#D4851F" />
      <circle cx="200" cy="230" r="4" fill="#E8973A" />

      {/* Controls */}
      <rect x="150" y="240" width="100" height="20" rx="10" fill="#2C1810" opacity="0.1" />
      <circle cx="175" cy="250" r="6" fill="#E8973A" opacity="0.5" />
      <circle cx="200" cy="250" r="6" fill="#D4851F" opacity="0.5" />
      <circle cx="225" cy="250" r="6" fill="#E8973A" opacity="0.5" />

      {/* Signal waves */}
      <path d="M330 90 Q340 85 340 95" stroke="#E8973A" strokeWidth="2" fill="none" opacity="0.4" />
      <path
        d="M335 80 Q350 78 350 100"
        stroke="#E8973A"
        strokeWidth="2"
        fill="none"
        opacity="0.3"
      />
    </svg>
  );
}
