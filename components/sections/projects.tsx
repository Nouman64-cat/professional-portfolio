"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ExternalLink } from "lucide-react";

import { projects } from "@/content";
import { ActionLink } from "@/components/ui/action-link";
import { contentIcons, GitHubIcon } from "@/components/ui/icons";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { TiltCard } from "@/components/ui/tilt-card";
import { onFocusProject } from "@/lib/events";
import { cn } from "@/lib/utils";

/** DOM id for a project card — also used by the Systems section's "See it in" links. */
export function projectDomId(projectId: string) {
  return `project-${projectId}`;
}

export function Projects() {
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const highlightTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // A system in the section above can deep-link here (see systems.tsx);
  // scroll to that card and flash it briefly so the jump is legible.
  useEffect(() => {
    const unsubscribe = onFocusProject((projectId) => {
      if (highlightTimeout.current) clearTimeout(highlightTimeout.current);

      setHighlightedId(projectId);
      document
        .getElementById(projectDomId(projectId))
        ?.scrollIntoView({ behavior: "smooth", block: "center" });

      highlightTimeout.current = setTimeout(() => setHighlightedId(null), 2200);
    });

    return () => {
      unsubscribe();
      if (highlightTimeout.current) clearTimeout(highlightTimeout.current);
    };
  }, []);

  return (
    <Section id="projects">
      <SectionHeading
        index="05 — Projects"
        title="Selected work, not hypotheticals."
        description="Systems designed and built end to end, plus applied AI work against real infrastructure — the code is real, and mostly public. Click through to any of them."
      />

      <div className="mt-14 space-y-6">
        {projects.map((project, index) => {
          const Icon = contentIcons[project.icon];
          const highlighted = highlightedId === project.id;

          return (
            <Reveal key={project.id} delay={index * 0.08}>
              <TiltCard
                id={projectDomId(project.id)}
                className={cn(
                  "scroll-mt-24 p-6 transition-shadow duration-500 sm:p-8",
                  highlighted && "ring-2 ring-accent/60",
                )}
              >
                <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
                  <div className="lg:border-r lg:border-border lg:pr-8">
                    <div className="flex items-center gap-3">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-elevated text-accent">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[10px] tracking-wide text-accent uppercase">
                        {project.status}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-semibold tracking-tight">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted text-pretty">
                      {project.tagline}
                    </p>
                    <p className="mt-3 font-mono text-xs text-accent">{project.impact}</p>

                    {project.links.length > 0 ? (
                      <div className="mt-5 flex flex-wrap gap-2 lg:flex-col lg:items-start">
                        {project.links.map((link) => {
                          const isCode = link.label.toLowerCase().includes("github");
                          return (
                            <Magnetic key={link.label}>
                              <ActionLink
                                href={link.href}
                                target="_blank"
                                rel="noreferrer noopener"
                                variant={isCode ? "secondary" : "primary"}
                                className="text-xs"
                              >
                                {isCode ? (
                                  <GitHubIcon className="size-3.5" />
                                ) : (
                                  <ExternalLink className="size-3.5" aria-hidden />
                                )}
                                {link.label}
                              </ActionLink>
                            </Magnetic>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <p className="text-sm leading-relaxed text-muted text-pretty">
                      {project.description}
                    </p>

                    <ul className="mt-5 space-y-2.5">
                      {project.highlights.map((highlight) => (
                        <li
                          key={highlight.slice(0, 48)}
                          className="flex items-start gap-2.5 text-sm text-muted"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                          <span className="text-pretty">{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
                      {project.stack.map((tech) => (
                        <Tag key={tech}>{tech}</Tag>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
