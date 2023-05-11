import { trpc } from '@/utils/trpc';

export const useJobs = () => {
  const res = trpc.jobs.getAll.useQuery(undefined, {
    staleTime: Infinity,
  });

  return {
    ...res,
    data: res.data || [],
  };
};
