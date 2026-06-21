"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Send } from "lucide-react";

const WHATSAPP = "523347605936"; // WhatsApp de Luis para el handoff

interface QuizProps {
  serviceName?: string;
}

type Question = { id: string; q: string; options: string[] };

const QUESTIONS: Question[] = [
  {
    id: "negocio",
    q: "¿Qué tipo de negocio tienes?",
    options: [
      "Servicios locales",
      "Inmobiliaria",
      "Salud o Dental",
      "Restaurante",
      "E-commerce",
      "Otro",
    ],
  },
  {
    id: "inversion",
    q: "¿Cuánto inviertes en publicidad al mes?",
    options: [
      "Aún no invierto",
      "Menos de $10k MXN",
      "$10k – $50k MXN",
      "$50k – $100k MXN",
      "Más de $100k MXN",
    ],
  },
  {
    id: "reto",
    q: "¿Cuál es tu mayor reto ahora?",
    options: [
      "Mis leads son caros",
      "Los leads no convierten",
      "No sé medir resultados",
      "No tengo tiempo de gestionarlo",
      "Quiero escalar",
    ],
  },
  {
    id: "cuando",
    q: "¿Para cuándo quieres resultados?",
    options: ["Ya mismo", "Este mes", "Solo estoy explorando"],
  },
];

const LABELS: Record<string, string> = {
  negocio: "Tipo de negocio",
  inversion: "Inversión mensual",
  reto: "Mayor reto",
  cuando: "Urgencia",
};

export default function Quiz({ serviceName = "Media Buying" }: QuizProps) {
  const totalSteps = QUESTIONS.length + 1; // preguntas + datos
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({ name: "", whatsapp: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const isContactStep = step === QUESTIONS.length;
  const progress = Math.round((step / totalSteps) * 100);

  function pick(qid: string, value: string) {
    setAnswers((a) => ({ ...a, [qid]: value }));
    setTimeout(() => setStep((s) => s + 1), 180); // micro-delay para feedback
  }

  function buildMessage() {
    const lines = QUESTIONS.map(
      (q) => `• ${LABELS[q.id]}: ${answers[q.id] || "—"}`
    );
    lines.push(`• WhatsApp: ${contact.whatsapp}`);
    return `Nuevo lead desde el quiz (${serviceName}):\n${lines.join("\n")}`;
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const message = buildMessage();
    const fd = new FormData();
    fd.append("name", contact.name);
    fd.append("email", contact.email);
    fd.append("service", serviceName);
    fd.append("subject", `Lead Quiz — ${serviceName}`);
    fd.append("message", message);

    try {
      const res = await fetch("/contact.php", { method: "POST", body: fd });
      // Abrir WhatsApp con las respuestas (handoff inmediato)
      const waText = encodeURIComponent(
        `Hola Luis, completé el quiz de ${serviceName}.\n${message}`
      );
      window.open(`https://wa.me/${WHATSAPP}?text=${waText}`, "_blank");

      if (res.ok) {
        setStatus("success");
      } else {
        // Aún con fallo de email, ya abrimos WhatsApp: lo damos por éxito suave
        setStatus("success");
      }
    } catch {
      // Sin conexión al backend: igual abrimos WhatsApp como respaldo
      const waText = encodeURIComponent(
        `Hola Luis, completé el quiz de ${serviceName}.\n${buildMessage()}`
      );
      window.open(`https://wa.me/${WHATSAPP}?text=${waText}`, "_blank");
      setStatus("success");
    }
  }

  if (status === "success") {
    return (
      <div className="w-full bg-black text-white p-8 md:p-12 border-l-8 border-[var(--accent)]">
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <CheckCircle2 className="w-16 h-16 text-[var(--accent)] mb-4" />
          <h3 className="text-2xl font-black mb-2 uppercase">¡Listo!</h3>
          <p className="text-white/60 max-w-sm">
            Recibí tus respuestas. Te abrí WhatsApp para que platiquemos directo. Si no se
            abrió,{" "}
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] font-bold underline"
            >
              escríbeme aquí
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-black text-white p-6 md:p-10 border-l-8 border-[var(--accent)]">
      {/* Progreso */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent)]">
            Paso {step + 1} de {totalSteps}
          </span>
          <span className="text-[10px] font-bold text-white/40">{progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-white/10">
          <div
            className="h-full bg-[var(--accent)] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {!isContactStep ? (
        <div>
          <h3 className="text-2xl md:text-3xl font-black mb-6 leading-tight">
            {QUESTIONS[step].q}
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {QUESTIONS[step].options.map((opt) => {
              const active = answers[QUESTIONS[step].id] === opt;
              return (
                <button
                  key={opt}
                  onClick={() => pick(QUESTIONS[step].id, opt)}
                  className={`w-full text-left p-4 md:p-5 border font-bold transition-all flex items-center justify-between group ${
                    active
                      ? "border-[var(--accent)] bg-[var(--accent)]/15"
                      : "border-white/10 bg-white/5 hover:border-[var(--accent)] hover:bg-white/10"
                  }`}
                >
                  {opt}
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 text-[var(--accent)] transition-opacity" />
                </button>
              );
            })}
          </div>

          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-white/40 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Atrás
            </button>
          )}
        </div>
      ) : (
        <form onSubmit={submit}>
          <h3 className="text-2xl md:text-3xl font-black mb-2 leading-tight">
            Último paso: ¿a dónde te contacto?
          </h3>
          <p className="text-white/50 text-sm mb-6">
            Reviso tu caso y te escribo personalmente.
          </p>
          <div className="space-y-4">
            <input
              required
              type="text"
              placeholder="Tu nombre"
              value={contact.name}
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 p-4 font-bold focus:outline-none focus:border-[var(--accent)] transition-colors placeholder:text-white/20"
            />
            <input
              required
              type="tel"
              placeholder="Tu WhatsApp"
              value={contact.whatsapp}
              onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
              className="w-full bg-white/5 border border-white/10 p-4 font-bold focus:outline-none focus:border-[var(--accent)] transition-colors placeholder:text-white/20"
            />
            <input
              required
              type="email"
              placeholder="Tu email"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              className="w-full bg-white/5 border border-white/10 p-4 font-bold focus:outline-none focus:border-[var(--accent)] transition-colors placeholder:text-white/20"
            />
          </div>

          {status === "error" && (
            <div className="flex items-center gap-2 text-red-500 font-bold bg-red-500/10 p-4 mt-4">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <button
            disabled={status === "loading"}
            className="mt-6 w-full py-4 bg-[var(--accent)] text-white font-black text-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 uppercase tracking-tighter disabled:opacity-50 disabled:cursor-wait"
          >
            {status === "loading" ? "ENVIANDO..." : "VER SI CALIFICO"}
            <Send className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-white/40 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Atrás
          </button>
        </form>
      )}
    </div>
  );
}
