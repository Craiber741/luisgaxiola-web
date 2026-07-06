# Tracking de Meta — CAPI web + eventos de CRM

Dos integraciones server-side, ambas sobre el mismo dataset de Meta.

- **Dataset / Pixel ID:** `1332956858393579`
- Ambas corren como Supabase Edge Functions (el sitio es estático, no hay backend propio).
- Ambas reutilizan el mismo token de acceso (`META_CAPI_TOKEN`).

| Función | Para qué | action_source | Se dispara desde |
|---------|----------|---------------|------------------|
| `meta-capi` | Eventos del sitio en tiempo real (`Lead`, `quiz_completed`, `HotLead`) con dedup contra el Pixel | `website` | La landing `/easy` (automático) |
| `meta-crm` | Cambios de **etapa** del lead (calificado, cita, cliente) | `system_generated` | Panel `/admin` (nuestro CRM en Supabase) |

---

## 1. Token de acceso (una sola vez)

Events Manager → tu dataset `1332956858393579` → **Configuración** → **Conversions API** → **Generar token de acceso**. Guárdalo, lo usan las dos funciones.

## 2. Secrets (una sola vez)

```bash
cd "Marca Personal/Luis Gaxiola Sitio web"
supabase secrets set META_PIXEL_ID=1332956858393579
supabase secrets set META_DATASET_ID=1332956858393579
supabase secrets set META_CAPI_TOKEN=<TU_TOKEN>
# Opcional para pruebas (quítalo en producción):
supabase secrets set META_TEST_EVENT_CODE=TEST12345
```

## 3. Deploy

```bash
supabase functions deploy meta-capi --no-verify-jwt
supabase functions deploy meta-crm  --no-verify-jwt
```

---

## meta-capi (web) — ya cableado

La landing lo llama solo en `Lead`, `quiz_completed` y `HotLead`, con el mismo `event_id` que
el Pixel del navegador (deduplicación automática). No requiere nada más una vez desplegado.

---

## meta-crm (CRM) — ya cableado a /admin

Nuestro CRM es la tabla `leads` de Supabase, que ves en **`/admin`**. Cada tarjeta de lead tiene un
selector de **Etapa**. Al cambiarla:

1. Se guarda la nueva etapa en Supabase (`leads.stage`).
2. Se manda el evento correspondiente a Meta vía `meta-crm` (con teléfono + `fbc` para el match).
3. La tarjeta muestra "✓ Enviado a Meta".

No necesitas n8n ni tocar código: se dispara solo desde el panel.

### Mapeo etapa → evento de Meta

| Etapa en /admin | event_name a Meta |
|-----------------|-------------------|
| Nuevo | `Lead` |
| Calificado | `Qualified` |
| Cita agendada | `Schedule` |
| Cliente | `Customer` |
| Perdido | `Disqualified` |

> Los leads de la landing traen teléfono (WhatsApp) + `fbc` (reconstruido del `fbclid`), así que Meta
> puede casar el evento aunque no exista `lead_id` de Lead Ads (ese solo aplica a formularios nativos
> de Meta, no a nuestra landing).

### Requisito previo: correr la migración

Como la tabla `leads` ya existía, corre en el SQL editor de Supabase la parte final de
`supabase/schema.sql` (agrega la columna `stage` y el permiso de UPDATE):

```sql
alter table public.leads add column if not exists stage text not null default 'nuevo';

drop policy if exists "leads_update_auth" on public.leads;
create policy "leads_update_auth" on public.leads for update
  to authenticated using (true) with check (true);
```

### Llamada manual (opcional, para probar con curl)

```bash
curl -X POST "https://<TU-PROYECTO>.supabase.co/functions/v1/meta-crm" \
  -H "content-type: application/json" \
  -H "apikey: <ANON_KEY>" \
  -d '{"event_name":"Qualified","lead_event_source":"Supabase CRM","user_data":{"phone":"+526861234567","first_name":"Juan"}}'
```

### Probar antes de producción

Con `META_TEST_EVENT_CODE` puesto, los eventos caen en **Events Manager → Eventos de prueba**
casi al instante. Confirma que la carga llega bien y luego quita el secret para mandar producción:

```bash
supabase secrets unset META_TEST_EVENT_CODE
```

### Requisito de Meta

La integración debe subir datos **al menos una vez al día**. Los eventos aparecen en el Events
Manager en menos de una hora si todo está bien; los errores salen en **Diagnósticos**.
