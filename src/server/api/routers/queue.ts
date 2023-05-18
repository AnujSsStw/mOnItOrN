import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const queueRouter = createTRPCRouter({
  me: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async () => {
      return "heee";
    }),
});
