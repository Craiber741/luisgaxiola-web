// Clasificación de cuentas de Meta Ads por nicho.
// IMPORTANTE: el repo es PÚBLICO, así que el mapeo cuenta→nicho NO vive aquí.
// Vive en el secreto de GitHub AD_ACCOUNT_NICHES (un JSON { "act_123": "Nicho" })
// que se lee en build. Aquí solo viven etiquetas genéricas y reglas por keyword.

export type Niche = string;

// Orden de despliegue preferido. Los nichos no listados se agregan al final por gasto.
export const NICHE_ORDER: Niche[] = [
  "Inmobiliaria",
  "Restaurantes",
  "Dental",
  "Salud / Bariatría",
  "Estética",
  "Cafetería Saludable",
  "Escuela de Idiomas",
  "Renta Vacacional",
  "Muebles",
  "Impresión DTF",
  "Construcción/Remodelación",
  "Otros",
];

// Overrides cuenta→nicho desde el secreto AD_ACCOUNT_NICHES (JSON). Si no está, {}.
let cachedOverrides: Record<string, Niche> | null = null;
export function getOverrides(): Record<string, Niche> {
  if (cachedOverrides) return cachedOverrides;
  try {
    cachedOverrides = JSON.parse(process.env.AD_ACCOUNT_NICHES || "{}");
  } catch {
    cachedOverrides = {};
  }
  return cachedOverrides!;
}

// Override del evento de lead por cuenta (cuando usa una conversión personalizada).
// Secreto AD_ACCOUNT_LEAD_EVENTS = JSON { "act_123": "offsite_conversion.fb_pixel_custom" }.
let cachedLeadEvents: Record<string, string> | null = null;
export function getLeadEventOverrides(): Record<string, string> {
  if (cachedLeadEvents) return cachedLeadEvents;
  try {
    cachedLeadEvents = JSON.parse(process.env.AD_ACCOUNT_LEAD_EVENTS || "{}");
  } catch {
    cachedLeadEvents = {};
  }
  return cachedLeadEvents!;
}

// Fallback por palabra clave sobre el nombre de la cuenta (si no hay override).
const NICHE_RULES: { niche: Niche; pattern: RegExp }[] = [
  { niche: "Dental", pattern: /dental|odont|dentist|ortodonc/i },
  { niche: "Inmobiliaria", pattern: /inmobil|bienes\s*ra[ií]ces|realty|real\s*estate/i },
  { niche: "Restaurantes", pattern: /restaurant|comida|asadero|taqueri|pizz|sushi|grill/i },
  {
    niche: "Construcción/Remodelación",
    pattern: /constru|remodel|cabinet|builder|granite|quartz/i,
  },
];

export function classifyNiche(actId: string, accountName: string): Niche {
  const overrides = getOverrides();
  if (overrides[actId]) return overrides[actId];
  for (const rule of NICHE_RULES) {
    if (rule.pattern.test(accountName)) return rule.niche;
  }
  return "Otros";
}
