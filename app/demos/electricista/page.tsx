"use client";

import { useEffect } from "react";
import { Rajdhani, IBM_Plex_Sans } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { Star, Zap, Phone, ArrowRight, CheckCircle, Shield, Clock, Instagram } from "lucide-react";
import FloatingWidget from "../../components/FloatingWidget";
import WantThisWebCTA from "../../components/WantThisWebCTA";
import { trackEvent } from "../../components/MetaPixel";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const CONFIG = {
  name: "Volt Pro",
  tagline: "Instalaciones Eléctricas Profesionales",
  phone: "+52 664 234 5678",
  whatsapp: "5216642345678",
  mapsUrl: "https://maps.google.com",
  address: "Tijuana, B.C. — Servicio a toda la ciudad",
  instagram: "voltpro_tij",
};

const SERVICES = [
  {
    name: "Instalación Eléctrica",
    desc: "Instalaciones residenciales y comerciales desde cero. Cableado, contactos, tableros y más.",
    icon: "⚡",
  },
  {
    name: "Panel de Distribución",
    desc: "Instalación, ampliación y mantenimiento de paneles eléctricos. CFE compatible.",
    icon: "🔌",
  },
  {
    name: "Iluminación LED",
    desc: "Proyectos de iluminación eficiente para hogar, comercio e industria.",
    icon: "💡",
  },
  {
    name: "Emergencias 24/7",
    desc: "Atendemos cualquier falla eléctrica urgente. Llegamos en menos de 45 minutos.",
    icon: "🚨",
  },
  {
    name: "Diagnóstico Eléctrico",
    desc: "Inspección completa con equipo certificado. Detectamos fallas antes de que sean problemas.",
    icon: "🔍",
  },
  {
    name: "Instalación Industrial",
    desc: "Proyectos de media y baja tensión para plantas, almacenes y talleres.",
    icon: "🏭",
  },
];

const STATS = [
  { value: "10+", label: "Años de experiencia" },
  { value: "1,500+", label: "Proyectos completados" },
  { value: "45 min", label: "Tiempo de respuesta" },
  { value: "100%", label: "Garantía en trabajo" },
];

const TESTIMONIALS = [
  {
    name: "Ing. Roberto M.",
    text: "Contratamos a Volt Pro para el cableado completo de nuestra planta. Trabajo impecable, en tiempo y con todos los estándares de seguridad. Profesionales de verdad.",
    stars: 5,
  },
  {
    name: "Ana González",
    text: "Tuvimos una emergencia a medianoche y llegaron en 40 minutos. Resolvieron el problema rápido y con precio justo. Los recomiendo al 100%.",
    stars: 5,
  },
  {
    name: "Marco A.",
    text: "Hicieron la instalación de LED en todo mi local comercial. Bajé el recibo de luz a la mitad. Inversión que se pagó sola en 3 meses.",
    stars: 5,
  },
];

