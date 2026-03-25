"use client";

import { useEffect } from "react";
import { Playfair_Display, Lato } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, Clock, Phone, Instagram, ArrowRight, Wine } from "lucide-react";
import FloatingWidget from "../../components/FloatingWidget";
import WantThisWebCTA from "../../components/WantThisWebCTA";
import { trackEvent } from "../../components/MetaPixel";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});
const lato = Lato({ subsets: ["latin"], weight: ["300", "400", "700"], display: "swap" });

const CONFIG = {
  name: "Trattoria Rossi",
  tagline: "Cucina Italiana · Dal 2008",
  phone: "+52 664 888 5566",
  whatsapp: "5216648885566",
  mapsUrl: "https://maps.google.com",
  address: "Calle Sexta 2340, Zona Centro, Tijuana, B.C.",
  hours: { weekday: "Mar–Jue: 1:00pm – 10:00pm", weekend: "Vie–Dom: 1:00pm – 11:30pm" },
  instagram: "trattoriarossi_tij",
};

const MENU = [
  {
    name: "Pasta Carbonara",
    desc: "Pasta artesanal al huevo, guanciale crujiente, pecorino romano DOP, pimienta negra recién molida. La receta auténtica de Roma.",
    price: "$285",
    category: "Pasta",
  },
  {
    name: "Pizza Margherita",
    desc: "Masa fermentada 48 horas, salsa de tomate San Marzano, mozzarella di bufala, albahaca fresca y aceite de oliva extra virgen.",
    price: "$245",
    category: "Pizza",
  },
  {
    name: "Tiramisú",
    desc: "Receta del nonno Rossi. Mascarpone artesanal, bizcochos savoiardi, espresso napolitano y cacao amargo importado.",
    price: "$155",
    category: "Dolci",
  },
  {
    name: "Bruschetta al Pomodoro",
    desc: "Pan ciabatta tostado en leña, tomate cherry asado, albahaca, ajo confitado y flor de sal del Mediterráneo.",
    price: "$125",
    category: "Antipasti",
  },
  {
    name: "Risotto ai Funghi",
    desc: "Arroz carnaroli, porcini secos rehidratados en vino blanco, mantequilla italiana y parmigiano reggiano 24 meses.",
    price: "$320",
    category: "Risotto",
  },
  {
    name: "Copa de Vino",
    desc: "Selección de la casa: Chianti Classico, Pinot Grigio o Barolo. Cosechas seleccionadas por nuestra sommelier.",
    price: "$120",
    category: "Vinos",
  },
];

const TESTIMONIALS = [
  {
    name: "Patricia M.",
    text: "La carbonara más auténtica que he probado fuera de Italia. Se nota que usan ingredientes de calidad. Ya hemos venido cuatro veces este mes.",
    stars: 5,
  },
  {
    name: "Eduardo B.",
    text: "El tiramisú del nonno Rossi es simplemente extraordinario. El ambiente es muy acogedor y el servicio es de primer nivel. Perfecto para una cena romántica.",
    stars: 5,
  },
  {
    name: "Gabriela S.",
    text: "Pedimos el risotto y quedamos completamente enamorados. Los ingredientes importados hacen toda la diferencia. Ya es nuestra trattoria favorita.",
    stars: 5,
  },
];

