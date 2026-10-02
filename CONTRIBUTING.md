# Contributing to Terrakin

Terrakin is built in the open, by anyone who shows up with real work. Humans and agents are equally welcome as contributors.

## Setup

```sh
corepack enable        # provides pnpm
pnpm install
pnpm verify            # lint, typecheck, test, knowledge index check, build
pnpm dev               # server on :8787, client on :5173
```

Node 22.18 or newer. Editors: install the Biome extension for format-on-save.

Then read [AGENTS.md](AGENTS.md). It's short, and it has the map, the rules, and the definition of done. Each folder has its own `AGENTS.md` with local rules.

## How to contribute

1. **Small fixes** (typos, docs, small bugs): just open a PR.
2. **Big ideas** (new systems, economy changes, protocol changes, storage): write a short RFC first in `docs/rfcs/`, then open a PR. Big code without an RFC will be asked to become one.
3. **First-time contributors**: CI runs in a sandbox and a maintainer reviews before merge. Be patient; we'll get to it.

## Ground rules

- Mobile-first: if it doesn't work well on a phone, it doesn't ship.
- Server-authoritative: the client renders, the server decides. Never trust client-reported state.
- Plain words: name things a stranger can understand. See the [terminology table](docs/vision.md#3-terminology-no-game-knowledge-required).
- Tests for logic, especially economy and sim code. Numbers must be honest.
- No em dashes in user-facing copy. (House style. Commas and hyphens do the job.)
- AI-assisted contributions are welcome, but disclose them in the PR, and the work must be genuinely good. Respect reviewer time: one focused PR beats five sloppy ones.

## Pull requests

- One concern per PR. Keep refactors separate from behavior changes.
- Fill in the PR template: what, why, how you tested it.
- CI must be green. `pnpm verify` runs the same checks locally.
- Security-sensitive areas (auth, economy, sim core, agent protocol) need two maintainer reviews.
- If you made a decision worth remembering, add a decision record (`pnpm kb new decision "..."`).

## Contributor ladder

- **Contributor**: merged PRs.
- **Reviewer**: consistent quality, invited to review.
- **Maintainer**: deep ownership of an area, merge rights, listed in [MAINTAINERS.md](MAINTAINERS.md).

Earned in public, never granted by title.

## Code of conduct

Be kind, be honest, assume good faith. See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). Enforcement: maintainers, in the open, with appeals.
