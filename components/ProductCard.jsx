"use client";
import Link from "next/link";
import TiltCard from "@/components/TiltCard";
import ProductImage from "@/components/ProductImage";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.slug}`} className="block h-full">
      <TiltCard
        intensity={10}
        className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-choco/10 bg-white shadow-lg shadow-choco/5"
      >
        {product.isFeatured && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-brand-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-choco shadow-sm">
            Featured
          </span>
        )}
        <div className="aspect-square w-full shrink-0 overflow-hidden bg-cream">
          <ProductImage
            src={product.image}
            alt={product.name}
            category={product.category}
            className="h-full w-full object-contain p-4"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="tracked-mono text-[10px] uppercase text-brand-red">
            {product.category}
            {product.weight ? ` / ${product.weight}` : ""}
          </p>
          <h3 className="mt-1 font-display text-lg font-semibold text-choco">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted">
            {product.shortDescription}
          </p>
          <span className="mt-auto inline-block pt-4 text-xs font-semibold uppercase tracking-wide text-brand-red">
            View Details →
          </span>
        </div>
      </TiltCard>
    </Link>
  );
}
