import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Estas vars viven en .env.local (NEXT_PUBLIC_* para que estén disponibles en el
// cliente, ya que el sitio es 100% estático y escribe/lee desde el navegador).
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

let client: SupabaseClient | null = null;

/**
 * Devuelve el cliente de Supabase (singleton en el navegador).
 * Regresa null si faltan las env vars, para que la landing no truene si aún
 * no se ha configurado Supabase — la captura de leads simplemente hace no-op
 * y el flujo de WhatsApp sigue funcionando.
 */
export function getSupabase(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
  }
  return client;
}

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
