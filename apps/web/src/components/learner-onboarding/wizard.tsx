import { useState } from "react";

import StepAge from "./steps/step-age";
import StepDone from "./steps/step-done";
import StepExamDate from "./steps/step-exam-date";
import StepGuardian from "./steps/step-guardian";
import StepLevel from "./steps/step-level";
import StepPhoto from "./steps/step-photo";
import StepSubjects from "./steps/step-subjects";

import type { EducationLevel } from "./data";

export interface OnboardingData {
  isMinor?: boolean;
  guardianName?: string;
  guardianPhone?: string;
  level?: EducationLevel;
  subjects: string[];
  examDate?: "jun2026" | "nov2026" | "exploring";
}

type StepKey = "age" | "guardian" | "level" | "subjects" | "examDate" | "photo" | "done";

function getSteps(data: OnboardingData): StepKey[] {
  const steps: StepKey[] = ["level", "subjects", "examDate", "photo", "age"];
  if (data.isMinor === true) steps.push("guardian");
  steps.push("done");
  return steps;
}

function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-8 flex justify-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`h-2.5 rounded-full transition-all duration-300 ${
            i === current
              ? "bg-primary w-8"
              : i < current
                ? "bg-primary/40 w-2.5"
                : "bg-border w-2.5"
          }`}
        />
      ))}
    </div>
  );
}

export default function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({ subjects: [] });

  const steps = getSteps(data);
  const currentKey = steps[step];
  const wizardSteps = steps.filter((s) => s !== "done");
  const totalDots = wizardSteps.length;
  const currentDot = Math.min(step, totalDots - 1);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const stepProps = { data, setData, onNext: next, onBack: back };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-5 py-10">
      {/* Logo */}
      <div className="mb-6 animate-[fade-in_0.3s_ease]">
        <span className="font-display text-foreground text-2xl font-bold tracking-tight">
          Outline
        </span>
      </div>

      {/* Card */}
      <div className="bg-card w-full max-w-[480px] rounded-2xl px-9 py-10 shadow-lg">
        {currentKey !== "done" && <ProgressDots current={currentDot} total={totalDots} />}

        <div key={currentKey}>
          {currentKey === "age" && <StepAge {...stepProps} />}
          {currentKey === "guardian" && <StepGuardian {...stepProps} />}
          {currentKey === "level" && <StepLevel {...stepProps} />}
          {currentKey === "subjects" && <StepSubjects {...stepProps} />}
          {currentKey === "examDate" && <StepExamDate {...stepProps} />}
          {currentKey === "photo" && <StepPhoto {...stepProps} />}
          {currentKey === "done" && <StepDone data={data} />}
        </div>
      </div>
    </div>
  );
}
