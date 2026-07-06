import { getSupabase } from "./supabase";

export type QuizAnswers = {
  industria?: string;
  hace_publicidad?: string;
  presupuesto?: string;
  urgencia?: string;
};

export type Temperature = "hot" | "warm" | "cold";

export type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
};

/**
 * Califica el lead a partir de sus respuestas.
 * Alineado con el "Esto no es para ti si..." del copy:
 *  - presupuesto "Menos de $8,000"           => cold (descalificado)
 *  - presupuesto >= $15,000 y urgencia "Esta semana" => hot
 *  - el resto                                 => warm
 * `score` es un valor numérico auxiliar para ordenar en el panel.
 */
export function scoreLead(answers: QuizAnswers): { score: number; temperature: Temperature } {
  const presupuesto = answers.presupuesto ?? "";
  const urgencia = answers.urgencia ?? "";

  let score = 0;
  if (presupuesto.includes("Más de $30,000")) score += 4;
  else if (presupuesto.includes("$15,000")) score += 3;
  else if (presupuesto.includes("$8,000")) score += 2;
  // "Menos de $8,000" no suma

  if (urgencia.includes("Esta semana")) score += 3;
  else if (urgencia.includes("Este mes")) score += 2;

  let temperature: Temperature = "warm";
  if (presupuesto.startsWith("Menos de")) {
    temperature = "cold";
  } else if (
    (presupuesto.includes("$15,000") || presupuesto.includes("Más de $30,000")) &&
    urgencia.includes("Esta semana")
  ) {
    temperature = "hot";
  }

  return { score, temperature };
}

/** Lee los UTM + fbclid del querystring actual (solo en navegador). */
export function captureUtms(): UtmParams {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const pick = (k: string) => p.get(k) ?? undefined;
  return {
    utm_source: pick("utm_source"),
    utm_medium: pick("utm_medium"),
    utm_campaign: pick("utm_campaign"),
    utm_content: pick("utm_content"),
    utm_term: pick("utm_term"),
    fbclid: pick("fbclid"),
  };
}

/**
 * Registra un evento del funnel en Supabase (espejo de los eventos de Pixel).
 * No bloqueante: si falla o Supabase no está configurado, hace no-op silencioso.
 */
export async function logFunnelEvent(
  sessionId: string,
  eventName: string,
  step?: number,
  metadata: Record<string, unknown> = {}
): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;
  try {
    await supabase.from("funnel_events").insert({
      session_id: sessionId,
      event_name: eventName,
      step: step ?? null,
      metadata,
    });
  } catch (err) {
    console.error("[logFunnelEvent] fallo al registrar evento:", err);
  }
}

export type SaveLeadInput = {
  name: string;
  whatsapp: string;
  answers: QuizAnswers;
  sessionId: string;
  utms: UtmParams;
};

/**
 * Guarda el lead en Supabase. No bloqueante: si falla, loguea el error pero
 * NO detiene el flujo (el handoff a WhatsApp debe ocurrir de todos modos).
 * Devuelve la temperatura calculada para poder disparar HotLead en el Pixel.
 */
export async function saveLead(
  input: SaveLeadInput
): Promise<{ ok: boolean; temperature: Temperature }> {
  const { score, temperature } = scoreLead(input.answers);
  const supabase = getSupabase();
  if (!supabase) return { ok: false, temperature };

  try {
    const { error } = await supabase.from("leads").insert({
      name: input.name,
      whatsapp: input.whatsapp,
      answers: input.answers,
      score,
      temperature,
      session_id: input.sessionId,
      ...input.utms,
    });
    if (error) {
      console.error("[saveLead] error de Supabase:", error.message);
      return { ok: false, temperature };
    }
    return { ok: true, temperature };
  } catch (err) {
    console.error("[saveLead] excepción:", err);
    return { ok: false, temperature };
  }
}
