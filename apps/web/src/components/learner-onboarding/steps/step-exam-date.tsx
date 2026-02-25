import type { ReactNode } from "react";
import { useState } from "react";

import { OnbCalendar, OnbExplore, OnbFlame } from "@/components/landing/illustrations";

import { EXAM_DATE_OPTIONS } from "../data";
import type { OnboardingData } from "../wizard";

interface StepExamDateProps {
  data: OnboardingData;
  setData: (data: OnboardingData) => void;
  onNext: () => void;
}

export default function StepExamDate({ data, setData, onNext }: StepExamDateProps) {
  const [selected, setSelected] = useState<OnboardingData["examDate"] | undefined>(data.examDate);

  const EXAM_ICONS: Record<string, ReactNode> = {
    jun2026: <OnbFlame />,
    nov2026: <OnbCalendar />,
    exploring: <OnbExplore />,
  };

  const handleSelect = (val: OnboardingData["examDate"]) => {
    setSelected(val);
    setData({ ...data, examDate: val });
    setTimeout(() => onNext(), 350);
  };

  return (
    <div className="animate-[slide-up_0.4s_ease] text-center">
      <h2 className="font-display text-foreground text-[28px] font-semibold">
        When&apos;s your exam?
      </h2>
      <p className="text-muted-foreground mt-2 mb-9 text-base leading-relaxed">
        Don&apos;t stress — knowing this helps us get you ready on time.
      </p>

      <div className="mx-auto flex max-w-[380px] flex-col gap-3">
        {EXAM_DATE_OPTIONS.map(({ id, label, sub, urgency }) => (
          <button
            key={id}
            type="button"
            onClick={() => handleSelect(id)}
            className={`push-shadow flex cursor-pointer items-center gap-3.5 rounded-xl border-2 px-6 py-5 text-left transition-all ${
              selected === id
                ? "border-primary bg-primary/10 push-shadow-primary"
                : "border-border bg-card"
            }`}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center">
              {EXAM_ICONS[id]}
            </span>
            <div>
              <span className="text-foreground text-base font-semibold">{label}</span>
              <span className="text-muted-foreground mt-0.5 block text-[13px]">
                {sub} &mdash; {urgency}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
