import { Prata } from "next/font/google";

// Заголовки ресторана — выразительный антиквенный Prata, текст остаётся на Onest
const prata = Prata({ subsets: ["latin", "cyrillic"], weight: "400", variable: "--font-site", display: "swap" });

export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
  return <div className={prata.variable}>{children}</div>;
}
