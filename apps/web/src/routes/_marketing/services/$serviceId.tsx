import type { Id } from "@outline-convex/backend/convex/_generated/dataModel";

import { api } from "@outline-convex/backend/convex/_generated/api";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { ArrowLeft01Icon, Clock01Icon, StarIcon, UserGroupIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { AuthGateAction } from "@/components/services/auth-gate-action";
import { CategoryBadge } from "@/components/services/category-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/_marketing/services/$serviceId")({
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { serviceId } = Route.useParams();

  const service = useQuery(api.services.getService, {
    serviceId: serviceId as Id<"services">,
  });

  const providers = useQuery(
    api.services.listServiceProviders,
    service ? { serviceId: serviceId as Id<"services"> } : "skip",
  );

  // Loading
  if (service === undefined) {
    return <ServiceDetailSkeleton />;
  }

  // Not found
  if (service === null) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-xl font-bold">Service not found</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          This service may have been removed or is no longer available.
        </p>
        <Link to="/services" className="mt-6 inline-block">
          <Button variant="outline" size="sm">
            <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
            Back to services
          </Button>
        </Link>
      </div>
    );
  }

  const actionLabel =
    service.serviceCategory === "live_session"
      ? "Book Session"
      : service.serviceCategory === "digital_product"
        ? "Get Started"
        : "Contact Educator";

  return (
    <div className="container mx-auto max-w-3xl px-4 py-6">
      {/* Back link */}
      <Link
        to="/services"
        className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1 text-xs transition-colors"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} size={12} />
        All services
      </Link>

      {/* Header */}
      <div className="mt-4 flex flex-col gap-3">
        <CategoryBadge category={service.serviceCategory} className="self-start" />
        <h1 className="text-xl font-bold">{service.title}</h1>

        <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs">
          <span>{service.subject}</span>
          <span>·</span>
          <span>{service.educationLevel}</span>
        </div>
      </div>

      {/* Pricing + Action */}
      <Card className="mt-6">
        <CardContent className="flex items-center justify-between gap-4">
          <div>
            <p className="text-lg font-bold">{formatPrice(service.price, service.priceUnit)}</p>
            {service.serviceCategory === "live_session" && service.durationMinutes && (
              <p className="text-muted-foreground mt-0.5 flex items-center gap-1 text-xs">
                <HugeiconsIcon icon={Clock01Icon} size={12} />
                {service.durationMinutes} min
                {service.sessionType === "group" && service.maxGroupSize && (
                  <>
                    {" · "}
                    <HugeiconsIcon icon={UserGroupIcon} size={12} />
                    Up to {service.maxGroupSize} students
                  </>
                )}
              </p>
            )}
          </div>

          <AuthGateAction onAuthenticated={() => {}}>
            <Button size="lg">{actionLabel}</Button>
          </AuthGateAction>
        </CardContent>
      </Card>

      {/* Description */}
      {service.description && (
        <div className="mt-6">
          <h2 className="text-sm font-semibold mb-2">About this service</h2>
          <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
            {service.description}
          </p>
        </div>
      )}

      {/* Educators */}
      {providers && providers.length > 0 && (
        <div className="mt-8">
          <h2 className="text-sm font-semibold mb-3">
            {service.ownerType === "platform" ? "Available Educators" : "Educator"}
          </h2>
          <div className="flex flex-col gap-3">
            {providers.map((provider) => (
              <Card key={provider.teamMemberProfileId} size="sm">
                <CardContent className="flex items-center gap-3">
                  <div className="bg-muted flex size-10 items-center justify-center rounded-full text-sm font-medium uppercase">
                    {provider.fullName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{provider.fullName}</p>
                    <p className="text-muted-foreground text-xs">
                      {provider.totalSessions} session{provider.totalSessions !== 1 ? "s" : ""}{" "}
                      completed
                    </p>
                  </div>
                  {provider.avgRating > 0 && (
                    <div className="flex items-center gap-1 text-xs">
                      <HugeiconsIcon
                        icon={StarIcon}
                        size={12}
                        className="fill-amber-400 text-amber-400"
                      />
                      {provider.avgRating.toFixed(1)}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ServiceDetailSkeleton() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-6">
      <Skeleton className="h-3 w-20" />
      <div className="mt-4 flex flex-col gap-3">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-3 w-40" />
      </div>
      <Card className="mt-6">
        <CardContent className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
          <Skeleton className="h-9 w-28" />
        </CardContent>
      </Card>
      <div className="mt-6 flex flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}
