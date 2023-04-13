import { z } from "zod";
import { generateTweetIdeas } from "../../openai/openai";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const tweetsRouter = createTRPCRouter({
  generateTweetIdeas: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return await generateTweetIdeas(input);
    }),
  saveTweet: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input: tweet }) => {
      return ctx.prisma.savedTweet.create({
        data: {
          tweet,
          userId: ctx.session.user.id,
        },
      });
    }),
  unsaveTweet: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.savedTweet.delete({
        where: {
          id: input.id,
        },
      });
    }),
  getSavedTweets: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.savedTweet.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  deleteAllSavedTweets: protectedProcedure.mutation(({ ctx }) => {
    return ctx.prisma.savedTweet.deleteMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
});
