import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUniqueKey: protectedProcedure.query(async ({ ctx }) => {
    const { prisma, session } = ctx;
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    return user?.id;
  }),
});
