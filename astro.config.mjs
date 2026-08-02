// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
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