// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/University-of-Zimbabwe-campus-navigation-system/'  // IMPORTANT: Replace with your actual repository name
})