import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react";
export default defineConfig({
  root: 'public',
  build: {
    // Relative to the root
    outDir: '../dist',
  },
  plugins: [
    // …
    react({
      // Use React plugin in all *.jsx and *.tsx files
      include: '**/*.{js,jsx,ts,tsx}',
      babel: {
        plugins: ['babel-plugin-styled-components'],
      },
    }),
  ],
});