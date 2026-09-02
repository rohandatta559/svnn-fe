"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitTestimonial } from "@/lib/api";

export default function TestimonialForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", city: "", quote: "", website: "" });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      await submitTestimonial(form);
      setDone(true);
      // Testimonials publish immediately — pull the list again so it shows up.
      router.refresh();
    } catch (err) {
      setError(err.message || "Could not submit. Please try again.");
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-brand-red/20 bg-brand-red/5 p-8 text-center">
        <p className="font-display text-2xl text-choco">Thank you!</p>
        <p className="mt-2 text-muted">
          Your testimonial is now live on this page. We appreciate you taking the time.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-choco/10 bg-white p-7 shadow-sm md:p-9"
    >
      <p className="tracked-mono mb-2 text-xs uppercase text-brand-red">Share Your Experience</p>
      <h2 className="font-display text-2xl text-choco md:text-3xl">Write a testimonial</h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        Tell us what you think of TruKid — your words will appear on this page.
      </p>

      <div className="mt-6 space-y-5">
        {error && (
          <p className="rounded-xl bg-brand-red/10 px-4 py-2 text-sm text-brand-red">{error}</p>
        )}

        {/* Honeypot: hidden from people, tempting to bots. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={form.website}
          onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
          className="hidden"
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-choco/80">Your name *</label>
            <input
              required
              maxLength={80}
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-xl border border-choco/15 bg-white px-4 py-3 text-choco outline-none focus:ring-2 focus:ring-brand-red"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-choco/80">City</label>
            <input
              maxLength={80}
              value={form.city}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              className="w-full rounded-xl border border-choco/15 bg-white px-4 py-3 text-choco outline-none focus:ring-2 focus:ring-brand-red"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-choco/80">Your testimonial *</label>
          <textarea
            required
            rows={4}
            maxLength={1000}
            value={form.quote}
            onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
            className="w-full rounded-xl border border-choco/15 bg-white px-4 py-3 text-choco outline-none focus:ring-2 focus:ring-brand-red"
          />
          <p className="mt-1 text-right text-xs text-muted">{form.quote.length}/1000</p>
        </div>

        <button
          type="submit"
          disabled={sending}
          className="rounded-full bg-brand-red px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-choco disabled:opacity-50"
        >
          {sending ? "Submitting…" : "Submit Testimonial"}
        </button>
      </div>
    </form>
  );
}
