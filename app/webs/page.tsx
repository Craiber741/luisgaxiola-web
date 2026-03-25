"use client";

import { useState } from "react";
import { Geist } from "next/font/google";
import { ArrowRight, Check, Scissors, UtensilsCrossed, Wrench, Building2, ChevronLeft, AlertTriangle, ExternalLink } from "lucide-react";
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

const SITES = [
  {
    available: true,
    tipo: "salon",
    badge: "DISPONIBLE",
    label: "Salón de Belleza",
    icon: Scissors,
    desc: "Hero editorial, servicios con precios, galería, testimoniales, widget de WhatsApp y agenda de citas.",
    href: "/web2",
  },
  {
    available: true,
    tipo: "restaurante",
    badge: "DISPONIBLE",
    label: "Restaurante / Café",
    icon: UtensilsCrossed,
    desc: "Menú de temporada, galería de platillos, reservaciones por WhatsApp, horarios y ubicación.",
    href: "/demos/restaurante",
  },
  {
    available: true,
    tipo: "servicios",
    badge: "DISPONIBLE",
    label: "Plomería / Servicios",
    icon: Wrench,
    desc: "Tira de emergencia 24/7, servicios con CTA directo, galería de trabajos y reseñas de clientes.",
    href: "/demos/plomero",
  },
  {
    available: false,
    tipo: "otro",
    badge: "PRÓXIMAMENTE",
    label: "Más industrias",
    icon: Building2,
    desc: "Clínicas, despachos, gimnasios, talleres y más. Escríbenos si tienes otro tipo de negocio.",
    href: "#",
  },
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
            </div>
          )}

          {/* ── TIPO ──────────────────────────────── */}
          {step === "tipo" && (
            <div className="pt-16">
              <p className="text-white/40 text-sm font-medium mb-3">Pregunta 1 de 4</p>
              <h2 className="text-3xl md:text-4xl font-black mb-10">
                ¿Qué tipo de<br />negocio tienes?
              </h2>
              <div className="space-y-4">
                {[
                  { icon: Scissors, label: "Salón de belleza / Estética", value: "salon" },
                  { icon: UtensilsCrossed, label: "Restaurante / Café / Bar", value: "restaurante" },
                  { icon: Building2, label: "Otro tipo de negocio", value: "otro" },
                ].map((opt) => (
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
                    <span className="font-semibold text-white/80 group-hover:text-white transition-colors">{opt.label}</span>
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-[var(--accent)] ml-auto transition-all group-hover:translate-x-1" />
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
              <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl px-4 py-3 mb-10">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                <p className="text-yellow-200 text-sm font-medium">
                  <strong>Diseños únicos.</strong> Cada sitio se vende una sola vez. Una vez vendido, no se vuelve a comercializar ese diseño.
                </p>
              </div>

              <p className="text-white/40 text-sm font-medium mb-3">Resultados para {lead.nombre}</p>
              <h2 className="text-3xl font-black mb-2">Sitios disponibles</h2>
              <p className="text-white/40 mb-10">
                Incluye dominio · 3 correos corporativos · Hosting 1 año
              </p>

              <div className="space-y-4 mb-12">
                {SITES.map((site) => (
                  <div
                    key={site.label}
                    className={`border rounded-2xl overflow-hidden ${
                      site.available
                        ? "border-[var(--accent)]/60 bg-[var(--accent)]/5"
                        : "border-white/10 bg-white/3 opacity-50"
                    }`}
                  >
                    <div className="px-6 py-5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${site.available ? "bg-[var(--accent)]/20" : "bg-white/5"}`}>
                          <site.icon className={`w-5 h-5 ${site.available ? "text-[var(--accent)]" : "text-white/30"}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="font-bold text-white">{site.label}</p>
                            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                              site.available ? "bg-[var(--accent)] text-white" : "bg-white/10 text-white/40"
                            }`}>
                              {site.badge}
                            </span>
                          </div>
                          <p className="text-white/40 text-xs">{site.desc}</p>
                        </div>
                      </div>
                      {site.available && (
                        <Link href={site.href} target="_blank" className="shrink-0 ml-4">
                          <span className="flex items-center gap-1 text-[var(--accent)] text-xs font-bold hover:underline">
                            Ver demo <ExternalLink className="w-3 h-3" />
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>

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
