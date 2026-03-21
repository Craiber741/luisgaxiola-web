import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

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
        <Navbar />
        {children}
        <footer className="py-8 border-t border-gray-100 mt-auto">
          <div className="container mx-auto px-4 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Luis Gaxiola. Todos los derechos reservados.</p>
            <p className="mt-2 text-xs">Diseñado para la dominación del mercado.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
