"use client";

import { useState } from "react";
import { Geist } from "next/font/google";
import { ArrowRight, Check, Scissors, UtensilsCrossed, Wrench, ChevronLeft, AlertTriangle, ExternalLink, Eye } from "lucide-react";
import Link from "next/link";
import { trackEvent } from "../components/MetaPixel";

const geist = Geist({ subsets: ["latin"] });

// ─── CONFIG ────────────────────────────────────────────────────────────────
// TODO: Reemplaza con tu URL de webhook de Chawoora
const CHAWOORA_WEBHOOK_URL = "CHAWOORA_WEBHOOK_URL_AQUI";
// TODO: Reemplaza con el número de WhatsApp de cierre de ventas (con código de país)
const WA_VENTAS = "5216641234567";

type Step = "intro" | "tipo" | "nombre" | "email" | "ciudad" | "resultado";

interface LeadData {
  tipo: string;
  nombre: string;
  telefono: string;
  email: string;
  ciudad: string;
}

// ─── DEMOS POR CATEGORÍA ───────────────────────────────────────────────────
const DEMOS: Record<string, { label: string; style: string; href: string }[]> = {
  salon: [
    { label: "Studio Lumière",  style: "Editorial alta moda · Bodoni · Rose-red",      href: "/web2" },
    { label: "Atelier Blanc",   style: "Zen japonés · Noto Serif · Sage green",         href: "/demos/salon2" },
    { label: "GLOW STUDIO",     style: "Gen-Z bold · Syne · Hot pink & yellow",         href: "/demos/salon3" },
  ],
  restaurante: [
    { label: "Casa Fuego",      style: "Dark luxury editorial · Cormorant · Terracota", href: "/demos/restaurante" },
    { label: "El Taquero",      style: "Street food vibrante · Archivo Black · Rojo",   href: "/demos/restaurante2" },
    { label: "Trattoria Rossi", style: "Italiana rústica · Playfair · Verde bosque",    href: "/demos/restaurante3" },
  ],
  servicios: [
    { label: "HydroFix",        style: "Plomería · Industrial · Bebas Neue · Cobre",    href: "/demos/plomero" },
    { label: "Volt Pro",        style: "Electricista · Tech · Rajdhani · Amarillo",     href: "/demos/electricista" },
    { label: "MotoFix",         style: "Mecánico automotriz · Barlow · Naranja",        href: "/demos/mecanico" },
  ],
};

const CATEGORIAS = [
  { value: "salon",      icon: Scissors,      label: "Salón de Belleza",       sub: "Estética, nail bar, spa" },
  { value: "restaurante",icon: UtensilsCrossed,label: "Restaurante / Café",    sub: "Taquería, fonda, bar" },
  { value: "servicios",  icon: Wrench,         label: "Servicios a Domicilio", sub: "Plomero, electricista, mecánico" },
];

