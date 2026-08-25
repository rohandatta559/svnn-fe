"use client";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Marquee from "@/components/Marquee";
import HeroShowcase from "@/components/HeroShowcase";
import MagneticButton from "@/components/MagneticButton";
import CountUp from "@/components/CountUp";

const LINE_1 = ["A", "little", "wonder,"];
const LINE_2 = ["in", "every", "bite."];

const rise = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: 0,
    transition: { delay: 0.15 + i * 0.075, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (d) => ({ opacity: 1, y: 0, transition: { delay: d, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }),
};

const STATS = [
  { to: 41, suffix: "", label: "Treats" },
  { to: 6, suffix: "", label: "Flavour worlds" },
  { to: 100, suffix: "%", label: "Made by hand" },
];

export default function Hero3D() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-cream">
      {/* Living aurora background */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle,rgba(193,39,45,.20),transparent 68%)" }}
        animate={reduce ? {} : { x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-10 h-[460px] w-[460px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle,rgba(217,164,65,.30),transparent 68%)" }}
        animate={reduce ? {} : { x: [0, -50, 0], y: [0, 60, 0], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-8 pt-24 md:grid-cols-[1.02fr_.98fr] md:pt-28">
        <div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="tracked-mono mb-5 flex items-center gap-3 text-xs uppercase text-brand-red"
          >
            <span className="inline-block h-px w-8 bg-brand-red/50" />
            TruKid / Est. 2022
          </motion.p>

          <h1 className="font-display text-5xl leading-[1.05] text-choco md:text-7xl">
            {[LINE_1, LINE_2].map((line, li) => (
              <span key={li} className="block overflow-hidden pb-[.08em]">
                {line.map((word, wi) => (
                  <motion.span
                    key={word + wi}
                    variants={rise}
                    initial="hidden"
                    animate="show"
                    custom={li * LINE_1.length + wi}
                    className={`inline-block ${li === 1 ? "italic text-[#b97845]" : ""}`}
                  >
                    {word}
                    {wi < line.length - 1 && " "}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.62}
            className="mt-6 max-w-md text-base leading-8 text-muted md:text-lg"
          >
            Eclairs, jellies, candies, lollipops and chocolate — for curious
            hands and happy moments.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.74}
            className="mt-9 flex flex-wrap items-center gap-5"
          >
            <MagneticButton
              href="/products"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-choco px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white shadow-xl shadow-choco/25 transition-colors hover:bg-brand-red"
            >
              <span className="relative z-10">Explore The Collection</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
            </MagneticButton>

            <Link
              href="/about"
              className="group text-xs font-semibold uppercase tracking-widest text-choco transition-colors hover:text-brand-red"
            >
              Our Way of Making
              <span className="ml-1 inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                ↗
              </span>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.86}
            className="mt-11 flex gap-8 border-t border-choco/10 pt-6"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl leading-none text-choco">
                  <CountUp to={s.to} suffix={s.suffix} />
                </p>
                <p className="tracked-mono mt-1.5 text-[10px] uppercase text-muted">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <HeroShowcase />
      </div>

      <div className="relative border-y border-choco/10 bg-choco py-3 text-white/85">
        <Marquee
          items={["Made With Care", "Shared With Joy", "Real Ingredients", "Small Batches"]}
        />
      </div>
    </section>
  );
}
