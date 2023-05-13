import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { protectedProcedure, router } from '@/server/trpc';

const resourceSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
});

export const resourcesRouter = router({
  getOne: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const item = await ctx.prisma.resources.findFirst({
      where: {
        id: input,
        deletedAt: null,
      },
      include: {
        translations: true,
      },
    });

    if (!item) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'resource not found' });
    }

    return item;
  }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const items = await ctx.prisma.resources.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        translations: true,
      },
    });

    return items;
  }),
  create: protectedProcedure.input(resourceSchema).mutation(async ({ ctx, input }) => {
    const item = await ctx.prisma.resources.create({
      data: {
        ...input,
      },
    });

    return item;
  }),
  update: protectedProcedure.input(resourceSchema).mutation(async ({ ctx, input }) => {
    const item = await ctx.prisma.resources.update({
      where: {
        id: input.id,
      },
      data: {
        ...input,
      },
    });

    return item;
  }),
  destroy: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const item = await ctx.prisma.resources.update({
      where: {
        id: input,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return item;
  }),
});
