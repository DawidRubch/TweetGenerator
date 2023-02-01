import { paymentsRouter } from "./routers/payments";
import { tweetsRouter } from "./routers/tweets";
import { usersRouter } from "./routers/user";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  tweets: tweetsRouter,
  payments: paymentsRouter,
  user: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
