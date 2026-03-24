import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteWrapper from "./components/SiteWrapper";
import { MetaPixel } from "./components/MetaPixel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luis Gaxiola | Entrepreneur & Media Buyer",
  description: "Builder de Chawoora y Craiber. +$45M generados en ventas. Estrategias de marketing que no publico en redes — solo en mi newsletter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MetaPixel />
        <SiteWrapper>
          {children}
        </SiteWrapper>
      </body>
    </html>
  );
}
