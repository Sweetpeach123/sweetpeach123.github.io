// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://paversofpalmbeach.com',
  trailingSlash: 'always',
  integrations: [sitemap()],
  // Inline page CSS so there's no render-blocking stylesheet request (big win for mobile FCP/LCP)
  build: { inlineStylesheets: 'always' },
});
