import type { Metadata } from "next";
import LandingRoot from "./LandingRoot";

export const metadata: Metadata = {
  metadataBase: new URL("https://luisgaxiola.com"),
  title: "Luis Gaxiola | Anuncios que sí traen clientes",
  description:
    "Publicidad en Facebook e Instagram para dueños de negocio. Te digo cuántos clientes te llegaron, no cuánta gente 'vio' tu anuncio.",
  openGraph: {
    title: "Anuncios que sí te traen clientes, no solo 'likes'",
    description:
      "Te digo cuántos clientes nuevos te llegaron, no cuánta gente 'vio' tu anuncio. Responde 4 preguntas y te digo si tu negocio califica.",
    type: "website",
    locale: "es_MX",
    images: [{ url: "/og-landing.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anuncios que sí te traen clientes, no solo 'likes'",
    description:
      "Te digo cuántos clientes nuevos te llegaron, no cuánta gente 'vio' tu anuncio.",
    images: ["/og-landing.jpg"],
  },
};

export default function LandingPage() {
  return <LandingRoot />;
}
