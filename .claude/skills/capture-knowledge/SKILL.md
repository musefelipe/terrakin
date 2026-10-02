---
name: capture-knowledge
description: Record a decision or a learning in docs/knowledge so future humans and agents keep it. Use after making a choice someone could question (library, data shape, rule, tradeoff), after debugging something non-obvious, or when the user says "remember this", "write this down", or "record that".
---

# Capture knowledge

Terrakin's shared memory is `docs/knowledge/`. Anything not written there is lost when this session ends.

## Pick the kind

- **Decision**: a choice with alternatives. "We use X because Y; the cost is Z."
- **Learning**: a surprise, gotcha, or debugging result. "If you see X, it's because Y; do Z."
- Neither? A session summary is a handoff (use the `handoff` skill). A proposal needing discussion is an RFC (use `write-rfc`).

## Steps

1. Check [docs/knowledge/INDEX.md](../../../docs/knowledge/INDEX.md) for an existing entry. Update it instead of duplicating. If a decision changed, write a new one and mark the old one `status: superseded` with a link forward.
2. Create the file:
   ```sh
   pnpm kb new decision "Short plain title"
   pnpm kb new learning "Short plain title"
   ```
3. Fill in every section of the template. Keep it under a page. Link code by repo-relative path.
4. Set `tags:` (for example `[sim, protocol, server, client, tooling, security, process]`) and, for decisions, `status: accepted` once it's real.
5. Run `pnpm kb` to regenerate `INDEX.md`. Commit both files with the change they describe.

## Quality bar

- Written for a reader with zero context, including an agent in a fresh session.
- Facts only. Mark guesses as guesses.
- No secrets, tokens, personal data, or private conversation. The repo is public.
- Plain words, no em dashes.
