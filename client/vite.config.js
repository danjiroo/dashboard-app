/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

dotenv.config(); 

console.log('@process.env.VITE_API_BASE_URL', process.env.VITE_API_BASE_URL)
console.log('@import.meta.env.VITE_API_BASE_URL', import.meta.env.VITE_API_BASE_URL)

export default defineConfig(() => {
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      }
    }
  }
} )
