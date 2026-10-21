/**
 * Comprobaciones del sitio compilado (dist/). Ejecuta `npm run build` antes.
 * Revisa SEO básico, accesibilidad estructural y que todos los enlaces internos existan.
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const errors = [];
const fail = (file, msg) => errors.push(`${file.replace(dist, '/')}: ${msg}`);

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
const htmlFiles = walk(dist).filter((f) => f.endsWith('.html'));
const titles = new Map();

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const count = (re) => (html.match(re) || []).length;
  if (!/<html lang="(es|ca|en)"/.test(html)) fail(file, 'falta lang en <html>');
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  if (!title) fail(file, 'falta <title>');
  else if (titles.has(title)) fail(file, `título duplicado con ${titles.get(title)}`);
  else titles.set(title, file);
  if (!/<meta name="description" content="[^"]{50,}"/.test(html)) fail(file, 'meta description ausente o corta');
  if (count(/<h1[\s>]/g) !== 1) fail(file, `debe haber exactamente un <h1> (hay ${count(/<h1[\s>]/g)})`);
  if (!/<link rel="canonical"/.test(html)) fail(file, 'falta canonical');
  if (!file.endsWith('404.html') && count(/hreflang="/g) < 4) fail(file, 'faltan hreflang');
  if (/<img(?![^>]*\balt=)[^>]*>/.test(html)) fail(file, 'imagen sin alt');
  if (/localhost/.test(html)) fail(file, 'contiene "localhost"');
  // Enlaces internos
  for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const target = join(dist, href);
    const ok = existsSync(target) && (statSync(target).isFile() || existsSync(join(target, 'index.html')));
    if (!ok) fail(file, `enlace roto ${href}`);
  }
  // Anclas de la misma página
  for (const [, id] of html.matchAll(/href="#([\w-]+)"/g)) {
    if (!html.includes(`id="${id}"`)) fail(file, `ancla inexistente #${id}`);
  }
  // Formulario: cada campo con label
  for (const [, id] of html.matchAll(/<(?:input|select|textarea)[^>]*\bid="([^"]+)"/g)) {
    if (!html.includes(`for="${id}"`)) fail(file, `campo #${id} sin <label>`);
  }
  // JSON-LD válido
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try {
      JSON.parse(json);
    } catch {
      fail(file, 'JSON-LD inválido');
    }
  }
}

for (const f of ['robots.txt', 'sitemap-index.xml', 'favicon.svg', 'og/og-es.png', '404.html']) {
  if (!existsSync(join(dist, f))) errors.push(`falta /${f}`);
}

console.log(`${htmlFiles.length} páginas revisadas.`);
if (errors.length) {
  console.error(`✗ ${errors.length} problema(s):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log('✓ Todas las comprobaciones superadas.');
