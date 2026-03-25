"use client";

import { useEffect } from "react";
import { Bebas_Neue, IBM_Plex_Sans } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import {
  Phone, MapPin, Clock, CheckCircle, Zap, Wrench, Droplets,
  Thermometer, ShowerHead, AlertTriangle, Star, ArrowRight, Shield,
} from "lucide-react";
import FloatingWidget from "../../components/FloatingWidget";
import WantThisWebCTA from "../../components/WantThisWebCTA";
import { trackEvent } from "../../components/MetaPixel";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" });
const ibm = IBM_Plex_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600"], display: "swap" });

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const EMPRESA = {
  name: "HydroFix",
  tagline: "Plomería Profesional",
  phone: "+52 664 456 7890",
  whatsapp: "5216644567890", // TODO: reemplazar
  address: "Tijuana, Baja California · Cobertura toda la ciudad",
  hours24: true,
  mapsUrl: "https://maps.google.com", // TODO: reemplazar
  instagram: "hydrofix_tij",
};

const SERVICIOS = [
  { icon: Droplets,    name: "Fugas y Tuberías",      desc: "Detección y reparación de fugas, cambio de tubería, secciones y conexiones.", urgente: true  },
  { icon: Wrench,      name: "Instalación Sanitaria",  desc: "Inodoros, lavabos, regaderas, tinas y todo tipo de muebles sanitarios.",     urgente: false },
  { icon: Thermometer, name: "Calentadores",           desc: "Instalación, reparación y mantenimiento de calentadores de gas y eléctricos.", urgente: false },
  { icon: ShowerHead,  name: "Desazolve",              desc: "Desazolve de drenajes, coladeras, fosas sépticas y tubería con hidrojet.",   urgente: true  },
  { icon: Zap,         name: "Emergencias 24/7",       desc: "Atención inmediata para inundaciones, tuberías rotas y fugas urgentes.",     urgente: true  },
  { icon: Shield,      name: "Remodelación",           desc: "Baños completos, cocinas, cuartos de lavado. Materiales de primera calidad.", urgente: false },
];

const TESTIMONIALS = [
  { name: "Roberto A.", stars: 5, text: "Llegaron en 30 minutos a mi fuga de agua. Trabajo limpio, profesional y precio justo. Ya tengo mi plomero de confianza.", tag: "Fuga urgente" },
  { name: "Carmen G.",  stars: 5, text: "Remodelaron el baño completo en 3 días. Quedó perfecto y respetaron el presupuesto acordado. Muy recomendados.", tag: "Remodelación" },
  { name: "Marcos H.",  stars: 5, text: "El calentador se descompuso un domingo. Vinieron ese mismo día y lo dejaron funcionando. Excelente servicio.", tag: "Emergencia dominical" },
];

