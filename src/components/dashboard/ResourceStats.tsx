import React, { useMemo } from 'react';
import { useResources } from '@/hooks/useResources';

type StatCardProps = {
  title: string;
  value?: number;
  color?: 'red' | 'green' | 'blue' | 'yellow' | 'purple' | 'pink';
};

const StatCard = ({ title, value = 0, color = 'red' }: StatCardProps) => (
  <div className="flex flex-col gap-3 rounded-lg border border-gray-300 bg-white p-4">
    <p className="text-lg font-semibold">{title}</p>
    <p
      className={`text-3xl font-bold text-red-500 first-letter:uppercase  
    ${color === 'green' ? '!text-green-500' : ''}
    ${color === 'blue' ? '!text-blue-500' : ''}
    ${color === 'yellow' ? '!text-yellow-500' : ''}
    ${color === 'purple' ? '!text-purple-500' : ''}
    ${color === 'pink' ? '!text-pink-500' : ''}
    `}
    >
      {value}
    </p>
  </div>
);
export const ResourceStats: React.FC = () => {
  const { data, isLoading, isError } = useResources();

  const resourceStats = useMemo(() => {
    if (!data) return {};

    const totalResources = data.length;
    const newsCount = data.filter((resource) => resource.type === 'NEWS').length;
    const documentsCount = data.filter((resource) => resource.type === 'DOCUMENT').length;

    return { totalResources, newsCount, documentsCount };
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Une erreur est survenue.</p>;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-4 text-2xl font-semibold">Ressources</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard title="Total des ressources" value={resourceStats.totalResources} />
        <StatCard title="Articles" value={resourceStats.newsCount} color="green" />
        <StatCard title="Documents" value={resourceStats.documentsCount} color="blue" />
      </div>
    </div>
  );
};
