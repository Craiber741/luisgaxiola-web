"use client";
import { useState } from "react";
import { X, MessageCircle, ArrowRight } from "lucide-react";

interface WhatsAppFormProps {
  whatsapp: string;
  businessName: string;
  businessType: "salon" | "restaurant";
  onClose: () => void;
}

const questions = {
  salon: [
    { label: "¿Qué servicio te interesa?", placeholder: "Ej: Corte, Color, Manicure..." },
    { label: "¿Cuándo te gustaría tu cita?", placeholder: "Ej: Este sábado por la tarde" },
    { label: "¿Cuál es tu nombre?", placeholder: "Tu nombre completo" },
  ],
  restaurant: [
    { label: "¿Para cuántas personas es la reserva?", placeholder: "Ej: 4 personas" },
    { label: "¿Qué fecha y hora prefieres?", placeholder: "Ej: Viernes 20 a las 8pm" },
    { label: "¿A nombre de quién?", placeholder: "Tu nombre completo" },
  ],
};

export default function WhatsAppForm({ whatsapp, businessName, businessType, onClose }: WhatsAppFormProps) {
  const qs = questions[businessType];
  const [answers, setAnswers] = useState(["", "", ""]);
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < qs.length - 1) {
      setStep(step + 1);
    } else {
      const msg =
        businessType === "salon"
          ? `Hola ${businessName} 👋 Me interesa agendar una cita.\n\nServicio: ${answers[0]}\nFecha preferida: ${answers[1]}\nNombre: ${answers[2]}`
          : `Hola ${businessName} 👋 Me gustaría hacer una reservación.\n\nPersonas: ${answers[0]}\nFecha y hora: ${answers[1]}\nNombre: ${answers[2]}`;
      const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`;
      window.open(url, "_blank");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm px-4 pb-4 sm:pb-0">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#25D366] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">{businessName}</p>
              <p className="text-white/80 text-xs">Responde en minutos</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Progress dots */}
          <div className="flex gap-2 mb-6">
            {qs.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  i <= step ? "bg-[#25D366]" : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          <p className="font-semibold text-gray-800 mb-3">{qs[step].label}</p>
          <input
            type="text"
            value={answers[step]}
            onChange={(e) => {
              const next = [...answers];
              next[step] = e.target.value;
              setAnswers(next);
            }}
            onKeyDown={(e) => e.key === "Enter" && answers[step] && handleNext()}
            placeholder={qs[step].placeholder}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#25D366] transition-colors"
            autoFocus
          />

          <button
            onClick={handleNext}
            disabled={!answers[step].trim()}
            className="mt-4 w-full bg-[#25D366] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-40 hover:bg-[#20bb5a] transition-colors"
          >
            {step < qs.length - 1 ? "Siguiente" : "Enviar por WhatsApp"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
