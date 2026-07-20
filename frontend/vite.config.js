import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: [
      'lucide-react', 
      'react-router-dom', 
      'axios', 
      'react-hot-toast', 
      '@reduxjs/toolkit', 
      'react-redux'
    ]
  },
  server: {
    // Ensuring clean hot updates
    hmr: {
      overlay: true,
    }
  }
})
