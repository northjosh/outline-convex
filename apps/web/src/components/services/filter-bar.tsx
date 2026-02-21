import {
  EDUCATION_LEVELS,
  SERVICE_CATEGORIES,
  SUBJECTS,
} from "@outline-convex/backend/convex/lib/constants";
import { Search, X } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";

export interface FilterState {
  searchQuery: string;
  subject: string | undefined;
  educationLevel: string | undefined;
  serviceCategory: string | undefined;
}

interface FilterBarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function FilterBar({ filters, onFiltersChange }: FilterBarProps) {
  const activeCount =
    (filters.subject ? 1 : 0) +
    (filters.educationLevel ? 1 : 0) +
    (filters.serviceCategory ? 1 : 0);

  const clearAll = () =>
    onFiltersChange({
      searchQuery: filters.searchQuery,
      subject: undefined,
      educationLevel: undefined,
      serviceCategory: undefined,
    });

  return (
    <div data-slot="filter-bar" className="flex flex-col gap-3">
      {/* Search */}
      <div className="relative">
        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
        <Input
          placeholder="Search services..."
          value={filters.searchQuery}
          onChange={(e) => onFiltersChange({ ...filters, searchQuery: e.target.value })}
          className="pl-8"
        />
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mb-1">
        <FilterPill
          label="Subject"
          value={filters.subject}
          options={SUBJECTS.map((s) => ({ value: s, label: s }))}
          onSelect={(value) => onFiltersChange({ ...filters, subject: value })}
          onClear={() => onFiltersChange({ ...filters, subject: undefined })}
        />
        <FilterPill
          label="Level"
          value={filters.educationLevel}
          options={EDUCATION_LEVELS.map((l) => ({ value: l, label: l }))}
          onSelect={(value) => onFiltersChange({ ...filters, educationLevel: value })}
          onClear={() => onFiltersChange({ ...filters, educationLevel: undefined })}
        />
        <FilterPill
          label="Category"
          value={filters.serviceCategory}
          options={SERVICE_CATEGORIES.map((c) => ({
            value: c.value,
            label: c.label,
          }))}
          onSelect={(value) => onFiltersChange({ ...filters, serviceCategory: value })}
          onClear={() => onFiltersChange({ ...filters, serviceCategory: undefined })}
        />

        {activeCount > 0 && (
          <Button
            variant="ghost"
            size="xs"
            onClick={clearAll}
            className="shrink-0 text-muted-foreground"
          >
            Clear all
            <X className="size-3" />
          </Button>
        )}
      </div>
    </div>
  );
}

function FilterPill({
  label,
  value,
  options,
  onSelect,
  onClear,
}: {
  label: string;
  value: string | undefined;
  options: { value: string; label: string }[];
  onSelect: (value: string) => void;
  onClear: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant={value ? "default" : "outline"}
          size="sm"
          className={cn("shrink-0 gap-1", value && "pr-1.5")}
        >
          {value || label}
          {value && (
            <span
              role="button"
              tabIndex={0}
              aria-label={`Clear ${label} filter`}
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                  onClear();
                }
              }}
              className="hover:bg-primary-foreground/20 ml-0.5 inline-flex items-center justify-center rounded-none p-0.5"
            >
              <X className="size-3" />
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-60 overflow-y-auto">
        {options.map((option) => (
          <DropdownMenuItem key={option.value} onClick={() => onSelect(option.value)}>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
