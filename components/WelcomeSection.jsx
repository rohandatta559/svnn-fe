import Link from "next/link";
import Reveal from "./Reveal";

export default function WelcomeSection() {
  return (
    <section className="bg-white px-6 py-20 md:py-28">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="tracked-mono mb-4 text-xs uppercase text-brand-red">Get To Know Us</p>
        <h2 className="font-display text-3xl leading-tight text-choco md:text-5xl">
          Welcome to TruKid
        </h2>
        <p className="mt-6 text-base leading-8 text-muted md:text-lg">
          We're growing our shelf one flavour at a time — from classic
          eclairs to centerfilled candies, jellies, lollipops and moulded
          chocolate. Every pack is built to bring a little wonder to
          everyday moments, for curious hands of every age.
        </p>
        <p className="mt-5 text-base leading-8 text-muted md:text-lg">
          Commenced in 2022, TruKid is manufactured by{" "}
          <strong className="text-choco">
            Sri Venkateshwara Nitya Nuthana Foods (SVNN Foods)
          </strong>{" "}
          — engaged in the making of hard-boiled sugar confectionery,
          ranging from flavoured candies (including centerfilled) to
          jellies, lollipops, chocolate eclairs, choco-coated wafers and
          moulded chocolates.
        </p>
        <Link
          href="/about"
          className="mt-8 inline-block text-xs font-semibold uppercase tracking-widest text-brand-red hover:underline"
        >
          Read Our Story →
        </Link>
      </Reveal>
    </section>
  );
}
