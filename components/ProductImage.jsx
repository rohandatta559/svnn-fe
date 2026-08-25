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

export default function ProductImage({ src, alt, category, className = "" }) {
  const [failed, setFailed] = useState(false);
  const resolved = resolveSrc(src);

  if (resolved && !failed) {
    return (
      <img
        src={resolved}
        alt={alt}
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
