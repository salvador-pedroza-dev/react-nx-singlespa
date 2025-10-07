/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(() => ({
  server: {
    port: 4201,
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
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // This alias maps '@' to the 'src' directory
    },
  },
}));
