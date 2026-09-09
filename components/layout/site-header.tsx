"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { Command, Menu, X } from "lucide-react";

import { navItems, profile } from "@/content";
import { useCommandPalette } from "@/components/providers/command-palette-provider";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useScrollSpy } from "@/lib/hooks/use-scroll-spy";
import { cn, scrollToSection } from "@/lib/utils";

const SECTION_IDS = navItems.map((item) => item.id);

export function SiteHeader() {
  const { setOpen: setPaletteOpen } = useCommandPalette();
  const activeId = useScrollSpy(SECTION_IDS);
  const { scrollY } = useScroll();

  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => setCondensed(latest > 24));

  // Close the mobile sheet whenever the viewport grows past the breakpoint.
  useEffect(() => {
    if (!menuOpen) return;
    const media = window.matchMedia("(min-width: 768px)");
    const onChange = () => media.matches && setMenuOpen(false);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [menuOpen]);

  function go(id: string) {
    setMenuOpen(false);
    scrollToSection(id);
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        condensed
          ? "border-b border-border bg-bg/70 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-2.5"
          aria-label="Back to top"
        >
          <span className="accent-gradient grid size-8 place-items-center rounded-lg font-mono text-sm font-bold text-accent-contrast">
            NE
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:block">
            {profile.name}
          </span>
        </button>

        <nav aria-label="Sections" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = activeId === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => go(item.id)}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-1.5 text-sm transition-colors",
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
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="hidden items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/50 hover:text-fg sm:flex"
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
            className="grid size-9 place-items-center rounded-full border border-border bg-surface text-muted md:hidden"
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
            className="overflow-hidden border-b border-border bg-bg/95 backdrop-blur-xl md:hidden"
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
              <li className="pt-3">
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
