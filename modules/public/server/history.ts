import prisma from "@/lib/prisma";

import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const historyQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  sortBy: z
    .enum([
      "createdAt",
      "updatedAt",
      "aiAccuracy",
      "pointsEarned",
      "finalWeight",
      "aiCategory",
      "status",
    ])
    .default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  status: z.string().optional(),
  dateFilter: z.enum(["7D", "30D", "ALL"]).default("ALL"),
});

export const historyRouter = createTRPCRouter({
  /**
   * Get paginated trash scan history
   */
  getAll: protectedProcedure
    .input(historyQuerySchema)
    .query(async ({ input, ctx }) => {
      const userId = ctx.auth.user?.id;

      if (!userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User tidak valid",
        });
      }

      const { page, limit, search, sortBy, sortOrder, status, dateFilter } =
        input;
      const skip = (page - 1) * limit;

      // Handle date filters
      let dateCondition = {};
      const now = new Date();
      if (dateFilter === "7D") {
        dateCondition = {
          gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        };
      } else if (dateFilter === "30D") {
        dateCondition = {
          gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
        };
      }

      const where = {
        userId,
        ...(status && status !== "ALL" ? { status } : {}),
        ...(Object.keys(dateCondition).length > 0
          ? { createdAt: dateCondition }
          : {}),
        ...(search
          ? {
              OR: [
                {
                  aiCategory: {
                    contains: search,
                    mode: "insensitive" as const,
                  },
                },
              ],
            }
          : {}),
      };

      const [transactions, total] = await Promise.all([
        prisma.trashTransaction.findMany({
          where,
          orderBy: { [sortBy]: sortOrder },
          skip,
          take: limit,
        }),
        prisma.trashTransaction.count({ where }),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        data: transactions,
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
   * Get stats for the user
   */
  getStats: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth.user?.id;

    if (!userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User tidak valid",
      });
    }

    // Get count of completed scans
    const completedScansCount = await prisma.trashTransaction.count({
      where: {
        userId,
        status: "COMPLETED",
      },
    });

    // Get sums for weight and points
    const aggregations = await prisma.trashTransaction.aggregate({
      where: {
        userId,
        status: "COMPLETED",
      },
      _sum: {
        finalWeight: true,
        pointsEarned: true,
      },
    });

    return {
      totalScansCompleted: completedScansCount,
      totalWeightSaved: aggregations._sum.finalWeight || 0,
      totalPointsEarned: aggregations._sum.pointsEarned || 0,
    };
  }),

  /**
   * Get recent activities specifically formatted for the dashboard
   */
  getRecentActivities: protectedProcedure
    .input(
      z
        .object({
          sortBy: z
            .enum(["aiCategory", "createdAt", "pointsEarned", "status"])
            .default("createdAt"),
          sortOrder: z.enum(["asc", "desc"]).default("desc"),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.auth.user?.id;

      if (!userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User tidak valid",
        });
      }

      const sortBy = input?.sortBy || "createdAt";
      const sortOrder = input?.sortOrder || "desc";

      const recentActivities = await prisma.trashTransaction.findMany({
        where: { userId },
        orderBy: { [sortBy]: sortOrder },
        take: 3,
      });

      return recentActivities;
    }),
});
