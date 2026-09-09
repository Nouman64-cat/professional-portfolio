"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  CalendarClock,
  Check,
  Copy,
  CornerDownLeft,
  Download,
  Mail,
  Moon,
  Search,
  Sun,
} from "lucide-react";

import { navItems, profile, projects, skillGroups, socialLinks, systems } from "@/content";
import { useTheme } from "@/components/providers/theme-provider";
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";
import { useMounted } from "@/lib/hooks/use-mounted";
import { contentIcons, GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { focusSkillGroup } from "@/lib/events";
import { cn, scrollToSection } from "@/lib/utils";

const brandIcons = { github: GitHubIcon, linkedin: LinkedInIcon } as const;

type CommandGroup = "Navigate" | "Skills" | "Systems" | "Projects" | "Actions";

interface CommandItem {
  id: string;
  label: string;
  hint?: string;
  group: CommandGroup;
  /** Lucide icons and the hand-rolled brand marks in `ui/icons` both fit. */
  icon: React.ElementType<React.SVGProps<SVGSVGElement>>;
  keywords: string;
  perform: () => void;
  /** Keep the palette open after running — used by copy actions. */
  keepOpen?: boolean;
}

const GROUP_ORDER: CommandGroup[] = ["Navigate", "Skills", "Systems", "Projects", "Actions"];

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * ⌘K palette over every section, skill group, system and contact action.
 *
 * This outer component owns only the keyboard shortcut and the portal; the
 * dialog below mounts fresh on every open, so query and selection state reset
 * naturally instead of being cleared in an effect.
 */
export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const mounted = useMounted();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onOpenChange, open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? <PaletteDialog onClose={() => onOpenChange(false)} /> : null}
    </AnimatePresence>,
    document.body,
  );
}

