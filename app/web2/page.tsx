"use client";

import { useEffect } from "react";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import {
  Star, Clock, MapPin, Phone, Instagram, ChevronRight, Scissors, Sparkles,
  Palette, Hand, Eye, ArrowRight
} from "lucide-react";
import FloatingWidget from "../components/FloatingWidget";
import WantThisWebCTA from "../components/WantThisWebCTA";
import { trackEvent } from "../components/MetaPixel";

const playfair = Playfair_Display({ subsets: ["latin"], display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], display: "swap" });

// ─── CONFIG DEL SALÓN DE DEMO ─────────────────────────────────────────────
const SALON = {
  name: "Studio Lumière",
  tagline: "Donde el arte se convierte en belleza",
  phone: "+52 664 123 4567",
  whatsapp: "5216641234567", // TODO: reemplazar con número real del cliente
  address: "Av. Revolución 1234, Zona Río, Tijuana, B.C.",
  hours: "Lun–Sáb: 9:00am – 8:00pm",
  instagram: "studiolumiere_tij",
  mapsUrl: "https://maps.google.com", // TODO: reemplazar con Maps link real
};

const SERVICES = [
  { icon: Scissors, name: "Corte & Peinado", desc: "Corte personalizado, blowout y peinado de ocasión.", price: "Desde $280" },
  { icon: Palette, name: "Color & Mechas", desc: "Tinte, balayage, mechas y corrección de color.", price: "Desde $650" },
  { icon: Sparkles, name: "Tratamientos", desc: "Keratina, hidratación profunda y botox capilar.", price: "Desde $800" },
  { icon: Hand, name: "Manicure & Pedicure", desc: "Uñas semipermanentes, acrílicas y nail art.", price: "Desde $200" },
  { icon: Eye, name: "Extensión de Pestañas", desc: "Clásico, volumen ruso y Mega Volume.", price: "Desde $550" },
  { icon: Star, name: "Diseño de Cejas", desc: "Laminado, hilo y micropigmentación.", price: "Desde $180" },
];

const TESTIMONIALS = [
  {
    name: "Gabriela M.", stars: 5,
    text: "El mejor salón que he visitado en Tijuana. La atención es increíble y el resultado siempre supera mis expectativas. ¡Ya llevo 2 años siendo clienta!",
  },
  {
    name: "Karla R.", stars: 5,
    text: "Me hicieron un balayage espectacular. Llegué con una foto y quedó exactamente igual. El ambiente es súper relajante, definitivamente regreso.",
  },
  {
    name: "Sofía L.", stars: 5,
    text: "Vine por mis pestañas y quedé enamorada. Además el trato es muy profesional y el lugar está impecable. 100% recomendado.",
  },
];

