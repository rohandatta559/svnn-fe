"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function AdminLoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      router.push("/admin");
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-choco px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="perspective w-full max-w-md"
      >
        <div className="rounded-3xl border border-white/10 bg-white/95 p-8 shadow-2xl backdrop-blur-xl md:p-10">
          <div className="mb-6 text-center">
            <img src="/brand/trukid-logo.png" alt="TruKid" className="mx-auto h-14 w-auto rounded-md" />
            <p className="tracked-mono mt-3 text-[11px] uppercase text-brand-red">Admin</p>
            <h1 className="mt-1 font-display text-2xl text-choco">Dashboard Sign In</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-choco/80">Email</label>
              <input
                required
                type="email"
                placeholder="admin@trukid.com"
                className="w-full rounded-xl bg-cream px-4 py-3 text-choco outline-none focus:ring-2 focus:ring-brand-red"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-choco/80">Password</label>
              <input
                required
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl bg-cream px-4 py-3 text-choco outline-none focus:ring-2 focus:ring-brand-red"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            {error && <p className="text-sm text-brand-red">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-brand-red px-6 py-3 font-semibold text-white transition-colors hover:bg-choco disabled:opacity-50"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
