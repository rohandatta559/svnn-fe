"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { adminGetProductById } from "@/lib/api";
import ProductForm from "@/components/admin/ProductForm";

export default function EditProductPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    adminGetProductById(token, id)
      .then((data) => setProduct(data.product))
      .catch((err) => setError(err.message || "Failed to load product"))
      .finally(() => setLoading(false));
  }, [token, id]);

  return (
    <div>
      <h1 className="font-display text-3xl text-choco">Edit Product</h1>
      <p className="mt-1 text-muted">Update the details and save your changes.</p>
      <div className="mt-8">
        {loading ? (
          <p className="text-muted">Loading…</p>
        ) : error ? (
          <p className="text-brand-red">{error}</p>
        ) : (
          <ProductForm initial={product} />
        )}
      </div>
    </div>
  );
}
