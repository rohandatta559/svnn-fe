"use client";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  adminGetTestimonials,
  adminSetTestimonialApproval,
  adminDeleteTestimonial,
} from "@/lib/api";

export default function AdminTestimonialsPage() {
  const { token } = useAuth();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(() => {
    if (!token) return;
    setLoading(true);
    adminGetTestimonials(token)
      .then((data) => setTestimonials(data.testimonials || []))
      .catch((err) => setError(err.message || "Failed to load testimonials"))
      .finally(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  async function toggleApproval(t) {
    setBusyId(t._id);
    setError("");
    try {
      await adminSetTestimonialApproval(token, t._id, !t.isApproved);
      load();
    } catch (err) {
      setError(err.message || "Could not update");
    } finally {
      setBusyId(null);
    }
  }

  async function remove(t) {
    if (!window.confirm(`Delete the testimonial from ${t.name}? This cannot be undone.`)) return;
    setBusyId(t._id);
    setError("");
    try {
      await adminDeleteTestimonial(token, t._id);
      load();
    } catch (err) {
      setError(err.message || "Could not delete");
    } finally {
      setBusyId(null);
    }
  }

  const hidden = testimonials.filter((t) => !t.isApproved);
  const approved = testimonials.filter((t) => t.isApproved);

  return (
    <div>
      <h1 className="font-display text-3xl text-choco">Testimonials</h1>
      <p className="mt-1 text-muted">
        Customer submissions go live automatically. The public page shows the 4 most
        recent — unpublish or delete anything that shouldn&apos;t be there.
      </p>

      {error && (
        <p className="mt-6 rounded-xl bg-brand-red/10 px-4 py-2 text-sm text-brand-red">{error}</p>
      )}

      {loading ? (
        <p className="mt-8 text-sm text-muted">Loading…</p>
      ) : testimonials.length === 0 ? (
        <p className="mt-8 text-sm text-muted">No testimonials submitted yet.</p>
      ) : (
        <>
          <Section
            title={`Live on site (${approved.length})`}
            items={approved}
            busyId={busyId}
            onToggle={toggleApproval}
            onDelete={remove}
            publicLimit={4}
          />
          <Section
            title={`Unpublished (${hidden.length})`}
            items={hidden}
            busyId={busyId}
            onToggle={toggleApproval}
            onDelete={remove}
          />
        </>
      )}
    </div>
  );
}

function Section({ title, items, busyId, onToggle, onDelete, publicLimit }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-10">
      <h2 className="tracked-mono text-xs uppercase text-brand-red">{title}</h2>
      <div className="mt-4 space-y-4">
        {items.map((t, i) => {
          // Only the newest `publicLimit` actually render on the public page.
          const onPublicPage = publicLimit != null && i < publicLimit;
          return (
          <div
            key={t._id}
            className="rounded-2xl border border-choco/10 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-choco">{t.name}</p>
                {t.city && <p className="text-xs uppercase tracking-wide text-muted">{t.city}</p>}
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  !t.isApproved
                    ? "bg-choco/10 text-choco/50"
                    : onPublicPage
                      ? "bg-green-100 text-green-700"
                      : "bg-brand-gold/20 text-choco"
                }`}
              >
                {!t.isApproved ? "Unpublished" : onPublicPage ? "Showing" : "Not in top 4"}
              </span>
            </div>

            <p className="mt-3 text-sm leading-7 italic text-muted">&ldquo;{t.quote}&rdquo;</p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => onToggle(t)}
                disabled={busyId === t._id}
                className="rounded-full bg-brand-red px-5 py-2 text-xs font-semibold text-white hover:bg-choco disabled:opacity-50"
              >
                {t.isApproved ? "Unpublish" : "Republish"}
              </button>
              <button
                onClick={() => onDelete(t)}
                disabled={busyId === t._id}
                className="rounded-full border border-choco/15 px-5 py-2 text-xs font-semibold text-choco hover:border-brand-red/40 hover:text-brand-red disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}
