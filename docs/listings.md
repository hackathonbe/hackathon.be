# Event listings

How a hackathon gets onto hackathon.be, and what an event file looks like.

## How it works

- Every event is one YAML file in `site/src/content/events/`.
- The file name is the event's permanent address: `hack-the-future-2026.yaml` becomes
  `https://hackathon.be/hackathons/hack-the-future-2026/`.
- The build checks every file against the schema in `site/src/content.config.ts`. A file with a
  missing field, a misspelled field name or an impossible date stops the build, so it cannot reach
  the live site.
- Events with `published: true` get their own page and appear on the calendar (until they end), in
  the list of all hackathons, on their city page and in the sitemap.
- Events with `published: false` are drafts. They stay in the repository and are not shown anywhere.
- An event is published by merging a pull request into `main`. The site is rebuilt on every merge
  and once a night.

## Adding or changing an event

1. Copy an existing file in `site/src/content/events/` and rename it (see "File names").
2. Fill in the fields below.
3. Run `npm run build` in `site/` to check the file.
4. Open a pull request.

To correct a listing, edit its file. Every event page links to its file on GitHub.

## File names

`<short-name>-<city, if the name needs it>-<year>.yaml`

- Lower case, digits and hyphens only, 60 characters at most.
- The year is the year the event starts.
- Do not rename the file of a published event. Its address would change and old links would break.

## Fields

| Field         | Required   | What it holds                                                                                             |
| ------------- | ---------- | --------------------------------------------------------------------------------------------------------- |
| `name`        | yes        | The event's name as the organiser writes it, without the year.                                            |
| `edition`     | no         | "3rd edition", or an edition title. Leave out if it is only the year.                                     |
| `series`      | no         | The same slug on every edition of a recurring event, e.g. `hack-the-future`. Links the editions together. |
| `type`        | no         | `hackathon` (default), `datathon`, `game-jam`, `makeathon`, `ideathon`, `startup-weekend`, `ctf`.         |
| `start_date`  | to publish | First day, as `2026-11-24`.                                                                               |
| `end_date`    | no         | Last day. Same as `start_date` for a one-day event. Leave out if unknown.                                 |
| `city`        | no         | English name, spelled the same way every time: Brussels, Antwerp, Ghent, Bruges, Ostend, Leuven, Liège.   |
| `region`      | yes        | `brussels`, `flanders`, `wallonia`, or `nationwide` for events held in several cities.                    |
| `venue`       | no         | Building or campus. For multi-city events, say where the rounds take place.                               |
| `format`      | no         | `in-person`, `hybrid` or `online`.                                                                        |
| `organizer`   | no         | Who runs it.                                                                                              |
| `themes`      | no         | A short list of topics.                                                                                   |
| `audience`    | no         | `open`, `students`, `professionals` or `application` (participants are selected).                         |
| `languages`   | no         | Any of `EN`, `FR`, `NL`, `DE`.                                                                            |
| `url`         | no         | The event's own page.                                                                                     |
| `source_url`  | to publish | The page where name, date and place were confirmed. Can be the same as `url`.                             |
| `description` | to publish | One or two sentences, written for this site. Never copied from the event's page.                          |
| `status`      | no         | `scheduled` (default), `postponed` or `cancelled`. Keep the file when an event is cancelled.              |
| `recurring`   | no         | `true` if it comes back every year, `false` if it is a one-off. Leave out if unknown.                     |
| `published`   | no         | `true` to show the event. Defaults to `false`.                                                            |
| `review`      | no         | For drafts: why the event is not published yet.                                                           |
| `confidence`  | no         | `high`, `medium` or `low`: how well the details were confirmed.                                           |
| `listed_by`   | no         | `organizer`, `curator` (default) or `crawler`.                                                            |
| `checked_on`  | no         | The day the details were last checked against the source.                                                 |
| `notes`       | no         | Notes for curators. Never shown on the site.                                                              |

Example:

```yaml
name: Hack The Future
edition: 2026 (The Curse of Achrona)
series: hack-the-future
type: hackathon
start_date: 2026-11-24
end_date: 2026-11-25
city: Antwerp
region: flanders
format: in-person
organizer: Hack The Future / Cronos Groep
themes:
  - IT
  - creative
audience: students
languages:
  - NL
url: https://www.hackthefuture.be/
source_url: https://www.hackthefuture.be/
description: Themed two-day hackathon for IT and creative students.
recurring: true
published: true
confidence: high
listed_by: curator
checked_on: 2026-10-06
```

## What belongs on the site

- The event is held in Belgium, in person or hybrid. An online-only event counts when the organiser
  is Belgian and it is aimed at people in Belgium.
- People from outside the organising body can take part, through open registration or an open
  application. Student-only events count when more than one school can enter. Staff-only company
  hackathons and course assignments do not.
- When it is unclear whether an event is open, or its date is not confirmed, keep it as a draft and
  say why in `review`.

## Proposals from the crawler

A scheduled search looks for new and changed events and proposes them in a pull request. A curator
publishes them by merging. The crawler follows these rules:

- One pull request per run, with a summary of what is new, what changed and what it could not
  confirm.
- Every file it writes has `listed_by: crawler`, a `source_url` it actually opened, a `confidence`
  and today's date in `checked_on`.
- Events it could confirm are proposed with `published: true`. Doubtful ones are proposed as drafts
  with a `review` reason.
- It never deletes a file and never renames one.
- It does not change a listing with `listed_by: organizer`. If the source disagrees with such a
  listing, it says so in the pull request instead.
- Before adding an event it checks for an existing file for the same event (same series, start date
  and city), so one event is not listed twice.

The pages it watches are in [crawler-sources.md](crawler-sources.md).
