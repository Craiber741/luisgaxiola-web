"use client";

import { useEffect } from "react";
import { Syne, DM_Sans } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { Star, Zap, ArrowRight, Instagram, Phone } from "lucide-react";
import FloatingWidget from "../../components/FloatingWidget";
import WantThisWebCTA from "../../components/WantThisWebCTA";
import { trackEvent } from "../../components/MetaPixel";

const syne = Syne({ subsets: ["latin"], weight: ["400", "700", "800"], display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

const CONFIG = {
  name: "GLOW STUDIO",
  tagline: "Beauty Bar · Tendencias · Estilo",
  phone: "+52 664 777 8899",
  whatsapp: "5216647778899",
  mapsUrl: "https://maps.google.com",
  address: "Blvd. Agua Caliente 3456, Tijuana, B.C.",
  hours: "Lun–Sáb: 10am – 8pm",
  instagram: "glowstudio_tij",
};

const SERVICES = [
  { name: "Color Fantasía", price: "$650", tag: "01" },
  { name: "Corte Tendencia", price: "$350", tag: "02" },
  { name: "Nail Art", price: "$280", tag: "03" },
  { name: "Extensiones", price: "$720", tag: "04" },
  { name: "Cejas", price: "$200", tag: "05" },
  { name: "Tratamiento Glow", price: "$480", tag: "06" },
];

const TESTIMONIALS = [
  {
    name: "Andrea K.",
    text: "Me hicieron un color fantasía increíble. Literalmente dejé el salón siendo otra persona. Todo el mundo me pregunta dónde me hice el cabello.",
    stars: 5,
  },
  {
    name: "Pamela Z.",
    text: "El Nail Art que me hicieron es una obra de arte. Las chicas son súper creativas y van al día con las tendencias. Mi salón favorito sin duda.",
    stars: 5,
  },
  {
    name: "Renata F.",
    text: "Vine por unas extensiones y me quedé con clienta fiel. Calidad increíble, se ven muy naturales y duran meses. GLOW es el mejor.",
    stars: 5,
  },
];

export default function Salon3Page() {
  useEffect(() => {
    trackEvent("ViewContent", { content_name: "demo_salon3", content_category: "web_demo" });
  }, []);

  const waLink = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(
    `Hola ${CONFIG.name}, quiero agendar un servicio.`
  )}`;

  return (
    <div className={`${dmSans.className} bg-[#0A0A0A] text-[#F0F0F0] min-h-screen`}>

      {/* DEMO BANNER */}
      <div className="bg-[#F5047A] text-white text-center py-2.5 px-4 text-xs font-bold tracking-widest z-50 relative">
        ⚡ DEMO — Este diseño está disponible.{" "}
        <Link href="/webs" className="underline hover:opacity-80 transition-opacity">
          Solo se vende 1 vez →
        </Link>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-[#F5047A]/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className={`${syne.className} text-xl font-black tracking-widest text-[#F5047A]`}>
            {CONFIG.name}
          </span>
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-[#F0F0F0]/50 tracking-widest uppercase">
            <a href="#servicios" className="hover:text-[#FFED4A] transition-colors">Servicios</a>
            <a href="#galeria" className="hover:text-[#FFED4A] transition-colors">Galería</a>
            <a href="#nosotros" className="hover:text-[#FFED4A] transition-colors">Nosotros</a>
          </nav>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#F5047A] text-white text-xs font-bold px-5 py-2.5 tracking-widest uppercase hover:bg-[#FFED4A] hover:text-[#0A0A0A] transition-all"
          >
            Agendar
          </a>
        </div>
      </header>

      {/* HERO — Full black, huge Syne text */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/salon3/hero.jpg"
            alt="GLOW STUDIO"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        </div>
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-64 h-64 border border-[#F5047A]/20 rounded-full" />
        <div className="absolute bottom-20 right-40 w-32 h-32 border border-[#FFED4A]/15 rounded-full" />
        <div className="absolute top-1/2 right-10 w-4 h-4 bg-[#F5047A] rounded-full" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="max-w-3xl">
            <p className="text-[#FFED4A] text-[10px] font-bold uppercase tracking-[0.5em] mb-6 flex items-center gap-3">
              <Zap className="w-3 h-3 fill-[#FFED4A]" /> Tijuana · Beauty Bar
            </p>
            <h1 className={`${syne.className} font-black leading-none mb-0`}>
              <span className="text-[120px] md:text-[180px] text-[#F5047A] block leading-none">GLOW</span>
              <span className="text-4xl md:text-6xl text-[#F0F0F0] block leading-none">STUDIO</span>
            </h1>
            <p className={`${dmSans.className} text-[#FFED4A] text-lg font-medium mt-6 mb-10 max-w-lg leading-relaxed`}>
              Donde tu estilo no tiene límites. Color fantasía, nail art, extensiones y todo lo que necesitas para brillar diferente.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F5047A] text-white font-bold text-sm px-10 py-4 tracking-widest uppercase hover:bg-[#FFED4A] hover:text-[#0A0A0A] transition-all inline-flex items-center gap-2"
              >
                Agendar ahora <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#servicios"
                className="border-2 border-[#F0F0F0]/20 text-[#F0F0F0]/60 font-bold text-sm px-10 py-4 tracking-widest uppercase hover:border-[#FFED4A] hover:text-[#FFED4A] transition-all"
              >
                Ver servicios
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES — Bold grid with pink accent numbers */}
      <section id="servicios" className="py-24 bg-[#0A0A0A] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-[#FFED4A] text-[10px] font-bold uppercase tracking-[0.5em] mb-4">Nuestros servicios</p>
              <h2 className={`${syne.className} text-5xl md:text-7xl font-black text-[#F0F0F0]`}>
                LO QUE<br />
                <span className="text-[#F5047A]">HACEMOS</span>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#F0F0F0]/10">
            {SERVICES.map((service) => (
              <div
                key={service.name}
                className="bg-[#0A0A0A] p-8 group hover:bg-[#F5047A]/5 transition-colors border border-transparent hover:border-[#F5047A]/30"
              >
                <span className={`${syne.className} text-5xl font-black text-[#F5047A]/20 group-hover:text-[#F5047A]/40 transition-colors block mb-4`}>
                  {service.tag}
                </span>
                <h3 className={`${syne.className} text-2xl font-bold text-[#F0F0F0] mb-3 group-hover:text-[#F5047A] transition-colors`}>
                  {service.name}
                </h3>
                <p className={`${syne.className} text-2xl font-black text-[#FFED4A]`}>{service.price}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FFED4A] text-[#0A0A0A] font-black text-sm px-10 py-4 tracking-widest uppercase hover:bg-[#F5047A] hover:text-white transition-all"
            >
              Consultar precio exacto <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* GALLERY — 2-col asymmetric */}
      <section id="galeria" className="py-24 bg-[#0D0D0D] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-[#FFED4A] text-[10px] font-bold uppercase tracking-[0.5em] mb-4">El estudio</p>
            <h2 className={`${syne.className} text-5xl md:text-7xl font-black text-[#F0F0F0]`}>
              NUESTRO<br /><span className="text-[#F5047A]">MUNDO</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/images/salon3/gallery-1.jpg"
                  alt="Trabajos de GLOW STUDIO"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent" />
              </div>
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/salon3/gallery-2.jpg"
                  alt="Nail art"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/salon3/gallery-3.jpg"
                  alt="Color fantasía"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/images/salon3/gallery-4.jpg"
                  alt="Interior del estudio"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0A0A0A] to-transparent">
                  <p className={`${syne.className} text-white font-bold text-sm`}>Cada look, una obra de arte.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="nosotros" className="py-24 bg-[#0A0A0A] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#FFED4A] text-[10px] font-bold uppercase tracking-[0.5em] mb-6">Nosotros</p>
              <h2 className={`${syne.className} text-5xl md:text-6xl font-black text-[#F0F0F0] mb-8 leading-none`}>
                SOMOS EL<br />
                <span className="text-[#F5047A]">FUTURO</span><br />
                DE LA<br />BELLEZA.
              </h2>
              <p className="text-[#F0F0F0]/50 leading-relaxed mb-5 text-sm">
                GLOW STUDIO nació de la convicción de que el salón de belleza debe ser un espacio sin reglas. Aquí celebramos la creatividad, la experimentación y la individualidad de cada cliente.
              </p>
              <p className="text-[#F0F0F0]/50 leading-relaxed mb-10 text-sm">
                Nuestro equipo se entrena constantemente en las últimas tendencias de colorimetría, diseño de uñas y cuidado capilar. Si lo viste en TikTok, nosotros podemos hacerlo.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#F0F0F0]/10">
                {[
                  { value: "5+", label: "Años" },
                  { value: "2K+", label: "Clientas" },
                  { value: "4.9★", label: "Google" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className={`${syne.className} text-3xl font-black text-[#F5047A] mb-1`}>{s.value}</p>
                    <p className="text-[#F0F0F0]/30 text-[9px] font-medium uppercase tracking-widest">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square overflow-hidden max-w-md mx-auto md:mx-0 w-full">
              <Image
                src="/images/salon3/about.jpg"
                alt="Equipo GLOW STUDIO"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tl from-[#F5047A]/30 to-transparent" />
              {/* Pink corner tag */}
              <div className="absolute top-0 left-0 bg-[#F5047A] px-4 py-2">
                <span className={`${syne.className} text-white font-black text-xs tracking-widest uppercase`}>
                  Est. 2019
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#FFED4A] text-[10px] font-bold uppercase tracking-[0.5em] mb-4">Reviews</p>
            <h2 className={`${syne.className} text-5xl font-black text-[#F0F0F0]`}>
              ELLAS <span className="text-[#F5047A]">GLOWEAN</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="border-2 border-[#F5047A]/20 p-8 hover:border-[#F5047A] transition-colors">
                <div className="flex mb-5">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#FFED4A] fill-[#FFED4A]" />
                  ))}
                </div>
                <p className={`${dmSans.className} text-[#F0F0F0]/70 leading-relaxed mb-6 text-sm`}>
                  "{t.text}"
                </p>
                <p className={`${syne.className} text-[#F5047A] font-bold text-xs tracking-widest uppercase`}>{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Hot pink background with big black text */}
      <section className="py-32 bg-[#F5047A] relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 border-4 border-[#0A0A0A]/10 rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 border-4 border-[#FFED4A]/20 rounded-full" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className={`${syne.className} text-6xl md:text-9xl font-black text-[#0A0A0A] leading-none mb-8`}>
            RESERVA<br />AHORA
          </h2>
          <p className={`${dmSans.className} text-[#0A0A0A]/60 text-lg mb-12 max-w-md mx-auto`}>
            Escríbenos por WhatsApp y asegura tu lugar. Los turnos se llenan rápido.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#0A0A0A] text-[#F5047A] font-black text-lg px-14 py-5 tracking-widest uppercase hover:bg-[#FFED4A] hover:text-[#0A0A0A] transition-all"
          >
            ¡Quiero mi cita! <ArrowRight className="w-5 h-5" />
          </a>
          <p className="text-[#0A0A0A]/50 text-sm mt-8 font-medium">{CONFIG.phone}</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050505] text-[#F0F0F0]/30 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
            <span className={`${syne.className} text-2xl font-black text-[#F5047A]`}>{CONFIG.name}</span>
            <div className="grid grid-cols-2 gap-x-16 gap-y-3 text-xs">
              <div>
                <p className="text-[#F0F0F0]/15 uppercase tracking-widest text-[9px] mb-2">Horarios</p>
                <p>{CONFIG.hours}</p>
              </div>
              <div>
                <p className="text-[#F0F0F0]/15 uppercase tracking-widest text-[9px] mb-2">Contacto</p>
                <p className="flex items-center gap-1"><Phone className="w-3 h-3" /> {CONFIG.phone}</p>
                <a
                  href={`https://instagram.com/${CONFIG.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 mt-1 hover:text-[#F5047A] transition-colors"
                >
                  <Instagram className="w-3 h-3" /> @{CONFIG.instagram}
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-[#F0F0F0]/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px]">
            <p>© {new Date().getFullYear()} {CONFIG.name}. Todos los derechos reservados.</p>
            <div className="flex items-center gap-6">
              <Link href="/demos/privacidad" className="hover:text-[#F0F0F0]/60 transition-colors">Política de Privacidad</Link>
              <Link href="/demos/terminos" className="hover:text-[#F0F0F0]/60 transition-colors">Términos y Condiciones</Link>
              <Link href="/webs" className="hover:text-[#F5047A] transition-colors">Webs</Link>
            </div>
          </div>
        </div>
      </footer>

      <FloatingWidget
        phone={CONFIG.phone}
        whatsapp={CONFIG.whatsapp}
        googleMapsUrl={CONFIG.mapsUrl}
        businessName={CONFIG.name}
        businessType="salon"
      />
      <WantThisWebCTA />
    </div>
  );
}
