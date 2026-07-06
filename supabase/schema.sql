-- ============================================================================
-- Landing Luis Gaxiola — esquema de leads + eventos del funnel
-- Correr en el SQL editor de Supabase (Dashboard > SQL Editor > New query).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Tabla: leads
-- Un renglón por lead que completa el quiz.
-- ---------------------------------------------------------------------------
create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text,
  whatsapp     text,
  answers      jsonb not null default '{}'::jsonb,  -- { industria, hace_publicidad, presupuesto, urgencia }
  score        int  not null default 0,
  temperature  text not null default 'warm',        -- 'hot' | 'warm' | 'cold'
  stage        text not null default 'nuevo',        -- 'nuevo'|'calificado'|'cita'|'cliente'|'perdido'
  session_id   text,
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  utm_content  text,
  utm_term     text,
  fbclid       text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_session_id_idx on public.leads (session_id);

-- ---------------------------------------------------------------------------
-- Tabla: funnel_events
-- Un renglón por evento del funnel (espejo de los eventos de Meta Pixel),
-- para poder reconstruir el embudo del lado servidor en /admin.
-- ---------------------------------------------------------------------------
create table if not exists public.funnel_events (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  session_id  text,
  event_name  text not null,   -- page_view, scroll_historia, quiz_started, quiz_step_1, ...
  step        int,
  metadata    jsonb not null default '{}'::jsonb
);

create index if not exists funnel_events_created_at_idx on public.funnel_events (created_at desc);
create index if not exists funnel_events_session_id_idx on public.funnel_events (session_id);
create index if not exists funnel_events_event_name_idx on public.funnel_events (event_name);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- El sitio es estático: el navegador escribe con la anon key.
-- Regla: cualquiera (anon) puede INSERTAR; solo usuarios autenticados
-- (el admin logueado en /admin) pueden LEER.
-- ---------------------------------------------------------------------------
alter table public.leads          enable row level security;
alter table public.funnel_events  enable row level security;

-- INSERT abierto (captura de leads desde la landing pública)
drop policy if exists "leads_insert_anon" on public.leads;
create policy "leads_insert_anon"
  on public.leads for insert
  to anon, authenticated
  with check (true);

drop policy if exists "funnel_events_insert_anon" on public.funnel_events;
create policy "funnel_events_insert_anon"
  on public.funnel_events for insert
  to anon, authenticated
  with check (true);

-- SELECT solo para autenticados (panel /admin)
drop policy if exists "leads_select_auth" on public.leads;
create policy "leads_select_auth"
  on public.leads for select
  to authenticated
  using (true);

drop policy if exists "funnel_events_select_auth" on public.funnel_events;
create policy "funnel_events_select_auth"
  on public.funnel_events for select
  to authenticated
  using (true);

-- El admin (autenticado) puede cambiar la etapa del lead desde /admin.
drop policy if exists "leads_update_auth" on public.leads;
create policy "leads_update_auth"
  on public.leads for update
  to authenticated
  using (true)
  with check (true);

-- ---------------------------------------------------------------------------
-- MIGRACIÓN — correr esto si la tabla 'leads' ya existía (agrega la columna stage).
-- ---------------------------------------------------------------------------
alter table public.leads add column if not exists stage text not null default 'nuevo';
