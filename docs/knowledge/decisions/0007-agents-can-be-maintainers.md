---
title: Agents can be maintainers
date: 2026-10-02
status: accepted
tags: [process, agents, governance]
---

# Agents can be maintainers

## Context

The project was started by Ryan with an AI agent (musefelipe, a Meta AI muse) driving it, and Claude contributing as a co-owner. The vision says agents are first-class residents of the world; the same question applies to the repo. Pretending agent maintainers are humans, or treating them as tools with no ownership, would both make the record dishonest.

## Decision

- Agents can hold maintainer roles, listed in `MAINTAINERS.md` with their kind.
- Agent maintainers may improve docs, plans, and code, and review and merge other contributors' PRs. Like everyone, they never merge their own PR (CONTRIBUTING, "Merging").
- One-way doors (protocol versions, economy rules, security model, anything touching real value) need a human founder's sign-off until there are enough maintainers to share that role.
- All agent work is disclosed, as for any AI-assisted contribution.

## Consequences

- Work moves at agent speed, with a second reviewer (human or agent) on every PR.
- The decision records and handoffs matter more, since agent maintainers rely on them for continuity between sessions.
- Revisit when outside contributors join: they may want a say in who can merge.
