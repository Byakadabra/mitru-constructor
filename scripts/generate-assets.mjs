/**
 * Genera las imágenes estáticas a partir del logotipo vectorial:
 *  - public/og/og-{es,ca,en}.png (1200×630) para compartir en redes
 *  - public/favicon-32.png, public/apple-touch-icon.png, public/icon-512.png
 *  - public/logo-mitru-constructor.png (logotipo completo, fondo transparente)
 * Uso: node scripts/generate-assets.mjs  (requiere Chromium; ver README)
 */
import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const mark = readFileSync(`${root}public/logo.svg`, 'utf8');
// Las fuentes se incrustan en base64: una página creada con setContent no puede leer file://.
const fontUrl = (p) =>
  `data:font/woff2;base64,${readFileSync(`${root}node_modules/@fontsource-variable/${p}`).toString('base64')}`;
const exe = process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const copy = {
  es: { line1: 'Instalaciones y reformas', line2: 'en Reus, bien hechas a la primera.', tags: ['Electricidad', 'Fontanería', 'Reformas', 'Presupuesto gratis'] },
  ca: { line1: 'Instal·lacions i reformes', line2: 'a Reus, ben fetes a la primera.', tags: ['Electricitat', 'Lampisteria', 'Reformes', 'Pressupost gratis'] },
  en: { line1: 'Installations & renovations', line2: 'in Reus, done right first time.', tags: ['Electrical', 'Plumbing', 'Renovations', 'Free quote'] },
};

const css = `
@font-face{font-family:A;src:url(${fontUrl('archivo/files/archivo-latin-wdth-normal.woff2')}) format('woff2-variations');font-weight:100 900;font-stretch:62% 125%}
@font-face{font-family:I;src:url(${fontUrl('inter/files/inter-latin-wght-normal.woff2')}) format('woff2-variations');font-weight:100 900}
*{margin:0;box-sizing:border-box}body{font-family:I}`;

const og = (c) => `<html><head><style>${css}
body{width:1200px;height:630px;background:#f7f4ee;position:relative;overflow:hidden;padding:64px 72px}
.grid{position:absolute;inset:0;background-image:linear-gradient(#0f17120d 1px,transparent 1px),linear-gradient(90deg,#0f17120d 1px,transparent 1px);background-size:28px 28px}
.band{position:absolute;right:0;top:0;bottom:0;width:360px;background:#0f1712}
.big{position:absolute;right:40px;bottom:70px;width:380px}
.logo{display:flex;align-items:center;gap:16px;position:relative}
.logo svg{width:92px}.w{font-family:A;font-weight:900;font-stretch:118%;font-size:46px;color:#1c6129;line-height:1}
.s{font-family:A;font-weight:700;font-size:15px;letter-spacing:.32em;color:#c2410c;margin-top:4px}
h1{position:relative;font-family:A;font-stretch:112%;font-weight:850;font-size:60px;line-height:1.04;letter-spacing:-.02em;color:#17211b;margin-top:64px;max-width:720px}
h1 span{color:#c2410c}
ul{position:relative;display:flex;gap:10px;list-style:none;padding:0;margin-top:40px;flex-wrap:wrap;max-width:720px}
li{font-family:A;font-weight:700;font-size:20px;padding:10px 18px;border-radius:999px;background:#fff;border:1.5px solid #d9ded9;color:#17211b}
li:last-child{background:#c2410c;border-color:#c2410c;color:#fff}
</style></head><body><div class="grid"></div><div class="band"></div>
<div class="big">${mark.replace('<svg ', '<svg style="width:100%;height:auto;filter:drop-shadow(0 20px 40px #0006)" ')}</div>
<div class="logo">${mark}<div><div class="w">MITRU</div><div class="s">CONSTRUCTOR</div></div></div>
<h1>${c.line1}<br><span>${c.line2}</span></h1>
<ul>${c.tags.map((t) => `<li>${t}</li>`).join('')}</ul></body></html>`;

const icon = (size, pad, bg) =>
  `<html><head><style>body{margin:0;width:${size}px;height:${size}px;display:grid;place-items:center;background:${bg}}svg{width:${size - pad * 2}px}</style></head><body>${mark}</body></html>`;

const fullLogo = `<html><head><style>${css}body{background:transparent;display:inline-flex;align-items:center;gap:22px;padding:24px}
svg{width:150px}.w{font-family:A;font-weight:900;font-stretch:118%;font-size:76px;color:#1c6129;line-height:1}
.s{font-family:A;font-weight:700;font-size:25px;letter-spacing:.32em;color:#c2410c;margin-top:6px}</style></head>
<body>${mark}<div><div class="w">MITRU</div><div class="s">CONSTRUCTOR</div></div></body></html>`;

const browser = await chromium.launch({ executablePath: exe });
const shot = async (html, w, h, path, transparent = false) => {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path, omitBackground: transparent, clip: { x: 0, y: 0, width: w, height: h } });
  await page.close();
};
for (const [lang, c] of Object.entries(copy)) await shot(og(c), 1200, 630, `${root}public/og/og-${lang}.png`);
await shot(icon(32, 2, '#fcfbf8'), 32, 32, `${root}public/favicon-32.png`);
await shot(icon(180, 22, '#fcfbf8'), 180, 180, `${root}public/apple-touch-icon.png`);
await shot(icon(512, 70, '#fcfbf8'), 512, 512, `${root}public/icon-512.png`);
await shot(fullLogo, 560, 200, `${root}public/logo-mitru-constructor.png`, true);
await browser.close();
console.log('Imágenes generadas en public/');
