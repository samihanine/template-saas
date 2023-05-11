import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { Wrapper } from '@/components/layouts/Wrapper';
import { getLocaleProps } from '@/utils/locales';
import { Card } from '@/components/layouts/Card';
import { Input } from '@/components/ui/Input';

const Dashboard: NextPage = () => {
  const t = useTranslations();

  return (
    <Wrapper title={t('navigation.dashboard')}>
      <Card className="mt-10">
        <Input type="text" placeholder="Search" />
      </Card>
    </Wrapper>
  );
};

export const getServerSideProps = getLocaleProps;

export default Dashboard;
