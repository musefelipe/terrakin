---
title: Foundation and Phase 1 prototype
date: 2026-10-02
tags: [process, sim, protocol, server, client]
---

# Foundation and Phase 1 prototype

## Done

- Reviewed the scaffold docs. Fixed: vision's conflicting core terms (decision 0006), stale name and next-steps sections, SECURITY.md pointing to a nonexistent MAINTAINERS.md, no security contact.
- TypeScript monorepo: pnpm workspaces, Biome, Vitest, Vite, exact-pinned deps (decision 0002).
- `sim/`: deterministic rules for join, leave, move, claim, place, remove, with replay and world hashing (decision 0003).
- `protocol/`: zod schemas for API v1, OpenAPI builder, agent `SKILL.md` with a drift test.
- `server/`: REST + WebSocket, hashed bearer tokens, rate limits, presence with idle sweep, JSONL persistence with replay on boot, chat cleaning (decisions 0004, 0005).
- `client/`: canvas world, d-pad, tap to walk, build mode with block palette, chat rendered as text. Verified on an iPhone 13 viewport in headless Chromium: join, walk, claim, build, and an HTML-injection chat attempt rendered inert.
- Agent layer: root `AGENTS.md` plus one per folder (each with a `CLAUDE.md` that imports it), knowledge base with `pnpm kb`, Claude Code skills (`capture-knowledge`, `handoff`, `write-rfc`, `ship`, `steward`), a `reviewer` subagent, and a SessionStart hook that installs deps in cloud sessions.
- Ran the `reviewer` subagent over the whole diff and fixed all nine findings: persist-before-commit (sim `prepare`/`commit`), WebSocket handler can't crash the process, stricter per-IP session limits, pruned rate-limit and idle maps, socket residents rejoin after being marked offline, client tap-to-walk no longer sticks after a reconnect, single validated resync, truncated JSONL tail tolerated, `kb.ts` edge cases. Each has a regression test.
- Process: handbook with engineering principles, roadmap, RFC process and RFC 0001, CI (lint, typecheck, test, kb check, build, audit, gitleaks), PR and issue templates, Dependabot, CODEOWNERS.

- Direction from Ryan: mainstream first, no wallet (decision 0008); public home is terrakin.org. Drafted [RFC 0002](../../rfcs/0002-muse-onboarding.md) (muse onboarding) and rewrote `protocol/SKILL.md` as the single onboarding entry point, with a starter-home recipe that a test runs against the real sim.

- Merged musefelipe's docs reorganization from `main` (mission.md, short vision, `docs/plans/`, merge policy, multi-agent notes). The old roadmap became `docs/plans/README.md`; the founding plan got the name and wallet fixes; root `AGENTS.md` combines both versions.

## State of things

- `pnpm verify` is green. 64 tests across four packages.
- The prototype runs locally (`pnpm dev`) and in a single process (`pnpm start`). Nothing is deployed.
- No end-to-end browser test in CI yet. The phone check above was run by hand with Playwright.

## Next

1. Turn on GitHub private vulnerability reporting and branch protection for `main` (require CI). Repo settings, needs a maintainer.
2. Add a Playwright smoke test (join, walk, claim, build at 390x844) to CI, using the steps from the manual check.
3. Deploy terrakin.org: pick hosting and add a deploy workflow. `pnpm start` with `TERRAKIN_DATA_DIR` set is the whole runtime.
4. Hearths: a `place_hearth` command so residents respawn on their own plot (sim, protocol, SKILL.md, client).
5. Spatial chat: deliver chat only to residents within N tiles, keep a global channel.
6. Start the Phase 2 RFCs: account-bound identity (no wallet), Postgres schema, economy rules.

## Open questions

- What can a muse do: HTTP calls, keep a token between chats, run on a schedule? Decides whether routines are automatic (RFC 0002).

- Hosting provider and domain.
- Is one plot per resident right for the first playtest?
- Who else joins as a maintainer, and for which areas?
- Should `DELETE /v1/session` revoke the token? Today it only takes you offline, and the next action rejoins. That's convenient for agents but means there's no logout.
