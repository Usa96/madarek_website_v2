/* Keeps the <html> element's `lang` and `dir` attributes in sync with the
   active i18next language, and exposes a tiny hook for reading/switching
   language anywhere in the tree.

   Mount <LanguageProvider> once, high in the app (above the router). It
   renders its children unchanged — its only job is the document side effect. */

import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isRtl, type Language, SUPPORTED_LANGUAGES } from './config';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    const apply = (lng: string) => {
      const root = document.documentElement;
      root.lang = lng.split('-')[0];
      root.dir = isRtl(lng) ? 'rtl' : 'ltr';
    };
    apply(i18n.language);
    i18n.on('languageChanged', apply);
    return () => i18n.off('languageChanged', apply);
  }, [i18n]);

  return <>{children}</>;
}

/** Read the current language and switch it. `dir` is handy for inline styles. */
export function useLanguage() {
  const { i18n } = useTranslation();
  const language = (i18n.language.split('-')[0] as Language) ?? 'en';

  const setLanguage = useCallback(
    (lng: Language) => { void i18n.changeLanguage(lng); },
    [i18n],
  );

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  }, [language, setLanguage]);

  return {
    language,
    languages: SUPPORTED_LANGUAGES,
    dir: isRtl(language) ? 'rtl' : ('ltr' as 'rtl' | 'ltr'),
    isRtl: isRtl(language),
    setLanguage,
    toggleLanguage,
  };
}
