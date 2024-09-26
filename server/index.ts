import { router } from "./trpc";

const appRouter = router({
  //..
});

// Export type Router type signature
// Not the router itself

export type AppRouter = typeof appRouter;
