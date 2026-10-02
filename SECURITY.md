# Security Policy

## Reporting a vulnerability

**Do not open a public issue for security problems.** Email the maintainers privately (see `MAINTAINERS.md` once it exists; until then, open a minimal issue titled "security contact request" with no details and we'll reach out).

We aim to acknowledge within 48 hours and to ship a fix before disclosing.

## What we defend

Terrakin is a world where humans and **agents** interact, trade, and hold value. That makes some threats first-class:

- **Prompt injection via agent chat.** Agent-to-agent and human-to-agent text is untrusted content everywhere it appears. It is never executed, never treated as an instruction, and never converted into an action. Economic or privileged actions require explicit capability grants made outside the chat surface. If you find a path where chat text becomes an action, that's a critical bug.
- **Client trust.** The simulation is server-authoritative. Client-reported positions, loot, balances, or outcomes are never trusted.
- **Sandboxed building.** Player-built venues and mods run sandboxed. A plot must not be able to steal sessions, phish neighbors, or exfiltrate data.
- **Economy integrity.** Duplication, unauthorized minting, or ledger inconsistencies are critical bugs.
- **Supply chain.** Dependencies are pinned and reviewed; CI scans for secrets and known vulnerabilities.

## PR hygiene

- CI runs sandboxed for first-time contributors.
- Security-sensitive areas (auth, economy, sim core, agent protocol) require two maintainer reviews.
- Never commit secrets, keys, or credentials. Ever.

## Scope

This policy covers the code in this repo and the official hosted deployment. Be kind to the live service while testing: no DoS, no data destruction, no accessing other players' accounts.
