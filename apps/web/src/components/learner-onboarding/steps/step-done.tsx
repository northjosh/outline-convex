import { useEffect, useRef, useState } from "react";

import { OnbCelebrate, OnbHourglass } from "@/components/landing/illustrations";
import { Button } from "@/components/ui/button";
import { api } from "@outline-convex/backend/convex/_generated/api";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "convex/react";

import { LEVEL_LABELS } from "../data";
import type { OnboardingData } from "../wizard";

interface StepDoneProps {
  data: OnboardingData;
}

export default function StepDone({ data }: StepDoneProps) {
  const navigate = useNavigate();
  const completeOnboarding = useMutation(api.learnerProfiles.completeOnboarding);
  const [saving, setSaving] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const didSave = useRef(false);

  useEffect(() => {
    if (didSave.current) return;
    didSave.current = true;

    const save = async () => {
      try {
        await completeOnboarding({
          isMinor: data.isMinor ?? false,
          guardianName: data.guardianName,
          guardianPhone: data.guardianPhone,
          educationLevel: data.level!,
          subjects: data.subjects,
          examDate: data.examDate!,
        });
        setSaving(false);
      } catch {
        setError("Something went wrong. Please try again.");
        setSaving(false);
      }
    };

    save();
  }, [completeOnboarding, data]);

  const [showPulse, setShowPulse] = useState(false);
  useEffect(() => {
    if (!saving) setShowPulse(true);
  }, [saving]);

  const examLabel =
    data.examDate === "jun2026"
      ? "Exam: June 2026"
      : data.examDate === "nov2026"
        ? "Exam: November 2026"
        : "Exploring";

  if (error) {
    return (
      <div className="animate-[scale-in_0.5s_ease] py-5 text-center">
        <p className="text-destructive mb-4 text-base">{error}</p>
        <Button
          onClick={() => {
            setError(null);
            setSaving(true);
            didSave.current = false;
          }}
          className="push-shadow-primary"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-[scale-in_0.5s_ease] py-5 text-center">
      {/* Celebration icon */}
      <div
        className={`bg-emerald-100 dark:bg-emerald-950/30 mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full ${
          showPulse ? "animate-[gentle-pulse_2s_ease_infinite]" : ""
        }`}
      >
        {saving ? <OnbHourglass /> : <OnbCelebrate />}
      </div>

      <h2 className="font-display text-foreground text-[32px] font-bold">
        {saving ? "Saving..." : "You\u2019re in!"}
      </h2>
      <p className="text-muted-foreground mt-2 mb-8 text-[17px] leading-relaxed">
        {saving
          ? "Setting up your profile..."
          : "Your account is ready. Time to find an educator and start crushing it."}
      </p>

      {/* Summary card */}
      {!saving && (
        <div className="bg-muted mx-auto mb-7 max-w-[340px] rounded-xl p-5 text-left">
          <p className="text-muted-foreground mb-3 text-sm font-medium">Your setup:</p>
          <div className="flex flex-col gap-2">
            <div className="text-foreground flex items-center gap-2 text-sm">
              <span className="text-emerald-600">&#10003;</span>
              {data.level ? LEVEL_LABELS[data.level] : "\u2014"}
            </div>
            <div className="text-foreground flex items-center gap-2 text-sm">
              <span className="text-emerald-600">&#10003;</span>
              {data.subjects.length} subject
              {data.subjects.length !== 1 ? "s" : ""} selected
            </div>
            <div className="text-foreground flex items-center gap-2 text-sm">
              <span className="text-emerald-600">&#10003;</span>
              {examLabel}
            </div>
            {data.isMinor && (
              <div className="text-foreground flex items-center gap-2 text-sm">
                <span className="text-blue-500">&#8505;&#65039;</span>
                Guardian verification at first booking
              </div>
            )}
          </div>
        </div>
      )}

      {!saving && (
        <Button
          onClick={() => navigate({ to: "/dashboard" })}
          className="push-shadow-primary"
          size="lg"
        >
          Browse educators &rarr;
        </Button>
      )}
    </div>
  );
}
