"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const categories = ["All", "Eclairs", "Jellies", "Candies", "Lollipops", "Chocolate", "Wafers"];

export default function CategoryFilter({ active }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function setCategory(cat) {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "All") params.delete("category");
    else params.set("category", cat);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
            active === cat
              ? "bg-brand-red text-white"
              : "border border-choco/15 bg-white text-choco hover:border-brand-red/40"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
