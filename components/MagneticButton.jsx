"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/** A CTA that leans toward the cursor while hovered. */
export default function MagneticButton({ href, children, className = "", strength = 0.35 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 });

  function onMove(e) {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x, y, display: "inline-block" }}
      whileTap={{ scale: 0.96 }}
    >
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.div>
  );
}
