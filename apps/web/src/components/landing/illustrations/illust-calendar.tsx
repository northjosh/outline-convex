export function IllustCalendar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" fill="none" className={className}>
      {/* Calendar frame */}
      <rect
        x="100"
        y="60"
        width="200"
        height="180"
        rx="12"
        fill="#FAF8F5"
        stroke="#E8973A"
        strokeWidth="2"
      />

      {/* Header */}
      <rect x="100" y="60" width="200" height="40" rx="12" fill="#D4851F" />
      <rect x="100" y="88" width="200" height="12" fill="#D4851F" />
      <rect x="140" y="72" width="120" height="8" rx="4" fill="#FAF8F5" opacity="0.8" />

      {/* Calendar grid */}
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3, 4].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={120 + col * 34}
            y={110 + row * 28}
            width="24"
            height="20"
            rx="4"
            fill={row === 1 && col === 2 ? "#E8973A" : "#F5EDE3"}
            opacity={row === 1 && col === 2 ? 0.8 : 0.5}
          />
        )),
      )}

      {/* Selected day highlight */}
      <circle cx="200" cy="148" r="12" fill="#D4851F" opacity="0.3" />

      {/* Clock icon */}
      <circle cx="320" cy="220" r="20" stroke="#E8973A" strokeWidth="2" fill="#FAF8F5" />
      <line
        x1="320"
        y1="210"
        x2="320"
        y2="220"
        stroke="#D4851F"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="320"
        y1="220"
        x2="328"
        y2="224"
        stroke="#D4851F"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
