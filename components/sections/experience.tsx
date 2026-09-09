"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Building2, ChevronDown, MapPin } from "lucide-react";

import { roles } from "@/content";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  // Most recent role starts expanded.
  const [expandedId, setExpandedId] = useState<string | null>(roles[0]?.id ?? null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 65%", "end 60%"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <Section id="experience">
      <SectionHeading
        index="03 — Experience"
        title="Four years, five teams, one direction of travel."
        description="From e-commerce automation to leading a 12-engineer AI platform team. Expand any role to read what actually shipped."
      />

      <div ref={timelineRef} className="relative mt-14 pl-8 sm:pl-12">
        {/* Track + scroll-linked progress fill. */}
        <div
          aria-hidden
          className="absolute top-2 bottom-2 left-[7px] w-px bg-border sm:left-[15px]"
        />
        <motion.div
          aria-hidden
          style={{ scaleY: lineScale }}
          className="accent-gradient absolute top-2 bottom-2 left-[7px] w-px origin-top sm:left-[15px]"
        />

        <ol className="space-y-5">
          {roles.map((role, index) => {
            const expanded = expandedId === role.id;
            const current = role.end === null;

            return (
              <motion.li
                key={role.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Timeline node */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-6 -left-8 grid size-4 place-items-center rounded-full border sm:-left-12",
                    current
                      ? "border-accent bg-accent/20"
                      : "border-border-strong bg-elevated",
                  )}
                >
                  <span
                    className={cn(
                      "size-1.5 rounded-full",
                      current ? "bg-accent" : "bg-subtle",
                    )}
                  />
                  {current ? (
                    <span className="absolute inline-flex size-4 animate-ping rounded-full bg-accent/40" />
                  ) : null}
                </span>

                <div
                  className={cn(
                    "glass rounded-2xl transition-colors duration-300",
                    expanded ? "border-accent/30" : "hover:border-border-strong",
                  )}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setExpandedId(expanded ? null : role.id)}
                      aria-expanded={expanded}
                      aria-controls={`role-panel-${role.id}`}
                      className="flex w-full items-start gap-4 p-6 text-left"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="font-mono text-xs text-accent">{role.period}</span>
                          {current ? (
                            <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[10px] tracking-wide text-accent uppercase">
                              Current
                            </span>
                          ) : null}
                        </span>

                        <span className="mt-2 block text-lg font-semibold tracking-tight text-fg">
                          {role.title}
                        </span>

                        <span className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                          <span className="inline-flex items-center gap-1.5">
                            <Building2 className="size-3.5 text-subtle" aria-hidden />
                            {role.company}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="size-3.5 text-subtle" aria-hidden />
                            {role.location}
                          </span>
                        </span>

                        <span className="mt-3 block text-sm leading-relaxed text-subtle text-pretty">
                          {role.focus}
                        </span>
                      </span>

                      <ChevronDown
                        className={cn(
                          "mt-1 size-5 shrink-0 text-subtle transition-transform duration-300",
                          expanded && "rotate-180 text-accent",
                        )}
                        aria-hidden
                      />
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {expanded ? (
                      <motion.div
                        id={`role-panel-${role.id}`}
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border px-6 py-5">
                          <ul className="space-y-3">
                            {role.highlights.map((highlight) => (
                              <li
                                key={highlight.slice(0, 48)}
                                className="flex gap-3 text-sm leading-relaxed text-muted"
                              >
                                <span
                                  aria-hidden
                                  className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/70"
                                />
                                <span className="text-pretty">{highlight}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="mt-5 flex flex-wrap gap-2">
                            {role.stack.map((tech) => (
                              <Tag key={tech}>{tech}</Tag>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
