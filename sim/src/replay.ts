import { apply } from "./apply";
import type { Input, WorldConfig, WorldState } from "./types";
import { createWorld } from "./world";

/**
 * Rebuild a world from its config and the log of accepted inputs.
 * Throws if any logged input is rejected, because an accepted log must always replay cleanly.
 */
export function replay(config: WorldConfig, log: readonly Input[]): WorldState {
  const state = createWorld(config);
  for (const [i, input] of log.entries()) {
    const result = apply(state, input);
    if (!result.ok) {
      throw new Error(`Replay diverged at entry ${i}: ${result.rejection.code}`);
    }
  }
  return state;
}
