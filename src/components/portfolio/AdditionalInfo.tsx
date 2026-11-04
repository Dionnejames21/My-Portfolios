import { industries, skillsDeveloping } from "../../lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionBackground } from "./SectionBackground";
import { SectionHeading } from "./SectionHeading";
import { Tools } from "./Tools";

export function AdditionalInfo() {
  return (
    <section id="additional" className="relative overflow-hidden bg-background py-16 sm:py-24">
      <SectionBackground section="experience" strength={0.14} scrim="rgba(7,17,31,0.86)" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Additional Information"
            title={
              <>
                Background, Industries &{" "}
                <span className="text-gradient-brand">Supported Tools</span>
              </>
            }
            description="A broader look at the industries I support, non-core capabilities, and the software ecosystem relevant to my GoHighLevel work."
            className="mx-auto"
          />
        </Reveal>

        {/* Bio + Industries + Skills Developing grid */}
        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          {/* Extended Bio */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex h-full flex-col justify-between rounded-2xl glass-card p-7">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand">
                    Professional Background
                  </span>
                  <h3 className="mt-1 font-display text-xl font-bold text-foreground">
                    Organized Administration & Systems Thinking
                  </h3>
                  <div className="mt-4 space-y-3.5 text-sm leading-relaxed text-muted-foreground">
                    <p>
                      I am an Executive Assistant, GoHighLevel Specialist, and Digital Marketing
                      Support Professional with over 5 years of experience supporting business
                      owners, marketing agencies, and service companies across the US, UK, Canada,
                      and internationally.
                    </p>
                    <p>
                      My approach combines structured administration, reliable communication, and
                      practical automation. Rather than overcomplicating systems, I build workflows
                      and pipelines that are clean, easy for sales teams to use, and durable over
                      the long term.
                    </p>
                    <p>
                      Beyond day-to-day GoHighLevel configuration, I support clients with executive
                      calendar management, CRM hygiene, document organization, and campaign
                      coordination.
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">Work style:</span>{" "}
                    Detail-driven, independent execution, proactive status updates, and no
                    exaggerated claims.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Industries + Continuous Development */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Reveal delay={80}>
              <div className="rounded-2xl glass-card p-6">
                <span className="text-xs font-bold uppercase tracking-widest text-brand">
                  Client Portfolio
                </span>
                <h3 className="mt-1 font-display text-lg font-bold text-foreground">
                  Industries I've Worked With
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {industries.map((ind) => (
                    <span
                      key={ind}
                      className="rounded-full border border-border bg-muted/60 px-3 py-1.5 text-xs font-medium text-foreground"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-2xl glass-card p-6">
                <span className="text-xs font-bold uppercase tracking-widest text-brand">
                  Growth & Continuous Learning
                </span>
                <h3 className="mt-1 font-display text-lg font-bold text-foreground">
                  Active Skill Development
                </h3>
                <ul className="mt-3.5 space-y-2">
                  {skillsDeveloping.map((skill) => (
                    <li key={skill} className="flex items-center gap-2.5 text-xs text-foreground">
                      <span className="grid h-4 w-4 place-items-center rounded-full bg-brand/15 text-brand">
                        <span aria-hidden className="text-[9px]">
                          ✓
                        </span>
                      </span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Animated Marquee of Tools & Platforms (existing approved visual) */}
        <div className="mt-16">
          <Tools />
        </div>
      </div>
    </section>
  );
}
