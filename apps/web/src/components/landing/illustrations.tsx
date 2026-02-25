/**
 * Inline SVG illustrations for the landing page.
 * Colors are hardcoded hex values matching the Push UI token palette,
 * since Tailwind classes can't target individual SVG child elements.
 */

const c = {
  accent: { base: "#F0A030", emphasis: "#D08A18", strong: "#B07010", subtle: "#FFF9F0" },
  info: { base: "#3080D0" },
  success: { base: "#30A060" },
  purple: { base: "#7C5CC4" },
  danger: { base: "#E05040" },
  text: {
    primary: "#1A1714",
    default: "#2D2926",
    muted: "#6B6560",
    subtle: "#9A9590",
    faint: "#B8B4AC",
  },
  border: { default: "#D4D0C8", emphasis: "#B8B4AC" },
  surface: { active: "#ECEAE6" },
} as const;

/* ═══════════════════════════════════════════
   SCENE ILLUSTRATIONS
   ═══════════════════════════════════════════ */

export function IllustHero({ size = 280 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.85} viewBox="0 0 400 340" fill="none">
      {/* Desk */}
      <rect x="60" y="220" width="280" height="12" rx="6" fill={c.accent.base} opacity="0.15" />
      <rect x="80" y="232" width="8" height="60" rx="3" fill={c.border.default} />
      <rect x="312" y="232" width="8" height="60" rx="3" fill={c.border.default} />
      {/* Laptop */}
      <rect x="120" y="170" width="160" height="50" rx="4" fill={c.text.primary} />
      <rect x="126" y="176" width="148" height="38" rx="2" fill={c.info.base} opacity="0.3" />
      <rect x="136" y="186" width="60" height="4" rx="2" fill="#fff" opacity="0.6" />
      <rect x="136" y="196" width="90" height="4" rx="2" fill="#fff" opacity="0.4" />
      <rect x="136" y="206" width="40" height="4" rx="2" fill={c.accent.base} opacity="0.8" />
      <rect x="100" y="220" width="200" height="6" rx="2" fill={c.border.emphasis} />
      {/* Person */}
      <circle cx="200" cy="100" r="28" fill={c.accent.base} />
      <circle cx="200" cy="92" r="18" fill="#F5D0A0" />
      <rect x="193" y="86" width="14" height="5" rx="2" fill={c.text.primary} opacity="0.6" />
      <path
        d="M182 80 Q200 70 218 80"
        stroke={c.text.primary}
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="194" cy="92" rx="2" ry="2.5" fill={c.text.primary} />
      <ellipse cx="206" cy="92" rx="2" ry="2.5" fill={c.text.primary} />
      <path
        d="M196 99 Q200 103 204 99"
        stroke={c.text.primary}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Body */}
      <path d="M185 108 Q200 130 215 108" fill={c.accent.base} />
      <rect x="180" y="110" width="40" height="60" rx="6" fill={c.accent.base} />
      {/* Arms */}
      <path
        d="M180 120 Q160 145 150 175"
        stroke={c.accent.base}
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M220 120 Q240 145 250 175"
        stroke={c.accent.base}
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="150" cy="178" r="6" fill="#F5D0A0" />
      <circle cx="250" cy="178" r="6" fill="#F5D0A0" />
      {/* Book floating */}
      <g transform="translate(300, 80) rotate(12)">
        <rect width="50" height="40" rx="3" fill={c.info.base} opacity="0.2" />
        <rect x="4" y="8" width="20" height="3" rx="1.5" fill={c.info.base} opacity="0.5" />
        <rect x="4" y="15" width="30" height="3" rx="1.5" fill={c.info.base} opacity="0.4" />
        <rect x="4" y="22" width="15" height="3" rx="1.5" fill={c.info.base} opacity="0.3" />
      </g>
      {/* Star floating */}
      <g transform="translate(70, 70)">
        <polygon
          points="12,0 15,8 24,9 17,15 19,24 12,19 5,24 7,15 0,9 9,8"
          fill={c.accent.base}
          opacity="0.4"
        />
      </g>
      {/* Checkmark floating */}
      <g transform="translate(320, 160)">
        <circle r="14" cx="14" cy="14" fill={c.success.base} opacity="0.15" />
        <path
          d="M8 14 L12 18 L20 10"
          stroke={c.success.base}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function IllustCTA({ size = 200 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 300 180" fill="none">
      {/* Person 1 - sitting with book */}
      <circle cx="80" cy="60" r="16" fill={c.accent.base} opacity="0.6" />
      <circle cx="80" cy="54" r="10" fill="#F5D0A0" />
      <path
        d="M74 48 Q80 42 86 48"
        stroke="#2D2926"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="77" cy="54" rx="1.5" ry="2" fill="#2D2926" />
      <ellipse cx="83" cy="54" rx="1.5" ry="2" fill="#2D2926" />
      <rect x="68" y="68" width="24" height="30" rx="4" fill={c.accent.base} opacity="0.6" />
      <rect x="58" y="95" width="44" height="8" rx="3" fill={c.accent.base} opacity="0.3" />
      <rect
        x="56"
        y="86"
        width="20"
        height="16"
        rx="3"
        fill={c.info.base}
        opacity="0.3"
        stroke={c.info.base}
        strokeWidth="1.5"
      />
      {/* Person 2 - standing with tablet */}
      <circle cx="160" cy="44" r="16" fill={c.info.base} opacity="0.5" />
      <circle cx="160" cy="38" r="10" fill="#D4A880" />
      <path
        d="M154 32 Q160 26 166 32"
        stroke="#2D2926"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="157" cy="38" rx="1.5" ry="2" fill="#2D2926" />
      <ellipse cx="163" cy="38" rx="1.5" ry="2" fill="#2D2926" />
      <rect x="148" y="52" width="24" height="40" rx="4" fill={c.info.base} opacity="0.5" />
      <rect x="140" y="92" width="10" height="36" rx="3" fill={c.info.base} opacity="0.4" />
      <rect x="170" y="92" width="10" height="36" rx="3" fill={c.info.base} opacity="0.4" />
      <rect
        x="170"
        y="64"
        width="14"
        height="20"
        rx="3"
        fill="#fff"
        opacity="0.3"
        stroke="#fff"
        strokeWidth="1.5"
      />
      {/* Person 3 - waving */}
      <circle cx="230" cy="56" r="16" fill={c.success.base} opacity="0.5" />
      <circle cx="230" cy="50" r="10" fill="#F5D0A0" />
      <path
        d="M224 44 Q230 38 236 44"
        stroke="#2D2926"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="227" cy="50" rx="1.5" ry="2" fill="#2D2926" />
      <ellipse cx="233" cy="50" rx="1.5" ry="2" fill="#2D2926" />
      <path
        d="M228 56 Q230 59 232 56"
        stroke="#2D2926"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <rect x="218" y="64" width="24" height="36" rx="4" fill={c.success.base} opacity="0.5" />
      <path
        d="M242 64 Q252 50 248 40"
        stroke={c.success.base}
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="248" cy="38" r="4" fill="#F5D0A0" />
      {/* Floating elements */}
      <polygon
        points="40,30 42,36 48,36.5 43.5,40 45,46 40,43 35,46 36.5,40 32,36.5 38,36"
        fill={c.accent.base}
        opacity="0.35"
      />
      <circle
        cx="270"
        cy="28"
        r="6"
        fill={c.purple.base}
        opacity="0.15"
        stroke={c.purple.base}
        strokeWidth="1.5"
      />
      <path
        d="M126 24 L130 28 L138 20"
        stroke={c.success.base}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
      />
      {/* Ground line */}
      <rect x="30" y="132" width="240" height="4" rx="2" fill={c.accent.base} opacity="0.1" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   ICON ILLUSTRATIONS
   ═══════════════════════════════════════════ */

export function IllustSearch({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle
        cx="20"
        cy="20"
        r="12"
        stroke={c.info.base}
        strokeWidth="3"
        fill={c.info.base}
        opacity="0.1"
      />
      <circle cx="20" cy="20" r="12" stroke={c.info.base} strokeWidth="3" fill="none" />
      <line
        x1="29"
        y1="29"
        x2="40"
        y2="40"
        stroke={c.info.base}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="17" cy="17" r="3" fill={c.info.base} opacity="0.25" />
    </svg>
  );
}

export function IllustCalendar({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect
        x="4"
        y="10"
        width="40"
        height="34"
        rx="5"
        fill={c.accent.base}
        opacity="0.1"
        stroke={c.accent.base}
        strokeWidth="2.5"
      />
      <rect x="4" y="10" width="40" height="12" rx="5" fill={c.accent.base} opacity="0.2" />
      <line
        x1="14"
        y1="6"
        x2="14"
        y2="16"
        stroke={c.accent.base}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="34"
        y1="6"
        x2="34"
        y2="16"
        stroke={c.accent.base}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="16" cy="30" r="3" fill={c.accent.base} opacity="0.4" />
      <circle cx="24" cy="30" r="3" fill={c.accent.base} />
      <circle cx="32" cy="30" r="3" fill={c.accent.base} opacity="0.4" />
      <circle cx="16" cy="38" r="3" fill={c.accent.base} opacity="0.2" />
      <circle cx="24" cy="38" r="3" fill={c.accent.base} opacity="0.2" />
    </svg>
  );
}

export function IllustRocket({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path
        d="M24 6 C24 6 14 16 14 30 L24 36 L34 30 C34 16 24 6 24 6Z"
        fill={c.success.base}
        opacity="0.15"
        stroke={c.success.base}
        strokeWidth="2.5"
      />
      <circle cx="24" cy="22" r="4" fill={c.success.base} opacity="0.4" />
      <path
        d="M14 30 Q10 32 8 38"
        stroke={c.success.base}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M34 30 Q38 32 40 38"
        stroke={c.success.base}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path d="M20 36 L24 44 L28 36" fill={c.accent.base} opacity="0.6" />
    </svg>
  );
}

export function IllustVideo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect
        x="2"
        y="10"
        width="32"
        height="28"
        rx="5"
        fill={c.info.base}
        opacity="0.1"
        stroke={c.info.base}
        strokeWidth="2.5"
      />
      <polygon
        points="38,16 46,12 46,36 38,32"
        fill={c.info.base}
        opacity="0.3"
        stroke={c.info.base}
        strokeWidth="2"
      />
      <circle cx="18" cy="24" r="6" fill={c.info.base} opacity="0.15" />
      <polygon points="16,20 16,28 23,24" fill={c.info.base} />
    </svg>
  );
}

