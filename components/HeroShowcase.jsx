"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

/** Real packshots that orbit the centre bar. Angles are evenly spread. */
const ORBIT = [
  { src: "/images/products/frooto-jar.png", size: 96, depth: 1 },
  { src: "/images/products/lollipop-strawberry.png", size: 82, depth: 0.75 },
  { src: "/images/products/guava-jelly-mc.png", size: 88, depth: 0.9 },
  { src: "/images/products/trukid-wafferr.jpg", size: 78, depth: 0.7 },
  { src: "/images/products/choco-eclairs.png", size: 86, depth: 0.85 },
  { src: "/images/products/mini-pop-jar.png", size: 80, depth: 0.72 },
];

const RADIUS_X = 178;
const RADIUS_Y = 132;
const SPIN_SECONDS = 34;

export default function HeroShowcase() {
  const reduce = useReducedMotion();
  const wrapRef = useRef(null);
  const [angle, setAngle] = useState(0);
  // The orbit is positioned from a continuously-changing angle, which can never
  // match between server and client. Render it only after mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Mouse parallax — the whole scene leans toward the cursor.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotY = useSpring(useTransform(px, [-1, 1], [-13, 13]), { stiffness: 110, damping: 18 });
  const rotX = useSpring(useTransform(py, [-1, 1], [10, -10]), { stiffness: 110, damping: 18 });
  const driftX = useSpring(useTransform(px, [-1, 1], [-16, 16]), { stiffness: 90, damping: 20 });
  const driftY = useSpring(useTransform(py, [-1, 1], [-12, 12]), { stiffness: 90, damping: 20 });

  useEffect(() => {
    if (reduce) return;
    let raf;
    let last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      setAngle((a) => (a + (360 / SPIN_SECONDS) * dt) % 360);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  function onMove(e) {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    px.set(((e.clientX - r.left) / r.width) * 2 - 1);
    py.set(((e.clientY - r.top) / r.height) * 2 - 1);
  }
  function onLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative mx-auto flex h-[440px] w-full max-w-lg items-center justify-center md:h-[520px]"
      style={{ perspective: 1100 }}
    >
      {/* Aurora wash */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px]"
        style={{ background: "radial-gradient(circle,rgba(217,164,65,.42),rgba(193,39,45,.16) 55%,transparent 72%)" }}
        animate={reduce ? {} : { scale: [1, 1.14, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dashed guide rings */}
      <div
        aria-hidden
        className="pointer-events-none absolute rounded-[50%] border border-dashed border-[#b97845]/30"
        style={{ width: RADIUS_X * 2, height: RADIUS_Y * 2, transform: "rotate(-14deg)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute rounded-[50%] border border-[#b97845]/20"
        style={{ width: RADIUS_X * 1.42, height: RADIUS_Y * 1.75, transform: "rotate(26deg)" }}
      />

      <motion.div
        className="relative h-full w-full"
        style={{ rotateX: rotX, rotateY: rotY, x: driftX, y: driftY, transformStyle: "preserve-3d" }}
      >
        {/* Orbiting packshots */}
        {mounted && ORBIT.map((item, i) => {
          const a = ((angle + (360 / ORBIT.length) * i) * Math.PI) / 180;
          const x = Math.cos(a) * RADIUS_X;
          const y = Math.sin(a) * RADIUS_Y;
          const front = Math.sin(a) > 0; // lower half reads as nearer
          const scale = (front ? 1.06 : 0.78) * item.depth + 0.16;
          return (
            <div
              key={item.src}
              className="pointer-events-none absolute left-1/2 top-1/2"
              style={{
                width: item.size,
                height: item.size,
                marginLeft: -item.size / 2,
                marginTop: -item.size / 2,
                transform: `translate3d(${x}px, ${y}px, ${front ? 60 : -60}px) scale(${scale})`,
                zIndex: front ? 30 : 1,
                opacity: front ? 1 : 0.55,
                filter: front ? "none" : "blur(1.6px)",
                transition: "opacity .3s linear",
              }}
            >
              <img
                src={item.src}
                alt=""
                className="h-full w-full object-contain drop-shadow-[0_10px_18px_rgba(58,31,20,.28)]"
              />
            </div>
          );
        })}

        {/* Centre bar */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-20"
          style={{ marginLeft: -108, marginTop: -80, transformStyle: "preserve-3d" }}
          animate={reduce ? {} : { y: [0, -14, 0], rotateZ: [-13, -10, -13] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="relative flex h-[160px] w-[216px] flex-col items-center justify-center overflow-hidden rounded-[18px]"
            style={{
              background: "linear-gradient(135deg,#5b3428,#2b1714 70%)",
              boxShadow: "28px 38px 40px rgba(58,33,27,.3), inset 2px 2px 0 #8c5c45",
            }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute rounded-[10px] border border-[#d8ad85]/40"
              style={{ inset: 13 }}
            />
            <span className="text-center font-display text-[42px] font-semibold leading-[.72] tracking-[-.06em] text-[#e7bd91]">
              TRU
              <br />
              KID
            </span>
            <small className="mt-5 text-[9px] tracking-[.24em] text-[#e7bd91]/85">72% CACAO</small>

            {/* Gloss sweep */}
            {!reduce && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3"
                style={{
                  background: "linear-gradient(100deg,transparent,rgba(255,240,214,.42),transparent)",
                  filter: "blur(5px)",
                }}
                animate={{ left: ["-35%", "125%"] }}
                transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 3.4, ease: "easeInOut" }}
              />
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Sparkles */}
      {!reduce &&
        [
          { t: "18%", l: "10%", d: 0, c: "#c1272d", s: 20 },
          { t: "74%", l: "86%", d: 1.3, c: "#d9a441", s: 16 },
          { t: "12%", l: "82%", d: 2.1, c: "#d9a441", s: 13 },
        ].map((s, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="pointer-events-none absolute z-40 select-none"
            style={{ top: s.t, left: s.l, color: s.c, fontSize: s.s }}
            animate={{ y: [0, -13, 0], opacity: [0.45, 1, 0.45], rotate: [0, 22, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, delay: s.d, ease: "easeInOut" }}
          >
            ✦
          </motion.span>
        ))}

      <div className="pointer-events-none absolute bottom-1 right-2 text-right font-mono text-[10px] uppercase leading-[1.8] tracking-[.11em] text-muted">
        A study in
        <br />
        <strong className="font-medium text-choco">dark / bright</strong>
      </div>
    </div>
  );
}
