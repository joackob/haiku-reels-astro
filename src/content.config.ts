import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const haikus = defineCollection({
	loader: glob({ base: "./src/content/haikus", pattern: "**/*.{md, mdx}" }),
	schema: z.object({
		autoria: z.string(),
		anio: z.string().optional(),
		escuela: z.string().optional(),
		curso: z.string().optional(),
		tags: z.array(z.string().min(3)).optional(),
		pubDate: z.coerce.date(),
		// SEO fields
		title: z.string().optional(),
		description: z.string().optional(),
		image: z.string().optional(),
		imageAlt: z.string().optional(),
		keywords: z.string().optional(),
		category: z.string().optional(),
		modifiedDate: z.coerce.date().optional(),
	}),
});

export const collections = { haikus };
