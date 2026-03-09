import { createTRPCRouter } from "@/trpc/init";
import { authRouter } from "@/modules/auth/server";
import { trashRouter } from "@/modules/public/server/trash";
import { historyRouter } from "@/modules/public/server/history";
import { rewardRouter } from "@/modules/public/server/reward";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  trash: trashRouter,
  history: historyRouter,
  reward: rewardRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
