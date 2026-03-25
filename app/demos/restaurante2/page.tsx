"use client";

import { useEffect } from "react";
import { Archivo_Black, Nunito } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { Star, Flame, MapPin, Clock, Phone, Instagram, ArrowRight } from "lucide-react";
import FloatingWidget from "../../components/FloatingWidget";
import WantThisWebCTA from "../../components/WantThisWebCTA";
import { trackEvent } from "../../components/MetaPixel";

const archivoBlack = Archivo_Black({ subsets: ["latin"], weight: "400", display: "swap" });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });

const CONFIG = {
  name: "El Taquero",
  tagline: "Tacos de Tijuana · El Sabor Original",
  phone: "+52 664 555 1234",
  whatsapp: "5216645551234",
  mapsUrl: "https://maps.google.com",
  address: "Calle 5ta. 890, Centro, Tijuana, B.C.",
  hours: { weekday: "Mar–Dom: 8:00am – 10:00pm", note: "¡Abierto todos los días!" },
  instagram: "eltaquero_tij",
};

const MENU = [
  {
    name: "Taco al Pastor",
    desc: "Carne de cerdo marinada en achiote, cebollita y cilantro sobre tortilla de maíz azul.",
    price: "$65",
    tag: "🌟 El clásico",
  },
  {
    name: "Quesadilla de Champiñones",
    desc: "Hongos salteados con epazote, queso Oaxaca derretido y salsa verde tatemada.",
    price: "$95",
    tag: "🌿 Vegano",
  },
  {
    name: "Burrito de Birria",
    desc: "Birria de res estilo Tijuana, consomé para dipear, cebolla y cilantro.",
    price: "$145",
    tag: "🔥 Signature",
  },
  {
    name: "Agua Fresca",
    desc: "Jamaica, horchata o tamarindo. Preparadas al momento del día.",
    price: "$35",
    tag: "🥤 Refrescante",
  },
  {
    name: "Orden de Tacos x5",
    desc: "Elige entre pastor, asada, pollo o adobada. Con tres salsas caseras.",
    price: "$280",
    tag: "💥 Combo ahorro",
  },
  {
    name: "Combo Familiar",
    desc: "20 tacos mixtos + 4 aguas + guacamole + salsa. Perfecto para grupos.",
    price: "$420",
    tag: "👨‍👩‍👧‍👦 Familiar",
  },
];

const TESTIMONIALS = [
  {
    name: "Jorge H.",
    text: "Los mejores tacos al pastor de toda la ciudad. No exagero. Llevo 10 años viniendo y nunca me han fallado. La birria está brutal también.",
    stars: 5,
  },
  {
    name: "Marisol T.",
    text: "El burrito de birria es una bendición. El consomé está increíble. Los domingos venimos en familia y nos llenamos muy bien y muy barato.",
    stars: 5,
  },
  {
    name: "Carlos E.",
    text: "Vine por recomendación y me convertí en cliente fijo. Las tortillas son hechas a mano y se nota. Todo está muy limpio y el servicio es rápido.",
    stars: 5,
  },
];

