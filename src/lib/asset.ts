import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

// Absolute path to /public. Astro runs the build from the project root, so cwd
// is stable — unlike import.meta.url, which Vite rewrites to a bundled location.
const publicDir = process.cwd() + '/public';
const cache = new Map<string, string>();

/**
 * Cache-busting for images kept in /public.
 * Appends `?v=<8-char content hash>` to the URL. The hash changes only when the
 * file's bytes change, so browsers/CDN fetch a fresh copy right after an edit,
 * but keep caching aggressively while the photo is unchanged.
 * Usage in .astro: `src={v('/images/portfolio/foo-1.jpg')}`
 */
export function v(path: string): string {
  const cached = cache.get(path);
  if (cached) return cached;
  let out = path;
  try {
    const buf = readFileSync(publicDir + path.split('?')[0]);
    const hash = createHash('md5').update(buf).digest('hex').slice(0, 8);
    out = `${path}?v=${hash}`;
  } catch {
    out = path; // missing file → leave the URL untouched
  }
  cache.set(path, out);
  return out;
}
