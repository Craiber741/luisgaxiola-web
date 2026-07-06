"use client";

import "./landing.css";
import { useEffect, useRef } from "react";
import { LandingTrackingProvider, TrackOnView } from "./tracking";
import StickyWhatsAppCTA from "./StickyWhatsAppCTA";
import Hero from "./sections/Hero";
import Stats from "./sections/Stats";
import Historia from "./sections/Historia";
import Problema from "./sections/Problema";
import ComoTrabajo from "./sections/ComoTrabajo";
import Captacion from "./sections/Captacion";
import Resultados from "./sections/Resultados";
import ServicioPrecio from "./sections/ServicioPrecio";
import LandingQuiz from "./sections/LandingQuiz";
import FAQ from "./sections/FAQ";

export default function LandingRoot() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    // Sin IntersectionObserver no activamos el modo animado: el contenido queda visible.
    if (typeof IntersectionObserver === "undefined") return;

    root.classList.add("lg-anim");
    const sections = Array.from(root.querySelectorAll<HTMLElement>(".lg-section"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.01, rootMargin: "0px 0px -10% 0px" }
    );
    sections.forEach((s) => observer.observe(s));

    // Red de seguridad: si por lo que sea algo no se revela, a los 5s se muestra todo.
    // (Crítico: es tráfico pagado; nunca dejar contenido oculto.)
    const safety = window.setTimeout(() => {
      sections.forEach((s) => s.classList.add("is-in"));
    }, 5000);

    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return (
    <LandingTrackingProvider>
      <main ref={rootRef} className="landing-root">
        <div className="lg-texture" aria-hidden />
        {/* 1 */} <Hero />
        {/* Métricas reales (prueba social alta en la página) */} <Stats />
        {/* 2 */} <TrackOnView eventName="scroll_historia">
          <Historia />
        </TrackOnView>
        {/* 3 */} <TrackOnView eventName="scroll_problema">
          <Problema />
        </TrackOnView>
        {/* 4 */} <ComoTrabajo />
        {/* 4b */} <Captacion />
        {/* 5 */} <Resultados />
        {/* 6 */} <TrackOnView eventName="scroll_pricing">
          <ServicioPrecio />
        </TrackOnView>
        {/* 7 */} <LandingQuiz />
        {/* 8 */} <FAQ />

        <StickyWhatsAppCTA />
      </main>
    </LandingTrackingProvider>
  );
}
