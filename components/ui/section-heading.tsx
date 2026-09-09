import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Monospace kicker, e.g. "02 — Experience". */
  index: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  index,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">
        <span aria-hidden className="h-px w-8 bg-accent/60" />
        {index}
      </p>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted text-pretty">
          {description}
        </p>
      ) : null}
    </div>
  );
}
