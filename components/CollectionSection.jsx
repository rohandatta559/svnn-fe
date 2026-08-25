"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProductImage from "@/components/ProductImage";

const categories = ["All", "Eclairs", "Jellies", "Candies", "Lollipops", "Chocolate", "Wafers"];

const sorts = {
  featured: (a, b) => (b.isFeatured === true) - (a.isFeatured === true),
  "name-asc": (a, b) => a.name.localeCompare(b.name),
  newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
};

export default function CollectionSection({ products }) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    let list = products;
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    return [...list].sort(sorts[sort] || sorts.featured);
  }, [products, category, search, sort]);

  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="tracked-mono mb-3 text-xs uppercase text-brand-red">The TruKid Collection</p>
            <h2 className="font-display text-4xl leading-[1.1] text-choco md:text-5xl">
              Find your kind
              <br />
              <em className="italic text-brand-red">of delicious.</em>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-muted md:text-right">
            {products.length} pieces of confectionery curiosity, made for every kind of day.
          </p>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-[200px_1fr]">
          <Reveal>
            <p className="tracked-mono mb-4 text-xs uppercase text-brand-red">Browse by Category</p>
            <div className="flex flex-row flex-wrap gap-1 md:flex-col">
              {categories.map((cat) => {
                const active = category === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors ${
                      active ? "bg-white text-choco shadow-sm" : "text-muted hover:text-choco"
                    }`}
                  >
                    {cat}
                    {active && <span className="ml-2 text-brand-red">✓</span>}
                  </button>
                );
              })}
            </div>
            <div className="my-6 hidden border-t border-choco/10 md:block" />
            <p className="hidden font-display text-lg italic leading-tight text-choco/60 md:block">
              Small batch.
              <br />
              Big feeling.
            </p>
          </Reveal>

          <div>
            <div className="mb-6 flex flex-col gap-4 border-b border-choco/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-xs">
                <svg
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-choco/40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" strokeLinecap="round" />
                </svg>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search treats, flavour…"
                  className="w-full rounded-full border border-choco/15 bg-white py-2.5 pl-10 pr-4 text-sm text-choco outline-none focus:ring-2 focus:ring-brand-red"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="tracked-mono text-[11px] uppercase text-choco/50">
                  {filtered.length} / {products.length} Pieces
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="rounded-full border border-choco/15 bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-choco outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="name-asc">Name A–Z</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <p className="py-16 text-center text-sm text-muted">No treats match that search.</p>
            ) : (
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p) => (
                  <Link key={p._id} href={`/products/${p.slug}`} className="group block">
                    <div className="relative aspect-square overflow-hidden rounded-2xl">
                      <ProductImage
                        src={p.image}
                        alt={p.name}
                        category={p.category}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {p.isFeatured && (
                        <span className="absolute left-3 top-3 rounded-full bg-brand-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-choco shadow-sm">
                          Featured
                        </span>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-choco/0 opacity-0 transition-all duration-300 group-hover:bg-choco/45 group-hover:opacity-100">
                        <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-choco">
                          View Details →
                        </span>
                      </div>
                    </div>
                    <p className="tracked-mono mt-3 text-[10px] uppercase text-brand-red">
                      {p.category}
                      {p.weight ? ` / ${p.weight}` : ""}
                    </p>
                    <h3 className="mt-1 font-display text-lg text-choco">{p.name}</h3>
                    <p className="mt-0.5 line-clamp-1 text-sm text-muted">{p.shortDescription}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
