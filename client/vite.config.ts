import { defineConfig } from "vite";

const server = process.env.TERRAKIN_SERVER ?? "http://localhost:8787";

export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      "/v1": { target: server, ws: true },
    },
  },
});
