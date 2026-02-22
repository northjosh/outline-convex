import type { Doc, Id } from "@outline-convex/backend/convex/_generated/dataModel";

import { StarIcon, UserGroupIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "@tanstack/react-router";

import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CategoryBadge } from "./category-badge";

export type EnrichedService = Doc<"services"> & {
  teamMemberInfo: {
    _id: Id<"teamMemberProfiles">;
    fullName: string;
    avatarUrl?: string;
    avgRating: number;
  } | null;
  providerCount: number;
};

export function ServiceCard({
  service,
  className,
}: {
  service: EnrichedService;
  className?: string;
}) {
  return (
    <Link to="/services/$serviceId" params={{ serviceId: service._id }}>
      <Card className={cn("hover-lift cursor-pointer h-full", className)}>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CategoryBadge category={service.serviceCategory} />
            <span className="text-sm font-semibold whitespace-nowrap">
              {formatPrice(service.price, service.priceUnit)}
            </span>
          </div>
          <CardTitle className="mt-1 line-clamp-2">{service.title}</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          <p className="text-muted-foreground text-xs">
            {service.subject} · {service.educationLevel}
          </p>

          {service.description && (
            <p className="text-muted-foreground text-xs line-clamp-2">{service.description}</p>
          )}

          <div className="mt-auto pt-2">
            {service.teamMemberInfo ? (
              <div className="flex items-center gap-2 text-xs">
                <div className="bg-muted flex size-6 items-center justify-center rounded-full text-[10px] font-medium uppercase">
                  {service.teamMemberInfo.fullName.charAt(0)}
                </div>
                <span className="text-foreground truncate">{service.teamMemberInfo.fullName}</span>
                {service.teamMemberInfo.avgRating > 0 && (
                  <span className="text-muted-foreground ml-auto flex items-center gap-0.5">
                    <HugeiconsIcon
                      icon={StarIcon}
                      size={12}
                      className="fill-amber-400 text-amber-400"
                    />
                    {service.teamMemberInfo.avgRating.toFixed(1)}
                  </span>
                )}
              </div>
            ) : service.ownerType === "platform" && service.providerCount > 0 ? (
              <div className="text-muted-foreground flex items-center gap-1 text-xs">
                <HugeiconsIcon icon={UserGroupIcon} size={12} />
                {service.providerCount} educator{service.providerCount !== 1 ? "s" : ""} available
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
