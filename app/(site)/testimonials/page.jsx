import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";

export const metadata = { title: "Testimonials | TruKid" };

// Placeholder slots — swap these for real customer / distributor quotes before launch.
const testimonials = [
  {
    quote: "Add a real quote from a distributor or retailer here.",
    name: "Customer Name",
    place: "City",
  },
  {
    quote: "Add a real quote about product quality or service here.",
    name: "Customer Name",
    place: "City",
  },
  {
    quote: "Add a real quote about delivery or reliability here.",
    name: "Customer Name",
    place: "City",
  },
  {
    quote: "Add a real quote from a long-term partner here.",
    name: "Customer Name",
    place: "City",
  },
];

export default function TestimonialsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="tracked-mono mb-3 text-xs uppercase text-brand-red">Testimonials</p>
        <h1 className="font-display text-4xl leading-tight text-choco md:text-6xl">
          What People Say!
        </h1>
        <p className="mt-6 text-base leading-8 text-muted">
          These are placeholder slots — replace them with real quotes from
          your retailers, distributors and customers before this page goes
          live.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <TiltCard
              intensity={6}
              className="h-full rounded-2xl border border-dashed border-choco/20 bg-white p-7 shadow-sm"
            >
              <p className="text-4xl leading-none text-brand-gold">&ldquo;</p>
              <p className="mt-2 text-base leading-8 text-muted italic">{t.quote}</p>
              <div className="mt-6 border-t border-choco/10 pt-4">
                <p className="text-sm font-semibold text-choco">{t.name}</p>
                <p className="text-xs uppercase tracking-wide text-muted">{t.place}</p>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
