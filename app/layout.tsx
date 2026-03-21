import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luis Gaxiola | Consultor de Marketing Estratégico",
  description: "Ayudo a empresas a dominar su mercado con estrategias de marketing agresivas y resultados tangibles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
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
