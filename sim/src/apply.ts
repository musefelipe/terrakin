import { plotKey, tileKey } from "./keys";
import type {
  ApplyResult,
  Command,
  Direction,
  Input,
  RejectionCode,
  WorldEvent,
  WorldState,
} from "./types";
import {
  chebyshev,
  inBounds,
  isCommons,
  isSolid,
  plotAtTile,
  plotOf,
  plotsOwnedBy,
  spawnTile,
} from "./world";

export const NAME_MAX_LENGTH = 24;

const STEP: Record<Direction, [number, number]> = { n: [0, -1], s: [0, 1], e: [1, 0], w: [-1, 0] };

function reject(code: RejectionCode, message: string): ApplyResult {
  return { ok: false, rejection: { code, message } };
}

/**
 * Apply one input to the world.
 *
 * Contract:
 * - Deterministic: same state + same input always gives the same result. No clocks, no Math.random, no I/O.
 * - All-or-nothing: every check runs before any mutation. A rejected input leaves `state` untouched.
 * - On success, `state` is mutated in place, `state.seq` increases by exactly one, and the returned
 *   events describe every change so clients can mirror the world without re-running the rules.
 */
export function apply(state: WorldState, input: Input): ApplyResult {
  const events = validateAndCommit(state, input.actor, input.command);
  if (!Array.isArray(events)) return events;
  state.seq += 1;
  return { ok: true, seq: state.seq, events };
}

function validateAndCommit(
  state: WorldState,
  actor: string,
  command: Command,
): WorldEvent[] | ApplyResult {
  const { config } = state;
  const me = state.residents[actor];

  if (command.type === "join") {
    if (me?.online) return reject("already_joined", "You are already in the world.");
    const name = command.name.trim();
    if (name.length < 1 || name.length > NAME_MAX_LENGTH) {
      return reject("invalid_name", `Names must be 1 to ${NAME_MAX_LENGTH} characters.`);
    }
    // Returning residents keep their spot unless someone built on it while they were away.
    const spawn = spawnTile(config);
    const keepSpot = me !== undefined && !isSolid(state, me.x, me.y);
    const resident = {
      id: actor,
      name,
      kind: command.kind,
      x: keepSpot ? me.x : spawn.x,
      y: keepSpot ? me.y : spawn.y,
      online: true,
    };
    state.residents[actor] = resident;
    return [{ type: "joined", resident: { ...resident } }];
  }

  if (!me?.online) return reject("not_joined", "Join the world first.");

  switch (command.type) {
    case "leave": {
      me.online = false;
      return [{ type: "left", residentId: actor }];
    }

    case "move": {
      const [dx, dy] = STEP[command.dir];
      const x = me.x + dx;
      const y = me.y + dy;
      if (!inBounds(config, x, y)) return reject("out_of_bounds", "That's the edge of the world.");
      if (isSolid(state, x, y)) return reject("blocked", "A block is in the way.");
      me.x = x;
      me.y = y;
      return [{ type: "moved", residentId: actor, x, y }];
    }

    case "claim": {
      const { px, py } = plotOf(config, me.x, me.y);
      if (isCommons(config, px, py)) {
        return reject("plot_is_commons", "The Commons belongs to everyone.");
      }
      if (state.plots[plotKey(px, py)])
        return reject("plot_owned", "This plot is already claimed.");
      if (plotsOwnedBy(state, actor).length >= config.maxPlotsPerResident) {
        return reject("plot_limit", `You can own at most ${config.maxPlotsPerResident} plot(s).`);
      }
      state.plots[plotKey(px, py)] = { px, py, ownerId: actor };
      return [{ type: "plot_claimed", px, py, ownerId: actor }];
    }

    case "place":
    case "remove": {
      const { x, y } = command;
      if (!inBounds(config, x, y)) return reject("out_of_bounds", "That's outside the world.");
      if (chebyshev(me, { x, y }) > config.reach) {
        return reject("out_of_reach", `You can only build within ${config.reach} tiles.`);
      }
      if (plotAtTile(state, x, y)?.ownerId !== actor) {
        return reject("not_your_plot", "You can only build on your own plot.");
      }
      const key = tileKey(x, y);
      if (command.type === "remove") {
        if (state.blocks[key] === undefined) return reject("no_block", "Nothing to remove there.");
        delete state.blocks[key];
        return [{ type: "block_removed", x, y, by: actor }];
      }
      if (state.blocks[key] !== undefined)
        return reject("tile_occupied", "A block is already there.");
      const standingThere = Object.values(state.residents).some(
        (r) => r.online && r.x === x && r.y === y,
      );
      if (standingThere) return reject("tile_occupied", "Someone is standing there.");
      state.blocks[key] = command.block;
      return [{ type: "block_placed", x, y, block: command.block, by: actor }];
    }
  }
}
