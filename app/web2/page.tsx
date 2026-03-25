"use client";

import { useEffect, useState } from "react";
import { Bodoni_Moda, Work_Sans } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import {
  Scissors, Sparkles, Palette, Hand, Eye, Star,
  MapPin, Clock, Phone, Instagram, ArrowUpRight,
} from "lucide-react";
import FloatingWidget from "../components/FloatingWidget";
import WantThisWebCTA from "../components/WantThisWebCTA";
import { trackEvent } from "../components/MetaPixel";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});
const work = Work_Sans({ subsets: ["latin"], display: "swap" });

// ─── CONFIG DEL SALÓN DE DEMO ─────────────────────────────────────────────────
const SALON = {
  name: "Studio Lumière",
  tagline: "Salón de Belleza de Autor",
  phone: "+52 664 123 4567",
  whatsapp: "5216641234567", // TODO: reemplazar con número real del cliente
  address: "Av. Revolución 1234, Zona Río, Tijuana, B.C.",
  hours: "Lun–Sáb  9:00 — 20:00",
  instagram: "studiolumiere_tij",
  mapsUrl: "https://maps.google.com", // TODO: reemplazar con Maps link real
};

const SERVICES = [
  { n: "01", icon: Scissors, name: "Corte & Peinado",     desc: "Corte personalizado, blowout y peinado de ocasión.", price: "desde $280" },
  { n: "02", icon: Palette,  name: "Color & Mechas",      desc: "Tinte, balayage, mechas y corrección de color.",    price: "desde $650" },
  { n: "03", icon: Sparkles, name: "Tratamientos",        desc: "Keratina, hidratación profunda y botox capilar.",   price: "desde $800" },
  { n: "04", icon: Hand,     name: "Manicure & Pedicure", desc: "Semipermanentes, acrílicas y nail art de autor.",   price: "desde $200" },
  { n: "05", icon: Eye,      name: "Pestañas",            desc: "Extensiones clásico, volumen ruso y Mega Volume.",  price: "desde $550" },
  { n: "06", icon: Star,     name: "Diseño de Cejas",     desc: "Laminado, hilo y micropigmentación de precisión.",  price: "desde $180" },
];

const TESTIMONIALS = [
  { name: "Gabriela M.", stars: 5, text: "El mejor salón que he visitado en Tijuana. La atención es increíble y el resultado siempre supera mis expectativas. ¡Ya llevo 2 años siendo clienta!" },
  { name: "Karla R.",    stars: 5, text: "Me hicieron un balayage espectacular. Llegué con una foto y quedó exactamente igual. El ambiente es súper relajante, definitivamente regreso." },
  { name: "Sofía L.",   stars: 5, text: "Vine por mis pestañas y quedé enamorada. El trato es muy profesional y el lugar está impecable. 100% recomendado sin dudar." },
];

