const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body && !(options.body instanceof FormData)
        ? { "Content-Type": "application/json" }
        : {}),
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export function getProducts(params = {}) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "")
  ).toString();
  return request(`/products${query ? `?${query}` : ""}`);
}

export function getProductBySlug(slug) {
  return request(`/products/${slug}`);
}

export function getCategories() {
  return request("/products/categories");
}

export function adminLogin(email, password) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function adminGetProducts(token, params = {}) {
  const query = new URLSearchParams({ ...params, admin: "true" }).toString();
  return request(`/products?${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function adminGetProductById(token, id) {
  return request(`/products/admin/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function adminCreateProduct(token, formData) {
  return request("/products", {
    method: "POST",
    body: formData,
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function adminUpdateProduct(token, id, formData) {
  return request(`/products/${id}`, {
    method: "PUT",
    body: formData,
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function adminDeleteProduct(token, id) {
  return request(`/products/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function sendContactMessage({ name, email, message }) {
  return request("/contact", {
    method: "POST",
    body: JSON.stringify({ name, email, message }),
  });
}

export { API_URL };
