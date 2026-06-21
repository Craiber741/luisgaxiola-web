#!/usr/bin/env node
// Genera un blog semanal de recap de Meta Ads (métricas + acciones del log de cambios),
// redactado por OpenAI, y lo deja como BORRADOR en WordPress (blog.luisgaxiola.com).
//
// Solo se le pasan AGREGADOS por nicho a la IA (sin nombres de cuentas) para anonimizar.
//
// Env requeridos:
//   FB_ACCESS_TOKEN     token Meta con ads_read
//   AD_ACCOUNT_NICHES   JSON { "act_123": "Nicho" } (mapeo cuenta->nicho)
//   OPENAI_API_KEY      key de OpenAI
//   WP_USER             usuario WordPress
//   WP_APP_PASSWORD     application password WordPress
// Env opcionales:
//   OPENAI_MODEL (def gpt-4.1-mini) · WP_BASE (def https://blog.luisgaxiola.com)
//   WP_CATEGORY (def 29) · MXN_PER_USD (def 18)
// Flags: --dry-run  (imprime el post sin publicarlo)

const DRY_RUN = process.argv.includes("--dry-run");
const FB_API = "https://graph.facebook.com/v22.0";
const TOKEN = process.env.FB_ACCESS_TOKEN;
const OPENAI_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";
const WP_BASE = process.env.WP_BASE || "https://blog.luisgaxiola.com";
const WP_USER = process.env.WP_USER;
const WP_PASS = process.env.WP_APP_PASSWORD;
const WP_CATEGORY = Number(process.env.WP_CATEGORY || 29);
const MXN_PER_USD = Number(process.env.MXN_PER_USD || 18);

const UA = { "User-Agent": "Mozilla/5.0", Accept: "application/json" };

function reqEnv(name, val) {
  if (!val) {
    console.error(`Falta env ${name}`);
    process.exit(1);
  }
}
reqEnv("FB_ACCESS_TOKEN", TOKEN);
reqEnv("OPENAI_API_KEY", OPENAI_KEY);
if (!DRY_RUN) {
  reqEnv("WP_USER", WP_USER);
  reqEnv("WP_APP_PASSWORD", WP_PASS);
}

const overrides = (() => {
  try {
    return JSON.parse(process.env.AD_ACCOUNT_NICHES || "{}");
  } catch {
    return {};
  }
})();

const NICHE_RULES = [
  ["Dental", /dental|odont|dentist|ortodonc/i],
  ["Inmobiliaria", /inmobil|bienes\s*ra[ií]ces|realty|real\s*estate/i],
  ["Restaurantes", /restaurant|comida|asadero|taqueri|pizz|sushi|grill/i],
  ["Construcción/Remodelación", /constru|remodel|cabinet|builder|granite/i],
];
function classify(actId, name) {
  if (overrides[actId]) return overrides[actId];
  for (const [n, p] of NICHE_RULES) if (p.test(name)) return n;
  return "Otros";
}

const toUsd = (amt, cur) =>
  cur === "MXN" ? amt / MXN_PER_USD : amt; // USD u otras: tal cual

function leadsFrom(actions) {
  const m = {};
  for (const a of actions || []) m[a.action_type] = Number(a.value) || 0;
  const form =
    m["lead"] ?? m["onsite_conversion.lead_grouped"] ?? m["onsite_web_lead"] ?? 0;
  const msg = m["onsite_conversion.messaging_conversation_started_7d"] ?? 0;
  return form + msg;
}

// event_type del log de cambios -> etiqueta legible (solo acciones de optimización).
const ACTION_LABELS = {
  update_ad_run_status: "anuncios activados/pausados",
  update_adset_run_status: "conjuntos activados/pausados",
  update_campaign_run_status: "campañas activadas/pausadas",
  update_ad_creative: "creativos actualizados",
  update_campaign_budget: "ajustes de presupuesto",
  update_adset_budget: "ajustes de presupuesto",
  update_adset_bid_strategy: "ajustes de puja",
  update_adset_target_spec: "ajustes de segmentación",
  create_ad: "nuevos anuncios",
  create_adset: "nuevos conjuntos",
  create_campaign: "nuevas campañas",
};

async function fbGet(path, params) {
  const u = new URL(`${FB_API}/${path}`);
  for (const [k, v] of Object.entries({ ...params, access_token: TOKEN }))
    u.searchParams.set(k, v);
  const r = await fetch(u, { headers: UA });
  if (!r.ok) return null;
  return r.json();
}

async function listAccounts() {
  const out = [];
  let url = new URL(`${FB_API}/me/adaccounts`);
  url.searchParams.set("fields", "name,account_id,currency");
  url.searchParams.set("limit", "200");
  url.searchParams.set("access_token", TOKEN);
  for (let i = 0; i < 25 && url; i++) {
    const r = await fetch(url, { headers: UA });
    if (!r.ok) break;
    const d = await r.json();
    for (const a of d.data || [])
      out.push({ actId: `act_${a.account_id}`, name: a.name || "", currency: a.currency || "USD" });
    url = d.paging?.next ? new URL(d.paging.next) : null;
  }
  return out;
}

function isoDaysAgo(n) {
  return new Date(Date.now() - n * 86400000).toISOString().slice(0, 10);
}

