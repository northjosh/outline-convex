import { Marquee, MarqueeContent, MarqueeFade, MarqueeItem } from "@/components/kibo-ui/marquee";
import { IllustStar, illustrationColors as c } from "./illustrations";

function ReviewCard({
  name,
  text,
  rating,
  subject,
  avatar,
  color,
}: {
  name: string;
  text: string;
  rating: number;
  subject: string;
  avatar: string;
  color: string;
}) {
  return (
    <div
      className="bg-card flex-[0_0_auto] rounded-xl border p-[16px] w-[400px]"
      style={{
        minWidth: 260,
        borderColor: "#E8E4E0",
        boxShadow: "0 4px 0 #E0DCD6",
      }}
    >
      {/* Stars */}
      <div className="mb-2.5 flex gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <IllustStar key={i} size={14} color={i < rating ? c.accent.base : c.border.default} />
        ))}
      </div>

      {/* Quote */}
      <p
        className="mb-4 text-[13px] italic leading-relaxed line-clamp-2"
        style={{ color: c.text.default }}
      >
        &ldquo;{text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-2.5">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-semibold text-white"
          style={{ background: color }}
        >
          {avatar}
        </div>
        <div>
          <div className="text-[13px] font-semibold">{name}</div>
          <div className="text-[11px]" style={{ color: c.text.subtle }}>
            {subject}
          </div>
        </div>
      </div>
    </div>
  );
}

const REVIEWS = [
  {
    name: "Abena K.",
    text: "Mr. Mensah made integration click for me in one session. I went from a D7 to a B3 in two months.",
    rating: 5,
    subject: "WASSCE Mathematics",
    avatar: "A",
    color: c.accent.base,
  },
  {
    name: "Kofi A.",
    text: "The past questions pack was exactly what I needed. Detailed solutions — not just answers. The past questions pack was exactly what I needed. Detailed solutions — not just answers. I have a lot of questions.",
    rating: 5,
    subject: "Cambridge Chemistry",
    avatar: "K",
    color: c.info.base,
  },
  {
    name: "Esi M.",
    text: "Madam Efua's essay clinic changed my writing completely. She doesn't just correct — she teaches you why.",
    rating: 5,
    subject: "WASSCE English",
    avatar: "E",
    color: c.purple.base,
  },
  {
    name: "Yaw B.",
    text: "Being able to pay with MoMo makes this so easy. No credit card drama.",
    rating: 4,
    subject: "WASSCE Physics",
    avatar: "Y",
    color: c.success.base,
  },
] as const;

export function ReviewsSection() {
  return (
    <section className="mx-auto max-w-[1100px] px-6 pb-[72px]">
      <div className="mb-7 text-center">
        <div className="mb-2 text-[11px] font-semibold tracking-[1.2px] text-amber-700 uppercase">
          Reviews
        </div>
        <h2 className="font-display text-[28px] font-bold tracking-tight">
          Students talk. We listen.
        </h2>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        <Marquee>
          <MarqueeFade side="left" />

          <MarqueeContent>
            {REVIEWS.map((review) => (
              <MarqueeItem key={review.name} className="mx-2 p-2 flex-shrink-0 object-contain">
                <ReviewCard {...review} />
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </div>
    </section>
  );
}
