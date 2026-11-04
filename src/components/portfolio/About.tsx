import { industries, skillsDeveloping } from "../../lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <>
      <span id="about-me" className="sr-only">
        About Me anchor
      </span>
      <section id="about" className="relative bg-background py-16 sm:py-24 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <SectionHeading
                eyebrow="About Me"
                title={
                  <>
                    Organized, practical, and{" "}
                    <span className="text-gradient-brand">detail-driven</span>
                  </>
                }
              />
              <div className="mt-7 space-y-5 text-base leading-relaxed text-muted-foreground">
                <p>
                  I am a results-driven Executive Assistant, CRM Specialist, and Digital Marketing
                  Support Professional with over 5 years of experience supporting business owners,
                  marketing agencies, and home service companies.
                </p>
                <p>
                  I specialize in CRM setup and management, workflow automation, sales pipeline
                  organization, lead management, appointment scheduling, and digital marketing
                  support. I have worked with businesses across home services, healthcare, beauty,
                  remodeling, accounting, and digital marketing.
                </p>
                <p>
                  My approach combines organized administration, practical automation, reliable
                  communication, and attention to detail. I aim to help businesses streamline daily
                  operations, improve lead follow-up, and create a better customer experience.
                </p>
                <p>
                  I am continuously developing my skills in Local SEO, Google Ads, AI-powered
                  automation, and digital marketing strategies.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="flex flex-col gap-5">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-lg shadow-navy/10">
                  <h3 className="font-display text-lg font-bold text-foreground">
                    Industries I've worked with
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {industries.map((ind) => (
                      <span
                        key={ind}
                        className="rounded-full border border-border bg-muted/60 px-3 py-1.5 text-sm font-medium text-foreground"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-gradient-to-br from-brand/5 to-violet/5 p-6 shadow-lg shadow-navy/10">
                  <h3 className="font-display text-lg font-bold text-foreground">
                    Continuously developing
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {skillsDeveloping.map((skill) => (
                      <li key={skill} className="flex items-center gap-2.5 text-sm text-foreground">
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-brand/15 text-brand">
                          <span aria-hidden className="text-[10px]">
                            ✓
                          </span>
                        </span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
