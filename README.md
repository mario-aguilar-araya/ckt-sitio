# Sitio público · Club de Kendo Tarapacá

Sitio web del club (Next.js 16, App Router) pensado para desplegarse en Vercel.
Es independiente del panel de gestión; el botón "Acceso socios" lleva al panel.

## Desarrollo

```bash
cp .env.example .env.local   # completar valores
npm install
npm run dev
```

Sin variables de Supabase, en desarrollo se muestran eventos de ejemplo.

## Contenido

- Textos, horarios y contacto: `lib/club.ts` (lo marcado `EJEMPLO` hay que reemplazarlo).
- Eventos: se leen de la tabla `eventos` del Supabase del panel, solo los marcados `publico = true`.
  Antes de usarlos hay que aplicar `supabase/migracion-eventos-publicos.sql` en ese proyecto.

## Despliegue en Vercel

1. Importar este repo en Vercel como proyecto nuevo (preset Next.js).
2. Definir las variables de `.env.example`.
3. Más adelante, en Settings → Domains, agregar el dominio propio.
