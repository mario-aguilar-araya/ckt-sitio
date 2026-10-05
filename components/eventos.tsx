"use client";

import { useState } from "react";
import type { Evento } from "@/lib/eventos";
import { club } from "@/lib/club";

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

function partes(iso: string) {
  const f = new Intl.DateTimeFormat("es-CL", { day: "numeric", month: "numeric", year: "numeric", timeZone: club.zonaHoraria })
    .formatToParts(new Date(iso));
  const get = (t: string) => Number(f.find((p) => p.type === t)?.value);
  return { dia: get("day"), mes: MESES[get("month") - 1], anio: get("year") };
}

export function Eventos({ eventos }: { eventos: Evento[] }) {
  const tipos = ["Todos", ...Array.from(new Set(eventos.map((e) => e.tipo)))];
  const [sel, setSel] = useState("Todos");
  const lista = eventos.filter((e) => sel === "Todos" || e.tipo === sel);

  if (eventos.length === 0) {
    return <p className="vacio">Aún no hay eventos publicados. Síguenos en Instagram para enterarte primero.</p>;
  }

  return (
    <>
      {tipos.length > 2 && (
        <div className="chips" role="group" aria-label="Filtrar por tipo">
          {tipos.map((t) => (
            <button key={t} type="button" className="chip" aria-pressed={t === sel} onClick={() => setSel(t)}>
              {t}
            </button>
          ))}
        </div>
      )}
      <div className="evs">
        {lista.map((e) => {
          const p = partes(e.fecha);
          return (
            <article key={e.id} className="ev">
              <div className="fecha">{p.dia}</div>
              <div className="mes">{p.mes} {p.anio}</div>
              <h4>{e.titulo}</h4>
              <p>{e.lugar ?? e.tipo}</p>
            </article>
          );
        })}
      </div>
    </>
  );
}
