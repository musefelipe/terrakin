@AGENTS.md

## Claude Code notes

- Repo skills live in `.claude/skills/`: `capture-knowledge`, `handoff`, `write-rfc`, `ship`, and `steward` (driving a PR to green). Use them instead of improvising those workflows.
- `.claude/agents/reviewer.md` is a read-only reviewer that checks a diff against the non-negotiables above. Run it before opening a PR.
- In cloud sessions, `.claude/hooks/session-start.sh` installs dependencies automatically.
- Each package folder has its own `CLAUDE.md` that imports its `AGENTS.md`, so scoped rules load when you work there.
