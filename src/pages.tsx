/* Madarek redesign — secondary pages
   --------------------------------------------------------------
   About, Schools, Foundation, Academy, Contact, SchoolDetail.
   Each page shares the layout law: photography full-bleed alone,
   text breathes alone. Page-level colour codes the section. */

import { useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
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
import type { School } from './data';
import { SchoolsExplorer } from './schools-explorer';

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
  const d = useDensity();

  const values: { tone: BrandKey; title: string; detail: string }[] = [
    { tone: 'red',    title: 'Excellence',    detail: 'Pursuing the highest standards across all aspects of education.' },
    { tone: 'yellow', title: 'Innovation',    detail: 'Embracing new ideas and technologies to enhance learning experiences.' },
    { tone: 'cyan',   title: 'Integrity',     detail: 'Operating with transparency, accountability, and responsibility.' },
    { tone: 'lime',   title: 'Collaboration', detail: 'Building strong partnerships that foster growth and shared success.' },
    { tone: 'pink',   title: 'Impact',        detail: 'Creating positive and lasting contributions to students and communities.' },
  ];

  return (
    <>
      <PageHero
        image="/redesign-assets/about_us.webp"
        eyebrow="Who We Are"
        title="A regional"
        italicTail="education platform."
        lede="A growing network of international schools across the GCC, built on academic excellence and the full development of every student."
        tone="ink" />

      {/* Our story — NEEDS FACTS: founder / parent company, number of schools &
          students, and key milestones to enrich this section. */}
      <Section bg="paperLo" className={d.sectionY}>
        <Container max="6xl">
          <Reveal>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-3">
                <SectionNumber n={1} tone="ink" />
                <div className="mt-3"><Eyebrow>Our story</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Display size="md">Founded in 2026.</Display>
                <div className="mt-10 max-w-2xl">
                  <Body size="xl">
                    MADAREK was founded in 2026 to bring together a growing
                    network of schools across the GCC. From our first campuses in
                    the UAE and Saudi Arabia, we continue to expand — guided by a
                    single mission: to deliver internationally recognised
                    education that develops well-rounded students and strengthens
                    the communities we serve.
                  </Body>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Vision & Mission */}
      <Section bg="paper" className={d.sectionY}>
        <Container max="6xl">
          <Reveal>
            <div className="grid grid-cols-12 gap-6 mb-20">
              <div className="col-span-12 md:col-span-3">
                <SectionNumber n={2} tone="ink" />
                <div className="mt-3"><Eyebrow>Vision &amp; Mission</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Display size="lg">
                  <span>Vision &amp;</span>
                  <span style={{ display: 'block', fontStyle: 'normal', color: BRAND.inkSub }}>mission.</span>
                </Display>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-12 gap-6 mt-16">
              <div className="col-span-12 md:col-span-3 md:col-start-4">
                <Meta>Vision</Meta>
              </div>
              <div className="col-span-12 md:col-span-6">
                <Body size="xl">
                  To become a leading education platform recognized for
                  delivering exceptional learning experiences and creating
                  lasting value across the region.
                </Body>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-12 gap-6 mt-12">
              <div className="col-span-12 md:col-span-3 md:col-start-4">
                <Meta>Mission</Meta>
              </div>
              <div className="col-span-12 md:col-span-6">
                <Body size="xl">
                  To nurture future generations through accessible, high-quality
                  education that combines academic excellence with innovation and
                  global best practices.
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
                <div className="mt-3"><Eyebrow>Our Four Pillars</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Display size="lg">Four pillars,<span style={{ color: BRAND.inkSub }}> one direction.</span></Display>
              </div>
            </div>
          </Reveal>

          <div className="border-t" style={{ borderColor: BRAND.rule }}>
            {([
              { tone: 'red',    title: 'Educational Excellence', detail: 'Delivering high-quality learning experiences that foster academic achievement, critical thinking, and holistic development.', tags: ['Academic achievement', 'Critical thinking', 'Holistic development'] },
              { tone: 'yellow', title: 'Innovation',             detail: 'Creating future-ready learning environments that embrace technology, creativity, and new approaches to education.', tags: ['Technology', 'Creativity', 'New approaches'] },
              { tone: 'cyan',   title: 'Regional Growth',        detail: 'Building a leading education ecosystem through strategic expansion, partnerships, and collaboration across the GCC and beyond.', tags: ['Strategic expansion', 'Partnerships', 'GCC & beyond'] },
              { tone: 'lime',   title: 'Lasting Impact',         detail: 'Creating positive and sustainable outcomes for students, educators, communities, and future generations.', tags: ['Students & educators', 'Communities', 'Future generations'] },
            ] as { tone: BrandKey; title: string; detail: string; tags: string[] }[]).map((p, i) => (
              <div key={p.title} className="border-b py-10 md:py-14 grid grid-cols-12 gap-6" style={{ borderColor: BRAND.rule }}>
                <div className="col-span-12 md:col-span-1">
                  <span className="font-mono tabular-nums" style={{ fontSize: 13, letterSpacing: '0.18em', color: BRAND[p.tone], fontWeight: 600 }}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <h3 style={{ fontFamily: CARD_HEADING, fontWeight: 500, fontSize: 'clamp(1.4rem, 2vw, 1.9rem)', lineHeight: 1.15, letterSpacing: '-0.01em', color: BRAND.ink }}>{p.title}</h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="inline-block rounded-full px-3 py-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: '0.04em', color: BRAND.inkSub, background: BRAND.paperHi, border: `1px solid ${BRAND.rule}` }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 md:col-start-6">
                  <Body size="lg" muted>{p.detail}</Body>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Educational Excellence — relocated from the homepage */}
      <Section bg="paperLo" className={d.sectionY}>
        <Container max="6xl">
          <Reveal>
            <div className="mb-16">
              <SectionNumber n={5} tone="cyan" />
              <div className="mt-3 mb-8"><Eyebrow tone="cyan">Educational Excellence</Eyebrow></div>
              <Display size="lg">
                A commitment to
                <span style={{ display: 'block', color: BRAND.inkSub }}>lifelong learning.</span>
              </Display>
              <div className="mt-10 max-w-2xl">
                <Body size="lg" muted>
                  At MADAREK, we believe exceptional education extends beyond
                  academic achievement. We strive to cultivate well-rounded
                  individuals equipped with the skills, values, and mindset needed
                  to succeed in an evolving world.
                </Body>
              </div>
            </div>
          </Reveal>

          <div className="border-t" style={{ borderColor: BRAND.rule }}>
            {[
              { title: 'Student-Centered Learning', note: 'Placing students at the heart of the educational journey and fostering environments that encourage curiosity, creativity, and personal growth.' },
              { title: 'Innovation in Education',   note: 'Embracing technology and modern teaching methodologies to prepare learners for the future.' },
              { title: 'Global Standards',          note: 'Delivering internationally recognised curricula and best practices that support academic excellence.' },
              { title: 'Holistic Development',      note: 'Supporting academic, personal, social, and emotional growth to develop well-rounded individuals.' },
            ].map((it, i) => (
              <div key={it.title} className="border-b py-10 md:py-14 grid grid-cols-12 gap-6 items-baseline" style={{ borderColor: BRAND.rule }}>
                <div className="col-span-2 md:col-span-1">
                  <span className="font-mono tabular-nums" style={{ fontSize: 13, letterSpacing: '0.18em', color: BRAND.cyan, fontWeight: 600 }}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="col-span-10 md:col-span-5">
                  <h3 style={{ fontFamily: CARD_HEADING, fontWeight: 500, fontSize: 'clamp(1.3rem, 1.8vw, 1.7rem)', lineHeight: 1.2, color: BRAND.ink }}>{it.title}</h3>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <Body size="md" muted>{it.note}</Body>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

/* ── Schools page ──────────────────────────────────────────── */
export function SchoolsPage({ schools }: { schools: School[] }) {
  return (
    <>
      <PageHero
        image="/redesign-assets/1.webp"
        eyebrow="Our Schools"
        title="Investing in"
        italicTail="educational excellence."
        lede="MADAREK's schools provide diverse learning environments designed to nurture academic achievement, creativity, and personal growth."
        tone="cyan" />

      <SchoolsExplorer schools={schools} />
    </>
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
                    ...(school.grades ? [{ label: 'Grades', value: school.grades }] : []),
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
                Interested in<span style={{ fontStyle: 'normal' }}> {school.name}?</span>
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
const CARD_HEADING = 'Plus Jakarta Sans, Inter, ui-sans-serif, sans-serif';

export function FoundationPage() {
  const d = useDensity();

  const focusAreas: { tone: BrandKey; title: string; detail: string }[] = [
    { tone: 'pink',   title: 'Access to Education',       detail: 'Supporting initiatives that promote inclusive and accessible learning opportunities for individuals and communities.' },
    { tone: 'cyan',   title: 'Community Development',     detail: 'Contributing to programs that strengthen communities and create meaningful, lasting social impact.' },
    { tone: 'yellow', title: 'Student Empowerment',      detail: 'Encouraging leadership, creativity, and lifelong learning so students can reach their full potential.' },
    { tone: 'lime',   title: 'Partnerships for Good',    detail: 'Collaborating with institutions and organizations that share our vision of positive change through education.' },
    { tone: 'red',    title: 'Sustainability & Impact',  detail: 'Creating long-term value through responsible initiatives that build a better future for generations to come.' },
  ];

  const involvement = [
    { title: 'Partner with us', detail: 'For institutions and organizations whose mission aligns with advancing education across the region.' },
    { title: 'Support a cause', detail: 'Back the initiatives that expand access, strengthen communities, and empower students.' },
    { title: 'Collaborate',     detail: 'For educators and changemakers bringing programs and ideas to the communities we serve.' },
  ];

  return (
    <>
      <PageHero
        image="/redesign-assets/transformation.webp"
        eyebrow="MADAREK Foundation"
        title="Creating lasting impact"
        italicTail="through education."
        lede="Empowering communities and expanding opportunities through meaningful educational initiatives and partnerships."
        tone="pink" />

      {/* Mission — manifesto */}
      <Section bg="paper" className={d.sectionY}>
        <Container max="6xl">
          <Reveal>
            <div className="max-w-4xl">
              <Eyebrow tone="pink">Our mission</Eyebrow>
              <div className="mt-7">
                <Display size="md">Education transforms lives.</Display>
              </div>
              <div className="mt-10">
                <Body size="xl">
                  The MADAREK Foundation reflects our commitment to creating
                  positive and sustainable impact beyond the classroom. Through
                  educational initiatives, community engagement, and strategic
                  collaborations, we empower future generations and contribute to
                  the advancement of the communities we serve — guided by the
                  belief that education has the power to transform lives.
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
                <Eyebrow tone="pink">What we do</Eyebrow>
                <div className="mt-5"><Display size="md">Where we focus.</Display></div>
              </div>
              <div className="max-w-md">
                <Body size="md" muted>
                  Five areas where the Foundation concentrates its programmes,
                  initiatives, and partnerships.
                </Body>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {focusAreas.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.06}>
                <article className="h-full p-8 border flex flex-col" style={{ background: BRAND.paperHi, borderColor: BRAND.rule }}>
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

      {/* Impact — NEEDS FACTS: add real figures (e.g. "12,000+") into the
          `value` field for students reached, communities served, and partner
          organisations once the Madarek team provides them. */}
      <Section bg="ink" className={d.sectionY}>
        <Container>
          <Reveal>
            <div className="mb-14 max-w-2xl">
              <Eyebrow tone="pink">Our impact</Eyebrow>
              <div className="mt-5">
                <Display size="md" style={{ color: BRAND.paperHi }}>Impact that reaches beyond the classroom.</Display>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: withOpacity('paper', 0.14) }}>
            {[
              { value: '', label: 'Students reached',     detail: 'Expanding access to quality learning for students across the region.' },
              { value: '', label: 'Communities served',   detail: 'Strengthening communities through education and engagement.' },
              { value: '', label: 'Partner organisations', detail: 'Collaborating with institutions that share our vision for change.' },
            ].map((it) => (
              <div key={it.label} className="p-8 md:p-10" style={{ background: BRAND.ink }}>
                {it.value && (
                  <div style={{ fontFamily: CARD_HEADING, fontWeight: 300, fontSize: 'clamp(2.6rem, 4.5vw, 3.6rem)', lineHeight: 1, color: BRAND.paperHi }}>{it.value}</div>
                )}
                <h3 className={it.value ? 'mt-5' : ''} style={{ fontFamily: CARD_HEADING, fontWeight: 500, fontSize: 'clamp(1.15rem, 1.6vw, 1.45rem)', lineHeight: 1.2, color: BRAND.paperHi }}>
                  {it.label}
                </h3>
                <div className="mt-3"><Body size="md" style={{ color: withOpacity('paper', 0.72) }}>{it.detail}</Body></div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Vision — cinematic image + statement */}
      <section className="relative w-full h-[70vh] overflow-hidden bg-black">
        <ScrollImage src="/redesign-assets/4.webp" alt="" overlay="hero" />
        <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 md:px-12 pb-16">
          <div className="max-w-3xl">
            <Eyebrow tone="paper">Our vision</Eyebrow>
            <div className="mt-6">
              <Display size="sm" style={{ color: BRAND.paperHi }}>
                To create lasting social impact by empowering communities and
                expanding opportunities through education.
              </Display>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to get involved */}
      <Section bg="paper" className={d.sectionY}>
        <Container>
          <Reveal>
            <div className="mb-14">
              <Eyebrow tone="pink">Get involved</Eyebrow>
              <div className="mt-5"><Display size="md">Be part of the work.</Display></div>
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
            <PillLink to="mailto:foundation@madarek.me" variant="primary" size="md">Partner with the Foundation</PillLink>
          </div>
        </Container>
      </Section>
    </>
  );
}

/* ── Academy page ─────────────────────────────────────────── */
export function AcademyPage() {
  const d = useDensity();
  const programs = [
    { title: 'Student Exchange Programs',      detail: 'Opportunities to engage with peers across the MADAREK ecosystem and beyond — promoting cultural understanding, broader perspectives, and global citizenship.' },
    { title: 'Leadership Development',         detail: 'Mentorship programs, workshops, and experiential learning that cultivate confidence, collaboration, and responsibility in future leaders.' },
    { title: 'Innovation & Entrepreneurship', detail: 'Initiatives that encourage creativity, critical thinking, and problem-solving to inspire the next generation of innovators and changemakers.' },
    { title: 'Academic Enrichment',           detail: 'Competitions, educational camps, workshops, and specialized programs that complement and extend classroom education.' },
    { title: 'Cross-School Collaboration',    detail: 'Shared initiatives, projects, and experiences that connect students and educators across the MADAREK ecosystem.' },
    { title: 'Global Partnerships',           detail: 'Collaborations with leading institutions and organizations that open broader opportunities and exposure to international best practices.' },
  ];

  const outcomes = [
    { title: 'Global perspective', detail: 'Exposure to new cultures, peers, and international best practices.' },
    { title: 'Leadership',         detail: 'Confidence, collaboration, and responsibility built through real experience.' },
    { title: 'Creativity',         detail: 'Critical thinking and problem-solving that inspire changemakers.' },
    { title: 'Belonging',          detail: 'Connection across the MADAREK ecosystem through shared work.' },
  ];

  return (
    <>
      <PageHero
        image="/redesign-assets/5.webp"
        eyebrow="MADAREK Academy"
        title="Learning beyond"
        italicTail="the classroom."
        lede="Inspiring the next generation through enrichment programs, global experiences, and lifelong learning opportunities."
        tone="yellow" />

      {/* Overview */}
      <Section bg="paper" className={d.sectionY}>
        <Container max="6xl">
          <Reveal>
            <div className="max-w-4xl">
              <Eyebrow tone="yellow">Overview</Eyebrow>
              <div className="mt-7">
                <Display size="md">A platform for student enrichment.</Display>
              </div>
              <div className="mt-10">
                <Body size="xl">
                  MADAREK Academy is a platform for enrichment, leadership
                  development, and collaborative experiences that empower students
                  to explore new perspectives and unlock their full potential. By
                  extending learning beyond traditional classrooms, we prepare
                  students to thrive in a globally connected, rapidly evolving
                  world.
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
                <Eyebrow tone="yellow">Programs</Eyebrow>
                <div className="mt-5"><Display size="md">Six ways to grow.</Display></div>
              </div>
              <div className="max-w-md">
                <Body size="md" muted>
                  Enrichment that extends learning beyond the classroom — across
                  the MADAREK ecosystem and around the world.
                </Body>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {programs.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 0.06}>
                <article className="relative h-full overflow-hidden p-8 border" style={{ background: BRAND.paperHi, borderColor: BRAND.rule }}>
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
              <Eyebrow tone="yellow">Who it&apos;s for</Eyebrow>
              <div className="mt-5"><Display size="md">Open to every MADAREK student.</Display></div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: BRAND.rule }}>
            <div className="p-8 md:p-10" style={{ background: BRAND.paper }}>
              <Meta tone="yellow">Who it&apos;s for</Meta>
              <div className="mt-4">
                <Body size="lg" muted>
                  MADAREK Academy is open to students across our schools and the
                  wider community, with programmes designed for a range of ages
                  and stages.
                </Body>
              </div>
            </div>
            <div className="p-8 md:p-10" style={{ background: BRAND.paper }}>
              <Meta tone="yellow">How to join</Meta>
              <div className="mt-4">
                <Body size="lg" muted>
                  Enrolment opens ahead of each programme. To register interest or
                  learn more about dates and eligibility, get in touch with our
                  team.
                </Body>
              </div>
              <div className="mt-7">
                <PillLink to="/contact" variant="primary" size="md">Enquire about enrolment</PillLink>
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
              To inspire lifelong learners and future leaders.
            </Display>
          </div>
          <div className="mt-8 max-w-2xl">
            <Body size="lg" style={{ color: withOpacity('paper', 0.78) }}>
              By creating experiences that extend beyond the classroom and
              prepare students to succeed in an interconnected world.
            </Body>
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
                Let's shape the future<span style={{ fontStyle: 'normal' }}> together.</span>
              </Display>
              <div className="mt-10 max-w-2xl">
                <Body size="lg" style={{ color: withOpacity('paper', 0.85) }}>
                  Whether you are a parent, educator, institution, or strategic
                  partner, we welcome the opportunity to connect and explore how
                  we can create meaningful educational experiences together.
                </Body>
              </div>
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
                  <Meta>General Inquiries</Meta>
                  <div className="mt-2">
                    <Body size="md" muted>For general questions and information, please contact our team.</Body>
                  </div>
                  <div className="mt-2">
                    <Body size="lg">
                      <a href="mailto:info@madarek.me" className="border-b border-current pb-1">info@madarek.me</a>
                    </Body>
                  </div>
                </div>
                <div>
                  <Meta>Partnerships</Meta>
                  <div className="mt-2">
                    <Body size="md" muted>Interested in collaborating with MADAREK? We welcome opportunities to build meaningful partnerships that advance education and create lasting impact.</Body>
                  </div>
                  <div className="mt-2">
                    <Body size="lg">
                      <a href="mailto:partnerships@madarek.me" className="border-b border-current pb-1">partnerships@madarek.me</a>
                    </Body>
                  </div>
                </div>
                <div>
                  <Meta>Careers</Meta>
                  <div className="mt-2">
                    <Body size="md" muted>Join us in shaping the future of learning.</Body>
                  </div>
                  <div className="mt-2">
                    <Body size="lg">
                      <a href="mailto:careers@madarek.me" className="border-b border-current pb-1">careers@madarek.me</a>
                    </Body>
                  </div>
                </div>
                <div>
                  <Meta>Locations</Meta>
                  <div className="mt-2"><Body size="lg">Dubai, UAE · Riyadh, KSA</Body></div>
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

/* ── Leadership page ────────────────────────────────────────── */
type Leader = {
  slug: string; name: string; eyebrow: string; title: string;
  preview: string; bio?: string[]; tone: BrandKey; image: string; email: string; linkedin: string;
};

const LEADERS: Leader[] = [
  {
    slug: 'shukri-mansour',
    name: 'Mr. Shukri A. Mansour',
    eyebrow: 'CEO for MADAREK KSA',
    title: 'Chief Executive Officer',
    preview: 'Leads MADAREK KSA across strategy, operations, and organizational direction.',
    tone: 'cyan',
    image: '/redesign-assets/dr.shukri_ceo_ksa.jpeg',
    email: 'shukri.mansour@madarek.me',
    linkedin: '#',
  },
  {
    slug: 'mohamed-hussein-motawea',
    name: 'Mohamed Hussein Motawea',
    eyebrow: 'CEO for MADAREK UAE',
    title: 'Chief Executive Officer & Schools Director',
    preview: 'Strategic and operational leadership for FEH UAE and Al Maaref American School, with 30+ years transforming schools across the region.',
    bio: [
      "As Chief Executive Officer and Schools Director at First Education Holding (FEH) in the UAE, Mohamed Hussein Motawea provides strategic and operational leadership for Al Maaref American School in Dubai.",
      "With over 30 years of experience transforming schools across the UAE and Egypt — including 15 years in senior leadership — he is widely recognised for building high-performing teams, driving measurable school improvement, and embedding a culture of excellence across entire school communities.",
      "In 2025, he was honoured with the NEASC Commission on International Education Service Award, a prestigious global recognition of his contributions to international education. Among his key achievements, he led Al Zuhour Private School from an 'Acceptable' to a 'Good' rating by SPEA, guiding a community of over 3,000 students and 300 staff through a sustained improvement journey.",
      "He brings deep expertise in UAE regulatory frameworks, including KHDA and SPEA/MOE inspections, as well as international accreditation through NEASC and Cognia. He has served as a NEASC Visiting Team Member and has chaired accreditation visits for international schools across the Gulf and beyond.",
      "He holds a Master's degree in Management from the University of Lincoln, UK, and dual bachelor's degrees in Education and Business & Finance from Alexandria University, and is a licensed School Principal by the UAE Ministry of Education.",
    ],
    tone: 'yellow',
    image: '/redesign-assets/mohammad_motawea_ceo_uae.jpg',
    email: 'mohamed.motawea@madarek.me',
    linkedin: '#',
  },
  {
    slug: 'haris-moideen',
    name: 'Haris Moideen',
    eyebrow: 'Finance Leadership',
    title: 'Acting CFO & Board Secretary',
    preview: 'A Chartered Accountant with over 25 years in finance and governance, overseeing financial management, compliance, and board affairs.',
    bio: [
      "A Chartered Accountant and member of the Institute of Chartered Accountants of India, Haris Moideen brings over 25 years of experience across accounting, finance, and corporate governance.",
      "His career spans respected organisations including ICFAI University, the Arenco Group, and EXL Inc. He joined First Education Holding (FEH) in 2013 and today serves as Acting Chief Financial Officer and Board Secretary, overseeing financial management, compliance, and governance.",
    ],
    tone: 'pink',
    image: '/redesign-assets/haris_cfo.jpeg',
    email: 'haris.moideen@madarek.me',
    linkedin: '#',
  },
];

type BoardMember = { name: string; title: string; image: string };

const BOARD: BoardMember[] = [
  { name: 'Majid Abdulhassan bin Abdulaziz Al Hokair', title: 'Chairman of the Board',      image: '' },
  { name: 'Dr. Sulaiman Tareq Al Abduljader',          title: 'Vice Chairman of the Board', image: '/redesign-assets/Dr. Sulaiman Al Abduljader.png'},
  { name: 'Shukri Abdulfattah Shukri Mansoor',         title: 'Board Member',               image: '/redesign-assets/dr.shukri_ceo_ksa.jpeg' },
  { name: 'Omar Abdulaziz Sulaiman Al Jassar',         title: 'Board Member',               image: '' },
  { name: 'Fahad Abdulrahman Muhammad Albassam',       title: 'Board Member',               image: '' },
  { name: 'Omar Saleh Shayej AlShayeji',               title: 'Board Member',               image: '/redesign-assets/omar_al_shayeji.svg' },
  { name: 'Munirah Adel Ahmad Al Wugayan',             title: 'Board Member',               image: '/redesign-assets/Monira AlWugayan.png' },
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

/* Executives — portrait cards with name + title overlaid, matching the
   Board wall layout. Each card links to the leader's detail page. */
function ExecutiveGrid({ leaders }: { leaders: Leader[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
      {leaders.map((l, i) => (
        <Reveal key={l.slug} delay={(i % 3) * 0.06}>
          <Link
            to={`/about/leadership/${l.slug}`}
            className="group relative block aspect-[3/4] overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:#27C4FF]">
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]">
              <Portrait src={l.image} alt={l.name} name={l.name} tone={l.tone} />
            </div>
            <div className="absolute inset-0 z-20 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(10,12,28,0.92) 0%, rgba(10,12,28,0.45) 32%, rgba(10,12,28,0) 60%)' }} />
            <div className="absolute inset-x-0 bottom-0 z-30 p-5 md:p-6">
              <div style={{ fontFamily: CARD_HEADING, fontWeight: 500, fontSize: 'clamp(1.15rem, 1.6vw, 1.5rem)', lineHeight: 1.15, color: BRAND.paperHi }}>
                {l.name}
              </div>
              <div className="mt-2 font-mono uppercase" style={{ fontSize: 11, letterSpacing: '0.16em', color: withOpacity('paper', 0.72) }}>
                {l.title}
              </div>
            </div>
          </Link>
        </Reveal>
      ))}
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
                <div style={{ fontFamily: 'Plus Jakarta Sans, Inter, ui-sans-serif, sans-serif', fontWeight: 400, fontSize: 'clamp(1.1rem, 1.6vw, 1.5rem)', lineHeight: 1.15, color: BRAND.paperHi }}>
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
        eyebrow="About MADAREK"
        title="Leadership"
        italicTail="guiding the work."
        lede="Governance and executive leadership steering MADAREK's growth, school operations, and long-term education platform strategy."
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
                  The people<span style={{ fontStyle: 'normal', display: 'block' }}>behind the schools.</span>
                </Display>
              </div>
            </div>
          </Reveal>

          <ExecutiveGrid leaders={LEADERS} />
        </Container>
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
                  Board of<span style={{ fontStyle: 'normal' }}> Directors.</span>
                </Display>
                <div className="mt-8 max-w-2xl">
                  <Body size="lg" style={{ color: withOpacity('paper', 0.72) }}>
                    MADAREK's Board provides strategic oversight, governance, and
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
              <Eyebrow tone="paper">About MADAREK</Eyebrow>
              <div className="mt-6">
                <Display size="md" style={{ color: BRAND.paperHi }}>
                  More on<span style={{ fontStyle: 'normal' }}> who we are.</span>
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
      {/* Hero — portrait on dark, name and title beside */}
      <section className="relative w-full pt-44 pb-24 md:pt-52 md:pb-32" style={{ background: BRAND.ink }}>
        <Container>
          <div className="grid grid-cols-12 gap-6 md:gap-12 items-center">
            <div className="col-span-12 md:col-span-4">
              <div
                className="aspect-[4/5] relative overflow-hidden"
                style={{ border: `1px solid ${withOpacity('paper', 0.18)}` }}>
                <Portrait src={leader.image} alt={leader.name} name={leader.name} tone={leader.tone} />
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
                {leader.bio ? (
                  <div className="space-y-6 max-w-3xl">
                    {leader.bio.map((para, i) => (
                      <Body key={i} size={i === 0 ? 'xl' : 'lg'} muted={i !== 0}>{para}</Body>
                    ))}
                  </div>
                ) : (
                  <Body size="xl">{leader.preview}</Body>
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
                <div className="mt-3"><Eyebrow>The team</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Display size="lg">
                  Other<span style={{ fontStyle: 'normal' }}> leaders.</span>
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
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Portrait src={l.image} alt={l.name} name={l.name} tone={l.tone} />
                  </div>
                  <div className="p-6">
                    <Eyebrow tone={l.tone}>{l.eyebrow}</Eyebrow>
                    <div className="mt-3" style={{ fontFamily: 'Plus Jakarta Sans, Inter, ui-sans-serif, sans-serif', fontWeight: 300, fontSize: 22, lineHeight: 1.25, color: BRAND.ink }}>
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
                  Meet the rest<span style={{ fontStyle: 'normal' }}> of the team.</span>
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
        title="Stay"
        italicTail="connected."
        lede="The latest announcements, achievements, partnerships, and stories from across the MADAREK ecosystem."
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

const OPEN_ROLES = [
  { title: 'Head of Secondary',            location: 'Dubai, UAE',           department: 'Academic Leadership', posted: '2 weeks ago' },
  { title: 'Curriculum Lead — Science',    location: 'Riyadh, Saudi Arabia', department: 'Curriculum',          posted: '3 weeks ago' },
  { title: 'IB Coordinator',               location: 'Manama, Bahrain',      department: 'Academic Leadership', posted: '1 month ago' },
  { title: 'Mathematics Teacher',          location: 'Dubai, UAE',           department: 'Teaching',            posted: '2 weeks ago' },
  { title: 'Director of Admissions',       location: 'Riyadh, Saudi Arabia', department: 'Operations',          posted: '1 week ago'  },
  { title: 'Academic Operations Manager',  location: 'Riyadh, Saudi Arabia', department: 'Operations',          posted: '3 weeks ago' },
];

export function CareersPage() {
  const d = useDensity();
  return (
    <>
      <PageHero
        image="/redesign-assets/growth.webp"
        eyebrow="Careers at MADAREK"
        title="Join the future"
        italicTail="of education."
        lede="We attract, develop, and empower talented people who share our passion for education and innovation."
        tone="yellow"
        number={1} />

      <Section bg="paper" className={d.sectionY}>
        <Container max="6xl">
          <Reveal>
            <div className="grid grid-cols-12 gap-6 mb-20">
              <div className="col-span-12 md:col-span-3">
                <SectionNumber n={2} tone="yellow" />
                <div className="mt-3"><Eyebrow tone="yellow">Why Join MADAREK?</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Display size="lg">
                  Four reasons<span style={{ fontStyle: 'normal', display: 'block' }}>to join the team.</span>
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
                <div className="mt-3"><Eyebrow tone="yellow">Life at MADAREK</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Display size="lg">
                  Inside<span style={{ fontStyle: 'normal' }}> the schools.</span>
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
                  Currently<span style={{ fontStyle: 'normal' }}> hiring.</span>
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
                  Don't see<span style={{ fontStyle: 'normal' }}> your role?</span>
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
