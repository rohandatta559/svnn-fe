"use client";
import { useState } from "react";
import { API_URL } from "@/lib/api";

const CATEGORY_GRADIENTS = {
  Eclairs: "from-[#4a2a18] to-[#8a5a35]",
  Jellies: "from-[#7a1f24] to-[#c1272d]",
  Candies: "from-[#d9a441] to-[#f5c96a]",
  Lollipops: "from-[#c1272d] to-[#e0616a]",
  Chocolate: "from-[#2a140c] to-[#54301f]",
  Wafers: "from-[#1e3a5f] to-[#3d6fa5]",
};

function resolveSrc(src) {
  if (!src) return null;
  if (src.startsWith("/uploads")) return `${API_URL.replace(/\/api$/, "")}${src}`;
  return src;
}

export default function ProductImage({ src, alt, category, className = "", sizes, priority = false }) {
  const [failed, setFailed] = useState(false);
  const resolved = resolveSrc(src);

  // Every catalog photo also has a 400px copy (name-sm.jpg) for cards and thumbnails,
  // so a grid of 45 products downloads a few hundred KB instead of several MB.
  const srcSet =
    resolved && resolved.startsWith("/images/products/") && resolved.endsWith(".jpg")
      ? `${resolved.replace(/\.jpg$/, "-sm.jpg")} 400w, ${resolved} 900w`
      : undefined;

  if (resolved && !failed) {
    return (
      <img
        src={resolved}
        srcSet={srcSet}
        sizes={srcSet ? sizes || "300px" : undefined}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className={className}
        onError={() => setFailed(true)}
      />
    );
  }

  const gradient = CATEGORY_GRADIENTS[category] || CATEGORY_GRADIENTS["Chocolate"];
  return (
    <div className={`flex items-center justify-center bg-gradient-to-br ${gradient} ${className}`}>
      <span className="text-5xl">🍫</span>
    </div>
  );
}
