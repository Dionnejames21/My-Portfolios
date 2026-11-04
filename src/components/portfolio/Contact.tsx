import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { SiGmail, SiWhatsapp } from "react-icons/si";
import { contact, voiceIntroUrl } from "../../lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionBackground } from "./SectionBackground";
import { SectionHeading } from "./SectionHeading";

const profilePhoto =
  "https://vibe.filesafe.space/1793286545658653540/attachments/5cb943a8-7d31-46d6-86a5-826481d7385a.jpg";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-navy py-16 text-white sm:py-20">
      <SectionBackground section="contact" strength={0.18} scrim="rgba(7,17,31,0.82)" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            onDark
            eyebrow="Contact"
            title={
              <>
                Let's Build Something with <span className="text-gradient-brand">GoHighLevel</span>
              </>
            }
            description="I'm available to help businesses and agencies with GoHighLevel CRM implementation, workflow automation, funnels, and landing pages. Reach out through your preferred contact channel to discuss your project."
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {/* Identity + direct contact buttons */}
          <Reveal>
            <div className="flex h-full flex-col gap-5 rounded-2xl glass-card p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <img
                  src={profilePhoto}
                  alt="Elli James Torres"
                  className="h-14 w-14 shrink-0 rounded-xl border border-white/20 object-cover object-top shadow-md shadow-navy-deep/50"
                />
                <div>
                  <p className="font-display text-lg font-bold text-white">{contact.name}</p>
                  <p className="text-sm text-white/60">
                    GoHighLevel Specialist | CRM Setup | Workflow Automation | Landing Pages
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <a
                  href={contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-brand-foreground shadow-md shadow-brand/25 cta-glow cta-glow-hover transition-all hover:bg-brand-bright"
                >
                  <SiWhatsapp className="h-4 w-4" aria-hidden />
                  Contact Me on WhatsApp
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <SiGmail className="h-4 w-4" aria-hidden />
                  Email Me
                </a>
                <a
                  href={contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <FaLinkedin className="h-4 w-4" aria-hidden />
                  Connect on LinkedIn
                </a>
                <a
                  href={contact.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <FaFacebook className="h-4 w-4" aria-hidden />
                  Message Me on Facebook
                </a>
                <a
                  href={contact.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  View My Resume
                </a>
              </div>
            </div>
          </Reveal>

          {/* Voice intro */}
          <Reveal delay={80}>
            <div className="flex h-full flex-col gap-4 rounded-2xl glass-card p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet/20 text-lg text-violet-soft">
                  🎙
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    Listen to My Voice Introduction
                  </h3>
                  <p className="text-sm text-white/60">Optional audio introduction</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-navy-deep/40 p-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground">
                  ▶
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-end gap-1">
                    {[8, 14, 20, 12, 18, 10, 16, 22, 9, 15, 11, 19, 7, 13].map((h, i) => (
                      <span
                        key={i}
                        className="w-1 rounded-full bg-brand/60"
                        style={{ height: `${h}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <a
                href={voiceIntroUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Open Voice Recording <span aria-hidden>↗</span>
              </a>
              <p className="text-xs text-white/50">
                Opens the original recording on Vocaroo. Audio only, not a video.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
