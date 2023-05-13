import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { Wrapper } from '@/components/layouts/Wrapper';
import { getLocaleProps } from '@/utils/locales';
import { Card } from '@/components/layouts/Card';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';

const Article: NextPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const id = router.query.id as string;
  const { data: article } = trpc.articles.getOne.useQuery(id);

  return (
    <Wrapper title={t('navigation.dashboard')}>
      <Card className="mt-10">{JSON.stringify(article)}</Card>
    </Wrapper>
  );
};

export const getServerSideProps = getLocaleProps;

export default Article;
