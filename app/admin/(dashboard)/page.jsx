"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { adminGetProducts } from "@/lib/api";

export default function AdminOverviewPage() {
  const { token, admin } = useAuth();
  const [stats, setStats] = useState({ total: 0, categories: {}, featured: 0, hidden: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    adminGetProducts(token, { limit: 1000 })
      .then((data) => {
        const products = data.products || [];
        const categories = {};
        let featured = 0;
        let hidden = 0;
        products.forEach((p) => {
          categories[p.category] = (categories[p.category] || 0) + 1;
          if (p.isFeatured) featured += 1;
          if (!p.isActive) hidden += 1;
        });
        setStats({ total: products.length, categories, featured, hidden });
      })
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div>
      <h1 className="font-display text-3xl text-choco">Welcome back, {admin?.name?.split(" ")[0] || "Admin"}</h1>
      <p className="mt-1 text-muted">Here's what's happening with your product catalog.</p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Products" value={loading ? "…" : stats.total} accent="bg-choco" />
        <StatCard label="Categories in Use" value={loading ? "…" : Object.keys(stats.categories).length} accent="bg-brand-red" />
        <StatCard label="Featured Products" value={loading ? "…" : stats.featured} accent="bg-brand-gold" />
        <StatCard label="Hidden Products" value={loading ? "…" : stats.hidden} accent="bg-choco-light" />
      </div>

      <div className="mt-10 rounded-3xl border border-choco/10 bg-white p-6">
        <h2 className="font-display text-xl text-choco">Products by category</h2>
        {loading ? (
          <p className="mt-4 text-sm text-muted">Loading…</p>
        ) : Object.keys(stats.categories).length === 0 ? (
          <p className="mt-4 text-sm text-muted">No products yet.</p>
        ) : (
          <div className="mt-5 space-y-3">
            {Object.entries(stats.categories).map(([cat, count]) => (
              <div key={cat} className="flex items-center gap-4">
                <span className="w-40 shrink-0 text-sm font-semibold text-choco">{cat}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-cream">
                  <div
                    className="h-full rounded-full bg-brand-red"
                    style={{ width: `${(count / stats.total) * 100}%` }}
                  />
                </div>
                <span className="w-8 text-right text-sm text-muted">{count}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <Link
        href="/admin/products/new"
        className="mt-8 inline-block rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-white hover:bg-choco"
      >
        + Add New Product
      </Link>
    </div>
  );
}

function StatCard({ label, value, accent }) {
  return (
    <div className="rounded-2xl border border-choco/10 bg-white p-5">
      <div className={`h-1.5 w-10 rounded-full ${accent}`} />
      <p className="mt-4 font-display text-3xl text-choco">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
    </div>
  );
}
