import {
  classifyNiche,
  getLeadEventOverrides,
  NICHE_ORDER,
  type Niche,
} from "./ads-accounts";

// Stats de Meta Ads de los últimos 7 días, agregados por nicho y desglosados por cuenta
// anonimizada. Se ejecuta en el build (export estático); el rebuild diario los refresca.
// Requiere la env var FB_ACCESS_TOKEN (token con ads_read, el del fb-ads-mcp-server).

const FB_API = "https://graph.facebook.com/v22.0";

const FETCH_OPTS = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
    Accept: "application/json",
  },
} as const;

export type NicheAccount = {
  label: string;
  spend: number;
  leads: number;
  cpl: number | null;
  ctr: number;
  reach: number;
};

export type NicheStats = {
  niche: Niche;
  spend: number;
  leads: number;
  cpl: number | null;
  ctr: number;
  reach: number;
  accountCount: number;
  accounts: NicheAccount[];
};

export type AdsStats = {
  totals: {
    spend: number;
    leads: number;
    cpl: number | null;
    ctr: number;
    reach: number;
    accountCount: number;
  };
  niches: NicheStats[];
  updatedAt: string;
};

// Tipo de cambio MXN→USD (ajustable). La mayoría de las cuentas son MXN; el resto USD.
const MXN_PER_USD = 18;

function toUsd(amount: number, currency: string): number {
  if (currency === "USD") return amount;
  if (currency === "MXN") return amount / MXN_PER_USD;
  return amount; // otras monedas: pasar tal cual (raro en este portafolio)
}

// "Leads"/prospectos = conversaciones de mensajería iniciadas (WhatsApp/Messenger) +
// leads de formulario. En el mercado de Luis la mayoría de la conversión es por mensaje.
// Si una cuenta usa una conversión personalizada como evento de lead, se define en
// AD_ACCOUNT_LEAD_EVENTS (actId -> action_type) y ese valor reemplaza al default.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractLeads(actions: any[] | undefined, actId: string): number {
  if (!actions) return 0;
  const m: Record<string, number> = {};
  for (const a of actions) m[a.action_type] = Number(a.value) || 0;

  const override = getLeadEventOverrides()[actId];
  if (override) return m[override] ?? 0;

  // Lead de formulario: un solo valor canónico (no sumar alias duplicados).
  const formLeads =
    m["lead"] ?? m["onsite_conversion.lead_grouped"] ?? m["onsite_web_lead"] ?? 0;
  const msgLeads = m["onsite_conversion.messaging_conversation_started_7d"] ?? 0;
  return formLeads + msgLeads;
}

type RawAccount = { actId: string; name: string; currency: string };
type RawInsights = {
  spend: number;
  impressions: number;
  reach: number;
  clicks: number;
  leads: number;
};

async function listAdAccounts(token: string): Promise<RawAccount[]> {
  const accounts: RawAccount[] = [];
  let url: string = `${FB_API}/me/adaccounts?fields=name,account_id,currency&limit=200&access_token=${token}`;
  for (let i = 0; i < 25 && url; i++) {
    const res = await fetch(url, FETCH_OPTS);
    if (!res.ok) break;
    const data = await res.json();
    for (const acc of data.data || []) {
      accounts.push({
        actId: `act_${acc.account_id}`,
        name: acc.name || "",
        currency: acc.currency || "USD",
      });
    }
    url = (data.paging?.next as string) || "";
  }
  return accounts;
}

async function getInsights(token: string, actId: string): Promise<RawInsights | null> {
  const fields = "spend,impressions,reach,clicks,actions";
  const url = `${FB_API}/${actId}/insights?date_preset=last_7d&fields=${fields}&access_token=${token}`;
  const res = await fetch(url, FETCH_OPTS);
  if (!res.ok) return null;
  const data = await res.json();
  const row = data.data?.[0];
  if (!row) return null;
  return {
    spend: Number(row.spend) || 0,
    impressions: Number(row.impressions) || 0,
    reach: Number(row.reach) || 0,
    clicks: Number(row.clicks) || 0,
    leads: extractLeads(row.actions, actId),
  };
}