export default function SalonDemo() {
  useEffect(() => {
    trackEvent("ViewContent", { content_name: "demo_salon", content_category: "web_demo" });
  }, []);

  return (
    <div className={`${dmSans.className} bg-[#FAF8F5] text-[#1C1410] min-h-screen`}>
      {/* ── DEMO BANNER ─────────────────────────────────── */}
      <div className="bg-[#1C1410] text-white text-center py-2 px-4 text-xs font-medium tracking-wide z-50 relative">
        <span className="text-[#C8A882]">⚡ DEMO</span> — Este diseño está disponible.{" "}
        <Link href="/webs" className="underline hover:text-[#C8A882] transition-colors font-bold">
          Solo se vende 1 vez →
        </Link>
      </div>

      {/* ── SALON NAVBAR ──────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E8E2DA]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className={`${playfair.className} text-2xl font-bold text-[#1C1410] tracking-tight`}>
            {SALON.name}
          </span>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#8A8178]">
            <a href="#servicios" className="hover:text-[#9B6B5A] transition-colors">Servicios</a>
            <a href="#galeria" className="hover:text-[#9B6B5A] transition-colors">Galería</a>
            <a href="#nosotros" className="hover:text-[#9B6B5A] transition-colors">Nosotros</a>
            <a href="#testimonios" className="hover:text-[#9B6B5A] transition-colors">Reseñas</a>
          </nav>
          <a
            href={`https://wa.me/${SALON.whatsapp}?text=${encodeURIComponent("Hola, quiero agendar una cita en Studio Lumière.")}`}
            target="_blank" rel="noopener noreferrer"
            className="bg-[#1C1410] text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-[#9B6B5A] transition-colors"
          >
            Agendar cita
          </a>
        </div>
      </header>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative bg-[#1C1410] text-white overflow-hidden min-h-[90vh] flex items-center">
        {/* Hero image */}
        <Image
          src="/images/salon/hero.jpg"
          alt="Studio Lumière — Salón de Belleza"
          fill
          className="object-cover opacity-30"
          priority
        />
        {/* Warm gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2D1F18]/80 via-[#1C1410]/70 to-[#0F0B08]/90" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#C8A882] text-xs font-bold uppercase tracking-[0.3em] mb-6">
              Salón de Belleza · Tijuana
            </p>
            <h1 className={`${playfair.className} text-5xl md:text-7xl font-bold leading-[1.05] mb-8`}>
              Donde el arte<br />se convierte<br />
              <em className="text-[#C8A882] not-italic">en belleza.</em>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-md">
              Especialistas en color, corte y tratamientos capilares. Más de 8 años transformando la imagen de nuestras clientas en Tijuana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`https://wa.me/${SALON.whatsapp}?text=${encodeURIComponent("Hola, quiero agendar una cita.")}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#C8A882] text-[#1C1410] font-bold px-8 py-4 rounded-full hover:brightness-105 transition-all"
              >
                Agenda tu cita <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#servicios"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-medium px-8 py-4 rounded-full hover:border-white/50 transition-all"
              >
                Ver servicios
              </a>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "500+", label: "Clientas satisfechas" },
              { value: "8", label: "Años de experiencia" },
              { value: "4.9★", label: "Calificación Google" },
              { value: "10+", label: "Especialistas" },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#C8A882]/40 transition-all">
                <p className={`${playfair.className} text-3xl font-bold text-[#C8A882] mb-1`}>{s.value}</p>
                <p className="text-white/50 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICIOS ─────────────────────────────────────── */}
      <section id="servicios" className="py-24 bg-[#FAF8F5] scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#9B6B5A] text-xs font-bold uppercase tracking-[0.3em] mb-3">Lo que hacemos</p>
            <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold text-[#1C1410]`}>
              Nuestros servicios
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div key={s.name}
                className="bg-white border border-[#E8E2DA] rounded-2xl p-7 hover:border-[#9B6B5A] hover:shadow-lg transition-all group cursor-pointer"
              >
                <div className="w-12 h-12 bg-[#FAF8F5] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#9B6B5A]/10 transition-colors">
                  <s.icon className="w-5 h-5 text-[#9B6B5A]" />
                </div>
                <h3 className={`${playfair.className} text-xl font-bold text-[#1C1410] mb-2`}>{s.name}</h3>
                <p className="text-[#8A8178] text-sm leading-relaxed mb-5">{s.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#9B6B5A] font-bold text-sm">{s.price}</span>
                  <ChevronRight className="w-4 h-4 text-[#C8A882] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href={`https://wa.me/${SALON.whatsapp}?text=${encodeURIComponent("Hola, me gustaría saber el precio de un servicio.")}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-[#1C1410] text-[#1C1410] font-bold px-8 py-3.5 rounded-full hover:bg-[#1C1410] hover:text-white transition-all"
            >
              Consultar precios <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── GALERÍA ───────────────────────────────────────── */}
      <section id="galeria" className="py-24 bg-[#1C1410] scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#C8A882] text-xs font-bold uppercase tracking-[0.3em] mb-3">Nuestro trabajo</p>
            <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold text-white`}>
              Galería
            </h2>
            <p className="text-white/50 mt-4">Cada resultado es único, como tú.</p>
          </div>
          {/* Asymmetric gallery grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden aspect-square">
              <Image src="/images/salon/gallery-1.jpg" alt="Balayage resultado" fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            {[2,3,4,5].map((i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden aspect-square">
                <Image src={`/images/salon/gallery-${i}.jpg`} alt={`Resultado ${i}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOSOTROS ──────────────────────────────────────── */}
      <section id="nosotros" className="py-24 bg-[#F5F0EB] scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-3xl overflow-hidden aspect-square">
            <Image src="/images/salon/about.jpg" alt="Equipo Studio Lumière" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410]/60 to-transparent" />
          </div>
          <div>
            <p className="text-[#9B6B5A] text-xs font-bold uppercase tracking-[0.3em] mb-4">Nuestra historia</p>
            <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold text-[#1C1410] mb-6 leading-tight`}>
              Más de 8 años<br />haciendo brillar<br />tu belleza.
            </h2>
            <p className="text-[#8A8178] leading-relaxed mb-6">
              Studio Lumière nació de la pasión por el arte del cabello y la belleza. Nuestro equipo de especialistas se capacita constantemente para ofrecerte las últimas técnicas y tendencias del mundo.
            </p>
            <p className="text-[#8A8178] leading-relaxed mb-8">
              Cada clienta que entra por nuestra puerta es única, y nos aseguramos de que salga sintiéndose exactamente así. No seguimos tendencias ciegas — creamos el look que complementa <em>tu</em> personalidad.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#C8A882] fill-[#C8A882]" />
                ))}
              </div>
              <span className="text-[#8A8178] font-medium">4.9 en Google · +200 reseñas</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ───────────────────────────────────── */}
      <section id="testimonios" className="py-24 bg-[#FAF8F5] scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#9B6B5A] text-xs font-bold uppercase tracking-[0.3em] mb-3">Lo que dicen</p>
            <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold text-[#1C1410]`}>
              Reseñas reales
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white border border-[#E8E2DA] rounded-2xl p-7">
                <div className="flex mb-4">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#C8A882] fill-[#C8A882]" />
                  ))}
                </div>
                <p className="text-[#1C1410] leading-relaxed mb-5 text-sm">"{t.text}"</p>
                <p className="font-bold text-[#9B6B5A] text-sm">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING CTA ───────────────────────────────────── */}
      <section className="bg-[#1C1410] py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[#C8A882] text-xs font-bold uppercase tracking-[0.3em] mb-4">Reserva ahora</p>
          <h2 className={`${playfair.className} text-4xl md:text-6xl font-bold text-white mb-6 leading-tight`}>
            Tu cita está<br />a un mensaje.
          </h2>
          <p className="text-white/50 text-lg mb-10">
            Escríbenos por WhatsApp y te damos disponibilidad en menos de 5 minutos.
          </p>
          <a
            href={`https://wa.me/${SALON.whatsapp}?text=${encodeURIComponent("Hola, quiero agendar una cita en Studio Lumière.")}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#C8A882] text-[#1C1410] font-bold text-lg px-10 py-5 rounded-full hover:brightness-105 transition-all"
          >
            Agendar por WhatsApp <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="bg-[#0F0B08] text-white/40 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <span className={`${playfair.className} text-xl font-bold text-white/80`}>{SALON.name}</span>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{SALON.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{SALON.hours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{SALON.phone}</span>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <p>© {new Date().getFullYear()} {SALON.name}. Todos los derechos reservados.</p>
            <div className="flex items-center gap-6">
              <Link href="/demos/privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link>
              <Link href="/demos/terminos" className="hover:text-white transition-colors">Términos y Condiciones</Link>
              <a href={`https://instagram.com/${SALON.instagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                <Instagram className="w-3 h-3" /> @{SALON.instagram}
              </a>
            </div>
          </div>
          <p className="text-center text-white/20 text-[10px] mt-6">
            Sitio web diseñado por{" "}
            <Link href="/webs" className="hover:text-[#C8A882] transition-colors underline">
              Luis Gaxiola
            </Link>
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
