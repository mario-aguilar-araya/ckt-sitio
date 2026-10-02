// Contenido del club. Todo lo marcado "EJEMPLO" debe reemplazarse por los datos reales.
export const club = {
  nombre: "Club de Kendo Tarapacá",
  ciudad: "Iquique", // EJEMPLO
  region: "Región de Tarapacá",
  panelUrl: process.env.NEXT_PUBLIC_PANEL_URL ?? "https://gestion-ckt.vercel.app",
  zonaHoraria: "America/Santiago",
  contacto: {
    correo: "contacto@ejemplo.cl", // EJEMPLO
    instagram: "@ejemplo", // EJEMPLO
    whatsapp: "+56 9 0000 0000", // EJEMPLO
  },
  lugar: "Dirección del dojo por confirmar", // EJEMPLO
} as const;

// diaSemana: 0 = domingo … 6 = sábado
export const horarios = [
  { diaSemana: 2, horas: "20:00–21:30", titulo: "Clase general" }, // EJEMPLO
  { diaSemana: 4, horas: "20:00–21:30", titulo: "Técnica y combate" }, // EJEMPLO
  { diaSemana: 6, horas: "10:00–12:00", titulo: "Principiantes y avanzados" }, // EJEMPLO
] as const;

export const DIAS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"] as const;
