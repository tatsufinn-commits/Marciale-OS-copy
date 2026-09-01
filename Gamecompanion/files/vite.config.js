import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: '.',
  base: './',
  publicDir: 'public',
  build: {
    outDir: path.resolve(__dirname, '../../TheHUB 1.5.5.2.3 a v/companion'),
    emptyOutDir: true,
    assetsDir: 'assets',
    minify: 'terser',
    target: 'es2020'
  },
  server: {
    port: 3000,
    open: false
  }
});
