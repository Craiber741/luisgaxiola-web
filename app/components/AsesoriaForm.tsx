"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "./MetaPixel";

// WhatsApp de Luis (código de país, sin +).
const WHATSAPP_NUMBER = "523347605936";

const INVERSION = ["Menos de $1,000 USD", "$1,000 – $5,000 USD", "$5,000 – $10,000 USD", "Más de $10,000 USD"];

const field =
  "w-full bg-transparent border-b border-white/20 py-3 text-ink placeholder:text-white/30 focus:border-accent focus:outline-none transition-colors";

export default function AsesoriaForm() {
  const [nombre, setNombre] = useState("");
  const [negocio, setNegocio] = useState("");
  const [inversion, setInversion] = useState("");
  const [reto, setReto] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const msg =
      `Hola Luis, quiero aplicar a la asesoría 1 a 1.\n\n` +
      `Nombre: ${nombre}\nNegocio: ${negocio}\nInversión mensual en ads: ${inversion}\n` +
      `Lo que quiero resolver: ${reto}`;
    trackEvent("Lead", { content_name: "Asesoría 1 a 1" });
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-6">
      <label className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-[0.2em] text-white/50">Nombre</span>
        <input required value={nombre} onChange={(e) => setNombre(e.target.value)} className={field} placeholder="Tu nombre" />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-[0.2em] text-white/50">Negocio</span>
        <input required value={negocio} onChange={(e) => setNegocio(e.target.value)} className={field} placeholder="Qué vendes y dónde" />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-[0.2em] text-white/50">Inversión mensual en ads</span>
        <select required value={inversion} onChange={(e) => setInversion(e.target.value)} className={`${field} [&>option]:bg-coal`}>
          <option value="" disabled>Selecciona</option>
          {INVERSION.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-[0.2em] text-white/50">Qué quieres resolver</span>
        <textarea required rows={3} value={reto} onChange={(e) => setReto(e.target.value)} className={`${field} resize-none`} placeholder="En dos o tres líneas" />
      </label>
      <button
        type="submit"
        className="mt-4 inline-flex items-center justify-center gap-3 bg-ink text-coal px-8 py-4 text-sm uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-colors"
      >
        Enviar aplicación <ArrowRight className="w-4 h-4" />
      </button>
      <p className="text-xs text-white/40">Se abre WhatsApp con tus respuestas ya escritas.</p>
    </form>
  );
}
