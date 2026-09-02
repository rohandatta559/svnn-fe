import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import TestimonialForm from "@/components/TestimonialForm";
import { getTestimonials } from "@/lib/api";

export const metadata = { title: "Testimonials | TruKid" };

export default async function TestimonialsPage() {
  let testimonials = [];
  try {
    const data = await getTestimonials();
    testimonials = data.testimonials || [];
  } catch {
    testimonials = [];
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="tracked-mono mb-3 text-xs uppercase text-brand-red">Testimonials</p>
        <h1 className="font-display text-4xl leading-tight text-choco md:text-6xl">
          What People Say!
        </h1>
        <p className="mt-6 text-base leading-8 text-muted">
          Kind words from the retailers, distributors and families who enjoy TruKid.
        </p>
      </Reveal>

      {testimonials.length > 0 && (
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t._id || i} delay={i * 0.06}>
              <TiltCard
                intensity={6}
                className="h-full rounded-2xl border border-choco/10 bg-white p-7 shadow-sm"
              >
                <p className="text-4xl leading-none text-brand-gold">&ldquo;</p>
                <p className="mt-2 text-base leading-8 italic text-muted">{t.quote}</p>
                <div className="mt-6 border-t border-choco/10 pt-4">
                  <p className="text-sm font-semibold text-choco">{t.name}</p>
                  {t.city && (
                    <p className="text-xs uppercase tracking-wide text-muted">{t.city}</p>
                  )}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      )}

      <Reveal delay={0.1} className="mt-16">
        <TestimonialForm />
      </Reveal>
    </div>
  );
}
