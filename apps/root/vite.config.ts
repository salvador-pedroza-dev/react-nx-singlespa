import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  server: {
    port: 4200,
  },
  plugins: [tailwindcss(), ViteEjsPlugin()],
});
