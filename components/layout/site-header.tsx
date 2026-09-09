"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { CalendarClock, ChevronDown, Command, Menu, X } from "lucide-react";

import { navItems, profile } from "@/content";
import { useCommandPalette } from "@/components/providers/command-palette-provider";
import { Magnetic } from "@/components/ui/magnetic";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useScrollSpy } from "@/lib/hooks/use-scroll-spy";
import { cn, scrollToSection } from "@/lib/utils";

const SECTION_IDS = navItems.map((item) => item.id);

// Keep the header's visible row short — everything else in `navItems` still
// scrolls-spies, still shows in the footer and ⌘K, and still gets a link;
// it just lives behind "More" instead of crowding the top-level row.
const PRIMARY_ITEMS = navItems.filter((item) => !item.secondary);
const SECONDARY_ITEMS = navItems.filter((item) => item.secondary);

export function SiteHeader() {
  const { setOpen: setPaletteOpen } = useCommandPalette();
  const activeId = useScrollSpy(SECTION_IDS);
  const { scrollY } = useScroll();

  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLLIElement>(null);

  const activeIsSecondary = SECONDARY_ITEMS.some((item) => item.id === activeId);

  useMotionValueEvent(scrollY, "change", (latest) => setCondensed(latest > 24));

  // Close the mobile sheet whenever the viewport grows past the breakpoint
  // where the full nav takes over.
  useEffect(() => {
    if (!menuOpen) return;
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => media.matches && setMenuOpen(false);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [menuOpen]);

  // Close the "More" dropdown on an outside click or Escape.
  useEffect(() => {
    if (!moreOpen) return;

    function onPointerDown(event: PointerEvent) {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMoreOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [moreOpen]);

  function go(id: string) {
    setMenuOpen(false);
    setMoreOpen(false);
    scrollToSection(id);
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        // At lg+ the row below becomes its own floating glass capsule, so
        // this outer strip goes fully transparent there — otherwise a
        // second, edge-to-edge glass layer would show behind the pill.
        condensed
          ? "border-b border-border bg-bg/70 backdrop-blur-xl lg:border-b-0 lg:bg-transparent lg:backdrop-blur-none"
          : "border-b border-transparent",
      )}
    >
      <div className="nav-shell mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 transition-all duration-300 sm:px-8">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-2.5"
          aria-label="Back to top"
        >
          <span className="accent-gradient grid size-8 place-items-center rounded-lg font-mono text-sm font-bold text-accent-contrast">
            NE
          </span>
          <span className="hidden text-sm font-semibold tracking-tight whitespace-nowrap sm:block">
            {profile.name}
          </span>
        </button>

        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {PRIMARY_ITEMS.map((item) => {
              const active = activeId === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => go(item.id)}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "relative rounded-full px-3 py-1.5 text-sm whitespace-nowrap transition-colors",
                      active ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {active ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full border border-border bg-surface"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    <span className="relative">{item.label}</span>
                  </button>
                </li>
              );
            })}

            <li ref={moreRef} className="relative">
              <button
                type="button"
                onClick={() => setMoreOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={moreOpen}
                className={cn(
                  "flex items-center gap-1 rounded-full px-3 py-1.5 text-sm whitespace-nowrap transition-colors",
                  activeIsSecondary || moreOpen ? "text-fg" : "text-muted hover:text-fg",
                )}
              >
                More
                <ChevronDown
                  className={cn("size-3.5 transition-transform duration-200", moreOpen && "rotate-180")}
                  aria-hidden
                />
              </button>

              <AnimatePresence>
                {moreOpen ? (
                  <motion.div
                    role="menu"
                    aria-label="More sections"
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="glass absolute top-full right-0 mt-2 min-w-40 rounded-xl p-1.5 shadow-2xl"
                  >
                    {SECONDARY_ITEMS.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        role="menuitem"
                        onClick={() => go(item.id)}
                        aria-current={activeId === item.id ? "true" : undefined}
                        className={cn(
                          "block w-full rounded-lg px-3 py-2 text-left text-sm whitespace-nowrap transition-colors",
                          activeId === item.id
                            ? "bg-surface-strong text-fg"
                            : "text-muted hover:bg-surface hover:text-fg",
                        )}
                      >
                        {item.label}
                      </button>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Magnetic className="hidden lg:inline-flex">
            <a
              href={profile.calendlyUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="accent-gradient inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap text-accent-contrast shadow-[0_8px_24px_-10px_var(--glow)] transition-all hover:brightness-110"
            >
              <CalendarClock className="size-3.5" aria-hidden />
              Free consult
            </a>
          </Magnetic>

          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="hidden items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/50 hover:text-fg xl:flex"
          >
            <Command className="size-3.5" aria-hidden />
            <span>Search</span>
            <kbd className="rounded border border-border px-1 font-mono text-[10px]">⌘K</kbd>
          </button>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="grid size-9 place-items-center rounded-full border border-border bg-surface text-muted lg:hidden"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            id="mobile-nav"
            aria-label="Sections"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-border bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col px-5 py-3 sm:px-8">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => go(item.id)}
                    className="flex w-full items-center justify-between border-b border-border/60 py-3 text-left text-sm text-muted last:border-0"
                  >
                    {item.label}
                    <span className="font-mono text-xs text-subtle">#{item.id}</span>
                  </button>
                </li>
              ))}
              <li className="flex flex-col gap-2 pt-3">
                <a
                  href={profile.calendlyUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="accent-gradient flex w-full items-center justify-center gap-2 rounded-full px-3 py-2.5 text-sm font-semibold text-accent-contrast"
                >
                  <CalendarClock className="size-4" aria-hidden />
                  Book free AI consultation
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setPaletteOpen(true);
                  }}
                  className="flex w-full items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-sm text-muted"
                >
                  <Command className="size-4" aria-hidden />
                  Open command palette
                </button>
              </li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
