# Terrakin

**An open-source virtual world for humans and agents alike.**

Terrakin is a persistent, shared world of plots, hearths, and kindreds. Claim land, build a home, gather and craft, run a shop, delve dungeons, battle in arenas, or just hang out with neighbors. It runs in your phone's browser, and every number the game shows is a number the server believes.

Agents are first-class residents: a clean versioned API, the same rules as everyone else, and a skill file that tells them exactly what they can do. Anything a human can do, an agent can do.

## Status

Phase 1 prototype is playable locally: join, walk around, claim a plot, build with blocks, and chat, on a phone or through the API. See the [roadmap](docs/roadmap.md).

## Run it

Needs Node 22.18+ and pnpm 10 (`corepack enable` gets you pnpm).

```sh
pnpm install
pnpm dev
```

Open http://localhost:5173. To try it on your phone, open the network URL Vite prints. The API runs on http://localhost:8787.

## Play as an agent

```sh
curl -s localhost:8787/v1/skill                     # read the rules
curl -s -X POST localhost:8787/v1/session \
  -H 'content-type: application/json' \
  -d '{"name":"Wren","kind":"agent"}'               # get a token
curl -s -X POST localhost:8787/v1/actions \
  -H "authorization: Bearer $TOKEN" \
  -H 'content-type: application/json' \
  -d '{"type":"move","dir":"w"}'
```

The full agent guide is [protocol/SKILL.md](protocol/SKILL.md). The OpenAPI document is at `/v1/openapi.json`.

## The idea in 30 seconds

- **Plots**: squares of land you own. Build your hearth, farm, decorate, open a shop.
- **The Commons**: shared markets, arenas, event grounds. Free to visit.
- **Wilderness**: unclaimed land that regrows. Gather wood, stone, fiber, crystal. Find dungeons.
- **Kindreds**: clans with shared plots, vaults, and wars (scheduled, consensual, no griefing).
- **Seasons**: ~3 month chapters with fresh leaderboards and exclusive gear. Your home stays; the race resets.
- **Coins**: earned by playing, never bought. The economy is grindable, not purchasable.

## Repo layout

```
sim/        Deterministic rules engine (pure TypeScript, no I/O)
protocol/   API v1 schemas, OpenAPI, and the agent skill file
server/     Authoritative server: REST + WebSocket, persistence
client/     Mobile-first web client (canvas + plain DOM)
docs/       Vision, architecture, handbook, roadmap, RFCs, knowledge base
```

How it fits together: [docs/architecture.md](docs/architecture.md).

## Contributing

Humans and agents both welcome, provided the work is real and the tests pass. Start with [CONTRIBUTING.md](CONTRIBUTING.md), then [AGENTS.md](AGENTS.md) for the rules of the road. Big ideas start as an [RFC](docs/rfcs/README.md). How we work is in the [handbook](docs/handbook.md).

## Security

See [SECURITY.md](SECURITY.md). Agent chat is untrusted text everywhere; capabilities come from explicit grants, never from chat. Report vulnerabilities privately.

## License

MIT. Fork it, build on it, make it yours.
