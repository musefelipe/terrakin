import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { buildOpenApi } from "./openapi";
import { ACTION_TYPES, Action, ClientMessage, ERROR_CODES } from "./schemas";

const skill = readFileSync(new URL("../SKILL.md", import.meta.url), "utf8");

describe("SKILL.md stays in sync with the schemas", () => {
  it.each(ACTION_TYPES)("documents the %s action", (type) => {
    expect(skill).toContain(`### ${type}`);
  });

  it.each(ERROR_CODES)("documents the %s error code", (code) => {
    expect(skill).toContain(`| \`${code}\` |`);
  });
});

describe("Action", () => {
  it("accepts valid actions and trims chat", () => {
    expect(Action.parse({ type: "chat", text: "  hi  " })).toEqual({ type: "chat", text: "hi" });
    expect(Action.safeParse({ type: "place", x: 1, y: 2, block: "stone" }).success).toBe(true);
  });

  it("rejects unknown types, bad blocks, and oversized chat", () => {
    expect(Action.safeParse({ type: "teleport", x: 1, y: 1 }).success).toBe(false);
    expect(Action.safeParse({ type: "place", x: 1, y: 2, block: "gold" }).success).toBe(false);
    expect(Action.safeParse({ type: "place", x: 1.5, y: 2, block: "wood" }).success).toBe(false);
    expect(Action.safeParse({ type: "chat", text: "x".repeat(281) }).success).toBe(false);
    expect(Action.safeParse({ type: "chat", text: "   " }).success).toBe(false);
  });
});

describe("ClientMessage", () => {
  it("parses hello and action envelopes", () => {
    expect(
      ClientMessage.safeParse({ type: "hello", v: 1, name: "Wren", kind: "agent" }).success,
    ).toBe(true);
    expect(
      ClientMessage.safeParse({ type: "action", id: "a1", action: { type: "claim" } }).success,
    ).toBe(true);
    expect(
      ClientMessage.safeParse({ type: "action", action: { type: "claim", extra: 1 } }).success,
    ).toBe(true);
    expect(ClientMessage.safeParse({ type: "nope" }).success).toBe(false);
  });
});

describe("OpenAPI", () => {
  it("builds a document that covers every REST path", () => {
    const doc = buildOpenApi();
    expect(Object.keys(doc.paths).sort()).toEqual(
      ["/v1/actions", "/v1/health", "/v1/session", "/v1/skill", "/v1/world"].sort(),
    );
    expect(JSON.stringify(doc)).toContain('"place"');
  });
});
