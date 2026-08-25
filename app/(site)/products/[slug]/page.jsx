import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api";
import Reveal from "@/components/Reveal";
import SpecTable from "@/components/SpecTable";
import ImageSlider from "@/components/ImageSlider";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const { product } = await getProductBySlug(slug);
    return { title: `${product.name} | TruKid` };
  } catch {
    return { title: "Product | TruKid" };
  }
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  let product = null;

  try {
    const data = await getProductBySlug(slug);
    product = data.product;
  } catch {
    product = null;
  }

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <Link href="/products" className="text-sm font-semibold text-brand-red hover:underline">
        ← Back to products
      </Link>

      <div className="mt-8 grid gap-12 md:grid-cols-2">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border border-choco/10 bg-white shadow-xl shadow-choco/10">
            <ImageSlider
              images={[product.image, ...(product.gallery || [])].filter(Boolean)}
              alt={product.name}
              category={product.category}
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="tracked-mono mb-3 text-xs uppercase text-brand-red">{product.category}</p>
          <h1 className="font-display text-4xl leading-tight text-choco md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 text-lg text-muted">{product.shortDescription}</p>

          {product.weight && (
            <div className="mt-8">
              <span className="rounded-full bg-cream px-4 py-1.5 text-sm font-semibold text-choco">
                {product.weight}
              </span>
            </div>
          )}

          {product.description && (
            <div className="mt-8">
              <h2 className="font-display text-xl text-choco">Description</h2>
              <p className="mt-3 leading-8 text-muted">{product.description}</p>
            </div>
          )}

          {product.ingredients?.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-xl text-choco">Ingredients</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="rounded-full border border-choco/15 bg-white px-3 py-1.5 text-xs font-medium text-choco"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          <SpecTable specs={product.packingSpecs} />

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-choco px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-red"
            >
              Enquire About This Product
            </Link>
            <Link
              href="/products"
              className="rounded-full border border-choco/15 bg-white px-7 py-3.5 text-sm font-semibold text-choco transition-colors hover:border-brand-red/40 hover:text-brand-red"
            >
              Browse More
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
