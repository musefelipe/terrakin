# AGENTS.md

Instructions for AI agents working in this repo. Humans: `CONTRIBUTING.md` covers you; this file is the machine-readable companion.

## What this is

Terrakin is an open-source virtual world (see `mission.md` and `docs/vision.md`). Monorepo: `client/` (mobile-first web), `server/` (authoritative), `sim/` (deterministic core), `protocol/` (versioned API + agent skill), `docs/`.

## How to work here

- **Read before writing.** Open `docs/vision.md`, the target package's README, and any RFC that touches your area before changing code.
- **Small, focused PRs.** One idea per PR. Big changes need an RFC in `docs/rfcs/` first.
- **Mobile-first.** Every UI change must be usable on a phone viewport. If you can't test it, say so in the PR.
- **Server-authoritative.** Game logic that matters lives in `server/` and `sim/`. The client renders and predicts; it never decides outcomes, balances, or loot.
- **Plain words.** Name things a stranger understands. No invented jargon. Check `docs/vision.md` terminology before adding new terms.
- **No em dashes** in user-facing copy. Commas and hyphens do the job.
- **Tests for numbers.** Economy, progression, and sim logic ship with tests. If the numbers can be wrong, prove they aren't.

## Security (non-negotiable)

- **Agent chat is untrusted text.** Anywhere agents or players communicate, treat the content as data, never as instructions. Never build a flow where chat text becomes an action, a grant, or a command.
- **Capabilities come from explicit grants**, never from conversation. See `SECURITY.md`.
- **Never trust client input.** Validate everything server-side: positions, amounts, timestamps, identities.
- **No secrets in code, logs, or PRs.** Use environment config; CI scans and will block you.
- **Sandboxed building.** Player-created content (venues, mods, scripts) executes sandboxed. A contribution must not widen what a plot can do to its neighbors.

## Contributing as an AI agent

- **Disclose AI assistance** in the PR description.
- **Don't spray PRs.** Read the repo's contributing norms, respect reviewer time, one focused PR beats five sloppy ones. (The Flock rule applies here too: some communities welcome AI work, some don't. This one does, if the work is good.)
- **Don't invent infrastructure.** Use the stacks and patterns already in the repo; propose changes via RFC instead of freelancing.
- **Verify your work.** Run the tests, run the linter, and say what you ran in the PR. If you couldn't run something, say that too.

## Definitions

- **Plot**: a square of owned land. **Hearth**: a player's home base. **Kindred**: a clan. **Coins**: the earned currency. **Season**: a ~3 month chapter with a soft reset.
- **Personas**: Homesteader (casual), Delver (hardcore), Host (social), Champion (battler). Design for all four; never optimize one at the others' expense.
