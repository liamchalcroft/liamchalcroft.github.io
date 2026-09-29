/**
 * Typographic reverse diffusion.
 *
 * Marked text is sampled from noise and denoised glyph by glyph. Redaction
 * comes in seven levels of degradation (100 → 70 → 50 → 35 → 20 → 10 →
 * clean); above those, at the noisiest step, a glyph is replaced by a random
 * character, re-drawn at every step. Each glyph gets its own offset in the
 * schedule from a seeded PRNG, so words resolve unevenly, as a real sample
 * does, and the same seed always gives the same sample.
 *
 *   data-denoise="load"    sampled over ~2 s when the page opens
 *   data-denoise="scroll"  timestep follows the element's position: it is
 *                          noisy low in the viewport and clean by mid-screen,
 *                          and scrolling back re-noises it
 *   data-denoise-hover     hovering resamples it from t ≈ 0.7
 *   data-key="…"           fixes the sample for that element (default: its text)
 *
 * Without JS, or with reduced motion, the text is simply clean.
 */

import { formatSeed, hashString, mulberry32, parseSeed } from '../lib/prng';

const LEVELS = 7; // 1–6 map to Redaction 10…100; 7 is a substituted glyph in Redaction 100
const SPREAD = 0.85; // how far apart glyphs resolve within one sample
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGIT = '0123456789';
const PUNCT = '.,:;-–!?/()*';

/* ---------- the visit's seed ---------- */

function initialSeed(): number {
  const q = parseSeed(new URLSearchParams(location.search).get('seed'));
  if (q !== null) return q;
  try {
    const s = parseSeed(sessionStorage.getItem('seed'));
    if (s !== null) return s;
  } catch { /* storage blocked */ }
  return crypto.getRandomValues(new Uint32Array(1))[0]!;
}

let seed = initialSeed();
const remember = () => {
  try { sessionStorage.setItem('seed', formatSeed(seed)); } catch { /* storage blocked */ }
  document.querySelectorAll<HTMLElement>('[data-seed-readout]').forEach((el) => (el.textContent = formatSeed(seed)));
};

export const getSeed = () => seed;

/* ---------- one denoisable element ---------- */

interface Glyph { el: HTMLElement; ch: string; u: number; set: string }

class Sample {
  readonly el: HTMLElement;
  readonly mode: 'load' | 'scroll';
  private glyphs: Glyph[] = [];
  private step = -1;
  private t = -1;
  private salt = 0;
  private anim = 0;
  /** While animating (load or hover), scroll updates are ignored. */
  busy = false;

  constructor(el: HTMLElement) {
    this.el = el;
    this.mode = el.dataset['denoise'] === 'load' ? 'load' : 'scroll';
    this.split();
    this.reseed();
  }

  /** Wrap every non-space character in a span, keeping links and emphasis intact. */
  private split() {
    const walker = document.createTreeWalker(this.el, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = [];
    for (let n = walker.nextNode(); n; n = walker.nextNode()) nodes.push(n as Text);
    for (const node of nodes) {
      const text = node.data;
      if (!text.trim()) continue;
      const frag = document.createDocumentFragment();
      for (const part of text.split(/(\s+)/)) {
        if (!part) continue;
        if (/^\s+$/.test(part)) { frag.append(part); continue; }
        const word = document.createElement('span');
        word.className = 'dn__w';
        for (const ch of part) {
          const g = document.createElement('span');
          g.className = 'dn__g';
          g.textContent = ch;
          word.append(g);
          this.glyphs.push({
            el: g,
            ch,
            u: 0,
            set: UPPER.includes(ch) ? UPPER : DIGIT.includes(ch) ? DIGIT : LOWER.includes(ch.toLowerCase()) ? LOWER : PUNCT,
          });
        }
        frag.append(word);
      }
      node.replaceWith(frag);
    }
  }

  /** Per-glyph schedule offsets for the current seed. */
  reseed(extra = 0) {
    this.salt = extra;
    const key = this.el.dataset['key'] ?? this.el.textContent ?? '';
    const r = mulberry32(hashString(key) ^ seed ^ Math.imul(extra, 0x9e3779b1));
    for (const g of this.glyphs) g.u = r();
    this.step = -1;
  }

  /** Render timestep t ∈ [0, 1], quantised to `steps` sampler steps. */
  render(t: number, steps = 24) {
    const k = Math.round(t * steps);
    if (k === this.step && t === this.t) return;
    this.step = k;
    this.t = t;
    const tq = k / steps;
    const r = mulberry32(seed ^ Math.imul(k + 1, 0x85ebca6b) ^ this.salt);
    for (const g of this.glyphs) {
      const n = Math.min(1, Math.max(0, tq * (1 + SPREAD) - SPREAD * g.u));
      const l = Math.ceil(n * LEVELS);
      if (l === 0) {
        if (g.el.dataset['l']) { delete g.el.dataset['l']; delete g.el.dataset['c']; }
        continue;
      }
      g.el.dataset['l'] = String(l);
      g.el.dataset['c'] = l === LEVELS ? g.set[Math.floor(r() * g.set.length)]! : g.ch;
    }
  }

  /** Forward process: add noise from the current state up to t = 1. */
  noise(ms: number): Promise<void> {
    cancelAnimationFrame(this.anim);
    this.busy = true;
    const from = Math.max(0, this.t);
    return new Promise((resolve) => {
      const start = performance.now();
      const tick = (now: number) => {
        const x = Math.min(1, (now - start) / ms);
        this.render(from + (1 - from) * x * x, 12);
        if (x < 1) this.anim = requestAnimationFrame(tick);
        else resolve();
      };
      this.anim = requestAnimationFrame(tick);
    });
  }

  /** Animate from `from` down to 0 over `ms`, on a cosine schedule. */
  play(from: number, ms: number): Promise<void> {
    cancelAnimationFrame(this.anim);
    this.busy = true;
    return new Promise((resolve) => {
      const start = performance.now();
      const tick = (now: number) => {
        const x = Math.min(1, (now - start) / ms);
        // Most of the change happens mid-schedule, as with a cosine noise schedule.
        const t = from * (0.5 + 0.5 * Math.cos(Math.PI * x));
        this.render(t, 30);
        if (x < 1) this.anim = requestAnimationFrame(tick);
        else { this.busy = false; this.render(0); resolve(); }
      };
      this.anim = requestAnimationFrame(tick);
    });
  }
}

/* ---------- driving samples ---------- */

const samples: Sample[] = [];
const visible = new Set<Sample>();
let scheduled = false;

function scrollT(el: HTMLElement): number {
  const vh = innerHeight;
  const top = el.getBoundingClientRect().top;
  // Pure noise near the bottom edge of the viewport, clean by the middle. Near the end of
  // a page an element may never reach the middle, so its clean line moves down to the
  // highest point it can actually be scrolled to.
  const maxScroll = document.documentElement.scrollHeight - vh;
  const topAtEnd = top - (maxScroll - scrollY);
  const clean = Math.min(0.5 * vh, Math.max(0, topAtEnd));
  return Math.min(1, Math.max(0, (top - clean) / (0.45 * vh)));
}

function onScroll() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    for (const s of visible) if (s.mode === 'scroll' && !s.busy) s.render(scrollT(s.el), 16);
  });
}

