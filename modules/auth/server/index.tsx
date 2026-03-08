import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { onboardingSchema } from "@/lib/form-schema";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return prisma.user.findUnique({
        where: { id: input.id },
      });
    }),

  updateProfile: protectedProcedure
    .input(z.object({ id: z.string(), data: z.any() }))
    .mutation(async ({ input }) => {
      return prisma.user.update({
        where: { id: input.id },
        data: input.data,
      });
    }),

  complete: protectedProcedure
    .input(onboardingSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.auth.user.id;

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User tidak ditemukan",
        });
      }

      // Update user in database
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          name: input.name,
          appGoal: input.appGoal,
          area: input.area,
          address: input.address,
          lat: input.lat,
          lng: input.lng,
          notificationsEnabled: input.notificationsEnabled,
          onboardingCompleted: true,
        },
      });

      return updatedUser;
    }),

  /** Check if current user has completed onboarding */
  checkOnboarding: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: { id: input.id },
        select: { onboardingCompleted: true, role: true, name: true },
      });
      return {
        onboarded: user?.onboardingCompleted ?? false,
        role: user?.role,
        name: user?.name,
      };
    }),
  getCoordinates: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.auth?.user?.id) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: ctx.auth.user.id },
      select: { lat: true, lng: true },
    });

    return user;
  }),
});
