# server

Authoritative game server for Terrakin.

**Principles:** every number the game shows is a number the server believes. Client input is validated, never trusted. Postgres for state, Redis for live/ephemeral, websockets for presence and chat.

**Phase 1 goal:** serve the prototype world: movement, chat, plots, block placement. With an honest API from day one.
