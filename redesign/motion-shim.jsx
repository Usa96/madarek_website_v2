/* Minimal Framer-Motion-compatible shim
   --------------------------------------------------------------
   Implements just the surface area used in the redesign:
     motion.{div,img,span,a,nav,article}, AnimatePresence,
     useScroll({target, offset}),  useTransform(v, [...], [...]),
     useInView(ref, {once, margin}),  useMotionValue(initial).

   Reactive: useScroll causes re-renders on scroll (throttled with
   rAF). useTransform returns a plain interpolated value computed
   each render. Adequate for a static prototype. */

const __MOTION_ = (() => {
  const { useState, useEffect, useRef, useLayoutEffect, createElement, Fragment, cloneElement, Children, forwardRef } = React;

  // Framer-Motion-only props we must strip from the spread so they
  // don't end up as unknown HTML attributes.
  const MOTION_ONLY = new Set([
    "layoutId", "layout", "whileHover", "whileTap", "whileFocus",
    "whileInView", "viewport", "drag", "dragConstraints",
    "variants", "custom", "inherit", "__exiting",
  ]);

  /* ── interpolation helpers ─────────────────────────────── */
  function lerp(a, b, t) {
    if (typeof a === "string" && typeof b === "string") {
      const aN = parseFloat(a);
      const bN = parseFloat(b);
      const suf = a.replace(/[-\d.eE+]/g, "") || b.replace(/[-\d.eE+]/g, "") || "";
      return aN + (bN - aN) * t + suf;
    }
    if (typeof a === "number" && typeof b === "number") return a + (b - a) * t;
    return t < 0.5 ? a : b;
  }

  function interpolateRange(v, input, output) {
    if (input.length < 2) return output[0];
    if (v <= input[0]) return output[0];
    if (v >= input[input.length - 1]) return output[output.length - 1];
    for (let i = 0; i < input.length - 1; i++) {
      if (v >= input[i] && v <= input[i + 1]) {
        const t = (v - input[i]) / (input[i + 1] - input[i]);
        return lerp(output[i], output[i + 1], t);
      }
    }
    return output[output.length - 1];
  }

  /* ── useScroll ─────────────────────────────────────────── */
  // Offset semantics: ["start end", "end start"] → progress 0 when
  // top of element hits bottom of viewport, 1 when bottom of element
  // hits top of viewport. We ignore offset parsing nuance and just
  // implement that common case (which is all the prototype uses).
  function useScroll(opts = {}) {
    const { target } = opts;
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      let rafId = 0;
      const compute = () => {
        rafId = 0;
        const el = target?.current || document.documentElement;
        if (!el) return;
        let p;
        if (!target) {
          // page scroll progress
          const max = document.documentElement.scrollHeight - window.innerHeight;
          p = max > 0 ? window.scrollY / max : 0;
        } else {
          const rect = el.getBoundingClientRect();
          const vh = window.innerHeight;
          const start = vh;            // when rect.top === vh → enter (progress 0)
          const end = -rect.height;    // when rect.top === -rect.height → leave (progress 1)
          const range = start - end;
          p = range > 0 ? (start - rect.top) / range : 0;
        }
        const clamped = Math.max(0, Math.min(1, p));
        setProgress((prev) => (Math.abs(prev - clamped) > 0.001 ? clamped : prev));
      };
      const schedule = () => {
        if (rafId) return;
        rafId = requestAnimationFrame(compute);
      };
      compute();
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      return () => {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        if (rafId) cancelAnimationFrame(rafId);
      };
    }, [target]);

    // Return a value object compatible with useTransform consumers.
    return { scrollYProgress: { __mv: true, get: () => progress, current: progress, value: progress } };
  }

  /* ── useTransform ──────────────────────────────────────── */
  function useTransform(value, input, output) {
    const v = value && value.__mv ? value.get() : (typeof value === "number" ? value : 0);
    return interpolateRange(v, input, output);
  }

  /* ── useMotionValue ────────────────────────────────────── */
  function useMotionValue(initial) {
    const [v, setV] = useState(initial);
    return { __mv: true, get: () => v, set: setV, current: v, value: v };
  }

  /* ── useInView ─────────────────────────────────────────── */
  // Note: IntersectionObserver is unreliable inside some preview/
  // sandboxed iframes. We fall back to a scroll-position poll using
  // getBoundingClientRect, rAF-throttled. Functionally identical for
  // a marketing site; slightly heavier on scroll.
  function useInView(ref, opts = {}) {
    const { once = false, margin = "0px" } = opts;
    const [inView, setInView] = useState(false);

    // Parse a margin shorthand: either single value or 4-value top/right/bottom/left.
    function parseMargin(m) {
      const parts = String(m).trim().split(/\s+/).map((p) => {
        if (p.endsWith("%")) return { pct: parseFloat(p) / 100 };
        return { px: parseFloat(p) };
      });
      const [t, r, b, l] = parts.length === 4 ? parts : [parts[0], parts[0], parts[0], parts[0]];
      return { t, r, b, l };
    }

    useEffect(() => {
      const el = ref?.current;
      if (!el) return;
      let rafId = 0;
      let seen = false;
      const m = parseMargin(margin);
      const check = () => {
        rafId = 0;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const vw = window.innerWidth;
        // Compute effective root bounds shrunk/expanded by margin.
        const top    = (m.t.pct != null ? m.t.pct * vh : (m.t.px || 0));
        const bottom = vh - (m.b.pct != null ? m.b.pct * vh : (m.b.px || 0));
        const left   = (m.l.pct != null ? m.l.pct * vw : (m.l.px || 0));
        const right  = vw - (m.r.pct != null ? m.r.pct * vw : (m.r.px || 0));
        const intersects =
          rect.bottom > top && rect.top < bottom &&
          rect.right  > left && rect.left < right;
        if (intersects) {
          if (!seen) {
            seen = true;
            setInView(true);
            if (once) {
              window.removeEventListener("scroll", schedule);
              window.removeEventListener("resize", schedule);
            }
          }
        } else if (!once) {
          setInView(false);
        }
      };
      const schedule = () => {
        if (rafId) return;
        rafId = requestAnimationFrame(check);
      };
      check();
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      return () => {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        if (rafId) cancelAnimationFrame(rafId);
      };
    }, [ref, once, margin]);

    return inView;
  }

  /* ── motion.* components ───────────────────────────────── */
  // We support: initial / animate / exit / transition / style / className
  // For transform-style props we set CSS variables --y, --x, --scale,
  // --rotate so animations are GPU-friendly. style props like {y, x,
  // scale, rotate} become inline CSS transforms.

  function styleToCss(style = {}) {
    const out = {};
    let transformParts = [];
    Object.entries(style || {}).forEach(([k, raw]) => {
      let val = raw && raw.__mv ? raw.get() : raw;
      if (k === "y")          transformParts.push(`translateY(${typeof val === "number" ? val + "px" : val})`);
      else if (k === "x")     transformParts.push(`translateX(${typeof val === "number" ? val + "px" : val})`);
      else if (k === "scale") transformParts.push(`scale(${val})`);
      else if (k === "rotate")transformParts.push(`rotate(${typeof val === "number" ? val + "deg" : val})`);
      else                    out[k] = val;
    });
    if (transformParts.length) out.transform = transformParts.join(" ");
    return out;
  }

  function pickEasing(ease) {
    if (Array.isArray(ease)) return `cubic-bezier(${ease.join(",")})`;
    return "cubic-bezier(0.22,1,0.36,1)";
  }

  const MotionComponent = forwardRef(function MotionComponent(
    { as = "div", children, initial, animate, exit, transition, style, className, ...rest },
    forwardedRef,
  ) {
    const localRef = useRef(null);
    const ref = forwardedRef || localRef;
    const hasEntrance = !!initial;
    const [phase, setPhase] = useState(hasEntrance ? "initial" : "settled");

    // Move from initial → animate after mount.
    useLayoutEffect(() => {
      if (!hasEntrance) return;
      const id = requestAnimationFrame(() => setPhase("animate"));
      return () => cancelAnimationFrame(id);
    }, []);

    // After the animate transition completes, settle so subsequent
    // scroll-linked style updates don't carry a 600ms CSS transition.
    // Only settle if `animate` is not dynamic (no isInView toggling).
    // For our prototype we keep transition active always when an
    // entrance is defined — it's safer than racing state updates.
    // (Scroll-linked motion divs have no `initial` so they bypass.)
    useEffect(() => {
      if (phase !== "animate") return;
      const dur = (transition?.duration ?? 0.6) * 1000;
      const delay = (transition?.delay ?? 0) * 1000;
      const t = setTimeout(() => setPhase("settled"), dur + delay + 80);
      return () => clearTimeout(t);
    }, [phase, transition?.duration, transition?.delay]);

    // Reset phase when `animate` reference changes (e.g. the
    // isInView fade where parent toggles the animate object).
    useEffect(() => {
      if (!hasEntrance) return;
      setPhase("animate");
      const dur = (transition?.duration ?? 0.6) * 1000;
      const delay = (transition?.delay ?? 0) * 1000;
      const t = setTimeout(() => setPhase("settled"), dur + delay + 80);
      return () => clearTimeout(t);
    }, [JSON.stringify(animate)]);

    let stateStyle = {};
    if (phase === "initial") stateStyle = initial;
    else stateStyle = animate || {};

    const mergedStyle = { ...style, ...stateStyle };

    const dur = (transition?.duration ?? 0.6) + "s";
    const ease = pickEasing(transition?.ease);
    const delay = (transition?.delay ?? 0) + "s";

    const finalStyle = {
      ...styleToCss(mergedStyle),
      // Transition only while an entrance has been declared. Scroll-
      // linked motion divs (no `initial`) skip transitions so their
      // transforms don't lag the scroll.
      transition: hasEntrance ? `transform ${dur} ${ease} ${delay}, opacity ${dur} ${ease} ${delay}` : "none",
      willChange: hasEntrance ? "transform, opacity" : "auto",
    };

    // Strip Framer-Motion-only props from the DOM spread.
    const cleanRest = {};
    for (const k in rest) {
      if (!MOTION_ONLY.has(k)) cleanRest[k] = rest[k];
    }

    return createElement(as, { ref, className, style: finalStyle, ...cleanRest }, children);
  });

  const motionCache = {};
  const motion = new Proxy({}, {
    get: (_, tag) => {
      if (motionCache[tag]) return motionCache[tag];
      const Comp = forwardRef((props, ref) => createElement(MotionComponent, { as: tag, ref, ...props }));
      Comp.displayName = `motion.${String(tag)}`;
      motionCache[tag] = Comp;
      return Comp;
    },
  });

  /* ── AnimatePresence ───────────────────────────────────── */
  // Minimal: when child is removed, keep it in DOM for `exit` duration.
  function AnimatePresence({ children }) {
    const [items, setItems] = useState(() => Children.toArray(children).filter(Boolean));
    const prevChildren = useRef(items);

    useEffect(() => {
      const next = Children.toArray(children).filter(Boolean);
      const prev = prevChildren.current;
      const prevKeys = new Set(prev.map((c) => c.key));
      const nextKeys = new Set(next.map((c) => c.key));

      // Items being removed → schedule cleanup after exit duration
      const removed = prev.filter((c) => !nextKeys.has(c.key));
      const added = next.filter((c) => !prevKeys.has(c.key));

      if (!removed.length && !added.length) return;

      // Combine: keep removed items first as "exiting"
      const exiting = removed.map((c) => cloneElement(c, { __exiting: true }));
      const combined = [...next, ...exiting];
      setItems(combined);
      prevChildren.current = next;

      if (removed.length) {
        const exitDur = (removed[0].props?.transition?.duration ?? 0.6) * 1000 + 50;
        setTimeout(() => {
          setItems((cur) => cur.filter((c) => !c.props?.__exiting));
        }, exitDur);
      }
    }, [children]);

    return createElement(Fragment, null, items.map((c) => {
      if (c.props?.__exiting) {
        return cloneElement(c, {
          initial: c.props.animate,
          animate: c.props.exit,
          __exiting: undefined,
        });
      }
      return c;
    }));
  }

  return {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
    useInView,
    useMotionValue,
  };
})();

window.Motion = __MOTION_;
