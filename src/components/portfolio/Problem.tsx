import { Clock, EyeOff, Funnel } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const pains = [
  {
    icon: Funnel,
    title: "Leads Sit Untouched",
    text: "New inquiries pile up in a messy pipeline with no clear next step.",
  },
  {
    icon: Clock,
    title: "Follow Up Is Manual",
    text: "You reply by hand, so hot leads go cold before you ever reach them.",
  },
  {
    icon: EyeOff,
    title: "No Clear Pipeline View",
    text: "You cannot tell which stage a deal is in or what needs action today.",
  },
];

export function Problem() {
  return (
    <section className="relative bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="The Problem"
            title={
              <>
                Leads Keep Slipping <span className="text-gradient-brand">Through the Cracks</span>
              </>
            }
            description="Leads arrive from your website, ads, and DMs. But without a clean CRM and automated follow up, they go cold before you ever reply."
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg hover:shadow-navy/10 sm:p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-brand">
                  <p.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
