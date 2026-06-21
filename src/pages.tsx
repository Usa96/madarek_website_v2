/* Madarek redesign — secondary pages
   --------------------------------------------------------------
   About, Schools, Foundation, Academy, Contact, SchoolDetail.
   Each page shares the layout law: photography full-bleed alone,
   text breathes alone. Page-level colour codes the section. */

import { useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion';
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
    <section ref={ref} className="relative w-full h-screen overflow-hidden bg-black" data-screen-label="Hero">
      <motion.div style={reduced ? undefined : { y: imgY }} className="absolute inset-0 will-change-transform" aria-hidden="true">
        <img src={image} alt="" className="w-full h-full object-cover scale-110" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(20,17,15,0.55) 0%, rgba(20,17,15,0.3) 40%, rgba(20,17,15,0.65) 80%, rgba(20,17,15,0.92) 100%)',
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
          <Display size="lg" style={{ color: BRAND.paperHi }}>
            <span>{title}</span>
            {italicTail && (
              <span style={{ display: 'block', fontStyle: 'italic' }}>{italicTail}</span>
            )}
          </Display>
          {lede && (
            <div className="mt-8 max-w-2xl">
              <Body size="lg" style={{ color: withOpacity('paper', 0.85) }}>{lede}</Body>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── About page ────────────────────────────────────────────── */
export function AboutPage() {
  const d = useDensity();

  const values: { tone: BrandKey; title: string; detail: string }[] = [
    { tone: 'red',    title: 'Excellence',     detail: 'Striving for the highest standards in curriculum, teaching, and student support.' },
    { tone: 'yellow', title: 'Innovation',     detail: 'Embracing forward-thinking approaches to learning.' },
    { tone: 'cyan',   title: 'Inclusivity',    detail: 'Creating welcoming communities for every student.' },
    { tone: 'lime',   title: 'Sustainability', detail: 'Designing schools with environmental responsibility in mind.' },
  ];

  return (
    <>
      <PageHero
        image="/redesign-assets/institutionalization.webp"
        eyebrow="About Madarek"
        title="A network of schools,"
        italicTail="one shared standard."
        lede="We operate premium schools in Dubai and Riyadh, each with its own identity, all bound by a single standard for what good education feels like."
        tone="ink" />

      {/* Story */}
      <Section bg="paper" className={d.sectionY}>
        <Container max="6xl">
          <Reveal>
            <div className="grid grid-cols-12 gap-6 mb-20">
              <div className="col-span-12 md:col-span-3">
                <SectionNumber n={1} tone="ink" />
                <div className="mt-3"><Eyebrow>Our story</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Display size="lg">
                  <span>Schools,</span>
                  <span style={{ display: 'block', fontStyle: 'italic', color: BRAND.inkSub }}>not assets.</span>
                </Display>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-12 gap-6 mt-16">
              <div className="col-span-12 md:col-span-6 md:col-start-4">
                <Body size="xl">
                  Madarek was formed to bring together a small, deliberate group
                  of schools across the Gulf. We invest patiently. We build for
                  decades, not quarters. And we measure ourselves by student
                  outcomes long before financial ones.
                </Body>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Values */}
      <Section bg="paperLo" className={d.sectionY}>
        <Container>
          <Reveal>
            <div className="grid grid-cols-12 gap-6 mb-20 items-end">
              <div className="col-span-12 md:col-span-3">
                <SectionNumber n={2} tone="ink" />
                <div className="mt-3"><Eyebrow>Our values</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Display size="lg">What we stand for.</Display>
              </div>
            </div>
          </Reveal>

          <div className="border-t" style={{ borderColor: BRAND.rule }}>
            {values.map((v, i) => (
              <div key={v.title} className="border-b py-12 md:py-16 grid grid-cols-12 gap-6 items-baseline" style={{ borderColor: BRAND.rule }}>
                <div className="col-span-2 md:col-span-1">
                  <FoldedMark size={28} tone={v.tone} rotate={-8 + i * 6} />
                </div>
                <div className="col-span-10 md:col-span-6">
                  <Display size="sm" italic={false} style={{ color: BRAND.ink }}>{v.title}</Display>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <Body size="md" muted>{v.detail}</Body>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Mid-page cinematic moment */}
      <section className="relative w-full h-[80vh] overflow-hidden bg-black">
        <ScrollImage src="/redesign-assets/7.webp" alt="" overlay="hero" />
        <div className="absolute inset-0 z-10 flex items-end px-6 md:px-12 pb-16">
          <div className="max-w-3xl">
            <Display size="lg" style={{ color: BRAND.paperHi }}>
              We build for
              <span style={{ fontStyle: 'italic' }}> decades, not quarters.</span>
            </Display>
          </div>
        </div>
      </section>

      {/* Governance / Principles */}
      <Section bg="paper" className={d.sectionY}>
        <Container max="6xl">
          <Reveal>
            <div className="grid grid-cols-12 gap-6 mb-20">
              <div className="col-span-12 md:col-span-3">
                <SectionNumber n={3} tone="ink" />
                <div className="mt-3"><Eyebrow>Governance</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Display size="lg">How we operate.</Display>
              </div>
            </div>
          </Reveal>

          {[
            { title: 'Responsible investing',   body: 'Environmental, social, and governance considerations sit inside every operating decision — not alongside them.' },
            { title: 'Prudent compliance',      body: "A solid governance framework that mitigates risk and protects the schools' long-term independence." },
            { title: 'Leadership in education', body: 'Convening educators and partners across the GCC to advance what excellent schooling looks like in the region.' },
          ].map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="grid grid-cols-12 gap-6 py-10 border-b items-baseline" style={{ borderColor: BRAND.rule }}>
                <div className="col-span-12 md:col-span-5">
                  <Display size="sm" className="break-words" style={{ fontWeight: 300 }}>{p.title}</Display>
                </div>
                <div className="col-span-12 md:col-span-6 md:col-start-7">
                  <Body size="lg" muted>{p.body}</Body>
                </div>
              </div>
            </Reveal>
          ))}
        </Container>
      </Section>

      {/* Leadership CTA */}
      <Section bg="ink" className="py-24 md:py-32">
        <Container max="6xl">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8">
              <Eyebrow tone="paper">Leadership</Eyebrow>
              <div className="mt-6">
                <Display size="md" style={{ color: BRAND.paperHi }}>
                  Meet the people<span style={{ fontStyle: 'italic' }}> guiding the work.</span>
                </Display>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 md:text-right">
              <PillLink to="/about/leadership" variant="invert">View leadership</PillLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

/* ── Schools page ──────────────────────────────────────────── */
export function SchoolsPage({ schools }: { schools: School[] }) {
  const d = useDensity();
  return (
    <>
      <PageHero
        image="/redesign-assets/1.webp"
        eyebrow="Our Schools"
        title="Three campuses,"
        italicTail="more on the way."
        lede="We operate premium schools across the Gulf. Each campus carries its own character; all share the Madarek framework."
        tone="cyan" />

      <Section bg="paper" className={d.sectionY}>
        <Container>
          <Reveal>
            <div className="grid grid-cols-12 gap-6 mb-20">
              <div className="col-span-12 md:col-span-3">
                <SectionNumber n={1} tone="cyan" />
                <div className="mt-3"><Eyebrow tone="cyan">The network</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Display size="lg">Where we operate.</Display>
              </div>
            </div>
          </Reveal>

          <NetworkMap schools={schools} />
        </Container>
      </Section>

      {schools.map((s, i) => (
        <SchoolParallax key={s.slug} school={s} index={i + 1} reversed={i % 2 === 1} />
      ))}

      <Section bg="paperLo" className="py-28">
        <Container max="6xl">
          <div className="grid grid-cols-12 gap-6 items-center">
            <div className="col-span-12 md:col-span-3">
              <FoldedMark size={48} tone="cyan" />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Display size="md">
                More campuses<span style={{ fontStyle: 'italic' }}> joining the network.</span>
              </Display>
              <div className="mt-6">
                <Body size="md" muted>
                  Each new school inherits the Madarek framework, the
                  governance, and the academy. We add carefully.
                </Body>
              </div>
            </div>
            <div className="col-span-12 md:col-span-3 md:text-right">
              <Meta>Future schools</Meta>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

/* World countries TopoJSON, served from a stable CDN — used by
   react-simple-maps to draw real country boundaries. */
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  Dubai:  { lat: 25.276, lng: 55.296 },
  Riyadh: { lat: 24.713, lng: 46.674 },
  Doha:   { lat: 25.286, lng: 51.534 },
  Manama: { lat: 26.227, lng: 50.586 },
};

/* ISO numeric codes (string-padded as TopoJSON emits them). Used to
   highlight the GCC region against neighbour countries. */
const GCC_IDS = new Set(['682', '784', '512', '634', '414', '048', '887', '368', '400', '364']);
//                        SA     UAE    OM     QA     KW     BH     YE     IQ     JO     IR
const HIGHLIGHT_IDS = new Set(['682', '784', '512', '634', '414', '048', '887']);
//                              SA     UAE    OM     QA     KW     BH     YE

function NetworkMap({ schools }: { schools: School[] }) {
  const navigate = useNavigate();

  // Cluster schools by city (everything before the first comma).
  const cityIndex = new Map<string, School[]>();
  for (const s of schools) {
    const city = s.location.split(',')[0].trim();
    if (!cityIndex.has(city)) cityIndex.set(city, []);
    cityIndex.get(city)!.push(s);
  }

  return (
    <figure
      className="relative w-full border overflow-hidden"
      style={{ borderColor: BRAND.rule, background: BRAND.paperHi, aspectRatio: '10 / 7' }}
      aria-label={`Map of the Arabian Peninsula showing ${schools.length} Madarek schools across ${cityIndex.size} cities`}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [49, 23], scale: 1500 }}
        width={1000}
        height={700}
        style={{ width: '100%', height: '100%' }}>
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies
              .filter((geo) => GCC_IDS.has(String(geo.id)))
              .map((geo) => {
                const id = String(geo.id);
                const highlighted = HIGHLIGHT_IDS.has(id);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={highlighted ? BRAND.paper : BRAND.paperLo}
                    stroke={BRAND.rule}
                    strokeWidth={0.8}
                    style={{
                      default:  { outline: 'none' },
                      hover:    { outline: 'none', fill: highlighted ? BRAND.paper : BRAND.paperLo },
                      pressed:  { outline: 'none' },
                    }} />
                );
              })
          }
        </Geographies>

        {/* country labels — placed away from city markers so they
           don't collide with the dots or their captions */}
        {[
          { name: 'Saudi Arabia', coords: [44, 21] as [number, number] },
          { name: 'UAE',          coords: [54.5, 22.8] as [number, number] },
          { name: 'Oman',         coords: [56.7, 20] as [number, number] },
          { name: 'Yemen',        coords: [47, 15.5] as [number, number] },
          { name: 'Iraq',         coords: [44, 32.5] as [number, number] },
        ].map((c) => (
          <Marker key={c.name} coordinates={c.coords}>
            <text
              textAnchor="middle"
              fill={BRAND.inkMute}
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 20,
                letterSpacing: '0.24em',
                fontWeight: 500,
                textTransform: 'uppercase',
                pointerEvents: 'none',
              }}>
              {c.name}
            </text>
          </Marker>
        ))}

        {Array.from(cityIndex.entries()).map(([city, citySchools]) => {
          const coords = CITY_COORDS[city];
          if (!coords) return null;
          const count = citySchools.length;
          const to = count === 1 ? `/schools/${citySchools[0].slug}` : '/schools';
          const title = count === 1 ? citySchools[0].name : `${count} campuses in ${city}`;
          return (
            <Marker
              key={city}
              coordinates={[coords.lng, coords.lat]}
              onClick={() => navigate(to)}
              aria-label={title}
              style={{ default: { cursor: 'pointer' }, hover: { cursor: 'pointer' }, pressed: { cursor: 'pointer' } }}>
              {/* halo */}
              <circle r={18} fill={withOpacity('cyan', 0.2)} />
              {/* dot */}
              <circle r={7} fill={BRAND.cyan} stroke={BRAND.paperHi} strokeWidth={2.5} />
              <text
                y={48}
                textAnchor="middle"
                fill={BRAND.ink}
                style={{
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  fontSize: 18,
                  letterSpacing: '0.22em',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                }}>
                {city}{count > 1 ? ` · ${count}` : ''}
              </text>
            </Marker>
          );
        })}
      </ComposableMap>

      {/* north indicator */}
      <div className="absolute top-5 left-5 flex flex-col items-center gap-1.5" aria-hidden="true">
        <div className="w-px h-5" style={{ background: BRAND.inkMute }} />
        <Meta>N</Meta>
      </div>

      {/* legend */}
      <figcaption className="absolute bottom-5 right-5 flex items-center gap-3">
        <span className="block w-2 h-2 rounded-full" style={{ background: BRAND.cyan }} />
        <Meta>{schools.length} schools · {cityIndex.size} cities · GCC</Meta>
      </figcaption>
    </figure>
  );
}

