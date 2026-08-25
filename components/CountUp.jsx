"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Counts from 0 to `to` once, shortly after mount.
 * Renders the final value during SSR so the markup matches on hydrate and the
 * number is still correct if JS never runs.
 */
export default function CountUp({ to, duration = 1.4, suffix = "", delay = 0.3 }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(to);

  useEffect(() => {
    if (reduce) return;
    setN(0);
    let raf;
    let startTs = null;
    const timer = setTimeout(() => {
      const tick = (now) => {
        if (startTs === null) startTs = now;
        const t = Math.min((now - startTs) / (duration * 1000), 1);
        setN(Math.round(to * (1 - Math.pow(1 - t, 3)))); // easeOutCubic
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [to, duration, delay, reduce]);

  return (
    <span>
      {n}
      {suffix}
    </span>
  );
}
