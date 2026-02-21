import type { ServiceCategoryValue } from "@outline-convex/backend/convex/lib/constants";

import { FileText, MessageSquare, Video } from "lucide-react";

import { cn } from "@/lib/utils";

const categoryConfig: Record<
  ServiceCategoryValue,
  { label: string; icon: typeof Video; className: string }
> = {
  live_session: {
    label: "Live Session",
    icon: Video,
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  },
  digital_product: {
    label: "Digital Product",
    icon: FileText,
    className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  },
  custom_request: {
    label: "Custom Request",
    icon: MessageSquare,
    className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  },
};

export function CategoryBadge({
  category,
  className,
}: {
  category: ServiceCategoryValue;
  className?: string;
}) {
  const config = categoryConfig[category];
  const Icon = config.icon;

  return (
    <span
      data-slot="category-badge"
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium",
        config.className,
        className,
      )}
    >
      <Icon className="size-3" />
      {config.label}
    </span>
  );
}
