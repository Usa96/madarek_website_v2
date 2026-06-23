/* Madarek redesign — Home
   --------------------------------------------------------------
   Single-file home composition. Eight sections stack vertically;
   each follows the layout law: photography goes full-bleed alone,
   text stacks beneath it, no side-by-side. Type and folded
   geometry carry the brand — accents code each section.
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

/* ── 01 · Hero ───────────────────────────────────────────────
   Full-viewport photographic opener. Massive thin display type
   sits low-left; a single primary action. Quiet — the photo
   does the heavy lift. */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const titleY  = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const titleO  = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative w-full h-screen overflow-hidden bg-black" data-screen-label="01 Hero">
      <motion.div
        style={{ scale: imgScale }}
        className="absolute inset-0 will-change-transform"
        aria-hidden="true">
        <img src="redesign-assets/institutionalization.webp" alt="" className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,17,15,0.72) 0%, rgba(20,17,15,0.5) 35%, rgba(20,17,15,0.78) 75%, rgba(20,17,15,0.95) 100%)",
          }} />
      </motion.div>

      {/* top brand bar */}
      <div className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 pt-32 md:pt-36 flex items-center justify-between text-[#F4EDE0]/85">
        <Meta tone="paper">Madarek · Education · GCC</Meta>
        <Meta tone="paper">Est. 2026 · GCC</Meta>
      </div>

      {/* main type */}
      <motion.div
        style={{ y: titleY, opacity: titleO }}
        className="absolute inset-0 z-10 flex flex-col justify-end px-6 md:px-12 pb-24 md:pb-32">
        <div className="max-w-[1400px]">
          <Display size="lg" style={{ color: BRAND.paperHi, fontWeight: 200 }}>
            <span style={{ display: "block" }}>Shaping the future</span>
            <span style={{ display: "block", fontStyle: "italic", color: BRAND.paperHi }}>
              of learning.
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
        <FoldedMark size={56} tone="cyan" rotate={-12} opacity={0.7} />
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-8 left-6 md:left-12 z-20 flex items-center gap-3 text-[#F4EDE0]/60">
        <span className="block w-px h-12 bg-current animate-[fall_2s_ease-in-out_infinite]" />
        <Meta tone="paper">Scroll</Meta>
      </div>
    </section>
  );
}

/* ── 02 · About — typographic statement only.
   Resolves audit F-02 / F-10 / the "no text-next-to-image" law:
   pure type, full-width, generous breathing room. */
