import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    coverImage: z.string().optional(),
    track: z.object({
      title: z.string(),
      artist: z.string(),
      src: z.string(),
      cover: z.string()
    }).optional(),
    sheetMusicUrl: z.string().optional(),
    gallery: z.array(
      z.object({
        src: z.string(),
        alt: z.string().optional(),
        title: z.string().optional(),
        type: z.enum(['image', 'video']).default('image')
      })
    ).optional()
  })
});

export const collections = { blog };