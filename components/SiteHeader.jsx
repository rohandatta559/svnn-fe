"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/products", label: "Shop" },
  { href: "/about", label: "Our Craft" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center">
          <img src="/brand/trukid-logo.png" alt="TruKid" className="h-11 w-auto rounded-md" />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-brand-red ${
                pathname === link.href ? "font-semibold text-brand-red" : "text-choco/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-choco/15 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="text-choco">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-choco/10 bg-cream md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-choco/80 hover:bg-white"
              >
                Home
              </Link>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-choco/80 hover:bg-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
