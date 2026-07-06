"use client";

import "../easy/landing.css";
import { useCallback, useEffect, useState } from "react";
import { getSupabase, isSupabaseConfigured } from "../../lib/supabase";
import { sendCrmEvent, STAGES, STAGE_LABEL, type Stage } from "../../lib/crm";

type LeadRow = {
  id: string;
  created_at: string;
  name: string | null;
  whatsapp: string | null;
  answers: Record<string, string> | null;
  temperature: string | null;
  stage: string | null;
  score: number | null;
  fbclid: string | null;
  utm_source: string | null;
  utm_campaign: string | null;
};

type EventRow = { event_name: string };

const TEMP_COLOR: Record<string, string> = {
  hot: "#22c55e",
  warm: "#eab308",
  cold: "#94a3b8",
};

export default function AdminPage() {
  // Si Supabase no está configurado no hay sesión que resolver: arrancamos "listos".
  const [ready, setReady] = useState(() => !isSupabaseConfigured);
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [funnel, setFunnel] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  // Feedback por lead al cambiar de etapa: 'saving' | 'sent' | 'error'
  const [stageStatus, setStageStatus] = useState<Record<string, string>>({});

  const loadData = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    setLoading(true);
    const [{ data: leadData }, { data: eventData }] = await Promise.all([
      supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(500),
      supabase.from("funnel_events").select("event_name").limit(5000),
    ]);
    setLeads((leadData as LeadRow[]) ?? []);
    const counts: Record<string, number> = {};
    for (const ev of (eventData as EventRow[]) ?? []) {
      counts[ev.event_name] = (counts[ev.event_name] ?? 0) + 1;
    }
    setFunnel(counts);
    setLoading(false);
  }, []);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      const has = Boolean(data.session);
      setAuthed(has);
      setReady(true);
      if (has) void loadData();
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      const has = Boolean(session);
      setAuthed(has);
      if (has) void loadData();
    });
    return () => sub.subscription.unsubscribe();
  }, [loadData]);

  async function changeStage(lead: LeadRow, stage: Stage) {
    const supabase = getSupabase();
    if (!supabase) return;
    // Optimista: actualiza la UI de una vez
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, stage } : l)));
    setStageStatus((s) => ({ ...s, [lead.id]: "saving" }));

    // 1) Guarda la etapa en Supabase
    const { error } = await supabase.from("leads").update({ stage }).eq("id", lead.id);
    if (error) {
      setStageStatus((s) => ({ ...s, [lead.id]: "error" }));
      return;
    }
    // 2) Manda el evento de etapa a Meta (CRM)
    const res = await sendCrmEvent(
      {
        name: lead.name,
        whatsapp: lead.whatsapp,
        answers: lead.answers,
        temperature: lead.temperature,
        fbclid: lead.fbclid,
        created_at: lead.created_at,
      },
      stage
    );
    setStageStatus((s) => ({ ...s, [lead.id]: res.ok ? "sent" : "error" }));
  }

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const supabase = getSupabase();
    if (!supabase) return;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
  }

  async function logout() {
    const supabase = getSupabase();
    await supabase?.auth.signOut();
    setLeads([]);
    setFunnel({});
  }

  if (!ready) {
    return (
      <div className="landing-root" style={{ padding: 40 }}>
        <p>Cargando…</p>
      </div>
    );
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="landing-root" style={{ padding: 40 }}>
        <div className="lg-container">
          <h2>Falta configurar Supabase</h2>
          <p>
            Agrega <code>NEXT_PUBLIC_SUPABASE_URL</code> y{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> en <code>.env.local</code> y vuelve a correr
            el servidor.
          </p>
        </div>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="landing-root" style={{ padding: 40, minHeight: "100vh" }}>
        <div className="lg-container" style={{ maxWidth: 380 }}>
          <span className="lg-eyebrow">Panel privado</span>
          <h2>Entrar</h2>
          <form onSubmit={login} style={{ display: "grid", gap: 12 }}>
            <input
              className="lg-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <input
              className="lg-input"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            {error && <p style={{ color: "#f87171", fontSize: 14, margin: 0 }}>{error}</p>}
            <button type="submit" className="lg-cta">
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  const funnelOrder = [
    "page_view",
    "scroll_historia",
    "scroll_problema",
    "scroll_pricing",
    "quiz_started",
    "quiz_step_1",
    "quiz_step_2",
    "quiz_step_3",
    "quiz_step_4",
    "quiz_step_5_started",
    "quiz_completed",
    "Lead",
    "HotLead",
    "whatsapp_redirect",
  ];

  return (
    <div className="landing-root" style={{ padding: "32px 0 80px", minHeight: "100vh" }}>
      <div className="lg-container" style={{ maxWidth: 900 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <h2 style={{ margin: 0 }}>Leads</h2>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={loadData} className="lg-back">
              ↻ Actualizar
            </button>
            <button onClick={logout} className="lg-back">
              Salir
            </button>
          </div>
        </div>

        {/* Resumen del embudo */}
        <div className="lg-card" style={{ marginBottom: 24 }}>
          <p style={{ color: "var(--lg-text)", fontWeight: 700, marginBottom: 12 }}>
            Embudo (eventos totales)
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {funnelOrder
              .filter((name) => funnel[name])
              .map((name) => (
                <span
                  key={name}
                  style={{
                    fontSize: 13,
                    padding: "6px 10px",
                    border: "1px solid var(--lg-border)",
                    borderRadius: 8,
                    color: "var(--lg-muted)",
                  }}
                >
                  {name}: <strong style={{ color: "var(--lg-text)" }}>{funnel[name]}</strong>
                </span>
              ))}
            {Object.keys(funnel).length === 0 && (
              <span style={{ color: "var(--lg-muted)", fontSize: 14 }}>Sin eventos aún.</span>
            )}
          </div>
        </div>

        {loading && <p>Cargando datos…</p>}

        {!loading && leads.length === 0 && <p>Todavía no hay leads.</p>}

        {leads.length > 0 && (
          <div style={{ display: "grid", gap: 12 }}>
            {leads.map((lead) => (
              <div key={lead.id} className="lg-card">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: 12,
                    marginBottom: 8,
                  }}
                >
                  <strong style={{ color: "var(--lg-text)", fontSize: 17 }}>
                    {lead.name || "—"}
                  </strong>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: TEMP_COLOR[lead.temperature ?? "warm"] ?? "var(--lg-muted)",
                    }}
                  >
                    {lead.temperature ?? "—"}
                  </span>
                </div>
                <p style={{ margin: "0 0 8px", fontSize: 14 }}>
                  WhatsApp:{" "}
                  <a
                    href={`https://wa.me/${(lead.whatsapp ?? "").replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--lg-accent)" }}
                  >
                    {lead.whatsapp || "—"}
                  </a>
                </p>
                {lead.answers && (
                  <p style={{ margin: "0 0 6px", fontSize: 14, color: "var(--lg-muted)" }}>
                    {Object.entries(lead.answers)
                      .map(([k, v]) => `${k}: ${v}`)
                      .join("  ·  ")}
                  </p>
                )}
                <p style={{ margin: "0 0 12px", fontSize: 12, color: "var(--lg-muted)" }}>
                  {new Date(lead.created_at).toLocaleString("es-MX")}
                  {lead.utm_campaign ? ` · camp: ${lead.utm_campaign}` : ""}
                  {lead.utm_source ? ` · src: ${lead.utm_source}` : ""}
                </p>

                {/* Etapa del CRM: al cambiar, avisa a Meta */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12, color: "var(--lg-muted)" }}>Etapa:</span>
                  <select
                    className="lg-input"
                    style={{ width: "auto", padding: "8px 10px", fontSize: 14 }}
                    value={(lead.stage as Stage) ?? "nuevo"}
                    onChange={(e) => changeStage(lead, e.target.value as Stage)}
                  >
                    {STAGES.map((s) => (
                      <option key={s} value={s}>
                        {STAGE_LABEL[s]}
                      </option>
                    ))}
                  </select>
                  {stageStatus[lead.id] === "saving" && (
                    <span style={{ fontSize: 12, color: "var(--lg-muted)" }}>Enviando a Meta…</span>
                  )}
                  {stageStatus[lead.id] === "sent" && (
                    <span style={{ fontSize: 12, color: "var(--lg-accent)" }}>✓ Enviado a Meta</span>
                  )}
                  {stageStatus[lead.id] === "error" && (
                    <span style={{ fontSize: 12, color: "#f87171" }}>Error (revisa CAPI)</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