export function IllustPackage({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect
        x="6"
        y="14"
        width="36"
        height="28"
        rx="4"
        fill={c.success.base}
        opacity="0.1"
        stroke={c.success.base}
        strokeWidth="2.5"
      />
      <line x1="6" y1="22" x2="42" y2="22" stroke={c.success.base} strokeWidth="2" />
      <line x1="24" y1="14" x2="24" y2="42" stroke={c.success.base} strokeWidth="2" />
      <path
        d="M14 6 L24 14 L34 6"
        stroke={c.success.base}
        strokeWidth="2.5"
        fill={c.success.base}
        opacity="0.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="20" y="26" width="8" height="8" rx="2" fill={c.success.base} opacity="0.3" />
    </svg>
  );
}

export function IllustPencil({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path
        d="M34 6 L42 14 L16 40 L6 42 L8 32 Z"
        fill={c.accent.base}
        opacity="0.1"
        stroke={c.accent.base}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <line x1="30" y1="10" x2="38" y2="18" stroke={c.accent.base} strokeWidth="2" />
      <path d="M6 42 L10 38 L8 36 Z" fill={c.accent.base} opacity="0.5" />
      <line
        x1="14"
        y1="34"
        x2="22"
        y2="26"
        stroke={c.accent.base}
        strokeWidth="1.5"
        opacity="0.3"
      />
    </svg>
  );
}

