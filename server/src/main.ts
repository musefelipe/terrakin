import { resolve } from "node:path";
import { createApp } from "./app";
import { JsonlStore, MemoryStore } from "./store";
import { WorldService } from "./world-service";

const port = Number(process.env.PORT ?? 8787);
const dataDir = process.env.TERRAKIN_DATA_DIR;
const staticDir = process.env.TERRAKIN_STATIC_DIR;
const trustedProxies = Number(process.env.TERRAKIN_TRUSTED_PROXIES ?? 0);

const store = dataDir ? new JsonlStore(resolve(dataDir)) : new MemoryStore();
const service = new WorldService({ store });
const server = createApp({
  service,
  trustedProxies,
  ...(staticDir ? { staticDir: resolve(staticDir) } : {}),
});

server.listen(port, () => {
  console.log(`terrakin server on http://localhost:${port}`);
  console.log(`  world seq=${service.state.seq} hash=${service.hash()}`);
  console.log(
    `  storage: ${dataDir ? `jsonl in ${resolve(dataDir)}` : "memory (set TERRAKIN_DATA_DIR to persist)"}`,
  );
});

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
