export function IllustHero({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" fill="none" className={className}>
      {/* Desk */}
      <rect x="80" y="200" width="240" height="12" rx="4" fill="#E8973A" opacity="0.3" />
      <rect x="130" y="212" width="8" height="40" rx="2" fill="#D4851F" opacity="0.4" />
      <rect x="262" y="212" width="8" height="40" rx="2" fill="#D4851F" opacity="0.4" />

      {/* Laptop */}
      <rect x="120" y="150" width="160" height="50" rx="6" fill="#2C1810" />
      <rect x="128" y="156" width="144" height="38" rx="3" fill="#F5EDE3" />
      <rect x="100" y="200" width="200" height="6" rx="3" fill="#2C1810" />

      {/* Screen content lines */}
      <rect x="140" y="165" width="60" height="4" rx="2" fill="#D4851F" />
      <rect x="140" y="175" width="100" height="3" rx="1.5" fill="#2C1810" opacity="0.2" />
      <rect x="140" y="182" width="80" height="3" rx="1.5" fill="#2C1810" opacity="0.15" />

      {/* Person */}
      <circle cx="200" cy="100" r="22" fill="#8B6914" />
      <rect x="178" y="122" width="44" height="50" rx="10" fill="#D4851F" />

      {/* Book */}
      <rect x="290" y="170" width="40" height="30" rx="3" fill="#E8973A" />
      <rect x="295" y="175" width="30" height="3" rx="1.5" fill="#FAF8F5" />
      <rect x="295" y="182" width="24" height="3" rx="1.5" fill="#FAF8F5" />

      {/* Stars */}
      <circle cx="80" cy="80" r="4" fill="#E8973A" opacity="0.6" />
      <circle cx="320" cy="60" r="3" fill="#D4851F" opacity="0.5" />
      <circle cx="350" cy="120" r="5" fill="#E8973A" opacity="0.4" />
      <circle cx="60" cy="150" r="3" fill="#D4851F" opacity="0.4" />
    </svg>
  );
}
