// Envía a Meta (vía Edge Function meta-crm) el cambio de etapa de un lead de nuestro
// "CRM" en Supabase. Se llama desde /admin cuando cambias la etapa de un lead.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const LEAD_EVENT_SOURCE = "Supabase CRM";

// Etapas de nuestro CRM → nombre de evento en Meta.
export const STAGES = ["nuevo", "calificado", "cita", "cliente", "perdido"] as const;
export type Stage = (typeof STAGES)[number];

export const STAGE_LABEL: Record<Stage, string> = {
  nuevo: "Nuevo",
  calificado: "Calificado",
  cita: "Cita agendada",
  cliente: "Cliente",
  perdido: "Perdido",
};

const STAGE_EVENT: Record<Stage, string> = {
  nuevo: "Lead",
  calificado: "Qualified",
  cita: "Schedule",
  cliente: "Customer",
  perdido: "Disqualified",
};

// Reconstruye el fbc de Meta a partir del fbclid guardado (para el match).
function buildFbc(fbclid?: string | null, createdAt?: string | null): string | undefined {
  if (!fbclid) return undefined;
  const ts = createdAt ? new Date(createdAt).getTime() : Date.now();
  return `fb.1.${ts}.${fbclid}`;
}

export type CrmLead = {
  name?: string | null;
  whatsapp?: string | null;
  answers?: Record<string, string> | null;
  temperature?: string | null;
  fbclid?: string | null;
  created_at?: string | null;
};

/**
 * Manda el evento de etapa a Meta. No bloqueante: si falla o no está configurado,
 * devuelve { ok:false } sin lanzar.
 */
export async function sendCrmEvent(lead: CrmLead, stage: Stage): Promise<{ ok: boolean }> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return { ok: false };

  const parts = (lead.name ?? "").trim().split(/\s+/).filter(Boolean);
  const first_name = parts[0];
  const last_name = parts.length > 1 ? parts.slice(1).join(" ") : undefined;

  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/meta-crm`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        event_name: STAGE_EVENT[stage],
        lead_event_source: LEAD_EVENT_SOURCE,
        event_time: Math.floor(Date.now() / 1000),
        user_data: {
          phone: lead.whatsapp ?? undefined,
          first_name,
          last_name,
          fbc: buildFbc(lead.fbclid, lead.created_at),
        },
        custom_data: {
          stage,
          temperature: lead.temperature ?? undefined,
          ...(lead.answers ?? {}),
        },
      }),
      keepalive: true,
    });
    return { ok: res.ok };
  } catch (err) {
    console.error("[sendCrmEvent] fallo (no bloqueante):", err);
    return { ok: false };
  }
}
