"use client";
import type { Lang } from "../lib/types";

interface Props {
  lang: Lang;
  onChange: (l: Lang) => void;
}

export default function LanguageSwitcher({ lang, onChange }: Props) {
  return (
    <div className="flex gap-1">
      {(["sq", "tr"] as const).map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide transition-colors ${
            lang === l
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {l === "sq" ? "SQ" : "TR"}
        </button>
      ))}
    </div>
  );
}
