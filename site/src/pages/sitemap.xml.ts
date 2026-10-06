import type { APIRoute } from 'astro';
import {
  SITE_URL,
  eventPath,
  getPublishedEvents,
  groupByCity,
  isoDay,
  todayInBelgium,
} from '../lib/events';

interface Entry {
  path: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

// Built with the site, so every published event and city page is listed.
export const GET: APIRoute = async () => {
  const events = await getPublishedEvents();
  const today = todayInBelgium();

  const entries: Entry[] = [
    { path: '/', lastmod: today, changefreq: 'weekly', priority: '1.0' },
    { path: '/calendar', lastmod: today, changefreq: 'daily', priority: '0.9' },
    { path: '/hackathons/', lastmod: today, changefreq: 'weekly', priority: '0.8' },
    {
      path: '/130-hackathons-analyzed-for-you',
      lastmod: '2025-10-01',
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      path: '/the-hackathon-canvas-a-free-resource-to-organize-your-hackathon',
      lastmod: '2025-10-01',
      changefreq: 'monthly',
      priority: '0.7',
    },
    ...groupByCity(events).map((group) => ({
      path: group.path,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.7',
    })),
    ...events.map((event) => ({
      path: eventPath(event),
      lastmod: event.data.checked_on ? isoDay(event.data.checked_on) : today,
      changefreq: 'monthly',
      priority: '0.6',
    })),
  ];

  const urls = entries
    .map(
      (entry) => `  <url>
    <loc>${SITE_URL}${entry.path}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
