import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from 'astro/loaders'


const haikus = defineCollection({
  loader: glob({ base: './src/content/haikus', pattern: '**/*.{md, mdx}' }),
  schema: z.object({
    autoria: z.string(),
    anio: z.string().optional(),
    escuela: z.string().optional(),
    curso: z.string().optional(),
    tags: z.array(z.string().min(3)).optional(),
    // pubDate: z.string().transform((date) => {
    //   const fechaEnCrudo = new Date(date);
    //   if (fechaEnCrudo.toString() === "Invalid Date") {
    //     throw new Error(`La fecha ${date} no es válida`);
    //   }
    //   return fechaEnCrudo;
    // }),
    pubDate: z.coerce.date()
  }),
});

export const collections = { haikus };
