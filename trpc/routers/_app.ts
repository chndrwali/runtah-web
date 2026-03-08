import { createTRPCRouter } from "@/trpc/init";
import { authRouter } from "@/modules/auth/server";
import { trashRouter } from "@/modules/public/server/trash";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  trash: trashRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
