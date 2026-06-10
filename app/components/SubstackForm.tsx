"use client";

import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

interface SubstackFormProps {
  substackUrl: string;
  subscriberCount?: string;
}

const bullets = [
  "Casos reales de campañas (con números, no teoría)",
  "Detrás de escena de Chawoora y Craiber",
  "Estrategias que aplico antes de publicarlas en redes",
];

export default function SubstackForm({ substackUrl, subscriberCount }: SubstackFormProps) {
  return (
    <section className="w-full bg-black text-white border-t-4 border-[var(--accent)]">
      <div className="max-w-5xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-center">

          {/* Copy */}
          <AnimatedSection direction="left">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--accent)] mb-6">
              MI NEWSLETTER EN SUBSTACK
            </p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6 text-white">
              ESTRATEGIAS QUE<br />
              <span className="text-[var(--accent)]">NO PUBLICO EN REDES.</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mb-10 font-medium">
              Cada semana: lo que estoy aprendiendo construyendo mis ventures, campañas que
              están funcionando ahora mismo y lo que nadie del gremio se atreve a publicar.
            </p>

            <ul className="flex flex-col gap-4 mb-12">
              {bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3 text-white/80 font-medium">
                  <Check className="w-5 h-5 text-[var(--accent)] mt-0.5 shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>

            <a
              href={substackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-black text-lg uppercase tracking-wide hover:bg-[var(--accent)] hover:text-white transition-all"
            >
              SUSCRIBIRME GRATIS <ArrowRight className="w-5 h-5" />
            </a>

            {subscriberCount && (
              <p className="mt-6 text-sm text-white/40 font-medium">
                {subscriberCount} suscriptores. Sin spam. Sin bullshit.
              </p>
            )}
          </AnimatedSection>

          {/* Photo */}
          <AnimatedSection direction="right" delay={0.2} className="hidden md:block">
            <div className="relative w-[260px] shrink-0">
              <div className="overflow-hidden border-2 border-white/20 shadow-2xl">
                <Image
                  src="/images/luis/cafe.jpg"
                  alt="Luis Gaxiola tomando café"
                  width={260}
                  height={320}
                  className="w-full object-cover object-center"
                  style={{ aspectRatio: "4/5" }}
                  unoptimized
                />
              </div>
              {/* Accent corner */}
              <div className="absolute -bottom-3 -right-3 w-full h-full border border-[var(--accent)]/40 z-[-1]" />
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
