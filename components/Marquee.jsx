"use client";
import { motion } from "framer-motion";

export default function Marquee({ items, className = "", speed = 28 }) {
  const track = [...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex w-max items-center gap-3 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {track.map((item, i) => (
          <span key={i} className="flex items-center gap-3">
            <span className="tracked-mono text-xs uppercase">{item}</span>
            <span aria-hidden>✳</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
