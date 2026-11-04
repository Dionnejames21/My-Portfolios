import { useEffect, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { contact } from "../../lib/portfolio-data";

/**
 * Sticky floating CTA. Appears once the user scrolls past the hero section,
 * stays fixed at the bottom-right, and glows on hover. Links to WhatsApp
 * (the primary direct-contact channel).
 */
export function FloatingCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() {
      // Show after scrolling ~90vh (past the hero).
      setShow(window.scrollY > (window.innerHeight || 800) * 0.9);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <a
      href={contact.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Me on WhatsApp"
      className={`group fixed bottom-5 right-5 z-[70] inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3.5 text-sm font-bold text-brand-foreground shadow-xl shadow-brand/40 transition-all duration-500 hover:bg-brand-bright hover:shadow-[0_0_30px_-4px_var(--color-brand)] sm:bottom-7 sm:right-7 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <SiWhatsapp className="h-5 w-5 transition-transform group-hover:scale-110" aria-hidden />
      <span className="hidden sm:inline">Let's Talk</span>
      <span className="sm:hidden">Chat</span>
    </a>
  );
}
