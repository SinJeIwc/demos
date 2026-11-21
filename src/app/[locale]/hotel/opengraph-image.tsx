import { ImageResponse } from "next/og";
import { getHotel } from "@/entities/hotel";

// Генератор картинок без своего шрифта не рисует кириллицу, поэтому превью на латинице
const hotel = getHotel("en");

export const alt = `${hotel.fullName} — hotel on Issyk-Kul`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Превью ссылки на отель: фото озера с названием
export default function HotelOpengraphImage() {
  const photo = `${hotel.hero.image}?auto=format&fit=crop&w=1200&h=630&q=80&fm=jpg`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#0d2830" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} width={1200} height={630} alt="" style={{ position: "absolute", top: 0, left: 0, objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: 72,
            background: "linear-gradient(180deg, rgba(13,40,48,0.1) 30%, rgba(13,40,48,0.85) 100%)",
            color: "#f2f6f5",
          }}
        >
          <span style={{ fontSize: 96, lineHeight: 1, letterSpacing: -4 }}>{hotel.fullName}</span>
          <span style={{ marginTop: 20, fontSize: 32, color: "#9fd8d3" }}>Cholpon-Ata, Issyk-Kul</span>
        </div>
      </div>
    ),
    size,
  );
}
