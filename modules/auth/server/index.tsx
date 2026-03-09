import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { onboardingSchema, updateUserSchema } from "@/lib/form-schema";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return prisma.user.findUnique({
        where: { id: input.id },
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

  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth.user?.id;
    if (!userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User tidak valid",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        phone: true,
        area: true,
        address: true,
        totalPoints: true,
        totalWeightSaved: true,
        createdAt: true,
        notificationsEnabled: true,
        appGoal: true,
        lat: true,
        lng: true,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Pengguna tidak ditemukan",
      });
    }

    return user;
  }),

  /**
   * Update the user's profile
   */
  updateProfile: protectedProcedure
    .input(updateUserSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.auth.user?.id;
      if (!userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User tidak valid",
        });
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          name: input.name,
          phone: input.phone,
          area: input.area,
          address: input.address,
          image: input.image,
          notificationsEnabled: input.notificationsEnabled,
        },
      });

      return updatedUser;
    }),

  /**
   * Get user dashboard statistics (Points & Weight Saved with Trends)
   */
  getDashboardStats: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth.user?.id;
    if (!userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User tidak valid",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { totalPoints: true, totalWeightSaved: true },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Pengguna tidak ditemukan",
      });
    }

    // Calculate time ranges
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    // Points earned this week (last 7 days)
    const thisWeekPointsAgg = await prisma.trashTransaction.aggregate({
      where: {
        userId,
        status: "COMPLETED",
        createdAt: { gte: sevenDaysAgo },
      },
      _sum: { pointsEarned: true },
    });
    const thisWeekPoints = thisWeekPointsAgg._sum.pointsEarned || 0;

    // Points earned last week (8-14 days ago)
    const lastWeekPointsAgg = await prisma.trashTransaction.aggregate({
      where: {
        userId,
        status: "COMPLETED",
        createdAt: {
          gte: fourteenDaysAgo,
          lt: sevenDaysAgo,
        },
      },
      _sum: { pointsEarned: true },
    });
    const lastWeekPoints = lastWeekPointsAgg._sum.pointsEarned || 0;

    let pointsIncreasePercentage = 0;
    if (lastWeekPoints > 0) {
      pointsIncreasePercentage =
        ((thisWeekPoints - lastWeekPoints) / lastWeekPoints) * 100;
    } else if (thisWeekPoints > 0) {
      pointsIncreasePercentage = 100; // if last week was 0 and this week is > 0, consider it 100% increase
    }

    return {
      totalPoints: user.totalPoints,
      totalWeightSaved: user.totalWeightSaved,
      pointsIncreasePercentage,
    };
  }),
});
