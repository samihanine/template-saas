import { useSessionContext } from '@supabase/auth-helpers-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';
import { useState } from 'react';
import { GoogleButton } from '@/components/auth/GoogleButton';
import { LoadingSpinner } from '@/components/icons/LoadingSpinner';
import { LANG_COOKIE_KEY } from '@/constants';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState(false);

  const { supabaseClient } = useSessionContext();

  const t = useTranslations('auth');

  const router = useRouter();

  const handleSignUp = async () => {
    // clear error message
    setErrorMessage(undefined);
    setLoading(true);

    const {
      data: { session },
      error,
    } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_APP_URL + '/auth/success',
      },
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    // invalidate the stored language cookie
    // this will cause a DB re-fetch of the language preference on the next request
    deleteCookie(LANG_COOKIE_KEY);

    // if there is a session it means that we do not need to verify the email beforehand
    if (session) {
      router.push('/dashboard');
    } else {
      router.push('/auth/verify');
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSignUp();
      }}
      method="POST"
      className="space-y-6"
    >
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {t('email')}
        </label>
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
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          {t('password')}
        </label>
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
          {loading ? <LoadingSpinner /> : t('signUp')}
        </Button>

        <GoogleButton type="signup" />
      </div>
    </form>
  );
};
