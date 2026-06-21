/* Madarek redesign — Home
   --------------------------------------------------------------
   Eight sections stack vertically; each follows the layout law:
   photography goes full-bleed alone, text stacks beneath it,
   no side-by-side. */

import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  BRAND, useDensity, withOpacity,
  FoldedMark, Eyebrow, SectionNumber,
  Display, Body, Meta,
  Section, Container,
  ScrollImage, ScrollMarquee,
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
      <div className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 pt-32 md:pt-36 flex items-center justify-between text-[#F4EDE0]/85">
        <Meta tone="paper">Madarek · Education · GCC</Meta>
        <Meta tone="paper">Est. 2023 · Doha</Meta>
      </div>

      {/* main type */}
      <motion.div
        style={{ y: titleY, opacity: titleO }}
        className="absolute inset-0 z-10 flex flex-col justify-end px-6 md:px-12 pb-24 md:pb-32">
        <div className="max-w-[1400px]">
          <Display size="lg" style={{ color: BRAND.paperHi, fontWeight: 200 }}>
            <span style={{ display: 'block' }}>We educate</span>
            <span style={{ display: 'block', fontStyle: 'italic', color: BRAND.paperHi }}>
              for what comes next.
            </span>
          </Display>

          <div className="mt-10 flex flex-wrap items-center gap-8">
            <PillLink to="#schools" variant="invert">Explore our schools</PillLink>
            <a href="#about" className="text-[#F4EDE0]/80 hover:text-[#F4EDE0] transition-colors text-[15px] font-light border-b border-white/40 hover:border-white pb-1">
              Discover Madarek →
            </a>
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
              <div className="mt-3"><Eyebrow tone="ink">About Madarek</Eyebrow></div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <Display size="lg" italic={false}>
                A community of schools
                <span style={{ fontStyle: 'italic', color: BRAND.inkSub }}> across the Gulf.</span>
              </Display>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-12 gap-6 mt-24">
            <div className="col-span-12 md:col-span-3 md:col-start-4">
              <Meta>The work</Meta>
            </div>
            <div className="col-span-12 md:col-span-6">
              <Body size="xl" muted={false}>
                Madarek operates premium schools in Dubai and Riyadh, with one
                shared standard: rigour, care, and cultural fluency. We invest
                patiently. We build for decades, not quarters. And we measure
                ourselves by student outcomes long before financial ones.
              </Body>
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

/* ── 03 · The Framework — interactive expandable pillars */
type Pillar = { tone: BrandKey; title: string; lede: string; detail: string; meta: string[] };

function FrameworkSection() {
  const [active, setActive] = useState(0);
  const d = useDensity();

  const pillars: Pillar[] = [
    {
      tone: 'red',
      title: 'Academic Excellence',
      lede: 'Rigorous international curricula taught by world-class educators.',
      detail:
        'IB, American Common Core, and IB-PYP framework programmes. 98% acceptance to top global universities. Average class size of 18 students. Continuous teacher development through MADAREK Academy.',
      meta: ['IB World School', 'KHDA / MOE / Cognia accredited', 'Pre-K to Grade 12'],
    },
    {
      tone: 'lime',
      title: 'Whole Child Development',
      lede: 'Beyond academics — character, creativity, and social-emotional growth.',
      detail:
        'Counselling, arts, athletics, leadership programmes and community service. Wellbeing curriculum integrated from Kindergarten through Grade 12. Family partnerships at the centre.',
      meta: ['Counsellors on every campus', 'Arts & athletics K–12', 'Family programmes'],
    },
    {
      tone: 'cyan',
      title: 'Cultural Fluency',
      lede: 'Rooted in the Gulf, fluent across many cultures.',
      detail:
        'Bilingual instruction in English and Arabic. Active engagement with regional heritage, language, and Islamic studies. Students from more than 40 nationalities sit beside students from the neighbourhood.',
      meta: ['EN / AR bilingual', '40+ nationalities', 'Islamic & heritage studies'],
    },
    {
      tone: 'yellow',
      title: 'Future-Ready Skills',
      lede: 'Digital literacy, entrepreneurship, sustainability, adaptability.',
      detail:
        'STEM and maker spaces in every campus. Industry partnerships and internship pathways for upper years. Sustainability integrated into the curriculum and the facilities themselves.',
      meta: ['Maker spaces K–12', 'Industry partners', 'Sustainability programme'],
    },
  ];

  return (
    <Section id="framework" bg="paperLo" className={d.sectionY}>
      <Container>
        <Reveal>
          <div className="grid grid-cols-12 gap-6 mb-24">
            <div className="col-span-12 md:col-span-3">
              <SectionNumber n={2} tone="ink" />
              <div className="mt-3"><Eyebrow>The Madarek Framework</Eyebrow></div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <Display size="lg">
                <span>Four pillars.</span>
                <span style={{ display: 'block', fontStyle: 'italic', color: BRAND.inkSub }}>One direction.</span>
              </Display>
            </div>
          </div>
        </Reveal>

        <div className="border-t" style={{ borderColor: BRAND.rule }}>
          {pillars.map((p, i) => {
            const isOpen = active === i;
            return (
              <div
                key={p.title}
                className="border-b transition-colors"
                style={{ borderColor: BRAND.rule, background: isOpen ? BRAND.paper : 'transparent' }}>
                <button
                  type="button"
                  onClick={() => setActive(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="w-full text-left py-10 md:py-14 px-2 md:px-6 grid grid-cols-12 gap-6 items-baseline group">
                  <div className="col-span-2 md:col-span-1 flex items-center gap-4">
                    <span
                      className="font-mono tabular-nums"
                      style={{ fontSize: 13, letterSpacing: '0.18em', color: BRAND[p.tone], fontWeight: 600 }}>
                      0{i + 1}
                    </span>
                  </div>
                  <div className="col-span-10 md:col-span-7">
                    <Display
                      size={isOpen ? 'md' : 'sm'}
                      italic={isOpen}
                      style={{
                        color: BRAND.ink,
                        transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
                      }}>
                      {p.title}
                    </Display>
                  </div>
                  <div className="col-span-12 md:col-span-3 hidden md:block">
                    <Body size="sm" muted>{p.lede}</Body>
                  </div>
                  <div className="col-span-12 md:col-span-1 flex md:justify-end">
                    <FoldedMark size={isOpen ? 56 : 36} tone={p.tone} tilt={isOpen ? 'active' : 'rest'} />
                  </div>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}>
                  <div className="px-2 md:px-6 pb-14 grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-7 md:col-start-2">
                      <Body size="lg">{p.detail}</Body>
                    </div>
                    <div className="col-span-12 md:col-span-3 md:col-start-9 flex flex-col gap-3 pt-2">
                      {p.meta.map((m) => (
                        <div key={m} className="flex items-center gap-3">
                          <span className="block w-2 h-2" style={{ background: BRAND[p.tone] }} />
                          <Body size="sm" muted>{m}</Body>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
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
              <Display size="lg" style={{ color: BRAND.paperHi }} italic={false}>
                where every student is
                <span style={{ fontStyle: 'italic' }}> known.</span>
              </Display>
            </div>
          </div>
        </div>
      </div>

      <div className="relative py-12 md:py-16 overflow-hidden" style={{ background: BRAND.paper }}>
        <ScrollMarquee tone="ink" size="md" italic>
          rigour · care · cultural fluency · rigour · care · cultural fluency ·&nbsp;
        </ScrollMarquee>
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
              Three campuses,{' '}
              <span style={{ fontStyle: 'italic', color: withOpacity('paper', 0.55) }}>and a region in the making.</span>
            </Display>
          </div>
        </Reveal>

        <Reveal>
          <SchoolsMosaic schools={schools} />
        </Reveal>
      </Container>
    </Section>
  );
}

function SchoolsMosaic({ schools }: { schools: School[] }) {
  const [hero, ...rest] = schools;
  const right = rest.slice(0, 2);
  if (!hero) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-3 md:gap-4 md:h-[82vh] md:min-h-[600px]">
      <MosaicTile school={hero} hero className="md:row-span-2 aspect-[4/5] md:aspect-auto md:h-full" />
      {right.map((s) => (
        <MosaicTile key={s.slug} school={s} className="aspect-[16/10] md:aspect-auto md:h-full" />
      ))}
    </div>
  );
}

function MosaicTile({ school, className = '', hero = false }: { school: School; className?: string; hero?: boolean }) {
  return (
    <Link
      to={`/schools/${school.slug}`}
      className={`group relative overflow-hidden block focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[color:#27C4FF] ${className}`}
      style={{ background: BRAND.navy }}>
      <img
        src={school.image}
        alt={school.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,12,28,0.88) 0%, rgba(10,12,28,0.3) 40%, rgba(10,12,28,0) 65%)' }} />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'rgba(10,12,28,0.28)' }} />

      <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
        <h3 style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, color: BRAND.paperHi, lineHeight: 1.08, letterSpacing: '-0.01em', fontSize: hero ? 'clamp(1.9rem, 3.4vw, 3rem)' : 'clamp(1.3rem, 2vw, 1.85rem)' }}>
          {school.short}
        </h3>
        <div className="mt-2 font-mono uppercase" style={{ fontSize: 11, letterSpacing: '0.16em', color: withOpacity('paper', 0.72) }}>
          {school.location}
        </div>

        {/* hover-reveal details */}
        <div className="overflow-hidden max-h-0 opacity-0 -translate-y-1 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100 group-hover:translate-y-0">
          <div className="mt-4 font-mono uppercase" style={{ fontSize: 10.5, letterSpacing: '0.14em', color: withOpacity('paper', 0.6) }}>
            {school.curriculum} · {school.ages}
          </div>
          <div className="mt-3 inline-flex items-center gap-2 text-[12px] tracking-[0.14em] uppercase font-medium" style={{ color: BRAND.paperHi }}>
            <span className="border-b pb-0.5" style={{ borderColor: withOpacity('paper', 0.5) }}>View campus</span>
            <span style={{ color: BRAND.cyan }}>→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ── 06 · Innovation — numbered editorial list, type-only. */
function InnovationSection() {
  const items = [
    { title: 'Curriculum innovation',   note: 'Evolving programmes integrating emerging fields and pedagogical research.' },
    { title: 'EdTech, considered',      note: 'Technology used to enhance learning, not replace human connection.' },
    { title: 'Strategic partnerships',  note: 'Collaborations with leading universities, cultural institutions, and industry.' },
    { title: 'Research & development',  note: 'Investing in educational research to improve teaching practices and outcomes.' },
  ];
  const d = useDensity();
  return (
    <Section id="innovation" bg="paperHi" className={d.sectionY}>
      <Container max="6xl">
        <Reveal>
          <div className="mb-24">
            <SectionNumber n={4} tone="yellow" />
            <div className="mt-3 mb-8"><Eyebrow tone="yellow">Innovation</Eyebrow></div>
            <Display size="lg">
              Pioneering the next
              <span style={{ display: 'block', fontStyle: 'italic', color: BRAND.inkSub }}>generation of learning.</span>
            </Display>
          </div>
        </Reveal>

        <div className="border-t" style={{ borderColor: BRAND.rule }}>
          {items.map((it, i) => (
            <div key={it.title} className="border-b py-10 md:py-14 grid grid-cols-12 gap-6 items-baseline" style={{ borderColor: BRAND.rule }}>
              <div className="col-span-2 md:col-span-1">
                <span className="font-mono tabular-nums" style={{ fontSize: 13, letterSpacing: '0.18em', color: BRAND.yellow, fontWeight: 600 }}>
                  0{i + 1}
                </span>
              </div>
              <div className="col-span-10 md:col-span-6">
                <Display size="sm">{it.title}</Display>
              </div>
              <div className="col-span-12 md:col-span-5">
                <Body size="md" muted>{it.note}</Body>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ── 07 · Foundation — full-bleed photo + paragraph below. */
function FoundationSection() {
  return (
    <section id="foundation" className="relative w-full" data-screen-label="07 Foundation" style={{ background: BRAND.paper }}>
      <div className="relative h-[85vh] w-full overflow-hidden">
        <ScrollImage src="/redesign-assets/transformation.webp" alt="" overlay="hero" />
        <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 md:px-12 pb-16">
          <div className="flex items-center gap-3 mb-6">
            <FoldedMark size={36} tone="pink" tilt="back" />
            <Meta tone="paper">Madarek Foundation</Meta>
          </div>
          <Display size="lg" style={{ color: BRAND.paperHi }}>
            <span>Building futures</span>
            <span style={{ display: 'block', fontStyle: 'italic' }}>beyond the classroom.</span>
          </Display>
        </div>
      </div>

      <Container max="6xl" className="py-24 md:py-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <SectionNumber n={5} tone="pink" />
          </div>
          <div className="col-span-12 md:col-span-9">
            <Body size="xl" muted={false}>
              The Madarek Foundation extends our commitment to educational
              excellence into the wider community — scholarships, teacher
              development, community outreach, and educational research that
              ripple out from our schools to the cities they sit in.
            </Body>
            <div className="mt-12">
              <TextLink to="/foundation" tone="pink">Explore the Foundation</TextLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ── 08 · Academy — yellow-coded, photo grid below copy. */
function AcademySection() {
  const d = useDensity();
  return (
    <Section id="academy" bg="paperLo" className={d.sectionY}>
      <Container>
        <Reveal>
          <div className="grid grid-cols-12 gap-6 mb-20">
            <div className="col-span-12 md:col-span-3">
              <SectionNumber n={6} tone="yellow" />
              <div className="mt-3"><Eyebrow tone="yellow">Madarek Academy</Eyebrow></div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <Display size="lg">
                Investing in
                <span style={{ display: 'block', fontStyle: 'italic', color: BRAND.inkSub }}>educator excellence.</span>
              </Display>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {['3.webp', '4.webp', '5.webp'].map((src, i) => (
            <div key={src} className="relative aspect-[4/5] overflow-hidden" style={{ marginTop: i === 1 ? '4rem' : 0 }}>
              <ScrollImage src={`/redesign-assets/${src}`} alt="" overlay="editorial" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-6 md:col-start-4">
            <Body size="xl">
              Madarek Academy is our professional development hub — world-class
              training, certification, and leadership pathways for educators
              across our schools and the wider GCC education community.
            </Body>
            <div className="mt-10">
              <TextLink to="/academy" tone="yellow">Inside the Academy</TextLink>
            </div>
          </div>
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
              <SectionNumber n={7} tone="cyan" />
              <div className="mt-3"><Eyebrow tone="cyan">Get in touch</Eyebrow></div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <Display size="lg">
                Let's start<span style={{ fontStyle: 'italic', color: BRAND.inkSub }}> a conversation.</span>
              </Display>
              <div className="mt-12 max-w-2xl">
                <Body size="lg" muted>
                  Whether you're a parent exploring schools, an educator
                  joining the work, or a partner looking to collaborate —
                  we'd love to hear from you.
                </Body>
              </div>
              <div className="mt-12 flex flex-wrap items-center gap-8">
                <PillLink to="/contact" variant="primary" size="md">Contact Madarek</PillLink>
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
      <InnovationSection />
      <FoundationSection />
      <AcademySection />
      <ContactSection />
    </>
  );
}
