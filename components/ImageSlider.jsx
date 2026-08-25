"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import ProductImage from "@/components/ProductImage";

export default function ImageSlider({ images, alt, category }) {
  const [index, setIndex] = useState(0);
  const slides = images && images.length > 0 ? images : [null];

  return (
    <div>
      <div className="relative aspect-square w-full overflow-hidden bg-cream">
        <motion.div
          key={slides[index]}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="h-full w-full"
        >
          <ProductImage
            src={slides[index]}
            alt={alt}
            category={category}
            className="h-full w-full object-contain p-8"
          />
        </motion.div>
      </div>

      {slides.length > 1 && (
        <div className="flex gap-3 bg-white p-4">
          {slides.map((s, i) => (
            <button
              key={s + i}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIndex(i);
              }}
              aria-label={`Show image ${i + 1}`}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-cream transition-all ${
                i === index
                  ? "ring-2 ring-brand-red ring-offset-2"
                  : "opacity-60 ring-1 ring-choco/10 hover:opacity-100"
              }`}
            >
              <ProductImage
                src={s}
                alt={`${alt} view ${i + 1}`}
                category={category}
                className="h-full w-full object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
