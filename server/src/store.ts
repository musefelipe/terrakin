import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Input } from "@terrakin/sim";

export interface SessionRecord {
  /** sha256 of the bearer token. The raw token is never stored. */
  tokenHash: string;
  residentId: string;
}

/**
 * Durable storage for the world. The world itself is never stored, only the log of accepted
 * inputs: on boot the server replays the log through the sim. That keeps one source of truth
 * and makes every state auditable.
 */
export interface Store {
  loadLog(): Input[];
  appendInput(input: Input): void;
  loadSessions(): SessionRecord[];
  appendSession(session: SessionRecord): void;
}

export class MemoryStore implements Store {
  readonly log: Input[] = [];
  readonly sessions: SessionRecord[] = [];
  loadLog() {
    return [...this.log];
  }
  appendInput(input: Input) {
    this.log.push(input);
  }
  loadSessions() {
    return [...this.sessions];
  }
  appendSession(session: SessionRecord) {
    this.sessions.push(session);
  }
}

/**
 * Append-only JSON Lines files in a directory. Good enough for Phase 1 and trivially inspectable
 * with `cat`. Postgres replaces this once an RFC settles the schema.
 */
export class JsonlStore implements Store {
  private readonly logPath: string;
  private readonly sessionsPath: string;

  constructor(dir: string) {
    mkdirSync(dir, { recursive: true });
    this.logPath = join(dir, "world.log.jsonl");
    this.sessionsPath = join(dir, "sessions.jsonl");
  }

  loadLog(): Input[] {
    return readJsonl<Input>(this.logPath);
  }
  appendInput(input: Input) {
    appendFileSync(this.logPath, `${JSON.stringify(input)}\n`);
  }
  loadSessions(): SessionRecord[] {
    return readJsonl<SessionRecord>(this.sessionsPath);
  }
  appendSession(session: SessionRecord) {
    appendFileSync(this.sessionsPath, `${JSON.stringify(session)}\n`);
  }
}

function readJsonl<T>(path: string): T[] {
  if (!existsSync(path)) return [];
  return readFileSync(path, "utf8")
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => JSON.parse(line) as T);
}
