import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Front matter exported from the Drive articles by Pioneer. The Markdown body is company content and is never edited here.
const guides = defineCollection({
  loader: glob({
    // The three files after the `!` are the earlier placeholder pages (different front matter). They are superseded by
    // college-money, major-worth and choose-a-counselor and can be deleted.
    pattern: ['*.md', '!how-to-choose-a-college-counselor.md', '!paying-for-college.md', '!what-a-major-is-worth.md'],
    base: './src/content/guides',
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    category: z.string(),
    // Month the source article was last checked (YYYY-MM). Shown as "Last verified"; re-check every cycle.
    lastVerified: z.string().regex(/^\d{4}-\d{2}$/),
    sources: z.array(z.object({ label: z.string(), url: z.string().default('') })).default([]),
    driveFileId: z.string(),
    driveModified: z.string(),
    status: z.enum(['draft', 'needs-review']),
    // Internal editor notes: validated, never rendered.
    openMarkers: z.array(z.string()).default([]),
    notes: z.string().default(''),
  }),
});

export const collections = { guides };