export function IllustGrad({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <polygon
        points="24,6 4,18 24,30 44,18"
        fill={c.text.primary}
        opacity="0.1"
        stroke={c.text.primary}
        strokeWidth="2"
      />
      <polygon points="24,6 4,18 24,30 44,18" fill="none" stroke={c.text.primary} strokeWidth="2" />
      <line x1="40" y1="20" x2="40" y2="36" stroke={c.text.primary} strokeWidth="2" />
      <path
        d="M16 24 L16 34 Q24 40 32 34 L32 24"
        stroke={c.text.primary}
        strokeWidth="2"
        fill={c.accent.base}
        opacity="0.15"
      />
      <circle cx="40" cy="37" r="3" fill={c.accent.base} />
    </svg>
  );
}

export function IllustPhone({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect
        x="12"
        y="4"
        width="24"
        height="40"
        rx="5"
        fill={c.text.primary}
        opacity="0.08"
        stroke={c.text.primary}
        strokeWidth="2"
      />
      <rect x="16" y="10" width="16" height="24" rx="2" fill={c.info.base} opacity="0.12" />
      <circle cx="24" cy="40" r="2" fill={c.text.primary} opacity="0.2" />
      <rect x="19" y="14" width="10" height="3" rx="1.5" fill={c.accent.base} opacity="0.5" />
      <rect x="19" y="20" width="7" height="2" rx="1" fill={c.text.primary} opacity="0.15" />
      <rect x="19" y="25" width="10" height="2" rx="1" fill={c.text.primary} opacity="0.1" />
    </svg>
  );
}

