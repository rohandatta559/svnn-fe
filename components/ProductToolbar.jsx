"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function ProductToolbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParam(key, value) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <input
        type="search"
        placeholder="Search products…"
        defaultValue={searchParams.get("search") || ""}
        onChange={(e) => updateParam("search", e.target.value)}
        className="w-full rounded-full border border-choco/15 bg-white px-4 py-2 text-sm text-choco outline-none focus:ring-2 focus:ring-brand-red sm:max-w-xs"
      />
      <select
        defaultValue={searchParams.get("sort") || "name-asc"}
        onChange={(e) => updateParam("sort", e.target.value)}
        className="w-full rounded-full border border-choco/15 bg-white px-4 py-2 text-sm text-choco outline-none focus:ring-2 focus:ring-brand-red sm:w-auto"
      >
        <option value="name-asc">Name: A–Z</option>
        <option value="name-desc">Name: Z–A</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  );
}
