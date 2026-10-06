import { AUDIENCE_LABELS } from './event-fields';
import { projectCity } from './cities';
import {
  endDay,
  eventPath,
  getPublishedEvents,
  isoDay,
  isUpcoming,
  startDay,
  todayInBelgium,
  type EventEntry,
} from './events';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// The filter chips above the cards, in the order they are shown.
export const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'brussels', label: 'Brussels' },
  { key: 'flanders', label: 'Flanders' },
  { key: 'wallonia', label: 'Wallonia' },
  { key: 'online', label: 'Online' },
  { key: 'students', label: 'Students' },
] as const;

// Short labels for the card chips (the event pages spell them out).
const FORMAT_CHIPS = { 'in-person': 'On-site', hybrid: 'Hybrid', online: 'Online' } as const;

/** Number of cards shown at a time. */
export const CARD_COUNT = 4;
/** Cards rendered in the page, so a filter has something to pick from. */
const POOL_SIZE = 24;

export interface HomeCard {
  href: string;
  day: string;
  month: string;
  span: string;
  format?: string;
  languages: string;
  name: string;
  place: string;
  theme?: string;
  audience?: string;
  filters: string[];
}

function utc(day: string): Date {
  return new Date(`${day}T00:00:00Z`);
}

function daysBetween(from: string, to: string): number {
  return Math.round((utc(to).getTime() - utc(from).getTime()) / 86_400_000);
}

/** "Fri–Sun" for a weekend, "Sat" for one day, "21 days" for anything longer than a week. */
function spanLabel(event: EventEntry): string {
  const start = startDay(event);
  const end = endDay(event);
  const first = utc(start);
  if (!end || end === start) return DAYS[first.getUTCDay()];
  if (daysBetween(start, end) <= 6) return `${DAYS[first.getUTCDay()]}–${DAYS[utc(end).getUTCDay()]}`;
  return `${daysBetween(start, end) + 1} days`;
}

function toCard(event: EventEntry): HomeCard {
  const { data } = event;
  const start = utc(startDay(event));
  const online = data.format === 'online';
  const venue = online ? (data.organizer ?? data.venue) : data.venue;
  const filters = [data.region];
  if (online) filters.push('online');
  if (data.audience === 'students') filters.push('students');
  return {
    href: eventPath(event),
    day: String(start.getUTCDate()).padStart(2, '0'),
    month: MONTHS[start.getUTCMonth()],
    span: spanLabel(event),
    format: data.format ? FORMAT_CHIPS[data.format] : undefined,
    languages: data.languages.join(' / '),
    name: data.name,
    place: [online ? 'Online' : data.city, venue].filter(Boolean).join(' · '),
    theme: data.themes[0],
    audience: data.audience ? AUDIENCE_LABELS[data.audience] : undefined,
    filters,
  };
}

export interface HomeData {
  upcomingCount: number;
  /** Days until the next event, and where it is. */
  next: { days: number; ongoing: boolean; city: string } | null;
  /** Whole days since the listings were last checked. */
  updatedDaysAgo: number | null;
  cards: HomeCard[];
  cityCount: number;
  dots: { city: string; x: number; y: number }[];
}

export async function getHomeData(): Promise<HomeData> {
  const events = await getPublishedEvents();
  const today = todayInBelgium();
  const upcoming = events.filter((event) => isUpcoming(event, today) && event.data.status !== 'cancelled');

  const first = upcoming[0];
  const next = first
    ? {
        days: Math.max(0, daysBetween(today, startDay(first))),
        ongoing: startDay(first) < today,
        city: first.data.format === 'online' ? 'Online' : (first.data.city ?? 'Belgium'),
      }
    : null;

  const checked = events
    .map((event) => (event.data.checked_on ? isoDay(event.data.checked_on) : ''))
    .filter(Boolean)
    .sort();
  const lastChecked = checked.at(-1);

  const cities = [...new Set(events.map((event) => event.data.city).filter((c): c is string => !!c))];
  const dots = cities.flatMap((city) => {
    const point = projectCity(city);
    return point ? [{ city, ...point }] : [];
  });

  return {
    upcomingCount: upcoming.length,
    next,
    updatedDaysAgo: lastChecked ? Math.max(0, daysBetween(lastChecked, today)) : null,
    cards: upcoming.slice(0, POOL_SIZE).map(toCard),
    cityCount: cities.length,
    dots,
  };
}

export function plural(n: number, one: string, many = `${one}s`): string {
  return n === 1 ? `${n} ${one}` : `${n} ${many}`;
}

export function agoLabel(days: number): string {
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  return `${days} days ago`;
}
