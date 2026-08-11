/* i18n bootstrap for the Madarek site.

   Two locales: English (default) and Arabic (RTL). Strings live in
   ./locales/*.json under a single default namespace. The active language
   is detected from localStorage first, then the browser, and persisted
   back to localStorage so a visitor's choice survives reloads.

   Document-level side effects (html lang / dir) are handled in
   ./LanguageProvider so they stay in React's lifecycle. */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import ar from './locales/ar.json';

export const SUPPORTED_LANGUAGES = ['en', 'ar'] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

/** Languages that read right-to-left. Drives the html `dir` attribute. */
export const RTL_LANGUAGES: Language[] = ['ar'];

export const isRtl = (lng: string): boolean =>
  RTL_LANGUAGES.includes(lng.split('-')[0] as Language);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGUAGES as unknown as string[],
    nonExplicitSupportedLngs: true, // treat en-US, ar-SA … as en / ar
    interpolation: { escapeValue: false }, // React already escapes
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'madarek.lang',
      caches: ['localStorage'],
    },
  });

export default i18n;
