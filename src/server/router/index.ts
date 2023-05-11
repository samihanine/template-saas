import { router } from '@/server/trpc';
import { settingsRouter } from '@/server/router/settings';
import { resourcesRouter } from '@/server/router/resources';
import { jobsRouter } from './jobs';

export const appRouter = router({
  settings: settingsRouter,
  resources: resourcesRouter,
  jobs: jobsRouter,
});

export type AppRouter = typeof appRouter;
