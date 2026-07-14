// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://paversofpalmbeach.com',
  trailingSlash: 'always',
  // Keep the post-form thank-you page out of the sitemap (it has no inbound links → orphan)
  integrations: [sitemap({ filter: (page) => !page.includes('/thank-you') })],
  // Inline page CSS so there's no render-blocking stylesheet request (big win for mobile FCP/LCP)
  build: { inlineStylesheets: 'always' },
});
