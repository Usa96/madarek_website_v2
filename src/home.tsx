/* Madarek redesign — Home
  --------------------------------------------------------------
Eight sections stack vertically; each follows the layout law:
photography goes full-bleed alone, text stacks beneath it,
   no side-by-side. */

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  BRAND, useDensity, withOpacity,
  FoldedMark, Eyebrow, SectionNumber,
  Display, Body, Meta,
  Section, Container,
  ScrollImage,
  PillLink, TextLink, Reveal,
} from './system';
import type { BrandKey } from './system';
import { mediaByNewest, formatMediaDate } from './data';
import type { School, MediaItem } from './data';
import { useArabic, useLocalizedSchool, useLocalizedMediaList } from './i18n/localize';

/* ── 01 · Hero ─────────────────────────────────────────────── */
function HeroSection() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 1.08]);
  const titleY  = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -80]);
  const titleO  = useTransform(scrollYProgress, [0, 0.7], reduced ? [1, 1] : [1, 0]);

  return (
    <section ref={ref} className="relative w-full h-dvh overflow-hidden bg-black" data-screen-label="01 Hero">
      <motion.div
        style={{ scale: imgScale }}
        className="absolute inset-0 will-change-transform"
        aria-hidden="true">
        <img src="/redesign-assets/1.webp" alt="" className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(20,17,15,0.72) 0%, rgba(20,17,15,0.5) 35%, rgba(20,17,15,0.78) 75%, rgba(20,17,15,0.95) 100%)',
          }} />
      </motion.div>

      {/* top brand bar */}
      <div className="hero-eyebrow absolute top-0 left-0 right-0 z-20 px-6 md:px-12 pt-32 md:pt-36 text-[#F4EDE0]/85">
        <Meta tone="paper">{t('home.hero.eyebrow')}</Meta>
      </div>

      {/* main type */}
      <motion.div
        style={{ y: titleY, opacity: titleO }}
        className="absolute inset-0 z-10 flex flex-col justify-end px-6 md:px-12 pb-24 md:pb-32">
        <div className="max-w-[1400px]">
          <Display size="lg" style={{ color: BRAND.paperHi, fontWeight: 300 }}>
            <span style={{ display: 'block' }}>{t('home.hero.titleLine1')}</span>
            <span style={{ display: 'block', fontStyle: 'normal', color: BRAND.paperHi }}>
              {t('home.hero.titleLine2')}
            </span>
          </Display>

          <div className="mt-8 max-w-xl">
            <Body size="lg" style={{ color: withOpacity('paper', 0.85) }}>
              {t('home.hero.subtitle')}
            </Body>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-8">
            <PillLink to="#schools" variant="invert">{t('home.hero.cta')}</PillLink>
          </div>
        </div>
      </motion.div>

      {/* corner folded mark */}
      <div className="absolute top-32 right-6 md:right-12 z-20" aria-hidden="true">
        <FoldedMark size={56} tone="cyan" tilt="lean" opacity={0.7} />
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-8 left-6 md:left-12 z-20 flex items-center gap-3 text-[#F4EDE0]/60">
        <span className="block w-px h-12 bg-current animate-[fall_2s_ease-in-out_infinite]" />
        <Meta tone="paper">{t('home.hero.scroll')}</Meta>
      </div>
    </section>
  );
}

