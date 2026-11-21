import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="23" cy="32" r="14" fill="none" stroke="#f2f6f5" stroke-width="3.5"/><circle cx="41" cy="32" r="14" fill="none" stroke="#f2f6f5" stroke-width="3.5"/><path d="M32 21.28A14 14 0 0 1 32 42.72A14 14 0 0 1 32 21.28Z" fill="#f0a35e"/></svg>`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0d2830" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(mark)}`} width={150} height={150} alt="" />
      </div>
    ),
    size,
  );
}
