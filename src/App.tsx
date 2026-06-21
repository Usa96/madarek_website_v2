/* Madarek redesign — header, footer, routing shell.
   Uses react-router-dom v6 with BrowserRouter (clean URLs, no
   hash). Server should serve index.html for unknown paths. */

import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  BRAND, DensityCtx, withOpacity,
  MadarekLogo, Meta, Display, Body, Section, Container, PillLink,
} from './system';
import type { DensityKey } from './system';
import HomePage from './home';
import {
  AboutPage, SchoolsPage, SchoolDetailPage,
  FoundationPage, AcademyPage, ContactPage,
  NewsPage, CareersPage, LeadershipPage, LeaderDetailRoute,
} from './pages';
import { schools } from './data';

/* Page transitions use a full-screen "cover wipe" (see AppShell):
   an ink panel sweeps across the viewport — navbar included — the
   route swaps and scroll resets while hidden behind it, then the
   panel sweeps off to reveal the new page. */

/* ── header ──────────────────────────────────────────────── */
function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 80);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

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

  const links = [
    { to: '/',                  label: 'Home' },
    { to: '/about',             label: 'About' },
    { to: '/about/leadership',  label: 'Leadership' },
    { to: '/schools',           label: 'Schools' },
    { to: '/foundation',        label: 'Foundation' },
    { to: '/academy',           label: 'Academy' },
    { to: '/news',              label: 'News' },
    { to: '/careers',           label: 'Careers' },
    { to: '/contact',           label: 'Contact' },
  ];

  // Longest-prefix match — so /about/leadership/* highlights "Leadership"
  // and not "About".
  const isActive = (to: string) => {
    if (to === '/') return pathname === '/';
    const matches = links
      .filter((l) => l.to !== '/' && (pathname === l.to || pathname.startsWith(l.to + '/')))
      .map((l) => l.to)
      .sort((a, b) => b.length - a.length);
    return to === matches[0];
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[700] transition-all duration-500 ${scrolled ? 'py-3' : 'py-6'}`}
        style={{
          background: scrolled ? withOpacity('ink', 0.85) : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? `1px solid ${withOpacity('paper', 0.08)}` : '1px solid transparent',
        }}>
        <div className="px-6 md:px-12 flex items-center justify-between">
          <Link to="/" className="flex items-center" aria-label="Madarek home">
            <MadarekLogo
              className="h-8 md:h-10 w-auto"
              style={{ color: BRAND.paperHi }} />
          </Link>

          {/* desktop nav */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {links.filter((l) => l.to !== '/contact').map((l) => {
              const active = isActive(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className="relative py-2 transition-colors"
                  style={{
                    color: active ? BRAND.paperHi : withOpacity('paper', 0.7),
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13,
                    letterSpacing: '0.04em',
                    fontWeight: 400,
                  }}>
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="navActive"
                      className="absolute -bottom-0.5 left-0 right-0 h-px"
                      style={{ background: BRAND.cyan }} />
                  )}
                </Link>
              );
            })}
            <Link
              to="/contact"
              className="ml-2 px-5 py-2 rounded-full transition-colors"
              style={{
                background: BRAND.paperHi,
                color: BRAND.ink,
                fontSize: 12,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}>
              Enquire
            </Link>
          </nav>

          {/* mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex items-center gap-2 py-2 relative z-[10] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:#27C4FF]"
            style={{ color: BRAND.paperHi }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase">{menuOpen ? 'Close' : 'Menu'}</span>
            <div className="flex flex-col gap-1">
              <span className="block w-5 h-px" style={{ background: BRAND.paperHi, transform: menuOpen ? 'rotate(45deg) translateY(2px)' : 'none', transition: 'transform 0.3s' }} />
              <span className="block w-5 h-px" style={{ background: BRAND.paperHi, transform: menuOpen ? 'rotate(-45deg) translateY(-2px)' : 'none', transition: 'transform 0.3s' }} />
            </div>
          </button>
        </div>
      </header>

      {/* mobile menu — must sit above header */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
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
                aria-label="Madarek home">
                <MadarekLogo className="h-8 md:h-10 w-auto" style={{ color: BRAND.paperHi }} />
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:#27C4FF]"
                style={{ color: BRAND.paperHi }}
                aria-label="Close menu">
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase">Close</span>
                <div className="flex flex-col gap-1">
                  <span className="block w-5 h-px" style={{ background: BRAND.paperHi, transform: 'rotate(45deg) translateY(2px)' }} />
                  <span className="block w-5 h-px" style={{ background: BRAND.paperHi, transform: 'rotate(-45deg) translateY(-2px)' }} />
                </div>
              </button>
            </div>

            {/* nav links — vertically centred in the remaining space */}
            <div className="flex-1 flex flex-col items-start justify-center px-6 md:px-12 gap-4">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                  <Link
                    to={l.to}
                    style={{
                      fontFamily: 'Fraunces, serif',
                      fontWeight: 200,
                      fontStyle: 'italic',
                      fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                      color: BRAND.paperHi,
                      lineHeight: 1,
                    }}>
                    {l.label}.
                  </Link>
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
              A community of schools across the Gulf, dedicated to academic
              excellence, the whole child, and lasting educational impact.
            </div>
          </div>

          <div className="col-span-6 md:col-span-3 md:col-start-7">
            <Meta tone="paper">Explore</Meta>
            <ul className="mt-6 space-y-3">
              {[
                ['/', 'Home'],
                ['/about', 'About'],
                ['/about/leadership', 'Leadership'],
                ['/schools', 'Schools'],
                ['/foundation', 'Foundation'],
                ['/academy', 'Academy'],
                ['/news', 'News'],
                ['/careers', 'Careers'],
                ['/contact', 'Contact'],
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
            <Meta tone="paper">Get in touch</Meta>
            <ul className="mt-6 space-y-3">
              <li>
                <a href="mailto:info@madarek.me"
                   style={{ color: withOpacity('paper', 0.8), fontWeight: 300, fontSize: 15 }}
                   className="hover:text-white">info@madarek.me</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/madarek" target="_blank" rel="noopener noreferrer"
                   style={{ color: withOpacity('paper', 0.8), fontWeight: 300, fontSize: 15 }}
                   className="hover:text-white">LinkedIn</a>
              </li>
              <li>
                <a href="https://www.instagram.com/madarek" target="_blank" rel="noopener noreferrer"
                   style={{ color: withOpacity('paper', 0.8), fontWeight: 300, fontSize: 15 }}
                   className="hover:text-white">Instagram</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-start md:items-center gap-3" style={{ borderColor: withOpacity('paper', 0.12) }}>
          <span style={{ color: withOpacity('paper', 0.55), fontSize: 13, fontWeight: 300 }}>
            © {new Date().getFullYear()} Madarek Education · Doha, Qatar
          </span>
          <div className="flex gap-6">
            <Link to="/privacy" style={{ color: withOpacity('paper', 0.55), fontSize: 13, fontWeight: 300 }} className="hover:text-white">Privacy</Link>
            <Link to="/terms"   style={{ color: withOpacity('paper', 0.55), fontSize: 13, fontWeight: 300 }} className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── stub page for /privacy and /terms ───────────────────── */
function StubPage({ title }: { title: string }) {
  return (
    <Section bg="paper" className="min-h-screen flex items-center justify-center pt-48 pb-32">
      <Container max="5xl" className="text-center">
        <Meta>Placeholder</Meta>
        <div className="mt-6">
          <Display size="lg" italic>{title}.</Display>
        </div>
        <div className="mt-8">
          <Body size="lg" muted>
            This page exists in the structure but isn't a redesign focus area.
          </Body>
        </div>
      </Container>
    </Section>
  );
}

/* ── 404 — real not-found, not a silent redirect ───────────── */
function NotFoundPage() {
  return (
    <Section bg="ink" className="min-h-screen flex items-center justify-center pt-48 pb-32">
      <Container max="5xl" className="text-center">
        <Meta tone="paper">404</Meta>
        <div className="mt-8">
          <Display size="xl" italic style={{ color: BRAND.paperHi }}>
            Page not found.
          </Display>
        </div>
        <div className="mt-8 max-w-xl mx-auto">
          <Body size="lg" style={{ color: withOpacity('paper', 0.78) }}>
            The page you're looking for isn't here — it may have moved, or the
            link may be out of date.
          </Body>
        </div>
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8">
          <PillLink to="/" variant="invert" size="md">Back to home</PillLink>
          <Link
            to="/schools"
            className="transition-colors text-[15px] font-light border-b pb-1"
            style={{ color: withOpacity('paper', 0.8), borderColor: withOpacity('paper', 0.4) }}>
            Explore the schools →
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

  return (
    <DensityCtx.Provider value={density}>
      <Header />
      <main>
        <Routes location={shownLocation}>
          <Route path="/"                   element={<HomePage schools={schools} />} />
          <Route path="/about"                    element={<AboutPage />} />
          <Route path="/about/leadership"         element={<LeadershipPage />} />
          <Route path="/about/leadership/:slug"   element={<LeaderDetailRoute />} />
          <Route path="/schools"            element={<SchoolsPage schools={schools} />} />
          <Route path="/schools/:slug"      element={<SchoolDetailRoute />} />
          <Route path="/foundation"         element={<FoundationPage />} />
          <Route path="/academy"            element={<AcademyPage />} />
          <Route path="/news"               element={<NewsPage />} />
          <Route path="/careers"            element={<CareersPage />} />
          <Route path="/contact"            element={<ContactPage />} />
          <Route path="/privacy"            element={<StubPage title="Privacy" />} />
          <Route path="/terms"              element={<StubPage title="Terms" />} />
          <Route path="*"                   element={<NotFoundPage />} />
        </Routes>
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
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
