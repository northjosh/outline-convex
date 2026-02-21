export const SUBJECTS = [
  "Mathematics",
  "English Language",
  "Integrated Science",
  "Social Studies",
  "Elective Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Economics",
  "Accounting",
  "Business Management",
  "Government",
  "History",
  "Geography",
  "French",
  "Literature in English",
  "ICT",
] as const;

export const EDUCATION_LEVELS = [
  "WASSCE",
  "Cambridge IGCSE",
  "Cambridge AS Level",
  "Cambridge A Level",
] as const;

export const SERVICE_CATEGORIES = [
  { value: "live_session", label: "Live Session" },
  { value: "digital_product", label: "Digital Product" },
  { value: "custom_request", label: "Custom Request" },
] as const;

export const PRICE_UNIT_LABELS = {
  per_hour: "/hr",
  per_session: "/session",
  flat: "",
} as const;

export type Subject = (typeof SUBJECTS)[number];
export type EducationLevel = (typeof EDUCATION_LEVELS)[number];
export type ServiceCategoryValue = (typeof SERVICE_CATEGORIES)[number]["value"];
export type PriceUnit = keyof typeof PRICE_UNIT_LABELS;
