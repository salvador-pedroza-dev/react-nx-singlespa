import { useTranslation } from 'react-i18next';

export function NxWelcome() {
  const { t } = useTranslation('dashboard');

  return (
    <div className="flex flex-col gap-3 h-full">
      <h1 className="text-3xl">{t('title')}</h1>
      <div className="card border border-outline-variant flex-1"></div>
    </div>
  );
}
