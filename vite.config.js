import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://ai-content-generator-backend-i244.onrender.com',
        changeOrigin: true, // Ensures the origin header is changed to the target URL
        rewrite: (path) => path.replace(/^\/api/, ''), // Optionally rewrite the path if needed
      },
    },
  },
})