export default function PlomeroDemo() {
  useEffect(() => {
    trackEvent("ViewContent", { content_name: "demo_plomero", content_category: "web_demo" });
  }, []);

  const waUrl = (msg: string) =>
    `https://wa.me/${EMPRESA.whatsapp}?text=${encodeURIComponent(msg)}`;

  return (
    <div className={`${ibm.className} bg-[#F2F0EB] text-[#0D1117] min-h-screen overflow-x-hidden`}>

      {/* ── DEMO BANNER ───────────────────────────────────── */}
      <div className="bg-[#0D1117] text-white text-center py-2 px-4 text-[10px] font-semibold tracking-[0.25em] uppercase z-50 relative">
        <span className="text-[#E07B2A]">⚡ Demo</span> — Diseño disponible.{" "}
        <Link href="/webs" className="underline hover:text-[#E07B2A] transition-colors font-bold">
          Solo se vende 1 vez →
        </Link>
      </div>

      {/* ── EMERGENCY STRIP ───────────────────────────────── */}
      <div className="bg-[#E07B2A] py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white text-xs font-semibold">
            <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />
            <span>¿EMERGENCIA? Atendemos 24/7, 365 días al año</span>
          </div>
          <a href={`tel:${EMPRESA.phone}`}
            className="flex items-center gap-2 bg-white text-[#E07B2A] text-xs font-bold px-4 py-1.5 hover:bg-[#FFF5EE] transition-colors">
            <Phone className="w-3 h-3" /> Llamar ahora
          </a>
        </div>
      </div>

      {/* ── NAVBAR ────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#0D1117]/98 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#E07B2A] flex items-center justify-center">
              <Droplets className="w-4 h-4 text-white" />
            </div>
            <span className={`${bebas.className} text-2xl text-white tracking-widest`}>
              {EMPRESA.name}
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-[10px] font-semibold text-white/40 tracking-[0.2em] uppercase">
            {["Servicios", "Nosotros", "Galería", "Contacto"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`}
                className="hover:text-[#E07B2A] transition-colors">{l}</a>
            ))}
          </nav>
          <a href={waUrl("Hola, necesito un plomero.")}
            target="_blank" rel="noopener noreferrer"
            className="bg-[#E07B2A] text-white text-[10px] font-bold tracking-[0.2em] uppercase px-6 py-2.5 hover:bg-[#C86820] transition-colors">
            Solicitar servicio
          </a>
        </div>
      </header>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="bg-[#0D1117] min-h-[92vh] relative overflow-hidden flex items-center">
        {/* Background image */}
        <Image src="/images/plomero/hero.jpg" alt="HydroFix Plomería"
          fill className="object-cover opacity-25" priority />

        {/* Grid texture overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "linear-gradient(#E07B2A 1px, transparent 1px), linear-gradient(90deg, #E07B2A 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-20 w-full">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              {/* Category tag */}
              <div className="inline-flex items-center gap-2 border border-[#E07B2A]/40 text-[#E07B2A] text-[10px] font-bold tracking-[0.3em] uppercase px-4 py-2 mb-8">
                <Zap className="w-3 h-3" /> Servicio profesional · Tijuana
              </div>

              {/* Headline — oversized Bebas */}
              <h1 className={`${bebas.className} text-[clamp(4.5rem,12vw,9rem)] leading-[0.88] tracking-wider text-white mb-8`}>
                TU PLOMERO<br />
                <span className="text-[#E07B2A]">DE</span><br />
                CONFIANZA.
              </h1>

              <p className="text-white/50 text-base leading-relaxed mb-10 max-w-md">
                Más de 10 años resolviendo emergencias y remodelaciones en Tijuana. Llegamos en menos de 45 minutos. Garantía en todos los trabajos.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-12">
                <a href={waUrl("Hola, necesito un plomero urgente.")}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#E07B2A] text-white font-bold text-sm px-8 py-4 hover:bg-[#C86820] transition-all group">
                  <Zap className="w-4 h-4" /> Servicio de emergencia
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#servicios"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/60 text-sm font-medium px-8 py-4 hover:border-white/40 transition-all">
                  Ver servicios
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-6">
                {[
                  { icon: Shield,   text: "Garantía escrita" },
                  { icon: Clock,    text: "Llegada en 45 min" },
                  { icon: CheckCircle, text: "10+ años de exp." },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-white/40 text-xs">
                    <Icon className="w-3.5 h-3.5 text-[#E07B2A]" /> {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — stat block */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "10+",    label: "Años de experiencia",    color: "bg-[#E07B2A]" },
                { value: "2,400+", label: "Trabajos realizados",     color: "bg-[#0D1117] border border-white/10" },
                { value: "4.9★",  label: "Calificación en Google",  color: "bg-[#0D1117] border border-white/10" },
                { value: "45min",  label: "Tiempo de respuesta",     color: "bg-[#1A2235]" },
              ].map((s) => (
                <div key={s.label} className={`${s.color} p-8`}>
                  <p className={`${bebas.className} text-5xl text-white tracking-wide mb-2`}>{s.value}</p>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICIOS ─────────────────────────────────────── */}
      <section id="servicios" className="py-28 bg-[#F2F0EB] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-[auto_1fr] gap-16 items-end mb-16">
            <div>
              <p className="text-[#E07B2A] text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Lo que hacemos</p>
              <h2 className={`${bebas.className} text-6xl md:text-8xl text-[#0D1117] tracking-wider leading-none`}>
                SERVICIOS
              </h2>
            </div>
            <div className="pb-2">
              <p className="text-[#0D1117]/50 text-sm leading-relaxed max-w-md">
                Desde emergencias hasta remodelaciones completas. Presupuesto sin costo, materiales de calidad y garantía por escrito en cada trabajo.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0D1117]/10">
            {SERVICIOS.map((s) => (
              <div key={s.name}
                className="bg-[#F2F0EB] p-8 group hover:bg-[#0D1117] transition-all duration-300 cursor-pointer relative">
                {s.urgente && (
                  <span className="absolute top-5 right-5 text-[8px] font-bold uppercase tracking-widest bg-[#E07B2A] text-white px-2 py-0.5">
                    Urgente
                  </span>
                )}
                <div className="w-10 h-10 bg-[#E07B2A]/10 group-hover:bg-[#E07B2A]/20 flex items-center justify-center mb-6 transition-colors">
                  <s.icon className="w-5 h-5 text-[#E07B2A]" />
                </div>
                <h3 className={`${bebas.className} text-2xl tracking-wider text-[#0D1117] group-hover:text-white mb-3 transition-colors`}>
                  {s.name}
                </h3>
                <p className="text-[#0D1117]/50 group-hover:text-white/50 text-sm leading-relaxed transition-colors mb-6">
                  {s.desc}
                </p>
                <a href={waUrl(`Hola, necesito información sobre: ${s.name}`)}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#E07B2A] text-[10px] font-bold uppercase tracking-widest group-hover:text-[#E07B2A] hover:gap-3 transition-all">
                  Solicitar cotización <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOSOTROS / GALERÍA ────────────────────────────── */}
      <section id="nosotros" className="bg-[#0D1117] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-28">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <p className="text-[#E07B2A] text-[10px] font-bold uppercase tracking-[0.4em] mb-6">Quiénes somos</p>
              <h2 className={`${bebas.className} text-6xl md:text-7xl text-white tracking-wider leading-tight mb-8`}>
                PLOMERÍA<br />
                <span className="text-[#E07B2A]">SIN</span><br />
                SORPRESAS.
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-5">
                Somos un equipo de 8 técnicos certificados con más de una década resolviendo problemas de plomería en Tijuana. Nuestro compromiso: presupuesto transparente, trabajo limpio y garantía real.
              </p>
              <p className="text-white/50 text-sm leading-relaxed mb-10">
                Nunca te cobramos por la visita de diagnóstico. Si no hay trabajo, no hay cobro. Así de simple.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { check: "Diagnóstico gratuito" },
                  { check: "Garantía por escrito" },
                  { check: "Materiales de primera" },
                  { check: "Facturación disponible" },
                  { check: "Pago con tarjeta" },
                  { check: "Equipo uniformado" },
                ].map(({ check }) => (
                  <div key={check} className="flex items-center gap-2 text-white/60 text-xs">
                    <CheckCircle className="w-3.5 h-3.5 text-[#E07B2A] flex-shrink-0" /> {check}
                  </div>
                ))}
              </div>
            </div>
            {/* Team image */}
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src="/images/plomero/team.jpg" alt="Equipo HydroFix" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/60 to-transparent" />
              </div>
              {/* Floating stat */}
              <div className="absolute -bottom-5 -left-5 bg-[#E07B2A] p-6 text-center">
                <p className={`${bebas.className} text-4xl text-white tracking-wide`}>10+</p>
                <p className="text-white/70 text-[10px] uppercase tracking-widest">Años</p>
              </div>
            </div>
          </div>

          {/* Service image gallery */}
          <div id="galería" className="scroll-mt-20">
            <p className="text-[#E07B2A] text-[10px] font-bold uppercase tracking-[0.4em] mb-8">Nuestros trabajos</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {["service-1", "service-2", "service-3", "service-4"].map((img) => (
                <div key={img} className="relative aspect-square overflow-hidden group">
                  <Image src={`/images/plomero/${img}.jpg`} alt="Trabajo realizado"
                    fill className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ───────────────────────────────────── */}
      <section className="py-28 bg-[#F2F0EB]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-[#E07B2A] text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Lo que dicen</p>
              <h2 className={`${bebas.className} text-6xl md:text-7xl text-[#0D1117] tracking-wider`}>RESEÑAS</h2>
            </div>
            <div className="hidden md:flex items-center gap-2 text-[#0D1117]/30 text-xs font-semibold uppercase tracking-widest">
              <Star className="w-3.5 h-3.5 fill-[#E07B2A] text-[#E07B2A]" /> 4.9 en Google · +180 reseñas
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#0D1117]/10">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-[#F2F0EB] p-10 hover:bg-white transition-colors">
                <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#E07B2A] block mb-4">
                  {t.tag}
                </span>
                <div className="flex mb-4">
                  {[...Array(t.stars)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-[#E07B2A] fill-[#E07B2A]" />)}
                </div>
                <p className="text-[#0D1117]/70 text-sm leading-relaxed mb-8">"{t.text}"</p>
                <p className="text-[#0D1117] font-bold text-xs uppercase tracking-widest">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMERGENCY CTA ─────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <Image src="/images/plomero/emergency.jpg" alt="Emergencia plomería" fill className="object-cover opacity-20" />
        <div className="absolute inset-0 bg-[#0D1117]" />
        {/* Diagonal orange accent */}
        <div className="absolute top-0 left-0 w-2 h-full bg-[#E07B2A]" />

        <div className="relative z-10 max-w-7xl mx-auto px-10 md:px-16 py-28 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#E07B2A] text-[10px] font-bold uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 animate-pulse" /> Disponibles ahora mismo
            </p>
            <h2 className={`${bebas.className} text-6xl md:text-8xl text-white tracking-wider leading-none mb-6`}>
              ¿TIENES<br />
              <span className="text-[#E07B2A]">UNA</span><br />
              FUGA?
            </h2>
            <p className="text-white/50 text-base leading-relaxed">
              No esperes. Cada minuto con una fuga activa significa más daño y más gasto. Llámanos ahora y estamos en camino.
            </p>
          </div>
          <div id="contacto" className="scroll-mt-20 space-y-4">
            <a href={`tel:${EMPRESA.phone}`}
              className="flex items-center justify-between w-full bg-[#E07B2A] text-white font-bold px-8 py-5 hover:bg-[#C86820] transition-all group">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-70 mb-0.5">Llamar directo</p>
                  <p className="text-lg">{EMPRESA.phone}</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href={waUrl("Hola, tengo una emergencia de plomería.")}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between w-full bg-white/5 border border-white/10 text-white font-bold px-8 py-5 hover:bg-white/10 transition-all group">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-[#E07B2A]" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-70 mb-0.5">WhatsApp</p>
                  <p className="text-base">Enviar mensaje ahora</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex items-center gap-3 pt-2 text-white/30 text-xs">
              <MapPin className="w-3.5 h-3.5 text-[#E07B2A]" />
              <span>{EMPRESA.address}</span>
            </div>
            <div className="flex items-center gap-3 text-white/30 text-xs">
              <Clock className="w-3.5 h-3.5 text-[#E07B2A]" />
              <span>Disponible 24 horas, 7 días a la semana, 365 días al año</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="bg-[#080C12] text-white/30 py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#E07B2A] flex items-center justify-center">
                <Droplets className="w-3 h-3 text-white" />
              </div>
              <span className={`${bebas.className} text-xl text-white/60 tracking-widest`}>{EMPRESA.name}</span>
              <span className="text-[10px] uppercase tracking-widest text-white/20">{EMPRESA.tagline}</span>
            </div>
            <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest">
              <Link href="/demos/privacidad" className="hover:text-white/60 transition-colors">Privacidad</Link>
              <Link href="/demos/terminos" className="hover:text-white/60 transition-colors">Términos</Link>
            </div>
          </div>
          <p className="text-center text-white/10 text-[10px]">
            Sitio web diseñado por{" "}
            <Link href="/webs" className="hover:text-[#E07B2A] transition-colors underline">Luis Gaxiola</Link>
          </p>
        </div>
      </footer>

      <FloatingWidget
        phone={EMPRESA.phone}
        whatsapp={EMPRESA.whatsapp}
        googleMapsUrl={EMPRESA.mapsUrl}
        businessName={EMPRESA.name}
        businessType="salon"
      />
      <WantThisWebCTA />
    </div>
  );
}