export default function SalonDemo() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    trackEvent("ViewContent", { content_name: "demo_salon", content_category: "web_demo" });
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const waUrl = (msg: string) =>
    `https://wa.me/${SALON.whatsapp}?text=${encodeURIComponent(msg)}`;

  return (
    <div className={`${work.className} bg-[#F7F3EE] text-[#17100E] min-h-screen overflow-x-hidden`}>

      {/* ── DEMO BANNER ───────────────────────────────────── */}
      <div className="bg-[#17100E] text-[#F7F3EE] text-center py-2 px-4 text-[10px] font-bold tracking-[0.3em] uppercase z-50 relative">
        <span className="text-[#C4334A]">⚡ Demo</span> — Diseño disponible.{" "}
        <Link href="/webs" className="underline hover:text-[#C4334A] transition-colors">
          Solo se vende 1 vez →
        </Link>
      </div>

      {/* ── NAVBAR DEL SALÓN ──────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#F7F3EE]/95 backdrop-blur-sm border-b border-[#17100E]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <span className={`${bodoni.className} text-xl font-bold tracking-tight text-[#17100E]`}>
            {SALON.name}
          </span>
          <nav className="hidden md:flex items-center gap-10 text-[10px] font-bold text-[#17100E]/50 tracking-[0.2em] uppercase">
            {["Servicios", "Galería", "Nosotros", "Reseñas"].map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace("ñ","n")}`}
                className="hover:text-[#C4334A] transition-colors relative group">
                {l}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C4334A] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>
          <a
            href={waUrl("Hola, quiero agendar una cita en Studio Lumière.")}
            target="_blank" rel="noopener noreferrer"
            className="text-[10px] font-bold tracking-[0.2em] uppercase px-6 py-2.5 bg-[#17100E] text-[#F7F3EE] hover:bg-[#C4334A] transition-colors"
          >
            Agendar
          </a>
        </div>
      </header>

      {/* ── HERO — EDITORIAL SPLIT ─────────────────────────── */}
      <section
        className={`min-h-[95vh] grid grid-cols-1 md:grid-cols-[1fr_1px_55%] transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      >
        {/* Left — Typography column */}
        <div className="flex flex-col justify-between px-8 md:px-12 py-16 md:py-20 relative">
          {/* Rotated label */}
          <div className="hidden md:flex absolute left-0 bottom-1/3 -rotate-90 origin-left translate-x-4 translate-y-full">
            <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#17100E]/30 whitespace-nowrap">
              Tijuana, B.C. · Est. 2016
            </span>
          </div>

          {/* Big editorial type */}
          <div className="mt-auto">
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#C4334A] mb-8">
              Salón de Belleza de Autor
            </p>
            <h1 className={`${bodoni.className} text-[clamp(4rem,10vw,8rem)] font-black leading-[0.85] tracking-tight text-[#17100E] mb-8`}>
              STUDIO<br />
              <em className="italic font-normal text-[#C4334A]">Lumière</em>
            </h1>
            <p className="text-[#17100E]/50 text-sm leading-relaxed max-w-xs mb-10">
              Especialistas en color, corte y tratamientos capilares. 8 años transformando la imagen de nuestras clientas.
            </p>
            <div className="flex flex-col gap-3">
              <a href={waUrl("Hola, quiero agendar una cita.")}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#17100E] text-[#F7F3EE] text-[10px] font-bold tracking-[0.2em] uppercase px-8 py-4 hover:bg-[#C4334A] transition-colors self-start group"
              >
                Agenda tu cita
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a href="#servicios"
                className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-[#17100E]/40 hover:text-[#C4334A] transition-colors self-start">
                Ver servicios →
              </a>
            </div>
          </div>

          {/* Stat strip */}
          <div className="mt-16 pt-8 border-t border-[#17100E]/10 grid grid-cols-3 gap-4 text-center">
            {[["500+", "Clientas"], ["4.9★", "Google"], ["8", "Años"]].map(([v, l]) => (
              <div key={l}>
                <p className={`${bodoni.className} text-2xl font-bold text-[#17100E]`}>{v}</p>
                <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#17100E]/30 mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block bg-[#17100E]/10" />

        {/* Right — Hero image, full height */}
        <div className="relative h-[55vw] md:h-auto overflow-hidden">
          <Image
            src="/images/salon/hero.jpg"
            alt="Studio Lumière — Salón de Belleza"
            fill
            className="object-cover"
            priority
          />
          {/* Subtle left edge gradient blending into white */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#F7F3EE] to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17100E]/30 to-transparent" />
        </div>
      </section>

      {/* ── SERVICIOS — EDITORIAL LIST ────────────────────── */}
      <section id="servicios" className="py-32 bg-[#17100E] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="grid md:grid-cols-[1fr_2fr] gap-16 mb-20">
            <div>
              <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#C4334A] mb-6">Lo que hacemos</p>
              <h2 className={`${bodoni.className} text-5xl md:text-6xl font-bold text-[#F7F3EE] leading-tight`}>
                Nuestros<br /><em className="italic font-normal">servicios</em>
              </h2>
            </div>
            <div className="flex items-end">
              <p className="text-[#F7F3EE]/30 text-sm leading-relaxed max-w-md">
                Cada servicio es diseñado a medida. No seguimos tendencias ciegas — creamos el look que complementa <em>tu</em> personalidad y estilo de vida.
              </p>
            </div>
          </div>

          {/* Numbered editorial list */}
          <div className="border-t border-[#F7F3EE]/10">
            {SERVICES.map((s, i) => (
              <div key={s.n}
                className="group border-b border-[#F7F3EE]/10 py-7 grid grid-cols-[3rem_1fr_auto_auto] md:grid-cols-[3rem_1fr_2fr_auto] items-center gap-6 hover:bg-[#F7F3EE]/3 transition-all cursor-pointer"
              >
                <span className={`${bodoni.className} text-4xl font-light text-[#F7F3EE]/10 group-hover:text-[#C4334A]/40 transition-colors leading-none`}>
                  {s.n}
                </span>
                <h3 className={`${bodoni.className} text-xl md:text-2xl font-semibold text-[#F7F3EE] group-hover:text-[#C4334A] transition-colors`}>
                  {s.name}
                </h3>
                <p className="hidden md:block text-[#F7F3EE]/30 text-sm">{s.desc}</p>
                <span className="text-[#C4334A] font-bold text-sm text-right">{s.price}</span>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <a href={waUrl("Hola, me gustaría saber el precio de un servicio.")}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-[#F7F3EE]/20 text-[#F7F3EE]/50 text-[10px] font-bold tracking-[0.2em] uppercase px-8 py-4 hover:border-[#C4334A] hover:text-[#C4334A] transition-all"
            >
              Consultar precios <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE ────────────────────────────────────── */}
      <section className="py-20 px-8 md:px-12 bg-[#F7F3EE] overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center gap-6">
          <span className={`${bodoni.className} text-[8rem] md:text-[12rem] font-black text-[#17100E]/5 leading-none flex-shrink-0`}>"</span>
          <blockquote className={`${bodoni.className} text-3xl md:text-5xl font-light italic text-[#17100E] leading-tight`}>
            La belleza no es un accidente —<br />
            <span className="text-[#C4334A]">es una decisión.</span>
          </blockquote>
        </div>
      </section>

      {/* ── GALERÍA — COLLAGE EDITORIAL ───────────────────── */}
      <section id="galería" className="py-32 bg-[#F7F3EE] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#C4334A] mb-4">Nuestro trabajo</p>
              <h2 className={`${bodoni.className} text-5xl md:text-6xl font-bold text-[#17100E] leading-tight`}>
                Galería
              </h2>
            </div>
            <span className="hidden md:block text-[9px] font-bold tracking-[0.3em] uppercase text-[#17100E]/30">
              Resultados reales
            </span>
          </div>

          {/* Creative collage grid */}
          <div className="grid grid-cols-12 grid-rows-[auto] gap-3">
            {/* Large feature — gallery-1 */}
            <div className="col-span-12 md:col-span-8 row-span-2 relative aspect-[4/3] md:aspect-auto md:h-[520px] overflow-hidden group">
              <Image src="/images/salon/gallery-1.jpg" alt="Balayage resultado"
                fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17100E]/40 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className={`${bodoni.className} text-white/70 text-sm italic`}>Balayage caramelo</span>
              </div>
            </div>

            {/* Two stacked — gallery-2, gallery-3 */}
            <div className="col-span-6 md:col-span-4 relative aspect-square overflow-hidden group">
              <Image src="/images/salon/gallery-2.jpg" alt="Corte y color"
                fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="col-span-6 md:col-span-4 relative aspect-square overflow-hidden group">
              <Image src="/images/salon/gallery-3.jpg" alt="Manicure"
                fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>

            {/* Bottom row — gallery-4, gallery-5, gallery-6 */}
            <div className="col-span-4 relative aspect-square overflow-hidden group">
              <Image src="/images/salon/gallery-4.jpg" alt="Rizos"
                fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="col-span-4 relative aspect-square overflow-hidden group">
              <Image src="/images/salon/gallery-5.jpg" alt="Pestañas"
                fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="col-span-4 relative aspect-square overflow-hidden group">
              <Image src="/images/salon/gallery-6.jpg" alt="Rubio platino"
                fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* ── NOSOTROS ──────────────────────────────────────── */}
      <section id="nosotros" className="scroll-mt-20">
        <div className="grid md:grid-cols-2 min-h-[600px]">
          {/* Image — full bleed left */}
          <div className="relative h-[50vw] md:h-auto order-2 md:order-1">
            <Image src="/images/salon/about.jpg" alt="Equipo Studio Lumière"
              fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#F7F3EE]/10" />
          </div>

          {/* Text — right */}
          <div className="order-1 md:order-2 bg-[#F7F3EE] px-10 md:px-16 py-20 flex flex-col justify-center">
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#C4334A] mb-8">Nuestra historia</p>
            <h2 className={`${bodoni.className} text-4xl md:text-5xl font-bold text-[#17100E] leading-tight mb-8`}>
              Más de 8 años<br />haciendo brillar<br />
              <em className="italic font-normal text-[#C4334A]">tu belleza.</em>
            </h2>
            <p className="text-[#17100E]/50 text-sm leading-relaxed mb-5">
              Studio Lumière nació de la pasión por el arte del cabello y la belleza. Nuestro equipo se capacita constantemente para ofrecerte las últimas técnicas y tendencias del mundo.
            </p>
            <p className="text-[#17100E]/50 text-sm leading-relaxed mb-10">
              Cada clienta que entra por nuestra puerta es única. No seguimos tendencias ciegas — creamos el look que complementa <em>tu</em> personalidad.
            </p>
            <div className="flex items-center gap-3 mb-10">
              <div className="flex">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-[#C4334A] fill-[#C4334A]" />)}
              </div>
              <span className="text-[#17100E]/40 text-xs font-bold tracking-wide">4.9 en Google · +200 reseñas</span>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#17100E]/10">
              {[["500+", "Clientas"], ["10+", "Especialistas"], ["8", "Años"]].map(([v, l]) => (
                <div key={l}>
                  <p className={`${bodoni.className} text-3xl font-bold text-[#17100E]`}>{v}</p>
                  <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#17100E]/30 mt-1">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ───────────────────────────────────── */}
      <section id="resenas" className="py-32 bg-[#F0EBE3] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="text-center mb-20">
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#C4334A] mb-4">Lo que dicen</p>
            <h2 className={`${bodoni.className} text-5xl md:text-6xl font-bold text-[#17100E]`}>
              Reseñas reales
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#17100E]/10">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-[#F0EBE3] p-10">
                <div className="flex mb-6">
                  {[...Array(t.stars)].map((_, i) => <Star key={i} className="w-3 h-3 text-[#C4334A] fill-[#C4334A]" />)}
                </div>
                <p className={`${bodoni.className} text-lg italic text-[#17100E]/70 leading-relaxed mb-8`}>
                  "{t.text}"
                </p>
                <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#C4334A]">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING CTA ───────────────────────────────────── */}
      <section className="bg-[#C4334A] py-32 relative overflow-hidden">
        {/* Decorative bg type */}
        <div className={`${bodoni.className} absolute -top-8 left-0 right-0 text-center text-[20rem] font-black text-white/5 leading-none select-none pointer-events-none`}>
          CITA
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-8 md:px-12 text-center">
          <p className="text-white/60 text-[9px] font-bold uppercase tracking-[0.4em] mb-8">Reserva ahora</p>
          <h2 className={`${bodoni.className} text-5xl md:text-8xl font-black text-white leading-none mb-8`}>
            Tu cita está<br />
            <em className="italic font-light">a un mensaje.</em>
          </h2>
          <p className="text-white/60 text-base mb-12 max-w-md mx-auto">
            Escríbenos por WhatsApp y te damos disponibilidad en menos de 5 minutos.
          </p>
          <a href={waUrl("Hola, quiero agendar una cita en Studio Lumière.")}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-[#17100E] text-[#F7F3EE] font-bold text-sm tracking-[0.2em] uppercase px-12 py-5 hover:bg-[#0C0806] transition-colors group"
          >
            Agendar por WhatsApp
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="bg-[#0C0806] text-[#F7F3EE]/30 py-12">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="grid md:grid-cols-[1fr_auto_auto_auto] gap-10 md:gap-16 mb-10 items-start">
            <div>
              <span className={`${bodoni.className} text-2xl font-bold text-[#F7F3EE]/70 block mb-2`}>{SALON.name}</span>
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#F7F3EE]/20">{SALON.tagline}</p>
            </div>
            <div className="text-xs">
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#F7F3EE]/15 mb-3">Horarios</p>
              <p className="flex items-center gap-2"><Clock className="w-3 h-3" /> {SALON.hours}</p>
            </div>
            <div className="text-xs">
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#F7F3EE]/15 mb-3">Ubicación</p>
              <p className="flex items-start gap-2 max-w-[180px] leading-relaxed">
                <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" /> {SALON.address}
              </p>
            </div>
            <div className="text-xs">
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#F7F3EE]/15 mb-3">Contacto</p>
              <p className="flex items-center gap-2 mb-1.5"><Phone className="w-3 h-3" /> {SALON.phone}</p>
              <a href={`https://instagram.com/${SALON.instagram}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#C4334A] transition-colors">
                <Instagram className="w-3 h-3" /> @{SALON.instagram}
              </a>
            </div>
          </div>
          <div className="border-t border-[#F7F3EE]/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px]">
            <p>© {new Date().getFullYear()} {SALON.name}. Todos los derechos reservados.</p>
            <div className="flex items-center gap-8">
              <Link href="/demos/privacidad" className="hover:text-[#F7F3EE]/60 transition-colors">Política de Privacidad</Link>
              <Link href="/demos/terminos" className="hover:text-[#F7F3EE]/60 transition-colors">Términos y Condiciones</Link>
            </div>
          </div>
          <p className="text-center text-[#F7F3EE]/10 text-[10px] mt-6">
            Sitio web diseñado por{" "}
            <Link href="/webs" className="hover:text-[#C4334A] transition-colors underline">Luis Gaxiola</Link>
          </p>
        </div>
      </footer>

      {/* ── WIDGETS FLOTANTES ─────────────────────────────── */}
      <FloatingWidget
        phone={SALON.phone}
        whatsapp={SALON.whatsapp}
        googleMapsUrl={SALON.mapsUrl}
        businessName={SALON.name}
        businessType="salon"
      />
      <WantThisWebCTA />
    </div>
  );
}
