"use client";

import { useSyncExternalStore } from "react";

/** No-op subscription: the value flips once, at hydration. */
const subscribe = () => () => {};

/**
 * True only after hydration. Use it to gate browser-only UI (portals, theme
 * icons) so the server and client markup match on first paint.
 */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
