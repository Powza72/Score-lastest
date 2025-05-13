import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/Score-Board/',  // แก้เป็นชื่อ repo ของมึง
  plugins: [
    react(),
    tailwindcss(),
  ],
})
