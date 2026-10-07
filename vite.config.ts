import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // two pages: the website, and the /admin page (viewing links and the quote)
    rollupOptions: {
      input: {
        main: 'index.html',
        admin: 'admin.html',
      },
    },
  },
  // This project's own ports, so it never clashes with Becca's other
  // sites: http://localhost:5184 while working, 4184 for the preview.
  server: { port: 5184, strictPort: true },
  preview: { port: 4184, strictPort: true },
})
