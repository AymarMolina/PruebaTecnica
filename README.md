# Florida Home Buyers — Landing bilingüe (React + Tailwind + Supabase)

Landing responsive EN/ES para captar leads de propietarios que quieren vender rápido.
Stack: **Vite + React 19**, **Tailwind CSS v4**, **Supabase** (tabla `leads` con RLS), `lucide-react` para íconos.

## 1. Instalar y correr

```bash
npm install
cp .env.example .env.local   # y completa las 2 variables
npm run dev                  # http://localhost:5173
```

## 2. Configurar Supabase

1. Crea un proyecto en https://supabase.com.
2. Ve a **SQL Editor → New query**, pega el contenido de `supabase/schema.sql` y dale **Run**.
   Crea la tabla `public.leads` con validaciones (CHECK) y **RLS**: el navegador solo puede *insertar*; nadie puede leer, editar ni borrar leads con la anon key.
3. Ve a **Project Settings → API** y copia:
   - `Project URL` → `VITE_SUPABASE_URL`
   - `anon` / `publishable` key → `VITE_SUPABASE_ANON_KEY`
4. Pégalas en `.env.local`. **Nunca** uses la `service_role` key en el frontend.
5. Envía el formulario y revisa **Table Editor → leads** (evidencia para la entrega).

> La anon key es pública por diseño; la protección real está en las políticas RLS.
> `.env.local` está en `.gitignore`, así que no se sube al repositorio.

## 3. Desplegar (Vercel)

1. Sube el repo a GitHub → **Import Project** en Vercel (detecta Vite solo).
2. En **Settings → Environment Variables** agrega `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
3. Deploy. (En Netlify es igual: build `npm run build`, publish `dist`.)

## Estructura

```
public/
  logo.png              ← logo del navbar
  logo-light.png        ← logo para fondo oscuro (footer)
  logo-mark.png         ← isotipo (palmera + casa), marca de agua del hero
  logo-mark-light.png   ← isotipo claro (tarjetas navy, CTA, footer)
  favicon.png
src/
  i18n/                 ← LanguageContext + translations.js (EN/ES, persiste en localStorage)
  lib/                  ← supabase.js, validation.js, company.js (datos de contacto)
  hooks/useInView.js
  components/
    ui/                 ← Container, Button, SectionHeading, SocialIcons
    Header, Hero, LeadForm, TrustBar, Situations, HowItWorks,
    WhyUs, FAQ, CTABand, Footer, LegalModal, MobileCTABar
supabase/schema.sql
```

## Qué incluye

- **Selector de idioma** EN/ES que cambia todo el contenido visible, actualiza `<html lang>` y el `<title>`.
- **Formulario**: nombre (opcional), celular (obligatorio, máscara `(813) 555-1234`, valida 10 dígitos EE. UU.),
  correo (opcional, valida formato), dirección (obligatoria), plazo de venta (opcional) y términos (obligatorio, abre modal).
  Estados de carga, éxito y error; foco automático al primer campo inválido; honeypot anti-spam.
- **Responsive**: menú hamburguesa, formulario primero en móvil, timeline vertical en “How it works”,
  barra CTA fija inferior en móvil (se oculta mientras se ve el hero). Sin scroll horizontal de 320 px en adelante.
- **Accesibilidad**: labels reales, `aria-invalid`/`aria-describedby`, acordeón FAQ con `aria-expanded`, `<dialog>` nativo, respeta `prefers-reduced-motion`.

## Personalizar

- Datos de contacto: `src/lib/company.js`.
- Foto del hero: guarda `public/images/hero.jpg` y en `company.js` cambia `heroImage: null` por `'/images/hero.jpg'`.
- Textos: `src/i18n/translations.js`. Los testimonios son de ejemplo: reemplázalos por reseñas reales.
- Colores de marca (`navy-*`, `palm-*`): `src/index.css` dentro de `@theme`.
