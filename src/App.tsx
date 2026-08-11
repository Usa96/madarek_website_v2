/* Madarek redesign — header, footer, routing shell.
   Uses react-router-dom v6 with BrowserRouter (clean URLs, no
   hash). Server should serve index.html for unknown paths. */

import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  BRAND, DensityCtx, withOpacity,
  MadarekLogo, Meta, Display, Body, Section, Container, PillLink,
} from './system';
import type { DensityKey } from './system';
import { LanguageProvider } from './i18n/LanguageProvider';
import { LanguageToggle } from './i18n/LanguageToggle';
import { useLocalizedSchools } from './i18n/localize';
import HomePage from './home';
import { schools } from './data';

/* Route components are code-split: the home page (the common entry
   point) loads eagerly, everything else — including the Leaflet-heavy
   schools explorer — loads on demand so it stays out of the initial
   bundle. All named exports live in ./pages, so Vite emits one shared
   async chunk for them plus a separate chunk for Leaflet. */
const AboutPage        = lazy(() => import('./pages').then((m) => ({ default: m.AboutPage })));
const SchoolsPage      = lazy(() => import('./pages').then((m) => ({ default: m.SchoolsPage })));
const SchoolDetailPage = lazy(() => import('./pages').then((m) => ({ default: m.SchoolDetailPage })));
const FoundationPage   = lazy(() => import('./pages').then((m) => ({ default: m.FoundationPage })));
const AcademyPage      = lazy(() => import('./pages').then((m) => ({ default: m.AcademyPage })));
const ContactPage      = lazy(() => import('./pages').then((m) => ({ default: m.ContactPage })));
const CareersPage      = lazy(() => import('./pages').then((m) => ({ default: m.CareersPage })));
const MediaPage        = lazy(() => import('./pages').then((m) => ({ default: m.MediaPage })));
const MediaArticleRoute = lazy(() => import('./pages').then((m) => ({ default: m.MediaArticleRoute })));
const LeaderDetailRoute = lazy(() => import('./pages').then((m) => ({ default: m.LeaderDetailRoute })));

/* Page transitions use a full-screen "cover wipe" (see AppShell):
   an ink panel sweeps across the viewport — navbar included — the
   route swaps and scroll resets while hidden behind it, then the
   panel sweeps off to reveal the new page. */

