/* Madarek redesign — Home
   --------------------------------------------------------------
   Eight sections stack vertically; each follows the layout law:
   photography goes full-bleed alone, text stacks beneath it,
   no side-by-side. */

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
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
import type { School } from './data';

/* ── 01 · Hero ─────────────────────────────────────────────── */
function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 1.08]);
  const titleY  = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -80]);
  const titleO  = useTransform(scrollYProgress, [0, 0.7], reduced ? [1, 1] : [1, 0]);

  return (
    <section ref={ref} className="relative w-full h-screen overflow-hidden bg-black" data-screen-label="01 Hero">
      <motion.div
        style={{ scale: imgScale }}
        className="absolute inset-0 will-change-transform"
        aria-hidden="true">
        <img src="/redesign-assets/institutionalization.webp" alt="" className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(20,17,15,0.72) 0%, rgba(20,17,15,0.5) 35%, rgba(20,17,15,0.78) 75%, rgba(20,17,15,0.95) 100%)',
          }} />
      </motion.div>

      {/* top brand bar */}
      <div className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 pt-32 md:pt-36 text-[#F4EDE0]/85">
        <Meta tone="paper">MADAREK · Education across the GCC · Est. 2026</Meta>
      </div>

      {/* main type */}
      <motion.div
        style={{ y: titleY, opacity: titleO }}
        className="absolute inset-0 z-10 flex flex-col justify-end px-6 md:px-12 pb-24 md:pb-32">
        <div className="max-w-[1400px]">
          <Display size="lg" style={{ color: BRAND.paperHi, fontWeight: 300 }}>
            <span style={{ display: 'block' }}>Shaping the future</span>
            <span style={{ display: 'block', fontStyle: 'normal', color: BRAND.paperHi }}>
              of learning.
            </span>
          </Display>

          <div className="mt-8 max-w-xl">
            <Body size="lg" style={{ color: withOpacity('paper', 0.85) }}>
              A growing network of international schools across the GCC.
            </Body>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-8">
            <PillLink to="#schools" variant="invert">Explore our schools</PillLink>
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
        <Meta tone="paper">Scroll</Meta>
      </div>
    </section>
  );
}

