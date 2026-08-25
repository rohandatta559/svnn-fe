"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { adminGetProducts, adminDeleteProduct } from "@/lib/api";
import ProductImage from "@/components/ProductImage";

export default function AdminProductsPage() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  async function load() {
    setLoading(true);
    try {
      const data = await adminGetProducts(token, { limit: 200 });
      setProducts(data.products || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function handleDelete(id) {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await adminDeleteProduct(token, id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-3xl text-choco">Products</h1>
          <p className="mt-1 text-muted">{loading ? "Loading…" : `${products.length} product${products.length === 1 ? "" : "s"} total`}</p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-white hover:bg-choco"
        >
          + Add Product
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-3xl border border-choco/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-choco/10 bg-cream text-xs uppercase tracking-wide text-choco/60">
            <tr>
              <th className="px-5 py-3">Product</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="px-5 py-8 text-center text-muted">Loading products…</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan={4} className="px-5 py-8 text-center text-muted">No products yet. Add your first one.</td></tr>
            ) : (
              products.map((p) => (
                <tr key={p._id} className="border-b border-choco/5 last:border-0">
                  <td className="flex items-center gap-3 px-5 py-3">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                      <ProductImage src={p.image} alt={p.name} category={p.category} className="h-full w-full object-cover" />
                    </div>
                    <span className="font-semibold text-choco">{p.name}</span>
                  </td>
                  <td className="px-5 py-3 text-choco/70">{p.category}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${p.isActive ? "bg-green-100 text-green-700" : "bg-choco/10 text-choco/50"}`}>
                      {p.isActive ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex justify-end gap-3">
                      <Link href={`/admin/products/${p._id}/edit`} className="text-sm font-semibold text-brand-red hover:underline">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(p._id)}
                        disabled={deletingId === p._id}
                        className="text-sm font-semibold text-choco/50 hover:text-brand-red disabled:opacity-50"
                      >
                        {deletingId === p._id ? "Deleting…" : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
