/* Compact EN / العربية switch. Colour is passed in so it can live in the
   header, which flips between light-on-dark and dark-on-light as the page
   scrolls. Switching language also flips the document to RTL/LTR via the
   LanguageProvider effect. */

import { useTranslation } from 'react-i18next';
import { useLanguage } from './LanguageProvider';

export function LanguageToggle({ color }: { color: string }) {
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();
  const next = language === 'ar' ? t('language.english') : t('language.arabic');

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      data-latin={language === 'ar' ? '' : undefined}
      className="font-mono text-[11px] tracking-[0.18em] uppercase transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:#27C4FF]"
      style={{ color }}
      aria-label={t('language.switchTo', { language: next })}>
      {language === 'ar' ? 'EN' : 'ع'}
    </button>
  );
}
