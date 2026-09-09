import { cn } from "@/lib/utils";

/** Small monospace chip used for stacks, skills and metadata. */
export function Tag({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] tracking-tight text-muted",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
