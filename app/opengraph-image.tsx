import { ImageResponse } from "next/og";

import { profile } from "@/content";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social preview card, generated at build time. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #05070b 0%, #0a1220 55%, #071a1a 100%)",
          color: "#e9eff6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(100deg, #2dd4bf, #818cf8)",
              color: "#04120f",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            NE
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#94a3b8" }}>
            {profile.location}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, letterSpacing: "-2px" }}>
            {profile.name}
          </div>
          <div style={{ display: "flex", marginTop: 12, fontSize: 38, color: "#2dd4bf" }}>
            {profile.role}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 27,
              lineHeight: 1.4,
              color: "#94a3b8",
              maxWidth: 900,
            }}
          >
            {profile.tagline}
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {["RAG at scale", "Multi-agent AI", "LLM inference", "AWS · GCP · Azure"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  padding: "10px 20px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.14)",
                  fontSize: 22,
                  color: "#cbd5e1",
                }}
              >
                {tag}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    size,
  );
}
