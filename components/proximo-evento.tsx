"use client";

import { useSyncExternalStore } from "react";
import { DIAS, club, horarios } from "@/lib/club";

type Props = { titulo: string | null; fechaIso: string | null };

function diaHoyEnChile(): number {
  const nombre = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: club.zonaHoraria }).format(new Date());
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(nombre);
}

function estadoPractica(): { hoy: boolean; texto: string } {
  const hoy = diaHoyEnChile();
  const hit = horarios.find((h) => h.diaSemana === hoy);
  if (hit) return { hoy: true, texto: `Hoy hay práctica · ${hit.horas}` };
  const siguiente = [...horarios].sort(
    (a, b) => ((a.diaSemana - hoy + 7) % 7) - ((b.diaSemana - hoy + 7) % 7),
  )[0];
  return { hoy: false, texto: `Próxima práctica: ${DIAS[siguiente.diaSemana].toLowerCase()} ${siguiente.horas}` };
}

// Reloj por minuto: en el servidor no hay hora, así que el primer render coincide con el del navegador.
function suscribirReloj(avisar: () => void) {
  const t = setInterval(avisar, 30_000);
  return () => clearInterval(t);
}
const minutoActual = () => Math.floor(Date.now() / 6e4) * 6e4;

export function ProximoEvento({ titulo, fechaIso }: Props) {
  const ahora = useSyncExternalStore(suscribirReloj, minutoActual, () => null);

  const ms = ahora !== null && fechaIso ? Math.max(0, new Date(fechaIso).getTime() - ahora) : null;
  const dias = ms === null ? "–" : Math.floor(ms / 864e5);
  const horas = ms === null ? "–" : Math.floor((ms % 864e5) / 36e5);
  const min = ms === null ? "–" : Math.floor((ms % 36e5) / 6e4);
  const estado = ahora === null ? null : estadoPractica();

  return (
    <aside className="proximo" aria-live="polite">
      <p className="etiqueta">Próximo evento</p>
      {titulo ? (
        <>
          <h3>{titulo}</h3>
          <div className="cuenta" role="timer">
            <div><b>{dias}</b><span>días</span></div>
            <div><b>{horas}</b><span>horas</span></div>
            <div><b>{min}</b><span>min</span></div>
          </div>
        </>
      ) : (
        <h3>Pronto publicaremos las próximas actividades</h3>
      )}
      <p className="estado">
        <i className={estado?.hoy ? "" : "off"} aria-hidden="true" />
        <span>{estado?.texto ?? " "}</span>
      </p>
    </aside>
  );
}
