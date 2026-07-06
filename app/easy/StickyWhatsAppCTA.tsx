"use client";

import { useEffect, useState } from "react";
import { QuizCTA } from "./tracking";

/**
 * CTA fijo en mobile que acompaña el scroll por las secciones previas al quiz.
 * Se oculta cuando el quiz entra al viewport (para no tapar el botón de envío).
 */
export default function StickyWhatsAppCTA() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const quiz = document.getElementById("quiz");
    if (!quiz) return;
    const observer = new IntersectionObserver(
      (entries) => setHidden(entries[0]?.isIntersecting ?? false),
      { threshold: 0.15 }
    );
    observer.observe(quiz);
    return () => observer.disconnect();
  }, []);

  if (hidden) return null;

  return (
    <div className="lg-sticky">
      <QuizCTA source="sticky" label="Ver si mi negocio califica" />
    </div>
  );
}
