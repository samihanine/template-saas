import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { deleteCookie } from 'cookies-next';
import Link from 'next/link';
import { LoadingSpinner } from '@/components/icons/LoadingSpinner';
import { LANG_COOKIE_KEY } from '@/constants';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Button } from '../ui/Button';

export const SignInForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { supabaseClient } = useSessionContext();

  const t = useTranslations('auth');

  const handleSignIn = async () => {
    // clear error message
    setErrorMessage(undefined);
    setLoading(true);

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    // invalidate the stored language cookie
    // this will cause a DB re-fetch of the language preference on the next request
    deleteCookie(LANG_COOKIE_KEY);

    if (data) router.push('/dashboard');
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSignIn();
      }}
      method="POST"
      className="space-y-6"
    >
      <div>
        <Label htmlFor="email">{t('email')}</Label>
        <div className="mt-1">
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between">
          <Label htmlFor="password">{t('password')}</Label>
          <div className="text-sm">
            <Link href="/auth/forgot">{t('forgot')}</Link>
          </div>
        </div>
        <div className="mt-1">
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
      </div>

      {errorMessage && <p className="text-sm text-red-600 ">{errorMessage}</p>}

      <div className="space-y-4">
        <Button type="submit" disabled={loading}>
          {loading ? <LoadingSpinner /> : t('signIn')}
        </Button>
      </div>
    </form>
  );
};
