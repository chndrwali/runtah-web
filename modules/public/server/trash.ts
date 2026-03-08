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
      return prisma.trashTransaction.create({
        data: {
          userId: ctx.auth.user.id,
          imageUrl: input.imageUrl,
          aiCategory: input.aiCategory,
          aiAccuracy: input.aiAccuracy,
          status: "PENDING",
          deliveryType: "DROP_OFF",
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
