-- Moderación, consentimiento y límite de envíos para Lugares accesibles.
-- Solo cambios aditivos: no se borran datos de la v1 (0002).
--
-- MODERACIÓN (manual, en el panel de Supabase):
--   - Aprobar:  aprobado = true   (aparece en /lugares y, si es sello, en /s/[id])
--   - Retirar:  oculto = true     (sale de /lugares, /s/[id], el afiche y el formulario
--                                  de reporte; aprobado no cambia)
--   - Lo que no se aprueba no aparece en /lugares. /s/[id] sí funciona para el sello
--     aunque todavía no esté aprobado, salvo que esté oculto.
--   - La lista pública se guarda en caché hasta 1 minuto: un retiro puede tardar
--     ese tiempo en dejar de verse en /lugares.
--
-- CONSENTIMIENTO: consentimiento_en guarda cuándo la persona aceptó la política de privacidad.
--
-- LÍMITE DE ENVÍOS: public.limites guarda un registro por envío aceptado, con una clave
--   con hash de la IP (nunca la IP). Sin políticas: solo el servidor lo usa.
--   Las filas de más de 24 horas se borran al registrar un envío nuevo.

alter table public.lugares add column if not exists oculto boolean not null default false;
alter table public.reportes add column if not exists oculto boolean not null default false;

alter table public.lugares add column if not exists consentimiento_en timestamptz;
alter table public.reportes add column if not exists consentimiento_en timestamptz;

-- La función solo la usa el CHECK de frases. El servidor (service_role) conserva el permiso.
revoke execute on function public.frases_validas(text[]) from public, anon, authenticated;

create table if not exists public.limites (
  clave text not null,
  creado_en timestamptz not null default now()
);

create index if not exists limites_clave_creado_idx on public.limites (clave, creado_en desc);

alter table public.limites enable row level security;

comment on table public.limites is 'Registro de envíos para el límite por hora. Clave = acción + hash de la IP. Sin políticas públicas; se borran filas de más de 24 horas.';
