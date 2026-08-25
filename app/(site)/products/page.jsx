import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import ProductToolbar from "@/components/ProductToolbar";
import Reveal from "@/components/Reveal";

export const metadata = { title: "Our Products | TruKid" };

export default async function ProductsPage({ searchParams }) {
  const { category, search, sort, page = "1" } = await searchParams;
  let data = { products: [], totalPages: 1, total: 0 };
  let loadError = false;

  try {
    data = await getProducts({
      category,
      search,
      sort: sort || "name-asc",
      page: Number(page),
    });
  } catch {
    loadError = true;
  }

  const { products = [], totalPages = 1, total = 0 } = data;
  const activeCategory = category || "All";

  return (
    <>
      <section className="relative overflow-hidden bg-cream px-6 py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_24%,rgba(193,39,45,0.10),transparent_32%),radial-gradient(circle_at_86%_20%,rgba(217,164,65,0.18),transparent_34%)]" />
        <Reveal className="relative mx-auto max-w-3xl text-center">
          <p className="tracked-mono mb-4 text-xs uppercase text-brand-red">Product Catalog</p>
          <h1 className="font-display text-5xl leading-tight text-choco md:text-6xl">
            All our sweets
          </h1>
          <p className="mt-6 text-base leading-8 text-muted md:text-lg">
            {total} product{total === 1 ? "" : "s"} available — filter by category, search by name.
          </p>
        </Reveal>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal className="mb-8 rounded-3xl border border-choco/10 bg-white p-4 shadow-sm md:p-6">
          <CategoryFilter active={activeCategory} />
          <div className="mt-4 flex flex-col gap-3 border-t border-choco/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="tracked-mono text-[11px] uppercase text-choco/50">
              {total} / {total} Pieces
            </p>
            <ProductToolbar />
          </div>
        </Reveal>

        {loadError ? (
          <Reveal className="mx-auto max-w-xl rounded-3xl border border-brand-red/20 bg-brand-red/5 px-8 py-12 text-center">
            <h2 className="mb-3 font-display text-2xl font-semibold text-choco">
              Couldn't load products
            </h2>
            <p className="text-sm leading-7 text-choco/60">
              Make sure the backend server is running, then refresh this page.
            </p>
          </Reveal>
        ) : products.length === 0 ? (
          <Reveal className="py-16 text-center">
            <p className="text-base text-choco/60">No products found. Try a different search or category.</p>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-16 flex justify-center gap-3">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <a
                key={n}
                href={`/products?${new URLSearchParams({
                  ...(category ? { category } : {}),
                  ...(search ? { search } : {}),
                  ...(sort ? { sort } : {}),
                  page: String(n),
                }).toString()}`}
                className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  Number(page) === n
                    ? "bg-brand-red text-white"
                    : "border border-choco/10 bg-white text-choco hover:border-brand-red/30"
                }`}
              >
                {n}
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
