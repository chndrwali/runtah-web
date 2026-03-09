import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import prisma from "@/lib/prisma";
import { TRPCError } from "@trpc/server";

export const trashRouter = createTRPCRouter({
  saveScan: protectedProcedure
    .input(
      z.object({
        imageUrl: z.string().optional(),
        aiCategory: z.string(),
        aiAccuracy: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Logic for random realistic weight between 0.05kg - 0.3kg
      const rawWeight = Math.random() * (0.3 - 0.05) + 0.05;
      const finalWeight = parseFloat(rawWeight.toFixed(2));

      // Calculate logic for status based on AI Accuracy:
      // If accuracy > 85 => 'COMPLETED'
      // If accuracy > 60 => 'PENDING'
      // Else => 'FAILED'
      let status: "COMPLETED" | "PENDING" | "FAILED" = "PENDING";
      if (input.aiAccuracy > 75) status = "COMPLETED";
      else if (input.aiAccuracy <= 60) status = "FAILED";

      // Point Multiplier (example: 100 points per kg)
      let pointsEarned = 0;
      if (status === "COMPLETED") {
        pointsEarned = Math.floor(finalWeight * 100);
      }

      // If status is completed, update user stats in a transaction alongside transaction creation
      if (status === "COMPLETED") {
        return prisma.$transaction(async (tx) => {
          const transaction = await tx.trashTransaction.create({
            data: {
              userId: ctx.auth.user.id,
              imageUrl: input.imageUrl,
              aiCategory: input.aiCategory,
              aiAccuracy: input.aiAccuracy,
              status: status,
              deliveryType: "DROP_OFF",
              finalWeight: finalWeight,
              pointsEarned: pointsEarned,
            },
          });

          await tx.user.update({
            where: { id: ctx.auth.user.id },
            data: {
              totalPoints: { increment: pointsEarned },
              totalWeightSaved: { increment: finalWeight },
            },
          });

          return transaction;
        });
      }

      // If not completed (pending/failed), just record the transaction without rewards
      return prisma.trashTransaction.create({
        data: {
          userId: ctx.auth.user.id,
          imageUrl: input.imageUrl,
          aiCategory: input.aiCategory,
          aiAccuracy: input.aiAccuracy,
          status: status,
          deliveryType: "DROP_OFF",
          finalWeight: finalWeight,
          pointsEarned: 0,
        },
      });
    }),
  getScanById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const scan = await prisma.trashTransaction.findUnique({
        where: { id: input.id },
      });

      if (!scan) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Scan tidak ditemukan",
        });
      }

      return scan;
    }),
});
