"use client";

import { useEffect } from "react";
import { Noto_Serif_JP, Noto_Sans_JP } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { Star, Phone, Instagram } from "lucide-react";
import FloatingWidget from "../../components/FloatingWidget";
import WantThisWebCTA from "../../components/WantThisWebCTA";
import { trackEvent } from "../../components/MetaPixel";

const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});
const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

const CONFIG = {
  name: "Atelier Blanc",
  tagline: "Spa & Belleza · Estilo Zen",
  phone: "+52 664 321 0987",
  whatsapp: "5216643210987",
  mapsUrl: "https://maps.google.com",
  address: "Av. Revolución 1500, Tijuana, B.C.",
  hours: "Lun–Sáb: 9:00am – 7:00pm",
  instagram: "atelierblanc_tij",
};

const SERVICES = [
  { name: "Corte Zen", price: "$320", desc: "Diseño preciso con consulta de forma de rostro y técnica japonesa." },
  { name: "Tratamiento Capilar", price: "$750", desc: "Ritual profundo de hidratación con activos naturales y vapor." },
  { name: "Color Natural", price: "$580", desc: "Tintes orgánicos sin amoníaco, colocados con técnica artesanal." },
  { name: "Facial Ritual", price: "$450", desc: "Limpieza profunda, mascarilla mineral y suero de aceite de rosa." },
  { name: "Manicure Orgánico", price: "$220", desc: "Cuidado completo con esmaltes libres de químicos dañinos." },
  { name: "Masaje Capilar", price: "$280", desc: "Técnica ayurvédica para estimular el cuero cabelludo y relajar." },
];

const TESTIMONIALS = [
  {
    name: "Valeria M.",
    text: "El ambiente del spa es completamente diferente. Salí sintiéndome renovada. El tratamiento capilar dejó mi cabello suave por semanas.",
    stars: 5,
  },
  {
    name: "Sofía L.",
    text: "Un espacio de paz en medio de la ciudad. Los productos que usan huelen increíble y la atención es delicada y profesional.",
    stars: 5,
  },
  {
    name: "Claudia R.",
    text: "Mi primer visita fue para un corte y volví cada mes. La consulta previa marca la diferencia. Ya no voy a ningún otro lugar.",
    stars: 5,
  },
];

