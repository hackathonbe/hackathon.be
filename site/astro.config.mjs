import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://hackathon.be',
  // If deploying to username.github.io/repo-name, use:
  // base: '/repo-name',
  integrations: [tailwind()],
  vite: {
    server: {
      port: 3000,
      host: true,
    },
  },
});