async function fontsReady() {
  const fams = ['Redaction 10', 'Redaction 20', 'Redaction 35', 'Redaction 50', 'Redaction 70', 'Redaction 100'];
  const all = Promise.all(fams.map((f) => document.fonts.load(`1em "${f}"`)));
  await Promise.race([all, new Promise((r) => setTimeout(r, 1800))]);
}

export async function initDenoise(root: ParentNode = document) {
  remember();
  if (reduced) return;
  const els = [...root.querySelectorAll<HTMLElement>('[data-denoise]')];
  if (!els.length) return;

  // Start everything as noise before the fonts arrive, so nothing flashes clean first.
  const created = els.map((el) => new Sample(el));
  samples.push(...created);
  for (const s of created) s.render(s.mode === 'load' ? 1 : scrollT(s.el), 16);

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const s = created.find((x) => x.el === e.target);
      if (!s) continue;
      if (e.isIntersecting) visible.add(s); else visible.delete(s);
    }
    onScroll();
  }, { rootMargin: '10% 0px 10% 0px' });
  created.forEach((s) => io.observe(s.el));
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);

  for (const s of created) {
    if (!('denoiseHover' in s.el.dataset)) continue;
    let salt = 0;
    s.el.addEventListener('pointerenter', () => {
      if (s.busy || (s.mode === 'scroll' && scrollT(s.el) > 0)) return;
      s.reseed(++salt);
      s.play(0.7, 750);
    });
  }

  // Leaving a page runs the forward process on whatever is on screen; the next
  // page then samples its own headings back out of noise.
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest?.('a');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target && a.target !== '_self') return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || (url.pathname === location.pathname && url.hash)) return;
    const onScreen = [...visible].filter((s) => {
      const r = s.el.getBoundingClientRect();
      return r.bottom > 0 && r.top < innerHeight;
    });
    if (!onScreen.length) return;
    e.preventDefault();
    Promise.race([Promise.all(onScreen.map((s) => s.noise(260))), delay(400)]).then(() => location.assign(url.href));
  });

  // Coming back from the back/forward cache, the page is still in its noised-out state.
  addEventListener('pageshow', (e: PageTransitionEvent) => {
    if (!e.persisted) return;
    for (const s of samples) { s.busy = false; s.render(s.mode === 'load' ? 0 : scrollT(s.el), 16); }
  });

  await fontsReady();
  await Promise.all(created.filter((s) => s.mode === 'load').map((s, i) => delay(i * 220).then(() => s.play(1, 2100))));
}

/** Draw a new seed and resample every element on the page. */
export function resampleAll() {
  seed = crypto.getRandomValues(new Uint32Array(1))[0]!;
  remember();
  const url = new URL(location.href);
  url.searchParams.set('seed', formatSeed(seed));
  history.replaceState(history.state, '', url);
  if (reduced) return;
  for (const s of samples) {
    s.reseed();
    if (s.mode === 'load') s.play(1, 2100);
    else if (visible.has(s)) s.play(0.9, 1200);
  }
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
