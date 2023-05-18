import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const queueRouter = createTRPCRouter({
  networkReq: publicProcedure
    .input(
      z.array(
        z.object({
          type: z.string(),
          url: z.string(),
          initiator: z.string(),
          timeStamp: z.number(),
          key: z.string(),
        })
      )
    )
    .query(async ({ input }) => {
      console.log(input);
      return "heee";
    }),
  timeSpend: publicProcedure
    .input(
      z.object({
        tab: z.string(),
        time: z.number(),
        key: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.key,
        },
      });
      console.log(user);
      return "working";
    }),
});
