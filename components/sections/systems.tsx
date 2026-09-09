"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { projects, systems } from "@/content";
import { contentIcons } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { focusProject } from "@/lib/events";
import { cn } from "@/lib/utils";

export function Systems() {
  const [activeId, setActiveId] = useState(systems[0].id);
  const active = systems.find((system) => system.id === activeId) ?? systems[0];
  const ActiveIcon = contentIcons[active.icon];
  const relatedProject = projects.find((project) => project.id === active.relatedProjectId);

  return (
    <Section id="systems">
      <SectionHeading
        index="04 — Systems"
        title="Four decisions, not four buzzwords."
        description="Every entry here is one specific engineering call from a project below — the trade-off, and why it went that way. Select one to walk its pipeline, then jump to the build."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-8">
        {/* Selector */}
        <div
          role="tablist"
          aria-label="AI systems"
          aria-orientation="vertical"
          className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
        >
          {systems.map((system) => {
            const Icon = contentIcons[system.icon];
            const selected = system.id === activeId;

            return (
              <button
                key={system.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="system-detail"
                onClick={() => setActiveId(system.id)}
                className={cn(
                  "relative min-w-[240px] shrink-0 rounded-xl border p-4 text-left transition-colors lg:min-w-0",
                  selected
                    ? "border-accent/40 bg-accent/5"
                    : "border-border bg-surface hover:border-border-strong",
                )}
              >
                {selected ? (
                  <motion.span
                    layoutId="system-active"
                    className="accent-gradient absolute top-4 bottom-4 -left-px w-0.5 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}

                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-lg border transition-colors",
                      selected
                        ? "border-accent/40 bg-accent/10 text-accent"
                        : "border-border bg-elevated text-subtle",
                    )}
                  >
                    <Icon className="size-4.5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p
                      className={cn(
                        "truncate text-sm font-semibold",
                        selected ? "text-fg" : "text-muted",
                      )}
                    >
                      {system.title}
                    </p>
                    <p className="mt-0.5 truncate font-mono text-[11px] text-accent">
                      {system.impact}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-subtle">
                  {system.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div id="system-detail" role="tabpanel" className="glass rounded-2xl p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl border border-accent/40 bg-accent/10 text-accent">
                  <ActiveIcon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{active.title}</h3>
                  <p className="font-mono text-xs text-accent">{active.impact}</p>
                </div>
              </div>

              <p className="mt-6 text-base leading-relaxed text-muted text-pretty">
                {active.description}
              </p>

              {relatedProject ? (
                <button
                  type="button"
                  // Just focusProject: its listener in the Projects section
                  // already scrolls straight to this card. Also calling
                  // scrollToSection("projects") would race it and win,
                  // landing on the section top instead of the right card.
                  onClick={() => focusProject(relatedProject.id)}
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3.5 py-2 font-mono text-xs text-accent transition-colors hover:border-accent/50 hover:bg-accent/10"
                >
                  See it built: {relatedProject.title}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </button>
              ) : null}

              <div className="mt-8">
                <p className="font-mono text-[11px] tracking-[0.18em] text-subtle uppercase">
                  Pipeline
                </p>
                <ol className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                  {active.pipeline.map((stage, index) => (
                    <motion.li
                      key={stage}
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.08 * index, duration: 0.3 }}
                      className="flex items-center gap-2"
                    >
                      <span className="rounded-lg border border-border bg-elevated px-3 py-2 font-mono text-xs text-fg">
                        <span className="mr-2 text-accent">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {stage}
                      </span>
                      {index < active.pipeline.length - 1 ? (
                        <ArrowRight
                          className="size-3.5 shrink-0 rotate-90 text-subtle sm:rotate-0"
                          aria-hidden
                        />
                      ) : null}
                    </motion.li>
                  ))}
                </ol>
              </div>

              <div className="mt-8 border-t border-border pt-6">
                <p className="font-mono text-[11px] tracking-[0.18em] text-subtle uppercase">
                  Stack
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {active.stack.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
