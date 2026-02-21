const ghsCurrencyFormatter = new Intl.NumberFormat("en-GH", {
  style: "currency",
  currency: "GHS",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const priceUnitSuffix: Record<string, string> = {
  per_hour: "/hr",
  per_session: "/session",
  flat: "",
};

export function formatPrice(price: number, priceUnit: "per_hour" | "per_session" | "flat"): string {
  return `${ghsCurrencyFormatter.format(price)}${priceUnitSuffix[priceUnit]}`;
}
