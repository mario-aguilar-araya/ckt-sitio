import type { Metadata, Viewport } from "next";
import { Shippori_Mincho, Zen_Kaku_Gothic_New } from "next/font/google";
import { club } from "@/lib/club";
import "./globals.css";

const serif = Shippori_Mincho({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-serif", display: "swap" });
const sans = Zen_Kaku_Gothic_New({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-sans", display: "swap" });

const descripcion = `Club de kendo en ${club.region}. Clases abiertas para principiantes, calendario de exámenes, seminarios y torneos.`;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: `${club.nombre} · Kendo en ${club.ciudad}`, template: `%s · ${club.nombre}` },
  description: descripcion,
  openGraph: { title: club.nombre, description: descripcion, locale: "es_CL", type: "website" },
};

export const viewport: Viewport = { themeColor: "#0f2038" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
