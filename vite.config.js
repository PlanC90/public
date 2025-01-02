import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public',
  base: './',
  publicDir: '../',
  build: {
    outDir: '../dist',
    assetsDir: 'assets'
  },
  server: {
    port: 3000,
    host: '0.0.0.0'
  }
});