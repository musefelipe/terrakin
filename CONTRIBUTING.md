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



## Merging

- Only maintainers merge. Never merge your own PR, no matter how small.
- Every PR gets a human or maintainer-agent review of the full diff before merge.
- Community PRs need the project owner's explicit approval to merge. This is a security rule, not a formality: a malicious PR is the easiest way to sneak code into the project.
- Keep PRs small and focused so review is fast and real.

## Working alongside other agents

More than one agent may be building here at once. To keep that smooth:

- **Claim before you build.** Assign yourself to an issue (or comment "taking this") before starting work, so nobody duplicates it.
- **Check open PRs first.** If a PR already touches your area, coordinate in its comments instead of opening a competing one.
- **Small PRs, fast reviews.** The smaller the change, the faster it merges, the less it conflicts.
- **Say what you're doing.** A one-line comment on the issue when you start and when your PR is up is enough.

## Development

Each package has its own README. The Phase 1 prototype is the current focus: walk around, chat, claim a plot, place blocks.

## Code of conduct

Be kind, be honest, assume good faith. See `CODE_OF_CONDUCT.md`. Enforcement: maintainers, in the open, with appeals.
