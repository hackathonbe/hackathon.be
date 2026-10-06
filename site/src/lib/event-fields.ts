// Allowed values for the fields of an event listing, with the labels shown on the site.
// The schema in src/content.config.ts and the pages both read from here.

export const EVENT_TYPES = [
  'hackathon',
  'datathon',
  'game-jam',
  'makeathon',
  'ideathon',
  'startup-weekend',
  'ctf',
] as const;

export const TYPE_LABELS: Record<(typeof EVENT_TYPES)[number], string> = {
  hackathon: 'Hackathon',
  datathon: 'Datathon',
  'game-jam': 'Game jam',
  makeathon: 'Makeathon',
  ideathon: 'Ideathon',
  'startup-weekend': 'Startup weekend',
  ctf: 'Capture the flag',
};

export const REGIONS = ['brussels', 'flanders', 'wallonia', 'nationwide'] as const;

export const REGION_LABELS: Record<(typeof REGIONS)[number], string> = {
  brussels: 'Brussels',
  flanders: 'Flanders',
  wallonia: 'Wallonia',
  nationwide: 'Several cities',
};

export const FORMATS = ['in-person', 'hybrid', 'online'] as const;

export const FORMAT_LABELS: Record<(typeof FORMATS)[number], string> = {
  'in-person': 'In person',
  hybrid: 'In person and online',
  online: 'Online',
};

export const AUDIENCES = ['open', 'students', 'professionals', 'application'] as const;

export const AUDIENCE_LABELS: Record<(typeof AUDIENCES)[number], string> = {
  open: 'Open to all',
  students: 'Students',
  professionals: 'Professionals',
  application: 'By application',
};

export const LANGUAGES = ['EN', 'FR', 'NL', 'DE'] as const;

export const LANGUAGE_LABELS: Record<(typeof LANGUAGES)[number], string> = {
  EN: 'English',
  FR: 'French',
  NL: 'Dutch',
  DE: 'German',
};

export const EVENT_STATUSES = ['scheduled', 'postponed', 'cancelled'] as const;

export const LISTED_BY = ['crawler', 'organizer', 'curator'] as const;
