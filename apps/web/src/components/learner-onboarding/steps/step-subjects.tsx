import { Button } from "@/components/ui/button";

import { LEVEL_LABELS, SUBJECTS_BY_LEVEL } from "../data";
import { SubjectIcon } from "../subject-icons";
import type { OnboardingData } from "../wizard";

interface StepSubjectsProps {
  data: OnboardingData;
  setData: (data: OnboardingData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepSubjects({ data, setData, onNext, onBack }: StepSubjectsProps) {
  const subjects = data.level ? SUBJECTS_BY_LEVEL[data.level] : [];
  const selected = data.subjects;

  const toggle = (id: string) => {
    const next = selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id];
    setData({ ...data, subjects: next });
  };

  return (
    <div className="animate-[slide-up_0.4s_ease] text-center">
      <h2 className="font-display text-foreground text-[28px] font-semibold">
        What subjects do you need help with?
      </h2>
      <p className="text-muted-foreground mt-2 mb-2 text-base leading-relaxed">
        Pick as many as you like — you can always change these later.
      </p>
      {data.level && (
        <p className="text-primary mb-7 text-sm font-medium">{LEVEL_LABELS[data.level]} subjects</p>
      )}

      <div className="mx-auto mb-8 flex max-w-[460px] flex-wrap justify-center gap-2.5">
        {subjects.map(({ id, label }) => {
          const isOn = selected.includes(id);
          return (
            <button
              key={id}
              type="button"
              onClick={() => toggle(id)}
              className={`flex cursor-pointer items-center gap-1.5 rounded-full border-2 px-[18px] py-2.5 text-sm font-medium transition-all ${
                isOn
                  ? "border-primary bg-primary/10 text-primary scale-[1.04]"
                  : "border-border bg-card text-foreground"
              }`}
            >
              <SubjectIcon id={id} />
              {label}
              {isOn && <span className="ml-0.5 text-sm">&#10003;</span>}
            </button>
          );
        })}
      </div>

      {selected.length > 0 && (
        <p className="text-muted-foreground mb-5 text-sm">
          {selected.length} subject{selected.length !== 1 ? "s" : ""} selected
        </p>
      )}

      <div className="flex justify-center gap-3">
        <Button variant="outline" onClick={onBack} className="push-shadow">
          &larr; Back
        </Button>
        <Button onClick={onNext} disabled={selected.length === 0} className="push-shadow-primary">
          Continue &rarr;
        </Button>
      </div>
    </div>
  );
}
