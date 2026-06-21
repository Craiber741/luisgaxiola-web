"use client";

import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { AdsStats, NicheStats } from "@/lib/ads";
import AnimatedCounter from "./AnimatedCounter";

const money = (v: number) =>
  v.toLocaleString("es-MX", { maximumFractionDigits: 0 });
const dec = (v: number, d = 2) =>
  v.toLocaleString("es-MX", { minimumFractionDigits: d, maximumFractionDigits: d });

function NicheCard({ niche }: { niche: NicheStats }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 bg-white hover:border-[var(--accent)] transition-colors">
      <div className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-black uppercase tracking-tight text-black">
            {niche.niche}
          </h3>
          <span className="text-[10px] font-black uppercase tracking-widest text-black/40">
            {niche.accountCount} {niche.accountCount === 1 ? "cuenta" : "cuentas"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-black tracking-tighter text-black">
              ${money(niche.spend)}
            </p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 mt-1">
              Inversión
            </p>
          </div>
          <div>
            <p className="text-2xl font-black tracking-tighter text-black">
              {money(niche.leads)}
            </p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 mt-1">
              Leads
            </p>
          </div>
          <div>
            <p className="text-2xl font-black tracking-tighter text-[var(--accent)]">
              {niche.cpl != null ? `$${dec(niche.cpl)}` : "—"}
            </p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 mt-1">
              CPL prom.
            </p>
          </div>
          <div>
            <p className="text-2xl font-black tracking-tighter text-black">
              {dec(niche.ctr)}%
            </p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 mt-1">
              CTR prom.
            </p>
          </div>
        </div>
      </div>

      {niche.accounts.length > 1 && (
        <>
          <button
            onClick={() => setOpen((o) => !o)}
            className="w-full flex items-center justify-center gap-1 py-2.5 border-t border-gray-100 text-[10px] font-black uppercase tracking-widest text-black/50 hover:text-black hover:bg-gray-50 transition-colors"
          >
            {open ? "Ocultar" : "Ver desglose"}
            <ChevronDown
              className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
          {open && (
            <div className="border-t border-gray-100 divide-y divide-gray-100">
              {niche.accounts.map((a) => (
                <div
                  key={a.label}
                  className="px-6 py-3 grid grid-cols-4 gap-2 text-xs"
                >
                  <span className="font-bold text-black/70 col-span-1">{a.label}</span>
                  <span className="text-black/60 text-right">${money(a.spend)}</span>
                  <span className="text-black/60 text-right">{money(a.leads)} lds</span>
                  <span className="text-[var(--accent)] font-bold text-right">
                    {a.cpl != null ? `$${dec(a.cpl)}` : "—"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function LiveAdsStats({ data }: { data: AdsStats | null }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  if (!data || data.niches.length === 0) return null;

  const t = data.totals;

  return (
    <section
      ref={ref}
      id="resultados"
      className="w-full bg-gray-50 border-t border-gray-200 scroll-mt-16"
    >
      <div className="max-w-5xl mx-auto px-4 py-24">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-black/40 mb-4">
          RESULTADOS REALES · ÚLTIMOS 7 DÍAS
        </p>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 text-black leading-none">
          LO QUE MUEVO<br />
          <span className="text-[var(--accent)]">CADA SEMANA.</span>
        </h2>
        <p className="text-black/50 font-medium mb-14 max-w-xl">
          Datos en vivo de las cuentas que gestiono, agregados por nicho y anonimizados.
          No son promesas — es lo que está pasando ahora mismo.
        </p>

        {/* Totales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 bg-black p-8 md:p-10 mb-12">
          <div className="flex flex-col items-start gap-1">
            <AnimatedCounter
              target={t.spend}
              prefix="$"
              inView={inView}
              className="text-3xl md:text-4xl font-black tracking-tighter text-white"
            />
            <p className="text-xs text-white/50 font-medium">Inversión gestionada (USD)</p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <AnimatedCounter
              target={t.leads}
              inView={inView}
              className="text-3xl md:text-4xl font-black tracking-tighter text-white"
            />
            <p className="text-xs text-white/50 font-medium">Leads generados</p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <AnimatedCounter
              target={t.cpl ?? 0}
              prefix="$"
              decimals={2}
              inView={inView}
              className="text-3xl md:text-4xl font-black tracking-tighter text-[var(--accent)]"
            />
            <p className="text-xs text-white/50 font-medium">CPL promedio</p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <AnimatedCounter
              target={t.ctr}
              suffix="%"
              decimals={2}
              inView={inView}
              className="text-3xl md:text-4xl font-black tracking-tighter text-white"
            />
            <p className="text-xs text-white/50 font-medium">CTR promedio</p>
          </div>
        </div>

        {/* Por nicho */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.niches.map((n) => (
            <NicheCard key={n.niche} niche={n} />
          ))}
        </div>

        <p className="text-[10px] text-black/30 font-medium mt-8 uppercase tracking-widest">
          Datos agregados y anonimizados de cuentas gestionadas · Meta Ads · cifras en USD · actualizado a diario
        </p>
      </div>
    </section>
  );
}
