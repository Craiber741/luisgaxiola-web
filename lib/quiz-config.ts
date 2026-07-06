// Copy centralizado del quiz de la landing (5 pasos).
// Editar aquí las preguntas/opciones sin tocar el componente.

export type QuizQuestion = {
  id: "industria" | "hace_publicidad" | "presupuesto" | "urgencia";
  q: string;
  options: string[];
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "industria",
    q: "¿A qué se dedica tu negocio?",
    options: [
      "Dental / Salud",
      "Bienes Raíces",
      "Gimnasio / Fitness",
      "Restaurante",
      "Seguros",
      "Otro",
    ],
  },
  {
    id: "hace_publicidad",
    q: "¿Ya haces publicidad en Facebook o Instagram?",
    options: ["Sí, ya hago", "No, nunca he hecho", "Antes hacía y lo dejé"],
  },
  {
    id: "presupuesto",
    q: "¿Cuánto gastas (o piensas gastar) al mes en publicidad?",
    options: [
      "Menos de $8,000",
      "$8,000 – $15,000",
      "$15,000 – $30,000",
      "Más de $30,000",
    ],
  },
  {
    id: "urgencia",
    q: "¿Cuándo te gustaría empezar?",
    options: ["Esta semana", "Este mes", "Solo estoy viendo opciones"],
  },
];

// Etiquetas cortas para el mensaje de WhatsApp / panel admin.
export const QUIZ_LABELS: Record<QuizQuestion["id"], string> = {
  industria: "Tipo de negocio",
  hace_publicidad: "Ya hace publicidad",
  presupuesto: "Presupuesto",
  urgencia: "Cuándo quiere empezar",
};

// Número de WhatsApp de Luis (con código de país, sin +, sin espacios).
export const WHATSAPP_NUMBER = "523347605936";
