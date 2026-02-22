import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface Review {
  quote: string;
  name: string;
  exam: string;
  rating: number;
}

const REVIEWS: Review[] = [
  {
    quote:
      "Syllabi helped me go from a D7 to a B3 in Mathematics. My tutor, Madam Akua, made everything click. I couldn't have done it without this platform.",
    name: "Kwesi Appiah",
    exam: "WASSCE 2025",
    rating: 5,
  },
  {
    quote:
      "The digital past questions and solutions were a game-changer for my Cambridge revision. Well organized and easy to follow.",
    name: "Abena Sarpong",
    exam: "Cambridge A-Level",
    rating: 5,
  },
  {
    quote:
      "I was struggling with Integrated Science until I found Mr. Kofi on Syllabi. The live sessions are interactive and the scheduling is super flexible.",
    name: "Yaw Mensah",
    exam: "WASSCE 2025",
    rating: 4,
  },
  {
    quote:
      "As a parent, I appreciate how easy it is to find qualified tutors. The ratings and reviews give me confidence in the educators my children work with.",
    name: "Efua Darkwa",
    exam: "Parent",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <HugeiconsIcon
          key={i}
          icon={StarIcon}
          size={14}
          className={i < count ? "fill-amber-400 text-amber-400" : "text-border"}
        />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">What Students Say</h2>
          <p className="mt-3 text-muted-foreground">Real stories from real students and parents</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {REVIEWS.map((review) => (
            <Card key={review.name}>
              <CardContent className="flex flex-col gap-3">
                <Stars count={review.rating} />
                <p className="text-foreground/90 text-sm leading-relaxed">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="mt-auto">
                  <p className="text-sm font-medium">{review.name}</p>
                  <p className="text-muted-foreground text-xs">{review.exam}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
