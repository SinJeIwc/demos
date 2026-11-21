import { Forum } from "next/font/google";

// Заголовки салона — изящный Forum, текст остаётся на Onest
const forum = Forum({ subsets: ["latin", "cyrillic"], weight: "400", variable: "--font-site", display: "swap" });

export default function BeautyLayout({ children }: { children: React.ReactNode }) {
  return <div className={forum.variable}>{children}</div>;
}
