import { Geologica } from "next/font/google";

// Свой шрифт у каждого демо-сайта: здесь — строгий и дружелюбный Geologica
const geologica = Geologica({ subsets: ["latin", "cyrillic"], variable: "--font-site", display: "swap" });

export default function ClinicLayout({ children }: { children: React.ReactNode }) {
  return <div className={geologica.variable}>{children}</div>;
}
