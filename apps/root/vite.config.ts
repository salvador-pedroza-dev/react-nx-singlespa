import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';

export default defineConfig({
  server: {
    port: 4200,
  },
  plugins: [ViteEjsPlugin()],
});
