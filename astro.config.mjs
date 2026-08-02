// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Configure Astro's built-in font loader here:
  fonts: [
    {
      provider: 'google', // or 'fontsource'
      name: 'Atkinson Hyperlegible',
      cssVariable: '--font-atkinson', // <--- Must match what you passed to <Font cssVariable="..." />
    },
  ],
  integrations: [react(), mdx()],
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