import { useState } from "react";

import { OnbCheckCircle, OnbShield } from "@/components/landing/illustrations";

import type { OnboardingData } from "../wizard";

interface StepAgeProps {
  data: OnboardingData;
  setData: (data: OnboardingData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepAge({ data, setData, onNext, onBack }: StepAgeProps) {
  const [selected, setSelected] = useState<boolean | undefined>(data.isMinor);

  const handleSelect = (val: boolean) => {
    setSelected(val);
    setData({ ...data, isMinor: val });
    setTimeout(() => onNext(), 400);
  };

  const options = [
    { val: true, label: "Yes, I'm under 18", icon: <OnbShield /> },
    { val: false, label: "No, I'm 18+", icon: <OnbCheckCircle /> },
  ] as const;

  return (
    <div className="animate-[slide-up_0.4s_ease] text-center">
      <h2 className="font-display text-foreground text-[28px] font-semibold">Are you under 18?</h2>
      <p className="text-muted-foreground mt-2 mb-10 text-base leading-relaxed">
        Just so we know — we keep things safe for everyone.
      </p>

      <div className="mx-auto flex max-w-[320px] gap-4">
        {options.map(({ val, label, icon }) => (
          <button
            key={String(val)}
            type="button"
            onClick={() => handleSelect(val)}
            className={`push-shadow flex flex-1 cursor-pointer flex-col items-center gap-2 rounded-xl border-2 px-4 py-6 text-[15px] font-medium transition-all ${
              selected === val
                ? "border-primary bg-primary/10 push-shadow-primary"
                : "border-border bg-card"
            }`}
          >
            <span className="flex h-10 w-10 items-center justify-center">{icon}</span>
            {label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onBack}
        className="text-muted-foreground hover:text-foreground mt-8 cursor-pointer text-sm transition-colors"
      >
        ← Back
      </button>
    </div>
  );
}
