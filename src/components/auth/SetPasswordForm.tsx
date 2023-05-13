import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { LoadingSpinner } from '@/components/icons/LoadingSpinner';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';

export const SetPasswordForm: React.FC = () => {
  const [password, setPassword] = useState('');
  const [hash, setHash] = useState('');
  const [loading, setLoading] = useState(false);

  const { supabaseClient } = useSessionContext();

  const t = useTranslations('auth');

  const router = useRouter();

  useEffect(() => {
    setHash(window.location.hash);
  }, []);

  const handleSubmit = async () => {
    setLoading(true);

    const hashArr = hash
      .substring(1)
      .split('&')
      .map((param) => param.split('='));

    let type;
    let accessToken;
    for (const [key, value] of hashArr) {
      if (key === 'type') {
        type = value;
      } else if (key === 'access_token') {
        accessToken = value;
      }
    }

    if (type !== 'recovery' || !accessToken || typeof accessToken === 'object') {
      toast.error(t('setError'));
      return;
    }

    const { error } = await supabaseClient.auth.updateUser({
      password: password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(t('setSuccess'));
    router.push('/dashboard');
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
      method="POST"
      className="space-y-6"
    >
      <div>
        <Label htmlFor="email">{t('password')}</Label>
        <div className="mt-1">
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="email"
            required
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {loading ? <LoadingSpinner /> : t('set')}
        </button>
      </div>
    </form>
  );
};
