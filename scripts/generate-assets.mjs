/**
 * Genera las imágenes estáticas a partir del logotipo vectorial:
 *  - public/og/og-{es,ca,en}.png (1200×630) para compartir en redes
 *  - public/favicon-32.png, public/apple-touch-icon.png, public/icon-512.png
 *  - public/logo-mitru-constructor.png (logotipo completo, fondo transparente)
 *  - public/img/logo-3d.webp (logo 3D con rótulo, imagen estática del hero)
 *  - public/img/logo-mark-3d.webp (símbolo 3D para la cabecera)
 * Uso: node scripts/generate-assets.mjs  (requiere Chromium; ver README)
 */
import { chromium } from 'playwright-core';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { serve } from './static-server.mjs';
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
@font-face{font-family:B;src:url(${fontUrl('bitter/files/bitter-latin-wght-normal.woff2')}) format('woff2-variations');font-weight:100 900}
@font-face{font-family:I;src:url(${fontUrl('inter/files/inter-latin-wght-normal.woff2')}) format('woff2-variations');font-weight:100 900}
*{margin:0;box-sizing:border-box}body{font-family:I}`;

const og = (c) => `<html><head><style>${css}
body{width:1200px;height:630px;background:#f5eee2;position:relative;overflow:hidden;padding:64px 72px}
.grid{position:absolute;inset:0;background-image:linear-gradient(#0f17120d 1px,transparent 1px),linear-gradient(90deg,#0f17120d 1px,transparent 1px);background-size:28px 28px}
.band{position:absolute;right:0;top:0;bottom:0;width:430px;background:radial-gradient(70% 40% at 50% 80%,#f07a4a55,transparent 70%),linear-gradient(180deg,#08182b,#12304f)}
.big{position:absolute;right:0;bottom:130px;width:430px}
.logo{display:flex;align-items:center;gap:16px;position:relative}
.logo svg{width:92px}.w{font-family:B;font-weight:900;font-size:50px;color:#24782f;line-height:1;text-shadow:0 1px 0 #1c6127,0 2px 0 #1c6127,0 3px 0 #154a1e,0 4px 0 #154a1e,0 8px 14px #0003}
.s{font-family:B;font-weight:800;font-size:18px;letter-spacing:.3em;color:#b33a28;margin-top:6px}
h1{position:relative;font-family:A;font-stretch:112%;font-weight:850;font-size:54px;line-height:1.04;letter-spacing:-.02em;color:#17211b;margin-top:60px;max-width:640px}
h1 span{color:#b33a28}
ul{position:relative;display:flex;gap:10px;list-style:none;padding:0;margin-top:40px;flex-wrap:wrap;max-width:720px}
li{font-family:A;font-weight:700;font-size:20px;padding:10px 18px;border-radius:999px;background:#fff;border:1.5px solid #d9ded9;color:#17211b}
li:last-child{background:#b33a28;border-color:#b33a28;color:#fff}
</style></head><body><div class="grid"></div><div class="band"></div>
<div class="big">${mark3d}</div>
<div class="logo"><div style="width:120px">${mark3d}</div><div><div class="w">MITRU</div><div class="s">CONSTRUCTOR</div></div></div>
<h1>${c.line1}<br><span>${c.line2}</span></h1>
<ul>${c.tags.map((t) => `<li>${t}</li>`).join('')}</ul></body></html>`;

const icon = (size, pad, bg) =>
  `<html><head><style>body{margin:0;width:${size}px;height:${size}px;display:grid;place-items:center;background:${bg}}div{width:${size - pad * 2}px}</style></head><body><div>${size < 64 ? mark : mark3d}</div></body></html>`;

const fullLogo = () => `<html><head><style>${css}body{background:transparent;display:inline-flex;align-items:center;gap:22px;padding:24px}
.m{width:170px}.w{font-family:B;font-weight:900;font-size:80px;color:#24782f;line-height:1;text-shadow:0 2px 0 #1c6127,0 4px 0 #154a1e,0 6px 0 #154a1e}
.s{font-family:B;font-weight:800;font-size:27px;letter-spacing:.3em;color:#b33a28;margin-top:10px}</style></head>
<body><div class="m">${mark3d}</div><div><div class="w">MITRU</div><div class="s">CONSTRUCTOR</div></div></body></html>`;

const browser = await chromium.launch({ executablePath: exe, args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });

/* ── Renders 3D (misma escena que el hero) ── */
const server = await serve(root);
const base = `http://127.0.0.1:${server.address().port}/scripts/render/logo.html`;
mkdirSync(`${root}public/img`, { recursive: true });
const render3d = async (query, w, h, type = 'image/webp') => {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(`${base}?w=${w}&h=${h}&${query}`);
  await page.waitForFunction(() => window.__ready, null, { timeout: 30000 });
  const url = await page.evaluate((t) => window.__export(t, 0.92), type);
  await page.close();
  return Buffer.from(url.split(',')[1], 'base64');
};
writeFileSync(`${root}public/img/logo-3d.webp`, await render3d('word=1&dist=11', 900, 700));
writeFileSync(`${root}public/img/logo-mark-3d.webp`, await render3d('dist=8.4&yaw=-0.3', 240, 170));
const markPng = await render3d('dist=7.6&yaw=-0.25', 512, 400, 'image/png');
writeFileSync(`${root}public/img/logo-mark-3d.png`, markPng);
server.close();
const mark3d = `<img src="data:image/png;base64,${markPng.toString('base64')}" style="width:100%;height:auto;display:block">`;

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
await shot(fullLogo(), 560, 200, `${root}public/logo-mitru-constructor.png`, true);
await browser.close();
console.log('Imágenes generadas en public/');
