import { ListChecks, Map, Workflow } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const benefits = [
  {
    icon: Map,
    title: "Find the Leaks",
    text: "I map your pipeline and show exactly where leads get stuck or dropped.",
  },
  {
    icon: Workflow,
    title: "Automate Follow Up",
    text: "See where automated email and SMS follow up can replace slow manual work.",
  },
  {
    icon: ListChecks,
    title: "Clear Next Steps",
    text: "You get a simple action plan to organize your CRM and close more deals.",
  },
];

export function Solution() {
  return (
    <section className="relative bg-light py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="The Solution"
            title={
              <>
                GoHighLevel Done Right,{" "}
                <span className="text-gradient-brand">Built Around Your Business</span>
              </>
            }
            description="I set up and optimize your GoHighLevel CRM, pipelines, and automations so leads get followed up fast and nothing falls through."
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 70}>
              <div className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg hover:shadow-navy/10 sm:p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand text-brand-foreground shadow-md shadow-brand/25">
                  <b.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-8 flex justify-center">
          <a
            href="#contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-4 text-base font-bold text-brand-foreground shadow-lg shadow-brand/30 transition-all hover:bg-brand-bright hover:shadow-xl hover:shadow-brand/40 sm:w-auto sm:py-3.5 sm:text-sm"
          >
            Let's Discuss Your CRM
          </a>
        </Reveal>
      </div>
    </section>
  );
}
