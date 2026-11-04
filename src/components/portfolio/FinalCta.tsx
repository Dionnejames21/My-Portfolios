import { ContactButtons } from "./ContactButtons";
import { Reveal } from "./Reveal";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-navy py-14 text-white sm:py-16">
      <div className="absolute inset-0 bg-hero-grid opacity-[0.1]" />
      <div className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full bg-brand/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-violet/20 blur-[120px]" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-brand">
            <span className="h-2 w-2 rounded-full bg-brand" />
            GoHighLevel Specialist
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Have a GoHighLevel Project in Mind?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75">
            Need help setting up your GoHighLevel CRM, building workflows, automating follow-ups, or
            creating landing pages? Let's discuss your project and find the right solution for your
            business.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-8">
          <ContactButtons variant="section" />
        </Reveal>
      </div>
    </section>
  );
}