/* ── 02 · About — typographic statement only. */
function AboutSection() {
  const d = useDensity();
  return (
    <Section id="about" bg="paper" className={`${d.sectionY}`}>
      <Container>
        <Reveal>
          <div className="grid grid-cols-12 gap-6 mb-16">
            <div className="col-span-12 md:col-span-3">
              <SectionNumber n={1} tone="ink" />
              <div className="mt-3"><Eyebrow tone="ink">About MADAREK</Eyebrow></div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <Display size="lg" italic={false}>
                A regional education
                <span style={{ fontStyle: 'normal', color: BRAND.inkSub }}> platform.</span>
              </Display>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-12 gap-6 mt-24">
            <div className="col-span-12 md:col-span-3 md:col-start-4">
              <Meta>Introduction</Meta>
            </div>
            <div className="col-span-12 md:col-span-6">
              <Body size="xl" muted={false}>
                MADAREK is a growing network of schools across the GCC, united by
                one commitment: academic excellence and the full development of
                every student.
              </Body>
              <div className="mt-6">
                <Body size="xl" muted={false}>
                  Through internationally recognised curricula and modern learning
                  environments, we help students thrive — and contribute to the
                  communities we serve.
                </Body>
              </div>
              <div className="mt-12">
                <TextLink to="/about" tone="ink">Read the full story</TextLink>
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
  const d = useDensity();

  const pillars: { tone: BrandKey; title: string; tagline: string; tags: string[] }[] = [
    { tone: 'red',    title: 'Educational Excellence', tagline: 'High-quality learning that develops the whole student.', tags: ['Academic achievement', 'Critical thinking', 'Holistic development'] },
    { tone: 'yellow', title: 'Innovation',             tagline: 'Future-ready environments built on creativity and technology.', tags: ['Technology', 'Creativity', 'New approaches'] },
    { tone: 'cyan',   title: 'Regional Growth',        tagline: 'A leading education ecosystem across the GCC and beyond.', tags: ['Strategic expansion', 'Partnerships', 'GCC & beyond'] },
    { tone: 'lime',   title: 'Lasting Impact',         tagline: 'Positive, sustainable outcomes for generations to come.', tags: ['Students & educators', 'Communities', 'Future generations'] },
  ];

  return (
    <Section id="framework" bg="paperLo" className={d.sectionY}>
      <Container>
        <Reveal>
          <div className="grid grid-cols-12 gap-6 mb-16">
            <div className="col-span-12 md:col-span-3">
              <SectionNumber n={2} tone="ink" />
              <div className="mt-3"><Eyebrow>Our Four Pillars</Eyebrow></div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <Display size="lg">
                <span>Four pillars.</span>
                <span style={{ display: 'block', color: BRAND.inkSub }}>One direction.</span>
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
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-block rounded-full px-3 py-1"
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: '0.04em', color: BRAND.inkSub, background: BRAND.paperHi, border: `1px solid ${BRAND.rule}` }}>
                      {t}
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
  return (
    <section className="relative w-full" data-screen-label="04 Cinematic moment">
      <div className="relative h-screen w-full overflow-hidden">
        <ScrollImage
          src="/redesign-assets/2.webp"
          alt=""
          overlay="cinematic"
          priority />
        <div className="absolute inset-0 z-10 flex items-end px-6 md:px-12 pb-16">
          <div className="max-w-3xl">
            <Eyebrow tone="cyan" className="text-[#F4EDE0]/80">A school is a place</Eyebrow>
            <div className="mt-6">
              <Display size="md" style={{ color: BRAND.paperHi }} italic={false}>
                Where every student is
                <span style={{ fontStyle: 'normal' }}> known.</span>
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
  const d = useDensity();
  return (
    <Section id="schools" bg="navy" className={d.sectionY}>
      <Container>
        <Reveal>
          <div className="mb-12 md:mb-16">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-8 md:mb-10">
              <div>
                <SectionNumber n={3} tone="cyan" />
                <div className="mt-3"><Eyebrow tone="cyan">Our Schools</Eyebrow></div>
              </div>
              <Link
                to="/schools"
                className="group inline-flex items-baseline gap-2 border-b pb-1 transition-colors"
                style={{ color: BRAND.paperHi, borderColor: withOpacity('paper', 0.5), fontFamily: 'Inter, sans-serif', fontSize: 15 }}>
                All schools
                <span className="transition-transform group-hover:translate-x-1" style={{ color: BRAND.cyan }}>→</span>
              </Link>
            </div>
            <Display style={{ color: BRAND.paperHi, fontSize: 'clamp(1.85rem, 4vw, 3.4rem)' }}>
              {schools.length} campuses today,{' '}
              <span style={{ color: withOpacity('paper', 0.55) }}>and a region in the making.</span>
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

/* Horizontal snap carousel — scales to any number of campuses. Arrow
   controls, drag/scroll, and a progress bar; a closing card signals the
   network is still growing. */
function SchoolsCarousel({ schools }: { schools: School[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 1);
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
  };

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scrollByCards = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    const amount = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  const arrowCls = 'grid place-items-center h-11 w-11 rounded-full border transition-colors hover:bg-[#F4EDE0] hover:text-[#0A0E1C] disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27C4FF]';

  return (
    <div>
      {/* controls */}
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: '0.18em', color: withOpacity('paper', 0.6) }}>
          Drag to explore · {String(schools.length).padStart(2, '0')} campuses
        </span>
        <div className="flex gap-3">
          <button type="button" onClick={() => scrollByCards(-1)} disabled={atStart} aria-label="Previous campuses"
            className={arrowCls} style={{ borderColor: withOpacity('paper', 0.35), color: BRAND.paperHi }}>
            <span className="-mt-0.5 text-lg">←</span>
          </button>
          <button type="button" onClick={() => scrollByCards(1)} disabled={atEnd} aria-label="More campuses"
            className={arrowCls} style={{ borderColor: withOpacity('paper', 0.35), color: BRAND.paperHi }}>
            <span className="-mt-0.5 text-lg">→</span>
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={update}
        role="group"
        aria-label="Campuses"
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

function CarouselCard({ school, index }: { school: School; index: number }) {
  return (
    <Link
      data-card
      to={`/schools/${school.slug}`}
      className={`group relative ${CARD_W} snap-start overflow-hidden rounded-xl focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[color:#27C4FF]`}
      style={{ background: BRAND.navy }}>
      <div className="relative aspect-[3/4]">
        <img
          src={school.image}
          alt={school.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,12,28,0.9) 0%, rgba(10,12,28,0.3) 45%, rgba(10,12,28,0) 70%)' }} />
        <div className="absolute top-5 left-5">
          <span className="font-mono tabular-nums px-2 py-1" style={{ fontSize: 10.5, letterSpacing: '0.18em', color: BRAND.paperHi, background: 'rgba(10,12,28,0.45)', backdropFilter: 'blur(6px)' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6">
          <div className="font-mono uppercase mb-2" style={{ fontSize: 11, letterSpacing: '0.16em', color: withOpacity('paper', 0.72) }}>
            {school.location}
          </div>
          <h3 style={{ fontFamily: 'Plus Jakarta Sans, Inter, ui-sans-serif, sans-serif', fontWeight: 400, color: BRAND.paperHi, lineHeight: 1.1, letterSpacing: '-0.01em', fontSize: 'clamp(1.5rem, 2.2vw, 2rem)' }}>
            {school.short}
          </h3>
          <div className="overflow-hidden max-h-0 opacity-0 -translate-y-1 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100 group-hover:translate-y-0">
            <div className="mt-3 font-mono uppercase" style={{ fontSize: 10.5, letterSpacing: '0.14em', color: withOpacity('paper', 0.62) }}>
              {school.curriculum}{school.grades ? ` · ${school.grades}` : ''} · Ages {school.ages}
            </div>
            <div className="mt-3 inline-flex items-center gap-2 text-[12px] tracking-[0.14em] uppercase font-medium" style={{ color: BRAND.paperHi }}>
              <span className="border-b pb-0.5" style={{ borderColor: withOpacity('paper', 0.5) }}>View campus</span>
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
  return (
    <Link
      to="/schools"
      aria-label="More campuses joining the network"
      className={`group relative ${CARD_W} snap-start rounded-xl focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[color:#27C4FF]`}>
      <div
        className="relative aspect-[3/4] flex flex-col items-center justify-center text-center px-8 rounded-xl border border-dashed transition-colors group-hover:border-[color:#27C4FF]"
        style={{ borderColor: withOpacity('paper', 0.25) }}>
        <FoldedMark size={44} tone="cyan" tilt="lean" />
        <div className="mt-6" style={{ fontFamily: 'Plus Jakarta Sans, Inter, ui-sans-serif, sans-serif', fontWeight: 300, color: BRAND.paperHi, fontSize: 'clamp(1.4rem, 2vw, 1.8rem)', lineHeight: 1.15 }}>
          More campuses joining the network
        </div>
        <div className="mt-5 inline-flex items-center gap-2 text-[12px] tracking-[0.14em] uppercase font-medium" style={{ color: BRAND.paperHi }}>
          <span className="border-b pb-0.5" style={{ borderColor: withOpacity('paper', 0.5) }}>Explore all</span>
          <span style={{ color: BRAND.cyan }}>→</span>
        </div>
      </div>
    </Link>
  );
}

/* ── 06 · Foundation + Academy — two tight one-liners side by side,
   each linking to its full page. */
function FoundationAcademySection() {
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
                <Eyebrow tone="pink">MADAREK Foundation</Eyebrow>
              </div>
              <h3 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: 'clamp(1.7rem, 2.8vw, 2.6rem)', lineHeight: 1.12, letterSpacing: '-0.02em', color: BRAND.ink }}>
                Lasting impact beyond the classroom.
              </h3>
              <div className="mt-5 max-w-md">
                <Body size="md" muted>
                  Empowering communities and expanding opportunities through
                  education.
                </Body>
              </div>
              <div className="mt-8"><TextLink to="/foundation" tone="pink">Explore the Foundation</TextLink></div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="h-full p-10 md:p-14" style={{ background: BRAND.paper }}>
              <div className="flex items-center gap-3 mb-6">
                <FoldedMark size={32} tone="yellow" tilt="lean" />
                <Eyebrow tone="yellow">MADAREK Academy</Eyebrow>
              </div>
              <h3 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: 'clamp(1.7rem, 2.8vw, 2.6rem)', lineHeight: 1.12, letterSpacing: '-0.02em', color: BRAND.ink }}>
                Learning beyond the classroom.
              </h3>
              <div className="mt-5 max-w-md">
                <Body size="md" muted>
                  Enrichment, global experiences, and leadership programmes for
                  students.
                </Body>
              </div>
              <div className="mt-8"><TextLink to="/academy" tone="yellow">Inside the Academy</TextLink></div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ── 09 · Contact — large typographic close. Single primary CTA. */
function ContactSection() {
  const d = useDensity();
  return (
    <Section id="contact-cta" bg="white" className={d.sectionY}>
      <Container max="7xl">
        <Reveal>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <SectionNumber n={4} tone="cyan" />
              <div className="mt-3"><Eyebrow tone="cyan">Get in touch</Eyebrow></div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <Display size="lg">
                Let's shape the future<span style={{ fontStyle: 'normal', color: BRAND.inkSub }}> together.</span>
              </Display>
              <div className="mt-12 max-w-2xl">
                <Body size="lg" muted>
                  Whether you are a parent, educator, institution, or strategic
                  partner, we welcome the opportunity to connect and explore how
                  we can create meaningful educational experiences together.
                </Body>
              </div>
              <div className="mt-12 flex flex-wrap items-center gap-8">
                <PillLink to="/contact" variant="primary" size="md">Contact MADAREK</PillLink>
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
      <FoundationAcademySection />
      <ContactSection />
    </>
  );
}
