"use client";

import { useState } from "react";
import { useLandingTracking } from "../tracking";
import { saveLead, type QuizAnswers } from "../../../lib/leads";
import {
  QUIZ_QUESTIONS,
  QUIZ_LABELS,
  WHATSAPP_NUMBER,
} from "../../../lib/quiz-config";

type Status = "idle" | "sending" | "done";

const TOTAL_STEPS = QUIZ_QUESTIONS.length + 1; // 4 preguntas + contacto

export default function LandingQuiz() {
  const { track, trackStandard, sessionId, utms } = useLandingTracking();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [contact, setContact] = useState({ name: "", whatsapp: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [step5Fired, setStep5Fired] = useState(false);

  const isContactStep = step === QUIZ_QUESTIONS.length;
  const progress = Math.round((step / TOTAL_STEPS) * 100);

  function pick(key: keyof QuizAnswers, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    // quiz_step_1..4 con la respuesta elegida
    track(`quiz_step_${step + 1}`, { step: step + 1, metadata: { answer: value } });
    setTimeout(() => {
      const next = step + 1;
      setStep(next);
      // Al llegar a la pantalla de contacto (paso 5)
      if (next === QUIZ_QUESTIONS.length && !step5Fired) {
        setStep5Fired(true);
        track("quiz_step_5_started", { step: 5 });
      }
    }, 160);
  }

  function goBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  function buildWhatsAppMessage(): string {
    const industria = answers.industria ?? "-";
    const hace = answers.hace_publicidad ?? "-";
    const presupuesto = answers.presupuesto ?? "-";
    const urgencia = answers.urgencia ?? "-";
    return (
      `Hola, respondí las preguntas de tu página: ` +
      `Tipo de negocio: ${industria}, ` +
      `Ya hace publicidad: ${hace}, ` +
      `Presupuesto: ${presupuesto}, ` +
      `Cuándo quiere empezar: ${urgencia}, ` +
      `Nombre: ${contact.name || "-"}`
    );
  }

  async function submit() {
    setError("");
    if (!contact.name.trim()) {
      setError("Por favor escribe tu nombre.");
      return;
    }
    // Validación básica de WhatsApp: al menos 10 dígitos
    const digits = contact.whatsapp.replace(/\D/g, "");
    if (digits.length < 10) {
      setError("Escribe un número de WhatsApp válido (mínimo 10 dígitos).");
      return;
    }

    setStatus("sending");

    // 1) Guardar el lead en Supabase (no bloqueante: si falla, seguimos igual).
    let temperature: "hot" | "warm" | "cold" = "warm";
    try {
      const res = await saveLead({
        name: contact.name.trim(),
        whatsapp: contact.whatsapp.trim(),
        answers,
        sessionId,
        utms,
      });
      temperature = res.temperature;
    } catch (err) {
      console.error("[LandingQuiz] saveLead falló, continuamos con WhatsApp:", err);
    }

    // 2) Eventos de conversión: custom + estándar Lead (con industria y presupuesto).
    //    capi:true → se duplican por CAPI (server-side) con el mismo event_id.
    const userData = {
      phone: contact.whatsapp.trim(),
      first_name: contact.name.trim().split(/\s+/)[0],
    };
    track("quiz_completed", { metadata: { ...answers, temperature }, capi: true, userData });
    trackStandard(
      "Lead",
      { industria: answers.industria, presupuesto: answers.presupuesto },
      { capi: true, userData }
    );

    // 3) Lead caliente
    if (temperature === "hot") {
      track("HotLead", { metadata: { ...answers }, capi: true, userData });
    }

    // 4) Justo antes de la redirección real a wa.me
    track("whatsapp_redirect");

    // 5) Handoff a WhatsApp con mensaje prellenado
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage())}`;
    setStatus("done");
    window.location.href = url;
  }

  return (
    <section id="quiz" className="lg-section">
      <div className="lg-container">
        <span className="lg-eyebrow">4 preguntas rápidas</span>

        <div className="lg-card" style={{ padding: 22 }}>
          {/* Barra de progreso */}
          <div style={{ marginBottom: 22 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
                fontWeight: 700,
                color: "var(--lg-muted)",
                marginBottom: 8,
              }}
            >
              <span style={{ color: "var(--lg-accent)" }}>
                Paso {Math.min(step + 1, TOTAL_STEPS)} de {TOTAL_STEPS}
              </span>
              <span>{progress}%</span>
            </div>
            <div
              style={{
                height: 6,
                width: "100%",
                background: "var(--lg-border)",
                borderRadius: 99,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "var(--lg-accent)",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>

          {!isContactStep ? (
            <div>
              <h2 style={{ fontSize: 22, marginBottom: 18 }}>{QUIZ_QUESTIONS[step].q}</h2>
              <div style={{ display: "grid", gap: 10 }}>
                {QUIZ_QUESTIONS[step].options.map((opt) => {
                  const active = answers[QUIZ_QUESTIONS[step].id] === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => pick(QUIZ_QUESTIONS[step].id, opt)}
                      className="lg-option"
                      data-active={active ? "true" : "false"}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {step > 0 && (
                <button type="button" onClick={goBack} className="lg-back">
                  ← Atrás
                </button>
              )}
            </div>
          ) : (
            <div>
              <h2 style={{ fontSize: 22, marginBottom: 8 }}>¿Cómo te contacto?</h2>
              <p style={{ fontSize: 14, marginBottom: 18 }}>
                Arrancar cuesta $10,000 pesos (pago único) y el mantenimiento mensual es de $5,000
                pesos. Incluye tu página, dominio y hospedaje.
              </p>

              <div style={{ display: "grid", gap: 12 }}>
                <input
                  type="text"
                  inputMode="text"
                  placeholder="Tu nombre"
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  className="lg-input"
                />
                <input
                  type="tel"
                  inputMode="tel"
                  placeholder="Tu WhatsApp"
                  value={contact.whatsapp}
                  onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
                  className="lg-input"
                />
              </div>

              {error && (
                <p style={{ color: "#f87171", fontSize: 14, marginTop: 12, marginBottom: 0 }}>
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={submit}
                disabled={status === "sending"}
                className="lg-cta"
                style={{ marginTop: 18, opacity: status === "sending" ? 0.6 : 1 }}
              >
                {status === "sending" ? "Enviando..." : "Hablar contigo por WhatsApp"}
              </button>

              <button type="button" onClick={goBack} className="lg-back">
                ← Atrás
              </button>
            </div>
          )}
        </div>

        {/* Resumen de respuestas seleccionadas (confianza / claridad) */}
        {Object.keys(answers).length > 0 && !isContactStep && (
          <p style={{ fontSize: 13, marginTop: 14, marginBottom: 0 }}>
            {QUIZ_QUESTIONS.slice(0, step)
              .filter((q) => answers[q.id])
              .map((q) => `${QUIZ_LABELS[q.id]}: ${answers[q.id]}`)
              .join("  ·  ")}
          </p>
        )}
      </div>
    </section>
  );
}
