export const SUBJECTS_BY_LEVEL = {
  wassce: [
    { id: "math", label: "Mathematics" },
    { id: "eng", label: "English" },
    { id: "sci", label: "Int. Science" },
    { id: "bio", label: "Biology" },
    { id: "chem", label: "Chemistry" },
    { id: "phys", label: "Physics" },
    { id: "geo", label: "Geography" },
    { id: "biz", label: "Business" },
    { id: "econ", label: "Economics" },
    { id: "lit", label: "Literature" },
    { id: "ict", label: "ICT" },
    { id: "french", label: "French" },
  ],
  igcse: [
    { id: "math", label: "Mathematics" },
    { id: "eng", label: "English Lang." },
    { id: "englit", label: "English Lit." },
    { id: "bio", label: "Biology" },
    { id: "chem", label: "Chemistry" },
    { id: "phys", label: "Physics" },
    { id: "geo", label: "Geography" },
    { id: "biz", label: "Business" },
    { id: "econ", label: "Economics" },
    { id: "ict", label: "ICT" },
    { id: "french", label: "French" },
    { id: "hist", label: "History" },
  ],
  alevel: [
    { id: "math", label: "Mathematics" },
    { id: "fmath", label: "Further Maths" },
    { id: "bio", label: "Biology" },
    { id: "chem", label: "Chemistry" },
    { id: "phys", label: "Physics" },
    { id: "econ", label: "Economics" },
    { id: "biz", label: "Business" },
    { id: "eng", label: "English Lit." },
    { id: "geo", label: "Geography" },
    { id: "psych", label: "Psychology" },
    { id: "cs", label: "Computer Sci." },
    { id: "french", label: "French" },
  ],
} as const;

export type EducationLevel = keyof typeof SUBJECTS_BY_LEVEL;

export const LEVEL_LABELS: Record<EducationLevel, string> = {
  wassce: "WASSCE",
  igcse: "Cambridge IGCSE",
  alevel: "Cambridge A-Level",
};

export const EXAM_DATE_OPTIONS = [
  {
    id: "jun2026" as const,
    label: "June 2026",
    sub: "About 4 months away",
    urgency: "Let's get moving!",
  },
  {
    id: "nov2026" as const,
    label: "November 2026",
    sub: "About 9 months away",
    urgency: "Good — plenty of time to prepare",
  },
  {
    id: "exploring" as const,
    label: "Just exploring",
    sub: "No exam date yet",
    urgency: "No pressure",
  },
];
