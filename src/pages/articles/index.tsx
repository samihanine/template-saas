import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { Wrapper } from '@/components/layouts/Wrapper';
import { getLocaleProps } from '@/utils/locales';
import { Card } from '@/components/layouts/Card';
import { useArticles } from '@/hooks/useArticle';

const Articles: NextPage = () => {
  const t = useTranslations();
  const { data: articles } = useArticles();

  return (
    <Wrapper title={t('navigation.dashboard')}>
      <Card className="mt-10">{JSON.stringify(articles)}</Card>
    </Wrapper>
  );
};

export const getServerSideProps = getLocaleProps;

export default Articles;
