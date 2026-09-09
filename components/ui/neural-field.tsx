"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const NODE_DENSITY = 1 / 15000; // nodes per CSS pixel²
const MAX_NODES = 90;
const LINK_DISTANCE = 150;
const POINTER_RADIUS = 190;

/**
 * Animated "neural field" backdrop: drifting nodes linked by proximity, with
 * the pointer pulling nearby nodes and brightening their edges.
 *
 * Runs entirely on a 2D canvas — no WebGL, no dependencies. The loop pauses
 * when the canvas scrolls out of view or the tab is hidden, and renders a
 * single static frame when the user prefers reduced motion.
 */
export function NeuralField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let frame = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999, active: false };

    /** Resolve theme colours from CSS custom properties. */
    let accent = "45, 212, 191";
    let ink = "233, 239, 246";

    const readPalette = () => {
      const styles = getComputedStyle(document.documentElement);
      accent = toRgbTriplet(styles.getPropertyValue("--accent")) ?? accent;
      ink = toRgbTriplet(styles.getPropertyValue("--fg")) ?? ink;
    };

    const seed = () => {
      const target = Math.min(
        MAX_NODES,
        Math.max(28, Math.round(width * height * NODE_DENSITY)),
      );
      nodes = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.6 + 0.9,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Wrap around the edges so the field never thins out.
        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;

        if (pointer.active) {
          const dx = node.x - pointer.x;
          const dy = node.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < POINTER_RADIUS && distance > 0.001) {
            // Gentle pull toward the cursor.
            const pull = (1 - distance / POINTER_RADIUS) * 0.35;
            node.x -= (dx / distance) * pull;
            node.y -= (dy / distance) * pull;
          }
        }
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];

        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance > LINK_DISTANCE) continue;

          const strength = 1 - distance / LINK_DISTANCE;
          const nearPointer =
            pointer.active &&
            Math.hypot((a.x + b.x) / 2 - pointer.x, (a.y + b.y) / 2 - pointer.y) <
              POINTER_RADIUS;

          context.strokeStyle = nearPointer
            ? `rgba(${accent}, ${strength * 0.5})`
            : `rgba(${ink}, ${strength * 0.13})`;
          context.lineWidth = nearPointer ? 1 : 0.7;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }

        const nearPointer =
          pointer.active && Math.hypot(a.x - pointer.x, a.y - pointer.y) < POINTER_RADIUS;

        context.fillStyle = nearPointer
          ? `rgba(${accent}, 0.9)`
          : `rgba(${ink}, 0.32)`;
        context.beginPath();
        context.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
        context.fill();
      }
    };

    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduceMotion || frame) return;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active =
        pointer.x >= 0 && pointer.x <= rect.width && pointer.y >= 0 && pointer.y <= rect.height;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const onVisibilityChange = () => {
      if (document.hidden || !visible) stop();
      else start();
    };

    readPalette();
    resize();
    draw();
    start();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        onVisibilityChange();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    // Re-read colours when the theme attribute flips.
    const themeObserver = new MutationObserver(() => {
      readPalette();
      if (reduceMotion) draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    />
  );
}

/** Convert a CSS colour (hex or rgb) into an "r, g, b" triplet string. */
function toRgbTriplet(value: string): string | null {
  const color = value.trim();
  if (!color) return null;

  if (color.startsWith("#")) {
    const hex = color.slice(1);
    const full =
      hex.length === 3
        ? hex
            .split("")
            .map((char) => char + char)
            .join("")
        : hex;
    if (full.length < 6) return null;
    const int = Number.parseInt(full.slice(0, 6), 16);
    if (Number.isNaN(int)) return null;
    return `${(int >> 16) & 255}, ${(int >> 8) & 255}, ${int & 255}`;
  }

  const match = color.match(/(\d+(?:\.\d+)?)[\s,]+(\d+(?:\.\d+)?)[\s,]+(\d+(?:\.\d+)?)/);
  return match ? `${match[1]}, ${match[2]}, ${match[3]}` : null;
}