function SchoolParallax({ school, index, reversed }: { school: School; index: number; reversed: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-12%', '12%']);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex items-end overflow-hidden bg-black"
      data-screen-label={`${String(index).padStart(2, '0')} ${school.name}`}>
      <motion.div style={reduced ? undefined : { y }} className={`absolute ${reduced ? 'inset-0' : 'inset-[-15%]'} will-change-transform`} aria-hidden="true">
        <img src={school.image} alt="" className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(20,17,15,0.3) 0%, rgba(20,17,15,0.1) 40%, rgba(20,17,15,0.6) 75%, rgba(20,17,15,0.9) 100%)',
          }} />
      </motion.div>

      <div className={`absolute top-32 z-10 pointer-events-none ${reversed ? 'right-6 md:right-12' : 'left-6 md:left-12'}`}>
        <span
          style={{
            fontFamily: 'Fraunces, serif',
            fontWeight: 200,
            fontStyle: 'italic',
            fontSize: 'clamp(8rem, 16vw, 16rem)',
            lineHeight: 0.9,
            color: withOpacity('paper', 0.07),
          }}>
          {String(index).padStart(2, '0')}
        </span>
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`max-w-7xl mx-auto grid grid-cols-12 gap-6 items-end ${reversed ? 'text-right' : ''}`}>

          <div className={`col-span-12 ${reversed ? 'md:col-start-4' : ''} md:col-span-9`}>
            <div className={`flex items-center gap-3 mb-4 ${reversed ? 'justify-end' : ''}`}>
              <FoldedMark size={24} tone="cyan" />
              <Meta tone="paper">{school.location}</Meta>
            </div>
            <Display size="xl" style={{ color: BRAND.paperHi }}>
              {school.name}
            </Display>
            <div className={`mt-8 max-w-2xl ${reversed ? 'ml-auto' : ''}`}>
              <Body size="lg" style={{ color: withOpacity('paper', 0.85) }}>{school.description}</Body>
            </div>
            <div className={`mt-12 flex flex-wrap gap-6 ${reversed ? 'justify-end' : ''}`}>
              <PillLink to={`/schools/${school.slug}`} variant="invert" size="md">View school →</PillLink>
              {school.website && (
                <a
                  href={school.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors text-[15px] font-light border-b pb-1"
                  style={{ color: withOpacity('paper', 0.8), borderColor: withOpacity('paper', 0.3) }}>
                  Visit campus site →
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── School Detail page ────────────────────────────────────── */
export function SchoolDetailPage({ school }: { school: School | undefined }) {
  const d = useDensity();
  if (!school) {
    return (
      <Section bg="paper" className="pt-48 pb-32">
        <Container max="5xl">
          <Display size="md">School not found.</Display>
          <div className="mt-8">
            <TextLink to="/schools" tone="cyan">Back to all schools</TextLink>
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

      <nav aria-label="Breadcrumb" style={{ background: BRAND.paperHi }} className="border-b" >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center gap-3" style={{ borderColor: BRAND.rule }}>
          <Link
            to="/schools"
            className="inline-flex items-center gap-2 transition-colors hover:opacity-70"
            style={{ color: BRAND.ink, fontFamily: 'Inter, sans-serif', fontSize: 13 }}>
            <span aria-hidden="true">←</span>
            <Meta tone="ink">All schools</Meta>
          </Link>
          <span aria-hidden="true" style={{ color: BRAND.inkMute }}>/</span>
          <span aria-current="page"><Meta tone="cyan">{school.short}</Meta></span>
        </div>
      </nav>

      <Section bg="paper" className={d.sectionY}>
        <Container max="6xl">
          <Reveal>
            <div className="grid grid-cols-12 gap-6 mb-24">
              <div className="col-span-12 md:col-span-3">
                <SectionNumber n={1} tone="cyan" />
                <div className="mt-3"><Eyebrow tone="cyan">Facts</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { label: 'Curriculum', value: school.curriculum },
                    { label: 'Ages',       value: school.ages },
                    { label: 'Languages',  value: school.languages },
                    { label: 'Capacity',   value: school.capacity },
                  ].map((f) => (
                    <div key={f.label}>
                      <Meta>{f.label}</Meta>
                      <div className="mt-3">
                        <Display size="xs" italic={false} style={{ fontWeight: 300 }}>{f.value}</Display>
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
                <div className="mt-3"><Eyebrow tone="cyan">Overview</Eyebrow></div>
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
                <div className="mt-3"><Eyebrow tone="cyan">Highlights</Eyebrow></div>
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
            <Eyebrow tone="cyan">Campus gallery</Eyebrow>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory">
            {(school.gallery || []).map((g, i) => (
              <div key={i} className="flex-shrink-0 snap-start w-[300px] md:w-[480px] aspect-[4/3] overflow-hidden">
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
              <Eyebrow tone="paper">Contact</Eyebrow>
            </div>
            <div className="col-span-12 md:col-span-9">
              <Display size="md" style={{ color: BRAND.paperHi }}>
                Interested in<span style={{ fontStyle: 'italic' }}> {school.name}?</span>
              </Display>
              <div className="mt-10 space-y-3" style={{ color: withOpacity('paper', 0.8) }}>
                <div><Meta tone="paper">Address</Meta><Body style={{ color: withOpacity('paper', 0.85) }}>{school.address}</Body></div>
                <div><Meta tone="paper">Email</Meta>
                  <Body style={{ color: withOpacity('paper', 0.85) }}>
                    <a href={`mailto:${school.email}`} className="hover:text-white">{school.email}</a>
                  </Body>
                </div>
              </div>
              <div className="mt-12">
                <PillLink to="/contact" variant="invert" size="md">Contact admissions</PillLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

/* ── Foundation page ──────────────────────────────────────── */
export function FoundationPage() {
  const d = useDensity();
  const pillars = [
    { title: 'Scholarships & access',   detail: 'Removing financial barriers through merit-based scholarships and need-based support.' },
    { title: 'Teacher development',     detail: 'Continuous professional development and leadership pathways for educators.' },
    { title: 'Community outreach',      detail: 'Partnerships with local organisations to extend educational resources.' },
    { title: 'Educational research',    detail: 'Supporting research that advances teaching practices and student wellbeing.' },
  ];
  return (
    <>
      <PageHero
        image="/redesign-assets/transformation.webp"
        eyebrow="Madarek Foundation"
        title="Building futures"
        italicTail="beyond the classroom."
        lede="The Madarek Foundation extends our commitment to educational excellence into the wider community."
        tone="pink" />

      <Section bg="paper" className={d.sectionY}>
        <Container max="6xl">
          <Reveal>
            <div className="grid grid-cols-12 gap-6 mb-24">
              <div className="col-span-12 md:col-span-3">
                <SectionNumber n={1} tone="pink" />
                <div className="mt-3"><Eyebrow tone="pink">Mission</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Display size="lg">Education<span style={{ fontStyle: 'italic' }}> transforms lives.</span></Display>
                <div className="mt-10 max-w-3xl">
                  <Body size="xl">
                    The Foundation exists to ensure that transformation reaches
                    beyond our school gates — supporting students who face
                    financial barriers, investing in the educators who shape
                    young minds, and partnering with communities to expand
                    access to quality learning.
                  </Body>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section bg="paperLo" className={d.sectionY}>
        <Container>
          <Reveal>
            <div className="grid grid-cols-12 gap-6 mb-20 items-end">
              <div className="col-span-12 md:col-span-3">
                <SectionNumber n={2} tone="pink" />
                <div className="mt-3"><Eyebrow tone="pink">Focus areas</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Display size="lg">Four pillars,<span style={{ fontStyle: 'italic' }}> one mission.</span></Display>
              </div>
            </div>
          </Reveal>

          <div className="border-t" style={{ borderColor: BRAND.rule }}>
            {pillars.map((p, i) => (
              <div key={p.title} className="border-b py-12 md:py-16 grid grid-cols-12 gap-6 items-baseline" style={{ borderColor: BRAND.rule }}>
                <div className="col-span-2 md:col-span-1">
                  <span className="font-mono tabular-nums" style={{ fontSize: 13, letterSpacing: '0.18em', color: BRAND.pink, fontWeight: 600 }}>
                    0{i + 1}
                  </span>
                </div>
                <div className="col-span-10 md:col-span-6"><Display size="sm">{p.title}</Display></div>
                <div className="col-span-12 md:col-span-5"><Body size="md" muted>{p.detail}</Body></div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <section className="relative w-full h-[70vh] overflow-hidden bg-black">
        <ScrollImage src="/redesign-assets/4.webp" alt="" overlay="hero" />
        <div className="absolute inset-0 z-10 flex items-end px-6 md:px-12 pb-16">
          <div className="max-w-3xl">
            <Display size="lg" style={{ color: BRAND.paperHi }}>
              Every child<span style={{ fontStyle: 'italic' }}> deserves access.</span>
            </Display>
          </div>
        </div>
      </section>

      <Section bg="ink" className="py-24 md:py-32">
        <Container max="6xl">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8">
              <Eyebrow tone="paper">Get involved</Eyebrow>
              <div className="mt-6">
                <Display size="md" style={{ color: BRAND.paperHi }}>
                  Partner<span style={{ fontStyle: 'italic' }}> with the work.</span>
                </Display>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 md:text-right">
              <PillLink to="mailto:foundation@madarek.me" variant="invert" size="md">
                Partner with us
              </PillLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

/* ── Academy page ─────────────────────────────────────────── */
export function AcademyPage() {
  const d = useDensity();
  const highlights = [
    'Professional development',
    'Leadership training',
    'International certification',
    'Career advancement',
  ];
  return (
    <>
      <PageHero
        image="/redesign-assets/5.webp"
        eyebrow="Madarek Academy"
        title="Investing in"
        italicTail="educator excellence."
        lede="World-class training, certification, and leadership pathways for educators across our schools and the wider GCC education community."
        tone="yellow" />

      <Section bg="paper" className={d.sectionY}>
        <Container max="6xl">
          <Reveal>
            <div className="grid grid-cols-12 gap-6 mb-24">
              <div className="col-span-12 md:col-span-3">
                <SectionNumber n={1} tone="yellow" />
                <div className="mt-3"><Eyebrow tone="yellow">What we offer</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Display size="lg">A practice<span style={{ fontStyle: 'italic' }}> of teaching well.</span></Display>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: BRAND.rule }}>
            {highlights.map((h, i) => (
              <div key={h} className="py-14 px-8 md:px-12" style={{ background: BRAND.paper }}>
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="font-mono tabular-nums" style={{ fontSize: 11, letterSpacing: '0.18em', color: BRAND.yellow, fontWeight: 600 }}>
                    0{i + 1}
                  </span>
                  <Meta>Programme</Meta>
                </div>
                <Display size="sm">{h}</Display>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <section className="w-full overflow-hidden" style={{ background: BRAND.paperLo }}>
        <div className="py-20 md:py-28 px-6 md:px-12">
          <div className="max-w-7xl mx-auto mb-12">
            <Eyebrow tone="yellow">In practice</Eyebrow>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory">
            {['3.webp', '4.webp', '6.webp', '7.webp'].map((src) => (
              <div key={src} className="flex-shrink-0 snap-start w-[280px] md:w-[440px] aspect-[3/4] overflow-hidden">
                <img src={`/redesign-assets/${src}`} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section bg="ink" className="py-24 md:py-32">
        <Container max="6xl">
          <Eyebrow tone="paper">Join the Academy</Eyebrow>
          <div className="mt-6 max-w-4xl">
            <Display size="md" style={{ color: BRAND.paperHi }}>
              For educators<span style={{ fontStyle: 'italic' }}> who want to keep learning.</span>
            </Display>
          </div>
          <div className="mt-10">
            <PillLink to="mailto:academy@madarek.me" variant="invert" size="md">Express interest</PillLink>
          </div>
        </Container>
      </Section>
    </>
  );
}

/* ── Contact page ─────────────────────────────────────────── */
export function ContactPage() {
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
              <Meta tone="paper">Contact</Meta>
            </div>
            <div className="col-span-12 md:col-span-9">
              <Display size="xl" style={{ color: BRAND.paperHi }}>
                Let's start<span style={{ fontStyle: 'italic' }}> a conversation.</span>
              </Display>
            </div>
          </div>
        </Container>
      </Section>

      <Section bg="paper" className={d.sectionY}>
        <Container max="6xl">
          <div className="grid grid-cols-12 gap-12">
            <div className="col-span-12 md:col-span-7">
              <Eyebrow>Send us a note</Eyebrow>
              {submitted ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-10 border p-8"
                  style={{ borderColor: BRAND.rule, background: BRAND.paperHi }}>
                  <Display size="xs" italic>Thank you.</Display>
                  <div className="mt-4">
                    <Body size="md" muted>
                      Your note is on its way. Someone from our team will reply
                      within two working days. In the meantime, you can also
                      reach us at{' '}
                      <a href="mailto:info@madarek.me" className="border-b border-current">info@madarek.me</a>.
                    </Body>
                  </div>
                </div>
              ) : (
                <form className="mt-10 space-y-8" onSubmit={handleSubmit} noValidate={false}>
                  <FormField label="Your name" id="name"    required />
                  <FormField label="Email"     id="email"   type="email" required />
                  <FormField label="I am a..." id="role"
                    options={['Parent', 'Educator', 'Partner', 'Other']} />
                  <FormField label="Message"   id="message" multiline required />
                  <div>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-[13px] tracking-[0.14em] uppercase font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#27C4FF]"
                      style={{ background: BRAND.ink, color: BRAND.paperHi }}>
                      Send message →
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="col-span-12 md:col-span-4 md:col-start-9">
              <Eyebrow>Direct</Eyebrow>
              <div className="mt-10 space-y-8">
                <div>
                  <Meta>Email</Meta>
                  <div className="mt-2">
                    <Body size="lg">
                      <a href="mailto:info@madarek.me" className="border-b border-current pb-1">info@madarek.me</a>
                    </Body>
                  </div>
                </div>
                <div>
                  <Meta>Office</Meta>
                  <div className="mt-2"><Body size="lg">Doha, Qatar</Body></div>
                </div>
                <div>
                  <Meta>Social</Meta>
                  <div className="mt-2 flex gap-4">
                    <Body size="md">
                      <a href="https://www.linkedin.com/company/madarek" target="_blank" rel="noopener noreferrer" className="border-b border-current pb-1">LinkedIn</a>
                    </Body>
                    <Body size="md">
                      <a href="https://www.instagram.com/madarek" target="_blank" rel="noopener noreferrer" className="border-b border-current pb-1">Instagram</a>
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

/* ── Leadership page ──────────────────────────────────────────
   NOTE: portrait `image` URLs are temporary Unsplash placeholders.
   Replace with real headshots (drop files in /public/redesign-assets
   and point these fields at them). The components fall back to an
   initials monogram if an image fails to load. */
type Leader = {
  slug: string; name: string; eyebrow: string; title: string;
  preview: string; tone: BrandKey; image: string; email: string; linkedin: string;
};

const LEADERS: Leader[] = [
  {
    slug: 'shukri-mansour',
    name: 'Mr. Shukri A. Mansour',
    eyebrow: 'CEO for Madarek KSA',
    title: 'Chief Executive Officer',
    preview: 'Leads Madarek KSA across strategy, operations, and organizational direction.',
    tone: 'cyan',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80',
    email: 'shukri.mansour@madarek.me',
    linkedin: '#',
  },
  {
    slug: 'mohamed-hussein-motawea',
    name: 'Mohamed Hussein Motawea',
    eyebrow: 'CEO for Madarek UAE',
    title: 'CEO, FEH UAE & School Director',
    preview: 'Strategic and operational leadership for FEH UAE and Al Maaref American School.',
    tone: 'yellow',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
    email: 'mohamed.motawea@madarek.me',
    linkedin: '#',
  },
  {
    slug: 'haris-moideen',
    name: 'Haris Moideen',
    eyebrow: 'Finance Leadership',
    title: 'Acting CFO & Board Secretary',
    preview: 'Oversees financial management, compliance, governance, and board secretary responsibilities.',
    tone: 'pink',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=900&q=80',
    email: 'haris.moideen@madarek.me',
    linkedin: '#',
  },
];

type BoardMember = { name: string; title: string; image: string };

const BOARD: BoardMember[] = [
  { name: 'Majid Abdulhassan bin Abdulaziz Al Hokair', title: 'Chairman of the Board',      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80' },
  { name: 'Dr. Sulaiman Tareq Al Abduljader',          title: 'Vice Chairman of the Board', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80' },
  { name: 'Shukri Abdulfattah Shukri Mansoor',         title: 'Board Member',               image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80' },
  { name: 'Omar Abdulaziz Sulaiman Al Jassar',         title: 'Board Member',               image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80' },
  { name: 'Fahad Abdulrahman Muhammad Albassam',       title: 'Board Member',               image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=800&q=80' },
  { name: 'Omar Saleh Shayej AlShayeji',               title: 'Board Member',               image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=800&q=80' },
  { name: 'Munirah Adel Ahmad Al Wugayan',             title: 'Board Member',               image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80' },
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
          style={{ fontFamily: 'Fraunces, serif', fontWeight: 200, fontStyle: 'italic', fontSize: 'clamp(3rem, 8vw, 6rem)', color: withOpacity('paper', 0.9), letterSpacing: '-0.02em' }}>
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

/* Executives — full-bleed cinematic slider, one at a time. Large
   portrait beside elegant typography on a light surface; social
   links, counter, and prev/next arrows. Magazine-spread feel. */
function ExecutiveSlider({ leaders }: { leaders: Leader[] }) {
  const reduced = useReducedMotion();
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const n = leaders.length;
  const active = ((index % n) + n) % n;
  const leader = leaders[active];

  const paginate = (delta: number) => setState(([i]) => [i + delta, delta]);

  const variants = {
    enter:  (d: number) => ({ x: reduced ? 0 : d >= 0 ? '5%' : '-5%', opacity: 0 }),
    center: { x: '0%', opacity: 1 },
    exit:   (d: number) => ({ x: reduced ? 0 : d >= 0 ? '-5%' : '5%', opacity: 0 }),
  };

  const arrowBtn = 'grid place-items-center h-12 w-12 rounded-full border transition-colors hover:bg-[#1A1714] hover:text-[#F4EDE0]';

  return (
    <div
      className="relative w-full overflow-hidden mt-10 md:mt-14 focus:outline-none"
      style={{ background: BRAND.white }}
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label="Executive leadership"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); paginate(1); }
        if (e.key === 'ArrowLeft')  { e.preventDefault(); paginate(-1); }
      }}>
      <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={leader.slug}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduced ? 0.2 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="contents">
            {/* portrait */}
            <div className="relative overflow-hidden h-[44vh] min-h-[320px] lg:h-[80vh] lg:min-h-[600px]">
              <Portrait src={leader.image} alt={leader.name} name={leader.name} tone={leader.tone} />
            </div>

            {/* text */}
            <div className="relative flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-12 lg:py-16">
              <span className="font-mono tabular-nums text-[13px] tracking-[0.18em]" style={{ color: BRAND.inkMute }}>
                {String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
              </span>
              <h3 className="mt-6" style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, color: BRAND.ink, fontSize: 'clamp(2.4rem, 4.6vw, 4.2rem)', lineHeight: 1.0, letterSpacing: '-0.02em' }}>
                {leader.name}
              </h3>
              <div className="mt-5">
                <span className="font-mono uppercase inline-block pb-1.5"
                  style={{ fontSize: 12, letterSpacing: '0.18em', color: BRAND.ink, borderBottom: `2px solid ${withOpacity(leader.tone, 0.7)}` }}>
                  {leader.title}
                </span>
              </div>
              <div className="mt-7 max-w-md">
                <Body size="md" muted>{leader.preview}</Body>
              </div>
              <div className="mt-9 flex items-center gap-4">
                <a href={leader.linkedin} aria-label={`${leader.name} on LinkedIn`}
                  className="grid place-items-center h-10 w-10 rounded-full border transition-colors hover:bg-[#1A1714] hover:text-[#F4EDE0]"
                  style={{ borderColor: withOpacity('ink', 0.25), color: BRAND.inkSub }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden="true">
                    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.25 8h4.5v15.5H.25V8zm7.5 0h4.31v2.12h.06c.6-1.07 2.06-2.2 4.24-2.2 4.54 0 5.38 2.86 5.38 6.58V23.5h-4.5v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.65v7.02h-4.5V8z" />
                  </svg>
                </a>
                <a href={`mailto:${leader.email}`} aria-label={`Email ${leader.name}`}
                  className="grid place-items-center h-10 w-10 rounded-full border transition-colors hover:bg-[#1A1714] hover:text-[#F4EDE0]"
                  style={{ borderColor: withOpacity('ink', 0.25), color: BRAND.inkSub }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[18px] w-[18px]" aria-hidden="true">
                    <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
                    <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
                  </svg>
                </a>
                <Link to={`/about/leadership/${leader.slug}`}
                  className="group ml-2 inline-flex items-center gap-2 text-[13px] tracking-[0.12em] uppercase font-medium"
                  style={{ color: BRAND.ink }}>
                  <span className="border-b pb-1" style={{ borderColor: withOpacity('ink', 0.4) }}>Full profile</span>
                  <span className="transition-transform group-hover:translate-x-1" style={{ color: leader.tone }}>→</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* arrows — bottom right */}
        <div className="absolute right-6 md:right-10 bottom-6 md:bottom-10 z-20 flex gap-3">
          <button type="button" onClick={() => paginate(-1)} aria-label="Previous executive"
            className={arrowBtn} style={{ borderColor: withOpacity('ink', 0.3), color: BRAND.ink }}>
            <span className="-mt-0.5 text-lg">←</span>
          </button>
          <button type="button" onClick={() => paginate(1)} aria-label="Next executive"
            className={arrowBtn} style={{ borderColor: withOpacity('ink', 0.3), color: BRAND.ink }}>
            <span className="-mt-0.5 text-lg">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* Board — oversized portrait wall on a dark surface. Tall photo
   cards; name + role sit over a gradient at the base of each. */
function BoardWall({ members }: { members: BoardMember[] }) {
  const tones: BrandKey[] = ['cyan', 'yellow', 'pink', 'lime', 'red'];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
      {members.map((m, i) => {
        const tone = tones[i % tones.length];
        return (
          <Reveal key={m.name} delay={(i % 3) * 0.06}>
            <article className="group relative aspect-[3/4] overflow-hidden">
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]">
                <Portrait src={m.image} alt={m.name} name={m.name} tone={tone} />
              </div>
              <div className="absolute inset-0 z-20 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(10,12,28,0.92) 0%, rgba(10,12,28,0.45) 32%, rgba(10,12,28,0) 60%)' }} />
              <div className="absolute inset-x-0 bottom-0 z-30 p-5 md:p-6">
                <div style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: 'clamp(1.1rem, 1.6vw, 1.5rem)', lineHeight: 1.15, color: BRAND.paperHi }}>
                  {m.name}
                </div>
                <div className="mt-2 font-mono uppercase" style={{ fontSize: 11, letterSpacing: '0.16em', color: withOpacity('paper', 0.7) }}>
                  {m.title}
                </div>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}

export function LeadershipPage() {
  const d = useDensity();
  return (
    <>
      <PageHero
        image="/redesign-assets/title_3.webp"
        eyebrow="About Madarek"
        title="Leadership"
        italicTail="guiding the work."
        lede="Governance and executive leadership steering Madarek's growth, school operations, and long-term education platform strategy."
        tone="red"
        number={1} />

      <Section bg="white" className={d.sectionY}>
        <Container max="6xl">
          <Reveal>
            <div className="grid grid-cols-12 gap-6 mb-16">
              <div className="col-span-12 md:col-span-3">
                <SectionNumber n={2} tone="red" />
                <div className="mt-3"><Eyebrow tone="red">Executive</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Display size="lg">
                  The people<span style={{ fontStyle: 'italic', display: 'block' }}>behind the schools.</span>
                </Display>
              </div>
            </div>
          </Reveal>

        </Container>

        <ExecutiveSlider leaders={LEADERS} />
      </Section>

      <Section bg="navy" className={d.sectionY}>
        <Container>
          <Reveal>
            <div className="grid grid-cols-12 gap-6 mb-16">
              <div className="col-span-12 md:col-span-3">
                <SectionNumber n={3} tone="cyan" />
                <div className="mt-3"><Eyebrow tone="cyan">Governance</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Display size="lg" style={{ color: BRAND.paperHi }}>
                  Board of<span style={{ fontStyle: 'italic' }}> Directors.</span>
                </Display>
                <div className="mt-8 max-w-2xl">
                  <Body size="lg" style={{ color: withOpacity('paper', 0.72) }}>
                    Madarek's Board provides strategic oversight, governance, and
                    stewardship for the platform's continued growth.
                  </Body>
                </div>
              </div>
            </div>
          </Reveal>

          <BoardWall members={BOARD} />
        </Container>
      </Section>

      <Section bg="ink" className="py-24 md:py-32">
        <Container max="6xl">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8">
              <Eyebrow tone="paper">About Madarek</Eyebrow>
              <div className="mt-6">
                <Display size="md" style={{ color: BRAND.paperHi }}>
                  More on<span style={{ fontStyle: 'italic' }}> who we are.</span>
                </Display>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 md:text-right">
              <PillLink to="/about" variant="invert">Back to About</PillLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

/* ── Leader detail page ───────────────────────────────────────
   Individual page for each executive (CEOs, CFO). BOD members do
   not get detail pages. */
export function LeaderDetailPage({ leader }: { leader: Leader | undefined }) {
  const d = useDensity();

  if (!leader) {
    return (
      <Section bg="paper" className="pt-48 pb-32">
        <Container max="5xl">
          <Display size="md">Leader not found.</Display>
          <div className="mt-8">
            <TextLink to="/about/leadership" tone="ink">Back to leadership</TextLink>
          </div>
        </Container>
      </Section>
    );
  }

  const others = LEADERS.filter((l) => l.slug !== leader.slug);
  const lastName = leader.name.split(' ').filter(Boolean).slice(-1)[0];

  return (
    <>
      {/* Hero — initials portrait on dark, name and title beside */}
      <section className="relative w-full pt-44 pb-24 md:pt-52 md:pb-32" style={{ background: BRAND.ink }}>
        <Container>
          <div className="grid grid-cols-12 gap-6 md:gap-12 items-center">
            <div className="col-span-12 md:col-span-4">
              <div
                className="aspect-[4/5] flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${BRAND.ink} 0%, ${BRAND.inkSub} 100%)`,
                  border: `1px solid ${withOpacity('paper', 0.18)}`,
                }}>
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: 'Fraunces, serif',
                    fontWeight: 200,
                    fontStyle: 'italic',
                    fontSize: 'clamp(5rem, 10vw, 9rem)',
                    color: withOpacity('paper', 0.92),
                    letterSpacing: '-0.02em',
                  }}>
                  {getInitials(leader.name)}
                </span>
              </div>
            </div>
            <div className="col-span-12 md:col-span-8">
              <Eyebrow tone={leader.tone}>{leader.eyebrow}</Eyebrow>
              <div className="mt-6">
                <Display size="lg" style={{ color: BRAND.paperHi }}>{leader.name}</Display>
              </div>
              <div className="mt-6">
                <Meta tone="paper">{leader.title}</Meta>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ background: BRAND.paperHi }} className="border-b">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center gap-3" style={{ borderColor: BRAND.rule }}>
          <Link
            to="/about/leadership"
            className="inline-flex items-center gap-2 transition-colors hover:opacity-70"
            style={{ color: BRAND.ink, fontFamily: 'Inter, sans-serif', fontSize: 13 }}>
            <span aria-hidden="true">←</span>
            <Meta tone="ink">Leadership</Meta>
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
                <div className="mt-3"><Eyebrow tone={leader.tone}>About</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Body size="xl">{leader.preview}</Body>
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
                <div className="mt-3"><Eyebrow>The team</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Display size="lg">
                  Other<span style={{ fontStyle: 'italic' }}> leaders.</span>
                </Display>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {others.map((l, i) => (
              <Reveal key={l.slug} delay={i * 0.06}>
                <Link
                  to={`/about/leadership/${l.slug}`}
                  className="group block border focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:#27C4FF]"
                  style={{ borderColor: BRAND.rule, background: BRAND.paperHi }}>
                  <div
                    className="aspect-[16/9] flex items-center justify-center relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${BRAND.ink} 0%, ${BRAND.inkSub} 100%)` }}>
                    <span
                      aria-hidden="true"
                      style={{
                        fontFamily: 'Fraunces, serif',
                        fontWeight: 200,
                        fontStyle: 'italic',
                        fontSize: 72,
                        color: withOpacity('paper', 0.9),
                      }}>
                      {getInitials(l.name)}
                    </span>
                  </div>
                  <div className="p-6">
                    <Eyebrow tone={l.tone}>{l.eyebrow}</Eyebrow>
                    <div className="mt-3" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: 22, lineHeight: 1.25, color: BRAND.ink }}>
                      {l.name}
                    </div>
                    <div className="mt-2"><Meta>{l.title}</Meta></div>
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
              <Eyebrow tone="paper">Leadership</Eyebrow>
              <div className="mt-6">
                <Display size="md" style={{ color: BRAND.paperHi }}>
                  Meet the rest<span style={{ fontStyle: 'italic' }}> of the team.</span>
                </Display>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 md:text-right">
              <PillLink to="/about/leadership" variant="invert">View all leadership</PillLink>
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

/* ── News page ───────────────────────────────────────────────
   Editorial article index. Lorem Ipsum copy carried over from
   the original newsData.ts — real editorial content lives
   separately. */
type Article = { id: number; title: string; excerpt: string; date: string; category: string; image: string; featured: boolean };

const NEWS_ARTICLES: Article[] = [
  { id: 1, title: 'Lorem ipsum dolor sit amet', excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vehicula magna at nisi sollicitudin.',  date: 'July 1, 2023',     category: 'Curriculum',           image: '/redesign-assets/2.webp',   featured: true  },
  { id: 2, title: 'Sed ut perspiciatis unde',  excerpt: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',                date: 'June 18, 2023',    category: 'Expansion',            image: '/redesign-assets/3.webp',   featured: true  },
  { id: 3, title: 'Ut enim ad minim veniam',   excerpt: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',  date: 'May 5, 2023',      category: 'Student Initiatives',  image: '/redesign-assets/4.webp',   featured: true  },
  { id: 4, title: 'Quis autem vel eum iure',   excerpt: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.',       date: 'April 2, 2023',    category: 'Awards',               image: '/redesign-assets/5.webp',   featured: false },
  { id: 5, title: 'Excepteur sint occaecat',   excerpt: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod.',          date: 'March 12, 2023',   category: 'Partnerships',         image: '/redesign-assets/6.webp',   featured: false },
  { id: 6, title: 'Neque porro quisquam est',  excerpt: 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est.',     date: 'February 1, 2023', category: 'Faculty',              image: '/redesign-assets/7.webp',   featured: false },
  { id: 7, title: 'Magni dolores eos qui',     excerpt: 'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et.',         date: 'January 10, 2023', category: 'Curriculum',           image: '/redesign-assets/1.webp',   featured: false },
  { id: 8, title: 'Itaque earum rerum hic',    excerpt: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',             date: 'December 15, 2022', category: 'Student Initiatives', image: '/redesign-assets/1-1.webp', featured: false },
];

export function NewsPage() {
  const d = useDensity();
  const categories = ['All', ...Array.from(new Set(NEWS_ARTICLES.map((a) => a.category)))];
  const [selected, setSelected] = useState<string>('All');
  const filtered = selected === 'All' ? NEWS_ARTICLES : NEWS_ARTICLES.filter((a) => a.category === selected);

  return (
    <>
      <PageHero
        image="/redesign-assets/transformation.webp"
        eyebrow="News & Insights"
        title="The latest from"
        italicTail="across the network."
        lede="Stories of student achievement, faculty work, and the quiet operational moves that keep our schools moving forward."
        tone="cyan"
        number={1} />

      <Section bg="paper" className="pt-24 md:pt-32 pb-12">
        <Container>
          <div className="flex flex-wrap gap-3">
            {categories.map((c) => {
              const active = c === selected;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelected(c)}
                  className="px-5 py-2.5 rounded-full transition-colors"
                  style={{
                    background: active ? BRAND.ink : 'transparent',
                    color:      active ? BRAND.paperHi : BRAND.ink,
                    border: `1px solid ${active ? BRAND.ink : BRAND.rule}`,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13,
                    letterSpacing: '0.04em',
                    fontWeight: 400,
                  }}>
                  {c}
                </button>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section bg="paper" className={d.sectionY}>
        <Container>
          <div className="grid grid-cols-12 gap-x-6 gap-y-16 md:gap-y-24">
            {filtered.map((article, i) => {
              const colSpan = article.featured ? 'col-span-12 md:col-span-6' : 'col-span-12 md:col-span-4';
              /* Articles are placeholders for now — render as static <article>s
                 rather than dangling `href="#"` links that go nowhere. */
              return (
                <Reveal key={article.id} delay={Math.min(i * 0.05, 0.3)} className={colSpan}>
                  <article>
                    <div className="overflow-hidden mb-6 aspect-[4/3]">
                      <img
                        src={article.image}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover" />
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <Meta>{article.date}</Meta>
                      <span className="block h-px w-6" style={{ background: BRAND.rule }} />
                      <Meta tone="cyan">{article.category}</Meta>
                    </div>
                    <Display size={article.featured ? 'sm' : 'xs'} style={{ fontWeight: 300 }}>
                      {article.title}
                    </Display>
                    <div className="mt-4 max-w-xl">
                      <Body size="md" muted>{article.excerpt}</Body>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}

/* ── Careers page ────────────────────────────────────────── */
const CAREER_VALUES: { tone: BrandKey; title: string; detail: string }[] = [
  { tone: 'red',    title: 'Impact',   detail: 'Shape the future of education across the GCC. Every role at Madarek contributes directly to student success and educational excellence.' },
  { tone: 'yellow', title: 'Growth',   detail: 'Continuous professional development, leadership pathways, and opportunities to advance your career within a growing regional platform.' },
  { tone: 'cyan',   title: 'Culture',  detail: 'Join a collaborative, mission-driven team that values innovation, integrity, and the whole person — students and colleagues alike.' },
  { tone: 'lime',   title: 'Benefits', detail: 'Competitive compensation, comprehensive health coverage, professional development support, and relocation assistance for international hires.' },
];

const LIFE_IMAGES = [
  { src: '/redesign-assets/3.webp', caption: 'State-of-the-art learning environments' },
  { src: '/redesign-assets/4.webp', caption: 'Ongoing teacher development and training' },
  { src: '/redesign-assets/5.webp', caption: 'Collaborative, mission-driven teams' },
  { src: '/redesign-assets/6.webp', caption: 'Regional reach across the GCC' },
];

const OPEN_ROLES = [
  { title: 'Head of Secondary',            location: 'Doha, Qatar',          department: 'Academic Leadership', posted: '2 weeks ago' },
  { title: 'Curriculum Lead — Science',    location: 'Riyadh, Saudi Arabia', department: 'Curriculum',          posted: '3 weeks ago' },
  { title: 'IB Coordinator',               location: 'Manama, Bahrain',      department: 'Academic Leadership', posted: '1 month ago' },
  { title: 'Mathematics Teacher',          location: 'Dubai, UAE',           department: 'Teaching',            posted: '2 weeks ago' },
  { title: 'Director of Admissions',       location: 'Doha, Qatar',          department: 'Operations',          posted: '1 week ago'  },
  { title: 'Academic Operations Manager',  location: 'Riyadh, Saudi Arabia', department: 'Operations',          posted: '3 weeks ago' },
];

export function CareersPage() {
  const d = useDensity();
  return (
    <>
      <PageHero
        image="/redesign-assets/growth.webp"
        eyebrow="Careers at Madarek"
        title="Build the future of"
        italicTail="education with us."
        lede="Join a team dedicated to academic excellence, the whole child, and lasting educational impact across the GCC. We're looking for educators, leaders, and innovators who share our mission."
        tone="yellow"
        number={1} />

      <Section bg="paper" className={d.sectionY}>
        <Container max="6xl">
          <Reveal>
            <div className="grid grid-cols-12 gap-6 mb-20">
              <div className="col-span-12 md:col-span-3">
                <SectionNumber n={2} tone="yellow" />
                <div className="mt-3"><Eyebrow tone="yellow">Why Madarek</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Display size="lg">
                  Four reasons<span style={{ fontStyle: 'italic', display: 'block' }}>to join the team.</span>
                </Display>
              </div>
            </div>
          </Reveal>

          <div className="border-t" style={{ borderColor: BRAND.rule }}>
            {CAREER_VALUES.map((v, i) => (
              <div key={v.title} className="border-b py-12 md:py-16 grid grid-cols-12 gap-6 items-baseline" style={{ borderColor: BRAND.rule }}>
                <div className="col-span-2 md:col-span-1">
                  <FoldedMark size={28} tone={v.tone} rotate={-8 + i * 6} />
                </div>
                <div className="col-span-10 md:col-span-5">
                  <Display size="sm">{v.title}</Display>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <Body size="md" muted>{v.detail}</Body>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section bg="paperLo" className={d.sectionY}>
        <Container>
          <Reveal>
            <div className="grid grid-cols-12 gap-6 mb-20">
              <div className="col-span-12 md:col-span-3">
                <SectionNumber n={3} tone="yellow" />
                <div className="mt-3"><Eyebrow tone="yellow">Life at Madarek</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Display size="lg">
                  Inside<span style={{ fontStyle: 'italic' }}> the schools.</span>
                </Display>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LIFE_IMAGES.map((img, i) => (
              <Reveal key={img.caption} delay={i * 0.06}>
                <figure className="relative overflow-hidden aspect-[4/3] group">
                  <img src={img.src} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)' }} />
                  <figcaption className="absolute bottom-5 left-5 right-5">
                    <Body size="md" style={{ color: BRAND.paperHi, fontWeight: 300 }}>{img.caption}</Body>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section bg="paper" className={d.sectionY}>
        <Container max="6xl">
          <Reveal>
            <div className="grid grid-cols-12 gap-6 mb-16">
              <div className="col-span-12 md:col-span-3">
                <SectionNumber n={4} tone="yellow" />
                <div className="mt-3"><Eyebrow tone="yellow">Open roles</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Display size="lg">
                  Currently<span style={{ fontStyle: 'italic' }}> hiring.</span>
                </Display>
              </div>
            </div>
          </Reveal>

          <div className="border-t" style={{ borderColor: BRAND.rule }}>
            {OPEN_ROLES.map((role, i) => {
              const subject = encodeURIComponent(`Application — ${role.title} (${role.location})`);
              return (
                <Reveal key={`${role.title}-${role.location}`} delay={Math.min(i * 0.03, 0.18)}>
                  <a
                    href={`mailto:careers@madarek.me?subject=${subject}`}
                    className="group block border-b py-8 md:py-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27C4FF]"
                    style={{ borderColor: BRAND.rule }}>
                    <div className="grid grid-cols-12 gap-4 items-baseline">
                      <div className="col-span-12 md:col-span-6">
                        <Display size="xs" style={{ fontWeight: 300 }}>
                          {role.title}
                        </Display>
                      </div>
                      <div className="col-span-6 md:col-span-2"><Meta>{role.location}</Meta></div>
                      <div className="col-span-6 md:col-span-2"><Meta>{role.department}</Meta></div>
                      <div className="col-span-12 md:col-span-2 md:text-right">
                        <span className="inline-flex items-baseline gap-2 transition-transform group-hover:translate-x-1"
                              style={{ color: BRAND.ink, fontFamily: 'Inter, sans-serif', fontSize: 14 }}>
                          Apply <span>→</span>
                        </span>
                      </div>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-20 border-t border-b py-16 md:py-20 text-center" style={{ borderColor: BRAND.rule }}>
              <Eyebrow>General application</Eyebrow>
              <div className="mt-6">
                <Display size="md">
                  Don't see<span style={{ fontStyle: 'italic' }}> your role?</span>
                </Display>
              </div>
              <div className="mt-8 max-w-xl mx-auto">
                <Body size="md" muted>
                  We're always looking for talented educators and professionals
                  who share our mission. Send us your CV and tell us how you'd
                  like to contribute.
                </Body>
              </div>
              <div className="mt-10">
                <PillLink to="mailto:careers@madarek.me">Submit application</PillLink>
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
  const fieldStyle = { fontFamily: 'Fraunces, serif', fontWeight: 300, fontSize: 22, color: BRAND.ink };
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
