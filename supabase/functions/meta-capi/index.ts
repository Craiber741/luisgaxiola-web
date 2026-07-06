// Supabase Edge Function: Meta Conversions API (CAPI) — server-side.
// Recibe eventos del navegador y los reenvía a Meta con el mismo event_id que el
// Pixel del cliente, para deduplicar. Hashea la PII (email/teléfono/nombre) con SHA-256.
//
// Deploy:
//   supabase functions deploy meta-capi --no-verify-jwt
// Secrets (una sola vez):
//   supabase secrets set META_PIXEL_ID=1332956858393579
//   supabase secrets set META_CAPI_TOKEN=<TOKEN_DE_SYSTEM_USER_CON_ads_management>
//   supabase secrets set META_TEST_EVENT_CODE=TEST12345   # opcional, para pruebas
//
// El token se saca en: Events Manager > Configuración > Conversions API > Generar token de acceso.

const GRAPH_VERSION = "v22.0";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

async function sha256(input: string): Promise<string> {
  const norm = input.trim().toLowerCase();
  const bytes = new TextEncoder().encode(norm);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Teléfono: solo dígitos, con código de país, luego hash.
async function hashPhone(raw: string): Promise<string> {
  const digits = raw.replace(/\D/g, "");
  return sha256(digits);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: CORS });
  }

  const PIXEL_ID = Deno.env.get("META_PIXEL_ID");
  const TOKEN = Deno.env.get("META_CAPI_TOKEN");
  const TEST_CODE = Deno.env.get("META_TEST_EVENT_CODE");

  if (!PIXEL_ID || !TOKEN) {
    return new Response(JSON.stringify({ error: "CAPI no configurado (faltan secrets)" }), {
      status: 500,
      headers: { ...CORS, "content-type": "application/json" },
    });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "JSON inválido" }), {
      status: 400,
      headers: { ...CORS, "content-type": "application/json" },
    });
  }

  const u = (body.user_data ?? {}) as Record<string, string | undefined>;

  // IP y User-Agent para mejorar el match quality.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("cf-connecting-ip") ??
    undefined;
  const ua = (body.user_agent as string) ?? req.headers.get("user-agent") ?? undefined;

  const user_data: Record<string, unknown> = {};
  if (u.email) user_data.em = [await sha256(u.email)];
  if (u.phone) user_data.ph = [await hashPhone(u.phone)];
  if (u.first_name) user_data.fn = [await sha256(u.first_name)];
  if (u.last_name) user_data.ln = [await sha256(u.last_name)];
  if (u.fbp) user_data.fbp = u.fbp;
  if (u.fbc) user_data.fbc = u.fbc;
  if (ip) user_data.client_ip_address = ip;
  if (ua) user_data.client_user_agent = ua;

  const event = {
    event_name: body.event_name,
    event_time: (body.event_time as number) ?? Math.floor(Date.now() / 1000),
    event_id: body.event_id,
    event_source_url: body.event_source_url,
    action_source: "website",
    user_data,
    custom_data: body.custom_data ?? {},
  };

  const payload: Record<string, unknown> = { data: [event] };
  if (TEST_CODE) payload.test_event_code = TEST_CODE;

  const res = await fetch(
    `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events?access_token=${TOKEN}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  const out = await res.json();
  return new Response(JSON.stringify(out), {
    status: res.ok ? 200 : 502,
    headers: { ...CORS, "content-type": "application/json" },
  });
});
