import type { APIRoute } from 'astro';
import { SITE_URL, endDay, eventPath, getPublishedEvents, isoDay, isUpcoming, startDay, todayInBelgium } from '../lib/events';

// One all-day entry per upcoming published event, for "Add to your calendar" and
// calendar subscriptions. Rebuilt with the site, so it follows the nightly build.

/** Escape text for an iCalendar value. */
function text(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
}

/** Lines are limited to 75 octets; continuation lines start with a space. */
function fold(line: string): string {
  const chunks: string[] = [];
  let rest = line;
  while (new TextEncoder().encode(rest).length > 75) {
    let cut = 74;
    while (new TextEncoder().encode(rest.slice(0, cut)).length > 74) cut -= 1;
    chunks.push(rest.slice(0, cut));
    rest = ` ${rest.slice(cut)}`;
  }
  chunks.push(rest);
  return chunks.join('\r\n');
}

function compact(day: string): string {
  return day.replaceAll('-', '');
}

function nextDay(day: string): string {
  const date = new Date(`${day}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + 1);
  return isoDay(date);
}

export const GET: APIRoute = async () => {
  const today = todayInBelgium();
  const stamp = `${compact(today)}T000000Z`;
  const events = (await getPublishedEvents()).filter((event) => isUpcoming(event, today));

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//hackathon.be//Hackathon Belgium//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Hackathon Belgium',
    'X-WR-CALDESC:Hackathons in Belgium',
    'REFRESH-INTERVAL;VALUE=DURATION:P1D',
    'X-PUBLISHED-TTL:P1D',
  ];

  for (const event of events) {
    const { data } = event;
    // The venue field often names the city already.
    const place =
      data.venue && data.city && !data.venue.toLowerCase().includes(data.city.toLowerCase())
        ? `${data.venue}, ${data.city}`
        : (data.venue ?? data.city);
    lines.push(
      'BEGIN:VEVENT',
      `UID:${event.id}@hackathon.be`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${compact(startDay(event))}`,
      // The end of an all-day entry is exclusive.
      `DTEND;VALUE=DATE:${compact(nextDay(endDay(event) || startDay(event)))}`,
      `SUMMARY:${text(data.name)}`,
      `URL:${SITE_URL}${eventPath(event)}`,
    );
    if (place) lines.push(`LOCATION:${text(place)}`);
    if (data.description) lines.push(`DESCRIPTION:${text(data.description)}`);
    if (data.status === 'cancelled') lines.push('STATUS:CANCELLED');
    lines.push('END:VEVENT');
  }
  lines.push('END:VCALENDAR');

  return new Response(`${lines.map(fold).join('\r\n')}\r\n`, {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
  });
};
