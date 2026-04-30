import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5175,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
      '/sitemap.xml': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        rewrite: () => '/api/public/vault-clothing/sitemap.xml',
      },
      '/robots.txt': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        rewrite: () => '/api/public/vault-clothing/robots.txt',
      },
    },
  },
});
