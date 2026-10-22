-- Lugares accesibles: negocios con Sello ("sello") y lugares que la comunidad recomienda ("comunidad").
-- Solo el servidor lee y escribe con la llave secreta: RLS activado y sin políticas públicas.
--
-- MODERACIÓN (manual, en el panel de Supabase):
--   1. Revisa la fila en public.lugares y, si todo está bien, pon aprobado = true.
--   2. Los reportes (public.reportes) también se aprueban uno por uno con aprobado = true:
--      solo los reportes aprobados suman en "personas confirmaron" de cada lugar.
--   3. Lo que no se aprueba no aparece en /lugares. /s/[id] sí funciona para el sello
--      aunque todavía no esté aprobado.
--   4. La lista pública se guarda en caché hasta 1 minuto (cacheLife "minutes"),
--      así que un cambio puede tardar unos minutos en verse.

-- Frases de mostrador: máximo 8, cada una de 1 a 120 caracteres.
-- Se usa una función porque CHECK no permite subconsultas ni recorrer arreglos.
create or replace function public.frases_validas(f text[])
returns boolean
language sql
immutable
security invoker
set search_path = ''
as $$
  select cardinality(f) <= 8
     and coalesce(bool_and(char_length(x) between 1 and 120), true)
  from unnest(f) as x
$$;

create table public.lugares (
  id text primary key check (char_length(id) = 10),
  creado_en timestamptz not null default now(),
  tipo text not null check (tipo in ('sello', 'comunidad')),
  nombre text not null check (char_length(nombre) between 2 and 120),
  rubro text not null check (rubro in ('farmacia', 'banco', 'salud', 'gobierno', 'tienda', 'restaurante', 'transporte', 'educacion', 'otro')),
  departamento text not null check (char_length(departamento) between 2 and 40),
  distrito text not null check (char_length(distrito) between 2 and 80),
  direccion text check (char_length(direccion) <= 200),
  lat numeric(9, 6) check (lat between -90 and 90),
  lng numeric(9, 6) check (lng between -180 and 180),
  atiende_lsp text check (atiende_lsp in ('si', 'algo', 'no')),
  interprete boolean,
  frases text[] not null default '{}' check (public.frases_validas(frases)),
  -- Solo para el sello. Nunca se muestra en páginas públicas.
  email_contacto text check (char_length(email_contacto) <= 254),
  aprobado boolean not null default false,
  constraint coordenadas_completas check ((lat is null) = (lng is null))
);

create index lugares_aprobado_idx on public.lugares (aprobado, departamento, rubro);

create table public.reportes (
  id uuid primary key default gen_random_uuid(),
  creado_en timestamptz not null default now(),
  -- Si el reporte es sobre un lugar ya existente, se enlaza aquí.
  lugar_id text references public.lugares (id) on delete set null,
  nombre_lugar text not null check (char_length(nombre_lugar) between 2 and 120),
  rubro text not null check (rubro in ('farmacia', 'banco', 'salud', 'gobierno', 'tienda', 'restaurante', 'transporte', 'educacion', 'otro')),
  departamento text not null check (char_length(departamento) between 2 and 40),
  distrito text not null check (char_length(distrito) between 2 and 80),
  -- Solo aspectos positivos en la v1 (evita publicar acusaciones sin verificar).
  aspectos text[] not null default '{}' check (
    aspectos <@ array['personal_sabe_lsp', 'hubo_interprete', 'me_escribieron', 'paciencia_respeto', 'tiene_sello']::text[]
  ),
  comentario text check (char_length(comentario) <= 300),
  aprobado boolean not null default false
);

create index reportes_aprobado_lugar_idx on public.reportes (aprobado, lugar_id);

alter table public.lugares enable row level security;
alter table public.reportes enable row level security;

comment on table public.lugares is 'Lugares accesibles (sello y comunidad). Moderación manual: poner aprobado = true en el panel. Email solo para el servidor.';
comment on table public.reportes is 'Confirmaciones de la comunidad sobre un lugar. Moderación manual: aprobado = true. Solo aspectos positivos en la v1.';
