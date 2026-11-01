import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { proxy: { '/api': 'http://localhost:8787' } },
  build: { rollupOptions: { output: { manualChunks: (id: string) => id.includes('framer-motion') || id.includes('/motion-') ? 'motion' : undefined } } },
})
