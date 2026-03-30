import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  optimizeDeps: {
    exclude: ['lucide-react'],
  },

  server: {
    proxy: {
      // ABP HTTP API — geliştirmede CORS sorununu azaltmak için (opsiyonel)
      '/api': {
        target: process.env.VITE_ABP_PROXY_TARGET ?? 'https://localhost:44373',
        changeOrigin: true,
        secure: false,
      },
      '/connect': {
        target: process.env.VITE_ABP_PROXY_TARGET ?? 'https://localhost:44373',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
