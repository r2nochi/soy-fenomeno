-- País y lenguas de señas de quienes se anotan como intérpretes.
-- Columnas opcionales: las filas que ya existen no cambian.
-- Mantener estas listas iguales a PAISES y LENGUAS_SENAS en src/lib/solicitud.ts.

alter table public.solicitudes
  add column pais text check (
    pais in (
      'peru', 'argentina', 'bolivia', 'chile', 'colombia', 'costa_rica', 'cuba',
      'ecuador', 'el_salvador', 'espana', 'estados_unidos', 'guatemala', 'honduras',
      'mexico', 'nicaragua', 'panama', 'paraguay', 'republica_dominicana', 'uruguay',
      'venezuela', 'otro'
    )
  ),
  add column lenguas text[] check (
    lenguas is null or (
      cardinality(lenguas) between 1 and 7
      and lenguas <@ array['lsp', 'lsc', 'lsch', 'lsm', 'lsa', 'asl', 'otra']::text[]
    )
  ),
  add constraint pais_lenguas_solo_interpretes check (
    tipo = 'interprete' or (pais is null and lenguas is null)
  );
