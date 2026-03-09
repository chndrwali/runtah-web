import { createTRPCRouter } from "@/trpc/init";
import { authRouter } from "@/modules/auth/server";
import { trashRouter } from "@/modules/public/server/trash";
import { historyRouter } from "@/modules/public/server/history";
import { userRouter } from "@/modules/public/server/user";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  trash: trashRouter,
  history: historyRouter,
  user: userRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
