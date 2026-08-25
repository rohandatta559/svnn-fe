import Link from "next/link";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

const pillars = [
  {
    title: "Quality &",
    highlight: "Food Safety Policy",
    copy: "Every batch is made to consistently safe, hygienic standards — quality comes first, always.",
    href: "/about#quality",
  },
  {
    title: "FSSAI Licensed &",
    highlight: "Certified",
    copy: "TruKid is manufactured under a valid FSSAI license, so every treat is accountable and traceable.",
    href: "/about#certifications",
  },
  {
    title: "Our",
    highlight: "Facility",
    copy: "Made at our own manufacturing unit in Telangana, built for hard-boiled sugar confectionery.",
    href: "/about#facility",
  },
  {
    title: "Strengths of",
    highlight: "Our Company",
    copy: "A focused range, careful sourcing and a kid-first philosophy behind every product we ship.",
    href: "/about#strengths",
  },
];

export default function WhyTruKid() {
  return (
    <section className="bg-white px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="tracked-mono mb-3 text-xs uppercase text-brand-red">The TruKid Promise</p>
          <h2 className="font-display text-3xl leading-tight text-choco md:text-5xl">
            Why Choose TruKid?
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.href} delay={i * 0.08}>
              <Link href={p.href} className="block h-full">
                <TiltCard
                  intensity={8}
                  className="h-full rounded-2xl border border-choco/10 bg-cream p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <p className="font-display text-lg leading-snug text-choco">
                    {p.title}
                    <br />
                    <span className="text-brand-red">{p.highlight}</span>
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted">{p.copy}</p>
                </TiltCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