function AboutSection() {
  const d = useDensity();
  return (
    <Section id="about" bg="paper" className={`${d.sectionY}`}>
      <Container>
        <Reveal>
          <div className="grid grid-cols-12 gap-6 mb-16">
            <div className="col-span-12 md:col-span-3">
              <SectionNumber n={2} tone="ink" />
              <div className="mt-3"><Eyebrow tone="ink">About Madarek</Eyebrow></div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <Display size="lg" italic={false}>
                A regional education
                <span style={{ fontStyle: "italic", color: BRAND.inkSub }}> platform.</span>
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
                MADAREK brings together a growing ecosystem of educational
                institutions united by a shared commitment to academic
                excellence, student development, and responsible growth. Through
                internationally recognized curricula and future-focused learning
                environments, we aim to empower learners and contribute
                meaningfully to the communities we serve.
              </Body>
              <div className="mt-12">
                <TextLink to="#/about" tone="ink">Read the full story</TextLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ── 03 · The Framework — interactive expandable pillars
   Resolves F-23 (give the framework a real home) and acts as the
   showpiece interaction. Four pillars sit collapsed by default;
   clicking one expands its detail in place. */
function FrameworkSection() {
  const [active, setActive] = useState(0);
  const d = useDensity();

  const pillars = [
    {
      tone: "red",
      title: "Educational Excellence",
      lede: "High-quality learning that develops the whole student.",
      detail:
        "Delivering high-quality learning experiences that foster academic achievement, critical thinking, and holistic development.",
      meta: ["Academic achievement", "Critical thinking", "Holistic development"],
    },
    {
      tone: "yellow",
      title: "Innovation",
      lede: "Future-ready environments built on creativity and technology.",
      detail:
        "Creating future-ready learning environments that embrace technology, creativity, and new approaches to education.",
      meta: ["Technology", "Creativity", "New approaches"],
    },
    {
      tone: "cyan",
      title: "Regional Growth",
      lede: "A leading education ecosystem across the GCC and beyond.",
      detail:
        "Building a leading education ecosystem through strategic expansion, partnerships, and collaboration across the GCC and beyond.",
      meta: ["Strategic expansion", "Partnerships", "GCC & beyond"],
    },
    {
      tone: "lime",
      title: "Lasting Impact",
      lede: "Positive, sustainable outcomes for generations to come.",
      detail:
        "Creating positive and sustainable outcomes for students, educators, communities, and future generations.",
      meta: ["Students & educators", "Communities", "Future generations"],
    },
  ];

  return (
    <Section id="framework" bg="paperLo" className={d.sectionY}>
      <Container>
        <Reveal>
          <div className="grid grid-cols-12 gap-6 mb-24">
            <div className="col-span-12 md:col-span-3">
              <SectionNumber n={3} tone="ink" />
              <div className="mt-3"><Eyebrow>Our Four Pillars</Eyebrow></div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <Display size="lg">
                <span>Four pillars.</span>
                <span style={{ display: "block", fontStyle: "italic", color: BRAND.inkSub }}>One direction.</span>
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
                style={{ borderColor: BRAND.rule, background: isOpen ? BRAND.paper : "transparent" }}>
                <button
                  type="button"
                  onClick={() => setActive(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="w-full text-left py-10 md:py-14 px-2 md:px-6 grid grid-cols-12 gap-6 items-baseline group">
                  <div className="col-span-2 md:col-span-1 flex items-center gap-4">
                    <span
                      className="font-mono tabular-nums"
                      style={{ fontSize: 13, letterSpacing: "0.18em", color: BRAND[p.tone], fontWeight: 600 }}>
                      0{i + 1}
                    </span>
                  </div>
                  <div className="col-span-10 md:col-span-7">
                    <Display
                      size={isOpen ? "md" : "sm"}
                      italic={isOpen}
                      style={{
                        color: BRAND.ink,
                        transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
                      }}>
                      {p.title}
                    </Display>
                  </div>
                  <div className="col-span-12 md:col-span-3 hidden md:block">
                    <Body size="sm" muted>{p.lede}</Body>
                  </div>
                  <div className="col-span-12 md:col-span-1 flex md:justify-end">
                    <FoldedMark size={isOpen ? 56 : 36} tone={p.tone} rotate={isOpen ? 24 : -8} />
                  </div>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: "hidden" }}>
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

/* ── 04 · Full-bleed image moment + marquee.
   The first "cinematic" breath — full-viewport photograph
   followed by an oversize italic statement that pans on scroll. */
function CinematicMoment() {
  return (
    <section className="relative w-full" data-screen-label="04 Cinematic moment">
      <div className="relative h-screen w-full overflow-hidden">
        <ScrollImage
          src="redesign-assets/2.webp"
          alt=""
          overlay="cinematic"
          priority />
        <div className="absolute inset-0 z-10 flex items-end px-6 md:px-12 pb-16">
          <div className="max-w-3xl">
            <Eyebrow tone="cyan" className="text-[#F4EDE0]/80">A school is a place</Eyebrow>
            <div className="mt-6">
              <Display size="lg" style={{ color: BRAND.paperHi }} italic={false}>
                where every student is
                <span style={{ fontStyle: "italic" }}> known.</span>
              </Display>
            </div>
          </div>
        </div>
      </div>

      <div className="relative py-24 md:py-40 overflow-hidden" style={{ background: BRAND.paper }}>
        <ScrollMarquee tone="ink" size="xxl" italic>
          rigour · care · cultural fluency · rigour · care · cultural fluency ·&nbsp;
        </ScrollMarquee>
      </div>
    </section>
  );
}

/* ── 05 · Schools — extensible grid.
   Resolves the requirement that more schools can be added. The
   grid auto-flows; the layout looks intentional at 1, 3, 6, or 9
   schools. Each card is hero-treated photographically. */
function SchoolsSection({ schools }) {
  const d = useDensity();
  return (
    <Section id="schools" bg="paper" className={d.sectionY}>
      <Container>
        <Reveal>
          <div className="grid grid-cols-12 gap-6 mb-20 items-end">
            <div className="col-span-12 md:col-span-3">
              <SectionNumber n={5} tone="cyan" />
              <div className="mt-3"><Eyebrow tone="cyan">Our Schools</Eyebrow></div>
            </div>
            <div className="col-span-12 md:col-span-7">
              <Display size="lg">
                <span>Three campuses,</span>
                <span style={{ display: "block", fontStyle: "italic", color: BRAND.inkSub }}>more on the way.</span>
              </Display>
            </div>
            <div className="col-span-12 md:col-span-2 md:text-right">
              <TextLink to="#/schools" tone="cyan">All schools</TextLink>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.map((s, i) => (
            <SchoolCard key={s.slug} school={s} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function SchoolCard({ school, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  return (
    <motion.a
      ref={ref}
      href={`#/schools/${school.slug}`}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className="group block">
      <div className="relative aspect-[4/5] overflow-hidden mb-6">
        <ScrollImage src={school.image} alt={school.name} overlay="editorial" />
        <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
          <span
            className="font-mono tabular-nums px-2 py-1 text-[10px] tracking-[0.2em]"
            style={{ color: BRAND.paperHi, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <Meta tone="paper">{school.location}</Meta>
        </div>
        <div className="absolute bottom-5 left-5 right-5 z-10 flex justify-between items-end">
          <Display size="sm" style={{ color: BRAND.paperHi }} as="h3">
            {school.short}
          </Display>
          <span className="text-[#F4EDE0] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">→</span>
        </div>
      </div>
      <Body size="sm" muted>{school.curriculum} · {school.ages}</Body>
    </motion.a>
  );
}

/* ── 06 · Innovation — numbered editorial list, type-only. */
function InnovationSection() {
  const items = [
    { title: "Student-Centered Learning", note: "Placing students at the heart of the educational journey and fostering environments that encourage curiosity, creativity, and personal growth." },
    { title: "Innovation in Education",   note: "Embracing technology and modern teaching methodologies to prepare learners for the future." },
    { title: "Global Standards",         note: "Delivering internationally recognized curricula and best practices that support academic excellence." },
    { title: "Holistic Development",     note: "Supporting academic, personal, social, and emotional growth to develop well-rounded individuals." },
  ];
  const d = useDensity();
  return (
    <Section id="innovation" bg="paperHi" className={d.sectionY}>
      <Container max="6xl">
        <Reveal>
          <div className="mb-16">
            <SectionNumber n={6} tone="yellow" />
            <div className="mt-3 mb-8"><Eyebrow tone="yellow">Educational Excellence</Eyebrow></div>
            <Display size="lg">
              A commitment to
              <span style={{ display: "block", fontStyle: "italic", color: BRAND.inkSub }}>lifelong learning.</span>
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
          {items.map((it, i) => (
            <div key={it.title} className="border-b py-10 md:py-14 grid grid-cols-12 gap-6 items-baseline" style={{ borderColor: BRAND.rule }}>
              <div className="col-span-2 md:col-span-1">
                <span className="font-mono tabular-nums" style={{ fontSize: 13, letterSpacing: "0.18em", color: BRAND.yellow, fontWeight: 600 }}>
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

/* ── 07 · Foundation — full-bleed photo + paragraph below.
   Pink-coded. No side-by-side. */
function FoundationSection() {
  return (
    <section id="foundation" className="relative w-full" data-screen-label="07 Foundation" style={{ background: BRAND.paper }}>
      <div className="relative h-[85vh] w-full overflow-hidden">
        <ScrollImage src="redesign-assets/transformation.webp" alt="" overlay="hero" />
        <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 md:px-12 pb-16">
          <div className="flex items-center gap-3 mb-6">
            <FoldedMark size={36} tone="pink" rotate={20} />
            <Meta tone="paper">Madarek Foundation</Meta>
          </div>
          <Display size="lg" style={{ color: BRAND.paperHi }}>
            <span>Building futures</span>
            <span style={{ display: "block", fontStyle: "italic" }}>beyond the classroom.</span>
          </Display>
        </div>
      </div>

      <Container max="6xl" className="py-24 md:py-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <SectionNumber n={7} tone="pink" />
          </div>
          <div className="col-span-12 md:col-span-9">
            <Body size="xl" muted={false}>
              The MADAREK Foundation reflects our commitment to creating
              positive and sustainable impact beyond the classroom — empowering
              communities and expanding opportunities through meaningful
              educational initiatives and partnerships.
            </Body>
            <div className="mt-12">
              <TextLink to="#/foundation" tone="pink">Explore the Foundation</TextLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ── 08 · Academy — yellow-coded, photo grid below copy.
   Stacked, not side-by-side. */
function AcademySection() {
  const d = useDensity();
  return (
    <Section id="academy" bg="paperLo" className={d.sectionY}>
      <Container>
        <Reveal>
          <div className="grid grid-cols-12 gap-6 mb-20">
            <div className="col-span-12 md:col-span-3">
              <SectionNumber n={8} tone="yellow" />
              <div className="mt-3"><Eyebrow tone="yellow">Madarek Academy</Eyebrow></div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <Display size="lg">
                Learning beyond
                <span style={{ display: "block", fontStyle: "italic", color: BRAND.inkSub }}>the classroom.</span>
              </Display>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {["3.webp", "4.webp", "5.webp"].map((src, i) => (
            <div key={src} className="relative aspect-[4/5] overflow-hidden" style={{ marginTop: i === 1 ? "4rem" : 0 }}>
              <ScrollImage src={`redesign-assets/${src}`} alt="" overlay="editorial" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-6 md:col-start-4">
            <Body size="xl">
              MADAREK Academy inspires the next generation through enrichment
              programs, global experiences, and lifelong learning opportunities —
              a platform for enrichment, leadership development, and
              collaborative experiences that empower students to explore new
              perspectives and unlock their full potential.
            </Body>
            <div className="mt-10">
              <TextLink to="#/academy" tone="yellow">Inside the Academy</TextLink>
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
    <Section id="contact-cta" bg="ink" className={d.sectionY} tone="ink">
      <Container max="7xl">
        <Reveal>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <SectionNumber n={9} tone="paper" />
              <div className="mt-3"><Eyebrow tone="paper">Get in touch</Eyebrow></div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <Display size="lg" style={{ color: BRAND.paperHi }}>
                Let's shape the future<span style={{ fontStyle: "italic" }}> together.</span>
              </Display>
              <div className="mt-12 max-w-2xl">
                <Body size="lg" style={{ color: "rgba(244,237,224,0.78)" }}>
                  Whether you are a parent, educator, institution, or strategic
                  partner, we welcome the opportunity to connect and explore how
                  we can create meaningful educational experiences together.
                </Body>
              </div>
              <div className="mt-12 flex flex-wrap items-center gap-8">
                <a
                  href="#/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-[13px] tracking-[0.14em] uppercase font-medium transition-colors duration-300"
                  style={{ background: BRAND.paperHi, color: BRAND.ink }}>
                  Contact Madarek
                </a>
                <a
                  href="mailto:info@madarek.me"
                  className="text-[#F4EDE0]/80 hover:text-[#F4EDE0] transition-colors text-[15px] font-light border-b border-white/30 hover:border-white pb-1">
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
function HomePage({ schools }) {
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

window.MadarekHome = HomePage;
