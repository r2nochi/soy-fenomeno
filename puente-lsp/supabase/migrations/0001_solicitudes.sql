-- Solicitudes recibidas desde la landing page (Fase 0).
-- Solo el servidor escribe aquí con la llave secreta: RLS activado y sin políticas públicas.

create table public.solicitudes (
  id uuid primary key default gen_random_uuid(),
  creado_en timestamptz not null default now(),
  tipo text not null check (tipo in ('persona_sorda', 'entidad', 'interprete')),
  nombre text not null check (char_length(nombre) between 2 and 120),
  organizacion text check (char_length(organizacion) <= 160),
  whatsapp text check (char_length(whatsapp) <= 20),
  email text check (char_length(email) <= 254),
  urgencia text check (urgencia in ('ahora', 'fecha')),
  fecha text check (char_length(fecha) <= 40),
  ambito text check (ambito in ('salud', 'banco', 'legal', 'educacion', 'trabajo', 'gobierno', 'otro')),
  mensaje text check (char_length(mensaje) <= 1000),
  estado text not null default 'nueva' check (estado in ('nueva', 'contactada', 'atendida', 'descartada')),
  constraint contacto_requerido check (whatsapp is not null or email is not null)
);

create index solicitudes_estado_creado_idx on public.solicitudes (estado, creado_en desc);

alter table public.solicitudes enable row level security;
