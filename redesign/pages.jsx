/* Madarek redesign — secondary pages
   --------------------------------------------------------------
   About, Schools, Foundation, Academy, Contact, SchoolDetail.
   Each page shares the layout law: photography full-bleed alone,
   text breathes alone. Page-level colour codes the section.
*/

const {
  BRAND, useDensity,
  FoldedMark, Eyebrow, SectionNumber,
  Display, Body, Meta,
  Section, Container,
  ScrollImage, ScrollMarquee,
  PillLink, TextLink, Reveal,
} = window.MadarekSystem;

const { useRef, useState } = React;
const { motion, useScroll, useTransform, useInView } = window.Motion;

/* ── page-level cinematic hero — reusable ──────────────────── */
function PageHero({ image, eyebrow, title, italicTail, lede, tone = "ink", number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  return (
    <section ref={ref} className="relative w-full h-screen overflow-hidden bg-black" data-screen-label="Hero">
      <motion.div style={{ y: imgY }} className="absolute inset-0 will-change-transform" aria-hidden="true">
        <img src={image} alt="" className="w-full h-full object-cover scale-110" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,17,15,0.55) 0%, rgba(20,17,15,0.3) 40%, rgba(20,17,15,0.65) 80%, rgba(20,17,15,0.92) 100%)",
          }} />
      </motion.div>

      {/* top corner mark only — eyebrow moves into the bottom stack */}
      <div className="absolute top-32 md:top-36 right-6 md:right-12 z-10">
        <FoldedMark size={48} tone={tone} rotate={-12} opacity={0.85} />
      </div>

      <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 md:px-12 pb-20">
        <div className="max-w-[1400px]">
          <div className="flex items-center gap-3 mb-8">
            {number != null && (
              <span className="font-mono tabular-nums" style={{ fontSize: 11, letterSpacing: "0.18em", color: BRAND[tone], fontWeight: 600 }}>
                {String(number).padStart(2, "0")}
              </span>
            )}
            <Meta tone="paper">{eyebrow}</Meta>
          </div>
          <Display size="lg" style={{ color: BRAND.paperHi }}>
            <span>{title}</span>
            {italicTail && (
              <span style={{ display: "block", fontStyle: "italic" }}>{italicTail}</span>
            )}
          </Display>
          {lede && (
            <div className="mt-8 max-w-2xl">
              <Body size="lg" style={{ color: "rgba(244,237,224,0.85)" }}>{lede}</Body>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── About page ────────────────────────────────────────────── */
function AboutPage() {
  const d = useDensity();

  const values = [
    { tone: "red",    title: "Excellence",      detail: "Striving for the highest standards in curriculum, teaching, and student support." },
    { tone: "yellow", title: "Innovation",      detail: "Embracing forward-thinking approaches to learning." },
    { tone: "cyan",   title: "Inclusivity",     detail: "Creating welcoming communities for every student." },
    { tone: "lime",   title: "Sustainability",  detail: "Designing schools with environmental responsibility in mind." },
  ];

  return (
    <>
      <PageHero
        image="redesign-assets/institutionalization.webp"
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
                  <span style={{ display: "block", fontStyle: "italic", color: BRAND.inkSub }}>not assets.</span>
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

      {/* Values — type-only, no photos */}
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
        <ScrollImage src="redesign-assets/7.webp" alt="" overlay="hero" />
        <div className="absolute inset-0 z-10 flex items-end px-6 md:px-12 pb-16">
          <div className="max-w-3xl">
            <Display size="lg" style={{ color: BRAND.paperHi }}>
              We build for
              <span style={{ fontStyle: "italic" }}> decades, not quarters.</span>
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
            { title: "Responsible investing", body: "Environmental, social, and governance considerations sit inside every operating decision — not alongside them." },
            { title: "Prudent compliance",    body: "A solid governance framework that mitigates risk and protects the schools' long-term independence." },
            { title: "Leadership in education", body: "Convening educators and partners across the GCC to advance what excellent schooling looks like in the region." },
          ].map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="grid grid-cols-12 gap-6 py-10 border-b" style={{ borderColor: BRAND.rule }}>
                <div className="col-span-12 md:col-span-3">
                  <Display size="sm" style={{ fontWeight: 300 }}>{p.title}</Display>
                </div>
                <div className="col-span-12 md:col-span-6 md:col-start-4">
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
                  Meet the people<span style={{ fontStyle: "italic" }}> guiding the work.</span>
                </Display>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 md:text-right">
              <PillLink to="#/about/leadership" variant="invert">View leadership</PillLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

/* ── Schools page ──────────────────────────────────────────── */
function SchoolsPage({ schools }) {
  const d = useDensity();
  return (
    <>
      <PageHero
        image="redesign-assets/1.webp"
        eyebrow="Our Schools"
        title="Three campuses,"
        italicTail="more on the way."
        lede="We operate premium schools across the Gulf. Each campus carries its own character; all share the Madarek framework."
        tone="cyan" />

      {/* Index map — stylised */}
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

      {/* Schools — full-bleed parallax sections, one per school */}
      {schools.map((s, i) => (
        <SchoolParallax key={s.slug} school={s} index={i + 1} reversed={i % 2 === 1} />
      ))}

      {/* Add-school placeholder — shows the design scales */}
      <Section bg="paperLo" className="py-28">
        <Container max="6xl">
          <div className="grid grid-cols-12 gap-6 items-center">
            <div className="col-span-12 md:col-span-3">
              <FoldedMark size={48} tone="cyan" />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Display size="md">
                More campuses<span style={{ fontStyle: "italic" }}> joining the network.</span>
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

/* ── Stylised map of the GCC — schematic, no real cartography ── */
function NetworkMap({ schools }) {
  // hand-positioned points roughly suggesting Dubai / Riyadh
  const points = [
    { x: 78, y: 42, label: "Dubai",  slug: "al-maaref-american-school" },
    { x: 38, y: 36, label: "Riyadh", slug: "mgis-qortuba-campus", offsetLabelY: -16 },
    { x: 42, y: 52, label: "Riyadh", slug: "mgis-digital-city-campus", offsetLabelY: 22 },
  ];
  return (
    <div className="relative w-full aspect-[2/1] border" style={{ borderColor: BRAND.rule, background: BRAND.paperHi }}>
      {/* schematic outline of the Arabian peninsula (very loose) */}
      <svg viewBox="0 0 100 50" className="absolute inset-0 w-full h-full" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M12,6 L34,4 L58,8 L78,6 L90,16 L92,30 L82,46 L66,44 L52,48 L34,40 L18,36 L10,22 Z"
          fill="none"
          stroke={BRAND.rule}
          strokeWidth="0.2"
          opacity="0.8" />
      </svg>

      {/* points */}
      {points.map((p, i) => (
        <a
          key={i}
          href={`#/schools/${p.slug}`}
          className="absolute group"
          style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)" }}>
          <span className="block w-3 h-3 rounded-full" style={{ background: BRAND.cyan, boxShadow: `0 0 0 6px ${BRAND.cyan}33` }} />
          <span
            className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
            style={{ top: p.offsetLabelY != null ? p.offsetLabelY : 18 }}>
            <Meta tone="ink">{p.label}</Meta>
          </span>
        </a>
      ))}

      {/* compass / legend */}
      <div className="absolute bottom-4 right-4 flex items-center gap-3">
        <FoldedMark size={24} tone="cyan" />
        <Meta>{schools.length} schools · GCC</Meta>
      </div>
    </div>
  );
}

function SchoolParallax({ school, index, reversed }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex items-end overflow-hidden bg-black"
      data-screen-label={`${String(index).padStart(2, "0")} ${school.name}`}>
      <motion.div style={{ y }} className="absolute inset-[-15%] will-change-transform" aria-hidden="true">
        <img src={school.image} alt="" className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,17,15,0.3) 0%, rgba(20,17,15,0.1) 40%, rgba(20,17,15,0.6) 75%, rgba(20,17,15,0.9) 100%)",
          }} />
      </motion.div>

      {/* huge number */}
      <div className={`absolute top-32 z-10 pointer-events-none ${reversed ? "right-6 md:right-12" : "left-6 md:left-12"}`}>
        <span
          style={{
            fontFamily: "Fraunces, serif",
            fontWeight: 200,
            fontStyle: "italic",
            fontSize: "clamp(8rem, 16vw, 16rem)",
            lineHeight: 0.9,
            color: "rgba(244,237,224,0.07)",
          }}>
          {String(index).padStart(2, "0")}
        </span>
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`max-w-7xl mx-auto grid grid-cols-12 gap-6 items-end ${reversed ? "text-right" : ""}`}>

          <div className={`col-span-12 ${reversed ? "md:col-start-4" : ""} md:col-span-9`}>
            <div className={`flex items-center gap-3 mb-4 ${reversed ? "justify-end" : ""}`}>
              <FoldedMark size={24} tone="cyan" />
              <Meta tone="paper">{school.location}</Meta>
            </div>
            <Display size="xl" style={{ color: BRAND.paperHi }}>
              {school.name}
            </Display>
            <div className={`mt-8 max-w-2xl ${reversed ? "ml-auto" : ""}`}>
              <Body size="lg" style={{ color: "rgba(244,237,224,0.85)" }}>{school.description}</Body>
            </div>
            <div className={`mt-12 flex flex-wrap gap-6 ${reversed ? "justify-end" : ""}`}>
              <a
                href={`#/schools/${school.slug}`}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-[13px] tracking-[0.14em] uppercase font-medium transition-colors duration-300"
                style={{ background: BRAND.paperHi, color: BRAND.ink }}>
                View school →
              </a>
              {school.website && (
                <a
                  href={school.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F4EDE0]/80 hover:text-[#F4EDE0] transition-colors text-[15px] font-light border-b border-white/30 hover:border-white pb-1">
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
function SchoolDetailPage({ school }) {
  const d = useDensity();
  if (!school) {
    return (
      <Section bg="paper" className="pt-48 pb-32">
        <Container max="5xl">
          <Display size="md">School not found.</Display>
          <div className="mt-8">
            <TextLink to="#/schools" tone="cyan">Back to all schools</TextLink>
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

      <Section bg="paper" className={d.sectionY}>
        <Container max="6xl">
          {/* Facts */}
          <Reveal>
            <div className="grid grid-cols-12 gap-6 mb-24">
              <div className="col-span-12 md:col-span-3">
                <SectionNumber n={1} tone="cyan" />
                <div className="mt-3"><Eyebrow tone="cyan">Facts</Eyebrow></div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { label: "Curriculum", value: school.curriculum },
                    { label: "Ages",       value: school.ages },
                    { label: "Languages",  value: school.languages },
                    { label: "Capacity",   value: school.capacity },
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

          {/* Overview */}
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

          {/* Highlights */}
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
                      <span className="font-mono tabular-nums pt-1" style={{ fontSize: 11, color: BRAND.cyan, letterSpacing: "0.18em" }}>
                        {String(i + 1).padStart(2, "0")}
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

      {/* Gallery — full-bleed strip */}
      <section className="w-full overflow-hidden" style={{ background: BRAND.paperLo }}>
        <div className="py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto mb-10">
            <Eyebrow tone="cyan">Campus gallery</Eyebrow>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory px-6 md:px-12">
            {(school.gallery || []).map((g, i) => (
              <div key={i} className="flex-shrink-0 snap-start w-[300px] md:w-[480px] aspect-[4/3] overflow-hidden">
                <img src={g} alt={`${school.name} ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <Section bg="ink" className="py-24 md:py-32">
        <Container max="6xl">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <Eyebrow tone="paper">Contact</Eyebrow>
            </div>
            <div className="col-span-12 md:col-span-9">
              <Display size="md" style={{ color: BRAND.paperHi }}>
                Interested in<span style={{ fontStyle: "italic" }}> {school.name}?</span>
              </Display>
              <div className="mt-10 space-y-3" style={{ color: "rgba(244,237,224,0.8)" }}>
                <div><Meta tone="paper">Address</Meta><Body style={{ color: "rgba(244,237,224,0.85)" }}>{school.address}</Body></div>
                <div><Meta tone="paper">Email</Meta>
                  <Body style={{ color: "rgba(244,237,224,0.85)" }}>
                    <a href={`mailto:${school.email}`} className="hover:text-white">{school.email}</a>
                  </Body>
                </div>
              </div>
              <div className="mt-12">
                <a
                  href="#/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-[13px] tracking-[0.14em] uppercase font-medium"
                  style={{ background: BRAND.paperHi, color: BRAND.ink }}>
                  Contact admissions
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

/* ── Foundation page ──────────────────────────────────────── */
function FoundationPage() {
  const d = useDensity();
  const pillars = [
    { title: "Scholarships & access",   detail: "Removing financial barriers through merit-based scholarships and need-based support." },
    { title: "Teacher development",     detail: "Continuous professional development and leadership pathways for educators." },
    { title: "Community outreach",      detail: "Partnerships with local organisations to extend educational resources." },
    { title: "Educational research",    detail: "Supporting research that advances teaching practices and student wellbeing." },
  ];
  return (
    <>
      <PageHero
        image="redesign-assets/transformation.webp"
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
                <Display size="lg">Education<span style={{ fontStyle: "italic" }}> transforms lives.</span></Display>
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
                <Display size="lg">Four pillars,<span style={{ fontStyle: "italic" }}> one mission.</span></Display>
              </div>
            </div>
          </Reveal>

          <div className="border-t" style={{ borderColor: BRAND.rule }}>
            {pillars.map((p, i) => (
              <div key={p.title} className="border-b py-12 md:py-16 grid grid-cols-12 gap-6 items-baseline" style={{ borderColor: BRAND.rule }}>
                <div className="col-span-2 md:col-span-1">
                  <span className="font-mono tabular-nums" style={{ fontSize: 13, letterSpacing: "0.18em", color: BRAND.pink, fontWeight: 600 }}>
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
        <ScrollImage src="redesign-assets/4.webp" alt="" overlay="hero" />
        <div className="absolute inset-0 z-10 flex items-end px-6 md:px-12 pb-16">
          <div className="max-w-3xl">
            <Display size="lg" style={{ color: BRAND.paperHi }}>
              Every child<span style={{ fontStyle: "italic" }}> deserves access.</span>
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
                  Partner<span style={{ fontStyle: "italic" }}> with the work.</span>
                </Display>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 md:text-right">
              <a
                href="mailto:foundation@madarek.me"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-[13px] tracking-[0.14em] uppercase font-medium"
                style={{ background: BRAND.paperHi, color: BRAND.ink }}>
                Partner with us
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

/* ── Academy page ─────────────────────────────────────────── */
function AcademyPage() {
  const d = useDensity();
  const highlights = [
    "Professional development",
    "Leadership training",
    "International certification",
    "Career advancement",
  ];
  return (
    <>
      <PageHero
        image="redesign-assets/5.webp"
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
                <Display size="lg">A practice<span style={{ fontStyle: "italic" }}> of teaching well.</span></Display>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: BRAND.rule }}>
            {highlights.map((h, i) => (
              <div key={h} className="py-14 px-8 md:px-12" style={{ background: BRAND.paper }}>
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="font-mono tabular-nums" style={{ fontSize: 11, letterSpacing: "0.18em", color: BRAND.yellow, fontWeight: 600 }}>
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
            {["3.webp", "4.webp", "6.webp", "7.webp"].map((src) => (
              <div key={src} className="flex-shrink-0 snap-start w-[280px] md:w-[440px] aspect-[3/4] overflow-hidden">
                <img src={`redesign-assets/${src}`} alt="" className="w-full h-full object-cover" />
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
              For educators<span style={{ fontStyle: "italic" }}> who want to keep learning.</span>
            </Display>
          </div>
          <div className="mt-10">
            <a
              href="mailto:academy@madarek.me"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-[13px] tracking-[0.14em] uppercase font-medium"
              style={{ background: BRAND.paperHi, color: BRAND.ink }}>
              Express interest
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}

/* ── Contact page ─────────────────────────────────────────── */
function ContactPage() {
  const d = useDensity();
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
                Let's start<span style={{ fontStyle: "italic" }}> a conversation.</span>
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
              <form className="mt-10 space-y-8" onSubmit={(e) => e.preventDefault()}>
                <FormField label="Your name" id="name" />
                <FormField label="Email"     id="email" type="email" />
                <FormField label="I am a..." id="role"
                  options={["Parent", "Educator", "Partner", "Other"]} />
                <FormField label="Message"   id="message" multiline />
                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-[13px] tracking-[0.14em] uppercase font-medium transition-colors"
                    style={{ background: BRAND.ink, color: BRAND.paperHi }}>
                    Send message →
                  </button>
                </div>
              </form>
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

function FormField({ label, id, type = "text", multiline = false, options }) {
  return (
    <div className="border-b pb-3" style={{ borderColor: BRAND.rule }}>
      <label htmlFor={id} className="block mb-2"><Meta>{label}</Meta></label>
      {options ? (
        <select
          id={id}
          className="w-full bg-transparent outline-none py-2"
          style={{ fontFamily: "Fraunces, serif", fontWeight: 300, fontSize: 22, color: BRAND.ink }}>
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : multiline ? (
        <textarea
          id={id}
          rows={4}
          className="w-full bg-transparent outline-none py-2 resize-none"
          style={{ fontFamily: "Fraunces, serif", fontWeight: 300, fontSize: 22, color: BRAND.ink }} />
      ) : (
        <input
          id={id}
          type={type}
          className="w-full bg-transparent outline-none py-2"
          style={{ fontFamily: "Fraunces, serif", fontWeight: 300, fontSize: 22, color: BRAND.ink }} />
      )}
    </div>
  );
}

window.MadarekPages = {
  AboutPage,
  SchoolsPage,
  SchoolDetailPage,
  FoundationPage,
  AcademyPage,
  ContactPage,
};
