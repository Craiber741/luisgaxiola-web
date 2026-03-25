"use client";

import { useEffect } from "react";
import { Barlow_Condensed, Source_Sans_3 } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { Star, Phone, ArrowRight, CheckCircle, Wrench, Shield, Clock, Instagram } from "lucide-react";
import FloatingWidget from "../../components/FloatingWidget";
import WantThisWebCTA from "../../components/WantThisWebCTA";
import { trackEvent } from "../../components/MetaPixel";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

const CONFIG = {
  name: "MotoFix",
  tagline: "Taller Automotriz Profesional",
  phone: "+52 664 345 6789",
  whatsapp: "5216643456789",
  mapsUrl: "https://maps.google.com",
  address: "Blvd. Insurgentes 5600, Tijuana, B.C.",
  hours: { weekday: "Lun–Vie: 8:00am – 6:00pm", weekend: "Sáb: 8:00am – 2:00pm" },
  instagram: "motofix_tij",
};

const SERVICES = [
  {
    name: "Cambio de Aceite",
    desc: "Aceite sintético o mineral, filtro y revisión de niveles. Incluye chequeo de 25 puntos.",
    num: "01",
  },
  {
    name: "Frenos y Suspensión",
    desc: "Diagnóstico, pastillas, discos, amortiguadores y alineación. Todo con garantía.",
    num: "02",
  },
  {
    name: "Diagnóstico Computarizado",
    desc: "Escaneo OBD2 completo. Detectamos fallas antes de que se conviertan en problemas costosos.",
    num: "03",
  },
  {
    name: "Afinación",
    desc: "Bujías, filtros, distribución y calibración de motor. Tu auto como nuevo.",
    num: "04",
  },
  {
    name: "Llantas y Balanceo",
    desc: "Montaje, balanceo digital, rotación y alineación computarizada en 4 ruedas.",
    num: "05",
  },
  {
    name: "Aire Acondicionado",
    desc: "Carga de gas, revisión de compresor, limpieza de filtros y revisión del sistema completo.",
    num: "06",
  },
];

const STATS = [
  { value: "15+", label: "Años en el negocio" },
  { value: "3,000+", label: "Vehículos atendidos" },
  { value: "1 año", label: "Garantía en trabajo" },
  { value: "48h", label: "Entrega máxima" },
];

const TESTIMONIALS = [
  {
    name: "Luis F.",
    text: "Llevo 8 años llevando mis autos con MotoFix. Siempre son honestos con el diagnóstico y el precio es justo. No hay taller de más confianza en Tijuana.",
    stars: 5,
  },
  {
    name: "Sandra V.",
    text: "Me fallaron los frenos y los atendí de emergencia. En el mismo día tenía mi carro listo y con garantía. Servicio rápido y profesional.",
    stars: 5,
  },
  {
    name: "Rodrigo P.",
    text: "El diagnóstico computarizado es increíble. Me dijeron exactamente qué fallaba antes de gastar en algo innecesario. Ahorrré mucho dinero.",
    stars: 5,
  },
];

