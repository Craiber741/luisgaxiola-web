"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import type { AdsStats, NicheStats } from "@/lib/ads";
import AnimatedCounter from "./AnimatedCounter";

const money = (v: number) =>
  v.toLocaleString("es-MX", { maximumFractionDigits: 0 });
const dec = (v: number, d = 2) =>
  v.toLocaleString("es-MX", { minimumFractionDigits: d, maximumFractionDigits: d });

function LiveDot({ light = false }: { light?: boolean }) {
  const color = light ? "bg-red-500" : "bg-red-500";
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span
        className={`absolute inline-flex h-full w-full rounded-full ${color} opacity-75 animate-ping`}
      />
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${color}`} />
    </span>
  );
}

function NicheCard({ niche }: { niche: NicheStats }) {
  return (
    <div className="aspect-square flex flex-col p-5 md:p-6 border border-gray-200 bg-white hover:border-[var(--accent)] transition-colors">
      {/* Top: badge EN VIVO + nicho */}
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-red-600">
          <LiveDot />
          En vivo
        </span>
        <span className="text-[11px] md:text-xs font-black uppercase tracking-tight text-black/60 text-right leading-tight">
          {niche.niche}
        </span>
      </div>

      {/* Centro: métrica principal */}
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-4xl md:text-5xl font-black tracking-tighter text-black leading-none">
          ${money(niche.spend)}
        </p>
        <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 mt-2">
          Inversión · 7 días
        </p>
        <p className="text-xl md:text-2xl font-black tracking-tight text-[var(--accent)] mt-4">
          {money(niche.leads)}{" "}
          <span className="text-sm font-bold text-black/50">prospectos</span>
        </p>
      </div>

      {/* Abajo: CPL · CTR */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
        <span className="font-bold text-black/60">
          CPL{" "}
          <span className="text-black">
            {niche.cpl != null ? `$${dec(niche.cpl)}` : "—"}
          </span>
        </span>
        <span className="font-bold text-black/60">
          CTR <span className="text-black">{dec(niche.ctr)}%</span>
        </span>
      </div>
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
      <div className="max-w-5xl mx-auto px-4 py-20 md:py-24">
        <div className="flex items-center gap-2 mb-4">
          <LiveDot />
          <p className="text-xs font-black uppercase tracking-[0.3em] text-red-600">
            EN VIVO · ÚLTIMOS 7 DÍAS
          </p>
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 text-black leading-none">
          LO QUE MUEVO<br />
          <span className="text-[var(--accent)]">CADA SEMANA.</span>
        </h2>
        <p className="text-black/50 font-medium mb-12 max-w-xl">
          Datos reales de las cuentas que gestiono, agregados por nicho y anonimizados.
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
            <p className="text-xs text-white/50 font-medium">Prospectos generados</p>
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

        {/* Por nicho — tarjetas cuadradas */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
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
