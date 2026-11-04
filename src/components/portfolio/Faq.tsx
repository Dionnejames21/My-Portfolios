import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const faqs = [
  {
    q: "What GoHighLevel services do you offer?",
    a: "CRM setup and configuration, pipeline and opportunity management, workflow automation, follow-up systems, landing pages and funnels, forms and lead capture, appointment booking, SMS and email automation, and third-party integrations.",
  },
  {
    q: "Do I need to already use GoHighLevel to work with you?",
    a: "No. I can help set up a brand new GoHighLevel account or organize and optimize an existing one. Either way, we tailor the system to your business and processes.",
  },
  {
    q: "How do we get started?",
    a: "Reach out through WhatsApp, email, or LinkedIn with a short note about your project. We'll discuss your goals and the right scope of work for your business.",
  },
  {
    q: "Can you build automations and landing pages, not just CRM setup?",
    a: "Yes. Beyond CRM configuration, I build automated follow-up workflows, lead capture forms, appointment booking, and conversion-focused landing pages and funnels.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="relative bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="FAQ"
            title={
              <>
                Common <span className="text-gradient-brand">Questions</span>
              </>
            }
            description="Quick answers before you reach out about your GoHighLevel project."
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-7 flex flex-col gap-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 50}>
                <div
                  className={`overflow-hidden rounded-2xl border bg-card transition-colors ${
                    isOpen ? "border-brand/40 shadow-soft" : "border-border"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-brand/[0.04]"
                  >
                    <span className="font-display text-base font-bold text-foreground">{f.q}</span>
                    <ChevronDown
                      aria-hidden
                      className={`h-5 w-5 shrink-0 text-brand transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-border/70 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                      {f.a}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