/* ── 02 · About — typographic statement only. */
function AboutSection() {
  const { t } = useTranslation();
  const d = useDensity();
  return (
    <Section id="about" bg="paper" className={`${d.sectionY}`}>
      <Container>
        <Reveal>
          <div className="grid grid-cols-12 gap-6 mb-16">
            <div className="col-span-12 md:col-span-3">
              <SectionNumber n={1} tone="ink" />
              <div className="mt-3"><Eyebrow tone="ink">{t('home.about.eyebrow')}</Eyebrow></div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <Display size="lg" italic={false}>
                {t('home.about.title')}
                <span style={{ fontStyle: 'normal', color: BRAND.inkSub }}> {t('home.about.titleAccent')}</span>
              </Display>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-12 gap-6 mt-24">
            <div className="col-span-12 md:col-span-3 md:col-start-4">
              <Meta>{t('home.about.introLabel')}</Meta>
            </div>
            <div className="col-span-12 md:col-span-6">
              <Body size="xl" muted={false}>
                {t('home.about.body1')}
              </Body>
              <div className="mt-6">
                <Body size="xl" muted={false}>
                  {t('home.about.body2')}
                </Body>
              </div>
              <div className="mt-12">
                <TextLink to="/about" tone="ink">{t('home.about.link')}</TextLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ── 03 · The Four Pillars — tagline + tag chips (full descriptions
   live on the About page). */
function FrameworkSection() {
  const { t } = useTranslation();
  const d = useDensity();

  const pillars: { tone: BrandKey; title: string; tagline: string; tags: string[] }[] = (
    ['excellence', 'innovation', 'growth', 'impact'] as const
  ).map((key, i) => ({
    tone: (['red', 'yellow', 'cyan', 'lime'] as const)[i],
    title: t(`home.framework.pillars.${key}.title`),
    tagline: t(`home.framework.pillars.${key}.tagline`),
    tags: t(`home.framework.pillars.${key}.tags`, { returnObjects: true }) as string[],
  }));

  return (
    <Section id="framework" bg="paperLo" className={d.sectionY}>
      <Container>
        <Reveal>
          <div className="grid grid-cols-12 gap-6 mb-16">
            <div className="col-span-12 md:col-span-3">
              <SectionNumber n={2} tone="ink" />
              <div className="mt-3"><Eyebrow>{t('home.framework.eyebrow')}</Eyebrow></div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <Display size="lg">
                <span>{t('home.framework.titleLine1')}</span>
                <span style={{ display: 'block', color: BRAND.inkSub }}>{t('home.framework.titleLine2')}</span>
              </Display>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: BRAND.rule }}>
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.06}>
              <div className="h-full p-8 md:p-10" style={{ background: BRAND.paper }}>
                <div className="flex items-center justify-between mb-7">
                  <span className="font-mono tabular-nums" style={{ fontSize: 13, letterSpacing: '0.18em', color: BRAND[p.tone], fontWeight: 600 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <FoldedMark size={30} tone={p.tone} tilt="rest" />
                </div>
                <h3 style={{ fontFamily: 'Plus Jakarta Sans, Inter, ui-sans-serif, sans-serif', fontWeight: 500, fontSize: 'clamp(1.5rem, 2.4vw, 2rem)', lineHeight: 1.15, letterSpacing: '-0.01em', color: BRAND.ink }}>
                  {p.title}
                </h3>
                <div className="mt-3"><Body size="md" muted>{p.tagline}</Body></div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block rounded-full px-3 py-1"
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: '0.04em', color: BRAND.inkSub, background: BRAND.paperHi, border: `1px solid ${BRAND.rule}` }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ── 04 · Full-bleed image moment + marquee. */
function CinematicMoment() {
  const { t } = useTranslation();
  return (
    <section className="relative w-full" data-screen-label="04 Cinematic moment">
      <div className="relative h-dvh w-full overflow-hidden">
        <ScrollImage
          src="/redesign-assets/2.webp"
          alt=""
          overlay="cinematic"
          priority />
        <div className="absolute inset-0 z-10 flex items-end px-6 md:px-12 pb-16">
          <div className="max-w-3xl">
            <Eyebrow tone="cyan" className="text-[#F4EDE0]/80">{t('home.cinematic.eyebrow')}</Eyebrow>
            <div className="mt-6">
              <Display size="md" style={{ color: BRAND.paperHi }} italic={false}>
                {t('home.cinematic.titleLine1')}
                <span style={{ fontStyle: 'normal' }}> {t('home.cinematic.titleAccent')}</span>
              </Display>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 05 · Schools — asymmetric photo mosaic on a dark band. One
    hero tile beside two stacked tiles; hover reveals details; each
    links to its campus page. */
function SchoolsSection({ schools }: { schools: School[] }) {
  const { t } = useTranslation();
  const d = useDensity();
  return (
    <Section id="schools" bg="navy" className={d.sectionY}>
      <Container>
        <Reveal>
          <div className="mb-16 md:mb-24">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-8 md:mb-10">
              <div>
                <SectionNumber n={3} tone="cyan" />
                <div className="mt-3"><Eyebrow tone="cyan">{t('home.schools.eyebrow')}</Eyebrow></div>
              </div>
              <Link
                to="/schools"
                className="group inline-flex items-baseline gap-2 border-b pb-1 transition-colors"
                style={{ color: BRAND.paperHi, borderColor: withOpacity('paper', 0.5), fontFamily: 'Inter, sans-serif', fontSize: 15 }}>
                {t('nav.allSchools')}
                <span className="transition-transform group-hover:translate-x-1" style={{ color: BRAND.cyan }}>→</span>
              </Link>
            </div>
            <Display style={{ color: BRAND.paperHi, fontSize: 'clamp(1.85rem, 4vw, 3.4rem)' }}>
              {t('home.schools.headlineCount', { count: schools.filter((s) => s.status !== 'upcoming').length })}{' '}
              <span style={{ color: withOpacity('paper', 0.55) }}>{t('home.schools.headlineAccent')}</span>
            </Display>
          </div>
        </Reveal>

        <Reveal>
          <SchoolsCarousel schools={schools} />
        </Reveal>
      </Container>
    </Section>
  );
}

/*  Horizontal snap carousel — scales to any number of campuses. Arrow
    controls, drag/scroll, and a progress bar; a closing card signals the
    network is still growing. */
function SchoolsCarousel({ schools }: { schools: School[] }) {
  const { t } = useTranslation();
  const isRtl = useArabic();
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Distance from the start edge, normalised to 0..max regardless of how
  // the browser reports scrollLeft in RTL (Chrome/FF: 0..-max, Safari:
  // max..0). Lets the same start/end/progress logic serve both directions.
  const startDistance = (el: HTMLElement, max: number) => {
    if (!isRtl) return el.scrollLeft;
    return el.scrollLeft <= 0 ? -el.scrollLeft : max - el.scrollLeft;
  };

  const update = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const pos = startDistance(el, max);
    setProgress(max > 0 ? pos / max : 1);
    setAtStart(pos <= 2);
    setAtEnd(pos >= max - 2);
  };

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRtl]);

  // dir = +1 advances toward the end, -1 back toward the start. `scrollBy`
  // uses physical x, so flip the sign in RTL where "forward" is leftward.
  const scrollByCards = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    const amount = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: (isRtl ? -1 : 1) * dir * amount, behavior: 'smooth' });
  };

  const arrowCls = 'grid place-items-center h-12 w-12 rounded-full border transition-all duration-300 ease-out hover:bg-[#F4EDE0] hover:text-[#0A0E1C] hover:border-transparent disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-current disabled:hover:border-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27C4FF]';

  return (
    <div>
      {/* controls */}
      <div className="flex items-center justify-between mb-8">
        <span className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: '0.2em', color: withOpacity('paper', 0.52) }}>
          {t('home.schools.dragToExplore')}
        </span>
        <div className="flex gap-3">
          <button type="button" onClick={() => scrollByCards(-1)} disabled={atStart} aria-label={t('home.schools.prevCampuses')}
            className={arrowCls} style={{ borderColor: withOpacity('paper', 0.28), color: BRAND.paperHi }}>
            <span className="-mt-0.5 text-lg">{isRtl ? '→' : '←'}</span>
          </button>
          <button type="button" onClick={() => scrollByCards(1)} disabled={atEnd} aria-label={t('home.schools.moreCampuses')}
            className={arrowCls} style={{ borderColor: withOpacity('paper', 0.28), color: BRAND.paperHi }}>
            <span className="-mt-0.5 text-lg">{isRtl ? '←' : '→'}</span>
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={update}
        role="group"
        aria-label={t('home.schools.campuses')}
        className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory">
        {schools.map((s, i) => (
          <CarouselCard key={s.slug} school={s} index={i} />
        ))}
        <FutureCampusCard />
      </div>

      {/* progress */}
      <div className="mt-8 h-px w-full overflow-hidden" style={{ background: withOpacity('paper', 0.15) }}>
        <div className="h-full transition-[width] duration-150" style={{ width: `${Math.max(10, progress * 100)}%`, background: BRAND.cyan }} />
      </div>
    </div>
  );
}

