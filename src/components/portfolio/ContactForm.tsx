import { useState, type FormEvent } from "react";
import { contact } from "../../lib/portfolio-data";
import { trackContactFormSubmission, type ContactFormValues } from "../../lib/contact-tracking";

const serviceOptions = [
  "CRM Management",
  "Workflow & Automation",
  "Funnels & Landing Pages",
  "Digital Marketing Support",
  "Executive & Virtual Assistance",
  "Other",
];

export function ContactForm({ heading = "Send a message" }: { heading?: string } = {}) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const values: ContactFormValues = {
      firstName: String(data.get("firstName") ?? "").trim(),
      lastName: String(data.get("lastName") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      serviceInterest: String(data.get("serviceInterest") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    if (!values.firstName || !values.email || !values.message) {
      setError("Please fill in your name, email, and a short message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      trackContactFormSubmission(values);
      setDone(true);
      form.reset();
    } catch {
      setError("Something went wrong sending your message. Please use the email button instead.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-2 py-8 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-brand text-2xl text-brand-foreground shadow-glow-brand">
          ✓
        </span>
        <h3 className="font-display text-xl font-bold text-white">Thanks! Message sent.</h3>
        <p className="max-w-sm text-sm text-white/70">
          I'll get back to you shortly. For a faster response, reach me on WhatsApp or email.
        </p>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="mt-1 text-sm font-semibold text-brand transition-colors hover:text-brand-bright"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    // Borderless, background-less, shadow-less form — visually transparent on the navy section.
    <form onSubmit={handleSubmit} className="flex h-full w-full flex-col gap-3.5">
      <h3 className="font-display text-lg font-bold text-white">{heading}</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="First name" name="firstName" required />
        <Field label="Last name" name="lastName" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone (optional)" name="phone" type="tel" />
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-white/80">Service interest</span>
        <select
          name="serviceInterest"
          defaultValue=""
          className="rounded-xl border border-white/15 bg-navy-deep/60 px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-brand"
        >
          <option value="" disabled>
            Select a service…
          </option>
          {serviceOptions.map((opt) => (
            <option key={opt} value={opt} className="bg-navy-deep text-white">
              {opt}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-white/80">Message</span>
        <textarea
          name="message"
          rows={3}
          required
          placeholder="Tell me about your business and what you need support with…"
          className="resize-none rounded-xl border border-white/15 bg-navy-deep/60 px-3 py-2.5 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-brand"
        />
      </label>

      {error && <p className="text-sm text-red-300">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/30 transition-all hover:bg-brand-bright disabled:opacity-60 sm:w-auto"
      >
        {submitting ? "Sending…" : "Send Message"}
      </button>

      <p className="text-center text-xs text-white/40">
        Prefer email? Reach me at{" "}
        <a href={`mailto:${contact.email}`} className="text-brand hover:underline">
          {contact.email}
        </a>
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-white/80">
        {label}
        {required && <span className="text-brand"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="rounded-xl border border-white/15 bg-navy-deep/60 px-3 py-2.5 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-brand"
      />
    </label>
  );
}
