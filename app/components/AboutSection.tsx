"use client";

import Image from "next/image";
import { Zap, TrendingUp, Code2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const traits = [
  { icon: TrendingUp, text: "Media Buyer con track record de $45M+ en ventas generadas para clientes" },
  { icon: Code2, text: "Builder de productos: Chawoora (SaaS omnicanal) y Craiber (comunidad de marketing)" },
  { icon: Zap, text: "Obsesionado con sistemas: si no escala, no vale. Todo debe correr sin mí." },
];

export default function AboutSection() {
  return (
    <section id="sobre-mi" className="w-full scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Photo stack */}
          <AnimatedSection direction="left" className="relative">
            {/* Main photo */}
            <div className="relative z-10">
              <div className="relative overflow-hidden">
                <Image
                  src="/images/luis/working.jpg"
                  alt="Luis Gaxiola trabajando"
                  width={480}
                  height={560}
                  className="w-full object-cover object-center"
                  style={{ aspectRatio: "5/6" }}
                  unoptimized
                />
                {/* Accent overlay strip at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--accent)]" />
              </div>
            </div>

            {/* Floating small photo */}
            <div className="absolute -bottom-6 -right-6 z-20 w-36 md:w-44 border-4 border-white shadow-xl overflow-hidden">
              <Image
                src="/images/luis/cafe.jpg"
                alt="Luis Gaxiola tomando café"
                width={180}
                height={180}
                className="w-full object-cover object-center"
                style={{ aspectRatio: "1/1" }}
                unoptimized
              />
            </div>

            {/* Background decorative square */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border border-[var(--accent)]/30 z-0" />
          </AnimatedSection>

          {/* Text column */}
          <AnimatedSection direction="right" delay={0.15} className="flex flex-col gap-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--accent)] mb-4">
                QUIÉN SOY
              </p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight text-black mb-6">
                UN BUILDER QUE<br />
                TAMBIÉN VENDE.
              </h2>
              <p className="text-lg text-black/70 font-medium leading-relaxed mb-3">
                Soy Luis Gaxiola. Empecé como media buyer y aprendí que los anuncios son solo
                el acelerador — el sistema es lo que importa.
              </p>
              <p className="text-lg text-black/70 font-medium leading-relaxed">
                Hoy manejo campañas para clientes, construyo herramientas que uso yo mismo
                y comparto todo lo que aprendo en mi newsletter. Sin filtros.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {traits.map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 bg-[var(--accent)]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[var(--accent)]" />
                  </div>
                  <p className="text-black/80 font-medium text-sm leading-relaxed pt-2">{text}</p>
                </div>
              ))}
            </div>

          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
