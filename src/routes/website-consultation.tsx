import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarClock, CheckCircle2, Loader2 } from "lucide-react";
import {
  trackConsultationFormSubmission,
  GOOGLE_CALENDAR_BOOKING_URL,
} from "../lib/contact-tracking";
import { Reveal } from "../components/portfolio/Reveal";
import { ContactButtons } from "../components/portfolio/ContactButtons";

const websiteInterestOptions = [
  "New website build",
  "GoHighLevel funnel/landing page",
  "CRM/automation setup",
  "Website redesign",
  "Other",
] as const;

export const Route = createFileRoute("/website-consultation")({
  head: () => ({
    meta: [
      {
        title: "Book a Website Consultation — Elli James Torres | GoHighLevel Specialist",
      },
      {
        name: "description",
        content:
          "Book a website consultation with Elli James Torres. Share your website goals and we'll explore how to bring your vision to life with GoHighLevel CRM, automation, funnels, and landing pages.",
      },
      {
        property: "og:title",
        content: "Book a Website Consultation — Elli James Torres",
      },
      {
        property: "og:description",
        content:
          "Share your website goals and book a consultation to explore how GoHighLevel CRM, automation, and landing pages can help your business.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConsultationPage,
});

type Status = "idle" | "submitting" | "saved" | "error";
type FormKey = "fullName" | "email" | "phone" | "websiteInterest" | "message";
type FormErrors = Partial<Record<FormKey, string>>;

function ConsultationPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    websiteInterest: "",
    message: "",
  });

  const update =
    (field: FormKey) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      if (errors[field]) setErrors((er) => ({ ...er, [field]: "" }));
    };

  function validate(): boolean {
    const next: FormErrors = {};
    if (!form.fullName.trim()) next.fullName = "Please enter your full name.";
    if (!form.email.trim()) next.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email address.";
    if (!form.phone.trim()) next.phone = "Please enter your phone number.";
    if (!form.websiteInterest) next.websiteInterest = "Please select an option.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting" || status === "saved") return;
    if (!validate()) return;
    setStatus("submitting");
    const ok = await trackConsultationFormSubmission({
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      websiteInterest: form.websiteInterest,
      message: form.message,
    });
    if (ok) {
      setStatus("saved");
      // Brief confirmation, then proceed to the external Google Calendar schedule.
      setTimeout(() => {
        window.location.href = GOOGLE_CALENDAR_BOOKING_URL;
      }, 900);
    } else {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-navy-deep text-white">
      {/* Ambient brand glows matching the portfolio's cinematic style */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-brand/15 blur-[140px]" />
        <div className="absolute -right-32 top-40 h-[28rem] w-[28rem] rounded-full bg-violet/15 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6 lg:pt-32">
        <Reveal>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 transition-colors hover:text-brand"
          >
            <span aria-hidden>←</span> Back to home
          </Link>
        </Reveal>

        <Reveal delay={40}>
          <div className="mt-6 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/15 text-brand ring-1 ring-brand/30">
              <CalendarClock className="h-6 w-6" aria-hidden />
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
              Website Consultation
            </span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Book a <span className="text-gradient-brand">Website Consultation</span>
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Let&apos;s discuss your website goals and explore how we can help bring your vision to
            life. Complete the information below to get started.
          </p>
        </Reveal>

        {status === "saved" ? (
          <Reveal delay={60}>
            <div className="mt-10 rounded-3xl border border-brand/30 bg-card/80 p-8 text-center shadow-premium backdrop-blur-xl">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand/15 text-brand ring-1 ring-brand/30">
                <CheckCircle2 className="h-7 w-7" aria-hidden />
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold text-white">
                Your details are saved
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/70">
                Thanks, {form.fullName.split(/\s+/)[0] || "there"}! Your consultation request has
                been captured as a pending lead. Taking you to the scheduling calendar now to pick a
                time that works for you…
              </p>
              <a
                href={GOOGLE_CALENDAR_BOOKING_URL}
                className="cta-glow cta-glow-hover mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-bold text-brand-foreground shadow-lg shadow-brand/30 transition-all hover:bg-brand-bright sm:w-auto"
              >
                Continue to Schedule <span aria-hidden>→</span>
              </a>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={160}>
            <form
              onSubmit={onSubmit}
              noValidate
              className="mt-10 rounded-3xl border border-white/12 bg-card/70 p-6 shadow-premium backdrop-blur-xl sm:p-8"
            >
              {/* Full Name */}
              <Field id="fullName" label="Full Name" required error={errors.fullName}>
                <input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  value={form.fullName}
                  onChange={update("fullName")}
                  className={inputCls(errors.fullName)}
                  placeholder="Jane Doe"
                />
              </Field>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {/* Email */}
                <Field id="email" label="Email Address" required error={errors.email}>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={update("email")}
                    className={inputCls(errors.email)}
                    placeholder="you@company.com"
                  />
                </Field>

                {/* Phone */}
                <Field id="phone" label="Phone Number" required error={errors.phone}>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={update("phone")}
                    className={inputCls(errors.phone)}
                    placeholder="+1 555 000 0000"
                  />
                </Field>
              </div>

              {/* Website Interest dropdown */}
              <div className="mt-5">
                <Field
                  id="websiteInterest"
                  label="What type of website are you interested in?"
                  required
                  error={errors.websiteInterest}
                >
                  <select
                    id="websiteInterest"
                    value={form.websiteInterest}
                    onChange={update("websiteInterest")}
                    className={inputCls(errors.websiteInterest)}
                  >
                    <option value="" disabled>
                      Select an option…
                    </option>
                    {websiteInterestOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-navy text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Additional message */}
              <div className="mt-5">
                <Field id="message" label="Additional Message" optional>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={update("message")}
                    className={`${inputCls(undefined)} resize-y`}
                    placeholder="Tell me a little about your project, goals, or any questions you have…"
                  />
                </Field>
              </div>

              {status === "error" && (
                <p className="mt-5 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
                  We couldn&apos;t save your details right now. Please try again, or reach me
                  directly through the contact options below.
                </p>
              )}

              {/* Submit — captures lead BEFORE redirecting to Google Calendar */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="cta-glow cta-glow-hover mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-4 text-sm font-bold uppercase tracking-wide text-brand-foreground shadow-lg shadow-brand/30 transition-all hover:bg-brand-bright hover:shadow-xl hover:shadow-brand/40 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    Saving your details…
                  </>
                ) : (
                  <>Continue to Schedule</>
                )}
              </button>

              <p className="mt-4 text-center text-xs leading-relaxed text-white/45">
                Your contact information is saved before you continue, so I can follow up even if
                you don&apos;t finish booking.
              </p>
            </form>
          </Reveal>
        )}

        {/* Fallback direct contact */}
        <Reveal delay={60}>
          <div className="mt-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Prefer to reach out directly?
            </p>
            <div className="mt-4 flex justify-center">
              <ContactButtons variant="section" />
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}

/* ---- small local helpers to match the portfolio's styling ---- */

function Field({
  id,
  label,
  children,
  required,
  optional,
  error,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  required?: boolean;
  optional?: boolean;
  error?: string | undefined;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/70"
      >
        {label}
        {required && <span className="text-brand">*</span>}
        {optional && <span className="text-white/35">(optional)</span>}
      </label>
      {children}
      {error && <p className="mt-2 text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}

function inputCls(error: string | undefined): string {
  return `w-full rounded-xl border ${
    error
      ? "border-destructive/60 bg-destructive/5"
      : "border-white/12 bg-white/5 focus:border-brand/60"
  } px-4 py-3 text-sm text-white placeholder-white/35 outline-none ring-0 transition-colors focus:ring-2 focus:ring-brand/40`;
}
