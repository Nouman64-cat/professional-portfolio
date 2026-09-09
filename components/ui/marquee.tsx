import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
}

/**
 * Infinite horizontal ticker. The item list is duplicated so the -50%
 * translate loops seamlessly; hovering pauses it.
 */
export function Marquee({ items, className }: MarqueeProps) {
  return (
    <div className={cn("mask-fade-x overflow-hidden", className)} aria-hidden>
      <div className="animate-marquee pause-on-hover flex w-max gap-3">
        {[...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-xs whitespace-nowrap text-muted"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
