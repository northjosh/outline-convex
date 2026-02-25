import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";

interface StepPhotoProps {
  onNext: () => void;
  onBack: () => void;
}

export default function StepPhoto({ onNext, onBack }: StepPhotoProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <div className="animate-[slide-up_0.4s_ease] text-center">
      <h2 className="font-display text-foreground text-[28px] font-semibold">
        Add a profile photo
      </h2>
      <p className="text-muted-foreground mt-2 mb-9 text-base leading-relaxed">
        Totally optional — but educators like knowing who they&apos;re helping.
      </p>

      {/* Avatar circle */}
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className={`mx-auto mb-3 flex h-[120px] w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-full border-[3px] border-dashed transition-colors ${
          preview ? "border-primary" : "border-border hover:border-primary bg-muted"
        }`}
        style={
          preview
            ? {
                backgroundImage: `url(${preview})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        {!preview && (
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground"
          >
            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        )}
      </button>

      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />

      {preview && (
        <button
          type="button"
          onClick={() => setPreview(null)}
          className="text-muted-foreground mb-2 cursor-pointer bg-transparent text-[13px] underline"
        >
          Remove
        </button>
      )}

      <p className="text-muted-foreground mt-2 mb-8 text-[13px]">JPG or PNG, max 5 MB</p>

      <div className="flex justify-center gap-3">
        <Button variant="outline" onClick={onBack} className="push-shadow">
          &larr; Back
        </Button>
        <Button onClick={onNext} className="push-shadow-primary">
          {preview ? "Looks good \u2192" : "Skip for now \u2192"}
        </Button>
      </div>
    </div>
  );
}
