/* Madarek redesign — header, footer, routing shell, density tweak.
   --------------------------------------------------------------
   Loads after system.jsx, home.jsx, pages.jsx and data.js.
*/

const {
  BRAND, DensityCtx,
  FoldedMark, Meta,
} = window.MadarekSystem;

const HomePage = window.MadarekHome;
const { AboutPage, SchoolsPage, SchoolDetailPage, FoundationPage, AcademyPage, ContactPage } = window.MadarekPages;
const { schools } = window.MadarekData;

const { useState, useEffect, useRef } = React;
const { motion, AnimatePresence } = window.Motion;

/* ── density tweak default ───────────────────────────────── */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "density": "editorial"
}/*EDITMODE-END*/;

/* ── tiny hash router ────────────────────────────────────── */
function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash.replace(/^#/, "") || "/");
  useEffect(() => {
    const on = () => setHash(window.location.hash.replace(/^#/, "") || "/");
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  // scroll to top on route change
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [hash]);
  return hash;
}

/* ── header ──────────────────────────────────────────────── */
function Header({ route }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 80);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [route]);

  const links = [
    { to: "/",            label: "Home" },
    { to: "/about",       label: "About" },
    { to: "/schools",     label: "Schools" },
    { to: "/foundation",  label: "Foundation" },
    { to: "/academy",     label: "Academy" },
    { to: "/contact",     label: "Contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[800] transition-all duration-500 ${scrolled ? "py-3" : "py-6"}`}
        style={{
          background: scrolled ? "rgba(20,17,15,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? `1px solid rgba(244,237,224,0.08)` : "1px solid transparent",
        }}>
        <div className="px-6 md:px-12 flex items-center justify-between">
          <a href="#/" className="flex items-center gap-3" aria-label="Madarek home">
            <FoldedMark size={28} tone="paper" rotate={-8} opacity={0.95} />
            <span
              className="font-serif italic"
              style={{ fontSize: 22, fontWeight: 300, letterSpacing: "-0.01em", color: BRAND.paperHi }}>
              Madarek
            </span>
          </a>

          {/* desktop nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {links.map((l) => {
              const isActive = (l.to === "/" ? route === "/" : route.startsWith(l.to));
              return (
                <a
                  key={l.to}
                  href={`#${l.to}`}
                  className="relative py-2 transition-colors"
                  style={{
                    color: isActive ? BRAND.paperHi : "rgba(244,237,224,0.7)",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                    letterSpacing: "0.04em",
                    fontWeight: 400,
                  }}>
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="navActive"
                      className="absolute -bottom-0.5 left-0 right-0 h-px"
                      style={{ background: BRAND.cyan }} />
                  )}
                </a>
              );
            })}
            <a
              href="#/contact"
              className="ml-4 px-5 py-2 rounded-full transition-colors"
              style={{
                background: BRAND.paperHi,
                color: BRAND.ink,
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}>
              Enquire
            </a>
          </nav>

          {/* mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex items-center gap-2 py-2"
            style={{ color: BRAND.paperHi }}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}>
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase">{menuOpen ? "Close" : "Menu"}</span>
            <div className="flex flex-col gap-1">
              <span className="block w-5 h-px" style={{ background: BRAND.paperHi, transform: menuOpen ? "rotate(45deg) translateY(2px)" : "none", transition: "transform 0.3s" }} />
              <span className="block w-5 h-px" style={{ background: BRAND.paperHi, transform: menuOpen ? "rotate(-45deg) translateY(-2px)" : "none", transition: "transform 0.3s" }} />
            </div>
          </button>
        </div>
      </header>

      {/* mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[750] flex flex-col items-start justify-center px-6 md:px-12 gap-4"
            style={{ background: BRAND.ink }}>
            {links.map((l, i) => (
              <motion.a
                key={l.to}
                href={`#${l.to}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "Fraunces, serif",
                  fontWeight: 200,
                  fontStyle: "italic",
                  fontSize: "clamp(2.5rem, 8vw, 5rem)",
                  color: BRAND.paperHi,
                  lineHeight: 1,
                }}>
                {l.label}.
              </motion.a>
            ))}
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
            <div className="flex items-center gap-3 mb-8">
              <FoldedMark size={32} tone="paper" rotate={-8} />
              <span style={{ fontFamily: "Fraunces, serif", fontStyle: "italic", fontWeight: 300, fontSize: 24, color: BRAND.paperHi }}>
                Madarek
              </span>
            </div>
            <div className="max-w-sm" style={{ color: "rgba(244,237,224,0.7)", fontWeight: 300, fontSize: 16, lineHeight: 1.5 }}>
              A community of schools across the Gulf, dedicated to academic
              excellence, the whole child, and lasting educational impact.
            </div>
          </div>

          <div className="col-span-6 md:col-span-3 md:col-start-7">
            <Meta tone="paper">Explore</Meta>
            <ul className="mt-6 space-y-3">
              {[
                ["/", "Home"],
                ["/about", "About"],
                ["/schools", "Schools"],
                ["/foundation", "Foundation"],
                ["/academy", "Academy"],
                ["/contact", "Contact"],
              ].map(([to, label]) => (
                <li key={to}>
                  <a href={`#${to}`}
                     style={{ color: "rgba(244,237,224,0.8)", fontWeight: 300, fontSize: 15 }}
                     className="hover:text-white">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-3">
            <Meta tone="paper">Get in touch</Meta>
            <ul className="mt-6 space-y-3">
              <li>
                <a href="mailto:info@madarek.me"
                   style={{ color: "rgba(244,237,224,0.8)", fontWeight: 300, fontSize: 15 }}
                   className="hover:text-white">info@madarek.me</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/madarek" target="_blank" rel="noopener noreferrer"
                   style={{ color: "rgba(244,237,224,0.8)", fontWeight: 300, fontSize: 15 }}
                   className="hover:text-white">LinkedIn</a>
              </li>
              <li>
                <a href="https://www.instagram.com/madarek" target="_blank" rel="noopener noreferrer"
                   style={{ color: "rgba(244,237,224,0.8)", fontWeight: 300, fontSize: 15 }}
                   className="hover:text-white">Instagram</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-start md:items-center gap-3" style={{ borderColor: "rgba(244,237,224,0.12)" }}>
          <span style={{ color: "rgba(244,237,224,0.55)", fontSize: 13, fontWeight: 300 }}>
            © {new Date().getFullYear()} Madarek Education · Doha, Qatar
          </span>
          <div className="flex gap-6">
            <a href="#/privacy" style={{ color: "rgba(244,237,224,0.55)", fontSize: 13, fontWeight: 300 }} className="hover:text-white">Privacy</a>
            <a href="#/terms"   style={{ color: "rgba(244,237,224,0.55)", fontSize: 13, fontWeight: 300 }} className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── route resolver ──────────────────────────────────────── */
function routeMatch(route) {
  if (route === "/" || route === "")        return { kind: "home" };
  if (route === "/about")                   return { kind: "about" };
  if (route === "/about/leadership")        return { kind: "about" };
  if (route === "/schools")                 return { kind: "schools" };
  if (route.startsWith("/schools/")) {
    const slug = route.slice("/schools/".length);
    return { kind: "school-detail", slug };
  }
  if (route === "/foundation")              return { kind: "foundation" };
  if (route === "/academy")                 return { kind: "academy" };
  if (route === "/contact")                 return { kind: "contact" };
  if (route === "/privacy" || route === "/terms") return { kind: "stub", title: route.slice(1) };
  return { kind: "home" };
}

function StubPage({ title }) {
  return (
    <section style={{ background: BRAND.paper }} className="min-h-screen flex items-center justify-center pt-48 pb-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <Meta>Placeholder</Meta>
        <div className="mt-6">
          <div style={{ fontFamily: "Fraunces, serif", fontWeight: 200, fontStyle: "italic", fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: 1 }}>
            {title}.
          </div>
        </div>
        <div className="mt-8" style={{ color: BRAND.inkSub, fontWeight: 300, fontSize: 18 }}>
          This page exists in the structure but isn't a redesign focus area.
        </div>
      </div>
    </section>
  );
}

/* ── tweaks panel for density ────────────────────────────── */
function TweaksHost({ density, setDensity }) {
  const [available, setAvailable] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onMsg = (e) => {
      if (!e.data || typeof e.data !== "object") return;
      if (e.data.type === "__activate_edit_mode")   setOpen(true);
      if (e.data.type === "__deactivate_edit_mode") setOpen(false);
    };
    window.addEventListener("message", onMsg);
    // announce availability AFTER listener wired
    try {
      window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    } catch (e) {}
    setAvailable(true);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const persist = (val) => {
    setDensity(val);
    try {
      window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { density: val } }, "*");
    } catch (e) {}
  };

  const close = () => {
    setOpen(false);
    try { window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*"); } catch (e) {}
  };

  if (!available || !open) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-[850] p-6 w-[280px]"
      style={{ background: BRAND.paperHi, border: `1px solid ${BRAND.rule}`, boxShadow: "0 20px 50px rgba(20,17,15,0.18)" }}>
      <div className="flex items-center justify-between mb-5">
        <span style={{ fontFamily: "Fraunces, serif", fontWeight: 300, fontStyle: "italic", fontSize: 18, color: BRAND.ink }}>
          Tweaks
        </span>
        <button onClick={close} aria-label="Close" className="text-[20px] leading-none" style={{ color: BRAND.inkSub }}>×</button>
      </div>
      <Meta>Section density</Meta>
      <div className="mt-3 flex flex-col gap-2">
        {[
          { v: "tight",     label: "Tight",     desc: "Compact, dense" },
          { v: "spacious",  label: "Spacious",  desc: "Balanced" },
          { v: "editorial", label: "Editorial", desc: "Magazine-pace" },
        ].map((opt) => {
          const active = density === opt.v;
          return (
            <button
              key={opt.v}
              onClick={() => persist(opt.v)}
              className="text-left p-3 transition-colors"
              style={{
                background: active ? BRAND.ink : "transparent",
                color: active ? BRAND.paperHi : BRAND.ink,
                border: `1px solid ${active ? BRAND.ink : BRAND.rule}`,
              }}>
              <div style={{ fontFamily: "Fraunces, serif", fontWeight: 300, fontStyle: "italic", fontSize: 18 }}>{opt.label}</div>
              <div style={{ fontSize: 11, letterSpacing: "0.08em", fontFamily: "Inter, sans-serif", opacity: 0.7, marginTop: 2 }}>
                {opt.desc}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── app ─────────────────────────────────────────────────── */
function App() {
  const route = useHashRoute();
  const match = routeMatch(route);
  const [density, setDensity] = useState(TWEAK_DEFAULTS.density);

  let page;
  if (match.kind === "home")            page = <HomePage schools={schools} />;
  else if (match.kind === "about")      page = <AboutPage />;
  else if (match.kind === "schools")    page = <SchoolsPage schools={schools} />;
  else if (match.kind === "school-detail") {
    const school = schools.find((s) => s.slug === match.slug);
    page = <SchoolDetailPage school={school} />;
  }
  else if (match.kind === "foundation") page = <FoundationPage />;
  else if (match.kind === "academy")    page = <AcademyPage />;
  else if (match.kind === "contact")    page = <ContactPage />;
  else                                  page = <StubPage title={match.title} />;

  return (
    <DensityCtx.Provider value={density}>
      <Header route={route} />
      <main>{page}</main>
      <Footer />
      <TweaksHost density={density} setDensity={setDensity} />
    </DensityCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
