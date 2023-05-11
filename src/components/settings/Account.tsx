import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { setCookie } from 'cookies-next';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/components/icons/LoadingSpinner';
import { LANG_COOKIE_KEY } from '@/constants';
import { trpc } from '@/utils/trpc';
import { Card } from '../layouts/Card';
import { Button } from '../ui/Button';

export const Account: React.FC = () => {
  const t = useTranslations('settings');
  const locale = useLocale();

  const { data: settings } = trpc.settings.get.useQuery();
  const mutation = trpc.settings.setLanguage.useMutation();

  const [selectedLang, setSelectedLang] = useState<string>();

  useEffect(() => {
    // if we have a language set, sync it to cookie
    if (settings?.language) {
      setCookie(LANG_COOKIE_KEY, settings.language, { sameSite: 'lax' });
    }
  }, [settings?.language]);

  useEffect(() => {
    // if we have a language, make it the selected choice
    if (settings?.language) {
      setSelectedLang(settings.language);
    }
    // if we don't have one set, use current locale as lang
    else {
      setSelectedLang(locale);
    }
  }, [settings?.language, locale]);

  const saveLocale = () => {
    if (!selectedLang) return;
    if (selectedLang !== 'en' && selectedLang !== 'fr') return;

    mutation.mutate(selectedLang, {
      onSuccess: () => {
        setCookie(LANG_COOKIE_KEY, selectedLang, { sameSite: 'lax' });

        // this is a somewhat inelegant way to show the new translations
        window.location.reload();
      },
      onError: () => {
        toast.error(t('updateFail'));
      },
    });
  };

  return (
    <section aria-labelledby="account-heading">
      <Card>
        <div>
          <h2 id="account-heading" className="text-lg font-medium leading-6 text-gray-900">
            {t('account')}
          </h2>
        </div>

        <div className="space-y-4">
          <div className="col-span-4 sm:col-span-2">
            <label htmlFor="locale" className="block text-sm font-medium text-gray-700">
              {t('language')}
            </label>
            <select
              id="locale"
              name="locale"
              value={selectedLang ?? locale}
              onChange={(e) => setSelectedLang(e.target.value)}
              autoComplete="country-name"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            >
              <option value="en">English</option>
              <option value="fr">French</option>
            </select>
          </div>
        </div>

        <Button type="submit" className="mt-2 self-end" onClick={saveLocale} disabled={mutation.isLoading}>
          {/* invisible means text remains hidden in the background to preserve the button width */}
          <span className={mutation.isLoading ? 'invisible' : undefined}>{t('save')}</span>
          {mutation.isLoading && <LoadingSpinner className="absolute" />}
        </Button>
      </Card>
    </section>
  );
};