export default function MecanicoPage() {
  useEffect(() => {
    trackEvent("ViewContent", { content_name: "demo_mecanico", content_category: "web_demo" });
  }, []);

  const waLink = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(
    `Hola ${CONFIG.name}, necesito revisar mi vehículo.`
  )}`;
  const waUrgente = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(
    `🚗 URGENTE — Necesito atención en ${CONFIG.name}.`
  )}`;

  return (
    <div className={`${sourceSans.className} bg-[#1C1C2E] text-white min-h-screen`}>

      {/* DEMO BANNER */}
      <div className="bg-[#E84317] text-white text-center py-2.5 px-4 text-xs font-semibold tracking-widest z-50 relative">
        ⚡ DEMO — Este diseño está disponible.{" "}
        <Link href="/webs" className="underline hover:opacity-80 transition-opacity">
          Solo se vende 1 vez →
        </Link>
      </div>

      {/* EMERGENCY STRIP — Orange */}
      <div className="bg-[#E84317]">
        <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            <span className={`${barlow.className} font-700 text-sm tracking-wider uppercase`}>
              Atendemos emergencias · Lunes a Sábado
            </span>
          </div>
          <a
            href={`tel:${CONFIG.phone}`}
            className={`${barlow.className} font-700 text-sm bg-[#1C1C2E] text-[#E84317] px-4 py-1.5 tracking-widest uppercase hover:bg-black transition-colors hidden md:block`}
          >
            {CONFIG.phone}
          </a>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#1C1C2E]/95 backdrop-blur-sm border-b border-[#E84317]/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#E84317] flex items-center justify-center">
              <Wrench className="w-4 h-4 text-white" />
            </div>
            <span className={`${barlow.className} text-2xl font-800 text-white tracking-wider uppercase`}>
              {CONFIG.name}
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-white/50 tracking-[0.2em] uppercase">
            <a href="#servicios" className="hover:text-[#E84317] transition-colors">Servicios</a>
            <a href="#nosotros" className="hover:text-[#E84317] transition-colors">Nosotros</a>
            <a href="#contacto" className="hover:text-[#E84317] transition-colors">Contacto</a>
          </nav>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`${barlow.className} bg-[#E84317] text-white font-700 text-sm px-5 py-2.5 tracking-widest uppercase hover:bg-orange-500 transition-colors`}
          >
            Agendar revisión
          </a>
        </div>
      </header>

      {/* HERO — Dark navy, big Barlow Condensed orange text */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/mecanico/hero.jpg"
            alt="MotoFix Taller"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C2E] via-[#1C1C2E]/85 to-transparent" />
        </div>
        {/* Diagonal accent */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3">
          <div className="absolute inset-0">
            <Image
              src="/images/mecanico/hero2.jpg"
              alt="Taller MotoFix"
              fill
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#1C1C2E]" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-0.5 bg-[#E84317]" />
              <p className={`${barlow.className} text-[#E84317] text-xs font-600 uppercase tracking-[0.5em]`}>
                Tijuana, B.C. · Taller Certificado
              </p>
            </div>
            <h1 className={`${barlow.className} font-800 leading-none mb-6`}>
              <span className="text-[#F4F4F4] text-[80px] md:text-[120px] block leading-none">TU AUTO</span>
              <span className="text-[#E84317] text-[80px] md:text-[120px] block leading-none">EN MANOS</span>
              <span className="text-white/30 text-[80px] md:text-[120px] block leading-none">EXPERTAS.</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed mb-12 max-w-xl">
              15 años arreglando vehículos en Tijuana. Diagnóstico honesto, precios justos, garantía real. Así de simple.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`${barlow.className} bg-[#E84317] text-white font-700 text-lg px-10 py-4 tracking-widest uppercase hover:bg-orange-500 transition-colors inline-flex items-center gap-2`}
              >
                <Wrench className="w-5 h-5" /> Agendar revisión
              </a>
              <a
                href={waUrgente}
                target="_blank"
                rel="noopener noreferrer"
                className={`${barlow.className} border-2 border-white/20 text-white/60 font-700 text-lg px-10 py-4 tracking-widest uppercase hover:border-[#E84317] hover:text-[#E84317] transition-all inline-flex items-center gap-2`}
              >
                Urgencia <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#E84317]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
            {STATS.map((s) => (
              <div key={s.label} className="py-8 px-8 text-center">
                <p className={`${barlow.className} text-4xl md:text-5xl font-800 text-white leading-none mb-2`}>
                  {s.value}
                </p>
                <p className="text-white/70 text-xs font-semibold uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES — Dark cards with orange accent numbers */}
      <section id="servicios" className="py-24 bg-[#1C1C2E] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-0.5 bg-[#E84317]" />
                <p className={`${barlow.className} text-[#E84317] text-xs font-600 uppercase tracking-[0.5em]`}>
                  Nuestros servicios
                </p>
              </div>
              <h2 className={`${barlow.className} text-5xl md:text-7xl font-800 text-white leading-none`}>
                REPARAMOS<br />
                <span className="text-[#E84317]">TODO.</span>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((service) => (
              <div
                key={service.name}
                className="bg-[#141422] border border-white/5 p-8 hover:border-[#E84317]/40 hover:bg-[#1E1E30] transition-all group"
              >
                <span className={`${barlow.className} text-6xl font-800 text-[#E84317]/15 group-hover:text-[#E84317]/30 transition-colors block mb-4 leading-none`}>
                  {service.num}
                </span>
                <h3 className={`${barlow.className} text-2xl font-700 text-white mb-3 uppercase tracking-wide group-hover:text-[#E84317] transition-colors`}>
                  {service.name}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`${barlow.className} inline-flex items-center gap-2 bg-[#E84317] text-white font-700 text-lg px-12 py-4 tracking-widest uppercase hover:bg-orange-500 transition-colors`}
            >
              Cotizar mi servicio <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="nosotros" className="py-24 bg-[#141422] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-0.5 bg-[#E84317]" />
                <p className={`${barlow.className} text-[#E84317] text-xs font-600 uppercase tracking-[0.5em]`}>
                  Nuestra historia
                </p>
              </div>
              <h2 className={`${barlow.className} text-5xl md:text-6xl font-800 text-white mb-8 leading-none uppercase`}>
                15 AÑOS<br />
                <span className="text-[#E84317]">CUIDANDO</span><br />
                TU AUTO.
              </h2>
              <p className="text-white/40 leading-relaxed mb-5 text-sm">
                Don Gustavo fundó MotoFix con una sola premisa: hacer el trabajo bien o no hacerlo. Hoy, su hijo y un equipo de mecánicos certificados continúan esa filosofía con cada vehículo que entra al taller.
              </p>
              <p className="text-white/40 leading-relaxed mb-10 text-sm">
                Contamos con escáner OBD2 de última generación, banco de frenos digital y alineadora computarizada. Tecnología de agencia, precios de taller independiente.
              </p>
              <div className="space-y-3">
                {[
                  "Diagnóstico honesto, sin inventar fallas",
                  "Garantía de 1 año en mano de obra",
                  "Refacciones originales o de primera calidad",
                  "Mecánicos certificados y con experiencia",
                  "Facturación disponible para empresas",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-[#E84317] flex-shrink-0" />
                    <span className="text-white/60 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden max-w-md mx-auto md:mx-0">
                <Image
                  src="/images/mecanico/team.jpg"
                  alt="Equipo MotoFix"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141422]/60 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[#E84317] p-6 text-center">
                <p className={`${barlow.className} text-5xl font-800 text-white leading-none`}>15+</p>
                <p className="text-white/70 text-[10px] uppercase tracking-widest font-semibold mt-1">Años<br />de servicio</p>
              </div>
              <div className="absolute -top-4 -right-4 w-2/3 h-2/3 border border-[#E84317]/20 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE IMAGE GALLERY */}
      <section className="py-16 bg-[#1C1C2E]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-4">
            {[
              { src: "/images/mecanico/service-1.jpg", label: "Motor" },
              { src: "/images/mecanico/service-2.jpg", label: "Frenos" },
              { src: "/images/mecanico/service-3.jpg", label: "Diagnóstico" },
            ].map((img) => (
              <div key={img.label} className="relative aspect-video overflow-hidden group">
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C2E]/80 to-transparent" />
                <p className={`${barlow.className} absolute bottom-4 left-4 text-[#E84317] font-700 text-sm uppercase tracking-widest`}>
                  {img.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-[#141422]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-6 h-0.5 bg-[#E84317]" />
            <p className={`${barlow.className} text-[#E84317] text-xs font-600 uppercase tracking-[0.5em]`}>
              Lo que dicen nuestros clientes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="border border-white/5 p-8 hover:border-[#E84317]/30 transition-colors">
                <div className="flex mb-5">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#E84317] fill-[#E84317]" />
                  ))}
                </div>
                <p className="text-white/50 leading-relaxed mb-6 text-sm italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#E84317]/20 flex items-center justify-center rounded-full">
                    <span className={`${barlow.className} text-[#E84317] font-800 text-sm`}>{t.name[0]}</span>
                  </div>
                  <p className={`${barlow.className} text-[#E84317] font-600 text-sm uppercase tracking-wider`}>{t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Orange background */}
      <section id="contacto" className="py-32 bg-[#E84317] relative overflow-hidden scroll-mt-20">
        {/* Diagonal lines decoration */}
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 25px, #1C1C2E 25px, #1C1C2E 26px)" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-8">
            <Wrench className="w-12 h-12 text-white/80" />
          </div>
          <h2 className={`${barlow.className} text-6xl md:text-[110px] font-800 text-white leading-none mb-8 uppercase`}>
            AGENDA<br />TU CITA
          </h2>
          <p className="text-white/60 text-xl mb-12 max-w-md mx-auto font-light">
            Dinos qué le pasa a tu auto y te cotizamos en minutos. Sin rodeos, sin sorpresas.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`${barlow.className} inline-flex items-center gap-3 bg-[#1C1C2E] text-white font-700 text-xl px-14 py-5 tracking-widest uppercase hover:bg-black transition-colors`}
          >
            <Wrench className="w-5 h-5" /> Escribir por WhatsApp
          </a>
          <div className="mt-10 flex flex-wrap justify-center gap-8 text-white/50 text-sm font-semibold">
            <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> {CONFIG.phone}</span>
            <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> Garantía 1 año</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {CONFIG.hours.weekday}</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0D0D18] text-white/30 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#E84317] flex items-center justify-center flex-shrink-0">
                <Wrench className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className={`${barlow.className} text-xl font-800 text-white/70 tracking-wider uppercase`}>{CONFIG.name}</span>
                <p className="text-[9px] uppercase tracking-widest text-white/20 mt-0.5">{CONFIG.tagline}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-16 gap-y-3 text-xs">
              <div>
                <p className="text-white/15 uppercase tracking-widest text-[9px] mb-2">Horarios</p>
                <p>{CONFIG.hours.weekday}</p>
                <p className="mt-1">{CONFIG.hours.weekend}</p>
              </div>
              <div>
                <p className="text-white/15 uppercase tracking-widest text-[9px] mb-2">Contacto</p>
                <p>{CONFIG.phone}</p>
                <a
                  href={`https://instagram.com/${CONFIG.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 mt-1 hover:text-[#E84317] transition-colors"
                >
                  <Instagram className="w-3 h-3" /> @{CONFIG.instagram}
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px]">
            <p>© {new Date().getFullYear()} {CONFIG.name}. Todos los derechos reservados.</p>
            <div className="flex items-center gap-6">
              <Link href="/demos/privacidad" className="hover:text-white/60 transition-colors">Política de Privacidad</Link>
              <Link href="/demos/terminos" className="hover:text-white/60 transition-colors">Términos y Condiciones</Link>
              <Link href="/webs" className="hover:text-[#E84317] transition-colors">Webs</Link>
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