export default function Restaurante2Page() {
  useEffect(() => {
    trackEvent("ViewContent", { content_name: "demo_restaurante2", content_category: "web_demo" });
  }, []);

  const waLink = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(
    `Hola ${CONFIG.name}, ¿cuál es su horario de hoy?`
  )}`;

  return (
    <div className={`${nunito.className} bg-[#FAF5EC] text-[#1A1108] min-h-screen`}>

      {/* DEMO BANNER */}
      <div className="bg-[#1A1108] text-white text-center py-2.5 px-4 text-xs font-bold tracking-widest z-50 relative">
        ⚡ DEMO — Este diseño está disponible.{" "}
        <Link href="/webs" className="text-[#F5C518] underline hover:opacity-80 transition-opacity">
          Solo se vende 1 vez →
        </Link>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#1A1108]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className={`${archivoBlack.className} text-xl text-[#F5C518] tracking-wider`}>
            {CONFIG.name}
          </span>
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-[#FAF5EC]/50 tracking-widest uppercase">
            <a href="#menu" className="hover:text-[#E63B2E] transition-colors">Menú</a>
            <a href="#galeria" className="hover:text-[#E63B2E] transition-colors">Galería</a>
            <a href="#nosotros" className="hover:text-[#E63B2E] transition-colors">Nosotros</a>
          </nav>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#E63B2E] text-white text-xs font-bold px-5 py-2.5 tracking-widest uppercase hover:bg-[#F5C518] hover:text-[#1A1108] transition-all"
          >
            ¡Pedir ahora!
          </a>
        </div>
      </header>

      {/* HERO — Dark bg, bold Archivo Black text */}
      <section className="bg-[#1A1108] min-h-[90vh] flex items-center relative overflow-hidden">
        {/* Background hero image */}
        <div className="absolute inset-0">
          <Image
            src="/images/restaurante2/hero.jpg"
            alt="El Taquero"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1108]/70 via-transparent to-[#1A1108]" />
        </div>
        {/* Decorative stripes */}
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, #F5C518 40px, #F5C518 41px)" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-24">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <p className="text-[#F5C518] text-[10px] font-bold uppercase tracking-[0.5em] mb-6 flex items-center gap-2">
                <Flame className="w-3 h-3 fill-[#F5C518]" /> Tijuana · Desde 1998
              </p>
              <h1 className={`${archivoBlack.className} leading-none mb-6`}>
                <span className="text-[#E63B2E] text-[80px] md:text-[120px] block leading-none">EL</span>
                <span className="text-[#F5C518] text-[80px] md:text-[120px] block leading-none">TAQUERO</span>
              </h1>
              <p className={`${nunito.className} text-[#FAF5EC]/60 text-lg leading-relaxed mb-10 max-w-lg`}>
                Los tacos que te hacen volver. Receta de la abuela, tortilla hecha a mano, salsa que pica de verdad. Sin pretensiones, puro sabor.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#E63B2E] text-white font-bold px-10 py-4 text-sm uppercase tracking-widest hover:bg-[#F5C518] hover:text-[#1A1108] transition-all inline-flex items-center gap-2"
                >
                  <Flame className="w-4 h-4" /> ¡Pedir ahora!
                </a>
                <a
                  href="#menu"
                  className="border-2 border-[#FAF5EC]/20 text-[#FAF5EC]/60 font-bold px-10 py-4 text-sm uppercase tracking-widest hover:border-[#F5C518] hover:text-[#F5C518] transition-all inline-flex items-center gap-2"
                >
                  Ver menú <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-6 text-xs text-[#FAF5EC]/40">
                <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {CONFIG.hours.weekday}</span>
                <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> {CONFIG.address}</span>
              </div>
            </div>
            {/* Food image grid */}
            <div className="flex-1 grid grid-cols-2 gap-3 max-w-sm w-full">
              {[
                { src: "/images/restaurante2/food-1.jpg", alt: "Tacos al pastor" },
                { src: "/images/restaurante2/food-2.jpg", alt: "Quesadillas" },
                { src: "/images/restaurante2/food-3.jpg", alt: "Burrito de birria" },
                { src: "/images/restaurante2/gallery-1.jpg", alt: "El taquero" },
              ].map((img, i) => (
                <div key={i} className={`relative overflow-hidden ${i === 0 ? "col-span-2 h-48" : "h-36"}`}>
                  <Image src={img.src} alt={img.alt} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MENU SECTION */}
      <section id="menu" className="py-24 bg-[#FAF5EC] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#E63B2E] text-[10px] font-bold uppercase tracking-[0.5em] mb-4">Lo que preparamos</p>
            <h2 className={`${archivoBlack.className} text-5xl md:text-7xl text-[#1A1108]`}>
              NUESTRO<br /><span className="text-[#E63B2E]">MENÚ</span>
            </h2>
          </div>
          {/* Menu cards with yellow accents */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MENU.map((item) => (
              <div
                key={item.name}
                className="bg-white border-2 border-[#1A1108]/8 hover:border-[#E63B2E] transition-colors group overflow-hidden"
              >
                <div className="bg-[#F5C518] px-4 py-2">
                  <span className="text-[#1A1108] text-[10px] font-bold uppercase tracking-widest">{item.tag}</span>
                </div>
                <div className="p-6">
                  <h3 className={`${archivoBlack.className} text-xl text-[#1A1108] mb-3 group-hover:text-[#E63B2E] transition-colors`}>
                    {item.name}
                  </h3>
                  <p className="text-[#1A1108]/50 text-sm leading-relaxed mb-5">{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className={`${archivoBlack.className} text-2xl text-[#E63B2E]`}>{item.price}</span>
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold uppercase tracking-widest text-[#1A1108]/40 hover:text-[#E63B2E] transition-colors"
                    >
                      Pedir →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY / ABOUT split */}
      <section id="galeria" className="py-24 bg-[#1A1108] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="relative h-64 overflow-hidden">
                <Image src="/images/restaurante2/chef.jpg" alt="Nuestro cocinero" fill className="object-cover" />
                <div className="absolute bottom-4 left-4 bg-[#E63B2E] px-3 py-1">
                  <span className="text-white text-[10px] font-bold uppercase tracking-widest">El maestro taquero</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-40 overflow-hidden">
                  <Image src="/images/restaurante2/food-2.jpg" alt="Quesadillas" fill className="object-cover" />
                </div>
                <div className="relative h-40 overflow-hidden">
                  <Image src="/images/restaurante2/food-3.jpg" alt="Birria" fill className="object-cover" />
                </div>
              </div>
            </div>
            <div id="nosotros">
              <p className="text-[#F5C518] text-[10px] font-bold uppercase tracking-[0.5em] mb-6">Nuestra historia</p>
              <h2 className={`${archivoBlack.className} text-4xl md:text-5xl text-[#FAF5EC] mb-8 leading-tight`}>
                25 AÑOS<br />
                <span className="text-[#E63B2E]">COCINANDO</span><br />
                CON AMOR.
              </h2>
              <p className="text-[#FAF5EC]/50 leading-relaxed mb-5 text-sm">
                Don Beto empezó con un puesto en la calle y una receta heredada de su madre. Hoy, tres generaciones después, seguimos usando la misma sazón que enamoró a Tijuana.
              </p>
              <p className="text-[#FAF5EC]/50 leading-relaxed mb-10 text-sm">
                Nuestras tortillas se hacen a mano desde las 6am. Las salsas se tateatan en comal de barro. El pastor gira en el mismo trompo desde 1998.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#FAF5EC]/10">
                {[
                  { value: "25+", label: "Años" },
                  { value: "500+", label: "Tacos/día" },
                  { value: "4.8★", label: "Google" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className={`${archivoBlack.className} text-3xl text-[#F5C518] mb-1`}>{s.value}</p>
                    <p className="text-[#FAF5EC]/30 text-[9px] font-bold uppercase tracking-widest">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-[#FAF5EC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#E63B2E] text-[10px] font-bold uppercase tracking-[0.5em] mb-4">Opiniones</p>
            <h2 className={`${archivoBlack.className} text-5xl text-[#1A1108]`}>
              LO DICEN<br /><span className="text-[#E63B2E]">NUESTROS CLIENTES</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white p-8 border-l-4 border-[#F5C518]">
                <div className="flex mb-4">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#F5C518] fill-[#F5C518]" />
                  ))}
                </div>
                <p className="text-[#1A1108]/60 leading-relaxed mb-6 text-sm italic">"{t.text}"</p>
                <p className={`${archivoBlack.className} text-[#E63B2E] text-sm`}>{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Red bg with yellow text */}
      <section className="py-32 bg-[#E63B2E] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 30px, #1A1108 30px, #1A1108 31px)" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#FAF5EC]/60 text-[10px] font-bold uppercase tracking-[0.5em] mb-6">¿Tienes hambre?</p>
          <h2 className={`${archivoBlack.className} text-6xl md:text-9xl text-[#F5C518] leading-none mb-8`}>
            ¡PIDE<br />YA!
          </h2>
          <p className="text-[#FAF5EC]/70 text-lg mb-12 max-w-md mx-auto">
            Mándanos un WhatsApp y te decimos los tacos del día. También hacemos pedidos para grupos y empresas.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#1A1108] text-[#F5C518] font-bold text-lg px-14 py-5 tracking-widest uppercase hover:bg-[#F5C518] hover:text-[#1A1108] transition-all"
          >
            <Flame className="w-5 h-5" /> Pedir por WhatsApp
          </a>
          <div className="mt-10 flex flex-wrap justify-center gap-8 text-[#FAF5EC]/50 text-xs">
            <span className="flex items-center gap-2"><Phone className="w-3 h-3" /> {CONFIG.phone}</span>
            <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {CONFIG.hours.weekday}</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0E0A05] text-[#FAF5EC]/30 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
            <div>
              <span className={`${archivoBlack.className} text-2xl text-[#F5C518] block mb-2`}>{CONFIG.name}</span>
              <p className="text-xs uppercase tracking-widest text-[#FAF5EC]/20">{CONFIG.tagline}</p>
            </div>
            <div className="grid grid-cols-2 gap-x-16 gap-y-3 text-xs">
              <div>
                <p className="text-[#FAF5EC]/15 uppercase tracking-widest text-[9px] mb-2">Horario</p>
                <p>{CONFIG.hours.weekday}</p>
                <p className="text-[#F5C518]/60 text-[10px] mt-1">{CONFIG.hours.note}</p>
              </div>
              <div>
                <p className="text-[#FAF5EC]/15 uppercase tracking-widest text-[9px] mb-2">Contacto</p>
                <p>{CONFIG.phone}</p>
                <a
                  href={`https://instagram.com/${CONFIG.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 mt-1 hover:text-[#F5C518] transition-colors"
                >
                  <Instagram className="w-3 h-3" /> @{CONFIG.instagram}
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-[#FAF5EC]/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px]">
            <p>© {new Date().getFullYear()} {CONFIG.name}. Todos los derechos reservados.</p>
            <div className="flex items-center gap-6">
              <Link href="/demos/privacidad" className="hover:text-[#FAF5EC]/60 transition-colors">Política de Privacidad</Link>
              <Link href="/demos/terminos" className="hover:text-[#FAF5EC]/60 transition-colors">Términos y Condiciones</Link>
              <Link href="/webs" className="hover:text-[#F5C518] transition-colors">Webs</Link>
            </div>
          </div>
        </div>
      </footer>

      <FloatingWidget
        phone={CONFIG.phone}
        whatsapp={CONFIG.whatsapp}
        googleMapsUrl={CONFIG.mapsUrl}
        businessName={CONFIG.name}
        businessType="restaurant"
      />
      <WantThisWebCTA />
    </div>
  );
}
