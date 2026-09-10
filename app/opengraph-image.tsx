import { ImageResponse } from "next/og";

// Static OG image (1200x630) - dark MyZone brand card with neon-ice slogan.
export const alt = "MyZone - Soukromé fitness, Kladno";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background:
            "radial-gradient(ellipse 60% 55% at 50% 42%, #0e2a3a 0%, #05070A 70%)",
          color: "#E8F6FF",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 14,
            color: "#6BD8FF",
            marginBottom: 28,
          }}
        >
          SOUKROMÉ FITNESS · KLADNO
        </div>
        <div
          style={{
            fontSize: 132,
            fontWeight: 700,
            lineHeight: 1,
            textAlign: "center",
            color: "#6BD8FF",
            textShadow: "0 0 40px rgba(107,216,255,0.55)",
          }}
        >
          MYZONE
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 600,
            marginTop: 36,
            color: "#E8F6FF",
          }}
        >
          Tvoje zóna. Tvůj čas.
        </div>
      </div>
    ),
    { ...size },
  );
}
