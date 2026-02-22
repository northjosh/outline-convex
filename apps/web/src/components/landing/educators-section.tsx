import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface Educator {
  name: string;
  subjects: string[];
  rating: number;
  reviews: number;
  initials: string;
}

const EDUCATORS: Educator[] = [
  {
    name: "Akua Mensah",
    subjects: ["Mathematics", "Physics"],
    rating: 4.9,
    reviews: 127,
    initials: "AM",
  },
  {
    name: "Kwame Asante",
    subjects: ["English Language", "Literature"],
    rating: 4.8,
    reviews: 98,
    initials: "KA",
  },
  {
    name: "Ama Owusu",
    subjects: ["Biology", "Chemistry"],
    rating: 4.9,
    reviews: 156,
    initials: "AO",
  },
  {
    name: "Kofi Boateng",
    subjects: ["Economics", "Government"],
    rating: 4.7,
    reviews: 84,
    initials: "KB",
  },
];

export function EducatorsSection() {
  return (
    <section id="educators" className="border-y border-border bg-muted/30 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Meet Our Educators</h2>
          <p className="mt-3 text-muted-foreground">
            Learn from Ghana's top-rated teachers and subject experts
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EDUCATORS.map((edu) => (
            <Card key={edu.name} className="hover-lift">
              <CardContent className="flex flex-col items-center gap-3 pt-6 text-center">
                {/* Avatar */}
                <div className="bg-primary/10 text-primary flex size-14 items-center justify-center rounded-full text-lg font-bold">
                  {edu.initials}
                </div>

                {/* Name */}
                <h3 className="text-sm font-semibold">{edu.name}</h3>

                {/* Subjects */}
                <p className="text-muted-foreground text-xs">{edu.subjects.join(" · ")}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 text-xs">
                  <HugeiconsIcon
                    icon={StarIcon}
                    size={14}
                    className="fill-amber-400 text-amber-400"
                  />
                  <span className="font-medium">{edu.rating}</span>
                  <span className="text-muted-foreground">({edu.reviews} reviews)</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
