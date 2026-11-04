import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type Service = {
  icon: string;
  title: string;
  items: string[];
};

const services: Service[] = [
  {
    icon: "🗂",
    title: "CRM Management",
    items: [
      "CRM setup and organization",
      "Contact and opportunity management",
      "Pipeline configuration",
      "Custom fields, forms, and surveys",
    ],
  },
  {
    icon: "⚙",
    title: "Workflow & Automation",
    items: [
      "Automated email and SMS follow-ups",
      "Appointment reminders",
      "Lead notifications",
      "Workflow troubleshooting and optimization",
    ],
  },
  {
    icon: "🧭",
    title: "Funnels & Landing Pages",
    items: [
      "Landing page creation",
      "Funnel structure and layout",
      "Forms and lead capture",
      "Conversion-focused page improvements",
    ],
  },
  {
    icon: "📣",
    title: "Digital Marketing Support",
    items: [
      "Meta Business Suite management",
      "Meta Ads Manager campaign support",
      "Facebook and Instagram lead-generation support",
      "Google Local Services Ads support",
      "Google Business Profile management",
      "Campaign monitoring and reporting",
    ],
  },
  {
    icon: "📅",
    title: "Executive & Virtual Assistance",
    items: [
      "Calendar and appointment management",
      "Customer and client communication",
      "Data management and administrative tasks",
      "Business operations support",
      "Email and document organization",
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="relative bg-light py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Services"
            title={
              <>
                How I can <span className="text-gradient-brand">support your business</span>
              </>
            }
            description="These are capabilities and areas of experience — presented to help you evaluate fit, not as guarantees of outcomes."
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 80}>
              <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-lg shadow-navy/10 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-xl hover:shadow-navy/15">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-lg shadow-md shadow-navy/30">
                    {service.icon}
                  </span>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {service.title}
                  </h3>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}

          {/* Tools card */}
          <Reveal delay={services.length * 80}>
            <article className="flex h-full flex-col rounded-2xl border border-border bg-gradient-to-br from-navy to-navy-deep p-6 text-white shadow-lg shadow-navy/20">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-lg">
                  🧰
                </span>
                <h3 className="font-display text-lg font-bold">Tools & Platforms</h3>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {[
                  "GoHighLevel",
                  "Meta Business Suite",
                  "Meta Ads Manager",
                  "Google Workspace",
                  "Google Sheets",
                  "Google Business Profile",
                  "Google Local Services Ads",
                  "Calendly",
                  "Salesforce",
                  "Slack",
                  "Zapier",
                ].map((tool) => (
                  <li
                    key={tool}
                    className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-white/90"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-white/50">
                Listed as tools I work with — not as official certifications.
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
