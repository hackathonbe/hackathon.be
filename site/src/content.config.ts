import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import {
  AUDIENCES,
  EVENT_STATUSES,
  EVENT_TYPES,
  FORMATS,
  LANGUAGES,
  LISTED_BY,
  REGIONS,
} from './lib/event-fields';

// Links end up in href attributes, so only http(s) is accepted.
const webUrl = z
  .string()
  .url()
  .regex(/^https?:\/\//, 'must start with http:// or https://');

// One YAML file per event in src/content/events. The file name is the event's
// permanent URL slug: /hackathons/<file-name>/. See docs/listings.md.
const events = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/events' }),
  schema: z
    .object({
      name: z.string().min(3),
      edition: z.string().optional(),
      // Shared by every edition of a recurring event, e.g. "hack-the-future".
      series: z
        .string()
        .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/)
        .optional(),
      type: z.enum(EVENT_TYPES).default('hackathon'),
      start_date: z.coerce.date().optional(),
      end_date: z.coerce.date().optional(),
      city: z.string().optional(),
      region: z.enum(REGIONS),
      venue: z.string().optional(),
      format: z.enum(FORMATS).optional(),
      organizer: z.string().optional(),
      themes: z.array(z.string()).default([]),
      audience: z.enum(AUDIENCES).optional(),
      languages: z.array(z.enum(LANGUAGES)).default([]),
      // The event's own page.
      url: webUrl.optional(),
      // The page where name, date and place were confirmed.
      source_url: webUrl.optional(),
      // Written for this site, never copied from the event page.
      description: z.string().max(400).optional(),
      status: z.enum(EVENT_STATUSES).default('scheduled'),
      recurring: z.boolean().optional(),
      // Only published events get a page. Everything else is a draft.
      published: z.boolean().default(false),
      // Why a draft is not published yet.
      review: z.string().optional(),
      confidence: z.enum(['high', 'medium', 'low']).optional(),
      listed_by: z.enum(LISTED_BY).default('curator'),
      checked_on: z.coerce.date().optional(),
      // Curator notes. Never shown on the site.
      notes: z.string().optional(),
    })
    .strict()
    .superRefine((event, ctx) => {
      if (event.start_date && event.end_date && event.end_date < event.start_date) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['end_date'],
          message: 'end_date is before start_date',
        });
      }
      if (event.published) {
        for (const field of ['start_date', 'description', 'source_url'] as const) {
          if (!event[field]) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: [field],
              message: `${field} is required before an event can be published`,
            });
          }
        }
      }
    }),
});

export const collections = { events };
