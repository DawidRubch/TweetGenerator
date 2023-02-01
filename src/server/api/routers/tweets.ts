import { z } from "zod";
import { openai } from "../../openai/openai";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const tweetsRouter = createTRPCRouter({
  generateTweetIdeas: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      try {
        const response = await openai.post("", {
          prompt: "Give me 5 tweet ideas about: " + input + "that are separated by a '-'",
          temperature: 0.1,
          max_tokens: 100,
        });

        console.warn(response.data);
        return response;
      } catch (error) {
        console.error(error);
        return error;
      }
    }),
  saveTweet: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input: tweet }) => {
      return prisma?.savedTweets.create({
        data: {
          tweet,
          userId: ctx.session.user.id,
        },
      });
    }),
  unsaveTweet: protectedProcedure.input(z.string()).query(({ input: id }) => {
    return prisma?.savedTweets.delete({
      where: {
        id,
      },
    });
  }),
  getSavedTweets: protectedProcedure.query(({ ctx }) => {
    return prisma?.savedTweets.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  deleteAllSavedTweets: protectedProcedure.mutation(({ ctx }) => {
    return prisma?.savedTweets.deleteMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
});
