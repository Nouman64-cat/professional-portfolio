import { cn } from "@/lib/utils";

interface SectionProps extends React.ComponentPropsWithoutRef<"section"> {
  /** DOM id used by the nav, scroll-spy and command palette. */
  id: string;
}

/** Page section wrapper: consistent rhythm, width and scroll anchoring. */
export function Section({ id, className, children, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-20 outline-none sm:py-24", className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}
