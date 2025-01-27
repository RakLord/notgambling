import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: 'src', // Project root
  publicDir: path.resolve(__dirname, 'public'), // Absolute path to the public directory
  build: {
    outDir: path.resolve(__dirname, 'dist'), // Ensure proper output directory
  },
  server: {
    fs: {
      strict: true, // Restrict file system access
    },
  },
});

