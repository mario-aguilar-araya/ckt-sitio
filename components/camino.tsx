"use client";

import { useEffect, useRef } from "react";

const PASOS = [
  { kanji: "礼", nombre: "Rei", titulo: "Todo empieza con un saludo", texto: "Antes de tomar el shinai nos saludamos. El respeto al compañero y al dojo es la base del kendo." },
  { kanji: "構", nombre: "Kamae", titulo: "La guardia", texto: "Postura, distancia y mirada. Aprendes a pararte antes de aprender a golpear." },
  { kanji: "打", nombre: "Kihon", titulo: "Men, kote, do", texto: "Los golpes básicos, repetidos hasta que salen limpios, con el grito (kiai) que los acompaña." },
  { kanji: "合", nombre: "Shiai", titulo: "El encuentro", texto: "Con bogu puesto, dos personas se miden. Se gana con técnica, no con fuerza." },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const suave = (t: number) => t * t * (3 - 2 * t);
const limitar = (n: number) => Math.min(1, Math.max(0, n));

// Ángulo del shinai (grados, 0 = vertical) y presencia del segundo shinai según el avance 0..1.
function pose(p: number) {
  const f = Math.min(3.999, p * 4);
  const i = Math.floor(f);
  const t = f - i;
  if (i === 0) return { angulo: lerp(0, 18, suave(limitar((t - 0.5) * 2))), rival: 0, impacto: 0 };
  if (i === 1) return { angulo: lerp(18, 36, suave(t)), rival: 0, impacto: 0 };
  if (i === 2) {
    if (t < 0.55) return { angulo: lerp(36, -72, suave(t / 0.55)), rival: 0, impacto: 0 };
    const c = suave((t - 0.55) / 0.45);
    return { angulo: lerp(-72, 48, c), rival: 0, impacto: c > 0.85 ? 1 : 0 };
  }
  return { angulo: lerp(48, 38, suave(t)), rival: suave(limitar(t * 2)), impacto: 0 };
}

export function Camino() {
  const seccion = useRef<HTMLElement>(null);
  const shinai = useRef<SVGGElement>(null);
  const rival = useRef<SVGGElement>(null);
  const enso = useRef<SVGCircleElement>(null);
  const destello = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const el = seccion.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.dataset.js = "";
    let pendiente = false;

    const pintar = () => {
      pendiente = false;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? limitar(-r.top / total) : 0;
      const { angulo, rival: vr, impacto } = pose(p);
      el.dataset.paso = String(Math.min(3, Math.floor(p * 4)));
      el.style.setProperty("--p", p.toFixed(4));
      shinai.current?.setAttribute("transform", `rotate(${angulo.toFixed(2)} 200 310)`);
      rival.current?.setAttribute("transform", `rotate(${(-38).toFixed(0)} 330 310)`);
      if (rival.current) rival.current.style.opacity = String(vr);
      if (enso.current) enso.current.style.strokeDashoffset = String(1 - 0.94 * p);
      if (destello.current) destello.current.style.opacity = String(impacto);
    };
    const alMover = () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(pintar);
    };

    pintar();
    window.addEventListener("scroll", alMover, { passive: true });
    window.addEventListener("resize", alMover);
    return () => {
      window.removeEventListener("scroll", alMover);
      window.removeEventListener("resize", alMover);
    };
  }, []);

  return (
    <section className="camino" id="camino" ref={seccion} data-paso="0" aria-labelledby="camino-t">
      <div className="camino-fijo">
        <div className="camino-texto">
          <p className="etiqueta">Así se aprende kendo</p>
          <h2 id="camino-t">El camino, paso a paso</h2>
          <div className="pasos">
            {PASOS.map((p, i) => (
              <article className="paso" data-i={i} key={p.nombre}>
                <span className="paso-nombre">{p.nombre}</span>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </article>
            ))}
          </div>
          <div className="avance" aria-hidden="true"><i /></div>
        </div>

        <div className="escenario" aria-hidden="true">
          <div className="gran-kanji">
            {PASOS.map((p, i) => <span data-i={i} key={p.kanji}>{p.kanji}</span>)}
          </div>
          <svg viewBox="0 0 400 400" role="presentation">
            <circle ref={enso} className="enso" cx="200" cy="200" r="150" pathLength={1} />
            <circle className="sol" cx="318" cy="92" r="16" />
            <g ref={rival} className="rival" style={{ opacity: 0 }}>
              <line x1="330" y1="310" x2="330" y2="96" className="hoja" />
              <line x1="330" y1="310" x2="330" y2="262" className="mango" />
            </g>
            <g ref={shinai} transform="rotate(0 200 310)">
              <line x1="200" y1="310" x2="200" y2="84" className="hoja" />
              <line x1="200" y1="310" x2="200" y2="258" className="mango" />
              <ellipse cx="200" cy="256" rx="11" ry="4" className="tsuba" />
            </g>
            <circle ref={destello} className="destello" cx="200" cy="200" r="150" style={{ opacity: 0 }} />
          </svg>
        </div>
      </div>
    </section>
  );
}
