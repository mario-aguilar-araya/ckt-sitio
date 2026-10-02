import { createClient } from "@supabase/supabase-js";

export type Evento = {
  id: string;
  titulo: string;
  lugar: string | null;
  fecha: string; // ISO
  tipo: string;
};

// Solo se leen eventos marcados como públicos y solo columnas aptas para el sitio
// (nunca "observaciones", que es de uso interno del club). Ver supabase/migracion-eventos-publicos.sql.
export async function obtenerEventosPublicos(): Promise<Evento[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return process.env.NODE_ENV === "production" ? [] : eventosDeEjemplo();

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await supabase
    .from("eventos")
    .select("id, titulo, lugar, fecha, tipo")
    .eq("publico", true)
    .gte("fecha", new Date().toISOString())
    .order("fecha", { ascending: true })
    .limit(12);

  if (error || !data) return [];
  return data.map((e) => ({ ...e, tipo: e.tipo ?? "Evento" }));
}

function eventosDeEjemplo(): Evento[] {
  const en = (dias: number, hora: number) => {
    const d = new Date();
    d.setDate(d.getDate() + dias);
    d.setHours(hora, 0, 0, 0);
    return d.toISOString();
  };
  return [
    { id: "1", titulo: "Examen de grado", lugar: "Dojo del club", fecha: en(6, 10), tipo: "Examen" },
    { id: "2", titulo: "Seminario con sensei invitado", lugar: "Gimnasio por confirmar", fecha: en(19, 9), tipo: "Seminario" },
    { id: "3", titulo: "Torneo regional de kendo", lugar: "Antofagasta", fecha: en(41, 9), tipo: "Torneo" },
  ];
}
