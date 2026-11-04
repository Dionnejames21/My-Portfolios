import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** Set to true when rendered on a dark (navy) section. */
  onDark?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  onDark = false,
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <div
      className={`flex flex-col gap-4 ${isCenter ? "items-center text-center" : "items-start text-left"} ${className}`}
    >
      <span
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
          onDark
            ? "bg-white/10 text-brand ring-1 ring-white/15"
            : "bg-navy-soft/10 text-navy-soft ring-1 ring-navy-soft/20"
        }`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${onDark ? "bg-brand" : "bg-navy-soft"}`} />
        {eyebrow}
      </span>
      <h2
        className={`max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl ${
          onDark ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`max-w-2xl text-base leading-relaxed sm:text-lg ${
            onDark ? "text-white/70" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