function PaletteDialog({ onClose }: { onClose: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const { copied, copy } = useCopyToClipboard();

  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const items = useMemo<CommandItem[]>(() => {
    const navigate: CommandItem[] = navItems.map((item) => ({
      id: `nav-${item.id}`,
      label: item.label,
      hint: `Jump to #${item.id}`,
      group: "Navigate",
      icon: ArrowRight,
      keywords: `${item.label} section jump scroll`,
      perform: () => scrollToSection(item.id),
    }));

    const skills: CommandItem[] = skillGroups.map((group) => ({
      id: `skill-${group.id}`,
      label: group.label,
      hint: group.skills.slice(0, 4).join(", "),
      group: "Skills",
      icon: contentIcons[group.icon],
      keywords: `${group.label} ${group.skills.join(" ")}`,
      perform: () => {
        focusSkillGroup(group.id);
        scrollToSection("skills");
      },
    }));

    const systemItems: CommandItem[] = systems.map((system) => ({
      id: `system-${system.id}`,
      label: system.title,
      hint: system.impact,
      group: "Systems",
      icon: contentIcons[system.icon],
      keywords: `${system.title} ${system.tagline} ${system.stack.join(" ")}`,
      perform: () => scrollToSection("systems"),
    }));

    const projectItems: CommandItem[] = projects.map((project) => ({
      id: `project-${project.id}`,
      label: project.title,
      hint: project.tagline,
      group: "Projects",
      icon: contentIcons[project.icon],
      keywords: `${project.title} ${project.tagline} ${project.stack.join(" ")}`,
      perform: () => scrollToSection("projects"),
    }));

    const brandLinkActions: CommandItem[] = socialLinks
      .filter((link) => link.href.length > 0 && link.icon in brandIcons)
      .map((link) => ({
        id: `action-open-${link.icon}`,
        label: `Open ${link.label} profile`,
        hint: link.handle,
        group: "Actions",
        icon: brandIcons[link.icon as keyof typeof brandIcons],
        keywords: `${link.label} ${link.handle} profile open`,
        perform: () => window.open(link.href, "_blank", "noopener"),
      }));

    const actions: CommandItem[] = [
      {
        id: "action-book-call",
        label: "Book a free 30-min AI consultation",
        hint: "Calendly",
        group: "Actions",
        icon: CalendarClock,
        keywords: "calendly book call schedule meeting consultation free",
        perform: () => window.open(profile.calendlyUrl, "_blank", "noopener"),
      },
      ...brandLinkActions,
      {
        id: "action-copy-email",
        label: "Copy email address",
        hint: profile.email,
        group: "Actions",
        icon: copied === profile.email ? Check : Copy,
        keywords: "email copy contact mail address",
        keepOpen: true,
        perform: () => {
          void copy(profile.email);
        },
      },
      {
        id: "action-copy-phone",
        label: "Copy phone number",
        hint: profile.phone,
        group: "Actions",
        icon: copied === profile.phone ? Check : Copy,
        keywords: "phone copy call number",
        keepOpen: true,
        perform: () => {
          void copy(profile.phone);
        },
      },
      {
        id: "action-mailto",
        label: "Send me an email",
        hint: profile.email,
        group: "Actions",
        icon: Mail,
        keywords: "email write message contact hire",
        perform: () => {
          window.location.href = `mailto:${profile.email}`;
        },
      },
      {
        id: "action-resume",
        label: "Download résumé (PDF)",
        group: "Actions",
        icon: Download,
        keywords: "resume cv pdf download",
        perform: () => window.open(profile.resumePath, "_blank", "noopener"),
      },
      {
        id: "action-theme",
        label: `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
        group: "Actions",
        icon: theme === "dark" ? Sun : Moon,
        keywords: "theme dark light mode appearance toggle",
        keepOpen: true,
        perform: toggleTheme,
      },
    ];

    return [...navigate, ...skills, ...systemItems, ...projectItems, ...actions];
  }, [copied, copy, theme, toggleTheme]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return items;

    return items
      .map((item) => {
        const haystack = `${item.label} ${item.keywords}`.toLowerCase();
        if (!haystack.includes(term)) return null;
        // Rank exact label prefixes above incidental keyword hits.
        return { item, score: item.label.toLowerCase().startsWith(term) ? 0 : 1 };
      })
      .filter((entry): entry is { item: CommandItem; score: number } => entry !== null)
      .sort((a, b) => a.score - b.score)
      .map((entry) => entry.item);
  }, [items, query]);

  // Focus the input and lock background scroll for the dialog's lifetime.
  useEffect(() => {
    const timer = window.setTimeout(() => inputRef.current?.focus(), 30);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Keep the highlighted row visible while arrowing through results.
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const run = useCallback(
    (item: CommandItem) => {
      item.perform();
      if (!item.keepOpen) onClose();
    },
    [onClose],
  );

  function handleKeyDown(event: React.KeyboardEvent) {
    const count = Math.max(results.length, 1);

    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % count);
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + count) % count);
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const item = results[activeIndex];
      if (item) run(item);
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-100 flex items-start justify-center px-4 pt-[12vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        initial={{ opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        onKeyDown={handleKeyDown}
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border-strong bg-elevated shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="size-4 shrink-0 text-subtle" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            placeholder="Search sections, skills, projects…"
            aria-label="Search commands"
            className="w-full bg-transparent py-4 text-sm text-fg outline-none placeholder:text-subtle"
          />
          <kbd className="hidden rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-subtle sm:block">
            ESC
          </kbd>
        </div>

        <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-subtle">
              No matches for “{query}”.
            </p>
          ) : (
            GROUP_ORDER.map((group) => {
              const groupItems = results.filter((item) => item.group === group);
              if (groupItems.length === 0) return null;

              return (
                <div key={group} className="mb-1">
                  <p className="px-3 py-2 font-mono text-[10px] tracking-[0.18em] text-subtle uppercase">
                    {group}
                  </p>
                  {groupItems.map((item) => {
                    const index = results.indexOf(item);
                    const active = index === activeIndex;
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        data-active={active}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => run(item)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                          active ? "bg-surface-strong text-fg" : "text-muted",
                        )}
                      >
                        <Icon
                          className={cn(
                            "size-4 shrink-0",
                            active ? "text-accent" : "text-subtle",
                          )}
                          aria-hidden
                        />
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.hint ? (
                          <span className="hidden max-w-[45%] truncate font-mono text-[11px] text-subtle sm:block">
                            {item.hint}
                          </span>
                        ) : null}
                        {active ? (
                          <CornerDownLeft className="size-3.5 text-subtle" aria-hidden />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border bg-surface px-4 py-2.5 font-mono text-[10px] text-subtle">
          <span>
            {results.length} {results.length === 1 ? "result" : "results"}
          </span>
          <span className="flex items-center gap-3">
            <span>↑ ↓ navigate</span>
            <span>↵ select</span>
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
