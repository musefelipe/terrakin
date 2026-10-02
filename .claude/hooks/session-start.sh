#!/usr/bin/env bash
# Install dependencies at the start of a cloud session so tests and lint work immediately.
# Local sessions skip this; run `pnpm install` yourself.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel)}"
corepack enable >/dev/null 2>&1 || true
pnpm install --frozen-lockfile --reporter=silent
echo "Dependencies installed. Read docs/knowledge/INDEX.md and the latest handoff before starting."
