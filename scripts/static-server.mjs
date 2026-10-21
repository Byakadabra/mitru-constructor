// Servidor estático mínimo para renderizar las escenas de scripts/render/ con Chromium.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.woff2': 'font/woff2', '.png': 'image/png', '.svg': 'image/svg+xml' };
export function serve(root, port = 0) {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
      try {
        const body = await readFile(join(root, path));
        res.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream' });
        res.end(body);
      } catch {
        res.writeHead(404).end('not found');
      }
    });
    server.listen(port, '127.0.0.1', () => resolve(server));
  });
}
