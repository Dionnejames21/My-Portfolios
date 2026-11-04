import { Reveal } from "./Reveal";
import { SectionBackground } from "./SectionBackground";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

type ExperienceItem = {
  role: string;
  focus: string;
  period: string;
  description: string;
  highlights: string[];
};

const experienceItems: ExperienceItem[] = [
  {
    role: "GoHighLevel Specialist & CRM Operations",
    focus: "CRM Architecture, Pipelines & Automation",
    period: "5+ Years Experience",
    description:
      "Supporting business owners, marketing agencies, and home service companies with end-to-end GoHighLevel setup, sales pipeline organization, and automated lead nurturing.",
    highlights: [
      "Custom pipeline and opportunity stage architecture tailored to sales cycles",
      "Automated multi-channel follow-up sequences across SMS, email, and task alerts",
      "Lead capture forms, survey workflows, and dynamic custom field mapping",
      "Calendar setup, appointment reminders, and no-show re-engagement systems",
    ],
  },
  {
    role: "Digital Marketing Support Professional",
    focus: "Paid Traffic, Local SEO & Funnel Infrastructure",
    period: "Agencies & Local Businesses",
    description:
      "Building the conversion infrastructure behind advertising campaigns and local search presence across home services, healthcare, beauty, remodeling, and accounting.",
    highlights: [
      "High-converting landing pages and funnel structures connected directly to CRM",
      "Meta Business Suite and Meta Ads Manager campaign support & tracking",
      "Google Local Services Ads support and Google Business Profile management",
      "Campaign monitoring, reporting, and lead-to-opportunity attribution",
    ],
  },
  {
    role: "Executive Assistant & Virtual Operations",
    focus: "Operations, Scheduling & Client Communication",
    period: "Business Operations",
    description:
      "Delivering high-reliability administrative execution, proactive calendar coordination, customer communication, and daily operational support.",
    highlights: [
      "Calendar and appointment coordination across international time zones",
      "Customer and client communication with rapid, professional response times",
      "Data organization, CRM hygiene, and documentation management",
      "Standard operating procedure execution and task coordination",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden bg-background py-16 sm:py-24">
      <SectionBackground section="experience" strength={0.16} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Professional Experience"
            title={
              <>
                Hands-On Experience Across{" "}
                <span className="text-gradient-brand">CRM, Marketing & Operations</span>
              </>
            }
            description="Documented background supporting business owners, agencies, and home service companies with GoHighLevel execution and administrative reliability."
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {experienceItems.map((item, i) => (
            <Reveal key={item.role} delay={i * 90}>
              <TiltCard max={6} className="h-full">
                <article className="flex h-full flex-col rounded-2xl glass-card glass-card-hover p-7 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-bold text-brand">
                      {item.period}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">{item.focus}</span>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold text-foreground">
                    {item.role}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>

                  <div className="mt-5 border-t border-border pt-4">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Core Responsibilities
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {item.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2.5 text-xs text-foreground/80">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
