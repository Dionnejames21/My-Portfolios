import { Reveal } from "./Reveal";
import { SectionBackground } from "./SectionBackground";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

type SkillService = {
  icon: string;
  title: string;
  description: string;
  items: string[];
};

const skillsAndServices: SkillService[] = [
  {
    icon: "🗂",
    title: "GoHighLevel CRM Setup & Configuration",
    description:
      "End-to-end account configuration, sub-account setup, user roles, custom values, and system organization.",
    items: [
      "Sub-account onboarding & foundational settings",
      "Custom fields, values, and tag taxonomy",
      "Company branding & business profile setup",
      "Data cleanup and contact imports",
    ],
  },
  {
    icon: "📊",
    title: "Pipeline and Opportunity Management",
    description:
      "Structured sales stages and visual pipelines that keep deals organized and track conversion milestones.",
    items: [
      "Multi-stage sales pipelines customized to your sales cycle",
      "Opportunity value tracking and status updates",
      "Automated stage triggers and lead routing",
      "Deal stagnation alerts for sales teams",
    ],
  },
  {
    icon: "⚡",
    title: "Workflow Automation",
    description:
      "Smart automation sequences that eliminate repetitive manual tasks and speed up response times.",
    items: [
      "Event-driven triggers, conditional branches, and delay timers",
      "Internal notification alerts for team members",
      "Workflow testing, troubleshooting, and optimization",
      "Task assignment and automated pipeline stage updates",
    ],
  },
  {
    icon: "💬",
    title: "SMS and Email Follow-Up Systems",
    description:
      "Multi-channel nurturing sequences designed to respond to inbound leads within seconds.",
    items: [
      "Fast lead-response SMS and email nurture sequences",
      "Appointment reminder sequences (24h, 2h, 15m)",
      "No-show re-engagement and reactivation campaigns",
      "Review request sequences after completed appointments",
    ],
  },
  {
    icon: "🧭",
    title: "Landing Page and Funnel Development",
    description:
      "Clean, responsive GoHighLevel funnels and landing pages built to capture and convert traffic.",
    items: [
      "Mobile-optimized layout and conversion-focused structure",
      "Direct form and calendar embed integrations",
      "Thank you pages, upsell flows, and confirmation pages",
      "Fast-loading, clean typography and on-brand visuals",
    ],
  },
  {
    icon: "📋",
    title: "Forms and Surveys",
    description:
      "Targeted lead capture forms and multi-step qualification surveys that map data directly into CRM fields.",
    items: [
      "Lead capture forms with real-time field validation",
      "Multi-step qualification surveys with conditional logic",
      "Embedded popup, inline, and sticky lead forms",
      "Dynamic routing based on survey responses",
    ],
  },
  {
    icon: "📅",
    title: "Appointment Setting and Calendar Setup",
    description:
      "Automated booking calendars that sync with your schedule and prevent double bookings.",
    items: [
      "Round-robin, team, and individual booking calendars",
      "Google Workspace & Outlook calendar bi-directional sync",
      "Custom availability rules, buffer times, and booking limits",
      "Automated booking confirmation and calendar invites",
    ],
  },
  {
    icon: "🔌",
    title: "Third-Party Integrations",
    description:
      "Connecting GoHighLevel with external business tools, marketing platforms, and communication apps.",
    items: [
      "Zapier, Make, and webhook connections",
      "Meta Business Suite and Meta Lead Ads integration",
      "Google Ads, Analytics, and Tag Manager tracking setup",
      "Payment processor and external tool syncing",
    ],
  },
];

export function SkillsAndServices() {
  return (
    <section id="services" className="relative overflow-hidden bg-light py-16 sm:py-24">
      <SectionBackground section="services" strength={0.16} scrim="rgba(16,27,45,0.84)" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Core Services"
            title={
              <>
                GoHighLevel <span className="text-gradient-brand">Skills & Services</span>
              </>
            }
            description="Focused capabilities designed specifically for business owners and marketing agencies looking to implement, optimize, or scale their GoHighLevel systems."
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {skillsAndServices.map((service, i) => (
            <Reveal key={service.title} delay={i * 60}>
              <TiltCard max={7} className="h-full">
                <article className="group glass-card glass-card-hover flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/20 text-xl shadow-md shadow-brand/20 ring-1 ring-brand/30 drop-shadow-[0_0_8px_var(--color-brand)]">
                      {service.icon}
                    </span>
                    <h3 className="font-display text-base font-bold leading-snug text-foreground">
                      {service.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>

                  <ul className="mt-4 space-y-2 border-t border-border pt-4">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-xs leading-relaxed text-foreground/80"
                      >
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
