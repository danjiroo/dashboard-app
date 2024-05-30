/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

dotenv.config(); 

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      // prod does not need to proxy, but instead, we directly call the api endpoints
      proxy: mode === 'development' ? {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      } : undefined,
    },
  };
});