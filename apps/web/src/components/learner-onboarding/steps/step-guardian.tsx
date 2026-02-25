import { useState } from "react";

import { OnbInfo } from "@/components/landing/illustrations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { OnboardingData } from "../wizard";

interface StepGuardianProps {
  data: OnboardingData;
  setData: (data: OnboardingData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepGuardian({ data, setData, onNext, onBack }: StepGuardianProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.guardianName?.trim()) e.guardianName = "Required";
    if (!data.guardianPhone?.trim()) e.guardianPhone = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div className="animate-[slide-up_0.4s_ease]">
      <h2 className="font-display text-foreground text-center text-[28px] font-semibold">
        Parent or guardian details
      </h2>
      <p className="text-muted-foreground mt-2 mb-8 text-center text-base leading-relaxed">
        We&apos;ll send them a quick SMS to verify before your first session. No spam, promise.
      </p>

      {/* Info callout */}
      <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-blue-200 bg-blue-50 p-3.5 dark:border-blue-900 dark:bg-blue-950/30">
        <span className="mt-0.5 shrink-0">
          <OnbInfo />
        </span>
        <p className="text-foreground text-sm leading-relaxed">
          We only contact your parent/guardian once to confirm your account. They won&apos;t be able
          to see your sessions or messages.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="guardianName">Parent/Guardian&apos;s name</Label>
          <Input
            id="guardianName"
            value={data.guardianName ?? ""}
            onChange={(e) => setData({ ...data, guardianName: e.target.value })}
            placeholder="e.g. Abena Mensah"
            className="mt-1.5"
          />
          {errors.guardianName && (
            <p className="text-destructive mt-1 text-sm">{errors.guardianName}</p>
          )}
        </div>

        <div>
          <Label htmlFor="guardianPhone">Their phone number</Label>
          <Input
            id="guardianPhone"
            type="tel"
            value={data.guardianPhone ?? ""}
            onChange={(e) => setData({ ...data, guardianPhone: e.target.value })}
            placeholder="+233 XX XXX XXXX"
            className="mt-1.5"
          />
          {errors.guardianPhone ? (
            <p className="text-destructive mt-1 text-sm">{errors.guardianPhone}</p>
          ) : (
            <p className="text-muted-foreground mt-1 text-sm">
              We&apos;ll send a one-time verification SMS
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button variant="outline" onClick={onBack} className="push-shadow">
          &larr; Back
        </Button>
        <Button onClick={() => validate() && onNext()} className="push-shadow-primary flex-1">
          Continue &rarr;
        </Button>
      </div>
    </div>
  );
}
