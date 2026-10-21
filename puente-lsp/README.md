# Puente LSP · Fase 0

Landing page para pedir intérpretes de Lengua de Señas Peruana (LSP) por videollamada.
Las solicitudes se guardan en Supabase y se atienden a mano (ver `../hoja-de-ruta-puente-lsp.md`).

## Correr en local

```bash
npm install
cp .env.example .env.local   # y completa los valores
npm run dev
```

Sin las variables de Supabase la página funciona, pero el formulario muestra un aviso y no guarda.

## Conectar Supabase

1. Crea un proyecto nuevo en Supabase (región `sa-east-1`, São Paulo, la más cercana a Perú).
2. Ejecuta `supabase/migrations/0001_solicitudes.sql` en el SQL Editor.
3. Copia la URL y la **secret key** (Project Settings → API Keys) en `.env.local`.

La tabla tiene RLS activado y ninguna política pública: solo el servidor (con la secret key) puede escribir y leer.

## Ver las solicitudes

En Supabase → Table Editor → `solicitudes`. Cambia `estado` a `contactada`, `atendida` o `descartada` según avances.

## Estructura

- `src/app/page.tsx`: la landing.
- `src/components/SolicitudForm.tsx`: el formulario (accesible, errores en texto visible).
- `src/app/actions.ts`: Server Action que valida y guarda.
- `src/lib/solicitud.ts`: reglas de validación (Zod) y opciones del formulario.

## Pendiente antes de lanzar

- Grabar el video en LSP del inicio (con el asesor Sordo).
- Poner el número de WhatsApp real en `NEXT_PUBLIC_WHATSAPP`.
- Agregar aviso de privacidad (Ley 29733 de Protección de Datos Personales).
