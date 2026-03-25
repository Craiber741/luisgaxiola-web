import Link from "next/link";
import { ArrowRight, Check, ArrowLeft } from "lucide-react";
import ContactForm from "../components/ContactForm";

const included = [
  "Diseño profesional personalizado a tu marca",
  "Hosting incluido (1 año)",
  "Dominio incluido (1 año)",
  "SSL/HTTPS incluido",
  "Optimizado para SEO básico",
  "Adaptado para móvil (responsive)",
  "Formulario de contacto funcional",
  "Entrega en 7–10 días hábiles",
];

const templates = [
  {
    available: true,
    badge: "DISPONIBLE AHORA",
    category: "CLÍNICA DENTAL",
    name: "Sitio para Consultorio Dental",
    description:
      "Landing page optimizada para agendar citas. Incluye sección de servicios, formulario de cita en línea, galería de casos, testimoniales y mapa de ubicación.",
    cta: "QUIERO ESTE →",
  },
  {
    available: false,
    badge: "PRÓXIMAMENTE",
    category: "RESTAURANTE / CAFÉ",
    name: "En desarrollo...",
    description: "Menú digital, reservaciones, galería y ubicación.",
    cta: "NOTIFICARME",
  },
  {
    available: false,
    badge: "PRÓXIMAMENTE",
    category: "DESPACHO JURÍDICO",
    name: "En desarrollo...",
    description: "Áreas de práctica, equipo, blog legal y formulario de consulta.",
    cta: "NOTIFICARME",
  },
];

const reasons = [
  {
    title: "SIN INTERMEDIARIOS",
    desc: "Tratas directamente con quien diseña y construye el sitio. Sin account managers. Sin teléfono descompuesto.",
  },
  {
    title: "PRECIO CLARO",
    desc: "$4,000 MXN al año y ya. Sin contratos trampa, sin cobros sorpresa, sin cláusulas escondidas.",
  },
  {
    title: "CON CRITERIO DE MARKETING",
    desc: "El sitio se diseña para captar clientes, no para ganar premios de diseño. Cada sección tiene un propósito.",
  },
];

export default function WebPage() {
  return (
    <main className="flex flex-col bg-white selection:bg-[var(--accent)] selection:text-white">

      {/* Back link */}
      <div className="max-w-5xl mx-auto px-4 pt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-black/50 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> VOLVER
        </Link>
      </div>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 py-16 md:py-24">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-black/40 mb-6">
          SITIOS WEB PROFESIONALES
        </p>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none text-black mb-6">
          TU NEGOCIO<br />
          MERECE UN SITIO<br />
          <span className="text-[var(--accent)]">QUE VENDA.</span>
        </h1>
        <p className="text-xl md:text-2xl text-black/70 max-w-2xl font-medium mb-8">
          No un portafolio. Un sistema de captación de clientes. Diseñado para convertir desde el primer clic.
        </p>
        <div className="inline-block bg-[var(--accent)]/10 border border-[var(--accent)]/30 px-6 py-4 mb-10">
          <span className="text-2xl font-black text-[var(--accent)]">$4,000 MXN / año</span>
          <span className="text-black/60 font-medium ml-3">— Todo incluido.</span>
        </div>
        <div>
          <a
            href="#plantillas"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-white font-bold text-lg hover:brightness-110 transition-all uppercase tracking-wide"
          >
            VER PLANTILLAS DISPONIBLES <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Value stack */}
      <section className="w-full bg-gray-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-24">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-3 text-black uppercase">
            QUÉ INCLUYE
          </h2>
          <p className="text-black/50 font-medium mb-12">Todo lo que necesitas para salir en línea hoy.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {included.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white border border-gray-100 px-6 py-4">
                <Check className="w-5 h-5 text-[var(--accent)] mt-0.5 shrink-0" />
                <span className="font-medium text-black">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Template gallery */}
      <section id="plantillas" className="w-full scroll-mt-16 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-24">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-3 text-black uppercase">
            PLANTILLAS DISPONIBLES
          </h2>
          <p className="text-black/50 font-medium mb-16">Elige una base y la adaptamos a tu negocio en días.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {templates.map((t, i) => (
              <div
                key={i}
                className={`border p-8 flex flex-col ${
                  t.available
                    ? "border-[var(--accent)] bg-white hover:shadow-[0_0_30px_-10px_var(--accent)] transition-all"
                    : "border-gray-200 bg-gray-50 opacity-60"
                }`}
              >
                <span
                  className={`inline-block text-xs font-black uppercase tracking-widest px-3 py-1 mb-5 w-fit ${
                    t.available
                      ? "bg-[var(--accent)] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {t.badge}
                </span>
                <p className="text-xs font-black uppercase tracking-widest text-black/40 mb-2">{t.category}</p>
                <h3 className="text-xl font-black text-black mb-4">{t.name}</h3>

                {/* Preview placeholder */}
                <div className="aspect-video bg-gray-100 border border-gray-200 flex items-center justify-center mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">VISTA PREVIA</span>
                </div>

                <p className="text-black/60 font-medium mb-8 text-sm flex-1">{t.description}</p>

                {t.available ? (
                  <a
                    href="#contacto"
                    className="inline-flex items-center gap-2 font-black text-[var(--accent)] hover:gap-3 transition-all uppercase text-sm"
                  >
                    {t.cta} <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="font-black text-gray-400 uppercase text-sm">{t.cta}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Luis */}
      <section className="w-full bg-black border-t-4 border-[var(--accent)]">
        <div className="max-w-5xl mx-auto px-4 py-24">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-3 text-white uppercase">
            ¿POR QUÉ COMPRARME A MÍ
          </h2>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-16 text-[var(--accent)] uppercase">
            Y NO A UNA AGENCIA?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reasons.map((r, i) => (
              <div key={i} className="border border-white/10 p-8 hover:border-[var(--accent)]/50 transition-all">
                <h3 className="text-lg font-black text-[var(--accent)] mb-4 uppercase">{r.title}</h3>
                <p className="text-white/70 font-medium leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contacto" className="w-full scroll-mt-16 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-24">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-3 text-black uppercase">
            AGENDA TU SITIO AHORA
          </h2>
          <p className="text-black/50 font-medium mb-16">
            Cuéntame qué negocio tienes y te preparo una propuesta en 24 horas.
          </p>
          <ContactForm serviceName="Sitio Web" />
        </div>
      </section>

    </main>
  );
}
