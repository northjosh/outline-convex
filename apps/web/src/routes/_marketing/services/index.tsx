import { api } from "@outline-convex/backend/convex/_generated/api";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { useMemo, useState } from "react";

import { FilterBar, type FilterState } from "@/components/services/filter-bar";
import { ServiceCard } from "@/components/services/service-card";
import { ServiceCardSkeleton } from "@/components/services/service-card-skeleton";
import { Button } from "@/components/ui/button";
import { SearchRemoveIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export const Route = createFileRoute("/_marketing/services/")({
  component: ServicesPage,
});

function ServicesPage() {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    subject: undefined,
    educationLevel: undefined,
    serviceCategory: undefined,
  });

  // Pass server-side filters to the query
  const services = useQuery(api.services.listActiveServices, {
    subject: filters.subject,
    educationLevel: filters.educationLevel,
    serviceCategory: filters.serviceCategory as
      | "live_session"
      | "digital_product"
      | "custom_request"
      | undefined,
  });

  // Client-side search filter
  const filtered = useMemo(() => {
    if (!services) return undefined;
    if (!filters.searchQuery.trim()) return services;

    const query = filters.searchQuery.toLowerCase();
    return services.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.description?.toLowerCase().includes(query) ||
        s.subject.toLowerCase().includes(query),
    );
  }, [services, filters.searchQuery]);

  const isLoading = filtered === undefined;
  const isEmpty = filtered !== undefined && filtered.length === 0;
  const hasActiveFilters =
    !!filters.subject ||
    !!filters.educationLevel ||
    !!filters.serviceCategory ||
    !!filters.searchQuery.trim();

  return (
    <div className="mt-12 container mx-auto max-w-5xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold">Browse Services</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Find tutoring sessions, study materials, and educational services
        </p>
      </div>

      <FilterBar filters={filters} onFiltersChange={setFilters} />

      <div className="mt-6">
        {isLoading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ServiceCardSkeleton key={i} />
            ))}
          </div>
        )}

        {isEmpty && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <HugeiconsIcon
              icon={SearchRemoveIcon}
              size={40}
              className="text-muted-foreground mb-4"
            />
            <h2 className="text-base font-medium">No services found</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Try adjusting your filters or search terms
            </p>
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() =>
                  setFilters({
                    searchQuery: "",
                    subject: undefined,
                    educationLevel: undefined,
                    serviceCategory: undefined,
                  })
                }
              >
                Clear all filters
              </Button>
            )}
          </div>
        )}

        {filtered && filtered.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