// Ejecuta fn sobre items con concurrencia limitada para no saturar la API.
async function mapLimit<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let idx = 0;
  async function worker() {
    while (idx < items.length) {
      const cur = idx++;
      results[cur] = await fn(items[cur]);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => worker())
  );
  return results;
}

const ctrFrom = (clicks: number, impressions: number) =>
  impressions > 0 ? (clicks / impressions) * 100 : 0;

export async function getAdsStatsByNiche(): Promise<AdsStats | null> {
  const token = process.env.FB_ACCESS_TOKEN;
  if (!token) return null;

  try {
    const accounts = await listAdAccounts(token);
    if (!accounts.length) return null;

    const withInsights = await mapLimit(accounts, 5, async (acc) => ({
      ...acc,
      ins: await getInsights(token, acc.actId),
    }));

    // Solo cuentas con gasto en los últimos 7 días.
    const active = withInsights.filter(
      (a): a is RawAccount & { ins: RawInsights } => !!a.ins && a.ins.spend > 0
    );
    if (!active.length) return null;

    // Normalizar cada cuenta a USD.
    type AccIns = {
      spend: number; // USD
      leads: number;
      reach: number;
      clicks: number;
      impressions: number;
    };
    type Acc = {
      spend: number;
      leads: number;
      reach: number;
      clicks: number;
      impressions: number;
      accounts: AccIns[];
    };
    const raw = new Map<Niche, Acc>();
    for (const a of active) {
      const niche = classifyNiche(a.actId, a.name);
      const ins: AccIns = {
        spend: toUsd(a.ins.spend, a.currency),
        leads: a.ins.leads,
        reach: a.ins.reach,
        clicks: a.ins.clicks,
        impressions: a.ins.impressions,
      };
      const g =
        raw.get(niche) ||
        { spend: 0, leads: 0, reach: 0, clicks: 0, impressions: 0, accounts: [] };
      g.spend += ins.spend;
      g.leads += ins.leads;
      g.reach += ins.reach;
      g.clicks += ins.clicks;
      g.impressions += ins.impressions;
      g.accounts.push(ins);
      raw.set(niche, g);
    }

    // Orden de nichos: primero NICHE_ORDER, luego los no listados por gasto desc.
    const present = [...raw.keys()];
    const ordered = [
      ...NICHE_ORDER.filter((n) => raw.has(n)),
      ...present
        .filter((n) => !NICHE_ORDER.includes(n))
        .sort((a, b) => raw.get(b)!.spend - raw.get(a)!.spend),
    ];

    const niches: NicheStats[] = ordered.map((niche) => {
      const g = raw.get(niche)!;
      const sorted = [...g.accounts].sort((x, y) => y.spend - x.spend);
      return {
        niche,
        spend: g.spend,
        leads: g.leads,
        cpl: g.leads > 0 ? g.spend / g.leads : null,
        ctr: ctrFrom(g.clicks, g.impressions),
        reach: g.reach,
        accountCount: g.accounts.length,
        accounts: sorted.map((ins, i) => ({
          label: `${niche} #${i + 1}`,
          spend: ins.spend,
          leads: ins.leads,
          cpl: ins.leads > 0 ? ins.spend / ins.leads : null,
          ctr: ctrFrom(ins.clicks, ins.impressions),
          reach: ins.reach,
        })),
      };
    });

    const totals = niches.reduce(
      (t, n) => ({
        spend: t.spend + n.spend,
        leads: t.leads + n.leads,
        reach: t.reach + n.reach,
        accountCount: t.accountCount + n.accountCount,
      }),
      { spend: 0, leads: 0, reach: 0, accountCount: 0 }
    );

    // CTR total ponderado por impresiones de todas las cuentas activas.
    const totalClicks = active.reduce((s, a) => s + a.ins.clicks, 0);
    const totalImpr = active.reduce((s, a) => s + a.ins.impressions, 0);

    return {
      totals: {
        spend: totals.spend,
        leads: totals.leads,
        cpl: totals.leads > 0 ? totals.spend / totals.leads : null,
        ctr: ctrFrom(totalClicks, totalImpr),
        reach: totals.reach,
        accountCount: totals.accountCount,
      },
      niches,
      updatedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}
