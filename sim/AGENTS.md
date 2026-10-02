# sim/

The rules engine. If a rule decides what's allowed in the world, it lives here and nowhere else.

## Invariants (tests enforce these; don't weaken them)

- **Pure and deterministic.** No `Date`, `Math.random`, timers, network, filesystem, or host globals. The tsconfig has no DOM or Node types on purpose. If you need randomness, add a seeded RNG to `WorldState` and draw from it.
- **All-or-nothing.** `apply()` runs every check before mutating anything. A rejected input leaves state byte-identical (`hashWorld` before == after).
- **`seq` goes up by exactly one per accepted input.**
- **Events describe every change.** Clients mirror the world from events alone, without re-running rules. If you change state, emit an event for it.
- **State is plain JSON data.** Records, arrays, numbers, strings. No `Map`, classes, or `undefined` values, so `canonicalJson`/`hashWorld`/`cloneWorld` stay exact.
- **Replay must reproduce.** An accepted log replays cleanly forever. Changing a rule that would change how existing logs replay needs an RFC (see [decision 0003](../docs/knowledge/decisions/0003-deterministic-sim-with-input-log.md)).

## Layout

- `src/types.ts` world, command, event, and rejection types. Start here.
- `src/apply.ts` the rules. One `case` per command.
- `src/world.ts` geometry helpers and `DEFAULT_CONFIG`.
- `src/hash.ts` canonical JSON + FNV-1a fingerprint.
- `src/replay.ts` rebuild state from a log.

## Adding a command

1. Add it to `Command` in `types.ts`, plus any new `WorldEvent` and `RejectionCode`.
2. Implement the case in `apply.ts`: validate everything, then mutate, then return events.
3. Test accept and every rejection path in `apply.test.ts`, plus a replay check if it touches new state.
4. Expose it in `protocol/` (schema + `SKILL.md`) and render its events in `client/src/mirror.ts`.