const CARD_W = 'flex-none w-[80%] sm:w-[55%] md:w-[40%] lg:w-[31%] xl:w-[27%]';

function CarouselCard({ school: schoolProp, index }: { school: School; index: number }) {
  const { t } = useTranslation();
  const school = useLocalizedSchool(schoolProp) as School;
  return (
    <Link
      data-card
      to={`/schools/${school.slug}`}
      className={`group relative ${CARD_W} snap-start overflow-hidden rounded-xl ring-1 ring-white/[0.08] transition-shadow duration-500 hover:ring-white/20 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[color:#27C4FF]`}
      style={{ background: BRAND.navy }}>
      <div className="relative aspect-[3/4]">
        <img
          src={school.image}
          alt={school.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.05]" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,12,28,0.9) 0%, rgba(10,12,28,0.62) 24%, rgba(10,12,28,0.28) 48%, rgba(10,12,28,0.06) 66%, rgba(10,12,28,0) 82%)' }} />
        <div className="absolute top-4 left-4">
          <span className="font-mono tabular-nums rounded-md px-2.5 py-1" style={{ fontSize: 10.5, letterSpacing: '0.18em', color: BRAND.paperHi, background: 'rgba(10,12,28,0.4)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        {school.status === 'upcoming' && (
          <div className="absolute top-4 right-4">
            <span className="font-mono uppercase rounded-md px-2.5 py-1" style={{ fontSize: 10, letterSpacing: '0.16em', color: BRAND.ink, background: BRAND.cyan, fontWeight: 600 }}>
              {t('home.schools.openingSoon')}
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
          <div className="font-mono uppercase mb-3" style={{ fontSize: 10.5, letterSpacing: '0.2em', color: withOpacity('paper', 0.7) }}>
            {school.location}
          </div>
          <h3 style={{ fontFamily: 'Plus Jakarta Sans, Inter, ui-sans-serif, sans-serif', fontWeight: 500, color: BRAND.paperHi, lineHeight: 1.12, letterSpacing: '-0.015em', fontSize: 'clamp(1.5rem, 2.2vw, 2rem)' }}>
            {school.short}
          </h3>
          <div className="overflow-hidden max-h-0 opacity-0 -translate-y-1 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100 group-hover:translate-y-0">
            <div className="mt-3 font-mono uppercase" style={{ fontSize: 10.5, letterSpacing: '0.14em', color: withOpacity('paper', 0.62) }}>
              {school.curriculum}{school.grades ? ` · ${school.grades}` : ''} · {t('home.schools.ages')} {school.ages}
            </div>
            <div className="mt-3 inline-flex items-center gap-2 text-[12px] tracking-[0.14em] uppercase font-medium" style={{ color: BRAND.paperHi }}>
              <span className="border-b pb-0.5" style={{ borderColor: withOpacity('paper', 0.5) }}>{t('home.schools.viewCampus')}</span>
              <span style={{ color: BRAND.cyan }}>→</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* Closing card — communicates the network keeps growing. */
function FutureCampusCard() {
  const { t } = useTranslation();
  return (
    <Link
      to="/schools"
      aria-label={t('home.schools.futureAria')}
      className={`group relative ${CARD_W} snap-start rounded-xl focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[color:#27C4FF]`}>
      <div
        className="relative aspect-[3/4] flex flex-col items-center justify-center text-center px-8 rounded-xl border border-white/[0.12] transition-colors duration-300 group-hover:border-[#27C4FF]/40"
        style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 45%, rgba(255,255,255,0) 100%)' }}>
        <span className="font-mono uppercase mb-6" style={{ fontSize: 10.5, letterSpacing: '0.2em', color: withOpacity('cyan', 0.9) }}>{t('home.schools.comingSoon')}</span>
        <FoldedMark size={44} tone="cyan" tilt="lean" />
        <div className="mt-7 max-w-[15rem]" style={{ fontFamily: 'Plus Jakarta Sans, Inter, ui-sans-serif, sans-serif', fontWeight: 300, color: BRAND.paperHi, fontSize: 'clamp(1.4rem, 2vw, 1.8rem)', lineHeight: 1.18 }}>
          {t('home.schools.futureTitle')}
        </div>
        <div className="mt-6 inline-flex items-center gap-2 text-[12px] tracking-[0.14em] uppercase font-medium" style={{ color: BRAND.paperHi }}>
          <span className="border-b pb-0.5 transition-colors group-hover:border-[#27C4FF]" style={{ borderColor: withOpacity('paper', 0.5) }}>{t('home.schools.exploreAll')}</span>
          <span style={{ color: BRAND.cyan }}>→</span>
        </div>
      </div>
    </Link>
  );
}

/* ── 06 · Foundation + Academy — two tight one-liners side by side,
   each linking to its full page. */
function FoundationAcademySection() {
  const { t } = useTranslation();
  const d = useDensity();
  const headingFont = 'Plus Jakarta Sans, Inter, ui-sans-serif, sans-serif';
  return (
    <Section bg="paper" className={d.sectionY}>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: BRAND.rule }}>
          <Reveal>
            <div className="h-full p-10 md:p-14" style={{ background: BRAND.paper }}>
              <div className="flex items-center gap-3 mb-6">
                <FoldedMark size={32} tone="pink" tilt="back" />
                <Eyebrow tone="pink">{t('home.foundationAcademy.foundationEyebrow')}</Eyebrow>
              </div>
              <h3 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: 'clamp(1.7rem, 2.8vw, 2.6rem)', lineHeight: 1.12, letterSpacing: '-0.02em', color: BRAND.ink }}>
                {t('home.foundationAcademy.foundationTitle')}
              </h3>
              <div className="mt-5 max-w-md">
                <Body size="md" muted>
                  {t('home.foundationAcademy.foundationBody')}
                </Body>
              </div>
              <div className="mt-8"><TextLink to="/foundation" tone="pink">{t('home.foundationAcademy.foundationLink')}</TextLink></div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="h-full p-10 md:p-14" style={{ background: BRAND.paper }}>
              <div className="flex items-center gap-3 mb-6">
                <FoldedMark size={32} tone="yellow" tilt="lean" />
                <Eyebrow tone="yellow">{t('home.foundationAcademy.academyEyebrow')}</Eyebrow>
              </div>
              <h3 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: 'clamp(1.7rem, 2.8vw, 2.6rem)', lineHeight: 1.12, letterSpacing: '-0.02em', color: BRAND.ink }}>
                {t('home.foundationAcademy.academyTitle')}
              </h3>
              <div className="mt-5 max-w-md">
                <Body size="md" muted>
                  {t('home.foundationAcademy.academyBody')}
                </Body>
              </div>
              <div className="mt-8"><TextLink to="/academy" tone="yellow">{t('home.foundationAcademy.academyLink')}</TextLink></div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ── 08 · Media — editorial mosaic (SANAM-style newsroom index).
   One large featured story, two horizontal cards beside it, and a row
   of three below. Reads the shared `mediaByNewest` source of truth;
   photos are pending, so cards use the branded placeholder. */

