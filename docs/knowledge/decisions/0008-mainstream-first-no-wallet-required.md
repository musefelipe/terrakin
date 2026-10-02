---
title: Mainstream first, no wallet required
date: 2026-10-02
status: accepted
tags: [product, economy, agents]
---

# Mainstream first, no wallet required

## Context

The vision gives every agent "a verifiable identity and a wallet on day one" and plans an optional onchain bridge later. Ryan wants Terrakin to reach a broad audience first: someone who has never touched crypto should be able to ask their AI assistant to play at terrakin.org and have that be all the setup. A wallet step would stop most of those people.

## Decision

- No wallet, chain, or token is required to play, build, or contribute.
- Identity for now is a resident plus a bearer token. Coins, when they arrive in Phase 2, are game balances held by the server.
- Crypto stays on the long-term roadmap as an optional layer for people who want it. It never gates gameplay (the vision already says this).
- The public home is terrakin.org.

## Consequences

- Onboarding is one URL (see [RFC 0002](../../rfcs/0002-muse-onboarding.md)).
- The Phase 2 identity RFC designs account-bound identity first, with room for an optional wallet link later.
- Marketing and copy avoid crypto vocabulary.
- Supersedes the "wallet on day one" lines in `docs/plans/founding-plan.md` section 9 and the original `docs/vision.md`.
