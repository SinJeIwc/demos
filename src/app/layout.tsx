import type { Metadata, Viewport } from "next";
import { Onest, Unbounded } from "next/font/google";
import { Toaster } from "sonner";
import "lenis/dist/lenis.css";
import "react-day-picker/style.css";
import "./globals.css";
import { preconnect } from "react-dom";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

// Только те начертания, что реально используются: меньше файлов шрифтов
const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  weight: ["300", "400", "500"],
  display: "swap",
});

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — сайты для бизнеса`, template: "%s" },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "ru_RU",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0d2830",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Заранее открываем соединение с CDN фотографий — первая картинка приходит быстрее
  preconnect("https://images.unsplash.com");

  return (
    <html lang="ru" className={`${unbounded.variable} ${onest.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#0d2830",
              color: "#f2f6f5",
              border: "1px solid rgba(159,216,211,.25)",
              fontFamily: "var(--font-onest)",
            },
          }}
        />
      </body>
    </html>
  );
}
