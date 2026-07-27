"use client";

import { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";

const inquiryTypes = [
  "Gallery Enquiries",
  "Collectors",
  "Collaborations",
  "Press",
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", type: "", message: "" });
    }, 3000);
  };

  return (
    <section className="px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <p className="text-xs tracking-[0.4em] uppercase opacity-40">Contact</p>
          <h1 className="mt-4 font-display text-4xl tracking-tight md:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-6 text-sm opacity-50">
            For gallery enquiries, acquisitions, collaborations, or press — I&apos;d love to hear from you.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-10 flex flex-wrap gap-3">
            {inquiryTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFormData({ ...formData, type })}
                className={`border px-5 py-2.5 text-xs tracking-[0.2em] uppercase transition-all ${
                  formData.type === type
                    ? "border-violet-accent bg-violet-accent/10"
                    : "border-charcoal/10 hover:border-violet-accent/50 dark:border-warm-white/10"
                }`}
                data-cursor-hover
              >
                {type}
              </button>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-xs tracking-[0.2em] uppercase opacity-40">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border-b border-charcoal/10 bg-transparent py-3 text-sm transition-colors focus:border-violet-accent focus:outline-none dark:border-warm-white/10"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-xs tracking-[0.2em] uppercase opacity-40">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border-b border-charcoal/10 bg-transparent py-3 text-sm transition-colors focus:border-violet-accent focus:outline-none dark:border-warm-white/10"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-xs tracking-[0.2em] uppercase opacity-40">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full resize-none border-b border-charcoal/10 bg-transparent py-3 text-sm leading-relaxed transition-colors focus:border-violet-accent focus:outline-none dark:border-warm-white/10"
              />
            </div>

            <button
              type="submit"
              className="mt-4 self-start border border-charcoal/20 px-10 py-4 text-xs tracking-[0.3em] uppercase transition-all hover:border-violet-accent dark:border-warm-white/20"
              data-cursor-hover
            >
              {submitted ? "Message Sent" : "Send Message"}
            </button>
          </form>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="mt-20 border-t border-charcoal/5 pt-12 dark:border-warm-white/5">
            <p className="text-xs tracking-[0.3em] uppercase opacity-40">Direct</p>
            <a
              href="mailto:hello@julioparejo.com"
              className="mt-3 inline-block font-display text-xl transition-opacity hover:opacity-70"
              data-cursor-hover
            >
              hello@julioparejo.com
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
