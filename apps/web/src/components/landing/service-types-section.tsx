import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IllustCustom, IllustDigital, IllustLive } from "./illustrations";

const SERVICE_TYPES = [
  {
    title: "Live Sessions",
    description:
      "Real-time video tutoring with expert educators. One-on-one or small group sessions tailored to your needs.",
    features: [
      "Interactive whiteboard",
      "Screen sharing",
      "Session recording",
      "Flexible scheduling",
    ],
    Illustration: IllustLive,
  },
  {
    title: "Digital Products",
    description:
      "Downloadable study materials, past questions, revision notes, and practice tests created by top educators.",
    features: ["Past exam questions", "Revision notes", "Practice tests", "Study guides"],
    Illustration: IllustDigital,
  },
  {
    title: "Custom Requests",
    description:
      "Need something specific? Request personalized help — from essay reviews to exam strategies.",
    features: ["Essay review", "Exam strategies", "Homework help", "Project guidance"],
    Illustration: IllustCustom,
  },
] as const;

export function ServiceTypesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Service Types</h2>
          <p className="mt-3 text-muted-foreground">Multiple ways to learn, one platform</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {SERVICE_TYPES.map(({ title, description, features, Illustration }) => (
            <Card key={title} className="hover-lift">
              <CardHeader>
                <Illustration className="mb-2 h-28 w-full dark:opacity-90" />
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-1.5">
                  {features.map((feature) => (
                    <li
                      key={feature}
                      className="text-muted-foreground flex items-center gap-2 text-sm"
                    >
                      <span className="text-primary">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/services">
            <Button size="lg">Browse All Services</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
