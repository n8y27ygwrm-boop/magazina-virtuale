"use client";
import { useState } from "react";
import type { Lang } from "../lib/types";
import Splash from "./Splash";
import ProductList from "./ProductList";

export default function CatalogApp() {
  const [lang, setLang] = useState<Lang>("sq");
  const [business, setBusiness] = useState<string | null>(null);

  if (!business) {
    return (
      <Splash
        lang={lang}
        onLangChange={setLang}
        onSelect={setBusiness}
      />
    );
  }

  return (
    <ProductList
      lang={lang}
      business={business}
      onChangeBusiness={() => setBusiness(null)}
    />
  );
}
