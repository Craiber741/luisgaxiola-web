// Cliente para enviar eventos al CAPI (Edge Function meta-capi).
// No bloqueante y tolerante a fallos: si no está configurado, hace no-op.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : undefined;
}

/** Lee _fbp y _fbc (construye _fbc desde fbclid si Meta aún no puso la cookie). */
export function getFbCookies(fbclid?: string): { fbp?: string; fbc?: string } {
  const fbp = getCookie("_fbp");
  let fbc = getCookie("_fbc");
  if (!fbc && fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
  return { fbp, fbc };
}

export type CapiUserData = {
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  fbp?: string;
  fbc?: string;
};

/**
 * Envía un evento al CAPI vía la Edge Function. Usa el mismo event_id que el Pixel
 * para deduplicar. Devuelve sin lanzar si algo falla.
 */
export async function sendCapiEvent(params: {
  eventName: string;
  eventId: string;
  userData?: CapiUserData;
  customData?: Record<string, unknown>;
}): Promise<void> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return;
  try {
    await fetch(`${SUPABASE_URL}/functions/v1/meta-capi`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        event_name: params.eventName,
        event_id: params.eventId,
        event_source_url: typeof window !== "undefined" ? window.location.href : undefined,
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
        user_data: params.userData ?? {},
        custom_data: params.customData ?? {},
      }),
      keepalive: true,
    });
  } catch (err) {
    console.error("[sendCapiEvent] fallo (no bloqueante):", err);
  }
}