export function IllustWallet({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect
        x="4"
        y="12"
        width="36"
        height="28"
        rx="5"
        fill={c.accent.base}
        opacity="0.1"
        stroke={c.accent.base}
        strokeWidth="2.5"
      />
      <rect x="4" y="12" width="36" height="10" rx="5" fill={c.accent.base} opacity="0.15" />
      <circle cx="34" cy="30" r="4" fill={c.accent.base} opacity="0.4" />
      <circle cx="34" cy="30" r="2" fill={c.accent.base} />
      <path
        d="M8 12 L8 10 Q8 6 12 6 L32 6 Q36 6 36 10 L36 12"
        stroke={c.accent.base}
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

export function IllustStar({
  size = 20,
  color = c.accent.base,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <polygon
        points="10,1 12.5,7 19,7.5 14,12 15.5,19 10,15.5 4.5,19 6,12 1,7.5 7.5,7"
        fill={color}
      />
    </svg>
  );
}

export function IllustCheck({
  size = 16,
  color = c.success.base,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" fill={color} opacity="0.12" stroke={color} strokeWidth="1.5" />
      <path
        d="M5 8 L7 10 L11 6"
        stroke={color}
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IllustArrowRight({
  size = 16,
  color = c.text.muted,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8 L12 8 M9 5 L12 8 L9 11"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IllustUsers({
  size = 20,
  color = c.text.subtle,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <circle cx="7" cy="7" r="3.5" fill={color} opacity="0.3" stroke={color} strokeWidth="1.2" />
      <path
        d="M1 17 Q1 13 7 13 Q13 13 13 17"
        fill={color}
        opacity="0.15"
        stroke={color}
        strokeWidth="1.2"
      />
      <circle cx="14" cy="7" r="2.5" fill={color} opacity="0.2" stroke={color} strokeWidth="1.2" />
      <path d="M12 17 Q12 14 16 13.5" stroke={color} strokeWidth="1.2" fill="none" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   SUBJECT ICONS (14×14)
   ═══════════════════════════════════════════ */

export function SubjMath() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7h10M7 2v10" stroke={c.info.base} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
export function SubjChem() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M5 2v4L2 12h10L9 6V2"
        stroke={c.purple.base}
        strokeWidth="1.5"
        fill={c.purple.base}
        opacity="0.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="5"
        y1="2"
        x2="9"
        y2="2"
        stroke={c.purple.base}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function SubjPhys() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="2" fill={c.accent.base} />
      <ellipse cx="7" cy="7" rx="6" ry="3" stroke={c.accent.base} strokeWidth="1.2" fill="none" />
      <ellipse
        cx="7"
        cy="7"
        rx="6"
        ry="3"
        stroke={c.accent.base}
        strokeWidth="1.2"
        fill="none"
        transform="rotate(60 7 7)"
      />
    </svg>
  );
}
export function SubjBio() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M7 12V6M7 6Q4 4 4 2Q6 3 7 6M7 6Q10 4 10 2Q8 3 7 6"
        stroke={c.success.base}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="7" cy="12" r="1" fill={c.success.base} />
    </svg>
  );
}
export function SubjEng() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect
        x="2"
        y="2"
        width="10"
        height="10"
        rx="2"
        stroke={c.info.base}
        strokeWidth="1.3"
        fill={c.info.base}
        opacity="0.1"
      />
      <line
        x1="4"
        y1="5"
        x2="10"
        y2="5"
        stroke={c.info.base}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="4"
        y1="7.5"
        x2="8"
        y2="7.5"
        stroke={c.info.base}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="4"
        y1="10"
        x2="6"
        y2="10"
        stroke={c.info.base}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function SubjLit() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M2 2 Q7 0 7 7 Q7 0 12 2 L12 12 Q7 10 7 12 Q7 10 2 12Z"
        stroke={c.purple.base}
        strokeWidth="1.3"
        fill={c.purple.base}
        opacity="0.1"
      />
      <line x1="7" y1="7" x2="7" y2="12" stroke={c.purple.base} strokeWidth="1" />
    </svg>
  );
}
export function SubjBiz() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect
        x="3"
        y="5"
        width="8"
        height="7"
        rx="1.5"
        stroke={c.accent.base}
        strokeWidth="1.3"
        fill={c.accent.base}
        opacity="0.1"
      />
      <path d="M5 5V3.5Q5 2 7 2Q9 2 9 3.5V5" stroke={c.accent.base} strokeWidth="1.3" fill="none" />
    </svg>
  );
}
export function SubjGeo() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle
        cx="7"
        cy="7"
        r="5.5"
        stroke={c.success.base}
        strokeWidth="1.3"
        fill={c.success.base}
        opacity="0.1"
      />
      <ellipse cx="7" cy="7" rx="3" ry="5.5" stroke={c.success.base} strokeWidth="1" fill="none" />
      <line x1="1.5" y1="7" x2="12.5" y2="7" stroke={c.success.base} strokeWidth="1" />
    </svg>
  );
}
export function SubjICT() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect
        x="1"
        y="2"
        width="12"
        height="8"
        rx="2"
        stroke={c.info.base}
        strokeWidth="1.3"
        fill={c.info.base}
        opacity="0.1"
      />
      <line
        x1="5"
        y1="10"
        x2="9"
        y2="10"
        stroke={c.info.base}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <rect x="5" y="5" width="2" height="2" fill={c.info.base} opacity="0.4" />
    </svg>
  );
}
export function SubjFr() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="2" y="3" width="3.3" height="8" fill="#002395" rx="1" />
      <rect x="5.3" y="3" width="3.3" height="8" fill="#EEEEEE" />
      <rect x="8.6" y="3" width="3.3" height="8" fill="#ED2939" rx="1" />
    </svg>
  );
}
export function SubjSci() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle
        cx="7"
        cy="4"
        r="2.5"
        stroke={c.purple.base}
        strokeWidth="1.3"
        fill={c.purple.base}
        opacity="0.15"
      />
      <path d="M4 10Q4 7 7 7Q10 7 10 10" stroke={c.purple.base} strokeWidth="1.3" fill="none" />
      <circle cx="7" cy="4" r="1" fill={c.purple.base} opacity="0.4" />
    </svg>
  );
}
export function SubjEcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M2 11 L5 7 L8 9 L12 3"
        stroke={c.accent.base}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="3" r="1.5" fill={c.accent.base} opacity="0.4" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   ADDITIONAL SUBJECT ICONS (onboarding)
   ═══════════════════════════════════════════ */

