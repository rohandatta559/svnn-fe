"use client";
import { motion } from "framer-motion";

const pieces = [
  { emoji: "🍫", size: 64, top: "8%", left: "6%", depth: 0.4, duration: 6 },
  { emoji: "🍬", size: 40, top: "18%", left: "88%", depth: 0.7, duration: 5 },
  { emoji: "🍩", size: 52, top: "68%", left: "10%", depth: 0.5, duration: 7 },
  { emoji: "🧋", size: 44, top: "78%", left: "82%", depth: 0.3, duration: 6.5 },
  { emoji: "🍫", size: 36, top: "40%", left: "92%", depth: 0.6, duration: 5.5 },
  { emoji: "🍪", size: 46, top: "50%", left: "2%", depth: 0.45, duration: 6.2 },
];

export default function FloatingChocolates() {
  return (
    <div className="perspective pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p, i) => (
        <motion.div
          key={i}
          className="absolute select-none"
          style={{
            top: p.top,
            left: p.left,
            fontSize: p.size,
            filter: `blur(${(1 - p.depth) * 0.6}px)`,
            opacity: 0.5 + p.depth * 0.4,
          }}
          animate={{
            y: [0, -18, 0],
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
}
