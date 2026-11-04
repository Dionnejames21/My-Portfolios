import { ClipboardList, Compass, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { SectionBackground } from "./SectionBackground";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

const steps = [
  {
    n: "1",
    icon: Send,
    title: "Reach Out",
    text: "Message me on WhatsApp, email, or LinkedIn with a short note about your CRM and goals.",
  },
  {
    n: "2",
    icon: ClipboardList,
    title: "I Review Your Setup",
    text: "I look at your GoHighLevel CRM, pipelines, and automations to find what slows you down.",
  },
  {
    n: "3",
    icon: Compass,
    title: "Get a Clear Plan",
    text: "You get a simple action plan to organize your CRM, automate follow-up, and capture more leads.",
  },
];

// Floating "target audience tools" icons scattered in the background.
const floatingIcons = [
  { icon: "⚙", top: "12%", left: "8%", size: "text-3xl", delay: "0s" },
  { icon: "📊", top: "22%", left: "88%", size: "text-4xl", delay: "1.2s" },
  { icon: "💬", top: "68%", left: "6%", size: "text-3xl", delay: "0.6s" },
  { icon: "🔌", top: "78%", left: "90%", size: "text-3xl", delay: "1.8s" },
  { icon: "📅", top: "45%", left: "14%", size: "text-2xl", delay: "0.9s" },
  { icon: "🗂", top: "52%", left: "82%", size: "text-3xl", delay: "1.5s" },
];

export function HowItWorks() {
  const lineRef = useRef<HTMLDivElement | null>(null);
  const [drawn, setDrawn] = useState(false);

  // Animate the connecting line to "draw" itself when the section scrolls in.
  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-background py-12 sm:py-16">
      {/* Cinematic parallax background */}
      <SectionBackground section="howItWorks" strength={0.16} scrim="rgba(7,17,31,0.85)" />

      {/* Subtle animated gradient layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30 animate-gradient-pan"
        style={{
          backgroundImage:
            "linear-gradient(120deg, color-mix(in oklab, var(--color-brand) 14%, transparent), color-mix(in oklab, var(--color-violet) 14%, transparent), color-mix(in oklab, var(--color-brand) 14%, transparent))",
        }}
      />

      {/* Floating tool icons scattered in the background */}
      {floatingIcons.map((f, i) => (
        <span
          key={i}
          aria-hidden
          className={`pointer-events-none absolute ${f.size} text-brand/25 blur-[1px]`}
          style={{
            top: f.top,
            left: f.left,
            animation: `float-icon 6s ease-in-out ${f.delay} infinite`,
          }}
        >
          {f.icon}
        </span>
      ))}

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="How It Works"
            title={
              <>
                Three Simple Steps to a <span className="text-gradient-brand">Cleaner CRM</span>
              </>
            }
            className="mx-auto"
          />
        </Reveal>

        {/* Steps + scroll-drawn connecting line */}
        <div ref={lineRef} className="relative mt-8">
          {/* Horizontal connecting line (desktop) that draws itself on scroll */}
          <div className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-14 hidden h-0.5 sm:block">
            <div
              className="h-full origin-left bg-linear-to-r from-brand via-violet-soft to-brand transition-transform duration-[1400ms] ease-out"
              style={{ transform: drawn ? "scaleX(1)" : "scaleX(0)" }}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <TiltCard max={9} className="h-full">
                  <div className="glass-card glass-card-hover flex h-full flex-col rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 sm:p-6">
                    <div className="flex items-center gap-3">
                      <span className="relative grid h-12 w-12 place-items-center rounded-full bg-brand font-display text-xl font-extrabold text-brand-foreground shadow-lg shadow-brand/40 ring-2 ring-brand/30">
                        <span className="absolute inset-0 rounded-full bg-brand/40 blur-md" />
                        <span className="relative">{s.n}</span>
                      </span>
                      <s.icon
                        className="h-6 w-6 text-brand drop-shadow-[0_0_6px_var(--color-brand)]"
                        aria-hidden
                      />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
