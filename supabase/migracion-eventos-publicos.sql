-- Para el sitio público. Aplicar en el proyecto Supabase del panel (no se ha aplicado).
-- Los eventos son privados por defecto; solo los marcados como públicos aparecen en el sitio.
alter table eventos
  add column if not exists publico boolean not null default false,
  add column if not exists tipo text; -- p. ej. Examen, Seminario, Torneo

create index if not exists eventos_publicos_fecha_idx on eventos (fecha) where publico;
