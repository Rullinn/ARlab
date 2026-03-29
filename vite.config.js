import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true, // Дозволяє доступ по локальній мережі [cite: 306]
    allowedHosts: [
      'nonaccredited-warner-nonecliptic.ngrok-free.dev' // Твоя адреса з ngrok
    ]
  }
})