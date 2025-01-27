import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: 'src', // Project root
  publicDir: path.resolve(__dirname, 'public'), // Absolute path to the public directory
  build: {
    outDir: __dirname
  },
  base: '/notgambling/',
  server: {
    fs: {
      strict: true, // Restrict file system access
    },
  },
});

