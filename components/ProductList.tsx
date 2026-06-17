"use client";
import { useState, useMemo } from "react";
import { LABELS, CAT_LABELS, getCategoryOrder } from "../lib/i18n";
import { PRODUCTS } from "../lib/data";
import type { Lang } from "../lib/types";
import ProductRow from "./ProductRow";

interface Props {
  lang: Lang;
  business: string;
  onChangeBusiness: () => void;
}

const ALL = "__all__";

export default function ProductList({ lang, business, onChangeBusiness }: Props) {
  const L = LABELS[lang];
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState(ALL);

  const order = useMemo(() => getCategoryOrder(business), [business]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.qty.toLowerCase().includes(q)
    );
  }, [search]);

  const grouped = useMemo(() => {
    const map: Record<string, typeof PRODUCTS> = {};
    for (const p of filtered) {
      if (!map[p.cat]) map[p.cat] = [];
      map[p.cat].push(p);
    }
    return map;
  }, [filtered]);

  const orderedCats = useMemo(
    () => order.filter((cat) => (grouped[cat]?.length ?? 0) > 0),
    [order, grouped]
  );

  const sections = useMemo(() => {
    const cats = activeCat === ALL ? orderedCats : orderedCats.filter((c) => c === activeCat);
    return cats.map((cat) => ({ cat, products: grouped[cat] ?? [] }));
  }, [activeCat, orderedCats, grouped]);

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <p className="text-xs text-gray-400">{L.offerFor}</p>
            <p className="text-sm font-bold leading-tight">{business}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-extrabold tracking-tight hidden sm:block">{L.brand}</span>
            <button
              onClick={onChangeBusiness}
              className="text-xs text-gray-500 underline underline-offset-2 hover:text-black transition-colors"
            >
              {L.change}
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 pb-2">
          <input
            type="search"
            placeholder={L.search}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setActiveCat(ALL);
            }}
            className="w-full rounded-xl bg-gray-100 px-4 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:bg-gray-50 focus:ring-1 focus:ring-gray-300 transition-all"
          />
        </div>

        {/* Category filter — horizontal scroll */}
        <div className="flex gap-2 overflow-x-auto px-4 pb-3 scrollbar-hide">
          <button
            onClick={() => setActiveCat(ALL)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeCat === ALL ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {L.all}
          </button>
          {orderedCats.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeCat === cat ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {CAT_LABELS[lang][cat] ?? cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product sections */}
      <div className="px-4 pb-20">
        {sections.length === 0 ? (
          <p className="mt-16 text-center text-sm text-gray-400">
            {L.noResults(search)}
          </p>
        ) : (
          sections.map(({ cat, products }) => (
            <section key={cat} className="mt-6 first:mt-4">
              <h2 className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                {CAT_LABELS[lang][cat] ?? cat}
              </h2>
              <div className="rounded-xl bg-white">
                {products.map((p) => (
                  <ProductRow key={p.id} product={p} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
