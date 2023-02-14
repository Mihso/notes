import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import EnvironmentPlugin from 'vite-plugin-environment'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
    include: '**/*.{js,jsx,ts,tsx}',
   }),
   EnvironmentPlugin('all', {prefix: ''})],
  server: {
    port: 5000,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
        ".ts": "tsx",
      },
    },
  },
})
