# AGENTS.md

Operating manual for anyone (agent or human) changing this repo. Keep it short. Folder-specific rules live in that folder's `AGENTS.md`; read the one for every folder you touch.

## Start of session

1. Read [docs/knowledge/INDEX.md](docs/knowledge/INDEX.md), then the newest handoff it lists.
2. Read the `AGENTS.md` in each folder you'll change.
3. Run `pnpm install && pnpm verify`. If it's red before you start, fix that or say so first.

## Map

| Path | What | Rules |
|------|------|-------|
| `sim/` | Deterministic rules engine. The only place game rules live. | [sim/AGENTS.md](sim/AGENTS.md) |
| `protocol/` | API v1 schemas, error codes, OpenAPI, agent `SKILL.md`. | [protocol/AGENTS.md](protocol/AGENTS.md) |
| `server/` | HTTP + WebSocket front door, persistence, sessions. | [server/AGENTS.md](server/AGENTS.md) |
| `client/` | Mobile-first web client. Renders, never decides. | [client/AGENTS.md](client/AGENTS.md) |
| `docs/` | Vision, architecture, handbook, RFCs, knowledge base. | [docs/AGENTS.md](docs/AGENTS.md) |
| `scripts/` | Repo tooling (`kb.ts`). Plain Node, no deps. | |
| `.claude/` | Shared Claude Code settings, skills, and subagents. | |

Dependency direction: `client -> protocol -> sim` and `server -> protocol -> sim`. `sim` depends on nothing. Never import across in the other direction.

## Commands

```sh
pnpm dev          # server :8787 + client :5173 (proxied), hot reload
pnpm verify       # lint + typecheck + test + kb:check + build. Same as CI.
pnpm test         # all tests; `pnpm vitest run --project sim` for one package
pnpm format       # Biome: fix formatting and safe lint issues
pnpm kb           # rebuild the knowledge index
pnpm start        # production-style: build client, serve it from the server
```

## Non-negotiables

- **Server decides.** Rules live in `sim/`. The server validates input and runs the sim; the client only renders server state.
- **Determinism.** `sim/` has no clocks, randomness, or I/O. Same log in, same world out.
- **Chat is untrusted data.** It never becomes an action. Render with `textContent`. See [decision 0004](docs/knowledge/decisions/0004-chat-is-untrusted-data.md).
- **Protocol changes are contracts.** Additive changes only within `v1`; update `SKILL.md` in the same PR (a test enforces it).
- **Plain words** from the [terminology table](docs/vision.md#3-terminology-no-game-knowledge-required). No em dashes in user-facing copy.
- **No secrets** in code, logs, docs, or the knowledge base. This repo is public.

## Definition of done

A change is done when all of these hold:

1. `pnpm verify` passes locally.
2. New behavior has tests at the lowest level that can catch the bug (sim rule -> sim test; wire format -> protocol test; routing/auth -> server test).
3. Docs that describe the changed behavior are updated in the same PR (folder `AGENTS.md`, `SKILL.md`, `docs/architecture.md`).
4. Anything a future contributor would ask "why?" about has a decision record (`pnpm kb new decision "..."`).
5. If you're ending a session with anything in flight, you wrote a handoff (`pnpm kb new handoff "..."`).
6. The PR description says what changed, why, how it was tested, and discloses AI assistance.

## Working style

- Small, focused PRs. One concern each. Refactors separate from behavior changes.
- Big ideas (new systems, economy, protocol versions, storage) start as an RFC in `docs/rfcs/`.
- Prefer deleting code to adding config. Prefer boring, well-known tools.
- When unsure about intent, check `docs/vision.md` and the decision records before asking.
- Leave the place better: if a doc misled you, fix it in the same PR or record a learning.
