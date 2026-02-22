import type { ServiceCategoryValue } from "@outline-convex/backend/convex/lib/constants";
import type { IconSvgElement } from "@hugeicons/react";

import { File01Icon, Message01Icon, Video01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";

const categoryConfig: Record<
  ServiceCategoryValue,
  { label: string; icon: IconSvgElement; className: string }
> = {
  live_session: {
    label: "Live Session",
    icon: Video01Icon,
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  },
  digital_product: {
    label: "Digital Product",
    icon: File01Icon,
    className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  },
  custom_request: {
    label: "Custom Request",
    icon: Message01Icon,
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

  return (
    <span
      data-slot="category-badge"
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium",
        config.className,
        className,
      )}
    >
      <HugeiconsIcon icon={config.icon} size={12} />
      {config.label}
    </span>
  );
}
