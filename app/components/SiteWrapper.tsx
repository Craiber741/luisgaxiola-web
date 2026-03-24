"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const STANDALONE_ROUTES = ["/webs", "/web2", "/demos"];

export default function SiteWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandalone = STANDALONE_ROUTES.some((r) => pathname.startsWith(r));

  return (
    <>
      {!isStandalone && <Navbar />}
      {children}
      {!isStandalone && (
        <footer className="py-8 border-t border-gray-100 mt-auto">
          <div className="container mx-auto px-4 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Luis Gaxiola. Todos los derechos reservados.</p>
            <p className="mt-2 text-xs">Diseñado para la dominación del mercado.</p>
          </div>
        </footer>
      )}
    </>
  );
}