export function SubjHist() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect
        x="3"
        y="4"
        width="8"
        height="9"
        rx="0.5"
        stroke={c.danger.base}
        strokeWidth="1.3"
        fill={c.danger.base}
        opacity="0.15"
      />
      <line
        x1="5"
        y1="4"
        x2="5"
        y2="1"
        stroke={c.danger.base}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="9"
        y1="4"
        x2="9"
        y2="1"
        stroke={c.danger.base}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="3"
        y1="7"
        x2="7"
        y2="7"
        stroke={c.danger.base}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}
export function SubjFMath() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M3 12L5.5 2.5Q7 2 7 4L7 7Q7 9 8.5 9.5L11 12"
        stroke={c.info.base}
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function SubjPsych() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M7 12V6M4 2C4 4 7 6 7 6C7 6 10 4 10 2"
        stroke={c.purple.base}
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="2" r="1" fill={c.purple.base} opacity="0.4" />
    </svg>
  );
}
export function SubjCS() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M5 4L2 7L5 10"
        stroke={c.info.base}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 4L12 7L9 10"
        stroke={c.info.base}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   ONBOARDING ICONS (wizard steps)
   ═══════════════════════════════════════════ */

export function OnbFlame() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C12 2 7 8 7 13a5 5 0 0010 0C17 8 12 2 12 2Z"
        stroke={c.accent.base}
        strokeWidth="1.8"
        fill={c.accent.base}
        fillOpacity="0.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 22c-1.5 0-3-1.5-3-3.5 0-2 3-4.5 3-4.5s3 2.5 3 4.5c0 2-1.5 3.5-3 3.5Z"
        fill={c.accent.base}
        opacity="0.5"
      />
    </svg>
  );
}
export function OnbCalendar() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2.5"
        stroke={c.info.base}
        strokeWidth="1.8"
        fill={c.info.base}
        fillOpacity="0.1"
      />
      <line x1="3" y1="10" x2="21" y2="10" stroke={c.info.base} strokeWidth="1.5" />
      <line
        x1="8"
        y1="3"
        x2="8"
        y2="7"
        stroke={c.info.base}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="3"
        x2="16"
        y2="7"
        stroke={c.info.base}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="15" r="1.5" fill={c.info.base} />
    </svg>
  );
}
export function OnbExplore() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke={c.purple.base}
        strokeWidth="1.8"
        fill={c.purple.base}
        fillOpacity="0.1"
      />
      <path
        d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36z"
        stroke={c.purple.base}
        strokeWidth="1.5"
        fill={c.purple.base}
        fillOpacity="0.25"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="1.2" fill={c.purple.base} />
    </svg>
  );
}
export function OnbShield() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3L4 7v5c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V7l-8-4Z"
        stroke={c.info.base}
        strokeWidth="1.8"
        fill={c.info.base}
        fillOpacity="0.1"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2" stroke={c.info.base} strokeWidth="1.3" fill="none" />
      <path
        d="M9 16c0-1.5 1.3-3 3-3s3 1.5 3 3"
        stroke={c.info.base}
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function OnbCheckCircle() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke={c.success.base}
        strokeWidth="1.8"
        fill={c.success.base}
        fillOpacity="0.1"
      />
      <path
        d="M8 12.5l2.5 2.5 5-5.5"
        stroke={c.success.base}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function OnbHourglass() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M10 4h12v6l-4 6 4 6v6H10v-6l4-6-4-6V4Z"
        stroke={c.accent.base}
        strokeWidth="2"
        fill={c.accent.base}
        fillOpacity="0.1"
        strokeLinejoin="round"
      />
      <path d="M13 24l3-3 3 3v4h-6v-4Z" fill={c.accent.base} opacity="0.35" />
      <line
        x1="10"
        y1="4"
        x2="22"
        y2="4"
        stroke={c.accent.base}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="10"
        y1="28"
        x2="22"
        y2="28"
        stroke={c.accent.base}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function OnbCelebrate() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M16 6l1.5 4.5L22 12l-4.5 1.5L16 18l-1.5-4.5L10 12l4.5-1.5Z"
        stroke={c.success.base}
        strokeWidth="1.8"
        fill={c.success.base}
        fillOpacity="0.2"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="8" r="1.5" fill={c.accent.base} />
      <circle cx="7" cy="10" r="1" fill={c.purple.base} />
      <circle cx="25" cy="22" r="1" fill={c.info.base} />
      <path d="M6 20l2 4" stroke={c.accent.base} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 16l2 2" stroke={c.purple.base} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 26l1 2" stroke={c.success.base} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