export default function WebsQuiz() {
  const [step, setStep] = useState<Step>("intro");
  const [lead, setLead] = useState<Partial<LeadData>>({});
  const [loading, setLoading] = useState(false);

  const STEPS: Step[] = ["intro", "tipo", "nombre", "email", "ciudad", "resultado"];
  const currentIdx = STEPS.indexOf(step);
  const progressSteps: Step[] = ["tipo", "nombre", "email", "ciudad"];

  async function submitLead(finalData: LeadData) {
    setLoading(true);
    try {
      await fetch(CHAWOORA_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: finalData.nombre,
          phone: finalData.telefono,
          email: finalData.email,
          city: finalData.ciudad,
          businessType: finalData.tipo,
          source: "quiz-luisgaxiola-webs",
          tags: ["web-lead", finalData.tipo, "meta-ads"],
        }),
      });
    } catch {
      // Fallo silencioso — no bloqueamos la experiencia del usuario
    }
    trackEvent("Lead", { content_name: finalData.tipo, content_category: "web_sale" });
    setLoading(false);
    setStep("resultado");
  }

  return (
    <div className={`${geist.className} min-h-screen bg-[#0A0A0A] text-white flex flex-col`}>

      {/* Progress bar (solo en pasos del quiz) */}
      {progressSteps.includes(step as Step) && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A] border-b border-white/10 px-6 py-4">
          <div className="max-w-xl mx-auto flex items-center gap-4">
            {step !== "tipo" && (
              <button onClick={() => setStep(STEPS[currentIdx - 1] as Step)} className="text-white/40 hover:text-white transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <div className="flex gap-1.5 flex-1">
              {progressSteps.map((s) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    progressSteps.indexOf(s) <= progressSteps.indexOf(step as Step)
                      ? "bg-[var(--accent)]"
                      : "bg-white/10"
                  }`}
                />
              ))}
            </div>
            <span className="text-white/30 text-xs font-medium tabular-nums">
              {progressSteps.indexOf(step as Step) + 1}/4
            </span>
          </div>
        </div>
      )}

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-xl">

          {/* ── INTRO ─────────────────────────────── */}
          {step === "intro" && (
            <div className="text-center">
              <p className="text-[var(--accent)] text-xs font-bold uppercase tracking-[0.3em] mb-8">
                SITIOS WEB PARA NEGOCIOS LOCALES
              </p>
              <h1 className="text-5xl md:text-6xl font-black leading-none tracking-tight mb-6">
                ¿Tu negocio<br />
                <span className="text-[var(--accent)]">merece más</span><br />
                clientes?
              </h1>
              <p className="text-white/50 text-lg mb-12 max-w-md mx-auto leading-relaxed">
                Responde 4 preguntas rápidas y te mostramos el sitio web perfecto para tu negocio.
              </p>
              <button
                onClick={() => {
                  trackEvent("InitiateCheckout", { content_name: "quiz_start" });
                  setStep("tipo");
                }}
                className="inline-flex items-center gap-3 bg-[var(--accent)] text-white font-bold text-lg px-10 py-5 rounded-full hover:brightness-110 transition-all"
              >
                EMPEZAR — ES GRATIS <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-white/20 text-xs mt-6">Sin compromiso. Sin spam. Solo 60 segundos.</p>

              {/* Preview de demos disponibles */}
              <div className="mt-16 pt-12 border-t border-white/5 text-left">
                <p className="text-white/20 text-[10px] uppercase tracking-[0.3em] mb-6 text-center">9 diseños disponibles ahora mismo</p>
                {CATEGORIAS.map((cat) => (
                  <div key={cat.value} className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <cat.icon className="w-3.5 h-3.5 text-white/30" />
                      <span className="text-white/30 text-xs font-bold uppercase tracking-widest">{cat.label}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {DEMOS[cat.value].map((d) => (
                        <Link key={d.href} href={d.href} target="_blank"
                          className="bg-white/3 border border-white/8 rounded-xl px-3 py-2.5 hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5 transition-all group text-center">
                          <p className="text-white/60 text-xs font-semibold group-hover:text-white transition-colors truncate">{d.label}</p>
                          <p className="text-[var(--accent)] text-[9px] mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Ver →</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TIPO ──────────────────────────────── */}
          {step === "tipo" && (
            <div className="pt-16">
              <p className="text-white/40 text-sm font-medium mb-3">Pregunta 1 de 4</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">
                ¿Qué tipo de<br />negocio tienes?
              </h2>
              <p className="text-white/40 text-sm mb-8">Cada categoría tiene 3 diseños exclusivos disponibles.</p>
              <div className="space-y-4">
                {CATEGORIAS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setLead({ ...lead, tipo: opt.value });
                      setStep("nombre");
                    }}
                    className="w-full flex items-center gap-5 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-all group text-left"
                  >
                    <div className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-[var(--accent)]/10 transition-colors shrink-0">
                      <opt.icon className="w-5 h-5 text-white/60 group-hover:text-[var(--accent)] transition-colors" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white/80 group-hover:text-white transition-colors">{opt.label}</p>
                      <p className="text-white/30 text-xs mt-0.5">{opt.sub}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-bold bg-[var(--accent)]/20 text-[var(--accent)] px-2 py-0.5 rounded-full">3 diseños</span>
                      <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-[var(--accent)] transition-all group-hover:translate-x-1" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── NOMBRE + TELÉFONO ─────────────────── */}
          {step === "nombre" && (
            <div className="pt-16">
              <p className="text-white/40 text-sm font-medium mb-3">Pregunta 2 de 4</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">¿Cómo te llamas?</h2>
              <p className="text-white/40 mb-8">Y danos un teléfono para enviarte los detalles.</p>
              <div className="space-y-4">
                <input
                  type="text"
                  value={lead.nombre ?? ""}
                  onChange={(e) => setLead({ ...lead, nombre: e.target.value })}
                  placeholder="Tu nombre completo"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[var(--accent)] transition-colors text-lg"
                  autoFocus
                />
                <input
                  type="tel"
                  value={lead.telefono ?? ""}
                  onChange={(e) => setLead({ ...lead, telefono: e.target.value })}
                  placeholder="Teléfono (con código de país si es de México: 52...)"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>
              <button
                onClick={() => setStep("email")}
                disabled={!lead.nombre?.trim() || !lead.telefono?.trim()}
                className="mt-6 w-full bg-[var(--accent)] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-30 hover:brightness-110 transition-all"
              >
                Continuar <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ── EMAIL ─────────────────────────────── */}
          {step === "email" && (
            <div className="pt-16">
              <p className="text-white/40 text-sm font-medium mb-3">Pregunta 3 de 4</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">¿Tu correo?</h2>
              <p className="text-white/40 mb-8">Te enviamos un resumen de las opciones disponibles.</p>
              <input
                type="email"
                value={lead.email ?? ""}
                onChange={(e) => setLead({ ...lead, email: e.target.value })}
                placeholder="tunegocio@ejemplo.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[var(--accent)] transition-colors text-lg"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && lead.email?.trim() && setStep("ciudad")}
              />
              <button
                onClick={() => setStep("ciudad")}
                disabled={!lead.email?.trim()}
                className="mt-6 w-full bg-[var(--accent)] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-30 hover:brightness-110 transition-all"
              >
                Continuar <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-white/20 text-xs text-center mt-3">Sin spam. Solo los detalles de tu sitio.</p>
            </div>
          )}

          {/* ── CIUDAD ────────────────────────────── */}
          {step === "ciudad" && (
            <div className="pt-16">
              <p className="text-white/40 text-sm font-medium mb-3">Pregunta 4 de 4</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">¿En qué ciudad está tu negocio?</h2>
              <p className="text-white/40 mb-8">Esto nos ayuda a personalizar tu propuesta.</p>
              <input
                type="text"
                value={lead.ciudad ?? ""}
                onChange={(e) => setLead({ ...lead, ciudad: e.target.value })}
                placeholder="Ej: Tijuana, Guadalajara, CDMX..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[var(--accent)] transition-colors text-lg"
                autoFocus
              />
              <button
                onClick={() => submitLead(lead as LeadData)}
                disabled={!lead.ciudad?.trim() || loading}
                className="mt-6 w-full bg-[var(--accent)] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-30 hover:brightness-110 transition-all"
              >
                {loading ? "Un momento..." : "VER LOS SITIOS DISPONIBLES"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          )}

          {/* ── RESULTADO ─────────────────────────── */}
          {step === "resultado" && (
            <div className="pt-4">
              {/* Scarcity banner */}
              <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl px-4 py-3 mb-8">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                <p className="text-yellow-200 text-sm font-medium">
                  <strong>Diseños únicos.</strong> Cada sitio se vende una sola vez. Una vez vendido, no se vuelve a comercializar ese diseño.
                </p>
              </div>

              <p className="text-white/40 text-sm font-medium mb-2">Hola, {lead.nombre} 👋</p>
              <h2 className="text-3xl font-black mb-2">Elige tu diseño</h2>
              <p className="text-white/40 text-sm mb-8">
                Los 3 diseños disponibles para tu tipo de negocio. Cada uno tiene su propio estilo — el tuyo es el que más te identifique.
              </p>

              {/* 3 demos filtrados por tipo */}
              <div className="space-y-3 mb-10">
                {(DEMOS[lead.tipo ?? "salon"] ?? DEMOS.salon).map((demo, i) => (
                  <div key={demo.href} className="border border-[var(--accent)]/40 bg-[var(--accent)]/5 rounded-2xl px-5 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="text-[var(--accent)] font-black text-xl tabular-nums shrink-0">0{i + 1}</span>
                      <div className="min-w-0">
                        <p className="font-bold text-white truncate">{demo.label}</p>
                        <p className="text-white/35 text-xs truncate">{demo.style}</p>
                      </div>
                    </div>
                    <Link href={demo.href} target="_blank" className="shrink-0">
                      <span className="flex items-center gap-1.5 bg-white/10 hover:bg-[var(--accent)] text-white text-xs font-bold px-4 py-2 rounded-full transition-all">
                        <Eye className="w-3 h-3" /> Ver demo
                      </span>
                    </Link>
                  </div>
                ))}
              </div>

              {/* También ver otras categorías */}
              <details className="mb-10 group">
                <summary className="text-white/30 text-xs cursor-pointer hover:text-white/50 transition-colors list-none flex items-center gap-2 mb-3">
                  <ExternalLink className="w-3 h-3" /> Ver demos de otras categorías
                </summary>
                {Object.entries(DEMOS).filter(([k]) => k !== lead.tipo).map(([cat, demos]) => (
                  <div key={cat} className="mb-3">
                    <p className="text-white/20 text-[10px] uppercase tracking-widest mb-2 capitalize">{cat}</p>
                    {demos.map((d) => (
                      <Link key={d.href} href={d.href} target="_blank"
                        className="flex items-center justify-between px-4 py-2 rounded-xl hover:bg-white/5 transition-colors">
                        <span className="text-white/50 text-xs">{d.label}</span>
                        <ExternalLink className="w-3 h-3 text-white/20" />
                      </Link>
                    ))}
                  </div>
                ))}
              </details>

              {/* Pricing */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-white/50 text-sm mb-1">Precio de lanzamiento</p>
                    <p className="text-4xl font-black text-white">$5,100 <span className="text-lg font-normal text-white/40">MXN</span></p>
                    <p className="text-white/40 text-xs mt-1">12 meses sin intereses con tarjeta de crédito</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/30 text-xs">Renovación anual</p>
                    <p className="text-white/60 font-bold">$2,299 MXN</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {["Dominio incluido (1 año)", "3 correos corporativos", "Hosting incluido", "SSL/HTTPS", "Optimizado para SEO", "Entrega en 7–10 días"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-white/50 text-xs">
                      <Check className="w-3 h-3 text-[var(--accent)] shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA WhatsApp */}
              <a
                href={`https://wa.me/${WA_VENTAS}?text=${encodeURIComponent(
                  `Hola, vi los sitios web disponibles y me interesa apartar uno.\n\nNombre: ${lead.nombre}\nNegocio: ${lead.tipo}\nCiudad: ${lead.ciudad}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("Purchase", { value: 5100, currency: "MXN" })}
                className="block w-full bg-[#25D366] text-white font-black text-lg py-5 rounded-2xl text-center hover:brightness-105 transition-all"
              >
                APARTAR MI SITIO WEB AHORA →
              </a>
              <p className="text-white/20 text-xs text-center mt-3">
                Escríbenos por WhatsApp y aseguramos el diseño para tu negocio.
              </p>
            </div>
          )}

        </div>
      </div>

      {/* Footer mínimo */}
      <div className="border-t border-white/5 py-6 text-center">
        <p className="text-white/20 text-xs">
          Sitios web por{" "}
          <span className="text-white/40 font-bold">Luis Gaxiola</span>
          {" · "}
          <Link href="/demos/privacidad" className="hover:text-white/50 transition-colors">Privacidad</Link>
          {" · "}
          <Link href="/demos/terminos" className="hover:text-white/50 transition-colors">Términos</Link>
        </p>
      </div>
    </div>
  );
}
