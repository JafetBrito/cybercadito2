import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // React entra como una integración nativa de Astro
  integrations: [react()],
  // Tailwind v4 se ejecuta como un plugin del empaquetador Vite
  vite: {
    plugins: [tailwindcss()],
  },
});