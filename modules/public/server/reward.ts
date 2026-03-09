import prisma from "@/lib/prisma";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const rewardRouter = createTRPCRouter({
  /**
   * Get paginated reward redemption history
   */
  getHistory: protectedProcedure
    .input(
      z.object({
        page: z.coerce.number().int().min(1).default(1),
        limit: z.coerce.number().int().min(1).max(100).default(10),
      }),
    )
    .query(async ({ input, ctx }) => {
      const userId = ctx.auth.user?.id;

      if (!userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User tidak valid",
        });
      }

      const { page, limit } = input;
      const skip = (page - 1) * limit;

      const where = { userId };

      const [redemptions, total] = await Promise.all([
        prisma.rewardRedemption.findMany({
          where,
          orderBy: { createdAt: "desc" },
          skip,
          take: limit,
        }),
        prisma.rewardRedemption.count({ where }),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        data: redemptions,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      };
    }),

  /**
   * Redeem a reward using user points
   */
  redeem: protectedProcedure
    .input(
      z.object({
        rewardId: z.number().int(),
        rewardTitle: z.string(),
        pointsCost: z.number().int().positive(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.auth.user.id;

      // 1. Get the current user points inside a transaction to prevent race conditions
      // Using interactive transaction to ensure atomicity
      const result = await prisma.$transaction(async (tx) => {
        const user = await tx.user.findUnique({
          where: { id: userId },
          select: { totalPoints: true },
        });

        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Pengguna tidak ditemukan",
          });
        }

        // 2. Validate if user has enough points
        if (user.totalPoints < input.pointsCost) {
          throw new TRPCError({
            code: "PRECONDITION_FAILED",
            message: "Poin Anda tidak mencukupi untuk penukaran ini",
          });
        }

        // 3. Deduct points from user
        await tx.user.update({
          where: { id: userId },
          data: {
            totalPoints: {
              decrement: input.pointsCost,
            },
          },
        });

        // 4. Create RewardRedemption record
        const redemption = await tx.rewardRedemption.create({
          data: {
            userId: userId,
            rewardTitle: input.rewardTitle,
            pointsCost: input.pointsCost,
            status: "SUCCESS", // Mock real-world success response
          },
        });

        return redemption;
      });

      return result;
    }),
});
