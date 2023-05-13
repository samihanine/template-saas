import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { protectedProcedure, router } from '@/server/trpc';

const articleSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
});

export const articlesRouter = router({
  getOne: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const item = await ctx.prisma.articles.findFirst({
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
    const items = await ctx.prisma.articles.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        translations: true,
      },
    });

    return items;
  }),
  create: protectedProcedure.input(articleSchema).mutation(async ({ ctx, input }) => {
    const item = await ctx.prisma.articles.create({
      data: {
        ...input,
      },
    });

    return item;
  }),
  update: protectedProcedure.input(articleSchema).mutation(async ({ ctx, input }) => {
    const item = await ctx.prisma.articles.update({
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
    const item = await ctx.prisma.articles.update({
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
