"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
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

  useEffect(() => {
    if (ready && !token) router.replace("/admin/login");
  }, [ready, token, router]);

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
        <header className="flex items-center justify-between border-b border-choco/10 bg-white px-6 py-4 md:hidden">
          <Link href="/admin" className="font-display text-xl text-choco">
            Tru<span className="text-brand-red">Kid</span> Admin
          </Link>
          <button
            onClick={() => {
              logout();
              router.push("/admin/login");
            }}
            className="text-sm font-semibold text-brand-red"
          >
            Log out
          </button>
        </header>
        <main className="p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
