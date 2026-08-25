"use client";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function TiltCard({ children, className = "", intensity = 14, glare = true }) {
  const ref = useRef(null);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(springY, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(springX, [0, 1], [-intensity, intensity]);
  const translateZ = useTransform(springX, () => (hovering ? 24 : 0));
  const glareX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(springY, [0, 1], ["0%", "100%"]);

  function handleMove(e) {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    setHovering(false);
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <div className="perspective h-full">
      <motion.div
        ref={ref}
        onMouseEnter={() => setHovering(true)}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, translateZ }}
        className={`card-3d relative ${className}`}
      >
        {children}
        {glare && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-200"
            style={{
              opacity: hovering ? 1 : 0,
              background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.35), transparent 45%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
