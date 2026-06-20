"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const SUBSTACK_URL = "https://laempresade1persona.substack.com/";

function FadeUp({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-16 md:py-24 min-h-[88vh] flex items-center">
      <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-center">

        {/* Text column */}
        <div className="flex flex-col items-start space-y-8">
          <FadeUp delay={0}>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-black/40 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              ENTREPRENEUR · MEDIA BUYER · BUILDER
            </p>
          </FadeUp>

          <div className="space-y-0">
            {[
              { text: "CONSTRUYO", accent: false },
              { text: "SISTEMAS QUE", accent: false },
              { text: "GENERAN DINERO.", accent: true },
            ].map(({ text, accent }, i) => (
              <FadeUp key={text} delay={0.1 + i * 0.1}>
                <h1 className={`text-5xl md:text-7xl font-black tracking-tighter leading-none ${accent ? "text-[var(--accent)]" : "text-black"}`}>
                  {text}
                </h1>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.45}>
            <p className="text-xl md:text-2xl text-black/70 max-w-xl font-medium leading-relaxed">
              Más de{" "}
              <span className="text-black font-black">$45M generados en ventas</span> para mis
              clientes. Ahora construyo Chawoora y Craiber — y te cuento todo en mi newsletter.
            </p>
          </FadeUp>

          <FadeUp delay={0.55}>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[var(--accent)] text-white font-bold text-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
              >
                SUSCRÍBETE GRATIS <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                href="#servicios"
                className="px-8 py-4 border-2 border-black font-bold text-lg hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2 uppercase"
              >
                VER MIS SERVICIOS
              </Link>
            </div>
          </FadeUp>
        </div>

        {/* Photo column */}
        <motion.div
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="relative w-full md:w-[320px] lg:w-[360px] shrink-0"
        >
          {/* Accent offset frame */}
          <div className="absolute -top-3 -right-3 w-full h-full border-2 border-[var(--accent)] z-0" />

          <div className="relative z-10 overflow-hidden bg-gray-100">
            <Image
              src="/images/luis/hero.jpg"
              alt="Luis Gaxiola"
              width={360}
              height={450}
              className="w-full object-cover object-top"
              style={{ aspectRatio: "4/5" }}
              priority
              unoptimized
            />
          </div>

          {/* Location badge */}
          <div className="absolute -bottom-4 -left-4 z-20 bg-black text-white px-4 py-2 text-xs font-black uppercase tracking-widest whitespace-nowrap">
            MEXICALI, BC · MÉXICO
          </div>
        </motion.div>

      </div>
    </section>
  );
}
