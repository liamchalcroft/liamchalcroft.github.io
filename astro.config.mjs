// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://liamchalcroft.github.io',
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
  build: { format: 'directory' },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  redirects: {
    '/about': '/',
    '/resume': '/cv/',
    '/open-source': '/software/',
  },
});
