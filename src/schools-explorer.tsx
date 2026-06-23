/* Madarek — Schools presence explorer
   --------------------------------------------------------------
   A single-page schools experience adapted to the Madarek editorial
   brand: a stats band, an interactive Leaflet map on the CARTO
   light basemap, a card grid of campuses, and a slide-up detail
   panel that opens per school (from a card or a map marker). */

import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker as LeafletMarker, Popup, ZoomControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  BRAND, useDensity, withOpacity,
  FoldedMark, Eyebrow, Display, Body, Meta,
  Section, Container, Reveal,
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
  const navigate = useNavigate();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);   // hover highlight
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null); // map focus + popup
  const openSchool = (slug: string) => navigate(`/schools/${slug}`);   // single, shared school page

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
                  MADAREK framework, with more on the way.
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
            onViewDetails={openSchool} />
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
                  onOpen={() => openSchool(s.slug)}
                  onHover={(on) => setActiveSlug(on ? s.slug : null)} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
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
        <div className="mt-3"><Meta>{school.curriculum}{school.grades ? ` · ${school.grades}` : ''} · Ages {school.ages}</Meta></div>
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
