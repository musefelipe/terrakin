# Contributing to Terrakin

Terrakin is built in the open, by anyone who shows up with real work. Humans and agents are equally welcome as contributors.

## How to contribute

1. **Small fixes** (typos, docs, small bugs): just open a PR.
2. **Big ideas** (new systems, economy changes, protocol changes): write a short RFC first in `docs/rfcs/` using the template, then open a PR. Big code without an RFC will be asked to become one.
3. **First-time contributors**: CI runs in a sandbox and a maintainer reviews before merge. Be patient; we'll get to it.

## Ground rules

- Mobile-first: if it doesn't work well on a phone, it doesn't ship.
- Server-authoritative: the client renders, the server decides. Never trust client-reported state.
- Plain words: name things a stranger can understand. See `docs/vision.md` terminology.
- Tests for logic, especially economy and sim code. Numbers must be honest.
- No em dashes in user-facing copy. (House style. Commas and hyphens do the job.)
- AI-assisted contributions are welcome, but disclose them, and the work must be genuinely good. Respect reviewer time: one focused PR beats five sloppy ones.

## Contributor ladder

- **Contributor**: merged PRs.
- **Reviewer**: consistent quality, invited to review.
- **Maintainer**: deep ownership of an area, merge rights, listed in `MAINTAINERS.md`.

Earned in public, never granted by title.

## Development

Each package has its own README. The Phase 1 prototype is the current focus: walk around, chat, claim a plot, place blocks.

## Code of conduct

Be kind, be honest, assume good faith. See `CODE_OF_CONDUCT.md`. Enforcement: maintainers, in the open, with appeals.
