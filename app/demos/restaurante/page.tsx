"use client";

import { useEffect, useState } from "react";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin, Clock, Phone, Instagram, ArrowRight,
  Flame, Wine, UtensilsCrossed, Star,
} from "lucide-react";
import FloatingWidget from "../../components/FloatingWidget";
import WantThisWebCTA from "../../components/WantThisWebCTA";
import { trackEvent } from "../../components/MetaPixel";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});
const outfit = Outfit({ subsets: ["latin"], display: "swap" });

// ─── CONFIG DEL RESTAURANTE DEMO ──────────────────────────────────────────────
const RESTAURANTE = {
  name: "Casa Fuego",
  tagline: "Cocina mexicana contemporánea",
  phone: "+52 664 987 6543",
  whatsapp: "5216649876543", // TODO: reemplazar con número real del cliente
  address: "Av. Sánchez Taboada 9999, Zona Río, Tijuana, B.C.",
  hours: {
    weekday: "Mar–Vie: 1:00pm – 11:00pm",
    weekend: "Sáb–Dom: 12:00pm – 12:00am",
  },
  instagram: "casafuego_tij",
  mapsUrl: "https://maps.google.com", // TODO: reemplazar con Maps link real
};

const MENU = [
  {
    name: "Taco al Pastor de Autor",
    desc: "Cerdo en trompo con marinada de achiote y jitomate asado, piña flambeada, cebolla morada encurtida y salsa verde tatemada.",
    price: "$185",
    tag: "Chef's Pick",
    img: "/images/restaurante/food-1.jpg",
  },
  {
    name: "Mole Negro al Pato",
    desc: "Pato confitado sobre mole negro de 32 ingredientes, semillas de calabaza tostadas, aceite de epazote y tortilla de maíz azul.",
    price: "$420",
    tag: "Signature",
    img: "/images/restaurante/food-2.jpg",
  },
  {
    name: "Ceviche de Mar",
    desc: "Camarón y pescado del Pacífico, leche de tigre con habanero, aguacate crema, crocante de maíz y hierbas del jardín.",
    price: "$265",
    tag: "Fresco",
    img: "/images/restaurante/food-3.jpg",
  },
  {
    name: "Cocktail de Mezcal Artesanal",
    desc: "Mezcal espadín ahumado, tepache de piña, jarabe de tamarindo, sal de gusano y chip de beet deshidratado.",
    price: "$195",
    tag: "Bar",
    img: "/images/restaurante/food-4.jpg",
  },
];

const TESTIMONIALS = [
  {
    name: "Ricardo V.",
    stars: 5,
    text: "La mejor experiencia gastronómica en Tijuana. El mole negro es simplemente extraordinario. Un restaurante que pone en alto la cocina mexicana.",
  },
  {
    name: "Daniela P.",
    stars: 5,
    text: "Fuimos a celebrar nuestro aniversario y fue perfecto. La atención, el ambiente y la comida son de primer nivel. Ya reservamos para la próxima ocasión.",
  },
  {
    name: "Tomás E.",
    stars: 5,
    text: "Los cocteles de mezcal son únicos. El bartender explica cada ingrediente con pasión. La carta de mezcales es impresionante. 100% recomendado.",
  },
];