/* Card image — real photo when present, branded placeholder while
   images are pending. `className` sets the frame (aspect / min-height). */
function MediaImage({ item, className = '', markSize = 40 }: { item: MediaItem; className?: string; markSize?: number }) {
  const { t } = useTranslation();
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: BRAND.paperLo }}>
      {item.image ? (
        <img src={item.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" style={{ background: `linear-gradient(150deg, ${withOpacity('cyan', 0.16)} 0%, ${BRAND.paperLo} 68%)` }}>
          <FoldedMark size={markSize} tone="cyan" tilt="lean" opacity={0.85} />
          <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: '0.2em', color: BRAND.inkMute }}>
            {t('home.media.imageComingSoon')}
          </span>
        </div>
      )}
    </div>
  );
}

/* Category (left) + date (right) meta row. */
function MediaMeta({ item }: { item: MediaItem }) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: '0.14em', color: BRAND.cyan }}>{t(`media.categories.${item.category}`, { defaultValue: item.category })}</span>
      <span className="font-mono" style={{ fontSize: 11, letterSpacing: '0.06em', color: BRAND.inkMute }}>{formatMediaDate(item.date, { short: true })}</span>
    </div>
  );
}

const MEDIA_TITLE_FONT = 'Plus Jakarta Sans, Inter, ui-sans-serif, sans-serif';
const mediaCardBase = 'group flex flex-col overflow-hidden rounded-xl border transition-shadow duration-300 hover:shadow-[0_20px_50px_-24px_rgba(10,14,28,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27C4FF]';

