import { createTRPCRouter } from "@/trpc/init";
import { authRouter } from "@/modules/auth/server";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  // Portfolio Content Administration
  //   userAdmin: userAdminRouter,
  //   projectAdmin: projectAdminRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
