import Hero3D from "@/components/Hero3D";
import Reveal from "@/components/Reveal";
import CollectionPreview from "@/components/CollectionPreview";
import WhyTruKid from "@/components/WhyTruKid";
import WelcomeSection from "@/components/WelcomeSection";
import Link from "next/link";
import { getProducts } from "@/lib/api";

export default async function HomePage() {
  let products = [];
  try {
    const data = await getProducts({ featured: "true", limit: 3, sort: "name-asc" });
    products = data.products || [];
  } catch {
    products = [];
  }

  return (
    <>
      <Hero3D />

      <WelcomeSection />

      <CollectionPreview products={products} />

      <WhyTruKid />

      <section className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
        <Reveal>
          <p className="tracked-mono mb-3 text-xs uppercase text-brand-red">The TruKid Way</p>
          <h2 className="font-display text-3xl leading-tight text-choco md:text-5xl">
            Good treats keep you curious.
          </h2>
          <p className="mt-6 text-base leading-8 text-muted md:text-lg">
            We believe the best things start with a question. Where did the
            recipe come from? What happens if we add a little more tang?
            Why shouldn't an ordinary Tuesday feel like a celebration?
          </p>
          <Link
            href="/about"
            className="mt-8 inline-block text-xs font-semibold uppercase tracking-widest text-brand-red hover:underline"
          >
            Read Our Story →
          </Link>
        </Reveal>
      </section>
    </>
  );
}