async function main() {
  const since = isoDaysAgo(7);
  const until = isoDaysAgo(0);
  const accounts = await listAccounts();

  const niches = {}; // niche -> {spend,leads,clicks,impressions,accounts,actions:{}}
  for (const acc of accounts) {
    const ins = await fbGet(`${acc.actId}/insights`, {
      date_preset: "last_7d",
      fields: "spend,impressions,clicks,actions",
    });
    const row = ins?.data?.[0];
    const spendNative = Number(row?.spend || 0);
    if (!row || spendNative <= 0) continue;

    const niche = classify(acc.actId, acc.name);
    const g =
      niches[niche] ||
      (niches[niche] = {
        spend: 0,
        leads: 0,
        clicks: 0,
        impressions: 0,
        accounts: 0,
        actions: {},
      });
    g.spend += toUsd(spendNative, acc.currency);
    g.leads += leadsFrom(row.actions);
    g.clicks += Number(row.clicks || 0);
    g.impressions += Number(row.impressions || 0);
    g.accounts += 1;

    // log de cambios (acciones)
    const act = await fbGet(`${acc.actId}/activities`, {
      fields: "event_type",
      since,
      until,
      limit: "300",
    });
    for (const ev of act?.data || []) {
      const label = ACTION_LABELS[ev.event_type];
      if (label) g.actions[label] = (g.actions[label] || 0) + 1;
    }
  }

  if (!Object.keys(niches).length) {
    console.error("No hay cuentas con gasto en los últimos 7 días. Aborto.");
    process.exit(1);
  }

  // Totales
  let T = { spend: 0, leads: 0, clicks: 0, impressions: 0, accounts: 0 };
  for (const g of Object.values(niches)) {
    T.spend += g.spend;
    T.leads += g.leads;
    T.clicks += g.clicks;
    T.impressions += g.impressions;
    T.accounts += g.accounts;
  }

  // Resumen estructurado para la IA (sin nombres de cuentas)
  const fmt = (n, d = 0) =>
    n.toLocaleString("es-MX", { minimumFractionDigits: d, maximumFractionDigits: d });
  const lines = [];
  lines.push(
    `TOTAL (7 días): $${fmt(T.spend)} USD invertidos · ${fmt(T.leads)} prospectos · ` +
      `CPL $${fmt(T.leads ? T.spend / T.leads : 0, 2)} · CTR ${fmt(
        T.impressions ? (T.clicks / T.impressions) * 100 : 0,
        2
      )}% · ${T.accounts} cuentas activas`
  );
  for (const [niche, g] of Object.entries(niches).sort((a, b) => b[1].spend - a[1].spend)) {
    const acts = Object.entries(g.actions)
      .map(([k, v]) => `${v} ${k}`)
      .join(", ");
    lines.push(
      `- ${niche}: $${fmt(g.spend)} USD · ${fmt(g.leads)} prospectos · CPL $${fmt(
        g.leads ? g.spend / g.leads : 0,
        2
      )} · CTR ${fmt(g.impressions ? (g.clicks / g.impressions) * 100 : 0, 2)}% · ${
        g.accounts
      } cuenta(s)` + (acts ? ` · Acciones: ${acts}` : "")
    );
  }
  const dataBlock = lines.join("\n");

  const post = await writePost({ since, until, dataBlock });

  if (DRY_RUN) {
    console.log("\n===== DRY RUN — no se publicó =====\n");
    console.log("TÍTULO:", post.title, "\n");
    console.log(post.html);
    console.log("\n----- datos usados -----\n" + dataBlock);
    return;
  }

  const res = await fetch(`${WP_BASE}/wp-json/wp/v2/posts`, {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(`${WP_USER}:${WP_PASS}`).toString("base64"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: post.title,
      content: post.html,
      status: "draft",
      categories: [WP_CATEGORY],
    }),
  });
  if (!res.ok) {
    console.error("Error WP:", res.status, await res.text());
    process.exit(1);
  }
  const created = await res.json();
  console.log(`Borrador creado: ${created.link || created.id} (id ${created.id})`);
}

async function writePost({ since, until, dataBlock }) {
  const system = `Eres Luis Gaxiola, consultor de media buying (Meta Ads) en México. Escribes un recap SEMANAL para tu blog que demuestra autoridad con datos reales.
Voz: directa, sin relleno, con criterio de operador real. Español de México.
REGLAS ESTRICTAS:
- NUNCA menciones nombres de clientes, cuentas, marcas ni datos que identifiquen a alguien. Solo nichos y números agregados.
- Nada de lenguaje de IA: sin "en el panorama actual", sin "en resumen", sin frases de relleno, sin tres adjetivos en fila, evita el guion largo.
- Frases cortas. Que suene a persona, no a robot.
- Interpreta los números: qué significan, qué se hizo y por qué. No solo los listes.
- 450-650 palabras. HTML simple (<h2>, <p>, <ul><li>, <strong>). Sin <html> ni <head>.
- Cierra con un CTA suave a trabajar con Luis.
Devuelve SOLO un JSON: {"title": "...", "html": "..."}.`;

  const user = `Datos de la semana (${since} a ${until}), agregados y anonimizados:\n\n${dataBlock}\n\nEscribe el recap. El título debe incluir el rango o la semana y sonar a reporte real, no clickbait.`;

  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    }),
  });
  if (!r.ok) {
    console.error("Error OpenAI:", r.status, await r.text());
    process.exit(1);
  }
  const d = await r.json();
  const parsed = JSON.parse(d.choices[0].message.content);
  if (!parsed.title || !parsed.html) {
    console.error("Respuesta de IA sin title/html:", d.choices[0].message.content);
    process.exit(1);
  }
  return parsed;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
