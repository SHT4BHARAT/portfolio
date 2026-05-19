import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sht-portfolio.vercel.app',
  output: 'static',
  integrations: [
    react(),
    sitemap(),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    domains: [],
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
