/* Locale-aware field picking for the content data layer.

   Schools and media items carry parallel Arabic fields (`nameAr`,
   `overviewAr`, `titleAr`, …). These hooks swap in the Arabic value when
   the active language is Arabic and the field is present; otherwise the
   English source is used. English mode is therefore untouched. */

import { useTranslation } from 'react-i18next';
import type { School, MediaItem } from '../data';

export function useArabic(): boolean {
  const { i18n } = useTranslation();
  return i18n.language?.split('-')[0] === 'ar';
}

/** Return a shallow copy of `obj` with each field replaced by its
    `<field>Ar` counterpart when `isAr` and that counterpart is non-empty. */
function swap<T>(obj: T, isAr: boolean, fields: readonly string[]): T {
  if (!isAr) return obj;
  const src = obj as Record<string, unknown>;
  const out: Record<string, unknown> = { ...src };
  for (const f of fields) {
    const ar = src[`${f}Ar`];
    if (ar != null && !(Array.isArray(ar) && ar.length === 0) && ar !== '') out[f] = ar;
  }
  return out as T;
}

const SCHOOL_FIELDS = [
  'name', 'short', 'location', 'curriculum', 'grades', 'languages',
  'address', 'description', 'overview', 'highlights',
] as const;

const MEDIA_FIELDS = ['title', 'excerpt', 'source'] as const;

export function useLocalizedSchool(school: School | undefined): School | undefined {
  const isAr = useArabic();
  return school ? swap(school, isAr, SCHOOL_FIELDS) : school;
}

export function useLocalizedSchools(schools: School[]): School[] {
  const isAr = useArabic();
  return isAr ? schools.map((s) => swap(s, isAr, SCHOOL_FIELDS)) : schools;
}

export function useLocalizedMedia(item: MediaItem | undefined): MediaItem | undefined {
  const isAr = useArabic();
  return item ? swap(item, isAr, MEDIA_FIELDS) : item;
}

export function useLocalizedMediaList(list: MediaItem[]): MediaItem[] {
  const isAr = useArabic();
  return isAr ? list.map((m) => swap(m, isAr, MEDIA_FIELDS)) : list;
}
