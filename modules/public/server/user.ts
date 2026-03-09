import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import prisma from "@/lib/prisma";
import { TRPCError } from "@trpc/server";
import { updateUserSchema } from "@/lib/form-schema";

export const userRouter = createTRPCRouter({
  /**
   * Get the current user's profile
   */
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
});
