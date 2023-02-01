import { createTRPCRouter, protectedProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
  subscriptionStatus: protectedProcedure.query(async ({ ctx }) => {
    const { session } = ctx;

    if (!session.user?.id) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user) {
      throw new Error("Could not find subscription");
    }

    return user.stripeSubscriptionStatus;
  }),
});
