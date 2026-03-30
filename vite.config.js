// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true,
    allowedHosts: [
      'nonaccredited-warner-nonecliptic.ngrok-free.dev'
    ]
  },
  build: {
    rollupOptions: {
      input: {
        main:  'index.html',
        task1: 'task1.html',
        task2: 'task2.html',
        task3: 'task3.html',
        task4: 'task4.html',
      }
    }
  }
})