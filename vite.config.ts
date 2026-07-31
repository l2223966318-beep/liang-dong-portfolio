import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/liang-dong-portfolio/' : '/',
  plugins: [react()],
}))
