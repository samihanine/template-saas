import { trpc } from '@/utils/trpc';

export const useResources = () => {
  const res = trpc.resources.getAll.useQuery(undefined, {
    staleTime: Infinity,
  });

  return {
    ...res,
    data: res.data || [],
  };
};
