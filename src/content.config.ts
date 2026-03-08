import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articleSchema = z.object({
  title: z.string(),
  meta_description: z.string(),
  h1: z.string(),
  date_published: z.string(),
  date_modified: z.string(),
  author: z.string().default("La redaction IntimeLab"),
  category: z.string(),
  keyword_principal: z.string().optional(),
  keywords_secondaires: z.array(z.string()).optional(),
  intent: z.string().optional(),
  disclosure: z.string().optional(),
  image: z.string().optional(),
  jsonld: z.string().optional(),
});

const prostate = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/prostate' }),
  schema: articleSchema,
});

const connectes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/connectes' }),
  schema: articleSchema,
});

export const collections = { prostate, connectes };