export default function RestauranteDemo() {
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    trackEvent("ViewContent", { content_name: "demo_restaurante", content_category: "web_demo" });
    // Staggered menu reveal
    const t = setTimeout(() => setMenuVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  const waReserva = `https://wa.me/${RESTAURANTE.whatsapp}?text=${encodeURIComponent(
    `Hola ${RESTAURANTE.name}, quiero hacer una reservación.`
  )}`;

  return (
    <div className={`${outfit.className} bg-[#0C0A06] text-[#F5EDD8] min-h-screen`}>

      {/* ── DEMO BANNER ───────────────────────────────────── */}
      <div className="bg-[#B84C2A] text-white text-center py-2 px-4 text-xs font-medium tracking-widest z-50 relative uppercase">
        <span className="opacity-80">⚡ Demo</span> — Este diseño está disponible.{" "}
        <Link href="/webs" className="underline font-bold hover:opacity-80 transition-opacity">
          Solo se vende 1 vez →
        </Link>
      </div>

      {/* ── NAVBAR DEL RESTAURANTE ─────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#0C0A06]/95 backdrop-blur-sm border-b border-[#F5EDD8]/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className={`${cormorant.className} text-2xl font-semibold tracking-wider text-[#F5EDD8]`}>
            {RESTAURANTE.name}
          </span>
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-[#F5EDD8]/50 tracking-widest uppercase">
            <a href="#menu" className="hover:text-[#D4940A] transition-colors">Menú</a>
            <a href="#galeria" className="hover:text-[#D4940A] transition-colors">Galería</a>
            <a href="#nosotros" className="hover:text-[#D4940A] transition-colors">Nosotros</a>
            <a href="#reserva" className="hover:text-[#D4940A] transition-colors">Reservar</a>
          </nav>
          <a
            href={waReserva}
            target="_blank" rel="noopener noreferrer"
            className="border border-[#B84C2A] text-[#B84C2A] text-xs font-bold px-5 py-2.5 tracking-widest uppercase hover:bg-[#B84C2A] hover:text-white transition-all"
          >
            Reservar mesa
          </a>
        </div>
      </header>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-screen flex items-end">
        {/* Background image */}
        <Image
          src="/images/restaurante/hero.jpg"
          alt="Casa Fuego — Restaurante"
          fill
          className="object-cover"
          priority
        />
        {/* Multi-layer dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A06] via-[#0C0A06]/50 to-[#0C0A06]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0A06]/60 via-transparent to-transparent" />

        {/* Decorative diagonal accent */}
        <div className="absolute top-1/3 right-0 w-px h-48 bg-[#D4940A]/40" />
        <div className="absolute top-1/3 right-8 w-px h-32 bg-[#B84C2A]/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 w-full">
          <div className="max-w-3xl">
            <p className="text-[#D4940A] text-[10px] font-bold uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-[#D4940A]" />
              Tijuana, B.C. · Cocina de Autor
            </p>
            <h1 className={`${cormorant.className} text-7xl md:text-[120px] font-light leading-[0.9] mb-6`}>
              Donde el<br />
              <em className="text-[#B84C2A] italic font-semibold">fuego</em><br />
              da vida<br />al sabor.
            </h1>
            <p className={`${outfit.className} text-[#F5EDD8]/50 text-base md:text-lg leading-relaxed mb-12 max-w-lg`}>
              Cocina mexicana contemporánea con técnica de autor. Ingredientes locales, fuego real, alma auténtica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={waReserva}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#B84C2A] text-white font-bold text-sm px-8 py-4 tracking-widest uppercase hover:bg-[#D4940A] transition-all"
              >
                <Flame className="w-4 h-4" /> Reservar mesa
              </a>
              <a href="#menu"
                className="inline-flex items-center justify-center gap-3 border border-[#F5EDD8]/20 text-[#F5EDD8]/70 text-sm font-medium px-8 py-4 tracking-wide hover:border-[#F5EDD8]/50 transition-all"
              >
                Ver menú <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Bottom info strip */}
          <div className="mt-16 pt-8 border-t border-[#F5EDD8]/10 flex flex-wrap gap-8 text-xs text-[#F5EDD8]/40 tracking-wide">
            <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {RESTAURANTE.hours.weekday}</span>
            <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {RESTAURANTE.hours.weekend}</span>
            <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> {RESTAURANTE.address}</span>
          </div>
        </div>
      </section>

      {/* ── MENÚ ──────────────────────────────────────────── */}
      <section id="menu" className="py-32 bg-[#0C0A06] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-[#D4940A] text-[10px] font-bold uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-[#D4940A]" /> Nuestra carta
              </p>
              <h2 className={`${cormorant.className} text-5xl md:text-7xl font-light text-[#F5EDD8]`}>
                Menú de<br /><em className="italic text-[#B84C2A]">temporada</em>
              </h2>
            </div>
            <a href={waReserva} target="_blank" rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-[#F5EDD8]/40 text-xs tracking-widest uppercase hover:text-[#D4940A] transition-colors">
              Ver menú completo <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* Menu grid — editorial asymmetric */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-px bg-[#F5EDD8]/10 transition-opacity duration-700 ${menuVisible ? "opacity-100" : "opacity-0"}`}>
            {MENU.map((item, i) => (
              <div key={item.name}
                className={`relative bg-[#0C0A06] overflow-hidden group ${i === 0 ? "md:row-span-1" : ""}`}
              >
                <div className="flex h-full">
                  {/* Image */}
                  <div className="relative w-40 h-48 md:w-48 md:h-56 flex-shrink-0 overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0C0A06]/40" />
                  </div>
                  {/* Content */}
                  <div className="flex-1 p-8 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#B84C2A] mb-3 block">
                        {item.tag}
                      </span>
                      <h3 className={`${cormorant.className} text-2xl md:text-3xl font-medium text-[#F5EDD8] mb-3 leading-tight`}>
                        {item.name}
                      </h3>
                      <p className="text-[#F5EDD8]/40 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                    <p className={`${cormorant.className} text-2xl font-semibold text-[#D4940A] mt-4`}>
                      {item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a href={waReserva} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-[#F5EDD8]/20 text-[#F5EDD8]/60 text-xs font-bold px-10 py-4 tracking-widest uppercase hover:border-[#D4940A] hover:text-[#D4940A] transition-all"
            >
              <UtensilsCrossed className="w-4 h-4" /> Consultar menú completo por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── GALERÍA ───────────────────────────────────────── */}
      <section id="galeria" className="py-32 bg-[#0E0C08] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-[#D4940A] text-[10px] font-bold uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-[#D4940A]" /> El ambiente
            </p>
            <h2 className={`${cormorant.className} text-5xl md:text-7xl font-light text-[#F5EDD8]`}>
              Una experiencia<br />
              <em className="italic text-[#B84C2A]">más allá del plato.</em>
            </h2>
          </div>

          {/* Magazine-style gallery */}
          <div className="grid grid-cols-12 grid-rows-2 gap-3 h-[600px]">
            <div className="col-span-12 md:col-span-7 row-span-2 relative overflow-hidden">
              <Image src="/images/restaurante/gallery-1.jpg" alt="Ambiente del restaurante" fill className="object-cover hover:scale-103 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A06]/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className={`${cormorant.className} text-white/60 text-sm italic`}>Mesa para dos</span>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 relative overflow-hidden">
              <Image src="/images/restaurante/gallery-2.jpg" alt="Bar" fill className="object-cover hover:scale-103 transition-transform duration-700" />
            </div>
            <div className="col-span-12 md:col-span-5 relative overflow-hidden">
              <Image src="/images/restaurante/food-1.jpg" alt="Platillo estrella" fill className="object-cover hover:scale-103 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* ── NOSOTROS ──────────────────────────────────────── */}
      <section id="nosotros" className="py-32 bg-[#0C0A06] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Restaurant image */}
            <div className="relative">
              <div className="relative aspect-[3/4] max-w-md overflow-hidden">
                <Image src="/images/restaurante/gallery-1.jpg" alt="Casa Fuego — Ambiente" fill className="object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A06]/80 via-transparent to-transparent" />
              </div>
              {/* Decorative frame */}
              <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 border border-[#B84C2A]/30 -z-0" />
              {/* Stat badge */}
              <div className="absolute top-8 -right-6 bg-[#B84C2A] p-6 text-center">
                <p className={`${cormorant.className} text-4xl font-bold text-white`}>12</p>
                <p className="text-white/70 text-[10px] uppercase tracking-widest">Años de pasión</p>
              </div>
            </div>

            <div>
              <p className="text-[#D4940A] text-[10px] font-bold uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-[#D4940A]" /> Nuestra filosofía
              </p>
              <h2 className={`${cormorant.className} text-4xl md:text-6xl font-light text-[#F5EDD8] mb-8 leading-tight`}>
                La cocina<br />mexicana<br />
                <em className="italic text-[#B84C2A]">reinventada.</em>
              </h2>
              <p className="text-[#F5EDD8]/50 leading-relaxed mb-6 text-sm">
                Nuestro chef ejecutivo combina 12 años de técnica europea con el alma de la cocina de su abuela en Oaxaca. Cada platillo es un diálogo entre tradición y vanguardia.
              </p>
              <p className="text-[#F5EDD8]/50 leading-relaxed mb-10 text-sm">
                Trabajamos con productores locales de Baja California y Sonora. Ingredientes de temporada, cocinados al momento, nunca en batch. El fuego es el ingrediente principal de cada creación.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#F5EDD8]/10">
                {[
                  { value: "4.9★", label: "Google" },
                  { value: "Top 10", label: "Baja California" },
                  { value: "1,200+", label: "Comensales al mes" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className={`${cormorant.className} text-3xl font-semibold text-[#D4940A] mb-1`}>{s.value}</p>
                    <p className="text-[#F5EDD8]/30 text-[10px] uppercase tracking-widest">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ───────────────────────────────────── */}
      <section className="py-24 bg-[#0E0C08]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#D4940A] text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Lo que dicen nuestros comensales</p>
            <h2 className={`${cormorant.className} text-5xl font-light text-[#F5EDD8]`}>Reseñas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#F5EDD8]/10">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-[#0E0C08] p-10">
                <div className="flex mb-6">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-[#D4940A] fill-[#D4940A]" />
                  ))}
                </div>
                <p className={`${cormorant.className} text-xl text-[#F5EDD8]/70 leading-relaxed mb-8 italic`}>
                  "{t.text}"
                </p>
                <p className="text-[#B84C2A] text-xs font-bold uppercase tracking-widest">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESERVA CTA ───────────────────────────────────── */}
      <section id="reserva" className="py-32 relative overflow-hidden scroll-mt-20">
        {/* Background */}
        <div className="absolute inset-0 bg-[#B84C2A]" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(0,0,0,0.3) 40px, rgba(0,0,0,0.3) 41px)" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.4em] mb-6">¿Listo para vivir la experiencia?</p>
          <h2 className={`${cormorant.className} text-5xl md:text-8xl font-light text-white leading-none mb-8`}>
            Tu mesa<br />te espera.
          </h2>
          <p className="text-white/60 text-lg mb-12 max-w-md mx-auto">
            Escríbenos y confirmamos disponibilidad en minutos. Grupos de más de 8 personas, consultar salón privado.
          </p>
          <a
            href={waReserva}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#0C0A06] text-[#F5EDD8] font-bold text-sm px-12 py-5 tracking-widest uppercase hover:bg-[#1C1612] transition-all"
          >
            <Flame className="w-4 h-4 text-[#D4940A]" /> Reservar ahora por WhatsApp
          </a>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/50 text-xs tracking-wide">
            <span className="flex items-center gap-2"><Phone className="w-3 h-3" /> {RESTAURANTE.phone}</span>
            <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {RESTAURANTE.hours.weekday}</span>
            <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {RESTAURANTE.hours.weekend}</span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="bg-[#060503] text-[#F5EDD8]/30 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
            <div>
              <span className={`${cormorant.className} text-3xl font-semibold text-[#F5EDD8]/70 block mb-2`}>
                {RESTAURANTE.name}
              </span>
              <p className="text-xs tracking-widest uppercase text-[#F5EDD8]/20">{RESTAURANTE.tagline}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-3 text-xs">
              <div>
                <p className="text-[#F5EDD8]/15 uppercase tracking-widest text-[10px] mb-2">Horarios</p>
                <p>{RESTAURANTE.hours.weekday}</p>
                <p>{RESTAURANTE.hours.weekend}</p>
              </div>
              <div>
                <p className="text-[#F5EDD8]/15 uppercase tracking-widest text-[10px] mb-2">Ubicación</p>
                <p className="leading-relaxed max-w-[200px]">{RESTAURANTE.address}</p>
              </div>
              <div>
                <p className="text-[#F5EDD8]/15 uppercase tracking-widest text-[10px] mb-2">Contacto</p>
                <p>{RESTAURANTE.phone}</p>
                <a href={`https://instagram.com/${RESTAURANTE.instagram}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1 mt-1 hover:text-[#D4940A] transition-colors">
                  <Instagram className="w-3 h-3" /> @{RESTAURANTE.instagram}
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-[#F5EDD8]/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px]">
            <p>© {new Date().getFullYear()} {RESTAURANTE.name}. Todos los derechos reservados.</p>
            <div className="flex items-center gap-6">
              <Link href="/demos/privacidad" className="hover:text-[#F5EDD8]/60 transition-colors">Política de Privacidad</Link>
              <Link href="/demos/terminos" className="hover:text-[#F5EDD8]/60 transition-colors">Términos y Condiciones</Link>
            </div>
          </div>
          <p className="text-center text-[#F5EDD8]/10 text-[10px] mt-6">
            Sitio web diseñado por{" "}
            <Link href="/webs" className="hover:text-[#D4940A] transition-colors underline">Luis Gaxiola</Link>
          </p>
        </div>
      </footer>

      {/* ── WIDGETS FLOTANTES ─────────────────────────────── */}
      <FloatingWidget
        phone={RESTAURANTE.phone}
        whatsapp={RESTAURANTE.whatsapp}
        googleMapsUrl={RESTAURANTE.mapsUrl}
        businessName={RESTAURANTE.name}
        businessType="restaurant"
      />
      <WantThisWebCTA />
    </div>
  );
}
