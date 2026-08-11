  /* Madarek redesign — secondary pages
  --------------------------------------------------------------
  About, Schools, Foundation, Academy, Contact, SchoolDetail.
  Each page shares the layout law: photography full-bleed alone,
  text breathes alone. Page-level colour codes the section. */

import { lazy, Suspense, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  BRAND, useDensity, withOpacity,
  FoldedMark, Eyebrow, SectionNumber,
  Display, Body, Meta,
  Section, Container,
  ScrollImage,
  PillLink, TextLink, Reveal,
} from './system';
import type { BrandKey } from './system';
import { mediaByNewest, formatMediaDate, findMedia } from './data';
import type { School, MediaItem } from './data';
import { useArabic, useLocalizedSchool, useLocalizedMedia } from './i18n/localize';
/* Leaflet + react-leaflet (~150KB) live entirely inside SchoolsExplorer.
   Lazy-loading it keeps that weight out of every other page's bundle —
   it only downloads when the /schools page actually renders the map. */
const SchoolsExplorer = lazy(() => import('./schools-explorer').then((m) => ({ default: m.SchoolsExplorer })));

/* ── page-level cinematic hero — reusable ──────────────────── */
function PageHero({
  image,
  eyebrow,
  title,
  italicTail,
  lede,
  tone = 'ink',
  number,
}: {
  image: string;
  eyebrow: string;
  title: string;
  italicTail?: string;
  lede?: string;
  tone?: BrandKey;
  number?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['0%', '20%']);
  return (
    <section ref={ref} className="relative w-full h-dvh overflow-hidden bg-black" data-screen-label="Hero">
      <motion.div style={reduced ? undefined : { y: imgY }} className="absolute inset-0 will-change-transform" aria-hidden="true">
        <img src={image} alt="" className="w-full h-full object-cover scale-110" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(20,17,15,0.5) 0%, rgba(20,17,15,0.38) 28%, rgba(20,17,15,0.62) 58%, rgba(20,17,15,0.88) 82%, rgba(20,17,15,0.96) 100%)',
          }} />
      </motion.div>

      <div className="absolute top-32 md:top-36 right-6 md:right-12 z-10">
        <FoldedMark size={48} tone={tone} tilt="lean" opacity={0.85} />
      </div>

      <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 md:px-12 pb-20">
        <div className="max-w-[1400px]">
          <div className="flex items-center gap-3 mb-8">
            {number != null && (
              <span className="font-mono tabular-nums" style={{ fontSize: 11, letterSpacing: '0.18em', color: BRAND[tone], fontWeight: 600 }}>
                {String(number).padStart(2, '0')}
              </span>
            )}
            <Meta tone="paper">{eyebrow}</Meta>
          </div>
          <Display size="md" style={{ color: BRAND.paperHi }}>
            <span>{title}</span>
            {italicTail && (
              <span style={{ display: 'block', fontStyle: 'normal' }}>{italicTail}</span>
            )}
          </Display>
          {lede && (
            <div className="mt-8 max-w-xl">
              <Body size="lg" style={{ color: withOpacity('paper', 0.92) }}>{lede}</Body>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── About page ────────────────────────────────────────────── */
export function AboutPage() {
  const { t } = useTranslation();
  const d = useDensity();

  return (
    <>
      <PageHero
        image="/redesign-assets/about_us.webp"
        eyebrow={t('about.hero.eyebrow')}
        title={t('about.hero.title')}
        italicTail={t('about.hero.italicTail')}
        lede={t('about.hero.lede')}
        tone="ink" />

      {/* Our story — NEEDS FACTS: founder / parent company, number of schools &
          students, and key milestones to enrich this section. */}
      <Section bg="paperLo" className={d.sectionY}>
        <Container max="6xl">
          <Reveal>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-3">
                <SectionNumber n={1} tone="ink" />
                <div className="mt-3"><Eyebrow>{t('about.story.eyebrow')}</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Display size="md">{t('about.story.title')}</Display>
                <div className="mt-10 max-w-2xl">
                  <Body size="xl">
                    {t('about.story.body')}
                  </Body>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Vision & Mission */}
      <Section id="vision-mission" bg="paper" className={d.sectionY}>
        <Container max="6xl">
          <Reveal>
            <div className="grid grid-cols-12 gap-6 mb-20">
              <div className="col-span-12 md:col-span-3">
                <SectionNumber n={2} tone="ink" />
                <div className="mt-3"><Eyebrow>{t('about.visionMission.eyebrow')}</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Display size="lg">
                  <span>{t('about.visionMission.titleLine1')}</span>
                  <span style={{ display: 'block', fontStyle: 'normal', color: BRAND.inkSub }}>{t('about.visionMission.titleLine2')}</span>
                </Display>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-12 gap-6 mt-16">
              <div className="col-span-12 md:col-span-3 md:col-start-4">
                <Meta>{t('about.visionMission.visionLabel')}</Meta>
              </div>
              <div className="col-span-12 md:col-span-6">
                <Body size="xl">
                  {t('about.visionMission.vision')}
                </Body>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-12 gap-6 mt-12">
              <div className="col-span-12 md:col-span-3 md:col-start-4">
                <Meta>{t('about.visionMission.missionLabel')}</Meta>
              </div>
              <div className="col-span-12 md:col-span-6">
                <Body size="xl">
                  {t('about.visionMission.mission')}
                </Body>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Four Pillars — full version (descriptions moved from the homepage) */}
      <Section bg="paper" className={d.sectionY}>
        <Container max="6xl">
          <Reveal>
            <div className="grid grid-cols-12 gap-6 mb-16">
              <div className="col-span-12 md:col-span-3">
                <SectionNumber n={3} tone="ink" />
                <div className="mt-3"><Eyebrow>{t('about.pillars.eyebrow')}</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Display size="lg">{t('about.pillars.titleLine1')}<span style={{ color: BRAND.inkSub }}> {t('about.pillars.titleLine2')}</span></Display>
              </div>
            </div>
          </Reveal>

          <div className="border-t" style={{ borderColor: BRAND.rule }}>
            {(['excellence', 'innovation', 'growth', 'impact'] as const).map((key, i) => {
              const tone = (['red', 'yellow', 'cyan', 'lime'] as const)[i];
              const tags = t(`about.pillars.items.${key}.tags`, { returnObjects: true }) as string[];
              return (
              <div key={key} className="border-b py-10 md:py-14 grid grid-cols-12 gap-6" style={{ borderColor: BRAND.rule }}>
                <div className="col-span-12 md:col-span-1">
                  <span className="font-mono tabular-nums" style={{ fontSize: 13, letterSpacing: '0.18em', color: BRAND[tone], fontWeight: 600 }}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <h3 style={{ fontFamily: CARD_HEADING, fontWeight: 500, fontSize: 'clamp(1.4rem, 2vw, 1.9rem)', lineHeight: 1.15, letterSpacing: '-0.01em', color: BRAND.ink }}>{t(`about.pillars.items.${key}.title`)}</h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span key={tag} className="inline-block rounded-full px-3 py-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: '0.04em', color: BRAND.inkSub, background: BRAND.paperHi, border: `1px solid ${BRAND.rule}` }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 md:col-start-6">
                  <Body size="lg" muted>{t(`about.pillars.items.${key}.detail`)}</Body>
                </div>
              </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Educational Excellence — relocated from the homepage */}
      <Section bg="paperLo" className={d.sectionY}>
        <Container max="6xl">
          <Reveal>
            <div className="mb-16">
              <SectionNumber n={5} tone="cyan" />
              <div className="mt-3 mb-8"><Eyebrow tone="cyan">{t('about.excellence.eyebrow')}</Eyebrow></div>
              <Display size="lg">
                {t('about.excellence.titleLine1')}
                <span style={{ display: 'block', color: BRAND.inkSub }}>{t('about.excellence.titleLine2')}</span>
              </Display>
              <div className="mt-10 max-w-2xl">
                <Body size="lg" muted>
                  {t('about.excellence.body')}
                </Body>
              </div>
            </div>
          </Reveal>

          <div className="border-t" style={{ borderColor: BRAND.rule }}>
            {(['studentCentered', 'innovation', 'globalStandards', 'holistic'] as const).map((key, i) => (
              <div key={key} className="border-b py-10 md:py-14 grid grid-cols-12 gap-6 items-baseline" style={{ borderColor: BRAND.rule }}>
                <div className="col-span-2 md:col-span-1">
                  <span className="font-mono tabular-nums" style={{ fontSize: 13, letterSpacing: '0.18em', color: BRAND.cyan, fontWeight: 600 }}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="col-span-10 md:col-span-5">
                  <h3 style={{ fontFamily: CARD_HEADING, fontWeight: 500, fontSize: 'clamp(1.3rem, 1.8vw, 1.7rem)', lineHeight: 1.2, color: BRAND.ink }}>{t(`about.excellence.items.${key}.title`)}</h3>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <Body size="md" muted>{t(`about.excellence.items.${key}.note`)}</Body>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Leadership — folded in as a subsection of About */}
      <LeadershipSection />
    </>
  );
}

/* ── Schools page ──────────────────────────────────────────── */
export function SchoolsPage({ schools }: { schools: School[] }) {
  const { t } = useTranslation();
  return (
    <>
      <PageHero
        image="/redesign-assets/1.webp"
        eyebrow={t('schoolsPage.hero.eyebrow')}
        title={t('schoolsPage.hero.title')}
        italicTail={t('schoolsPage.hero.italicTail')}
        lede={t('schoolsPage.hero.lede')}
        tone="cyan" />

      <Suspense fallback={<div style={{ minHeight: '80vh' }} />}>
        <SchoolsExplorer schools={schools} />
      </Suspense>
    </>
  );
}


/* ── School Detail page ────────────────────────────────────── */
export function SchoolDetailPage({ school: schoolProp }: { school: School | undefined }) {
  const { t } = useTranslation();
  const d = useDensity();
  const school = useLocalizedSchool(schoolProp);
  if (!school) {
    return (
      <Section bg="paper" className="pt-48 pb-32">
        <Container max="5xl">
          <Display size="md">{t('schoolDetail.notFound')}</Display>
          <div className="mt-8">
            <TextLink to="/schools" tone="cyan">{t('schoolDetail.backToAll')}</TextLink>
          </div>
        </Container>
      </Section>
    );
  }
  return (
    <>
      <PageHero
        image={school.image}
        eyebrow={school.location}
        title={school.name}
        lede={school.description}
        tone="cyan" />

      <nav aria-label={t('schoolDetail.breadcrumb')} style={{ background: BRAND.paperHi }} className="border-b" >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center gap-3" style={{ borderColor: BRAND.rule }}>
          <Link
            to="/schools"
            className="inline-flex items-center gap-2 transition-colors hover:opacity-70"
            style={{ color: BRAND.ink, fontFamily: 'Inter, sans-serif', fontSize: 13 }}>
            <span aria-hidden="true">←</span>
            <Meta tone="ink">{t('nav.allSchools')}</Meta>
          </Link>
          <span aria-hidden="true" style={{ color: BRAND.inkMute }}>/</span>
          <span aria-current="page"><Meta tone="cyan">{school.short}</Meta></span>
          {school.status === 'upcoming' && (
            <span
              className="ml-1 font-mono uppercase"
              style={{ fontSize: 10, letterSpacing: '0.16em', color: BRAND.ink, background: BRAND.cyan, borderRadius: 999, padding: '4px 10px', fontWeight: 600 }}>
              {t('common.openingSoon')}
            </span>
          )}
        </div>
      </nav>

      <Section bg="paper" className={d.sectionY}>
        <Container max="6xl">
          <Reveal>
            <div className="grid grid-cols-12 gap-6 mb-24">
              <div className="col-span-12 md:col-span-3">
                <SectionNumber n={1} tone="cyan" />
                <div className="mt-3"><Eyebrow tone="cyan">{t('schoolDetail.facts')}</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 items-start">
                  {[
                    { label: t('schoolDetail.curriculum'), value: school.curriculum },
                    ...(school.grades ? [{ label: t('schoolDetail.grades'), value: school.grades }] : []),
                    { label: t('schoolDetail.ages'),       value: school.ages },
                    { label: t('schoolDetail.languages'),  value: school.languages },
                    { label: school.status === 'upcoming' ? t('schoolDetail.plannedCapacity') : t('schoolDetail.totalStudents'), value: school.students },
                  ].map((f) => (
                    <div key={f.label}>
                      <Meta>{f.label}</Meta>
                      <div className="mt-3" style={{ fontFamily: CARD_HEADING, fontWeight: 400, fontSize: 'clamp(1.3rem, 1.9vw, 1.7rem)', lineHeight: 1.25, letterSpacing: '-0.01em', color: BRAND.ink }}>
                        {f.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-12 gap-6 mb-24">
              <div className="col-span-12 md:col-span-3">
                <SectionNumber n={2} tone="cyan" />
                <div className="mt-3"><Eyebrow tone="cyan">{t('schoolDetail.overview')}</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Body size="xl">{school.overview}</Body>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-3">
                <SectionNumber n={3} tone="cyan" />
                <div className="mt-3"><Eyebrow tone="cyan">{t('schoolDetail.highlights')}</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {school.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-4 py-4 border-t" style={{ borderColor: BRAND.rule }}>
                      <span className="font-mono tabular-nums pt-1" style={{ fontSize: 11, color: BRAND.cyan, letterSpacing: '0.18em' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <Body size="md">{h}</Body>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <section className="w-full overflow-hidden" style={{ background: BRAND.paperLo }}>
        <div className="py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto mb-10">
            <Eyebrow tone="cyan">{t('schoolDetail.gallery')}</Eyebrow>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory">
            {(school.gallery || []).map((g, i) => (
              <div key={i} className="flex-shrink-0 snap-start w-[300px] md:w-[480px] aspect-[4/3] overflow-hidden rounded-lg ring-1 ring-black/5">
                <img src={g} alt={`${school.name} ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section bg="ink" className="py-24 md:py-32">
        <Container max="6xl">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <Eyebrow tone="paper">{t('schoolDetail.contact')}</Eyebrow>
            </div>
            <div className="col-span-12 md:col-span-9">
              <Display size="md" style={{ color: BRAND.paperHi }}>
                {t('schoolDetail.interestedIn')}<span style={{ fontStyle: 'normal' }}> {school.name}?</span>
              </Display>
              <div className="mt-10 space-y-3" style={{ color: withOpacity('paper', 0.8) }}>
                <div><Meta tone="paper">{t('schoolDetail.address')}</Meta><Body style={{ color: withOpacity('paper', 0.85) }}>{school.address}</Body></div>
                <div><Meta tone="paper">{t('schoolDetail.email')}</Meta>
                  <Body style={{ color: withOpacity('paper', 0.85) }}>
                    <a href={`mailto:${school.email}`} className="hover:text-white">{school.email}</a>
                  </Body>
                </div>
              </div>
              <div className="mt-12">
                <PillLink to="/contact" variant="invert" size="md">{t('schoolDetail.contactAdmissions')}</PillLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

/* ── Foundation page ──────────────────────────────────────── */
const CARD_HEADING = 'Plus Jakarta Sans, Inter, ui-sans-serif, sans-serif';

export function FoundationPage() {
  const { t } = useTranslation();
  const d = useDensity();

  const focusAreas = (['access', 'community', 'empowerment', 'partnerships', 'sustainability'] as const).map((key, i) => ({
    tone: (['pink', 'cyan', 'yellow', 'lime', 'red'] as const)[i],
    title: t(`foundation.focusAreas.items.${key}.title`),
    detail: t(`foundation.focusAreas.items.${key}.detail`),
  }));

  const involvement = (['partner', 'support', 'collaborate'] as const).map((key) => ({
    title: t(`foundation.involvement.items.${key}.title`),
    detail: t(`foundation.involvement.items.${key}.detail`),
  }));

  return (
    <>
      <PageHero
        image="/redesign-assets/transformation.webp"
        eyebrow={t('foundation.hero.eyebrow')}
        title={t('foundation.hero.title')}
        italicTail={t('foundation.hero.italicTail')}
        lede={t('foundation.hero.lede')}
        tone="pink" />

      {/* Mission — manifesto */}
      <Section bg="paper" className={d.sectionY}>
        <Container max="6xl">
          <Reveal>
            <div className="max-w-4xl">
              <Eyebrow tone="pink">{t('foundation.mission.eyebrow')}</Eyebrow>
              <div className="mt-7">
                <Display size="md">{t('foundation.mission.title')}</Display>
              </div>
              <div className="mt-10">
                <Body size="xl">
                  {t('foundation.mission.body')}
                </Body>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* What we do — focus areas / programmes */}
      <Section bg="paperLo" className={d.sectionY}>
        <Container>
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <Eyebrow tone="pink">{t('foundation.focusAreas.eyebrow')}</Eyebrow>
                <div className="mt-5"><Display size="md">{t('foundation.focusAreas.title')}</Display></div>
              </div>
              <div className="max-w-md">
                <Body size="md" muted>
                  {t('foundation.focusAreas.intro')}
                </Body>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {focusAreas.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.06}>
                <article className="h-full p-8 border rounded-lg flex flex-col" style={{ background: BRAND.paperHi, borderColor: BRAND.rule }}>
                  <div className="flex items-center justify-between mb-8">
                    <FoldedMark size={34} tone={f.tone} tilt="rest" />
                    <span className="font-mono tabular-nums" style={{ fontSize: 12, letterSpacing: '0.18em', color: BRAND.inkMute, fontWeight: 600 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: CARD_HEADING, fontWeight: 500, fontSize: 'clamp(1.25rem, 1.8vw, 1.6rem)', lineHeight: 1.2, letterSpacing: '-0.01em', color: BRAND.ink }}>
                    {f.title}
                  </h3>
                  <div className="mt-4"><Body size="md" muted>{f.detail}</Body></div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Ways to get involved */}
      <Section bg="paper" className={d.sectionY}>
        <Container>
          <Reveal>
            <div className="mb-14">
              <Eyebrow tone="pink">{t('foundation.involvement.eyebrow')}</Eyebrow>
              <div className="mt-5"><Display size="md">{t('foundation.involvement.title')}</Display></div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: BRAND.rule }}>
            {involvement.map((it, i) => (
              <div key={it.title} className="p-8 md:p-10" style={{ background: BRAND.paper }}>
                <span className="font-mono tabular-nums" style={{ fontSize: 12, letterSpacing: '0.18em', color: BRAND.pink, fontWeight: 600 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5" style={{ fontFamily: CARD_HEADING, fontWeight: 500, fontSize: 'clamp(1.2rem, 1.6vw, 1.5rem)', lineHeight: 1.2, color: BRAND.ink }}>
                  {it.title}
                </h3>
                <div className="mt-3"><Body size="md" muted>{it.detail}</Body></div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <PillLink to="mailto:foundation@madarek.me" variant="primary" size="md">{t('foundation.involvement.cta')}</PillLink>
          </div>
        </Container>
      </Section>
    </>
  );
}

/* ── Academy page ─────────────────────────────────────────── */
export function AcademyPage() {
  const { t } = useTranslation();
  const d = useDensity();
  const programs = (['exchange', 'leadership', 'innovation', 'enrichment', 'collaboration', 'partnerships'] as const).map((key) => ({
    title: t(`academy.programs.items.${key}.title`),
    detail: t(`academy.programs.items.${key}.detail`),
  }));

  return (
    <>
      <PageHero
        image="/redesign-assets/5.webp"
        eyebrow={t('academy.hero.eyebrow')}
        title={t('academy.hero.title')}
        italicTail={t('academy.hero.italicTail')}
        lede={t('academy.hero.lede')}
        tone="yellow" />

      {/* Overview */}
      <Section bg="paper" className={d.sectionY}>
        <Container max="6xl">
          <Reveal>
            <div className="max-w-4xl">
              <Eyebrow tone="yellow">{t('academy.overview.eyebrow')}</Eyebrow>
              <div className="mt-7">
                <Display size="md">{t('academy.overview.title')}</Display>
              </div>
              <div className="mt-10">
                <Body size="xl">
                  {t('academy.overview.body')}
                </Body>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Programs — ghost-number card grid */}
      <Section bg="paperLo" className={d.sectionY}>
        <Container>
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <Eyebrow tone="yellow">{t('academy.programs.eyebrow')}</Eyebrow>
                <div className="mt-5"><Display size="md">{t('academy.programs.title')}</Display></div>
              </div>
              <div className="max-w-md">
                <Body size="md" muted>
                  {t('academy.programs.intro')}
                </Body>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {programs.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 0.06}>
                <article className="relative h-full overflow-hidden p-8 border rounded-lg" style={{ background: BRAND.paperHi, borderColor: BRAND.rule }}>
                  <span
                    aria-hidden="true"
                    className="absolute -top-3 right-3 pointer-events-none select-none"
                    style={{ fontFamily: CARD_HEADING, fontWeight: 700, fontSize: 'clamp(4rem, 7vw, 5.5rem)', lineHeight: 1, color: withOpacity('yellow', 0.18) }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="relative">
                    <span className="block w-10 h-1 mb-7" style={{ background: BRAND.yellow }} />
                    <h3 style={{ fontFamily: CARD_HEADING, fontWeight: 500, fontSize: 'clamp(1.25rem, 1.8vw, 1.6rem)', lineHeight: 1.2, letterSpacing: '-0.01em', color: BRAND.ink }}>
                      {p.title}
                    </h3>
                    <div className="mt-4"><Body size="md" muted>{p.detail}</Body></div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Who it's for / How to join — NEEDS FACTS: specific age ranges and the
          enrolment process / dates from the Madarek team. */}
      <Section bg="paper" className={d.sectionY}>
        <Container max="6xl">
          <Reveal>
            <div className="mb-14">
              <Eyebrow tone="yellow">{t('academy.whoFor.eyebrow')}</Eyebrow>
              <div className="mt-5"><Display size="md">{t('academy.whoFor.title')}</Display></div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: BRAND.rule }}>
            <div className="p-8 md:p-10" style={{ background: BRAND.paper }}>
              <Meta tone="yellow">{t('academy.whoFor.whoLabel')}</Meta>
              <div className="mt-4">
                <Body size="lg" muted>
                  {t('academy.whoFor.who')}
                </Body>
              </div>
            </div>
            <div className="p-8 md:p-10" style={{ background: BRAND.paper }}>
              <Meta tone="yellow">{t('academy.whoFor.joinLabel')}</Meta>
              <div className="mt-4">
                <Body size="lg" muted>
                  {t('academy.whoFor.join')}
                </Body>
              </div>
              <div className="mt-7">
                <PillLink to="/contact" variant="primary" size="md">{t('schoolDetail.contactAdmissions')}</PillLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Vision + CTA */}
      <Section bg="ink" className="py-24 md:py-32">
        <Container max="6xl">
          <div className="mt-6 max-w-4xl">
            <Display size="md" style={{ color: BRAND.paperHi }}>
              {t('academy.vision.title')}
            </Display>
          </div>
          <div className="mt-8 max-w-2xl">
            <Body size="lg" style={{ color: withOpacity('paper', 0.78) }}>
              {t('academy.vision.body')}
            </Body>
          </div>
          <div className="mt-10">
            <PillLink to="mailto:academy@madarek.me" variant="invert" size="md">{t('academy.vision.cta')}</PillLink>
          </div>
        </Container>
      </Section>
    </>
  );
}

/* ── Contact page ─────────────────────────────────────────── */
export function ContactPage() {
  const { t } = useTranslation();
  const d = useDensity();
  const [submitted, setSubmitted] = useState(false);

  /* TODO: wire to a real backend endpoint or mail service.
     For now this is a UX placeholder that acknowledges the user. */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Section bg="ink" className="pt-48 pb-32">
        <Container max="6xl">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <Meta tone="paper">{t('contactPage.eyebrow')}</Meta>
            </div>
            <div className="col-span-12 md:col-span-9">
              <Display size="xl" style={{ color: BRAND.paperHi }}>
                {t('contactPage.titleLine')}<span style={{ fontStyle: 'normal' }}> {t('contactPage.titleAccent')}</span>
              </Display>
              <div className="mt-10 max-w-2xl">
                <Body size="lg" style={{ color: withOpacity('paper', 0.85) }}>
                  {t('contactPage.intro')}
                </Body>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section bg="paper" className={d.sectionY}>
        <Container max="6xl">
          <div className="flex flex-col md:grid md:grid-cols-12 gap-12">
            <div className="col-span-12 md:col-span-7">
              <Eyebrow>{t('contactPage.form.eyebrow')}</Eyebrow>
              {submitted ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-10 border rounded-lg p-8"
                  style={{ borderColor: BRAND.rule, background: BRAND.paperHi }}>
                  <Display size="xs" italic>{t('contactPage.form.thankYou')}</Display>
                  <div className="mt-4">
                    <Body size="md" muted>
                      {t('contactPage.form.thankYouBody')}{' '}
                      <a href="mailto:info@madarek.me" className="border-b border-current">info@madarek.me</a>.
                    </Body>
                  </div>
                </div>
              ) : (
                <form className="mt-10 space-y-8" onSubmit={handleSubmit} noValidate={false}>
                  <FormField label={t('contactPage.form.name')} id="name"    required />
                  <FormField label={t('contactPage.form.email')}     id="email"   type="email" required />
                  <FormField label={t('contactPage.form.role')} id="role"
                    options={[t('contactPage.form.roleParent'), t('contactPage.form.roleEducator'), t('contactPage.form.rolePartner'), t('contactPage.form.roleOther')]} />
                  <FormField label={t('contactPage.form.message')}   id="message" multiline required />
                  <div>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-[13px] tracking-[0.14em] uppercase font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#27C4FF]"
                      style={{ background: BRAND.ink, color: BRAND.paperHi }}>
                      {t('contactPage.form.submit')}
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="col-span-12 md:col-span-4 md:col-start-9">
              <Eyebrow>{t('contactPage.direct.eyebrow')}</Eyebrow>
              <div className="mt-10 space-y-8">
                <div>
                  <Meta>{t('contactPage.direct.generalLabel')}</Meta>
                  <div className="mt-2">
                    <Body size="md" muted>{t('contactPage.direct.general')}</Body>
                  </div>
                  <div className="mt-2">
                    <Body size="lg">
                      <a href="mailto:info@madarek.me" className="border-b border-current pb-1">info@madarek.me</a>
                    </Body>
                  </div>
                </div>
                <div>
                  <Meta>{t('contactPage.direct.partnershipsLabel')}</Meta>
                  <div className="mt-2">
                    <Body size="md" muted>{t('contactPage.direct.partnerships')}</Body>
                  </div>
                  <div className="mt-2">
                    <Body size="lg">
                      <a href="mailto:partnerships@madarek.me" className="border-b border-current pb-1">partnerships@madarek.me</a>
                    </Body>
                  </div>
                </div>
                <div>
                  <Meta>{t('contactPage.direct.careersLabel')}</Meta>
                  <div className="mt-2">
                    <Body size="md" muted>{t('contactPage.direct.careers')}</Body>
                  </div>
                  <div className="mt-2">
                    <Body size="lg">
                      <a href="mailto:careers@madarek.me" className="border-b border-current pb-1">careers@madarek.me</a>
                    </Body>
                  </div>
                </div>
                <div>
                  <Meta>{t('contactPage.direct.locationsLabel')}</Meta>
                  <div className="mt-2"><Body size="lg">{t('contactPage.direct.locations')}</Body></div>
                </div>
                <div>
                  <Meta>{t('contactPage.direct.socialLabel')}</Meta>
                  <div className="mt-2 flex gap-4">
                    <Body size="md">
                      <a href="https://www.linkedin.com/company/madarek1/" target="_blank" rel="noopener noreferrer" className="border-b border-current pb-1">LinkedIn</a>
                    </Body>
                    <Body size="md">
                      <a href="https://www.instagram.com/madarek.me/" target="_blank" rel="noopener noreferrer" className="border-b border-current pb-1">Instagram</a>
                    </Body>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

/* ── Leadership page ────────────────────────────────────────── */
/* Structural leader records. Display text (eyebrow, title, preview, bio)
   is translated at render via t(`leaders.<slug>.*`); `hasBio` gates the
   full-profile link and detail rendering. Names are proper nouns and stay
   here (their Arabic forms live under leaders.<slug>.name for the AR
   locale, read at render). */
type Leader = {
  slug: string; name: string; hasBio: boolean;
  tone: BrandKey; image: string; email: string; linkedin: string;
};

const LEADERS: Leader[] = [
  { slug: 'shukri-mansour',          name: 'Dr Shukri A. Mansour',     hasBio: false, tone: 'cyan',   image: '/redesign-assets/BOD/Dr.Shukri.svg',            email: 'shukri.mansour@madarek.me',  linkedin: '#' },
  { slug: 'mohamed-hussein-motawea', name: 'Mohamed Hussein Motawea',  hasBio: true,  tone: 'yellow', image: '/redesign-assets/BOD/Mohammad_al_motawea.svg',  email: 'mohamed.motawea@madarek.me', linkedin: '#' },
  { slug: 'haris-moideen',           name: 'Haris Moideen',            hasBio: true,  tone: 'pink',   image: '/redesign-assets/BOD/Haris.svg',                email: 'haris.moideen@madarek.me',   linkedin: '#' },
];

/* Board members. Names are proper nouns; `nameKey` selects the display
   name from t(`board.names.*`) (English or transliterated Arabic), and
   `titleKey` the role from t(`board.roles.*`). Order = display order. */
type BoardMember = { nameKey: string; titleKey: string; image: string };

const BOARD_UNITED: BoardMember[] = [
  { nameKey: 'majid-al-hokair',        titleKey: 'chairman', image: '/redesign-assets/BOD/Majed_al_hokair.svg' },
  { nameKey: 'sulaiman-al-abduljader', titleKey: 'member',   image: '/redesign-assets/BOD/Dr.Sulaiman.svg' },
  { nameKey: 'shukri-mansoor',         titleKey: 'member',   image: '/redesign-assets/BOD/Dr.Shukri.svg' },
  { nameKey: 'omar-al-jassar',         titleKey: 'member',   image: '/redesign-assets/BOD/Omar_al_jassar.svg' },
  { nameKey: 'fahad-albassam',         titleKey: 'member',   image: '/redesign-assets/BOD/Fahad_al_Bassam.svg' },
  { nameKey: 'omar-alshayeji',         titleKey: 'member',   image: '/redesign-assets/BOD/omar_al_shayeji.svg' },
  { nameKey: 'monira-al-wugayan',      titleKey: 'member',   image: '/redesign-assets/BOD/Monira.svg' },
];

const BOARD_HOLDINGS: BoardMember[] = [
  { nameKey: 'jassem-zainal',          titleKey: 'chairman',     image: '/redesign-assets/BOD/Jassem_Zainal.svg' },
  { nameKey: 'sulaiman-al-abduljader', titleKey: 'viceChairman', image: '/redesign-assets/BOD/Dr.Sulaiman.svg' },
  { nameKey: 'issah-al-muzaini',       titleKey: 'member',       image: '/redesign-assets/BOD/Issah_Al_Muzaini.svg' },
];

const getInitials = (name: string) =>
  name.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0]).join('');

/* Portrait — photo with an initials-monogram fallback if the image
   fails to load (placeholder URLs may 404). */
function Portrait({ src, alt, name, tone }: { src: string; alt: string; name: string; tone: BrandKey }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="absolute inset-0" style={{ background: `linear-gradient(140deg, ${withOpacity(tone, 0.5)} 0%, ${BRAND.ink} 80%)` }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <span aria-hidden="true" className="select-none leading-none"
          style={{ fontFamily: 'Plus Jakarta Sans, Inter, ui-sans-serif, sans-serif', fontWeight: 300, fontStyle: 'normal', fontSize: 'clamp(3rem, 8vw, 6rem)', color: withOpacity('paper', 0.9), letterSpacing: '-0.02em' }}>
          {getInitials(name)}
        </span>
      </div>
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="relative z-10 w-full h-full object-cover" />
      )}
    </div>
  );
}

/* Board — oversized portrait wall on a dark surface. Tall photo
   cards; name + role sit over a gradient at the base of each. */
function BoardWall({ members }: { members: BoardMember[] }) {
  const { t } = useTranslation();
  const tones: BrandKey[] = ['cyan', 'yellow', 'pink', 'lime', 'red'];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
      {members.map((m, i) => {
        const tone = tones[i % tones.length];
        const name = t(`board.names.${m.nameKey}`);
        return (
          <Reveal key={m.nameKey} delay={(i % 3) * 0.06}>
            <article className="group relative aspect-[3/4] overflow-hidden rounded-xl">
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]">
                <Portrait src={m.image} alt={name} name={name} tone={tone} />
              </div>
              <div className="absolute inset-0 z-20 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(10,12,28,0.92) 0%, rgba(10,12,28,0.45) 32%, rgba(10,12,28,0) 60%)' }} />
              <div className="absolute inset-x-0 bottom-0 z-30 p-5 md:p-6">
                <div style={{ fontFamily: 'Plus Jakarta Sans, Inter, ui-sans-serif, sans-serif', fontWeight: 400, fontSize: 'clamp(1.1rem, 1.6vw, 1.5rem)', lineHeight: 1.15, color: BRAND.paperHi }}>
                  {name}
                </div>
                <div className="mt-2 font-mono uppercase" style={{ fontSize: 11, letterSpacing: '0.16em', color: withOpacity('paper', 0.7) }}>
                  {t(`board.roles.${m.titleKey}`)}
                </div>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}

/* Executive row — the senior leaders on a dark band: portrait, a bordered
   role chip, big name, an accent rule, then a short bio with a link to the
   full profile. */
function LeadershipFeature({ leaders }: { leaders: Leader[] }) {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
      {leaders.map((leader, i) => (
        <Reveal key={leader.slug} delay={i * 0.1}>
          <div className="flex flex-col h-full">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl mb-7">
              <Portrait src={leader.image} alt={leader.name} name={leader.name} tone={leader.tone} />
            </div>
            <span
              className="inline-block self-start py-1.5 px-3 mb-5 font-mono uppercase"
              style={{ fontSize: 11, letterSpacing: '0.16em', color: withOpacity('paper', 0.72), border: `1px solid ${withOpacity('paper', 0.25)}` }}>
              {t(`leaders.${leader.slug}.eyebrow`)}
            </span>
            <div style={{ fontFamily: CARD_HEADING, fontWeight: 500, fontSize: 'clamp(1.5rem, 2.2vw, 2rem)', lineHeight: 1.12, letterSpacing: '-0.01em', color: BRAND.paperHi }}>
              {t(`leaders.${leader.slug}.name`)}
            </div>
            <div className="mt-3"><Meta tone="paper">{t(`leaders.${leader.slug}.title`)}</Meta></div>
            <div className="w-20 h-1 my-7" style={{ background: withOpacity('paper', 0.25) }} />
            <Body size="md" style={{ color: withOpacity('paper', 0.72) }}>{t(`leaders.${leader.slug}.preview`)}</Body>
            {leader.hasBio && (
              <div className="mt-6">
                <Link
                  to={`/about/leadership/${leader.slug}`}
                  className="inline-flex items-center gap-2 text-[13px] tracking-[0.14em] uppercase font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:#27C4FF]"
                  style={{ color: BRAND.paperHi }}>
                  <span className="border-b pb-0.5" style={{ borderColor: withOpacity('paper', 0.5) }}>{t('leaderDetail.readFullProfile')}</span>
                  <span style={{ color: BRAND.cyan }}>→</span>
                </Link>
              </div>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* Shareholders — the group's key institutional shareholders, shown as
  logo cards with a short summary. Summaries are pending: leave `summary`
  empty ('') and the card shows a "Summary to be added" placeholder.
  (The full ownership-percentage register is retained in SHAREHOLDING
   below for an optional breakdown if we want to show figures too.) */
const SHAREHOLDERS: { nameKey: string; name: string; logo: string; summary: string; tone: BrandKey; href?: string }[] = [
  { nameKey: 'sanam',     name: 'SANAM Capital Holding',         logo: '/redesign-assets/shareholders/SANAM.svg',           summary: '', tone: 'cyan',   href: 'https://www.sanam.com/' },
  { nameKey: 'al-hokair', name: 'Al Hokair Group',               logo: '/redesign-assets/shareholders/Al_Hokair_Group.svg', summary: '', tone: 'red',    href: 'http://www.alhokair.com/index.html' },
  { nameKey: 'gee',       name: 'Global Educational Excellence', logo: '/redesign-assets/shareholders/GEE_Logo_H.png',      summary: '', tone: 'lime',   href: 'https://www.gee-edu.com/' },
  { nameKey: 'al-jasser', name: 'Al Jasser Holding',             logo: '/redesign-assets/shareholders/aljasser.png',        summary: '', tone: 'yellow', href: 'https://careers.aljasser-holding.com/' },
];

function ShareholdingSection() {
  const { t } = useTranslation();
  const d = useDensity();
  return (
    <Section id="shareholding" bg="paperLo" className={d.sectionY}>
      <Container max="7xl">
        <Reveal>
          <div className="grid grid-cols-12 gap-6 mb-14">
            <div className="col-span-12 md:col-span-3">
              <SectionNumber n={8} tone="cyan" />
              <div className="mt-3"><Eyebrow tone="cyan">{t('shareholders.eyebrow')}</Eyebrow></div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <Display size="lg" style={{ overflowWrap: 'normal', wordBreak: 'keep-all' }}>
                {t('shareholders.titleLine1')} <span style={{ color: BRAND.inkSub }}>{t('shareholders.titleLine2')}</span>
              </Display>
              <div className="mt-8 max-w-2xl">
                <Body size="lg" muted>
                  {t('shareholders.intro')}
                </Body>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          {SHAREHOLDERS.map((s, i) => {
            const name = t(`shareholders.names.${s.nameKey}`);
            const cardClass = 'group flex flex-col h-full overflow-hidden rounded-xl border transition-shadow duration-300 hover:shadow-[0_24px_60px_-30px_rgba(10,14,28,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27C4FF]';
            const cardStyle = { borderColor: BRAND.rule, background: BRAND.paperHi } as const;
            const inner = (
              <>
                <span className="block h-1 w-full" style={{ background: BRAND[s.tone] }} />
                <div className="flex items-center justify-center h-48 md:h-56 px-8 py-10 border-b" style={{ background: '#FFFFFF', borderColor: BRAND.rule }}>
                  <img
                    src={s.logo}
                    alt={s.name}
                    className="max-h-full max-w-[88%] object-contain transition-transform duration-500 group-hover:scale-[1.04]" />
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <h3 style={{ fontFamily: CARD_HEADING, fontWeight: 500, fontSize: 'clamp(1.2rem, 1.7vw, 1.5rem)', lineHeight: 1.2, letterSpacing: '-0.01em', color: BRAND.ink }}>
                    {name}
                  </h3>
                  {s.summary && (
                    <div className="mt-4 flex-1">
                      <Body size="md" muted>{s.summary}</Body>
                    </div>
                  )}
                  {s.href && (
                    <div className="mt-auto pt-5 inline-flex items-center gap-2 text-[12px] tracking-[0.16em] uppercase font-medium" style={{ color: BRAND.ink }}>
                      <span className="border-b pb-0.5" style={{ borderColor: withOpacity('ink', 0.3) }}>{t('shareholders.visitWebsite')}</span>
                      <span style={{ color: BRAND.cyan }}>→</span>
                    </div>
                  )}
                </div>
              </>
            );
            return (
              <Reveal key={s.name} delay={(i % 4) * 0.08}>
                {s.href ? (
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={cardClass} style={cardStyle} aria-label={`${name} — ${t('shareholders.visitWebsite')}`}>
                    {inner}
                  </a>
                ) : (
                  <article className={cardClass} style={cardStyle}>{inner}</article>
                )}
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

/* Leadership — a subsection of the About page: the two governance boards
   first, then the executive team split into Leadership (the CEOs) and
   Management, and finally the shareholding breakdown. */
export function LeadershipSection() {
  const { t } = useTranslation();
  const d = useDensity();
  const leadership = LEADERS.filter((l) => l.slug !== 'haris-moideen');
  const management = LEADERS.filter((l) => l.slug === 'haris-moideen');
  return (
    <>
      {/* Board of Directors — governance wall (Holdings, then United) */}
      <Section bg="navy" className={d.sectionY}>
        <Container>
          <Reveal>
            <div className="grid grid-cols-12 gap-6 mb-16">
              <div className="col-span-12 md:col-span-3">
                <SectionNumber n={6} tone="cyan" />
                <div className="mt-3"><Eyebrow tone="cyan">{t('leadership.governance.eyebrow')}</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Display size="lg" style={{ color: BRAND.paperHi }}>
                  {t('leadership.governance.titleLine1')}<span style={{ fontStyle: 'normal' }}> {t('leadership.governance.titleLine2')}</span>
                </Display>
                <div className="mt-8 max-w-2xl">
                  <Body size="lg" style={{ color: withOpacity('paper', 0.72) }}>
                    {t('leadership.governance.body')}
                  </Body>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Madarek United */}
          <div className="mb-16 md:mb-20">
            <Reveal>
              <div className="flex items-center gap-5 mb-8">
                <h3 style={{ fontFamily: CARD_HEADING, fontWeight: 400, fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', letterSpacing: '-0.01em', color: BRAND.paperHi }}>
                  {t('leadership.boardUnited')}
                </h3>
                <span className="h-px flex-1" style={{ background: withOpacity('paper', 0.15) }} />
              </div>
            </Reveal>
            <BoardWall members={BOARD_UNITED} />
          </div>

          {/* Madarek Holdings */}
          <div>
            <Reveal>
              <div className="flex items-center gap-5 mb-8">
                <h3 style={{ fontFamily: CARD_HEADING, fontWeight: 400, fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', letterSpacing: '-0.01em', color: BRAND.paperHi }}>
                  {t('leadership.boardHoldings')}
                </h3>
                <span className="h-px flex-1" style={{ background: withOpacity('paper', 0.15) }} />
              </div>
            </Reveal>
            <BoardWall members={BOARD_HOLDINGS} />
          </div>
        </Container>
      </Section>

      {/* Leadership & Management — executive team below the boards */}
      <Section id="leadership" bg="ink" className={d.sectionY}>
        <Container max="6xl">
          <Reveal>
            <div className="grid grid-cols-12 gap-6 mb-16">
              <div className="col-span-12 md:col-span-3">
                <SectionNumber n={7} tone="cyan" />
                <div className="mt-3"><Eyebrow tone="cyan">{t('leadership.team.eyebrow')}</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Display size="lg" style={{ color: BRAND.paperHi }}>
                  {t('leadership.team.titleLine1')}<span style={{ fontStyle: 'normal', display: 'block' }}>{t('leadership.team.titleLine2')}</span>
                </Display>
                <div className="mt-8 max-w-2xl">
                  <Body size="lg" style={{ color: withOpacity('paper', 0.72) }}>
                    {t('leadership.team.body')}
                  </Body>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Leadership — the CEOs */}
          <div className="mb-16 md:mb-20">
            <Reveal>
              <div className="flex items-center gap-5 mb-10">
                <h3 style={{ fontFamily: CARD_HEADING, fontWeight: 400, fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', letterSpacing: '-0.01em', color: BRAND.paperHi }}>
                  {t('leadership.leadershipLabel')}
                </h3>
                <span className="h-px flex-1" style={{ background: withOpacity('paper', 0.15) }} />
              </div>
            </Reveal>
            <LeadershipFeature leaders={leadership} />
          </div>

          {/* Management */}
          <div>
            <Reveal>
              <div className="flex items-center gap-5 mb-10">
                <h3 style={{ fontFamily: CARD_HEADING, fontWeight: 400, fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', letterSpacing: '-0.01em', color: BRAND.paperHi }}>
                  {t('leadership.managementLabel')}
                </h3>
                <span className="h-px flex-1" style={{ background: withOpacity('paper', 0.15) }} />
              </div>
            </Reveal>
            <LeadershipFeature leaders={management} />
          </div>
        </Container>
      </Section>

      <ShareholdingSection />
    </>
  );
}

/* ── Leader detail page ───────────────────────────────────────
  Individual page for each executive (CEOs, CFO). BOD members do
  not get detail pages. */
export function LeaderDetailPage({ leader }: { leader: Leader | undefined }) {
  const { t } = useTranslation();
  const d = useDensity();

  if (!leader) {
    return (
      <Section bg="paper" className="pt-48 pb-32">
        <Container max="5xl">
          <Display size="md">{t('leaderDetail.notFound')}</Display>
          <div className="mt-8">
            <TextLink to="/about#leadership" tone="ink">{t('leaderDetail.backToLeadership')}</TextLink>
          </div>
        </Container>
      </Section>
    );
  }

  const others = LEADERS.filter((l) => l.slug !== leader.slug);
  const displayName = t(`leaders.${leader.slug}.name`);
  const lastName = displayName.split(' ').filter(Boolean).slice(-1)[0];

  return (
    <>
      {/* Hero — portrait on dark, name and title beside */}
      <section className="relative w-full pt-44 pb-24 md:pt-52 md:pb-32" style={{ background: BRAND.ink }}>
        <Container>
          <div className="grid grid-cols-12 gap-6 md:gap-12 items-center">
            <div className="col-span-12 md:col-span-4">
              <div
                className="aspect-[4/5] relative overflow-hidden rounded-xl"
                style={{ border: `1px solid ${withOpacity('paper', 0.18)}` }}>
                <Portrait src={leader.image} alt={leader.name} name={leader.name} tone={leader.tone} />
              </div>
            </div>
            <div className="col-span-12 md:col-span-8">
              <Eyebrow tone={leader.tone}>{t(`leaders.${leader.slug}.eyebrow`)}</Eyebrow>
              <div className="mt-6">
                <Display size="lg" style={{ color: BRAND.paperHi }}>{displayName}</Display>
              </div>
              <div className="mt-6">
                <Meta tone="paper">{t(`leaders.${leader.slug}.title`)}</Meta>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* breadcrumb */}
      <nav aria-label={t('schoolDetail.breadcrumb')} style={{ background: BRAND.paperHi }} className="border-b">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center gap-3" style={{ borderColor: BRAND.rule }}>
          <Link
            to="/about#leadership"
            className="inline-flex items-center gap-2 transition-colors hover:opacity-70"
            style={{ color: BRAND.ink, fontFamily: 'Inter, sans-serif', fontSize: 13 }}>
            <span aria-hidden="true">←</span>
            <Meta tone="ink">{t('leaderDetail.leadership')}</Meta>
          </Link>
          <span aria-hidden="true" style={{ color: BRAND.inkMute }}>/</span>
          <span aria-current="page"><Meta tone={leader.tone}>{lastName}</Meta></span>
        </div>
      </nav>

      {/* About */}
      <Section bg="paper" className={d.sectionY}>
        <Container max="6xl">
          <Reveal>
            <div className="grid grid-cols-12 gap-6 mb-12">
              <div className="col-span-12 md:col-span-3">
                <SectionNumber n={1} tone={leader.tone} />
                <div className="mt-3"><Eyebrow tone={leader.tone}>{t('leaderDetail.about')}</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                {leader.hasBio ? (
                  <div className="space-y-6 max-w-3xl">
                    {(t(`leaders.${leader.slug}.bio`, { returnObjects: true }) as string[]).map((para, i) => (
                      <Body key={i} size={i === 0 ? 'xl' : 'lg'} muted={i !== 0}>{para}</Body>
                    ))}
                  </div>
                ) : (
                  <Body size="xl">{t(`leaders.${leader.slug}.preview`)}</Body>
                )}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Other leaders */}
      <Section bg="paperLo" className={d.sectionY}>
        <Container>
          <Reveal>
            <div className="grid grid-cols-12 gap-6 mb-16">
              <div className="col-span-12 md:col-span-3">
                <SectionNumber n={2} tone="ink" />
                <div className="mt-3"><Eyebrow>{t('leaderDetail.teamEyebrow')}</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Display size="lg">
                  {t('leaderDetail.otherLine1')}<span style={{ fontStyle: 'normal' }}> {t('leaderDetail.otherLine2')}</span>
                </Display>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {others.map((l, i) => (
              <Reveal key={l.slug} delay={i * 0.06}>
                <Link
                  to={`/about/leadership/${l.slug}`}
                  className="group block overflow-hidden rounded-xl border focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:#27C4FF]"
                  style={{ borderColor: BRAND.rule, background: BRAND.paperHi }}>
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]">
                      <Portrait src={l.image} alt={l.name} name={l.name} tone={l.tone} />
                    </div>
                  </div>
                  <div className="p-6">
                    <Eyebrow tone={l.tone}>{t(`leaders.${l.slug}.eyebrow`)}</Eyebrow>
                    <div className="mt-3" style={{ fontFamily: 'Plus Jakarta Sans, Inter, ui-sans-serif, sans-serif', fontWeight: 300, fontSize: 22, lineHeight: 1.25, color: BRAND.ink }}>
                      {t(`leaders.${l.slug}.name`)}
                    </div>
                    <div className="mt-2"><Meta>{t(`leaders.${l.slug}.title`)}</Meta></div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section bg="ink" className="py-24 md:py-32">
        <Container max="6xl">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8">
              <Eyebrow tone="paper">{t('leaderDetail.leadership')}</Eyebrow>
              <div className="mt-6">
                <Display size="md" style={{ color: BRAND.paperHi }}>
                  {t('leaderDetail.ctaLine1')}<span style={{ fontStyle: 'normal' }}> {t('leaderDetail.ctaLine2')}</span>
                </Display>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 md:text-right">
              <PillLink to="/about#leadership" variant="invert">{t('leaderDetail.viewAll')}</PillLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

/* Route-bound wrapper — picks the leader from the URL slug. */
export function LeaderDetailRoute() {
  const { slug } = useParams<{ slug: string }>();
  const leader = LEADERS.find((l) => l.slug === slug);
  return <LeaderDetailPage leader={leader} />;
}

/* ── Media page ───────────────────────────────────────────────
  Announcements index. Reads the single source of truth in
  `data.ts` (`mediaByNewest`) — always newest-first, so adding an
  item there pushes older ones back automatically. Photos are
  pending: items with an empty `image` render a branded placeholder. */

/* Thumbnail — real photo when present, otherwise an on-brand
   placeholder so the grid still reads as intentional while images
   are being sourced. */
function MediaThumb({ item, aspect = 'aspect-[4/3]', mark = 40 }: { item: MediaItem; aspect?: string; mark?: number }) {
  const { t } = useTranslation();
  // Real photos may not be in the repo yet; fall back to the branded
  // placeholder if the image path 404s rather than showing a broken icon.
  const [failed, setFailed] = useState(false);
  const showImage = item.image && !failed;
  return (
    <div className={`relative overflow-hidden rounded-xl ring-1 ring-black/5 ${aspect}`}>
      {showImage ? (
        <img
          src={item.image}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      ) : (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4"
          style={{ background: `linear-gradient(150deg, ${withOpacity('cyan', 0.14)} 0%, ${BRAND.paperLo} 70%)` }}>
          <FoldedMark size={mark} tone="cyan" tilt="lean" opacity={0.85} />
          <span className="font-mono uppercase" style={{ fontSize: 10.5, letterSpacing: '0.2em', color: BRAND.inkMute }}>
            {t('common.imageComingSoon')}
          </span>
        </div>
      )}
    </div>
  );
}

/* Small category chip used over/near thumbnails. */
function CategoryChip({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center font-mono uppercase"
      style={{ fontSize: 10.5, letterSpacing: '0.18em', color: BRAND.ink, background: BRAND.paperHi, border: `1px solid ${BRAND.rule}`, borderRadius: 999, padding: '5px 11px' }}>
      {label}
    </span>
  );
}

const MEDIA_TITLE_FONT = "'Plus Jakarta Sans', Inter, ui-sans-serif, sans-serif";

/* The href a card/title should point to: internal article when it has a
   full body, else an external link, else none. */
function mediaLink(item: MediaItem): { to?: string; external?: string } {
  if (item.body) return { to: `/media/${item.id}` };
  if (item.href) return { external: item.href };
  return {};
}

/* Media card — links to an internal article page (/media/:id) when the
   item carries a full `body`; otherwise to an external `href` when set;
   otherwise it's a static card. Compact, uniform-height grid card. */
function MediaCard({ item: itemProp }: { item: MediaItem }) {
  const { t } = useTranslation();
  const item = useLocalizedMedia(itemProp) as MediaItem;
  const { to, external } = mediaLink(item);
  const clickable = to ?? external;

  const media = (
    <div className="relative mb-5 overflow-hidden rounded-xl">
      <MediaThumb item={item} />
      <div className="absolute left-3 top-3 z-10"><CategoryChip label={t(`media.categories.${item.category}`, { defaultValue: item.category })} /></div>
    </div>
  );

  const title = (
    <h3
      className="transition-colors group-hover:text-[color:#0B7DA6]"
      style={{ fontFamily: MEDIA_TITLE_FONT, fontWeight: 500, fontSize: 'clamp(1.02rem, 1.15vw, 1.2rem)', lineHeight: 1.28, letterSpacing: '-0.01em', color: BRAND.ink }}>
      <span className="line-clamp-3">{item.title}</span>
    </h3>
  );

  const inner = (
    <>
      {clickable ? (
        <span className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#27C4FF]">{media}</span>
      ) : media}
      <div className="flex items-center gap-3 mb-3">
        <Meta>{formatMediaDate(item.date, { short: true })}</Meta>
        <span className="block h-px w-5" style={{ background: BRAND.rule }} />
        <Meta>{item.source}</Meta>
      </div>
      {title}
      <p className="mt-3 flex-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: 14.5, lineHeight: 1.6, color: BRAND.inkSub }}>
        <span className="line-clamp-2">{item.excerpt}</span>
      </p>
      <div className="mt-5 inline-flex items-center gap-2 text-[12px] tracking-[0.16em] uppercase font-medium" style={{ color: BRAND.ink }}>
        <span className="border-b pb-0.5" style={{ borderColor: withOpacity('ink', 0.28) }}>
          {external ? t('media.readMore') : t('media.readArticle')}
        </span>
        <span style={{ color: BRAND.cyan }}>→</span>
      </div>
    </>
  );

  const cardClass = 'group flex flex-col h-full';
  if (to) return <Link to={to} className={cardClass} aria-label={item.title}>{inner}</Link>;
  if (external) return <a href={external} target="_blank" rel="noopener noreferrer" className={cardClass} aria-label={item.title}>{inner}</a>;
  return <article className={cardClass}>{inner}</article>;
}

/* Featured lead — the newest article as a wide, two-column hero card. */
function FeaturedMedia({ item: itemProp }: { item: MediaItem }) {
  const { t } = useTranslation();
  const item = useLocalizedMedia(itemProp) as MediaItem;
  const { to, external } = mediaLink(item);
  const inner = (
    <div className="group grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
      <div className="relative overflow-hidden rounded-2xl">
        <MediaThumb item={item} aspect="aspect-[16/10]" mark={56} />
        <div className="absolute left-4 top-4 z-10"><CategoryChip label={t(`media.categories.${item.category}`, { defaultValue: item.category })} /></div>
      </div>
      <div className="lg:py-4">
        <div className="flex items-center gap-3 mb-5">
          <Meta tone="cyan">{t('media.latest')}</Meta>
          <span className="block h-px w-6" style={{ background: BRAND.rule }} />
          <Meta>{formatMediaDate(item.date)}</Meta>
        </div>
        <h2 style={{ fontFamily: MEDIA_TITLE_FONT, fontWeight: 500, fontSize: 'clamp(1.6rem, 2.4vw, 2.3rem)', lineHeight: 1.14, letterSpacing: '-0.015em', color: BRAND.ink }}>
          <span className="transition-colors group-hover:text-[color:#0B7DA6]">{item.title}</span>
        </h2>
        <div className="mt-5 max-w-xl">
          <Body size="lg" muted>{item.excerpt}</Body>
        </div>
        <div className="mt-7 inline-flex items-center gap-2 text-[13px] tracking-[0.16em] uppercase font-medium" style={{ color: BRAND.ink }}>
          <span className="border-b pb-1" style={{ borderColor: withOpacity('ink', 0.35) }}>
            {external ? t('media.readMore') : t('media.readAnnouncement')}
          </span>
          <span style={{ color: BRAND.cyan }}>→</span>
        </div>
      </div>
    </div>
  );
  const cls = 'block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#27C4FF] rounded-2xl';
  if (to) return <Link to={to} className={cls} aria-label={item.title}>{inner}</Link>;
  if (external) return <a href={external} target="_blank" rel="noopener noreferrer" className={cls} aria-label={item.title}>{inner}</a>;
  return <div>{inner}</div>;
}

export function MediaPage() {
  const { t } = useTranslation();
  const d = useDensity();
  const categories = ['All', ...Array.from(new Set(mediaByNewest.map((m) => m.category)))];
  const [selected, setSelected] = useState<string>('All');
  // `mediaByNewest` is already sorted newest-first; filtering keeps order.
  const filtered = selected === 'All' ? mediaByNewest : mediaByNewest.filter((m) => m.category === selected);

  return (
    <>
      <PageHero
        image="/redesign-assets/transformation.webp"
        eyebrow={t('media.hero.eyebrow')}
        title={t('media.hero.title')}
        italicTail={t('media.hero.italicTail')}
        lede={t('media.hero.lede')}
        tone="cyan"
        number={1} />

      <Section bg="paper" className={d.sectionY}>
        <Container>
          <div className="flex flex-wrap gap-3 mb-12 md:mb-16">
            {categories.map((c) => {
              const active = c === selected;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelected(c)}
                  className="px-5 py-2.5 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27C4FF]"
                  style={{
                    background: active ? BRAND.ink : 'transparent',
                    color:      active ? BRAND.paperHi : BRAND.ink,
                    border: `1px solid ${active ? BRAND.ink : BRAND.rule}`,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13,
                    letterSpacing: '0.04em',
                    fontWeight: 400,
                  }}>
                  {c === 'All' ? t('media.filterAll') : t(`media.categories.${c}`, { defaultValue: c })}
                </button>
              );
            })}
          </div>

          {filtered.length > 0 && (
            <Reveal>
              <div className="mb-16 md:mb-24"><FeaturedMedia item={filtered[0]} /></div>
            </Reveal>
          )}

          {filtered.length > 1 && (
            <>
              <Reveal>
                <div className="flex items-center gap-5 mb-10 md:mb-12">
                  <Eyebrow>{t('media.moreNews')}</Eyebrow>
                  <span className="h-px flex-1" style={{ background: BRAND.rule }} />
                </div>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
                {filtered.slice(1).map((item, i) => (
                  <Reveal key={item.id} delay={Math.min((i % 3) * 0.06, 0.18)}>
                    <MediaCard item={item} />
                  </Reveal>
                ))}
              </div>
            </>
          )}

          {filtered.length === 0 && (
            <Body size="lg" muted>{t('media.empty')}</Body>
          )}
        </Container>
      </Section>
    </>
  );
}

/* ── Media article page ───────────────────────────────────────
  Full press-release page rendered from a MediaItem's `body` HTML,
  with an English / العربية toggle when Arabic content is present. */
const ARTICLE_CSS = `
.article-body { font-family: Inter, sans-serif; color: ${BRAND.inkSub}; }
.article-body > :first-child { margin-top: 0; }
.article-body p { font-size: 1.0625rem; line-height: 1.8; margin: 0 0 1.3rem; }
.article-body h3 { font-family: ${MEDIA_TITLE_FONT}; font-weight: 600; font-size: clamp(1.2rem, 1.7vw, 1.45rem); line-height: 1.3; letter-spacing: -0.01em; color: ${BRAND.ink}; margin: 2.4rem 0 0.85rem; }
.article-body strong { color: ${BRAND.ink}; font-weight: 600; }
.article-body em { font-style: italic; color: ${BRAND.inkMute}; }
.article-body hr { border: 0; border-top: 1px solid ${BRAND.rule}; margin: 2.75rem 0; }
.article-body[dir="rtl"] { font-family: 'Noto Naskh Arabic', 'Segoe UI', Tahoma, sans-serif; }
.article-body[dir="rtl"] p { line-height: 2; }
`;

export function MediaArticlePage({ item }: { item: MediaItem | undefined }) {
  const { t } = useTranslation();
  const siteAr = useArabic();
  const [lang, setLang] = useState<'en' | 'ar'>(siteAr ? 'ar' : 'en');

  if (!item || !item.body) {
    return (
      <Section bg="paper" className="pt-48 pb-32">
        <Container max="5xl">
          <Display size="md">{t('mediaArticle.notFound')}</Display>
          <div className="mt-8"><TextLink to="/media" tone="cyan">{t('mediaArticle.backToMedia')}</TextLink></div>
        </Container>
      </Section>
    );
  }

  const hasAr = Boolean(item.bodyAr);
  const isAr = lang === 'ar' && hasAr;
  const title = isAr ? (item.titleAr ?? item.title) : item.title;
  const bodyHtml = (isAr ? item.bodyAr : item.body) ?? '';
  const dir = isAr ? 'rtl' : 'ltr';
  const align = isAr ? 'right' : 'left';

  return (
    <>
      {/* Hero band — meta + title + language toggle on dark */}
      <section className="relative w-full pt-40 pb-14 md:pt-48 md:pb-16" style={{ background: BRAND.ink }}>
        <Container max="5xl">
          <Link to="/media" className="inline-flex items-center gap-2 text-[13px] tracking-[0.14em] uppercase font-medium mb-9"
            style={{ color: withOpacity('paper', 0.8) }}>
            <span style={{ color: BRAND.cyan }}>←</span>
            <span className="border-b pb-0.5" style={{ borderColor: withOpacity('paper', 0.4) }}>{t('mediaArticle.allNews')}</span>
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <Meta tone="cyan">{t(`media.categories.${item.category}`, { defaultValue: item.category })}</Meta>
            <span className="block h-px w-6" style={{ background: withOpacity('paper', 0.3) }} />
            <Meta tone="paper">{formatMediaDate(item.date)}</Meta>
          </div>
          <div dir={dir} style={{ textAlign: align }}>
            <h1 style={{ fontFamily: MEDIA_TITLE_FONT, fontWeight: 500, fontSize: 'clamp(1.7rem, 3vw, 2.7rem)', lineHeight: 1.14, letterSpacing: '-0.015em', color: BRAND.paperHi }}>
              {title}
            </h1>
          </div>
          {hasAr && (
            <div className="mt-9 inline-flex rounded-full p-1" style={{ border: `1px solid ${withOpacity('paper', 0.22)}` }}>
              {(['en', 'ar'] as const).map((code) => {
                const active = lang === code;
                return (
                  <button key={code} type="button" onClick={() => setLang(code)}
                    className="px-5 py-2 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27C4FF]"
                    style={{
                      background: active ? BRAND.paperHi : 'transparent',
                      color: active ? BRAND.ink : withOpacity('paper', 0.8),
                      fontFamily: 'Inter, sans-serif', fontSize: 13, letterSpacing: '0.04em',
                    }}>
                    {code === 'en' ? t('language.english') : t('language.arabic')}
                  </button>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      {/* Lead image + body — one paper band so the image sits close to
          the copy (small gap), with generous space below the article. */}
      <Section bg="paper" className="pt-10 md:pt-14 pb-24 md:pb-32">
        <Container max="5xl">
          <MediaThumb item={item} aspect="aspect-[16/9]" mark={64} />
        </Container>
        <Container max="5xl" className="mt-10 md:mt-12">
          <style>{ARTICLE_CSS}</style>
          <div className="mx-auto" style={{ maxWidth: '46rem' }}>
            <div className="article-body" dir={dir} style={{ textAlign: align }}
              dangerouslySetInnerHTML={{ __html: bodyHtml }} />

            {item.video && (
              <div className="mt-10 pt-8" style={{ borderTop: `1px solid ${BRAND.rule}` }}>
                <a href={item.video} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-[13px] tracking-[0.14em] uppercase font-medium transition-colors"
                  style={{ background: BRAND.ink, color: BRAND.paperHi }}>
                  ▶ {t('mediaArticle.watchReel')}
                  <span style={{ color: BRAND.cyan }}>→</span>
                </a>
              </div>
            )}

            <div className="mt-12">
              <PillLink to="/media" variant="ghost">{t('mediaArticle.backToAllNews')}</PillLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

/* Route-bound wrapper — picks the article from the URL id. */
export function MediaArticleRoute() {
  const { id } = useParams<{ id: string }>();
  return <MediaArticlePage item={findMedia(id)} />;
}

/* ── Careers page ────────────────────────────────────────── */
const CAREER_VALUES: { tone: BrandKey; title: string; detail: string }[] = [
  { tone: 'red',    title: 'Purpose-Driven Culture', detail: 'Be part of an organization committed to creating meaningful and lasting impact.' },
  { tone: 'yellow', title: 'Professional Growth',    detail: 'Develop your skills and unlock new opportunities within a dynamic environment.' },
  { tone: 'cyan',   title: 'Collaboration',          detail: 'Work alongside talented professionals who share a passion for education and excellence.' },
  { tone: 'lime',   title: 'Innovation',             detail: 'Contribute to an ecosystem that embraces creativity and continuous improvement.' },
];

const LIFE_IMAGES = [
  { src: '/redesign-assets/3.webp', caption: 'State-of-the-art learning environments' },
  { src: '/redesign-assets/4.webp', caption: 'Ongoing teacher development and training' },
  { src: '/redesign-assets/5.webp', caption: 'Collaborative, mission-driven teams' },
  { src: '/redesign-assets/6.webp', caption: 'Regional reach across the GCC' },
];

export function CareersPage() {
  const { t } = useTranslation();
  const d = useDensity();
  return (
    <>
      <PageHero
        image="/redesign-assets/growth.webp"
        eyebrow={t('careers.hero.eyebrow')}
        title={t('careers.hero.title')}
        italicTail={t('careers.hero.italicTail')}
        lede={t('careers.hero.lede')}
        tone="yellow"
        number={1} />

      <Section bg="paper" className={d.sectionY}>
        <Container max="6xl">
          <Reveal>
            <div className="border-t border-b py-16 md:py-20 text-center" style={{ borderColor: BRAND.rule }}>
              <Eyebrow>{t('careers.general.eyebrow')}</Eyebrow>
              <div className="mt-6">
                <Display size="md">
                  {t('careers.general.titleLine1')}<span style={{ fontStyle: 'normal' }}> {t('careers.general.titleLine2')}</span>
                </Display>
              </div>
              <div className="mt-8 max-w-xl mx-auto">
                <Body size="md" muted>
                  {t('careers.general.body')}
                </Body>
              </div>
              <div className="mt-10">
                <PillLink to="mailto:careers@madarek.me">{t('careers.general.cta')}</PillLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

function FormField({
  label,
  id,
  type = 'text',
  multiline = false,
  options,
  required = false,
}: {
  label: ReactNode;
  id: string;
  type?: string;
  multiline?: boolean;
  options?: string[];
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const fieldStyle = { fontFamily: 'Plus Jakarta Sans, Inter, ui-sans-serif, sans-serif', fontWeight: 300, fontSize: 22, color: BRAND.ink };
  const fieldClass = 'w-full bg-transparent outline-none py-2';
  const onFocus = () => setFocused(true);
  const onBlur  = () => setFocused(false);

  return (
    <div
      className="border-b pb-3 transition-colors"
      style={{ borderColor: focused ? BRAND.ink : BRAND.rule }}>
      <label htmlFor={id} className="block mb-2">
        <Meta>{label}{required ? ' *' : ''}</Meta>
      </label>
      {options ? (
        <select
          id={id} name={id}
          className={fieldClass} style={fieldStyle}
          onFocus={onFocus} onBlur={onBlur}>
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : multiline ? (
        <textarea
          id={id} name={id} rows={4} required={required}
          className={`${fieldClass} resize-none`} style={fieldStyle}
          onFocus={onFocus} onBlur={onBlur} />
      ) : (
        <input
          id={id} name={id} type={type} required={required}
          className={fieldClass} style={fieldStyle}
          onFocus={onFocus} onBlur={onBlur} />
      )}
    </div>
  );
}
