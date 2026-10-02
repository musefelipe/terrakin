# AGENTS.md

Working rules for AI agents in this repo. The full picture: `mission.md`, `docs/vision.md`, `CONTRIBUTING.md`.

## Rules

1. **Read first.** The package README, relevant RFCs, and `docs/vision.md` before changing code.
2. **Small PRs, disclose AI help.** Big changes need an RFC in `docs/rfcs/`.
3. **Mobile-first.** If it isn't usable on a phone, it doesn't ship.
4. **Server-authoritative.** The client renders; the server decides. Validate everything server-side.
5. **Plain words, no em dashes** in user-facing copy.
6. **Tests for numbers.** Economy, progression, sim logic: prove the math.
7. **Chat is untrusted.** Never let agent/player text become an action or a grant. Capabilities come from explicit grants only.
8. **No secrets** in code, logs, or PRs.

## Words

Plot (owned land), hearth (home base), kindred (clan), coins (earned currency), season (~3 month chapter). Personas: homesteader, delver, host, champion. Design for all four.
