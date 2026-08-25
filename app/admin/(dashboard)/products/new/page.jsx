import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-choco">Add New Product</h1>
      <p className="mt-1 text-muted">Fill in the details below to add it to the catalog.</p>
      <div className="mt-8">
        <ProductForm />
      </div>
    </div>
  );
}
