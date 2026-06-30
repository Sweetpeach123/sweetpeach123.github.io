import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog collection. Markdown files live in src/content/blog/.
// The frontmatter schema below matches the article exactly — keep these field
// names in the .md files or the build will fail validation.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    pubDate: z.coerce.date(),
    heroImage: z.string(),       // path under /images/, e.g. /images/pool-deck-pavers-south-florida.jpg
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
