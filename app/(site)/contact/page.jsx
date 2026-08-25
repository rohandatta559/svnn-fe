"use client";
import { useState } from "react";
import Reveal from "@/components/Reveal";

const MAP_EMBED_SRC =
  "https://maps.google.com/maps?q=SVNN+Foods&ll=17.7187279,78.5003068&z=16&output=embed";

const contactCards = [
  {
    label: "Visit Us",
    lines: [
      "SVNN Foods",
      "Survey No. 148, Plot No. 18 & 19,",
      "Automotive Park, Kallakal Village,",
      "Manoharabad Mandal, Medak Dist.,",
      "Telangana - 502336, India",
    ],
  },
  {
    label: "Call Us",
    lines: ["Customer Care: +91 81252 88125", "Sales & Marketing: +91 90979 04444"],
  },
  {
    label: "Email Us",
    lines: ["support@svnnfoods.com", "Sales@svnnfoods.com"],
  },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal>
        <p className="tracked-mono mb-4 text-xs uppercase text-brand-red">Get In Touch</p>
        <h1 className="font-display text-4xl leading-tight text-choco md:text-6xl">
          Contact TruKid
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
          Questions about a product, bulk orders, or anything else — send us a note.
        </p>
      </Reveal>

      <Reveal delay={0.05} className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {contactCards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-choco/10 bg-white p-6 shadow-sm">
            <p className="tracked-mono mb-3 text-xs uppercase text-brand-red">{c.label}</p>
            {c.lines.map((line) => (
              <p key={line} className="text-sm leading-6 text-muted">
                {line}
              </p>
            ))}
          </div>
        ))}
      </Reveal>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <Reveal>
          {sent ? (
            <div className="rounded-3xl border border-brand-red/20 bg-brand-red/5 p-8 text-center">
              <p className="font-display text-2xl text-choco">Thanks for reaching out!</p>
              <p className="mt-2 text-muted">We'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-1 block text-sm font-medium text-choco/80">Name</label>
                <input
                  required
                  className="w-full rounded-xl border border-choco/15 bg-white px-4 py-3 text-choco outline-none focus:ring-2 focus:ring-brand-red"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-choco/80">Email</label>
                <input
                  required
                  type="email"
                  className="w-full rounded-xl border border-choco/15 bg-white px-4 py-3 text-choco outline-none focus:ring-2 focus:ring-brand-red"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-choco/80">Message</label>
                <textarea
                  required
                  rows={5}
                  className="w-full rounded-xl border border-choco/15 bg-white px-4 py-3 text-choco outline-none focus:ring-2 focus:ring-brand-red"
                />
              </div>
              <button
                type="submit"
                className="rounded-full bg-brand-red px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-choco"
              >
                Send Message
              </button>
            </form>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="h-full min-h-[360px] overflow-hidden rounded-3xl border border-choco/10 shadow-lg shadow-choco/5">
            <iframe
              title="TruKid / SVNN Foods location"
              src={MAP_EMBED_SRC}
              className="h-full min-h-[360px] w-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
