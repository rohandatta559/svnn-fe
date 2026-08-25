"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { adminCreateProduct, adminUpdateProduct } from "@/lib/api";

const categories = ["Eclairs", "Jellies", "Candies", "Lollipops", "Chocolate", "Wafers"];

export default function ProductForm({ initial }) {
  const { token } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    name: initial?.name || "",
    category: initial?.category || categories[0],
    weight: initial?.weight || "",
    shortDescription: initial?.shortDescription || "",
    description: initial?.description || "",
    ingredients: initial?.ingredients?.join(", ") || "",
    isFeatured: initial?.isFeatured || false,
    isActive: initial?.isActive ?? true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function setField(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => fd.append(key, value));
    if (imageFile) fd.append("image", imageFile);

    try {
      if (initial) {
        await adminUpdateProduct(token, initial._id, fd);
      } else {
        await adminCreateProduct(token, fd);
      }
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5 rounded-3xl border border-choco/10 bg-white p-6 md:p-8">
      {error && <p className="rounded-xl bg-brand-red/10 px-4 py-2 text-sm text-brand-red">{error}</p>}

      <div>
        <label className="mb-1 block text-sm font-medium text-choco/80">Name</label>
        <input
          required
          value={form.name}
          onChange={(e) => setField("name", e.target.value)}
          className="w-full rounded-xl border border-choco/15 px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-red"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-choco/80">Category</label>
          <select
            value={form.category}
            onChange={(e) => setField("category", e.target.value)}
            className="w-full rounded-xl border border-choco/15 px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-red"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-choco/80">Weight</label>
          <input
            value={form.weight}
            onChange={(e) => setField("weight", e.target.value)}
            placeholder="e.g. 100g"
            className="w-full rounded-xl border border-choco/15 px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-red"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-choco/80">Short description</label>
        <input
          value={form.shortDescription}
          onChange={(e) => setField("shortDescription", e.target.value)}
          className="w-full rounded-xl border border-choco/15 px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-red"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-choco/80">Full description</label>
        <textarea
          rows={4}
          value={form.description}
          onChange={(e) => setField("description", e.target.value)}
          className="w-full rounded-xl border border-choco/15 px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-red"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-choco/80">Ingredients (comma-separated)</label>
        <input
          value={form.ingredients}
          onChange={(e) => setField("ingredients", e.target.value)}
          placeholder="Cocoa mass, Sugar, Milk powder"
          className="w-full rounded-xl border border-choco/15 px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-red"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-choco/80">Product image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="w-full rounded-xl border border-choco/15 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-red"
        />
        {initial?.image && !imageFile && (
          <p className="mt-1 text-xs text-muted">Current image will be kept unless you upload a new one.</p>
        )}
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-choco/80">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(e) => setField("isFeatured", e.target.checked)}
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm text-choco/80">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setField("isActive", e.target.checked)}
          />
          Active (visible on site)
        </label>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="rounded-full bg-brand-red px-7 py-3 text-sm font-semibold text-white hover:bg-choco disabled:opacity-50"
      >
        {saving ? "Saving…" : initial ? "Save Changes" : "Create Product"}
      </button>
    </form>
  );
}
