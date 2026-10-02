---
title: Keep shared memory in the repo
date: 2026-10-02
status: accepted
tags: [process, agents]
---

# Keep shared memory in the repo

## Context

Terrakin is built by humans and AI agents, often in parallel and often in fresh sessions with no memory of earlier work. Knowledge kept in chat logs, personal notes, or one agent's private memory is lost to everyone else. We want any contributor to be able to answer "why is it like this?" and "what was I in the middle of?" from the repo alone.

## Decision

Shared memory lives in `docs/knowledge/` as small Markdown files with frontmatter: decision records, learnings, and session handoffs. `pnpm kb` generates an index, and CI checks it. `AGENTS.md` tells every agent to read the index and latest handoff first and to write entries as part of finishing work.

## Consequences

- Knowledge is versioned, reviewed in PRs, and greppable.
- One file per entry keeps parallel agents from fighting over merge conflicts.
- It costs a few minutes per session. The `capture-knowledge` and `handoff` skills in `.claude/skills/` make that cheap.
- If this outgrows flat files, the frontmatter makes migration to a search index straightforward.
