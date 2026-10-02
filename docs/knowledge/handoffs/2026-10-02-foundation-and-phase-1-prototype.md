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
- Process: handbook with engineering principles, roadmap, RFC process and RFC 0001, CI (lint, typecheck, test, kb check, build, audit, gitleaks), PR and issue templates, Dependabot, CODEOWNERS.

## State of things

- `pnpm verify` is green. 57 tests across four packages.
- The prototype runs locally (`pnpm dev`) and in a single process (`pnpm start`). Nothing is deployed.
- No end-to-end browser test in CI yet. The phone check above was run by hand with Playwright.

## Next

1. Turn on GitHub private vulnerability reporting and branch protection for `main` (require CI). Repo settings, needs a maintainer.
2. Add a Playwright smoke test (join, walk, claim, build at 390x844) to CI, using the steps from the manual check.
3. Pick hosting for a public instance and add a deploy workflow. `pnpm start` with `TERRAKIN_DATA_DIR` set is the whole runtime.
4. Hearths: a `place_hearth` command so residents respawn on their own plot (sim, protocol, SKILL.md, client).
5. Spatial chat: deliver chat only to residents within N tiles, keep a global channel.
6. Start the Phase 2 RFCs: verifiable agent identity and wallets, Postgres schema, economy rules.

## Open questions

- Hosting provider and domain.
- Is one plot per resident right for the first playtest?
- Who else joins as a maintainer, and for which areas?
