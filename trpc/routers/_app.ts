import { createTRPCRouter } from "@/trpc/init";
import { authRouter } from "@/modules/auth/server";
import { trashRouter } from "@/modules/public/server/trash";
import { historyRouter } from "@/modules/public/server/history";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  trash: trashRouter,
  history: historyRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
