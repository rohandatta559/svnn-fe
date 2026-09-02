"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

const nav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/testimonials", label: "Testimonials" },
];

export default function DashboardLayout({ children }) {
  const { token, admin, ready, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (ready && !token) router.replace("/admin/login");
  }, [ready, token, router]);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  if (!ready || !token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <p className="text-choco/50">Loading…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-cream">
      <aside className="hidden w-64 flex-col border-r border-choco/10 bg-white px-6 py-8 md:flex">
        <Link href="/admin" className="font-display text-2xl text-choco">
          Tru<span className="text-brand-red">Kid</span>
        </Link>
        <p className="tracked-mono mt-1 text-[10px] uppercase text-brand-red">Admin Dashboard</p>

        <nav className="mt-10 flex flex-col gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                pathname === item.href
                  ? "bg-brand-red text-white"
                  : "text-choco/70 hover:bg-cream"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <p className="text-xs text-choco/50">Signed in as</p>
          <p className="truncate text-sm font-semibold text-choco">{admin?.name}</p>
          <button
            onClick={() => {
              logout();
              router.push("/admin/login");
            }}
            className="mt-4 w-full rounded-xl border border-choco/15 px-4 py-2 text-sm font-semibold text-choco hover:bg-cream"
          >
            Log out
          </button>
          <Link href="/" className="mt-2 block text-center text-xs text-choco/50 hover:text-brand-red">
            ← Back to site
          </Link>
        </div>
      </aside>

      <div className="flex-1">
        <header className="border-b border-choco/10 bg-white md:hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <Link href="/admin" className="font-display text-xl text-choco">
              Tru<span className="text-brand-red">Kid</span> Admin
            </Link>
            <button
              onClick={() => setMobileNavOpen((v) => !v)}
              aria-label="Toggle menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-choco/15"
            >
              <span className="text-choco">{mobileNavOpen ? "✕" : "☰"}</span>
            </button>
          </div>

          <AnimatePresence>
            {mobileNavOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t border-choco/10"
              >
                <div className="flex flex-col gap-1 px-6 py-4">
                  {nav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                        pathname === item.href
                          ? "bg-brand-red text-white"
                          : "text-choco/70 hover:bg-cream"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="mt-3 border-t border-choco/10 pt-3">
                    <p className="px-4 text-xs text-choco/50">Signed in as</p>
                    <p className="truncate px-4 text-sm font-semibold text-choco">{admin?.name}</p>
                    <button
                      onClick={() => {
                        logout();
                        router.push("/admin/login");
                      }}
                      className="mt-3 w-full rounded-xl border border-choco/15 px-4 py-2 text-sm font-semibold text-choco hover:bg-cream"
                    >
                      Log out
                    </button>
                  </div>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </header>
        <main className="p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
