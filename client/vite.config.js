/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

dotenv.config(); 

console.log('@logs debug,', { viteenv: import.meta.env, processEnv: process.env})

export default defineConfig(() => {
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          // not working on prod/vercel, will debug later
          // target: process.env.VITE_API_BASE_URL,
          target: import.meta.env.NODE_ENV === 'production' ? 'https://dashboard-app-server.vercel.app' : 'http://localhost:5000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      }
    }
  }
} )