export function OnbInfo() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle
        cx="7"
        cy="7"
        r="6"
        stroke={c.info.base}
        strokeWidth="1.3"
        fill={c.info.base}
        fillOpacity="0.1"
      />
      <line
        x1="7"
        y1="6.5"
        x2="7"
        y2="10.5"
        stroke={c.info.base}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="7" cy="4.5" r="0.8" fill={c.info.base} />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   SOCIAL ICONS (footer)
   ═══════════════════════════════════════════ */

export function IconX() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M1 1L6 7.5L1 13H2.5L7 8.5L10.5 13H13L8 6.5L13 1H11.5L7 6L3.5 1H1Z"
        fill={c.text.muted}
      />
    </svg>
  );
}
export function IconInstagram() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect
        x="1"
        y="1"
        width="12"
        height="12"
        rx="3.5"
        stroke={c.text.muted}
        strokeWidth="1.3"
        fill="none"
      />
      <circle cx="7" cy="7" r="3" stroke={c.text.muted} strokeWidth="1.3" fill="none" />
      <circle cx="10.5" cy="3.5" r="0.8" fill={c.text.muted} />
    </svg>
  );
}
export function IconLinkedIn() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="5" width="2.5" height="8" rx="0.5" fill={c.text.muted} />
      <circle cx="2.25" cy="2.5" r="1.5" fill={c.text.muted} />
      <path
        d="M5.5 5H8V6.2C8.5 5.3 9.5 4.8 10.5 5C12 5.3 12.5 6.5 12.5 8V13H10V8.5C10 7.5 9.5 7 8.8 7C8 7 7.5 7.5 7.5 8.5V13H5.5V5Z"
        fill={c.text.muted}
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   EXPORTED COLORS (for use in section components)
   ═══════════════════════════════════════════ */

export { c as illustrationColors };
