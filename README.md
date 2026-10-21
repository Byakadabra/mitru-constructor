# MITRU CONSTRUCTOR — web comercial (prueba piloto)

Web estática en **Astro 5**, en castellano (principal), catalán e inglés. Sin bases de datos ni servidor propio: rápida, barata (gratis en Vercel o Netlify) y fácil de mantener.

## Estado

| | |
|---|---|
| Desarrollada y probada en local | ✅ |
| Publicada en una URL pública | ⏳ pendiente (ver «Publicar») |
| Dominio propio `mitruconstructor.com` | ⏳ disponible, **sin comprar** (11,25 USD/año en Vercel, consultado el 21/10/2026) |
| Indexación en Google | 🔒 desactivada a propósito (`noindex`) mientras haya datos provisionales |

## Cambiar datos (teléfono, correo, zona…)

Todo está en **`src/config/site.ts`**: es el único archivo que hay que tocar. Los textos de cada idioma están en `src/i18n/es.ts`, `ca.ts` y `en.ts`.

### Datos pendientes o provisionales
- **Teléfono/WhatsApp**: `642 54 09 62` es el número de prueba.
- **NIF/NIE del titular** (`legal.nif`): vacío a propósito. El NIE facilitado era de otra persona (no del titular, Mitru Orza), así que no se ha publicado. La web muestra «pendiente de completar».
- **Domicilio del titular** (`legal.address`): **obligatorio** en el aviso legal (art. 10 de la LSSI). Para un autónomo es su domicilio fiscal: la dirección que figura en Hacienda (modelo 036/037). No hace falta mostrarla en ninguna otra parte de la web.
- **Días del horario** (`contact.hours.days`): solo sabemos «de 9:00 a 13:00».
- **Municipios de ejemplo** (`area.towns`): calculados por cercanía a Reus (menos de 30 km). Hay que confirmarlos.
- **Textos legales** (`src/i18n/legal.ts`): son borradores. Conviene que los revise un gestor o asesor.
- **«Casas modulares»** aparece en el logo original, pero no está en la lista de servicios. Hay que confirmar si se ofrece.

## Formulario de presupuesto

- **Ahora (Vercel)**: se envía con **FormSubmit** (gratis, sin cuenta) a `orzamitru20@gmail.com`.
  **Importante:** el primer envío no llega como solicitud. FormSubmit manda un correo de *Activate Form* a ese Gmail. Hay que pulsarlo una vez (y revisar la carpeta de spam). Hasta entonces, el formulario muestra un error y ofrece llamar o escribir por WhatsApp. **Haz tú el primer envío de prueba** en cuanto la web esté publicada.
- **Más adelante (Netlify)**: define `PUBLIC_FORM_PROVIDER=netlify`. Netlify Forms detecta el formulario solo; las notificaciones por correo se activan en *Forms → Notifications*.
- Si se pone `PUBLIC_FORM_PROVIDER=none`, el formulario se desactiva y avisa de que se use el teléfono o WhatsApp.

## Comandos

```bash
npm install
npm run dev        # desarrollo en http://localhost:4321
npm run build      # genera dist/
npm test           # comprobaciones SEO, enlaces, etiquetas (tras build)
node tests/a11y.mjs              # accesibilidad con axe (con `npm run preview` en marcha)
node scripts/generate-assets.mjs # regenera imágenes OG, iconos y logo PNG
```

## Publicar

### Opción A — Vercel con GitHub (recomendada para la prueba)
1. Crea un repositorio vacío en GitHub llamado `mitru-constructor` y sube este proyecto (`git remote add origin … && git push -u origin main`).
2. En https://vercel.com/new pulsa **Import** sobre ese repositorio. Vercel detecta Astro y no hay que configurar nada.
3. Opcional, en *Settings → Environment Variables*: `PUBLIC_SITE_URL` con la URL que te asigne Vercel (por defecto se usa `https://mitru-constructor.vercel.app`).
4. Cada `git push` vuelve a publicar la web.

### Opción B — Vercel CLI desde tu ordenador
```bash
npm install && npm run build
npx vercel deploy --prod   # pide iniciar sesión la primera vez
```

### Opción C — Netlify (fase definitiva)
Con el mismo repositorio: *Add new site → Import from Git*. `netlify.toml` ya incluye el comando, la carpeta de salida y las cabeceras. También puedes arrastrar la carpeta `dist/` a https://app.netlify.com/drop para tener una URL al instante.

## Dominio propio

`mitruconstructor.com` y `mitruconstructor.es` estaban **disponibles** el 21/10/2026 (comprobado con el registrador de Vercel). El `.com` cuesta **11,25 USD/año** en Vercel; el precio del `.es` no se pudo consultar ahí. Se puede comprar en Vercel (*Domains → Buy*), en Netlify o en cualquier registrador (Dinahosting, IONOS, Namecheap…). **No se ha comprado nada.**

Para conectarlo:
1. *Project → Settings → Domains → Add* `mitruconstructor.com` (y `www`).
2. Si se compró en otro sitio, configura los DNS que indique Vercel o Netlify (registro A o CNAME).
3. Vuelve a compilar con `PUBLIC_SITE_URL=https://mitruconstructor.com`.

## Google (cuando los datos sean definitivos)

1. Define `PUBLIC_INDEXABLE=true` y vuelve a publicar (quita el `noindex`).
2. En https://search.google.com/search-console añade la propiedad del dominio y verifícala, por DNS o con `PUBLIC_GSC_VERIFICATION`.
3. Envía `https://mitruconstructor.com/sitemap-index.xml` en *Sitemaps*.
4. En *Inspección de URLs* pide la indexación de la portada.
5. Crea el **Perfil de Empresa de Google** (Google Business Profile) como empresa de servicios en zona (sin dirección pública). Es lo que más ayuda al SEO local en Reus.

Google tarda de días a semanas en indexar una web. Nada garantiza una posición concreta en los resultados.

Ya incluido: títulos y descripciones por idioma, H1 único, `hreflang` es/ca/en, canonical, sitemap, `robots.txt`, Open Graph con imagen por idioma, datos estructurados `HomeAndConstructionBusiness` (solo con datos reales), página 404 y textos legales con `noindex`.

## Estructura

```
src/config/site.ts        datos de la empresa (fuente única)
src/i18n/                 textos es/ca/en + legales + rutas
src/styles/tokens.css     design tokens (primitivos → semánticos → componentes)
src/components/           Header, Hero, Services, About, Process, Area, Faq, Contact, Footer…
src/pages/                rutas (es en raíz, /ca/, /en/)
public/                   logo SVG/PNG, favicon, imágenes OG
tests/                    comprobaciones automáticas
```
