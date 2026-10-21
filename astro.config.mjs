// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// URL pública: cámbiala con PUBLIC_SITE_URL al conectar el dominio definitivo.
const site = process.env.PUBLIC_SITE_URL || 'https://mitru-constructor.vercel.app';
const legalPaths = /(aviso-legal|politica-privacidad|politica-cookies|avis-legal|politica-privacitat|politica-galetes|legal-notice|privacy-policy|cookie-policy|404)/;

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  compressHTML: true,
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es-ES', ca: 'ca-ES', en: 'en' } },
      filter: (page) => !legalPaths.test(page),
    }),
  ],
});
