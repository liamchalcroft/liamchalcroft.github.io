import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const link = z.object({ label: z.string(), url: z.url() });

/**
 * One file per paper. The filename (minus .md) is the URL slug, so
 * `2025-foo.md` is served at /publication/2025-foo/. Existing slugs are kept
 * so old links keep working.
 */
const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    /** Used where space is tight: film-sheet tiles, the 404, OG images. */
    shortTitle: z.string(),
    date: z.coerce.date(),
    /** In citation order. Your own name must be written exactly "L. Chalcroft". */
    authors: z.array(z.string()).min(1),
    /** True when `authors` is a truncated list of a large consortium. */
    etAl: z.boolean().default(false),
    venue: z.string(),
    venueShort: z.string(),
    kind: z.enum(['journal', 'conference', 'workshop', 'thesis']),
    /** Which procedural thumbnail the paper gets. */
    modality: z.enum(['mri', 'ultrasound', 'photonics']),
    selected: z.boolean().default(false),
    badge: z.string().optional(),
    note: z.string().optional(),
    links: z.object({
      paper: z.url().optional(),
      arxiv: z.url().optional(),
      code: z.url().optional(),
      pdf: z.url().optional(),
      extra: z.array(link).default([]),
    }),
    doi: z.string().optional(),
    /** Fields that only matter for the BibTeX export. */
    bib: z.object({
      type: z.enum(['article', 'inproceedings', 'phdthesis']),
      container: z.string(),
      volume: z.string().optional(),
      number: z.string().optional(),
      pages: z.string().optional(),
      publisher: z.string().optional(),
      school: z.string().optional(),
    }),
    figure: z
      .object({
        src: z.string(),
        width: z.number(),
        height: z.number(),
        alt: z.string(),
        caption: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = { publications };
