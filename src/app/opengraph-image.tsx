import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Punya Mittal — AI Engineer | Full Stack Developer | VIT Chennai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#f5f5f5",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#39FF14",
          }}
        >
          punyamittal.space
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 800,
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            Punya Mittal
          </div>
          <div style={{ display: "flex", fontSize: 34, opacity: 0.9 }}>
            AI Engineer · Full Stack Developer · VIT Chennai
          </div>
          <div style={{ display: "flex", fontSize: 24, opacity: 0.7, maxWidth: 900 }}>
            Founder of Y-SoC · Secretary IE(I) VIT · Hanix (HNX) on Base
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
