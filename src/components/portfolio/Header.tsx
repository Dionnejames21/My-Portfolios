import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";

const navLinks = [
  { label: "Home", href: "/", isRoute: true },
  { label: "About Me", href: "/#about", isRoute: false },
  { label: "Website Portfolio (98)", href: "/website-portfolio", isRoute: true },
  { label: "Video Portfolio", href: "/video-portfolio", isRoute: true },
  { label: "Companies", href: "/#companies", isRoute: false },
  { label: "Skills & Services", href: "/#services", isRoute: false },
  { label: "Contact", href: "/#contact", isRoute: false },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/70 bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-sm font-bold text-brand-foreground shadow-md shadow-brand/30">
            ET
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-sm font-bold text-foreground">
              Elli James Torres
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">
              CRM & Digital Marketing Support
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            if (link.isRoute) {
              return (
                <Link
                  key={link.href}
                  to={link.href as any}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                    location.pathname === link.href
                      ? "bg-brand/10 text-brand font-bold"
                      : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            }
            return (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground"
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/website-consultation"
            className="cta-glow cta-glow-hover inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-brand-foreground shadow-md shadow-brand/25 transition-all hover:bg-brand-bright hover:shadow-lg hover:shadow-brand/40"
          >
            <span
              className="grid h-4 w-4 place-items-center rounded-full bg-brand-foreground/20 text-[10px] font-bold"
              aria-hidden
            >
              ★
            </span>
            Book a Website Consultation
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-card text-foreground lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={`h-0.5 w-5 bg-foreground transition-all ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span className={`h-0.5 w-5 bg-foreground transition-all ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-0.5 w-5 bg-foreground transition-all ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {navLinks.map((link) => {
              if (link.isRoute) {
                return (
                  <Link
                    key={link.href}
                    to={link.href as any}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent/10"
                  >
                    {link.label}
                  </Link>
                );
              }
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent/10"
                >
                  {link.label}
                </a>
              );
            })}
            <Link
              to="/website-consultation"
              onClick={() => setOpen(false)}
              className="cta-glow cta-glow-hover mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand px-4 py-3.5 text-sm font-bold uppercase tracking-wide text-brand-foreground shadow-md shadow-brand/25"
            >
              <span aria-hidden>★</span> Book a Website Consultation
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
