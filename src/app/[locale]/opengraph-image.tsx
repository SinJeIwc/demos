import { ImageResponse } from "next/og";

export const alt = "araweare — сайты для бизнеса";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="23" cy="32" r="14" fill="none" stroke="#f2f6f5" stroke-width="3.5"/><circle cx="41" cy="32" r="14" fill="none" stroke="#f2f6f5" stroke-width="3.5"/><path d="M32 21.28A14 14 0 0 1 32 42.72A14 14 0 0 1 32 21.28Z" fill="#f0a35e"/></svg>`;

// Превью для ссылок в Telegram, WhatsApp и соцсетях
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
          padding: 80,
          background: "#0d2830",
          color: "#f2f6f5",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/svg+xml;utf8,${encodeURIComponent(mark)}`} width={96} height={96} alt="" />
          <span style={{ fontSize: 56, letterSpacing: -2 }}>araweare</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 84, lineHeight: 1, letterSpacing: -3, maxWidth: 900 }}>
            Websites that bring you clients
          </span>
          <span style={{ marginTop: 28, fontSize: 30, color: "#9fd8d3" }}>
            Hotels · Clinics · Restaurants · Beauty
          </span>
        </div>
      </div>
    ),
    size,
  );
}
