import { router } from '@/server/trpc';
import { settingsRouter } from '@/server/router/settings';
import { resourcesRouter } from '@/server/router/resources';

export const appRouter = router({
  settings: settingsRouter,
  resources: resourcesRouter,
});

export type AppRouter = typeof appRouter;
