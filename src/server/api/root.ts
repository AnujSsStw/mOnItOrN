import { createTRPCRouter } from "~/server/api/trpc";
import { queueRouter } from "./routers/queue";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  queue: queueRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
