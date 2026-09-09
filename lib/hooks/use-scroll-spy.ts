"use client";

import { useEffect, useState } from "react";

/**
 * Track which section is currently in view.
 *
 * Picks the last section whose top has passed the reading band, so the nav
 * marks the section you are actually reading rather than the one still
 * trailing off the top of the viewport. Returns `null` above the first
 * section (i.e. while the hero is in view).
 */
export function useScrollSpy(sectionIds: string[], offset = 170) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;

      let current: string | null = null;
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }

      // The final section is often too short to reach the band — once the
      // page is scrolled to the bottom, it is unambiguously the active one.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) current = sectionIds.at(-1) ?? current;

      setActiveId(current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [offset, sectionIds]);

  return activeId;
}
