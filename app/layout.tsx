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
  title: "Luis Gaxiola | Media Buyer · Newsletters y asesoría 1 a 1",
  description: "Media buyer con +$4M USD invertidos en ads. Dos newsletters gratuitas y asesoría 1 a 1 por aplicación para dueños que ya invierten en publicidad.",
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
