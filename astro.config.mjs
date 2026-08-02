// @ts-check
import { defineConfig, fontProviders } from 'astro/config'; // 1. Import fontProviders
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  fonts: [
    {
      provider: fontProviders.google(), // 2. Use fontProviders.google()
      name: 'Atkinson Hyperlegible',
      cssVariable: '--font-atkinson',
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