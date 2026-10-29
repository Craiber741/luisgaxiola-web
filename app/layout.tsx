import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteWrapper from "./components/SiteWrapper";
import { MetaPixel } from "./components/MetaPixel";
import { JsonLd, SITE_URL, SAME_AS } from "./components/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Luis Gaxiola, media buyer y trafficker digital con +$4M USD invertidos en Meta, Google y TikTok Ads. Dos newsletters gratuitas y asesoría 1 a 1 por aplicación.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Luis Gaxiola | Media Buyer y Trafficker Digital",
    template: "%s | Luis Gaxiola",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "Luis Gaxiola",
    title: "Luis Gaxiola | Media Buyer y Trafficker Digital",
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Luis Gaxiola, media buyer y trafficker digital" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
};

// Entidad principal del sitio: así Google conecta "Luis Gaxiola" con media buyer / trafficker.
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#luis`,
  name: "Luis Gaxiola",
  url: SITE_URL,
  image: `${SITE_URL}/images/luis/hero.jpg`,
  jobTitle: "Media Buyer y Trafficker Digital",
  description,
  knowsAbout: ["Media buying", "Trafficker digital", "Meta Ads", "Facebook Ads", "Google Ads", "TikTok Ads", "Marketing con IA"],
  homeLocation: { "@type": "Place", name: "Guadalajara, Jalisco, México" },
  birthPlace: { "@type": "Place", name: "Mexicali, Baja California, México" },
  worksFor: [
    { "@type": "Organization", name: "Craiber", url: "https://craiber.com" },
    { "@type": "Organization", name: "Chawoora", url: "https://chawoora.com" },
  ],
  sameAs: SAME_AS,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <JsonLd data={person} />
        <MetaPixel />
        <SiteWrapper>
          {children}
        </SiteWrapper>
      </body>
    </html>
  );
}
