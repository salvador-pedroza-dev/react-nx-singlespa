/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/signature',
  server: {
    port: 4202,
  },
  plugins: [react()],
  build: {
    outDir: './dist',
    emptyOutDir: true,
    entryFile: 'src/main.ts',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
}));
