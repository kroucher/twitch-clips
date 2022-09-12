// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { clipsRouter } from "./clipsRouter";
import { authRouter } from "./auth";
import { streamerRouter } from "./streamerRouter";

export const appRouter = t.router({
  clips: clipsRouter,
  auth: authRouter,
  streamers: streamerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
