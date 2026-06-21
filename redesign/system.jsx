/* Madarek redesign — design system
   --------------------------------------------------------------
   Lives in window.MadarekSystem so individual page files can
   destructure what they need. Single source of truth for tokens,
   type primitives, density context, brand-derived geometry, and
   scroll-linked helpers.
*/

const { useRef, useState, useEffect, useContext, createContext, useMemo } = React;
const { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } = window.Motion || {};

/* ── brand palette ─────────────────────────────────────────── */
const BRAND = {
  paper:   "#F4EDE0",  // warm cream (slightly warmer than current)
  paperHi: "#FAF6EC",
  paperLo: "#E9DFCC",
  ink:     "#1A1714",
  inkSub:  "#5C544A",
  inkMute: "#8A8071",
  rule:    "#D6CCB6",

  // logo-derived hues — each codes a content domain
  cyan:    "#27C4FF",  // schools / locations
  pink:    "#FE10A6",  // community / foundation
  lime:    "#98D844",  // growth / sustainability
  yellow:  "#FFC34E",  // innovation / academy
  red:     "#FF403D",  // excellence / leadership
};

/* ── density context ──────────────────────────────────────── */
const DensityCtx = createContext("editorial");

const DENSITY = {
  tight:     { sectionY: "py-16 md:py-24",  gap: "gap-8",  display: 0.92 },
  spacious:  { sectionY: "py-28 md:py-40",  gap: "gap-12", display: 1.0  },
  editorial: { sectionY: "py-40 md:py-64",  gap: "gap-16", display: 1.1  },
};

function useDensity() {
  const d = useContext(DensityCtx);
  return DENSITY[d] || DENSITY.editorial;
}

/* ── folded mark — brand geometry as a structural device ───── */
/* Five-shard folded-paper motif, dialled down. Use as a section
   marker, a numeric badge surround, or a content frame. Never
   ornamental "background circles". Pass `tone` to colour code
   the section. */
function FoldedMark({ size = 64, tone = "ink", rotate = -8, opacity = 1 }) {
  const hex = BRAND[tone] || BRAND.ink;
  return (
    <svg viewBox="-30 -30 60 60" width={size} height={size} aria-hidden="true" style={{ opacity }}>
      <g transform={`rotate(${rotate})`}>
        <polygon points="-22,-10 -2,-22 12,-8 -8,8" fill={hex} opacity="0.92" />
        <polygon points="-8,8 12,-8 16,12 -6,18" fill={hex} opacity="0.7" />
        <polygon points="12,-8 22,4 16,12" fill={hex} opacity="0.55" />
        <polygon points="-22,-10 -8,8 -18,14" fill={hex} opacity="0.85" />
      </g>
    </svg>
  );
}

/* ── type primitives ───────────────────────────────────────── */
/* Eyebrow — small caps label. Always paired with a hairline rule
   so it sits like a chapter marker, not a banner. */
function Eyebrow({ children, tone = "ink", className = "" }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span className="block h-px w-8" style={{ background: BRAND[tone] || BRAND.ink, opacity: 0.6 }} />
      <span
        className="font-mono uppercase"
        style={{
          fontSize: 11,
          letterSpacing: "0.22em",
          fontWeight: 500,
          color: BRAND[tone] || BRAND.inkSub,
        }}>
        {children}
      </span>
    </span>
  );
}

/* Section number — large monospace numeral that anchors the
   chapter and codes its hue. */
function SectionNumber({ n, tone = "ink" }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: BRAND.inkMute, fontWeight: 500 }}>
        CH
      </span>
      <span className="font-mono tabular-nums" style={{ fontSize: 11, letterSpacing: "0.18em", color: BRAND[tone] || BRAND.ink, fontWeight: 600 }}>
        {String(n).padStart(2, "0")}
      </span>
    </div>
  );
}

/* Display — ultra-thin Fraunces. The whole site rests on this
   one decision. Use sparingly; let it breathe. */
function Display({ children, size = "xl", italic = false, as: As = "h1", className = "", style = {} }) {
  const sizes = {
    xs: "clamp(2rem, 4vw, 3rem)",
    sm: "clamp(2.5rem, 5vw, 4rem)",
    md: "clamp(3.5rem, 7vw, 6rem)",
    lg: "clamp(4.5rem, 9vw, 8rem)",
    xl: "clamp(5.5rem, 11vw, 10.5rem)",
    xxl: "clamp(7rem, 14vw, 14rem)",
  };
  return (
    <As
      className={className}
      style={{
        fontFamily: "Fraunces, ui-serif, Georgia, serif",
        fontWeight: 200,
        fontStyle: italic ? "italic" : "normal",
        fontSize: sizes[size],
        lineHeight: 0.95,
        letterSpacing: "-0.02em",
        textWrap: "balance",
        color: BRAND.ink,
        ...style,
      }}>
      {children}
    </As>
  );
}

/* Body — Inter 300 by default, slightly larger than convention
   so the page breathes. */
function Body({ children, size = "md", muted = false, as: As = "p", className = "", style = {} }) {
  const sizes = {
    sm: 15,
    md: 18,
    lg: 22,
    xl: 28,
  };
  return (
    <As
      className={className}
      style={{
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        fontWeight: 300,
        fontSize: sizes[size],
        lineHeight: 1.55,
        color: muted ? BRAND.inkSub : BRAND.ink,
        textWrap: "pretty",
        ...style,
      }}>
      {children}
    </As>
  );
}

