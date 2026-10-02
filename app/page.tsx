import { DIAS, club, horarios } from "@/lib/club";
import { obtenerEventosPublicos } from "@/lib/eventos";
import { ProximoEvento } from "@/components/proximo-evento";
import { Eventos } from "@/components/eventos";

// Los eventos se refrescan como máximo cada 5 minutos.
export const revalidate = 300;

function Marca() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
      <circle cx="17" cy="17" r="16" fill="none" stroke="#7cc4ec" strokeWidth="1.5" />
      <path d="M8 26L26 8M8 8l18 18" stroke="#eef3f8" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export default async function Inicio() {
  const eventos = await obtenerEventosPublicos();
  const proximo = eventos[0] ?? null;

  return (
    <>
      <header className="hero">
        <nav className="nav" aria-label="Principal">
          <a className="marca" href="#inicio"><Marca /><span>{club.nombre}</span></a>
          <div className="enlaces">
            <a className="l" href="#club">El club</a>
            <a className="l" href="#horarios">Horarios</a>
            <a className="l" href="#eventos">Eventos</a>
            <a className="btn contorno" href={club.panelUrl}>Acceso socios</a>
          </div>
        </nav>
        <div className="kanji" aria-hidden="true">剣道</div>
        <div className="hero-in" id="inicio">
          <div>
            <p className="etiqueta"><span className="punto" />{club.ciudad} · {club.region}</p>
            <h1>El camino de la espada,<br />en el <em>norte de Chile</em></h1>
            <p className="lead">Practicamos kendo con disciplina, respeto y buen humor. Si nunca has tomado un shinai, puedes partir en la próxima clase.</p>
            <a className="btn rojo" href="#contacto">Quiero probar una clase</a>
          </div>
          <ProximoEvento titulo={proximo?.titulo ?? null} fechaIso={proximo?.fecha ?? null} />
        </div>
      </header>

      <main>
        <section className="sec about" id="club">
          <div className="foto" role="img" aria-label="Espacio reservado para una foto del dojo">Foto del dojo</div>
          <div>
            <h2>Un club para aprender y compartir</h2>
            <p className="sub">El kendo se entrena con bogu, shinai y mucha constancia. Aquí hay grupo de principiantes, avanzados y preparación para exámenes de grado.</p>
            <div className="filas" id="horarios">
              {horarios.map((h) => (
                <div className="fila" key={h.diaSemana}>
                  <b>{DIAS[h.diaSemana]}</b>
                  <span>{h.titulo}</span>
                  <span className="hora">{h.horas}</span>
                </div>
              ))}
            </div>
            <p className="lugar">{club.lugar}</p>
          </div>
        </section>

        <section className="sec" id="eventos">
          <h2>Eventos y actividades</h2>
          <p className="sub">Exámenes, seminarios y torneos del club.</p>
          <Eventos eventos={eventos} />
        </section>

        <section className="sec contacto" id="contacto">
          <div>
            <h2>Ven a conocernos</h2>
            <p>La primera clase es de prueba. Escríbenos y te contamos qué llevar.</p>
            <ul>
              <li><span>Correo</span>{club.contacto.correo}</li>
              <li><span>WhatsApp</span>{club.contacto.whatsapp}</li>
              <li><span>Instagram</span>{club.contacto.instagram}</li>
            </ul>
          </div>
          <div className="socios">
            <h3>¿Ya eres socio?</h3>
            <p>Revisa tus cuotas, el calendario y los comunicados.</p>
            <a className="btn blanco" href={club.panelUrl}>Ir al panel de socios →</a>
          </div>
        </section>
      </main>

      <footer className="pie">
        <span>{club.nombre}</span>
        <span>{club.ciudad}, {club.region}</span>
      </footer>
    </>
  );
}