export default function Restaurante3Page() {
  useEffect(() => {
    trackEvent("ViewContent", { content_name: "demo_restaurante3", content_category: "web_demo" });
  }, []);

  const waLink = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(
    `Ciao! Quisiera hacer una reserva en ${CONFIG.name}.`
  )}`;

  return (
    <div className={`${lato.className} bg-[#F8F3EB] text-[#2D5A27] min-h-screen`}>

      {/* DEMO BANNER */}
      <div className="bg-[#2D5A27] text-white text-center py-2.5 px-4 text-xs font-bold tracking-widest z-50 relative">
        ⚡ DEMO — Este diseño está disponible.{" "}
        <Link href="/webs" className="text-[#D4A96A] underline hover:opacity-80 transition-opacity">
          Solo se vende 1 vez →
        </Link>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#F8F3EB]/95 backdrop-blur-sm border-b border-[#2D5A27]/12">
        <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="text-center">
            <span className={`${playfair.className} text-xl font-semibold text-[#2D5A27] tracking-wider block`}>
              {CONFIG.name}
            </span>
            <p className="text-[8px] font-light tracking-[0.3em] uppercase text-[#2D5A27]/40">{CONFIG.tagline}</p>
          </div>
          <nav className="hidden md:flex items-center gap-10 text-[10px] font-bold text-[#2D5A27]/50 tracking-[0.2em] uppercase">
            <a href="#menu" className="hover:text-[#8B1A1A] transition-colors">Menú</a>
            <a href="#galeria" className="hover:text-[#8B1A1A] transition-colors">Galería</a>
            <a href="#nosotros" className="hover:text-[#8B1A1A] transition-colors">Nosotros</a>
          </nav>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-[#2D5A27] text-[#2D5A27] text-[10px] font-bold px-5 py-2.5 tracking-[0.2em] uppercase hover:bg-[#2D5A27] hover:text-[#F8F3EB] transition-all"
          >
            Reservar mesa
          </a>
        </div>
      </header>

      {/* HERO — Cream background, Playfair, decorative borders */}
      <section className="py-24 md:py-36 relative">
        {/* Decorative top border */}
        <div className="max-w-6xl mx-auto px-8">
          <div className="border-2 border-[#2D5A27]/15 p-12 md:p-20 relative">
            {/* Corner ornaments */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#D4A96A]" />
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#D4A96A]" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#D4A96A]" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#D4A96A]" />

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#D4A96A] mb-8">
                  ✦ Cucina Italiana Auténtica ✦
                </p>
                <h1 className={`${playfair.className} text-5xl md:text-7xl font-light leading-tight text-[#2D5A27] mb-6`}>
                  Dove ogni<br />
                  <em className="italic font-semibold text-[#8B1A1A]">sapore</em><br />
                  racconta<br />una storia.
                </h1>
                <p className={`${lato.className} font-light text-[#2D5A27]/50 leading-relaxed mb-10 max-w-md`}>
                  Recetas familiares de tres generaciones de la familia Rossi, cocinadas con ingredientes importados de Italia. Una experiencia auténtica en el corazón de Tijuana.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#2D5A27] text-[#F8F3EB] text-[10px] font-bold px-8 py-4 tracking-[0.25em] uppercase hover:bg-[#8B1A1A] transition-colors inline-flex items-center gap-2 justify-center"
                  >
                    <Wine className="w-3.5 h-3.5" /> Reservar mesa
                  </a>
                  <a
                    href="#menu"
                    className="border border-[#2D5A27]/30 text-[#2D5A27]/60 text-[10px] font-bold px-8 py-4 tracking-[0.25em] uppercase hover:border-[#2D5A27] hover:text-[#2D5A27] transition-all inline-flex items-center gap-2 justify-center"
                  >
                    Ver carta <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="/images/restaurante3/hero.jpg"
                    alt="Trattoria Rossi"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-6 -left-6 bg-[#8B1A1A] p-6 text-center shadow-xl">
                  <p className={`${playfair.className} text-3xl font-bold text-[#D4A96A]`}>15+</p>
                  <p className="text-[#F8F3EB]/70 text-[9px] uppercase tracking-widest font-bold mt-1">Anni di<br />passione</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENU — Italian menu-card style */}
      <section id="menu" className="py-24 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-px bg-[#D4A96A]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#D4A96A]">La Carta</p>
              <div className="w-16 h-px bg-[#D4A96A]" />
            </div>
            <h2 className={`${playfair.className} text-5xl md:text-6xl font-light text-[#2D5A27]`}>
              Menú de<br /><em className="italic text-[#8B1A1A]">Temporada</em>
            </h2>
          </div>

          {/* Menu cards with green borders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MENU.map((item) => (
              <div
                key={item.name}
                className="border border-[#2D5A27]/20 p-8 hover:border-[#2D5A27] transition-colors group bg-white/50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#D4A96A] block mb-2">
                      {item.category}
                    </span>
                    <h3 className={`${playfair.className} text-xl font-semibold text-[#2D5A27] group-hover:text-[#8B1A1A] transition-colors`}>
                      {item.name}
                    </h3>
                  </div>
                  <span className={`${playfair.className} text-xl font-semibold text-[#8B1A1A] ml-4 flex-shrink-0`}>
                    {item.price}
                  </span>
                </div>
                <p className="text-[#2D5A27]/50 text-sm font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#2D5A27] border-b-2 border-[#D4A96A] pb-1 hover:text-[#8B1A1A] transition-colors"
            >
              Ver carta completa por WhatsApp <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="galeria" className="py-24 bg-[#2D5A27] scroll-mt-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-px bg-[#D4A96A]/50" />
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#D4A96A]">Il Ristorante</p>
              <div className="w-16 h-px bg-[#D4A96A]/50" />
            </div>
            <h2 className={`${playfair.className} text-5xl font-light text-[#F8F3EB]`}>
              <em className="italic">L'Atmosfera</em>
            </h2>
          </div>
          <div className="grid grid-cols-12 gap-4 h-[500px]">
            <div className="col-span-12 md:col-span-8 relative overflow-hidden">
              <Image
                src="/images/restaurante3/gallery-1.jpg"
                alt="Ambiente de Trattoria Rossi"
                fill
                className="object-cover hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D5A27]/50 to-transparent" />
              <p className={`${playfair.className} absolute bottom-6 left-6 text-[#F8F3EB]/80 text-sm italic`}>
                "Un rincón de Italia en Tijuana"
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
              <div className="flex-1 relative overflow-hidden">
                <Image
                  src="/images/restaurante3/food-1.jpg"
                  alt="Pasta artesanal"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex-1 relative overflow-hidden">
                <Image
                  src="/images/restaurante3/food-2.jpg"
                  alt="Pizza napolitana"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="nosotros" className="py-24 bg-[#F8F3EB]">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] relative overflow-hidden max-w-md mx-auto md:mx-0">
                <Image
                  src="/images/restaurante3/chef.jpg"
                  alt="Chef de Trattoria Rossi"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute top-8 -right-4 border-2 border-[#2D5A27]/20 w-3/4 h-full -z-10" />
            </div>
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-px bg-[#D4A96A]" />
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#D4A96A]">La Nostra Storia</p>
              </div>
              <h2 className={`${playfair.className} text-4xl md:text-5xl font-light text-[#2D5A27] mb-8 leading-tight`}>
                Tres generaciones,<br />
                <em className="italic text-[#8B1A1A]">una sola pasión.</em>
              </h2>
              <p className="font-light text-[#2D5A27]/50 leading-relaxed mb-5 text-sm">
                El nonno Rossi llegó a México en 1960 con su familia y una caja de recetas manuscritas. Su hijo continuó la tradición, y hoy somos nosotros quienes honramos ese legado con cada platillo que servimos.
              </p>
              <p className="font-light text-[#2D5A27]/50 leading-relaxed mb-10 text-sm">
                Importamos harina tipo "00" de Nápoles, quesos DOP, aceite de oliva extra virgen de Toscana y vinos de viñedos seleccionados. Lo auténtico no tiene atajos.
              </p>
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[#2D5A27]/10">
                {[
                  { value: "4.9★", label: "Google Reviews" },
                  { value: "Top 5", label: "Italiana en BC" },
                  { value: "15+", label: "Años de tradición" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className={`${playfair.className} text-2xl font-semibold text-[#8B1A1A] mb-1`}>{s.value}</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#2D5A27]/30">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-[#2D5A27]">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-px bg-[#D4A96A]/50" />
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#D4A96A]">Recensioni</p>
              <div className="w-16 h-px bg-[#D4A96A]/50" />
            </div>
            <h2 className={`${playfair.className} text-5xl font-light text-[#F8F3EB]`}>
              Lo que dicen<br /><em className="italic text-[#D4A96A]">nuestros comensales</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-[#F8F3EB]/5 border border-[#F8F3EB]/10 p-8 hover:border-[#D4A96A]/40 transition-colors">
                <div className="flex mb-6">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-[#D4A96A] fill-[#D4A96A]" />
                  ))}
                </div>
                <p className={`${playfair.className} text-base text-[#F8F3EB]/70 leading-relaxed mb-6 italic`}>
                  "{t.text}"
                </p>
                <div className="w-8 h-px bg-[#D4A96A]/40 mb-4" />
                <p className="text-[#D4A96A] text-[10px] font-bold uppercase tracking-widest">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Forest green bg with cream text */}
      <section className="py-32 bg-[#2D5A27] relative overflow-hidden border-t border-[#F8F3EB]/10">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <div className="border border-[#D4A96A]/20 p-16 md:p-24 relative">
            <div className="absolute top-2 left-2 w-6 h-6 border-t border-l border-[#D4A96A]/50" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t border-r border-[#D4A96A]/50" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b border-l border-[#D4A96A]/50" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b border-r border-[#D4A96A]/50" />

            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-px bg-[#D4A96A]/50" />
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#D4A96A]">Prenota un tavolo</p>
              <div className="w-12 h-px bg-[#D4A96A]/50" />
            </div>
            <h2 className={`${playfair.className} text-5xl md:text-7xl font-light text-[#F8F3EB] leading-tight mb-8`}>
              Reserve su<br />
              <em className="italic text-[#D4A96A]">mesa esta</em><br />
              noche.
            </h2>
            <p className="font-light text-[#F8F3EB]/50 leading-relaxed mb-12 max-w-md mx-auto">
              Escríbenos para confirmar disponibilidad. Aceptamos grupos y celebraciones especiales.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#F8F3EB] text-[#2D5A27] font-bold text-sm px-12 py-4 tracking-[0.25em] uppercase hover:bg-[#D4A96A] transition-colors"
            >
              <Wine className="w-4 h-4" /> Reservar por WhatsApp
            </a>
            <div className="mt-10 flex flex-wrap justify-center gap-8 text-[#F8F3EB]/30 text-xs font-light">
              <span className="flex items-center gap-2"><Phone className="w-3 h-3" /> {CONFIG.phone}</span>
              <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {CONFIG.hours.weekday}</span>
              <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {CONFIG.hours.weekend}</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1C3B17] text-[#F8F3EB]/30 py-12">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
            <div>
              <span className={`${playfair.className} text-2xl font-semibold text-[#F8F3EB]/60 block mb-1`}>{CONFIG.name}</span>
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#D4A96A]/50 font-light italic">{CONFIG.tagline}</p>
            </div>
            <div className="grid grid-cols-2 gap-x-16 gap-y-3 text-xs font-light">
              <div>
                <p className="text-[#F8F3EB]/15 uppercase tracking-widest text-[9px] mb-2">Horarios</p>
                <p>{CONFIG.hours.weekday}</p>
                <p className="mt-1">{CONFIG.hours.weekend}</p>
              </div>
              <div>
                <p className="text-[#F8F3EB]/15 uppercase tracking-widest text-[9px] mb-2">Contacto</p>
                <p>{CONFIG.phone}</p>
                <a
                  href={`https://instagram.com/${CONFIG.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 mt-1 hover:text-[#D4A96A] transition-colors"
                >
                  <Instagram className="w-3 h-3" /> @{CONFIG.instagram}
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-[#F8F3EB]/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px]">
            <p>© {new Date().getFullYear()} {CONFIG.name}. Tutti i diritti riservati.</p>
            <div className="flex items-center gap-6">
              <Link href="/demos/privacidad" className="hover:text-[#F8F3EB]/60 transition-colors">Política de Privacidad</Link>
              <Link href="/demos/terminos" className="hover:text-[#F8F3EB]/60 transition-colors">Términos y Condiciones</Link>
              <Link href="/webs" className="hover:text-[#D4A96A] transition-colors">Webs</Link>
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
