import { router } from '@/server/trpc';
import { settingsRouter } from '@/server/router/settings';
import { articlesRouter } from '@/server/router/articles';

export const appRouter = router({
  settings: settingsRouter,
  articles: articlesRouter,
});

export type AppRouter = typeof appRouter;
