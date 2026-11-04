import { Link } from "@tanstack/react-router";
import { contact } from "../../lib/portfolio-data";

const footerNav = [
  { label: "Projects", href: "#work" },
  { label: "Skills & Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Additional Info", href: "#additional" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-deep text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-sm font-bold text-brand-foreground shadow-md shadow-brand/25">
                ET
              </span>
              <span className="font-display text-base font-bold">Elli James Torres</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Executive Assistant, CRM Specialist, and Digital Marketing Support Professional —
              helping business owners organize operations, automate follow-up, and support growth.
            </p>
          </div>

          <nav className="flex flex-col gap-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
              Navigate
            </h4>
            {footerNav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 transition-colors hover:text-brand"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
              Connect
            </h4>
            <a
              href={`mailto:${contact.email}`}
              className="text-sm text-white/70 transition-colors hover:text-brand"
            >
              {contact.email}
            </a>
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/70 transition-colors hover:text-brand"
            >
              WhatsApp: {contact.whatsappNumber}
            </a>
            <a
              href={contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/70 transition-colors hover:text-brand"
            >
              LinkedIn
            </a>
            <a
              href={contact.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/70 transition-colors hover:text-brand"
            >
              Facebook
            </a>
            <a
              href={contact.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/70 transition-colors hover:text-brand"
            >
              Resume / CV
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-5 sm:flex-row">
          <p className="text-xs text-white/40">© 2026 Elli James Torres. All rights reserved.</p>
          <p className="text-xs text-white/40">
            Capabilities and experience — no guaranteed outcomes implied.
          </p>
        </div>
      </div>
    </footer>
  );
}
