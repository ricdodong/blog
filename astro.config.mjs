// astro.config.mjs
// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import font from '@astrojs/font'; // 1. Import font

export default defineConfig({
  integrations: [
    react(), 
    mdx(),
    font({ // 2. Add font configuration
      fonts: [
        {
          provider: 'google', // or 'fontsource'
          name: 'Atkinson Hyperlegible',
          cssVariable: '--font-atkinson', // <--- Must match the string passed to <Font />
        },
      ],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      dedupe: ['react', 'react-dom']
    },
    optimizeDeps: {
      include: ['react', 'react-dom', '@nanostores/react', 'lucide-react', 'yet-another-react-lightbox']
    },
    ssr: {
      external: ['react', 'react-dom']
    }
  }
});