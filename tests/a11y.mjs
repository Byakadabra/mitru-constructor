/** Auditoría de accesibilidad (axe-core, WCAG 2.1 AA) sobre el servidor de vista previa. Uso: node tests/a11y.mjs [url-base] */
import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';
const base = process.argv[2] || 'http://localhost:4321';
const axe = readFileSync(new URL('../node_modules/axe-core/axe.min.js', import.meta.url), 'utf8');
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
let total = 0;
for (const path of ['/', '/ca/', '/en/', '/aviso-legal/', '/politica-privacidad/']) {
  for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const page = await browser.newPage({ viewport: vp, reducedMotion: 'reduce' });
    await page.goto(base + path, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); }
    });
    await page.waitForTimeout(400);
    await page.addScriptTag({ content: axe });
    const res = await page.evaluate(() => window.axe.run({ runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'] }));
    for (const v of res.violations) {
      total++;
      console.log(`${path} @${vp.width}: [${v.impact}] ${v.id} — ${v.help}\n   ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join('\n   ')}`);
    }
    await page.close();
  }
}
await browser.close();
console.log(total ? `✗ ${total} incidencias` : '✓ Sin incidencias de accesibilidad detectadas por axe');
process.exit(total ? 1 : 0);
