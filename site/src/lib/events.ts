import { getCollection, type CollectionEntry } from 'astro:content';
import { LANGUAGE_LABELS, REGION_LABELS } from './event-fields';

export type EventEntry = CollectionEntry<'events'>;

export const SITE_URL = 'https://hackathon.be';
export const REPO_URL = 'https://github.com/hackathonbe/hackathon.be';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** Dates in the event files are plain days, stored as UTC midnight. */
export function isoDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Today's date in Belgium as YYYY-MM-DD. */
export function todayInBelgium(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Brussels' }).format(new Date());
}

export function startDay(event: EventEntry): string {
  return event.data.start_date ? isoDay(event.data.start_date) : '';
}

export function endDay(event: EventEntry): string {
  const end = event.data.end_date ?? event.data.start_date;
  return end ? isoDay(end) : '';
}

export function isUpcoming(event: EventEntry, today = todayInBelgium()): boolean {
  return endDay(event) >= today;
}

/** Published events, earliest first. */
export async function getPublishedEvents(): Promise<EventEntry[]> {
  const events = await getCollection('events', ({ data }) => data.published);
  return events.sort(
    (a, b) => startDay(a).localeCompare(startDay(b)) || a.data.name.localeCompare(b.data.name),
  );
}

function dayLabel(date: Date, withMonth: boolean, withYear: boolean): string {
  let label = `${DAYS[date.getUTCDay()]} ${date.getUTCDate()}`;
  if (withMonth) label += ` ${MONTHS[date.getUTCMonth()].slice(0, 3)}`;
  if (withYear) label += ` ${date.getUTCFullYear()}`;
  return label;
}

/** "6 October 2026" */
export function formatLongDate(date: Date): string {
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

/** "November 2026" */
export function formatMonthYear(date: Date): string {
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

/** "Fri 4 – Sun 6 Apr 2025", "Tue 31 Mar – Thu 2 Apr 2026" or "Sat 10 May 2025". */
export function formatDateRange(event: EventEntry, withYear = true): string {
  const { start_date: start, end_date: end } = event.data;
  if (!start) return 'Date to be announced';
  if (!end || isoDay(start) === isoDay(end)) return dayLabel(start, true, withYear);
  const sameYear = start.getUTCFullYear() === end.getUTCFullYear();
  const sameMonth = sameYear && start.getUTCMonth() === end.getUTCMonth();
  const from = dayLabel(start, !sameMonth, withYear && !sameYear);
  return `${from} – ${dayLabel(end, true, withYear)}`;
}

export function monthLabel(key: string): string {
  return `${MONTHS[Number(key.slice(5, 7)) - 1]} ${key.slice(0, 4)}`;
}

export interface MonthGroup {
  key: string;
  label: string;
  events: EventEntry[];
}

/** Groups events by the month they start in, keeping the order they come in. */
export function groupByMonth(events: EventEntry[]): MonthGroup[] {
  const groups: MonthGroup[] = [];
  for (const event of events) {
    const key = startDay(event).slice(0, 7);
    let group = groups.find((g) => g.key === key);
    if (!group) {
      group = { key, label: monthLabel(key), events: [] };
      groups.push(group);
    }
    group.events.push(event);
  }
  return groups;
}

export function slugify(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function eventPath(event: EventEntry): string {
  return `/hackathons/${event.id}/`;
}

export function cityPath(city: string): string {
  return `/hackathons/in/${slugify(city)}/`;
}

/** The city, or the region when the event has no single city. */
export function placeLabel(event: EventEntry): string {
  return event.data.city ?? REGION_LABELS[event.data.region];
}

export interface CityGroup {
  city: string;
  path: string;
  events: EventEntry[];
}

/** Cities with at least one published event, busiest first. */
export function groupByCity(events: EventEntry[]): CityGroup[] {
  const groups: CityGroup[] = [];
  for (const event of events) {
    const city = event.data.city;
    if (!city) continue;
    let group = groups.find((g) => g.city === city);
    if (!group) {
      group = { city, path: cityPath(city), events: [] };
      groups.push(group);
    }
    group.events.push(event);
  }
  return groups.sort((a, b) => b.events.length - a.events.length || a.city.localeCompare(b.city));
}

const ATTENDANCE_MODES = {
  'in-person': 'OfflineEventAttendanceMode',
  hybrid: 'MixedEventAttendanceMode',
  online: 'OnlineEventAttendanceMode',
} as const;

const EVENT_STATUS = {
  scheduled: 'EventScheduled',
  postponed: 'EventPostponed',
  cancelled: 'EventCancelled',
} as const;

// schema.org has a Hackathon type; the other formats are described as plain events.
const HACKATHON_TYPES = ['hackathon', 'datathon', 'makeathon', 'ideathon'];

/** schema.org structured data for an event page. */
export function eventJsonLd(event: EventEntry): Record<string, unknown> | null {
  const data = event.data;
  if (!data.start_date) return null;
  const format = data.format ?? 'in-person';
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': HACKATHON_TYPES.includes(data.type) ? 'Hackathon' : 'Event',
    name: data.name,
    startDate: isoDay(data.start_date),
    eventStatus: `https://schema.org/${EVENT_STATUS[data.status]}`,
    eventAttendanceMode: `https://schema.org/${ATTENDANCE_MODES[format]}`,
    url: `${SITE_URL}${eventPath(event)}`,
  };
  if (data.end_date) jsonLd.endDate = isoDay(data.end_date);
  if (data.description) jsonLd.description = data.description;
  if (format === 'online' && data.url) {
    jsonLd.location = { '@type': 'VirtualLocation', url: data.url };
  } else if (data.city) {
    jsonLd.location = {
      '@type': 'Place',
      name: data.venue ?? data.city,
      address: { '@type': 'PostalAddress', addressLocality: data.city, addressCountry: 'BE' },
    };
  }
  if (data.organizer) jsonLd.organizer = { '@type': 'Organization', name: data.organizer };
  if (data.url) jsonLd.sameAs = data.url;
  if (data.languages.length) jsonLd.inLanguage = data.languages.map((l) => l.toLowerCase());
  return jsonLd;
}

/** JSON for a <script type="application/ld+json"> tag. */
export function jsonLdString(jsonLd: Record<string, unknown>): string {
  return JSON.stringify(jsonLd).replace(/</g, '\\u003c');
}

export function languageList(event: EventEntry): string {
  return event.data.languages.map((l) => LANGUAGE_LABELS[l]).join(', ');
}
