import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
// https://vitejs.dev/config/
dotenv.config(); // Load environment variables from .env

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env // Passes environment variables to your app
  }
})
