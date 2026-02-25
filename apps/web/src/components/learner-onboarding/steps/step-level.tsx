import { useState } from "react";

import type { EducationLevel } from "../data";
import type { OnboardingData } from "../wizard";

interface StepLevelProps {
  data: OnboardingData;
  setData: (data: OnboardingData) => void;
  onNext: () => void;
}

const levels: {
  id: EducationLevel;
  label: string;
  sub: string;
}[] = [
  {
    id: "wassce",
    label: "WASSCE",
    sub: "West African Senior School Certificate",
  },
  {
    id: "igcse",
    label: "Cambridge IGCSE",
    sub: "International General Certificate",
  },
  { id: "alevel", label: "Cambridge A-Level", sub: "Advanced Level" },
];

export default function StepLevel({ data, setData, onNext }: StepLevelProps) {
  const [selected, setSelected] = useState<EducationLevel | undefined>(data.level);

  const handleSelect = (level: EducationLevel) => {
    setSelected(level);
    setData({ ...data, level, subjects: [] }); // reset subjects when level changes
    setTimeout(() => onNext(), 350);
  };

  return (
    <div className="animate-[slide-up_0.4s_ease] text-center">
      <h2 className="font-display text-foreground text-[28px] font-semibold">
        What are you studying?
      </h2>
      <p className="text-muted-foreground mt-2 mb-9 text-base leading-relaxed">
        Pick your exam level so we can match you with the right educators.
      </p>

      <div className="mx-auto flex max-w-[400px] flex-col gap-3">
        {levels.map(({ id, label, sub }) => (
          <button
            key={id}
            type="button"
            onClick={() => handleSelect(id)}
            className={`push-shadow cursor-pointer rounded-xl border-2 px-6 py-5 text-left transition-all ${
              selected === id
                ? "border-primary bg-primary/10 push-shadow-primary"
                : "border-border bg-card"
            }`}
          >
            <span className="text-foreground text-base font-semibold">{label}</span>
            <span className="text-muted-foreground mt-0.5 block text-[13px]">{sub}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
