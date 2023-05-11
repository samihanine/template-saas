import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { protectedProcedure, router } from '@/server/trpc';

const resourceSchema = z.object({
  id: z.string().optional(),
  type: z.enum(['NEWS', 'DOCUMENT']),
  imageUrl: z.string().optional(),
  isVisible: z.boolean().optional(),
  publishedAt: z.date().optional(),
  translations: z.array(
    z.object({
      language: z.string(),
      title: z.string(),
      content: z.string(),
      keywords: z.string(),
    })
  ),
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
      throw new TRPCError({ code: 'NOT_FOUND', message: 'lead not found' });
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
        type: input.type,
        imageUrl: input.imageUrl,
        isVisible: input.isVisible,
        publishedAt: input.publishedAt,
      },
    });

    for (const translation of input.translations) {
      await ctx.prisma.resourcesTranslations.create({
        data: {
          ...translation,
          resourceId: item.id,
        },
      });
    }

    return item;
  }),
  update: protectedProcedure.input(resourceSchema).mutation(async ({ ctx, input }) => {
    const item = await ctx.prisma.resources.update({
      where: {
        id: input.id,
      },
      data: {
        type: input.type,
        imageUrl: input.imageUrl,
        isVisible: input.isVisible,
        publishedAt: input.publishedAt,
      },
    });

    for (const translation of input.translations) {
      await ctx.prisma.resourcesTranslations.updateMany({
        where: {
          resourceId: item.id,
          language: translation.language,
        },
        data: {
          ...translation,
        },
      });
    }

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
