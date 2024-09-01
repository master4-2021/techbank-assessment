import prisma from "@/libs/prismaClient";
import { createCallerFactory, mergeRouters, procedure, router } from "../trpc";
import { z } from "zod";

export const appRouter = router({
  healthcheck: procedure.query(() => "OK!"),
  getNotifications: procedure.query(async (_opts) => {
    const notifications = await prisma.notification.findMany();
    return notifications;
  }),
  notification: router({
    create: procedure
      .input(
        z.object({
          typeId: z.number(),
          message: z.string(),
          personName: z.string().optional(),
          iconUrl: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        const created = await prisma.notification.create({
          data: {
            ...input,
            isRead: false,
          },
        });

        return created;
      }),
    markAsRead: procedure
      .input(
        z.object({
          id: z.number(),
        })
      )
      .mutation(async ({ input }) => {
        const updated = await prisma.notification.update({
          where: {
            id: input.id,
          },
          data: {
            isRead: true,
          },
        });

        return updated;
      }),
  }),
  notificationType: procedure.query(async (_opts) => {
    const types = await prisma.notificationType.findMany();
    return types;
  }),
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
