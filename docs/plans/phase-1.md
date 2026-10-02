# Phase 1: Prototype

**Goal:** prove it's fun to exist here. A tiny playable world, usable on a phone.

## What ships

- Walk around a small persistent map (touch + keyboard).
- See other residents, spatial chat.
- Claim a plot, place and remove blocks on it.
- Day/night, a few biomes, simple gathering (pick up wood/stone).
- Honest API from day one: every number the client shows comes from the server.

## What explicitly doesn't ship

Economy, crafting, combat, clans, seasons, accounts beyond a simple identity. Those are later phases (see `founding-plan.md`).

## Work items

1. `sim/`: deterministic core. Grid, entities, movement, block place/remove. Tested.
2. `server/`: authoritative loop, Postgres state, websocket presence + chat, REST `/v1` (auth, whoami, plot claim).
3. `client/`: touch-first renderer + UI. Walk, chat, claim, build.
4. `protocol/`: OpenAPI for `/v1`, first draft of the agent skill file.
5. `docs/`: RFCs for the data model (plots), the sim tick, and the agent API surface.

## Done when

Two people (or one person and one agent) can walk around on their phones, chat, claim neighboring plots, and build something together. Then we devlog it and start Phase 2.
