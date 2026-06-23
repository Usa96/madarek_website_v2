/* Madarek — Schools presence explorer
   --------------------------------------------------------------
   A single-page schools experience adapted to the Madarek editorial
   brand: a stats band, an interactive Leaflet map on the CARTO
   light basemap, a card grid of campuses, and a slide-up detail
   panel that opens per school (from a card or a map marker). */

import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MapContainer, TileLayer, Marker as LeafletMarker, Popup, ZoomControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  BRAND, useDensity, withOpacity,
  FoldedMark, Eyebrow, Display, Body, Meta,
  Section, Container, PillLink, Reveal,
} from './system';
import type { School } from './data';

/* Per-campus coordinates [lat, lng]. Approximate district locations —
   close enough for the regional view, distinct so the two Riyadh
   campuses don't sit on top of each other when zoomed in. */
const SCHOOL_COORDS: Record<string, [number, number]> = {
  'al-maaref-american-school': [25.07, 55.20],                              // Al Barsha South, Dubai
  'mgis-qortuba-campus':       [24.829437757593478, 46.735842761882715],   // Qortuba, Riyadh
  'mgis-digital-city-campus':  [24.941964504366457, 46.619633675896566],   // Digital City, Riyadh
};

const OVERVIEW_CENTER: [number, number] = [24.8, 50.2];
const OVERVIEW_ZOOM = 5.4;
const FOCUS_ZOOM = 11;

const cityOf = (s: School) => s.location.split(',')[0].trim();
const countryOf = (s: School) => (s.location.split(',')[1] || '').trim();

/* ── presence explorer ─────────────────────────────────────── */
export function SchoolsExplorer({ schools }: { schools: School[] }) {
  const d = useDensity();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);   // hover highlight
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null); // map focus + popup
  const [viewingSlug, setViewingSlug] = useState<string | null>(null);  // full detail overlay

  const viewing = schools.find((s) => s.slug === viewingSlug) || null;

  // Stats — derived from real data, no fabricated figures.
  const cities = new Set(schools.map(cityOf));
  const countries = new Set(schools.map(countryOf).filter(Boolean));
  const curricula = new Set(schools.map((s) => s.curriculum.split(' ')[0]));
  const stats = [
    { value: String(schools.length).padStart(2, '0'), label: 'Campuses' },
    { value: String(cities.size).padStart(2, '0'),    label: 'Cities' },
    { value: String(countries.size).padStart(2, '0'), label: 'Countries' },
    { value: String(curricula.size).padStart(2, '0'), label: 'Curricula' },
  ];

  return (
    <Section bg="paper" className={d.sectionY}>
      <Container>
        {/* Header + stats band */}
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-14">
            <div className="max-w-2xl">
              <Eyebrow tone="cyan">Our presence</Eyebrow>
              <div className="mt-6">
                <Display size="lg">
                  Growing across<span style={{ fontStyle: 'normal', color: BRAND.inkSub }}> the Gulf.</span>
                </Display>
              </div>
              <div className="mt-6">
                <Body size="lg" muted>
                  We operate three premium campuses across the UAE and Saudi
                  Arabia — each carrying its own character, all sharing the
                  Madarek framework, with more on the way.
                </Body>
              </div>
            </div>

            <div
              className="grid grid-cols-2 sm:grid-cols-4 lg:flex gap-x-10 gap-y-6 p-7 border"
              style={{ background: BRAND.paperHi, borderColor: BRAND.rule }}>
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span style={{ fontFamily: 'Plus Jakarta Sans, Inter, ui-sans-serif, sans-serif', fontWeight: 300, fontSize: 34, lineHeight: 1, color: BRAND.ink }}>
                    {s.value}
                  </span>
                  <span className="mt-2"><Meta>{s.label}</Meta></span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Interactive map */}
        <Reveal>
          <PresenceMap
            schools={schools}
            activeSlug={activeSlug}
            selectedSlug={selectedSlug}
            onFocus={(slug) => setSelectedSlug(slug)}
            onClearFocus={(slug) => setSelectedSlug((cur) => (cur === slug ? null : cur))}
            onHover={(slug) => setActiveSlug(slug)}
            onViewDetails={(slug) => setViewingSlug(slug)} />
        </Reveal>

        {/* Campus cards */}
        <div className="mt-16 md:mt-20">
          <Reveal>
            <h3
              className="flex items-center gap-5 mb-10"
              style={{ fontFamily: 'Plus Jakarta Sans, Inter, ui-sans-serif, sans-serif', fontWeight: 300, fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)', color: BRAND.ink }}>
              Our campuses
              <span className="h-px flex-1" style={{ background: BRAND.rule }} />
            </h3>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schools.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.06}>
                <SchoolCard
                  school={s}
                  active={activeSlug === s.slug}
                  onOpen={() => setViewingSlug(s.slug)}
                  onHover={(on) => setActiveSlug(on ? s.slug : null)} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>

      {/* Slide-up detail overlay */}
      <AnimatePresence>
        {viewing && <SchoolDetailOverlay school={viewing} onClose={() => setViewingSlug(null)} />}
      </AnimatePresence>
    </Section>
  );
}

