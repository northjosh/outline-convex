import { type ReactNode, useState } from "react";

import {
  SubjBio,
  SubjBiz,
  SubjChem,
  SubjEcon,
  SubjEng,
  SubjFr,
  SubjGeo,
  SubjICT,
  SubjLit,
  SubjMath,
  SubjPhys,
  SubjSci,
} from "./illustrations";

function SubjectPill({ icon, label, color }: { icon: ReactNode; label: string; color: string }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      type="button"
      className="card-depth bg-card border-border flex cursor-default items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-[transform,box-shadow] duration-75"
      style={{
        transform: pressed ? "translateY(2px)" : undefined,
        boxShadow: pressed ? `0 1px 0 0 ${color}18` : undefined,
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
    >
      <span
        className="flex h-[26px] w-[26px] items-center justify-center rounded-md"
        style={{ background: `${color}12` }}
      >
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
}

const SUBJECTS = [
  { icon: <SubjMath />, label: "Mathematics", color: "#3080D0" },
  { icon: <SubjChem />, label: "Chemistry", color: "#7C5CC4" },
  { icon: <SubjPhys />, label: "Physics", color: "#F0A030" },
  { icon: <SubjBio />, label: "Biology", color: "#30A060" },
  { icon: <SubjEng />, label: "English Language", color: "#3080D0" },
  { icon: <SubjLit />, label: "Literature", color: "#7C5CC4" },
  { icon: <SubjBiz />, label: "Business Studies", color: "#F0A030" },
  { icon: <SubjGeo />, label: "Geography", color: "#30A060" },
  { icon: <SubjICT />, label: "ICT", color: "#3080D0" },
  { icon: <SubjFr />, label: "French", color: "#E05040" },
  { icon: <SubjSci />, label: "Integrated Science", color: "#7C5CC4" },
  { icon: <SubjEcon />, label: "Economics", color: "#F0A030" },
] as const;

export function SubjectsSection() {
  return (
    <section className="mx-auto max-w-[1100px] px-6 pb-16">
      <div className="mb-7 text-center">
        <div className="text-[11px] font-semibold tracking-[1.2px] text-amber-700 uppercase mb-2">
          Subjects
        </div>
        <h2 className="font-display text-[28px] font-bold tracking-tight">
          Whatever you're studying, we've got you
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-2.5">
        {SUBJECTS.map((s) => (
          <SubjectPill key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
