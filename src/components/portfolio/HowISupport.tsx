import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const steps = [
  {
    number: "01",
    title: "Understand",
    description: "I learn about your current systems, goals, and operational challenges.",
  },
  {
    number: "02",
    title: "Organize & Implement",
    description:
      "I help configure your CRM, organize pipelines, build workflows, and support daily operations according to your requirements.",
  },
  {
    number: "03",
    title: "Support & Improve",
    description:
      "I monitor assigned tasks, maintain organized processes, and help identify opportunities for improvement.",
  },
];

export function HowISupport() {
  return (
    <section className="relative bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="How I Support Your Business"
            title={
              <>
                A simple, <span className="text-gradient-brand">three-step approach</span>
              </>
            }
            description="Every engagement is tailored — not every project includes all three steps."
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 120}>
              <div className="relative flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-lg shadow-navy/10">
                <span className="font-display text-5xl font-extrabold text-brand/15">
                  {step.number}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -right-3 top-1/2 hidden h-px w-6 bg-border md:block"
                  />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
