import { useTranslations } from 'next-intl';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { LoadingSpinner } from '@/components/icons/LoadingSpinner';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { toast } from 'react-hot-toast';

export const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { supabaseClient } = useSessionContext();

  const t = useTranslations('auth');

  const handleForgot = async () => {
    setLoading(true);

    const { data, error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: process.env.NEXT_PUBLIC_APP_URL + '/auth/set',
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    if (data) {
      toast.success('Check your email for the reset link');
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleForgot();
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

      <div>
        <Button type="submit" disabled={loading}>
          {loading ? <LoadingSpinner /> : t('reset')}
        </Button>
      </div>
    </form>
  );
};
