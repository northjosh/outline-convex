import type { ComponentType } from "react";

import {
  SubjBio,
  SubjBiz,
  SubjCS,
  SubjChem,
  SubjEcon,
  SubjEng,
  SubjFMath,
  SubjFr,
  SubjGeo,
  SubjHist,
  SubjICT,
  SubjLit,
  SubjMath,
  SubjPhys,
  SubjPsych,
  SubjSci,
} from "@/components/landing/illustrations";

const ICON_MAP: Record<string, { Icon: ComponentType; color: string }> = {
  math: { Icon: SubjMath, color: "#3080D0" },
  eng: { Icon: SubjEng, color: "#3080D0" },
  englit: { Icon: SubjLit, color: "#7C5CC4" },
  sci: { Icon: SubjSci, color: "#7C5CC4" },
  bio: { Icon: SubjBio, color: "#30A060" },
  chem: { Icon: SubjChem, color: "#7C5CC4" },
  phys: { Icon: SubjPhys, color: "#F0A030" },
  geo: { Icon: SubjGeo, color: "#30A060" },
  biz: { Icon: SubjBiz, color: "#F0A030" },
  econ: { Icon: SubjEcon, color: "#F0A030" },
  lit: { Icon: SubjLit, color: "#7C5CC4" },
  ict: { Icon: SubjICT, color: "#3080D0" },
  french: { Icon: SubjFr, color: "#E05040" },
  hist: { Icon: SubjHist, color: "#E05040" },
  fmath: { Icon: SubjFMath, color: "#3080D0" },
  psych: { Icon: SubjPsych, color: "#7C5CC4" },
  cs: { Icon: SubjCS, color: "#3080D0" },
};

export function SubjectIcon({ id }: { id: string }) {
  const entry = ICON_MAP[id];
  if (!entry) return null;
  const { Icon, color } = entry;
  return (
    <span
      className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md"
      style={{ background: `${color}12` }}
    >
      <Icon />
    </span>
  );
}
