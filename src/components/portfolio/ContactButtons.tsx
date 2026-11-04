import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { SiGmail, SiWhatsapp } from "react-icons/si";
import { contact } from "../../lib/portfolio-data";

type Variant = "hero" | "section";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold cta-glow cta-glow-hover";

export function ContactButtons({
  variant = "section",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  const isHero = variant === "hero";

  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center ${className}`}>
      <a
        href={contact.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} w-full bg-brand text-brand-foreground shadow-lg shadow-brand/30 hover:bg-brand-bright hover:shadow-xl hover:shadow-brand/40 sm:w-auto`}
      >
        <SiWhatsapp className="h-4 w-4" aria-hidden />
        Contact Me on WhatsApp
      </a>
      <a
        href={`mailto:${contact.email}`}
        className={`${base} w-full border border-white/20 bg-white/5 text-white hover:bg-white/10 sm:w-auto ${
          isHero ? "" : ""
        }`}
      >
        <SiGmail className="h-4 w-4" aria-hidden />
        Email Me
      </a>
      <a
        href={contact.linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} w-full border border-white/20 bg-white/5 text-white hover:bg-white/10 sm:w-auto`}
      >
        <FaLinkedin className="h-4 w-4" aria-hidden />
        Connect on LinkedIn
      </a>
      <a
        href={contact.facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} w-full border border-white/20 bg-white/5 text-white hover:bg-white/10 sm:w-auto`}
      >
        <FaFacebook className="h-4 w-4" aria-hidden />
        Message Me on Facebook
      </a>
    </div>
  );
}