/* ── header ──────────────────────────────────────────────── */
function Header() {
  const { t } = useTranslation();
  const localizedSchools = useLocalizedSchools(schools);
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 80);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => { setMenuOpen(false); setOpenDrop(null); }, [pathname]);

  // close any open dropdown on an outside click
  useEffect(() => {
    const onDoc = () => setOpenDrop(null);
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  // close mobile menu on Escape; lock body scroll while open
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  // Dropdowns point at real destinations: About → its on-page sections,
  // Schools → each campus (from the schools source of truth).
  const nav: { to: string; label: string; children?: { to: string; label: string }[] }[] = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about'), children: [
      { to: '/about',                label: t('nav.overview') },
      { to: '/about#vision-mission', label: t('nav.visionMission') },
      { to: '/about#leadership',     label: t('nav.leadership') },
      { to: '/about#shareholding',   label: t('nav.shareholders') },
    ] },
    { to: '/schools', label: t('nav.schools'), children: [
      { to: '/schools', label: t('nav.allSchools') },
      ...localizedSchools.map((s) => ({ to: `/schools/${s.slug}`, label: s.short })),
    ] },
    { to: '/media', label: t('nav.media') },
    { to: '/careers', label: t('nav.careers') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const isActive = (to: string) => {
    if (to === '/') return pathname === '/';
    return pathname === to || pathname.startsWith(to + '/');
  };

  // Close menus on nav; when a link targets a section on the page we're
  // already on, scroll to it directly (a same-path hash change doesn't
  // re-trigger the router's scroll effect).
  const handleNavClick = (to: string) => {
    setOpenDrop(null);
    setMenuOpen(false);
    const i = to.indexOf('#');
    if (i < 0) return;
    const path = to.slice(0, i) || '/';
    const id = to.slice(i + 1);
    if (id && path === pathname) {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ block: 'start' });
      }, 0);
    }
  };

  return (
    <>
      <header
        className={`fixed top-3 left-4 right-4 md:left-20 md:right-20 z-[700] transition-all duration-500 ${scrolled ? 'py-3' : 'py-9'}`}
        style={{
          background: scrolled ? BRAND.paperHi : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderRadius: scrolled ? 9999 : 0,
          boxShadow: scrolled ? '0 12px 34px rgba(16,24,40,.16)' : 'none',
          border: scrolled ? `1px solid ${withOpacity('ink', 0.06)}` : '1px solid transparent',
        }}>
        <div className="relative px-6 md:px-12 flex items-center justify-between">
          <Link to="/" className="relative z-[10] flex items-center" aria-label={t('header.madarekHome')}>
            <MadarekLogo
              className="h-8 md:h-10 w-auto"
              style={{ color: scrolled ? BRAND.ink : BRAND.paperHi }} />
          </Link>

          {/* desktop — inline nav, aligned to the right (logo stays left) */}
          <nav aria-label={t('header.primary')} className="hidden lg:flex items-center gap-1">
            {nav.map((item) => {
              const active = isActive(item.to);
              const font = { fontFamily: 'Plus Jakarta Sans, Inter, ui-sans-serif, sans-serif', fontSize: 14.5, fontWeight: 500, letterSpacing: '0.005em' } as const;
              const tone = (on: boolean) =>
                on
                  ? (scrolled ? 'text-[#1A1714]' : 'text-[#FAF6EC]')
                  : (scrolled ? 'text-[#5C544A] hover:text-[#1A1714]' : 'text-[#F4EDE0]/75 hover:text-[#FAF6EC]');
              if (!item.children) {
                return (
                  <Link key={item.to} to={item.to} onClick={() => handleNavClick(item.to)} className={`relative px-3.5 py-2 transition-colors ${tone(active)}`} style={font}>
                    {item.label}
                    {active && <span className="absolute left-3.5 right-3.5 -bottom-0.5 h-px" style={{ background: BRAND.cyan }} />}
                  </Link>
                );
              }
              const dropOpen = openDrop === item.label;
              return (
                <div
                  key={item.to}
                  className="relative"
                  onMouseEnter={() => setOpenDrop(item.label)}
                  onMouseLeave={() => setOpenDrop(null)}>
                  <button
                    type="button"
                    aria-expanded={dropOpen}
                    aria-haspopup="true"
                    onClick={(e) => { e.stopPropagation(); setOpenDrop(dropOpen ? null : item.label); }}
                    className={`relative flex items-center gap-1 px-3.5 py-2 transition-colors ${tone(active || dropOpen)}`}
                    style={font}>
                    {item.label}
                    <svg width="9" height="6" viewBox="0 0 10 6" aria-hidden="true"
                      style={{ transform: dropOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s cubic-bezier(.2,0,0,1)', opacity: 0.6 }}>
                      <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {active && <span className="absolute left-3.5 right-6 -bottom-0.5 h-px" style={{ background: BRAND.cyan }} />}
                  </button>
                  <AnimatePresence>
                    {dropOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                        className="absolute top-full left-0 pt-3 z-[60]"
                        style={{ width: 256 }}>
                        <div
                          className="flex flex-col gap-0.5 p-2 rounded-xl"
                          style={{ background: BRAND.paperHi, boxShadow: '0 2px 4px rgba(16,24,40,.10), 0 18px 40px rgba(16,24,40,.22)' }}>
                          {item.children.map((c) => (
                            <Link
                              key={c.to}
                              to={c.to}
                              onClick={() => handleNavClick(c.to)}
                              className="px-3.5 py-2.5 rounded-lg transition-colors hover:bg-[#EAF6FD]"
                              style={{ color: BRAND.inkSub, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400 }}>
                              {c.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            <span className="ms-2 ps-3 border-s" style={{ borderColor: withOpacity(scrolled ? 'ink' : 'paper', 0.2) }}>
              <LanguageToggle color={scrolled ? BRAND.ink : BRAND.paperHi} />
            </span>
          </nav>

          {/* mobile — language toggle + menu button */}
          <div className="lg:hidden flex items-center gap-4 relative z-[10]">
            <LanguageToggle color={scrolled ? BRAND.ink : BRAND.paperHi} />
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:#27C4FF]"
            style={{ color: scrolled ? BRAND.ink : BRAND.paperHi }}
            aria-label={menuOpen ? t('header.closeMenu') : t('header.openMenu')}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase">{menuOpen ? t('header.close') : t('header.menu')}</span>
            <div className="flex flex-col gap-1">
              <span className="block w-5 h-px" style={{ background: scrolled ? BRAND.ink : BRAND.paperHi, transform: menuOpen ? 'rotate(45deg) translateY(2px)' : 'none', transition: 'transform 0.3s' }} />
              <span className="block w-5 h-px" style={{ background: scrolled ? BRAND.ink : BRAND.paperHi, transform: menuOpen ? 'rotate(-45deg) translateY(-2px)' : 'none', transition: 'transform 0.3s' }} />
            </div>
          </button>
          </div>
        </div>
      </header>

      {/* mobile menu — must sit above header */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t('header.siteNavigation')}
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[900] flex flex-col"
            style={{ background: BRAND.ink }}>

            {/* top bar — mirrors the site header */}
            <div className="px-6 md:px-12 pt-6 pb-6 flex items-center justify-between">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center"
                aria-label={t('header.madarekHome')}>
                <MadarekLogo className="h-8 md:h-10 w-auto" style={{ color: BRAND.paperHi }} />
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:#27C4FF]"
                style={{ color: BRAND.paperHi }}
                aria-label={t('header.closeMenu')}>
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase">{t('header.close')}</span>
                <div className="flex flex-col gap-1">
                  <span className="block w-5 h-px" style={{ background: BRAND.paperHi, transform: 'rotate(45deg) translateY(2px)' }} />
                  <span className="block w-5 h-px" style={{ background: BRAND.paperHi, transform: 'rotate(-45deg) translateY(-2px)' }} />
                </div>
              </button>
            </div>

            {/* nav links — top-level items with their sub-links, scrollable */}
            <div className="flex-1 overflow-y-auto px-6 md:px-12 py-6 flex flex-col gap-7">
              {nav.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                  <Link
                    to={item.to}
                    onClick={() => handleNavClick(item.to)}
                    style={{
                      fontFamily: 'Plus Jakarta Sans, Inter, ui-sans-serif, sans-serif',
                      fontWeight: 300,
                      fontStyle: 'normal',
                      fontSize: 'clamp(1.9rem, 7vw, 3rem)',
                      color: BRAND.paperHi,
                      lineHeight: 1.05,
                    }}>
                    {item.label}.
                  </Link>
                  {item.children && (
                    <div className="mt-3 pl-1 flex flex-wrap gap-x-5 gap-y-2">
                      {item.children.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          onClick={() => handleNavClick(c.to)}
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 15, color: withOpacity('paper', 0.6) }}>
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── footer ──────────────────────────────────────────────── */
function Footer() {
  const { t } = useTranslation();
  return (
    <footer style={{ background: BRAND.ink }} className="py-20 px-6 md:px-12 text-[#F4EDE0]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-20">
          <div className="col-span-12 md:col-span-5">
            <div className="mb-8">
              <MadarekLogo
                className="h-10 w-auto"
                style={{ color: BRAND.paperHi }} />
            </div>
            <div className="max-w-sm" style={{ color: withOpacity('paper', 0.7), fontWeight: 300, fontSize: 16, lineHeight: 1.5 }}>
              {t('footer.tagline')}
            </div>
          </div>

          <div className="col-span-6 md:col-span-3 md:col-start-7">
            <Meta tone="paper">{t('footer.explore')}</Meta>
            <ul className="mt-6 space-y-3">
              {[
                ['/', t('nav.home')],
                ['/about', t('nav.about')],
                ['/schools', t('nav.schools')],
                ['/media', t('nav.media')],
                ['/careers', t('nav.careers')],
                ['/contact', t('nav.contact')],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to}
                     style={{ color: withOpacity('paper', 0.8), fontWeight: 300, fontSize: 15 }}
                     className="hover:text-white">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-3">
            <Meta tone="paper">{t('footer.getInTouch')}</Meta>
            <ul className="mt-6 space-y-3">
              <li>
                <a href="mailto:info@madarek.me"
                   style={{ color: withOpacity('paper', 0.8), fontWeight: 300, fontSize: 15 }}
                   className="hover:text-white">info@madarek.me</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/madarek1/" target="_blank" rel="noopener noreferrer"
                   style={{ color: withOpacity('paper', 0.8), fontWeight: 300, fontSize: 15 }}
                   className="hover:text-white">LinkedIn</a>
              </li>
              <li>
                <a href="https://www.instagram.com/madarek.me/" target="_blank" rel="noopener noreferrer"
                   style={{ color: withOpacity('paper', 0.8), fontWeight: 300, fontSize: 15 }}
                   className="hover:text-white">Instagram</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-start md:items-center gap-3" style={{ borderColor: withOpacity('paper', 0.12) }}>
          <span style={{ color: withOpacity('paper', 0.55), fontSize: 13, fontWeight: 300 }}>
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </span>
          <div className="flex gap-6">
            <Link to="/privacy" style={{ color: withOpacity('paper', 0.55), fontSize: 13, fontWeight: 300 }} className="hover:text-white">{t('footer.privacy')}</Link>
            <Link to="/terms"   style={{ color: withOpacity('paper', 0.55), fontSize: 13, fontWeight: 300 }} className="hover:text-white">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── stub page for /privacy and /terms ───────────────────── */
function StubPage({ title }: { title: string }) {
  const { t } = useTranslation();
  return (
    <Section bg="paper" className="min-h-dvh flex items-center justify-center pt-48 pb-32">
      <Container max="5xl" className="text-center">
        <Meta>{t('stub.eyebrow')}</Meta>
        <div className="mt-6">
          <Display size="lg" italic>{title}.</Display>
        </div>
        <div className="mt-8">
          <Body size="lg" muted>
            {t('stub.body')}
          </Body>
        </div>
      </Container>
    </Section>
  );
}

/* ── 404 — real not-found, not a silent redirect ───────────── */
function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <Section bg="ink" className="min-h-dvh flex items-center justify-center pt-48 pb-32">
      <Container max="5xl" className="text-center">
        <Meta tone="paper">{t('notFound.eyebrow')}</Meta>
        <div className="mt-8">
          <Display size="xl" italic style={{ color: BRAND.paperHi }}>
            {t('notFound.title')}
          </Display>
        </div>
        <div className="mt-8 max-w-xl mx-auto">
          <Body size="lg" style={{ color: withOpacity('paper', 0.78) }}>
            {t('notFound.body')}
          </Body>
        </div>
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8">
          <PillLink to="/" variant="invert" size="md">{t('notFound.backHome')}</PillLink>
          <Link
            to="/schools"
            className="transition-colors text-[15px] font-light border-b pb-1"
            style={{ color: withOpacity('paper', 0.8), borderColor: withOpacity('paper', 0.4) }}>
            {t('notFound.exploreSchools')}
          </Link>
        </div>
      </Container>
    </Section>
  );
}

/* ── route-bound wrapper for the school detail page ──────── */
function SchoolDetailRoute() {
  const { slug } = useParams<{ slug: string }>();
  const school = schools.find((s) => s.slug === slug);
  return <SchoolDetailPage school={school} />;
}

/* ── app shell (inside the router) ───────────────────────── */
function AppShell() {
  const { t } = useTranslation();
  const [density] = useState<DensityKey>('editorial');
  const realLocation = useLocation();
  const reduced = useReducedMotion();

  // `shownLocation` is what the <Routes> actually render. It lags
  // behind the URL: when navigating, we hold the old page on screen,
  // sweep the cover across, and only swap once fully hidden.
  const [shownLocation, setShownLocation] = useState(realLocation);
  const [covering, setCovering] = useState(false);
  const swappedRef = useRef(false);

  useEffect(() => {
    if (realLocation.pathname === shownLocation.pathname) return;
    if (reduced) {
      // no animation — swap immediately
      setShownLocation(realLocation);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      return;
    }
    swappedRef.current = false;
    setCovering(true);
  }, [realLocation, shownLocation, reduced]);

  // Fires when the cover finishes sweeping IN (screen fully hidden)
  // and again after it sweeps OUT. We only act on the first.
  const onCoverComplete = () => {
    if (swappedRef.current) return;
    swappedRef.current = true;
    setShownLocation(realLocation);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    setCovering(false); // trigger the reveal (exit)
  };

  // After a page swaps in, honour a URL hash (e.g. /about#leadership) by
  // scrolling to that section instead of staying at the top. The target
  // may mount a frame or two later (lazy routes), so retry briefly.
  useEffect(() => {
    const hash = realLocation.hash;
    if (!hash) return;
    let tries = 0;
    let timer = 0 as unknown as ReturnType<typeof setTimeout>;
    const tryScroll = () => {
      const el = document.querySelector(hash);
      if (el) { el.scrollIntoView({ block: 'start' }); return; }
      if (tries++ < 40) timer = setTimeout(tryScroll, 40); // retry until the (possibly lazy) target mounts
    };
    timer = setTimeout(tryScroll, 0);
    return () => clearTimeout(timer);
  }, [realLocation.key]);

  return (
    <DensityCtx.Provider value={density}>
      <Header />
      <main>
        <Suspense fallback={<div style={{ minHeight: '100dvh', background: BRAND.ink }} />}>
          <Routes location={shownLocation}>
            <Route path="/"                   element={<HomePage schools={schools} />} />
            <Route path="/about"                    element={<AboutPage />} />
            <Route path="/about/leadership/:slug"   element={<LeaderDetailRoute />} />
            <Route path="/schools"            element={<SchoolsPage schools={schools} />} />
            <Route path="/schools/:slug"      element={<SchoolDetailRoute />} />
            <Route path="/foundation"         element={<FoundationPage />} />
            <Route path="/academy"            element={<AcademyPage />} />
            <Route path="/careers"            element={<CareersPage />} />
            <Route path="/media"              element={<MediaPage />} />
            <Route path="/media/:id"          element={<MediaArticleRoute />} />
            <Route path="/contact"            element={<ContactPage />} />
            <Route path="/privacy"            element={<StubPage title={t('footer.privacy')} />} />
            <Route path="/terms"              element={<StubPage title={t('footer.terms')} />} />
            <Route path="*"                   element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />

      {/* full-screen cover wipe — sits above the header (z-700) */}
      <AnimatePresence>
        {covering && (
          <motion.div
            key="page-cover"
            className="fixed inset-0 z-[900] flex items-center justify-center"
            style={{ background: BRAND.ink, pointerEvents: 'none' }}
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.83, 0, 0.17, 1] }}
            onAnimationComplete={onCoverComplete}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}>
              <MadarekLogo className="h-9 md:h-10 w-auto" style={{ color: BRAND.paperHi }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DensityCtx.Provider>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </LanguageProvider>
  );
}
