// Supabase Edge Function: Meta CRM events (offline / lifecycle).
// Reenvía cambios de ETAPA de un lead desde el CRM (GoHighLevel, HubSpot, etc.) a Meta,
// con action_source="system_generated" y event_source="crm", como pide la guía de
// "Enviar un evento de CRM". Sirve para que Meta optimice hacia leads que avanzan de
// verdad en el embudo (calificado, cita, cliente), no solo hacia quien llenó el form.
//
// Deploy:
//   supabase functions deploy meta-crm --no-verify-jwt
// Secrets (reutiliza los del CAPI web):
//   supabase secrets set META_DATASET_ID=1332956858393579   # = tu Pixel/Dataset ID
//   supabase secrets set META_CAPI_TOKEN=<TOKEN_DEL_DATASET>
//   supabase secrets set META_TEST_EVENT_CODE=TEST12345      # opcional, para pruebas
//
// Llamada típica: workflow de n8n que escucha el cambio de etapa en el CRM y hace POST aquí.
// Body esperado (todo opcional salvo event_name):
// {
//   "event_name": "Qualified",            // etapa del CRM: Lead | Qualified | Appointment | Customer | ...
//   "lead_event_source": "GoHighLevel",   // nombre de tu CRM
//   "event_time": 1673035686,             // Unix seconds (default: ahora)
//   "lead_id": 1234567890123456,          // Lead ID de Meta (Lead Ads) si lo tienes — NO se hashea
//   "user_data": {
//     "email": "...", "phone": "+52686...", "first_name": "...", "last_name": "...",
//     "city": "...", "state": "...", "zip": "...", "gender": "m|f", "dob": "YYYYMMDD",
//     "country": "mx", "fbc": "...", "fbp": "...", "external_id": "..."
//   },
//   "custom_data": { ...campos extra que quieras... }
// }

const GRAPH_VERSION = "v25.0";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

async function sha256(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Normaliza (trim + lowercase, opcional quitar espacios) y hashea.
async function hashField(raw: string, stripSpaces = false): Promise<string> {
  let v = raw.trim().toLowerCase();
  if (stripSpaces) v = v.replace(/\s+/g, "");
  return sha256(v);
}

async function hashPhone(raw: string): Promise<string> {
  return sha256(raw.replace(/\D/g, "")); // solo dígitos, con código de país
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: CORS });
  }

  const DATASET_ID = Deno.env.get("META_DATASET_ID") ?? Deno.env.get("META_PIXEL_ID");
  const TOKEN = Deno.env.get("META_CAPI_TOKEN");
  const TEST_CODE = Deno.env.get("META_TEST_EVENT_CODE");

  if (!DATASET_ID || !TOKEN) {
    return new Response(JSON.stringify({ error: "CRM no configurado (faltan secrets)" }), {
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

  if (!body.event_name) {
    return new Response(JSON.stringify({ error: "Falta event_name (la etapa del CRM)" }), {
      status: 400,
      headers: { ...CORS, "content-type": "application/json" },
    });
  }

  const u = (body.user_data ?? {}) as Record<string, string | number | undefined>;

  const user_data: Record<string, unknown> = {};
  if (u.email) user_data.em = [await hashField(String(u.email))];
  if (u.phone) user_data.ph = [await hashPhone(String(u.phone))];
  if (u.first_name) user_data.fn = [await hashField(String(u.first_name))];
  if (u.last_name) user_data.ln = [await hashField(String(u.last_name))];
  if (u.city) user_data.ct = [await hashField(String(u.city), true)];
  if (u.state) user_data.st = [await hashField(String(u.state), true)];
  if (u.zip) user_data.zp = [await hashField(String(u.zip), true)];
  if (u.country) user_data.country = [await hashField(String(u.country), true)];
  if (u.gender) user_data.ge = [await hashField(String(u.gender).charAt(0))];
  if (u.dob) user_data.db = [await hashField(String(u.dob).replace(/\D/g, ""))];
  if (u.external_id) user_data.external_id = [await hashField(String(u.external_id))];
  // NO se hashean: lead_id, fbc, fbp
  if (u.lead_id) user_data.lead_id = Number(u.lead_id);
  if (u.fbc) user_data.fbc = u.fbc;
  if (u.fbp) user_data.fbp = u.fbp;

  const event = {
    action_source: "system_generated",
    event_name: body.event_name,
    event_time: (body.event_time as number) ?? Math.floor(Date.now() / 1000),
    custom_data: {
      event_source: "crm",
      lead_event_source: (body.lead_event_source as string) ?? "CRM",
      ...((body.custom_data as Record<string, unknown>) ?? {}),
    },
    user_data,
  };

  const payload: Record<string, unknown> = { data: [event] };
  if (TEST_CODE) payload.test_event_code = TEST_CODE;

  const res = await fetch(
    `https://graph.facebook.com/${GRAPH_VERSION}/${DATASET_ID}/events?access_token=${TOKEN}`,
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
