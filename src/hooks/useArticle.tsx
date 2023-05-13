import { trpc } from '@/utils/trpc';

export const useArticles = () => {
  const res = trpc.articles.getAll.useQuery(undefined, {
    staleTime: Infinity,
  });

  return {
    ...res,
    data: res.data || [],
  };
};
