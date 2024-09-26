import { initTRPC } from "@trpc/server";

/**
 * Initialize of TRPC backend
 * should be done only once per backend
 */

const t = initTRPC.create();

/**
 * Export reusable router an procedure helpers
 * that can used throughout the router
 */

export const router = t.router;
export const publicProcedure = t.procedure;