export default function Salon2Page() {
  useEffect(() => {
    trackEvent("ViewContent", { content_name: "demo_salon2", content_category: "web_demo" });
  }, []);

  const waLink = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(
    `Hola ${CONFIG.name}, me gustaría agendar una cita.`
  )}`;

  return (
    <div className={`${notoSans.className} bg-[#FAFAFA] text-[#1C1C1C] min-h-screen`}>

      {/* DEMO BANNER */}
      <div className="bg-[#1C1C1C] text-white text-center py-2.5 px-4 text-xs tracking-widest z-50 relative">
        <span className="opacity-60">⚡ DEMO — Este diseño está disponible.</span>{" "}
        <Link href="/webs" className="underline font-semibold hover:opacity-70 transition-opacity">
          Solo se vende 1 vez →
        </Link>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#FAFAFA]/95 backdrop-blur-sm border-b border-[#1C1C1C]/8">
        <div className="max-w-5xl mx-auto px-8 py-5 flex items-center justify-between">
          <span className={`${notoSerif.className} text-xl font-light tracking-[0.2em] text-[#1C1C1C]`}>
            {CONFIG.name}
          </span>
          <nav className="hidden md:flex items-center gap-10 text-[10px] font-light text-[#1C1C1C]/50 tracking-[0.25em] uppercase">
            <a href="#servicios" className="hover:text-[#8FAF98] transition-colors">Servicios</a>
            <a href="#galeria" className="hover:text-[#8FAF98] transition-colors">Galería</a>
            <a href="#nosotros" className="hover:text-[#8FAF98] transition-colors">Nosotros</a>
          </nav>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-light tracking-[0.25em] uppercase border border-[#8FAF98] text-[#8FAF98] px-5 py-2 hover:bg-[#8FAF98] hover:text-white transition-all"
          >
            Agendar cita
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="py-32 md:py-48">
        <div className="max-w-5xl mx-auto px-8 flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1 text-center md:text-left">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#C4AA85] mb-8 font-light">
              Belleza · Bienestar · Armonía
            </p>
            <h1 className={`${notoSerif.className} text-5xl md:text-7xl font-light leading-[1.1] mb-8 text-[#1C1C1C]`}>
              El arte de<br />
              <span className="font-semibold text-[#8FAF98]">cuidarse</span><br />
              con calma.
            </h1>
            <p className={`${notoSans.className} text-sm font-light text-[#1C1C1C]/50 leading-relaxed mb-12 max-w-sm`}>
              Un espacio diseñado para desacelerar. Tratamientos de belleza con filosofía zen, productos naturales y una atención que te hace sentir que el tiempo no existe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1C1C1C] text-[#FAFAFA] text-[10px] tracking-[0.3em] uppercase font-light px-8 py-4 hover:bg-[#8FAF98] transition-colors"
              >
                Agendar cita
              </a>
              <a
                href="#servicios"
                className="border border-[#1C1C1C]/20 text-[#1C1C1C]/60 text-[10px] tracking-[0.3em] uppercase font-light px-8 py-4 hover:border-[#8FAF98] hover:text-[#8FAF98] transition-all"
              >
                Ver servicios
              </a>
            </div>
          </div>
          <div className="flex-1 relative w-full max-w-sm mx-auto">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/salon2/hero.jpg"
                alt="Atelier Blanc — Spa de belleza zen"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Decorative sage accent */}
            <div className="absolute -bottom-4 -left-4 w-3/4 h-3/4 border border-[#8FAF98]/30 -z-10" />
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#C4AA85]/20" />
          </div>
        </div>
      </section>

      {/* THIN DIVIDER */}
      <div className="max-w-5xl mx-auto px-8">
        <div className="h-px bg-[#1C1C1C]/8" />
      </div>

      {/* SERVICES — Elegant horizontal list */}
      <section id="servicios" className="py-32 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-20">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#C4AA85] mb-6 font-light">Nuestros servicios</p>
            <h2 className={`${notoSerif.className} text-4xl md:text-5xl font-light text-[#1C1C1C]`}>
              Rituales de belleza
            </h2>
          </div>
          <div className="divide-y divide-[#1C1C1C]/8">
            {SERVICES.map((service) => (
              <div
                key={service.name}
                className="flex items-center justify-between py-7 group hover:px-4 transition-all duration-300"
              >
                <div className="flex-1">
                  <h3 className={`${notoSerif.className} text-xl font-light text-[#1C1C1C] mb-1 group-hover:text-[#8FAF98] transition-colors`}>
                    {service.name}
                  </h3>
                  <p className="text-xs font-light text-[#1C1C1C]/40 leading-relaxed max-w-md">{service.desc}</p>
                </div>
                <span className={`${notoSerif.className} text-2xl font-light text-[#C4AA85] ml-8 flex-shrink-0`}>
                  {service.price}
                </span>
              </div>
            ))}
          </div>
          <div className="text-center mt-14">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-[0.3em] uppercase font-light text-[#1C1C1C]/50 border-b border-[#8FAF98]/50 pb-0.5 hover:text-[#8FAF98] hover:border-[#8FAF98] transition-all"
            >
              Consultar disponibilidad →
            </a>
          </div>
        </div>
      </section>

      {/* THIN DIVIDER */}
      <div className="max-w-5xl mx-auto px-8">
        <div className="h-px bg-[#1C1C1C]/8" />
      </div>

      {/* GALLERY — 3-col equal grid */}
      <section id="galeria" className="py-32 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#C4AA85] mb-6 font-light">El espacio</p>
            <h2 className={`${notoSerif.className} text-4xl font-light text-[#1C1C1C]`}>Nuestro atelier</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { src: "/images/salon2/gallery-1.jpg", alt: "Interior zen del spa" },
              { src: "/images/salon2/gallery-2.jpg", alt: "Área de tratamientos" },
              { src: "/images/salon2/gallery-3.jpg", alt: "Productos naturales" },
              { src: "/images/salon2/gallery-4.jpg", alt: "Zona de relajación" },
            ].map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden ${i === 0 ? "col-span-2 aspect-[4/3]" : "aspect-square"}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT — Image left / text right */}
      <section id="nosotros" className="py-32 bg-[#F5F2EE] scroll-mt-20">
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[3/4] overflow-hidden max-w-sm mx-auto md:mx-0">
              <Image
                src="/images/salon2/about.jpg"
                alt="Atelier Blanc — Equipo"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/20 to-transparent" />
            </div>
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#C4AA85] mb-8 font-light">Nuestra filosofía</p>
              <h2 className={`${notoSerif.className} text-4xl md:text-5xl font-light text-[#1C1C1C] mb-8 leading-tight`}>
                La belleza<br />
                <span className="text-[#8FAF98]">es un estado</span><br />
                de calma.
              </h2>
              <p className="text-sm font-light text-[#1C1C1C]/50 leading-relaxed mb-5">
                En Atelier Blanc creemos que la belleza verdadera emerge cuando el cuerpo y la mente están en armonía. Por eso diseñamos cada visita como un ritual completo, no solo un servicio.
              </p>
              <p className="text-sm font-light text-[#1C1C1C]/50 leading-relaxed mb-10">
                Usamos exclusivamente productos veganos y libres de parabenos. Nuestras especialistas se forman continuamente en técnicas japonesas y de bienestar holístico.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#1C1C1C]/8">
                {[
                  { value: "8+", label: "Años de experiencia" },
                  { value: "100%", label: "Productos naturales" },
                  { value: "4.9★", label: "Calificación Google" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className={`${notoSerif.className} text-2xl font-light text-[#8FAF98] mb-1`}>{stat.value}</p>
                    <p className="text-[9px] font-light uppercase tracking-widest text-[#1C1C1C]/40">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-32 bg-[#FAFAFA]">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#C4AA85] mb-6 font-light">Opiniones</p>
            <h2 className={`${notoSerif.className} text-4xl font-light text-[#1C1C1C]`}>Lo que dicen</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="border border-[#1C1C1C]/8 p-8">
                <div className="flex gap-0.5 mb-6">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-[#C4AA85] fill-[#C4AA85]" />
                  ))}
                </div>
                <p className={`${notoSerif.className} text-base font-light text-[#1C1C1C]/60 leading-relaxed mb-6 italic`}>
                  "{t.text}"
                </p>
                <p className="text-[10px] font-light tracking-[0.25em] uppercase text-[#8FAF98]">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-[#1C1C1C]">
        <div className="max-w-2xl mx-auto px-8 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#8FAF98] mb-8 font-light">Reservaciones</p>
          <h2 className={`${notoSerif.className} text-4xl md:text-6xl font-light text-[#FAFAFA] mb-8 leading-tight`}>
            Tu momento<br />de calma<br />
            <span className="text-[#8FAF98]">comienza aquí.</span>
          </h2>
          <p className="text-sm font-light text-[#FAFAFA]/40 leading-relaxed mb-12">
            Agenda tu cita en minutos. Te confirmamos disponibilidad el mismo día.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#8FAF98] text-white text-[10px] tracking-[0.3em] uppercase font-light px-12 py-4 hover:bg-[#C4AA85] transition-colors"
          >
            Agendar por WhatsApp
          </a>
          <p className="text-[#FAFAFA]/30 text-xs font-light mt-8">{CONFIG.phone}</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#141414] text-[#FAFAFA]/30 py-12">
        <div className="max-w-5xl mx-auto px-8">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
            <div>
              <span className={`${notoSerif.className} text-xl font-light text-[#FAFAFA]/60 block mb-2`}>
                {CONFIG.name}
              </span>
              <p className="text-[10px] tracking-widest uppercase text-[#FAFAFA]/20">{CONFIG.tagline}</p>
            </div>
            <div className="grid grid-cols-2 gap-x-16 gap-y-3 text-xs font-light">
              <div>
                <p className="text-[#FAFAFA]/15 uppercase tracking-widest text-[9px] mb-2">Horarios</p>
                <p>{CONFIG.hours}</p>
              </div>
              <div>
                <p className="text-[#FAFAFA]/15 uppercase tracking-widest text-[9px] mb-2">Contacto</p>
                <p>{CONFIG.phone}</p>
                <a
                  href={`https://instagram.com/${CONFIG.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 mt-1 hover:text-[#8FAF98] transition-colors"
                >
                  <Instagram className="w-3 h-3" /> @{CONFIG.instagram}
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-[#FAFAFA]/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px]">
            <p>© {new Date().getFullYear()} {CONFIG.name}. Todos los derechos reservados.</p>
            <div className="flex items-center gap-6">
              <Link href="/demos/privacidad" className="hover:text-[#FAFAFA]/60 transition-colors">Política de Privacidad</Link>
              <Link href="/demos/terminos" className="hover:text-[#FAFAFA]/60 transition-colors">Términos y Condiciones</Link>
              <Link href="/webs" className="hover:text-[#8FAF98] transition-colors">Webs</Link>
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
