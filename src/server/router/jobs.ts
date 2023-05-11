import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { protectedProcedure, router } from '@/server/trpc';

const jobSchema = z.object({
  id: z.string().optional(),
  location: z.enum(['REMOTE', 'ON_SITE', 'HYBRID']),
  place: z.string(),
  link: z.string().optional(),
  salary: z.string(),
  isVisible: z.boolean().optional(),
  publishedAt: z.date().optional(),
  translations: z.array(
    z.object({
      language: z.string(),
      title: z.string(),
      content: z.string(),
      duration: z.string(),
      type: z.string(),
    })
  ),
});

export const jobsRouter = router({
  getOne: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const item = await ctx.prisma.jobs.findFirst({
      where: {
        id: input,
        deletedAt: null,
      },
      include: {
        translations: true,
      },
    });

    if (!item) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'job not found' });
    }

    return item;
  }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const items = await ctx.prisma.jobs.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        translations: true,
      },
    });

    return items;
  }),
  create: protectedProcedure.input(jobSchema).mutation(async ({ ctx, input }) => {
    const item = await ctx.prisma.jobs.create({
      data: {
        location: input.location,
        place: input.place,
        link: input.link,
        salary: input.salary,
        publishedAt: input.publishedAt,
        isVisible: input.isVisible,
      },
    });

    for (const translation of input.translations) {
      await ctx.prisma.jobsTranslations.create({
        data: {
          ...translation,
          jobId: item.id,
        },
      });
    }

    return item;
  }),
  update: protectedProcedure.input(jobSchema).mutation(async ({ ctx, input }) => {
    const item = await ctx.prisma.jobs.update({
      where: {
        id: input.id,
      },
      data: {
        location: input.location,
        place: input.place,
        link: input.link,
        salary: input.salary,
        publishedAt: input.publishedAt,
        isVisible: input.isVisible,
      },
    });

    for (const translation of input.translations) {
      await ctx.prisma.jobsTranslations.updateMany({
        where: {
          jobId: item.id,
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
    const item = await ctx.prisma.jobs.update({
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
