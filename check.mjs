import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

for (const page of ['index.html', 'privacy.html', 'support.html', 'licenses.html']) {
  const html = readFileSync(page, 'utf8');
  if (!/<title>[^<]+<\/title>/.test(html)) throw new Error(`${page}: title is missing`);
  for (const [, target] of html.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)) {
    if (/^(https?:|mailto:)/.test(target)) continue;
    if (!existsSync(resolve(dirname(page), target))) throw new Error(`${page}: missing ${target}`);
  }
  console.log(`${page}: OK`);
}
