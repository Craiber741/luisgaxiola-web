"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { label: "INICIO", href: "/" },
  { label: "SITIOS WEB", href: "/web" },
];

const SUBSTACK_URL = "https://elmediabuyer.substack.com/";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 h-16">
      <nav className="max-w-5xl mx-auto px-4 flex items-center justify-between h-full">
        {/* Logo */}
        <Link href="/" className="font-black text-black text-lg tracking-tighter hover:text-[var(--accent)] transition-colors">
          LUIS GAXIOLA
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-bold uppercase tracking-wide transition-colors ${
                pathname === link.href
                  ? "text-[var(--accent)]"
                  : "text-black hover:text-[var(--accent)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-[var(--accent)] text-white text-sm font-bold uppercase tracking-wide hover:brightness-110 transition-all"
          >
            NEWSLETTER
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-black"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menú"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-100 px-4 py-6 flex flex-col gap-4 z-50">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-sm font-bold uppercase tracking-wide ${
                pathname === link.href ? "text-[var(--accent)]" : "text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-[var(--accent)] text-white text-sm font-bold uppercase tracking-wide text-center hover:brightness-110 transition-all"
          >
            NEWSLETTER
          </a>
        </div>
      )}
    </header>
  );
}
