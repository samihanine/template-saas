import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { AuthWrapper } from '@/components/auth/AuthWrapper';
import { getLocaleProps } from '@/utils/locales';
import Link from 'next/link';

const Success: NextPage = () => {
  const t = useTranslations('auth');

  return (
    <AuthWrapper type="success">
      <Link href="/signin">{t('loginNow')}</Link>
    </AuthWrapper>
  );
};

export const getServerSideProps = getLocaleProps;

export default Success;