/* Flies the map to the focused campus (and zooms in) whenever the
   selected coordinates change. Guards against acting on a torn-down
   map when leaving the page. */
function MapController({ target }: { target: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (!target) return;
    let cancelled = false;
    const raf = requestAnimationFrame(() => {
      if (cancelled) return;
      try { map.stop(); map.flyTo(target, FOCUS_ZOOM, { duration: 1.2 }); } catch { /* map gone */ }
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      try { map.stop(); } catch { /* noop */ }
    };
  }, [target, map]);
  return null;
}

/* ── Leaflet map on the CARTO light basemap ────────────────── */
function PresenceMap({
  schools,
  activeSlug,
  selectedSlug,
  onFocus,
  onClearFocus,
  onHover,
  onViewDetails,
}: {
  schools: School[];
  activeSlug: string | null;
  selectedSlug: string | null;
  onFocus: (slug: string) => void;
  onClearFocus: (slug: string) => void;
  onHover: (slug: string | null) => void;
  onViewDetails: (slug: string) => void;
}) {
  const located = schools.filter((s) => SCHOOL_COORDS[s.slug]);
  const markerRefs = useRef<Record<string, L.Marker>>({});

  // Cyan pulse pin as a Leaflet divIcon. Recreated when highlighted so
  // the active/selected campus scales up.
  const makeIcon = (highlight: boolean) =>
    L.divIcon({
      className: 'madarek-marker',
      html:
        `<span style="position:relative;display:block;width:18px;height:18px;">` +
          `<span style="position:absolute;inset:-7px;border-radius:9999px;background:rgba(39,196,255,0.30);animation:marker-pulse 2.2s ease-out infinite;"></span>` +
          `<span style="position:absolute;inset:0;border-radius:9999px;background:#27C4FF;border:2px solid #fff;box-shadow:0 2px 6px rgba(10,14,28,0.35);transform:scale(${highlight ? 1.4 : 1});transition:transform .3s ease;"></span>` +
        `</span>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });

  // Keep the map within the Gulf region.
  const maxBounds = useMemo(
    () => L.latLngBounds(L.latLng(12, 33), L.latLng(36, 66)),
    [],
  );

  // Open the popup for the selected campus — covers selection from the
  // legend, where no marker was clicked.
  useEffect(() => {
    if (!selectedSlug) return;
    const m = markerRefs.current[selectedSlug];
    if (m) { try { m.openPopup(); } catch { /* not ready */ } }
  }, [selectedSlug]);

  const target = selectedSlug ? SCHOOL_COORDS[selectedSlug] : null;

  return (
    <figure
      className="relative w-full overflow-hidden border rounded-2xl"
      style={{ borderColor: BRAND.rule, height: 'clamp(380px, 56vw, 540px)', zIndex: 0, boxShadow: '0 24px 60px -24px rgba(10,14,28,0.28)' }}
      aria-label={`Map of the Gulf showing ${located.length} Madarek campuses`}>
      <MapContainer
        center={OVERVIEW_CENTER}
        zoom={OVERVIEW_ZOOM}
        minZoom={4}
        maxZoom={13}
        maxBounds={maxBounds}
        maxBoundsViscosity={1}
        scrollWheelZoom={false}
        zoomControl={false}
        className="w-full h-full"
        style={{ background: BRAND.paperLo }}>
        <ZoomControl position="topright" />
        <MapController target={target} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

        {located.map((s) => {
          const highlight = activeSlug === s.slug || selectedSlug === s.slug;
          return (
            <LeafletMarker
              key={s.slug}
              position={SCHOOL_COORDS[s.slug]}
              icon={makeIcon(highlight)}
              zIndexOffset={highlight ? 1000 : 0}
              ref={(inst) => { if (inst) markerRefs.current[s.slug] = inst; }}
              keyboard
              title={`${s.name} — ${s.location}`}
              alt={s.name}
              eventHandlers={{
                click: () => onFocus(s.slug),
                mouseover: () => onHover(s.slug),
                mouseout: () => onHover(null),
                popupclose: () => onClearFocus(s.slug),
              }}>
              <Popup className="madarek-popup" minWidth={240} maxWidth={260}>
                <div style={{ width: 240 }}>
                  <div style={{ height: 120, overflow: 'hidden' }}>
                    <img src={s.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{ padding: 14 }}>
                    <div style={{ fontFamily: 'Plus Jakarta Sans, Inter, ui-sans-serif, sans-serif', fontWeight: 400, fontSize: 18, lineHeight: 1.18, color: BRAND.ink }}>
                      {s.name}
                    </div>
                    <div style={{ marginTop: 4, fontFamily: 'Inter, sans-serif', fontSize: 12, color: BRAND.inkSub }}>
                      {s.location}
                    </div>
                    <div style={{ marginTop: 10, fontFamily: 'Inter, sans-serif', fontSize: 12.5, color: BRAND.inkSub, lineHeight: 1.5 }}>
                      {s.curriculum}<br />{s.ages}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); onViewDetails(s.slug); }}
                      style={{ marginTop: 14, width: '100%', padding: '9px 12px', background: BRAND.ink, color: BRAND.paperHi, border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 11.5, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500 }}>
                      View campus details →
                    </button>
                  </div>
                </div>
              </Popup>
            </LeafletMarker>
          );
        })}
      </MapContainer>

      {/* legend — names each campus; click to fly there */}
      <div
        className="absolute bottom-5 left-5 z-[500] flex flex-col gap-1 p-3 border rounded-xl max-w-[240px]"
        style={{ background: withOpacity('white', 0.92), backdropFilter: 'blur(8px)', borderColor: BRAND.rule }}>
        {located.map((s) => {
          const on = activeSlug === s.slug || selectedSlug === s.slug;
          return (
            <button
              key={s.slug}
              type="button"
              onClick={() => onFocus(s.slug)}
              onMouseEnter={() => onHover(s.slug)}
              onMouseLeave={() => onHover(null)}
              className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#27C4FF]"
              style={{ background: on ? withOpacity('cyan', 0.12) : 'transparent' }}>
              <span className="relative flex-shrink-0 block w-3 h-3">
                <span
                  className="absolute inset-0 rounded-full"
                  style={{ background: BRAND.cyan, border: '2px solid #fff', boxShadow: '0 1px 3px rgba(10,14,28,0.3)', transform: on ? 'scale(1.25)' : 'scale(1)', transition: 'transform .25s ease' }} />
              </span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, fontWeight: 500, color: BRAND.ink, lineHeight: 1.25 }}>
                {s.short}
                <span style={{ display: 'block', fontSize: 10.5, fontWeight: 400, letterSpacing: '0.04em', color: BRAND.inkMute, textTransform: 'uppercase' }}>{s.location}</span>
              </span>
            </button>
          );
        })}
      </div>
    </figure>
  );
}

/* ── campus card ───────────────────────────────────────────── */
function SchoolCard({
  school,
  active,
  onOpen,
  onHover,
}: {
  school: School;
  active: boolean;
  onOpen: () => void;
  onHover: (on: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className="group text-left w-full overflow-hidden border transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27C4FF]"
      style={{ background: BRAND.paperHi, borderColor: active ? BRAND.cyan : BRAND.rule, boxShadow: active ? `0 0 0 1px ${BRAND.cyan}` : 'none' }}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={school.image}
          alt={school.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,14,28,0.55) 0%, rgba(10,14,28,0) 55%)' }} />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <FoldedMark size={20} tone="cyan" />
          <Meta tone="paper">{school.location}</Meta>
        </div>
      </div>
      <div className="p-6">
        <div style={{ fontFamily: 'Plus Jakarta Sans, Inter, ui-sans-serif, sans-serif', fontWeight: 400, fontSize: 'clamp(1.3rem, 2vw, 1.7rem)', lineHeight: 1.15, color: BRAND.ink }}>
          {school.name}
        </div>
        <div className="mt-3"><Meta>{school.curriculum} · {school.ages}</Meta></div>
        <div className="mt-5 pt-5 border-t flex items-center justify-between" style={{ borderColor: BRAND.rule }}>
          <Meta>{school.capacity}</Meta>
          <span className="inline-flex items-center gap-2 text-[13px] tracking-[0.14em] uppercase font-medium" style={{ color: active ? BRAND.cyan : BRAND.ink }}>
            Details
            <span className="transition-transform group-hover:translate-x-1" style={{ color: BRAND.cyan }}>→</span>
          </span>
        </div>
      </div>
    </button>
  );
}

/* ── slide-up detail overlay ───────────────────────────────── */
function SchoolDetailOverlay({ school, onClose }: { school: School; onClose: () => void }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const facts = [
    { label: 'Curriculum', value: school.curriculum },
    { label: 'Ages',       value: school.ages },
    { label: 'Languages',  value: school.languages },
    { label: 'Capacity',   value: school.capacity },
  ];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${school.name} details`}
      initial={{ opacity: 0, y: reduced ? 0 : '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduced ? 0 : '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 220 }}
      className="fixed inset-0 z-[950] overflow-y-auto"
      style={{ background: BRAND.paper }}>

      {/* nav bar */}
      <div
        className="sticky top-0 z-10 border-b"
        style={{ background: withOpacity('paper', 0.85), backdropFilter: 'blur(12px)', borderColor: BRAND.rule }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#27C4FF]"
            style={{ color: BRAND.ink, fontFamily: 'Inter, sans-serif', fontSize: 13 }}>
            <span aria-hidden="true">←</span>
            <Meta>Back to map</Meta>
          </button>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-[26px] leading-none transition-opacity hover:opacity-70"
            style={{ color: BRAND.inkSub }}>×</button>
        </div>
      </div>

      {/* hero image */}
      <div className="relative w-full h-[42vh] min-h-[300px] overflow-hidden">
        <img src={school.image} alt={school.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(20,17,15,0.92) 0%, rgba(20,17,15,0.35) 45%, transparent 100%)' }} />
        <div className="absolute bottom-0 left-0 w-full px-6 md:px-12 pb-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <FoldedMark size={24} tone="cyan" />
              <Meta tone="paper">{school.location}</Meta>
            </div>
            <Display size="lg" style={{ color: BRAND.paperHi }}>{school.name}</Display>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        {/* facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 pb-12 border-b" style={{ borderColor: BRAND.rule }}>
          {facts.map((f) => (
            <div key={f.label}>
              <Meta>{f.label}</Meta>
              <div className="mt-3"><Display size="xs" italic={false} style={{ fontWeight: 300 }}>{f.value}</Display></div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <Eyebrow tone="cyan">Overview</Eyebrow>
              <div className="mt-6"><Body size="xl">{school.overview}</Body></div>
            </div>
            <div>
              <Eyebrow tone="cyan">Highlights</Eyebrow>
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8">
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

          {/* contact sidebar */}
          <div className="space-y-8">
            <div className="p-7 border" style={{ background: BRAND.paperHi, borderColor: BRAND.rule }}>
              <Eyebrow>Contact</Eyebrow>
              <div className="mt-6 space-y-5">
                <div>
                  <Meta>Address</Meta>
                  <div className="mt-1"><Body size="md">{school.address}</Body></div>
                </div>
                <div>
                  <Meta>Email</Meta>
                  <div className="mt-1">
                    <Body size="md">
                      <a href={`mailto:${school.email}`} className="border-b border-current pb-0.5">{school.email}</a>
                    </Body>
                  </div>
                </div>
              </div>
              <div className="mt-7 flex flex-col items-start gap-4">
                <PillLink to="/contact" variant="primary" size="md">Contact admissions</PillLink>
                {school.website && (
                  <a
                    href={school.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] font-light border-b pb-1"
                    style={{ color: BRAND.inkSub, borderColor: withOpacity('ink', 0.3) }}>
                    Visit campus site →
                  </a>
                )}
                <Link
                  to={`/schools/${school.slug}`}
                  onClick={onClose}
                  className="text-[15px] font-light border-b pb-1"
                  style={{ color: BRAND.inkSub, borderColor: withOpacity('ink', 0.3) }}>
                  Open full campus page →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* gallery */}
        {school.gallery && school.gallery.length > 0 && (
          <div className="mt-16">
            <Eyebrow tone="cyan">Campus gallery</Eyebrow>
            <div className="mt-6 flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory">
              {school.gallery.map((g, i) => (
                <div key={i} className="flex-shrink-0 snap-start w-[280px] md:w-[440px] aspect-[4/3] overflow-hidden">
                  <img src={g} alt={`${school.name} ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
