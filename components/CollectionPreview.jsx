import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProductImage from "@/components/ProductImage";

export default function CollectionPreview({ products }) {
  return (
    <section className="border-y border-choco/10 bg-cream py-20 md:py-28">
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
          <Link
            href="/products"
            className="text-xs font-semibold uppercase tracking-widest text-brand-red hover:underline"
          >
            View All Products →
          </Link>
        </Reveal>

        <div className="mx-auto grid max-w-2xl grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3">
          {products.map((p) => (
            <Reveal key={p._id}>
              <Link href={`/products/${p.slug}`} className="group block">
                <div className="relative aspect-square w-full max-w-[180px] mx-auto overflow-hidden rounded-xl bg-white">
                  <ProductImage
                    src={p.image}
                    alt={p.name}
                    category={p.category}
                    className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                  />
                  {p.isFeatured && (
                    <span className="absolute left-2 top-2 rounded-full bg-brand-gold px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-choco shadow-sm">
                      Featured
                    </span>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-choco/0 opacity-0 transition-all duration-300 group-hover:bg-choco/45 group-hover:opacity-100">
                    <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-choco">
                      View →
                    </span>
                  </div>
                </div>
                <p className="tracked-mono mt-2 max-w-[180px] mx-auto text-center text-[9px] uppercase text-brand-red">
                  {p.category}
                </p>
                <h3 className="mt-0.5 max-w-[180px] mx-auto text-center font-display text-sm text-choco">
                  {p.name}
                </h3>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/products"
            className="inline-block rounded-full bg-choco px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-brand-red"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
