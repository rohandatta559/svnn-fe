import Reveal from "@/components/Reveal";

export const metadata = { title: "About | TruKid" };

const values = [
  { label: "Kids Friendly", emoji: "🧒" },
  { label: "Quality Ingredients", emoji: "🌿" },
  { label: "Safe & Trusted", emoji: "✅" },
  { label: "Made With Care", emoji: "❤️" },
];

const productRange = ["Eclairs", "Jellies", "Candies", "Lollipops", "Chocolate", "Wafers"];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
      <Reveal>
        <p className="tracked-mono mb-4 text-xs uppercase text-brand-red">Our Story</p>
        <h1 className="font-display text-4xl leading-tight text-choco md:text-6xl">
          Tasty Moments, <span className="text-brand-red">Happy Kids!</span>
        </h1>
        <p className="mt-8 text-lg leading-9 text-muted">
          TruKid is our promise of delicious, high-quality treats made especially
          for kids. We believe in combining great taste with trusted ingredients
          to bring smiles to every little moment — from eclairs and jellies to
          candies, lollipops and moulded chocolate.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-4">
        {values.map((v) => (
          <div
            key={v.label}
            className="rounded-2xl border border-choco/10 bg-white p-5 text-center shadow-sm"
          >
            <div className="text-3xl">{v.emoji}</div>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-choco">
              {v.label}
            </p>
          </div>
        ))}
      </Reveal>

      <Reveal delay={0.15} className="mt-16">
        <p className="tracked-mono mb-3 text-xs uppercase text-brand-red">Who We Are</p>
        <h2 className="font-display text-3xl text-choco md:text-4xl">
          Manufactured by SVNN Foods
        </h2>
        <p className="mt-5 text-base leading-8 text-muted">
          TruKid is a brand of <strong className="text-choco">Sri Venkateshwara Nitya
          Nuthana Foods (SVNN Foods)</strong>. Commenced in 2022, the company is
          engaged in the making of hard-boiled sugar confectionery — ranging
          from flavoured candies (including centerfilled), jellies, lollipops,
          chocolate eclairs, choco-coated wafers, and moulded chocolates.
        </p>
        <p className="mt-4 text-base leading-8 text-muted">
          Our production facilities cater to a wide range of soft-boiled
          products, from classic eclairs to centerfilled varieties, with
          packing available in both twist-wrap and pillow-pack formats. We
          believe in the philosophy of quality and aim to carve out a niche in
          confectionery manufacturing by meeting standards comparable to
          international norms.
        </p>
      </Reveal>

      <Reveal delay={0.2} className="mt-16 grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-choco/10 bg-white p-7">
          <p className="tracked-mono mb-3 text-xs uppercase text-brand-red">Our Mission</p>
          <ul className="space-y-3 text-sm leading-7 text-muted">
            <li>To sweeten up the world and remove bitterness.</li>
            <li>To inspire moments of joy and happiness — safety and hygiene is our prime motto.</li>
            <li>To create value and make a difference to all stakeholders.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-choco/10 bg-white p-7">
          <p className="tracked-mono mb-3 text-xs uppercase text-brand-red">Our Values</p>
          <ul className="space-y-3 text-sm leading-7 text-muted">
            <li><strong className="text-choco">Leadership</strong> — the courage to shape a better future.</li>
            <li><strong className="text-choco">Passion</strong> — ensuring every treat is crafted with care and precision.</li>
            <li><strong className="text-choco">Quality</strong> — whatever we do, we give the best.</li>
          </ul>
        </div>
      </Reveal>

      <Reveal delay={0.25} id="quality" className="mt-16 scroll-mt-24 rounded-3xl bg-choco px-8 py-12 text-white md:px-12">
        <p className="tracked-mono mb-3 text-xs uppercase text-brand-gold">
          Quality &amp; Food Safety Policy
        </p>
        <p className="text-base leading-8 text-white/80">
          At SVNN Foods, as manufacturers, we consistently deliver safe and
          quality confectionery products to our customers through planned and
          cost-effective resource management — maximising customer reach with
          manufacturing processes focused on food safety.
        </p>
      </Reveal>

      <Reveal delay={0.27} id="certifications" className="mt-16 scroll-mt-24">
        <p className="tracked-mono mb-3 text-xs uppercase text-brand-red">Certifications</p>
        <h2 className="font-display text-3xl text-choco md:text-4xl">FSSAI Licensed</h2>
        <p className="mt-5 text-base leading-8 text-muted">
          TruKid is manufactured by SVNN Foods under FSSAI License No.{" "}
          <strong className="text-choco">13623999000198</strong>, so every
          product on our shelf is accountable to India&apos;s food safety
          authority.
        </p>
      </Reveal>

      <Reveal delay={0.29} id="facility" className="mt-16 scroll-mt-24">
        <p className="tracked-mono mb-3 text-xs uppercase text-brand-red">Our Facility</p>
        <h2 className="font-display text-3xl text-choco md:text-4xl">Made in Telangana</h2>
        <p className="mt-5 text-base leading-8 text-muted">
          Our products are manufactured at our unit in Kallakal Village,
          Medak District, Telangana — purpose-built for hard-boiled sugar
          confectionery, from centerfilled candies to moulded chocolates.
        </p>
      </Reveal>

      <Reveal delay={0.31} id="strengths" className="mt-16 scroll-mt-24">
        <p className="tracked-mono mb-3 text-xs uppercase text-brand-red">Our Strengths</p>
        <h2 className="font-display text-3xl text-choco md:text-4xl">
          What Sets Us Apart
        </h2>
        <ul className="mt-5 space-y-3 text-base leading-8 text-muted">
          <li>A focused, kid-first range across six product categories.</li>
          <li>Consistent recipes and careful ingredient sourcing, batch after batch.</li>
          <li>A single manufacturer accountable for every step, from mixing to packing.</li>
        </ul>
      </Reveal>

      <Reveal delay={0.33} className="mt-16">
        <p className="tracked-mono mb-4 text-xs uppercase text-brand-red">Our Product Range</p>
        <div className="flex flex-wrap gap-3">
          {productRange.map((p) => (
            <span
              key={p}
              className="rounded-full border border-choco/10 bg-white px-5 py-2 text-sm font-semibold text-choco shadow-sm"
            >
              {p}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