export default function ElectricistaPage() {
  useEffect(() => {
    trackEvent("ViewContent", { content_name: "demo_electricista", content_category: "web_demo" });
  }, []);

  const waLink = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(
    `Hola ${CONFIG.name}, necesito un servicio eléctrico.`
  )}`;
  const waEmergencia = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(
    `⚡ EMERGENCIA — Necesito atención urgente de ${CONFIG.name}.`
  )}`;

  return (
    <div className={`${ibmPlex.className} bg-[#0A0E14] text-white min-h-screen`}>

      {/* DEMO BANNER */}
      <div className="bg-[#1A2744] text-white text-center py-2.5 px-4 text-xs font-medium tracking-widest z-50 relative">
        ⚡ DEMO — Este diseño está disponible.{" "}
        <Link href="/webs" className="text-[#F5C400] underline hover:opacity-80 transition-opacity">
          Solo se vende 1 vez →
        </Link>
      </div>

      {/* EMERGENCY STRIP — Yellow bg */}
      <div className="bg-[#F5C400] text-[#0A0E14] py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold">
            <Zap className="w-4 h-4 fill-[#0A0E14]" />
            <span className={`${rajdhani.className} font-700 tracking-wider`}>EMERGENCIAS 24/7</span>
            <span className="hidden md:inline">— Llegamos en 45 minutos o menos</span>
          </div>
          <a
            href={waEmergencia}
            target="_blank"
            rel="noopener noreferrer"
            className={`${rajdhani.className} font-bold text-sm bg-[#0A0E14] text-[#F5C400] px-4 py-1.5 tracking-widest uppercase hover:bg-[#1A2744] transition-colors`}
          >
            Llamar ahora → {CONFIG.phone}
          </a>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#0A0E14]/95 backdrop-blur-sm border-b border-[#F5C400]/15">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#F5C400] fill-[#F5C400]" />
            <span className={`${rajdhani.className} text-xl font-700 tracking-[0.15em] text-white`}>
              {CONFIG.name}
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-white/50 tracking-[0.2em] uppercase">
            <a href="#servicios" className="hover:text-[#F5C400] transition-colors">Servicios</a>
            <a href="#nosotros" className="hover:text-[#F5C400] transition-colors">Nosotros</a>
            <a href="#contacto" className="hover:text-[#F5C400] transition-colors">Contacto</a>
          </nav>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`${rajdhani.className} bg-[#F5C400] text-[#0A0E14] text-sm font-bold px-5 py-2.5 tracking-widest uppercase hover:bg-white transition-colors`}
          >
            Cotizar gratis
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/electricista/hero.jpg"
            alt="Volt Pro — Instalaciones Eléctricas"
            fill
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E14] via-[#0A0E14]/80 to-[#0A0E14]/40" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(#F5C400 1px, transparent 1px), linear-gradient(90deg, #F5C400 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Vertical yellow accent lines */}
        <div className="absolute right-1/4 top-0 bottom-0 w-px bg-[#F5C400]/10" />
        <div className="absolute right-1/3 top-0 bottom-0 w-px bg-[#F5C400]/5" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-[#F5C400]" />
              <p className={`${rajdhani.className} text-[#F5C400] text-xs font-600 uppercase tracking-[0.5em]`}>
                Electricistas Certificados · Tijuana, B.C.
              </p>
            </div>
            <h1 className={`${rajdhani.className} font-700 leading-none mb-6`}>
              <span className="text-white text-[70px] md:text-[100px] block leading-none">INSTALACIONES</span>
              <span className="text-[#F5C400] text-[70px] md:text-[100px] block leading-none">ELÉCTRICAS</span>
              <span className="text-white/40 text-[70px] md:text-[100px] block leading-none">PROFESIONALES</span>
            </h1>
            <p className={`${ibmPlex.className} text-white/50 text-lg leading-relaxed mb-12 max-w-xl`}>
              Más de 10 años instalando, reparando y certificando proyectos eléctricos en Tijuana. Residencial, comercial e industrial. Garantía en todo el trabajo.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`${rajdhani.className} bg-[#F5C400] text-[#0A0E14] font-bold text-base px-10 py-4 tracking-widest uppercase hover:bg-white transition-colors inline-flex items-center gap-2`}
              >
                <Zap className="w-4 h-4 fill-[#0A0E14]" /> Cotización gratis
              </a>
              <a
                href={waEmergencia}
                target="_blank"
                rel="noopener noreferrer"
                className={`${rajdhani.className} border-2 border-[#F5C400]/30 text-[#F5C400]/70 font-bold text-base px-10 py-4 tracking-widest uppercase hover:border-[#F5C400] hover:text-[#F5C400] transition-all inline-flex items-center gap-2`}
              >
                Emergencia 24/7 <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS ROW */}
      <section className="bg-[#F5C400]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#0A0E14]/10">
            {STATS.map((s) => (
              <div key={s.label} className="py-8 px-8 text-center">
                <p className={`${rajdhani.className} text-4xl md:text-5xl font-700 text-[#0A0E14] leading-none mb-2`}>
                  {s.value}
                </p>
                <p className="text-[#0A0E14]/60 text-xs font-medium uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="servicios" className="py-24 bg-[#0A0E14] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#F5C400]" />
                <p className={`${rajdhani.className} text-[#F5C400] text-xs font-600 uppercase tracking-[0.5em]`}>
                  Nuestros servicios
                </p>
              </div>
              <h2 className={`${rajdhani.className} text-5xl md:text-7xl font-700 text-white`}>
                LO QUE<br />
                <span className="text-[#F5C400]">HACEMOS</span>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((service, i) => (
              <div
                key={service.name}
                className="border border-[#F5C400]/10 p-8 hover:border-[#F5C400]/50 hover:bg-[#1A2744]/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-3xl">{service.icon}</span>
                  <span className={`${rajdhani.className} text-4xl font-700 text-[#F5C400]/10 group-hover:text-[#F5C400]/20 transition-colors`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className={`${rajdhani.className} text-xl font-600 text-white mb-3 group-hover:text-[#F5C400] transition-colors uppercase tracking-wide`}>
                  {service.name}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`${rajdhani.className} inline-flex items-center gap-2 bg-[#F5C400] text-[#0A0E14] font-bold text-base px-12 py-4 tracking-widest uppercase hover:bg-white transition-colors`}
            >
              Solicitar cotización gratis <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT / NOSOTROS */}
      <section id="nosotros" className="py-24 bg-[#0D1119] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square relative overflow-hidden max-w-md mx-auto md:mx-0">
                <Image
                  src="/images/electricista/team.jpg"
                  alt="Equipo Volt Pro"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E14]/60 to-transparent" />
              </div>
              {/* Yellow border accent */}
              <div className="absolute -bottom-4 -right-4 w-3/4 h-3/4 border border-[#F5C400]/20 -z-10" />
              {/* Badge */}
              <div className="absolute top-0 left-0 bg-[#F5C400] p-4 text-center">
                <Zap className="w-6 h-6 text-[#0A0E14] fill-[#0A0E14] mx-auto mb-1" />
                <p className={`${rajdhani.className} text-[9px] font-700 text-[#0A0E14] uppercase tracking-widest`}>Certificados</p>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[#F5C400]" />
                <p className={`${rajdhani.className} text-[#F5C400] text-xs font-600 uppercase tracking-[0.5em]`}>
                  Por qué elegirnos
                </p>
              </div>
              <h2 className={`${rajdhani.className} text-5xl md:text-6xl font-700 text-white mb-8 leading-none uppercase`}>
                CALIDAD Y<br />
                <span className="text-[#F5C400]">CONFIANZA</span><br />
                GARANTIZADAS.
              </h2>
              <p className="text-white/40 leading-relaxed mb-5 text-sm">
                Todos nuestros electricistas están certificados por la CFE y cuentan con más de 5 años de experiencia comprobada. Usamos materiales de primera calidad con garantía de fabricante.
              </p>
              <p className="text-white/40 leading-relaxed mb-10 text-sm">
                Cada proyecto incluye revisión final de seguridad, entrega de planos eléctricos actualizados y garantía de 1 año en mano de obra. Trabajamos con factura.
              </p>
              <div className="space-y-3">
                {[
                  "Materiales con garantía de fábrica",
                  "Presupuesto sin costo ni compromiso",
                  "Servicio de emergencia 24/7",
                  "Facturación disponible",
                  "Planos actualizados incluidos",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-[#F5C400] fill-[#F5C400]/20 flex-shrink-0" />
                    <span className="text-white/60 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services images */}
      <section className="py-0 bg-[#0A0E14]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-4">
            {[
              { src: "/images/electricista/service-1.jpg", label: "Instalación" },
              { src: "/images/electricista/service-2.jpg", label: "Tableros" },
              { src: "/images/electricista/service-3.jpg", label: "Diagnóstico" },
            ].map((img) => (
              <div key={img.label} className="relative aspect-video overflow-hidden group">
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E14]/80 to-transparent" />
                <p className={`${rajdhani.className} absolute bottom-4 left-4 text-[#F5C400] font-600 text-sm uppercase tracking-widest`}>
                  {img.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-[#0D1119]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-px bg-[#F5C400]" />
            <p className={`${rajdhani.className} text-[#F5C400] text-xs font-600 uppercase tracking-[0.5em]`}>
              Lo que dicen nuestros clientes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="border-l-4 border-[#F5C400] pl-6 py-4">
                <div className="flex mb-4">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-[#F5C400] fill-[#F5C400]" />
                  ))}
                </div>
                <p className="text-white/50 leading-relaxed mb-5 text-sm italic">"{t.text}"</p>
                <p className={`${rajdhani.className} text-[#F5C400] font-600 text-sm uppercase tracking-wider`}>{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Yellow bg with black text */}
      <section id="contacto" className="py-32 bg-[#F5C400] relative overflow-hidden scroll-mt-20">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(#0A0E14 1px, transparent 1px), linear-gradient(90deg, #0A0E14 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-8">
            <Zap className="w-12 h-12 text-[#0A0E14] fill-[#0A0E14]/80" />
          </div>
          <h2 className={`${rajdhani.className} text-6xl md:text-9xl font-700 text-[#0A0E14] leading-none mb-8 uppercase`}>
            COTIZA<br />GRATIS
          </h2>
          <p className={`${ibmPlex.className} text-[#0A0E14]/60 text-lg mb-12 max-w-md mx-auto`}>
            Cuéntanos tu proyecto y te enviamos presupuesto detallado en menos de 2 horas. Sin costo ni compromiso.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`${rajdhani.className} inline-flex items-center gap-3 bg-[#0A0E14] text-[#F5C400] font-700 text-lg px-14 py-5 tracking-widest uppercase hover:bg-[#1A2744] transition-colors`}
          >
            <Zap className="w-5 h-5 fill-[#F5C400]" /> Escribir por WhatsApp
          </a>
          <div className="mt-10 flex flex-wrap justify-center gap-8 text-[#0A0E14]/50 text-sm font-medium">
            <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> {CONFIG.phone}</span>
            <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> Garantía 1 año</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Emergencias 24/7</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#060A10] text-white/30 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#F5C400] fill-[#F5C400]" />
              <div>
                <span className={`${rajdhani.className} text-xl font-700 text-white/70 tracking-wider`}>{CONFIG.name}</span>
                <p className="text-[9px] uppercase tracking-widest text-white/20 mt-0.5">{CONFIG.tagline}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-16 gap-y-3 text-xs">
              <div>
                <p className="text-white/15 uppercase tracking-widest text-[9px] mb-2">Cobertura</p>
                <p>{CONFIG.address}</p>
              </div>
              <div>
                <p className="text-white/15 uppercase tracking-widest text-[9px] mb-2">Contacto</p>
                <p>{CONFIG.phone}</p>
                <a
                  href={`https://instagram.com/${CONFIG.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 mt-1 hover:text-[#F5C400] transition-colors"
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
              <Link href="/webs" className="hover:text-[#F5C400] transition-colors">Webs</Link>
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