/* Card destination: internal article page when the item carries a full
   body, else an external link, else the media index. */
const mediaHref = (it: MediaItem) => (it.body ? `/media/${it.id}` : it.href || '/media');

function MediaSection() {
  const { t } = useTranslation();
  const d = useDensity();
  const items = useLocalizedMediaList(mediaByNewest);
  if (items.length === 0) return null;

  const featured = items[0];
  const side = items.slice(1, 3);   // right-hand column beside the feature
  const rest = items.slice(3, 6);   // three cards below

  return (
    <Section id="media" bg="paper" className={d.sectionY}>
      <Container>
        {/* header */}
        <Reveal>
          <div className="grid grid-cols-12 gap-6 mb-10 md:mb-14">
            <div className="col-span-12 md:col-span-3">
              <SectionNumber n={4} tone="cyan" />
              <div className="mt-3"><Eyebrow tone="cyan">{t('home.media.eyebrow')}</Eyebrow></div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <Display size="lg">
                  {t('home.media.titleLine')}<span style={{ fontStyle: 'normal', color: BRAND.inkSub }}> {t('home.media.titleAccent')}</span>
                </Display>
                <Link
                  to="/media"
                  className="group inline-flex items-baseline gap-2 border-b pb-1 transition-colors"
                  style={{ color: BRAND.ink, borderColor: withOpacity('ink', 0.4), fontFamily: 'Inter, sans-serif', fontSize: 15 }}>
                  {t('home.media.viewAll', { count: items.length })}
                  <span className="transition-transform group-hover:translate-x-1" style={{ color: BRAND.cyan }}>→</span>
                </Link>
              </div>
              <div className="mt-5 max-w-2xl">
                <Body size="md" muted>
                  {t('home.media.subtitle')}
                </Body>
              </div>
            </div>
          </div>
        </Reveal>

        {/* top: dominant featured on the left + a right-hand column whose
            card(s) stretch to the same height as tall image-top posters
            (so a single side story never collapses into a thin sliver) */}
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
            {/* featured */}
            <Link
              to={mediaHref(featured)}
              className={`${mediaCardBase} lg:col-span-8`}
              style={{ borderColor: BRAND.rule, background: BRAND.paperHi }}>
              <MediaImage item={featured} className="flex-1 aspect-[16/10] lg:aspect-auto lg:min-h-[440px]" markSize={64} />
              <div className="p-6 md:p-8 flex flex-col gap-3">
                <MediaMeta item={featured} />
                <h3 style={{ fontFamily: MEDIA_TITLE_FONT, fontWeight: 500, fontSize: 'clamp(1.45rem, 2.4vw, 2rem)', lineHeight: 1.15, letterSpacing: '-0.01em', color: BRAND.ink }}>
                  {featured.title}
                </h3>
                <Body size="md" muted>{featured.excerpt}</Body>
                <span className="mt-1 inline-flex items-center gap-2 text-[13px] tracking-[0.14em] uppercase font-medium" style={{ color: BRAND.ink }}>
                  <span className="border-b pb-0.5" style={{ borderColor: withOpacity('ink', 0.4) }}>{t('home.media.readMore')}</span>
                  <span className="transition-transform group-hover:translate-x-1" style={{ color: BRAND.cyan }}>→</span>
                </span>
              </div>
            </Link>

            {/* right-hand column — vertical poster card(s), image on top */}
            <div className="lg:col-span-4 flex flex-col gap-5 lg:gap-6">
              {side.map((it) => (
                <Link
                  key={it.id}
                  to={mediaHref(it)}
                  className={`${mediaCardBase} flex-1`}
                  style={{ borderColor: BRAND.rule, background: BRAND.paperHi }}>
                  <MediaImage item={it} className="flex-1 aspect-[16/10] lg:aspect-auto lg:min-h-[160px]" markSize={40} />
                  <div className="p-6 flex flex-col gap-2.5">
                    <MediaMeta item={it} />
                    <h3 style={{ fontFamily: MEDIA_TITLE_FONT, fontWeight: 500, fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)', lineHeight: 1.22, letterSpacing: '-0.005em', color: BRAND.ink }}>
                      <span className="line-clamp-4">{it.title}</span>
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        {/* bottom: three cards */}
        {rest.length > 0 && (
          <Reveal delay={0.08}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mt-5 lg:mt-6">
              {rest.map((it) => (
                <Link
                  key={it.id}
                  to={mediaHref(it)}
                  className={`${mediaCardBase} h-full`}
                  style={{ borderColor: BRAND.rule, background: BRAND.paperHi }}>
                  <MediaImage item={it} className="aspect-[16/10]" markSize={36} />
                  <div className="p-6 flex flex-col flex-1 gap-2.5">
                    <MediaMeta item={it} />
                    <h3 style={{ fontFamily: MEDIA_TITLE_FONT, fontWeight: 500, fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)', lineHeight: 1.2, letterSpacing: '-0.005em', color: BRAND.ink }}>
                      {it.title}
                    </h3>
                    <div className="mt-1"><Body size="sm" muted>{it.excerpt}</Body></div>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}

/* ── 09 · Contact — large typographic close. Single primary CTA. */
function ContactSection() {
  const { t } = useTranslation();
  const d = useDensity();
  return (
    <Section id="contact-cta" bg="white" className={d.sectionY}>
      <Container max="7xl">
        <Reveal>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <SectionNumber n={5} tone="cyan" />
              <div className="mt-3"><Eyebrow tone="cyan">{t('home.contact.eyebrow')}</Eyebrow></div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <Display size="lg">
                {t('home.contact.titleLine')}<span style={{ fontStyle: 'normal', color: BRAND.inkSub }}> {t('home.contact.titleAccent')}</span>
              </Display>
              <div className="mt-12 max-w-2xl">
                <Body size="lg" muted>
                  {t('home.contact.body')}
                </Body>
              </div>
              <div className="mt-12 flex flex-wrap items-center gap-8">
                <PillLink to="/contact" variant="primary" size="md">{t('home.contact.cta')}</PillLink>
                <a
                  href="mailto:info@madarek.me"
                  className="transition-colors text-[15px] font-light border-b pb-1 hover:border-current"
                  style={{ color: BRAND.inkSub, borderColor: withOpacity('ink', 0.3) }}>
                  info@madarek.me →
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ── compose ──────────────────────────────────────────────── */
export default function HomePage({ schools }: { schools: School[] }) {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FrameworkSection />
      <CinematicMoment />
      <SchoolsSection schools={schools} />
      {/* Foundation & Academy hidden for now — component retained above. */}
      <MediaSection />
      <ContactSection />
    </>
  );
}
