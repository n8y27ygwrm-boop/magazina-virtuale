"use client";
import { LABELS } from "../lib/i18n";
import type { Lang } from "../lib/types";
import LanguageSwitcher from "./LanguageSwitcher";

interface Props {
  lang: Lang;
  onLangChange: (l: Lang) => void;
  onSelect: (business: string) => void;
}

export default function Splash({ lang, onLangChange, onSelect }: Props) {
  const L = LABELS[lang];
  return (
    <div className="min-h-screen flex flex-col items-center bg-white px-4 py-8">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-10">
          <span className="text-base font-extrabold tracking-tight">{L.brand}</span>
          <LanguageSwitcher lang={lang} onChange={onLangChange} />
        </div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 leading-tight">{L.welcome}</h1>
          <p className="text-sm text-gray-500 leading-relaxed">{L.subtitle}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {(L.businesses as readonly string[]).map((b) => (
            <button
              key={b}
              onClick={() => onSelect(b)}
              className="rounded-2xl border border-gray-200 bg-gray-50 py-7 text-center text-sm font-semibold text-gray-900 hover:bg-black hover:text-white hover:border-black transition-all active:scale-95"
            >
              {b}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
