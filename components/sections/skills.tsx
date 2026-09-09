"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";

import { skillGroups } from "@/content";
import { contentIcons } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { onFocusSkillGroup } from "@/lib/events";
import { cn } from "@/lib/utils";

const ALL = "all";

export function Skills() {
  const [activeGroup, setActiveGroup] = useState<string>(ALL);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  // The command palette can deep-link into a specific group.
  useEffect(() => onFocusSkillGroup(setActiveGroup), []);

  const visibleGroups = useMemo(() => {
    const term = query.trim().toLowerCase();

    return skillGroups
      .filter((group) => activeGroup === ALL || group.id === activeGroup)
      .map((group) => ({
        ...group,
        skills: term
          ? group.skills.filter((skill) => skill.toLowerCase().includes(term))
          : group.skills,
      }))
      .filter((group) => group.skills.length > 0);
  }, [activeGroup, query]);

  const matchCount = visibleGroups.reduce(
    (total, group) => total + group.skills.length,
    0,
  );

  return (
    <Section id="skills">
      <SectionHeading
        index="02 — Skills"
        title="A stack chosen for the problem, not the résumé."
        description="Filter by discipline or search the whole toolkit. Everything here is something I've shipped with in production."
      />

      <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Skill groups">
          <FilterChip
            active={activeGroup === ALL}
            onClick={() => setActiveGroup(ALL)}
            label="All"
          />
          {skillGroups.map((group) => (
            <FilterChip
              key={group.id}
              active={activeGroup === group.id}
              onClick={() => setActiveGroup(group.id)}
              label={group.label}
            />
          ))}
        </div>

        <div className="relative w-full lg:w-72">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle"
            aria-hidden
          />
          <input
            ref={searchRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search skills…"
            aria-label="Search skills"
            className="w-full rounded-full border border-border bg-surface py-2.5 pr-9 pl-9 text-sm text-fg outline-none transition-colors placeholder:text-subtle focus:border-accent/60"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                searchRef.current?.focus();
              }}
              aria-label="Clear search"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-subtle hover:text-fg"
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>
      </div>

      <p className="mt-4 font-mono text-xs text-subtle" aria-live="polite">
        {matchCount} {matchCount === 1 ? "technology" : "technologies"} shown
      </p>

      <motion.div layout className="mt-6 grid gap-4 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visibleGroups.map((group) => {
            const Icon = contentIcons[group.icon];

            return (
              <motion.article
                key={group.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-elevated text-accent">
                    <Icon className="size-4.5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold">{group.label}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-subtle">
                      {group.summary}
                    </p>
                  </div>
                </div>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <motion.li key={skill} layout="position">
                      <span className="inline-flex items-center rounded-lg border border-border bg-surface px-2.5 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-accent/50 hover:text-accent">
                        {skill}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {visibleGroups.length === 0 ? (
        <Reveal>
          <p className="mt-8 rounded-xl border border-dashed border-border p-8 text-center text-sm text-subtle">
            Nothing matches “{query}”. Try a broader term — or clear the filter.
          </p>
        </Reveal>
      ) : null}
    </Section>
  );
}

function FilterChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "relative rounded-full border px-3.5 py-1.5 text-xs transition-colors",
        active
          ? "border-accent/50 text-accent"
          : "border-border text-muted hover:border-border-strong hover:text-fg",
      )}
    >
      {active ? (
        <motion.span
          layoutId="skill-filter"
          className="absolute inset-0 rounded-full bg-accent/10"
          transition={{ type: "spring", stiffness: 400, damping: 34 }}
        />
      ) : null}
      <span className="relative">{label}</span>
    </button>
  );
}