/* ── layout primitives ─────────────────────────────────────── */
function Section({ id, tone = "ink", children, className = "", bg = "paper", first = false }) {
  const d = useDensity();
  return (
    <section
      id={id}
      data-screen-label={id}
      className={`relative w-full ${first ? "" : d.sectionY} ${className}`}
      style={{ background: BRAND[bg] || BRAND.paper }}>
      {children}
    </section>
  );
}

function Container({ children, max = "7xl", className = "" }) {
  const widths = { "5xl": "max-w-5xl", "6xl": "max-w-6xl", "7xl": "max-w-7xl", full: "max-w-none" };
  return <div className={`${widths[max] || widths["7xl"]} mx-auto px-6 md:px-12 ${className}`}>{children}</div>;
}

/* ── scroll-linked image ─────────────────────────────────────
   Image that scales/pans gently as it enters the viewport.
   Replaces the per-section fade-up template with a single
   intentional choreography. */
function ScrollImage({ src, alt = "", aspect = "16/9", overlay = "editorial", priority = false, scale = true }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const s = useTransform(scrollYProgress, [0, 0.5, 1], scale ? [1.04, 1, 1.04] : [1, 1, 1]);

  const overlayCls = {
    none:      "",
    editorial: "after:absolute after:inset-0 after:pointer-events-none after:bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_50%,rgba(0,0,0,0.35)_100%)]",
    hero:      "after:absolute after:inset-0 after:pointer-events-none after:bg-[linear-gradient(to_bottom,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.4)_60%,rgba(0,0,0,0.75)_100%)]",
    cinematic: "after:absolute after:inset-0 after:pointer-events-none after:bg-[linear-gradient(to_right,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.15)_50%,rgba(0,0,0,0)_100%)]",
  }[overlay] || "";

  return (
    <div ref={ref} className={`relative w-full h-full overflow-hidden ${overlayCls}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: s, willChange: "transform" }}
        className="w-full h-full object-cover"
        loading={priority ? "eager" : "lazy"} />
    </div>
  );
}

/* ── marquee — horizontal text that pans on scroll ─────────── */
function ScrollMarquee({ children, tone = "ink", size = "xxl", italic = true }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);
  return (
    <div ref={ref} className="relative w-full overflow-hidden" aria-hidden="true">
      <motion.div style={{ x }} className="whitespace-nowrap">
        <Display size={size} italic={italic} style={{ color: BRAND[tone] || BRAND.ink, opacity: 0.92 }}>
          {children}
        </Display>
      </motion.div>
    </div>
  );
}

/* ── chip / link ───────────────────────────────────────────── */
function PillLink({ to, children, variant = "primary", onClick }) {
  const styles = {
    primary: "bg-[#1A1714] text-[#F4EDE0] hover:bg-black",
    ghost:   "bg-transparent text-[#1A1714] border border-[#1A1714]/30 hover:border-[#1A1714]",
    invert:  "bg-[#F4EDE0] text-[#1A1714] hover:bg-white",
  };
  const Tag = onClick ? "button" : "a";
  const tagProps = onClick ? { onClick, type: "button" } : { href: to };
  return (
    <Tag
      {...tagProps}
      className={`inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-[13px] tracking-[0.14em] uppercase font-medium transition-colors duration-300 ${styles[variant]}`}>
      {children}
    </Tag>
  );
}

function TextLink({ to, children, tone = "ink", onClick }) {
  const Tag = onClick ? "button" : "a";
  const tagProps = onClick ? { onClick, type: "button" } : { href: to };
  return (
    <Tag
      {...tagProps}
      className="group inline-flex items-baseline gap-2 border-b pb-1 transition-colors"
      style={{
        color: BRAND.ink,
        borderColor: BRAND.ink,
        fontFamily: "Inter, sans-serif",
        fontWeight: 400,
        fontSize: 15,
      }}>
      <span>{children}</span>
      <span className="transition-transform group-hover:translate-x-1" style={{ color: BRAND[tone] || BRAND.ink }}>→</span>
    </Tag>
  );
}

/* ── meta line — monospace caption ──────────────────────────── */
function Meta({ children, tone = "inkMute" }) {
  return (
    <span
      className="font-mono uppercase"
      style={{
        fontSize: 10,
        letterSpacing: "0.22em",
        fontWeight: 500,
        color: BRAND[tone] || BRAND.inkMute,
      }}>
      {children}
    </span>
  );
}

/* ── reveal — single in-view fade (use sparingly) ──────────── */
function Reveal({ children, delay = 0, y = 24 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}>
      {children}
    </motion.div>
  );
}

/* ── export to window for cross-file consumption ───────────── */
window.MadarekSystem = {
  BRAND,
  DENSITY,
  DensityCtx,
  useDensity,
  FoldedMark,
  Eyebrow,
  SectionNumber,
  Display,
  Body,
  Section,
  Container,
  ScrollImage,
  ScrollMarquee,
  PillLink,
  TextLink,
  Meta,
  Reveal,
};
