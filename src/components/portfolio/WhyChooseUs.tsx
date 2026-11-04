import { Building2, Handshake, MessageSquareText, Star } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const points = [
  {
    icon: Star,
    title: "5+ Years of Hands On CRM Work",
    text: "Real experience setting up and managing CRM systems, workflows, and pipelines.",
  },
  {
    icon: MessageSquareText,
    title: "Plain Talk, No Jargon",
    text: "I explain what to fix in simple terms so you can act on it right away.",
  },
  {
    icon: Handshake,
    title: "No Pressure",
    text: "We talk through your needs first, and you decide what to book next.",
  },
  {
    icon: Building2,
    title: "Built for Service Businesses",
    text: "I work with home service, healthcare, beauty, remodeling, accounting, and marketing.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative bg-light py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Why Work With Me"
            title={
              <>
                Trusted, Clear, and <span className="text-gradient-brand">Pressure Free</span>
              </>
            }
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg hover:shadow-navy/10 sm:p-6">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy text-brand">
                  <p.icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-foreground">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
