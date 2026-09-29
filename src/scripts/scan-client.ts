/**
 * Drives every <canvas data-scan> on the page.
 *
 * The visitor's subject seed is chosen by an inline script in <head> (so the
 * accent wavelength is set before first paint) and read here from
 * <html data-subject>. Slices are synthesised in workers; each canvas then
 * "acquires" its image line by line from k-space.
 */

import { KSpaceAcquisition, type Order } from '../lib/scan/acquire';
import { PROTOCOL_NAMES, type ProtocolName } from '../lib/scan/physics';
import { formatSeed, hashString, mulberry32, pick } from '../lib/scan/prng';
import type { Job, Result } from '../lib/scan/worker';

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;

/* ---------- subject state ---------- */

export interface Subject { seed: number; protocol: ProtocolName; overlay: boolean }

function initialSubject(): Subject {
  const seed = parseInt(root.dataset['subject'] ?? '0', 16) >>> 0;
  const q = new URLSearchParams(location.search).get('protocol');
  const protocol = (PROTOCOL_NAMES as readonly string[]).includes(q ?? '')
    ? (q as ProtocolName)
    : pick(mulberry32(seed ^ 0x9e37), PROTOCOL_NAMES);
  return { seed, protocol, overlay: false };
}

export const subject = initialSubject();
const listeners = new Set<() => void>();
export const onSubjectChange = (fn: () => void) => listeners.add(fn);

export function setSubject(patch: Partial<Subject>) {
  Object.assign(subject, patch);
  const hex = formatSeed(subject.seed);
  root.dataset['subject'] = hex;
  try { sessionStorage.setItem('subject', hex); } catch { /* private mode */ }
  const lut = (window as unknown as { __LAMBDA__?: string[] }).__LAMBDA__;
  const nm = 450 + (subject.seed % 201);
  root.dataset['lambda'] = String(nm);
  if (lut) root.style.setProperty('--lambda', lut[nm - 450]!);
  root.style.setProperty('--lambda-pos', `${(nm - 400) / 3}%`);
  const url = new URL(location.href);
  url.searchParams.set('subject', hex);
  url.searchParams.set('protocol', subject.protocol);
  history.replaceState(history.state, '', url);
  fillReadouts();
  listeners.forEach((fn) => fn());
}

/** Text readouts anywhere on the page: <span data-readout="subject|protocol|lambda|seq">. */
export function fillReadouts(extra: Record<string, string> = {}) {
  const values: Record<string, string> = {
    subject: formatSeed(subject.seed).toUpperCase(),
    protocol: subject.protocol,
    lambda: `${root.dataset['lambda'] ?? ''} nm`,
    ...extra,
  };
  document.querySelectorAll<HTMLElement>('[data-readout]').forEach((el) => {
    const v = values[el.dataset['readout']!];
    if (v !== undefined) el.textContent = v;
  });
}

/* ---------- workers ---------- */

type Pending = { resolve: (r: Result) => void };
const pools: { w: Worker; busy: number }[] = [];
const pending = new Map<number, Pending>();
let nextId = 1;

function worker() {
  if (pools.length < Math.min(2, navigator.hardwareConcurrency || 2)) {
    const w = new Worker(new URL('../lib/scan/worker.ts', import.meta.url), { type: 'module' });
    w.onmessage = (e: MessageEvent<Result>) => {
      pending.get(e.data.id)?.resolve(e.data);
      pending.delete(e.data.id);
      const p = pools.find((x) => x.w === w);
      if (p) p.busy--;
    };
    pools.push({ w, busy: 0 });
  }
  return pools.reduce((a, b) => (b.busy < a.busy ? b : a));
}

type JobSpec = Job extends infer J ? (J extends Job ? Omit<J, 'id'> : never) : never;

function run(spec: JobSpec): Promise<Result> {
  const id = nextId++;
  const p = worker();
  p.busy++;
  return new Promise((resolve) => {
    pending.set(id, { resolve });
    p.w.postMessage({ ...spec, id });
  });
}

/* ---------- viewports ---------- */

function accentRgb(): [number, number, number] {
  const m = getComputedStyle(root).getPropertyValue('--lambda').match(/\d+/g);
  return m && m.length >= 3 ? [+m[0]!, +m[1]!, +m[2]!] : [255, 255, 255];
}

export class Viewport {
  readonly canvas: HTMLCanvasElement;
  readonly kCanvas: HTMLCanvasElement | null;
  private ctx: CanvasRenderingContext2D;
  private kctx: CanvasRenderingContext2D | null;
  private acq: KSpaceAcquisition | null = null;
  private result: Result | null = null;
  private mag: Float32Array = new Float32Array(0);
  private image: ImageData | null = null;
  private kimage: ImageData | null = null;
  private raf = 0;
  private generation = 0;
  private reveal: Float32Array | null = null;
  private progress = 0;
  onProgress: ((done: number, total: number) => void) | null = null;
  /** Display window and level, as fractions of the image's white point. */
  win = 1;
  level = 0.5;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    const kid = canvas.dataset['kspace'];
    this.kCanvas = kid ? (document.getElementById(kid) as HTMLCanvasElement | null) : null;
    this.kctx = this.kCanvas?.getContext('2d') ?? null;
  }

  get kind() { return (this.canvas.dataset['scan'] ?? 'mri') as 'mri' | 'ultrasound' | 'photonics'; }
  get n() { return Number(this.canvas.dataset['n'] ?? 128); }
  get order() { return (this.canvas.dataset['order'] ?? 'centric') as Order; }
  get z() { return Number(this.canvas.dataset['z'] ?? 0.12); }
  set z(v: number) { this.canvas.dataset['z'] = String(v); }

  /** Seed: an explicit data-seed (papers use their slug), else the visitor's subject. */
  get seed() {
    const s = this.canvas.dataset['seed'];
    return s ? hashString(s) : subject.seed;
  }

  async load(): Promise<void> {
    const gen = ++this.generation;
    const n = this.n;
    const res = this.kind === 'mri'
      ? await run({ kind: 'mri', seed: this.seed, z: this.z, n, protocol: this.protocolFor(), protocolSeed: this.seed ^ 0x51, noise: 0.018 })
      : await run({ kind: this.kind, seed: this.seed, n });
    if (gen !== this.generation) return;
    this.result = res;
    this.canvas.width = this.canvas.height = n;
    if (this.kCanvas) this.kCanvas.width = this.kCanvas.height = n;
    this.mag = new Float32Array(n * n);
    this.image = this.ctx.createImageData(n, n);
    this.kimage = this.kctx?.createImageData(n, n) ?? null;
    this.acq = this.kind === 'mri' ? new KSpaceAcquisition({ re: res.kre, im: res.kim }, n, this.order) : null;
    this.reveal = this.kind === 'mri' ? null : this.revealMap(n);
    this.progress = 0;
  }

  /** Papers keep a fixed protocol so their thumbnails are stable; live viewports follow the visitor. */
  private protocolFor(): ProtocolName {
    const p = this.canvas.dataset['protocol'];
    if (p && (PROTOCOL_NAMES as readonly string[]).includes(p)) return p as ProtocolName;
    return subject.protocol;
  }

  /** Non-MRI images are revealed in the order their modality forms them. */
  private revealMap(n: number): Float32Array {
    const t = new Float32Array(n * n);
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
      const x = (i + 0.5) / n - 0.5, y = (j + 0.5) / n - 0.04;
      // Ultrasound: beam lines sweep across the sector. Photonics: the field enters from below.
      t[j * n + i] = this.kind === 'ultrasound' ? (Math.atan2(x, Math.max(y, 1e-3)) + 0.7) / 1.4 : 1 - (j + 0.5) / n;
    }
    return t;
  }

  /** Acquire from scratch. Resolves when the image is complete. */
  play(duration = 1600): Promise<void> {
    cancelAnimationFrame(this.raf);
    return new Promise((resolve) => {
      if (!this.result) return resolve();
      const n = this.n;
      if (this.acq) {
        const r = this.result;
        this.acq = new KSpaceAcquisition({ re: r.kre, im: r.kim }, n, this.order);
      }
      this.progress = 0;
      if (reduced) {
        this.acq?.step(n);
        this.progress = 1;
        this.draw();
        return resolve();
      }
      const start = performance.now();
      const tick = (now: number) => {
        const f = Math.min(1, (now - start) / duration);
        if (this.acq) {
          const target = Math.round(f * n);
          if (target > this.acq.acquired) this.acq.step(target - this.acq.acquired);
          this.onProgress?.(this.acq.acquired, n);
        } else {
          this.progress = f;
          this.onProgress?.(Math.round(f * n), n);
        }
        this.draw();
        if (f < 1) this.raf = requestAnimationFrame(tick);
        else resolve();
      };
      this.raf = requestAnimationFrame(tick);
    });
  }

  /** Show the finished image without animating. */
  complete() {
    cancelAnimationFrame(this.raf);
    if (this.acq && !this.acq.done) this.acq.step(this.n);
    this.progress = 1;
    this.draw();
  }

  draw() {
    const r = this.result, img = this.image;
    if (!r || !img) return;
    const n = this.n, d = img.data;
    const lo = (this.level - this.win / 2) * r.white, scale = 255 / (this.win * r.white);
    const src = this.acq ? this.acq.magnitude(this.mag) : r.img;
    for (let p = 0; p < n * n; p++) {
      const visible = this.reveal ? this.reveal[p]! <= this.progress : true;
      const v = visible ? Math.max(0, Math.min(255, (src[p]! - lo) * scale)) : 0;
      d[p * 4] = d[p * 4 + 1] = d[p * 4 + 2] = v;
      d[p * 4 + 3] = 255;
    }
    if (subject.overlay && r.mask && (!this.acq || this.acq.done)) {
      const [ar, ag, ab] = accentRgb();
      const m = r.mask;
      for (let y = 1; y < n - 1; y++) for (let x = 1; x < n - 1; x++) {
        const p = y * n + x;
        if (m[p] && (!m[p - 1] || !m[p + 1] || !m[p - n] || !m[p + n])) {
          d[p * 4] = ar; d[p * 4 + 1] = ag; d[p * 4 + 2] = ab;
        }
      }
    }
    this.ctx.putImageData(img, 0, 0);
    if (this.acq) this.drawK();
  }

  private drawK() {
    const acq = this.acq!, ki = this.kimage, kctx = this.kctx;
    if (!ki || !kctx) return;
    const n = this.n, d = ki.data, kd = acq.kDisplay;
    const [ar, ag, ab] = accentRgb();
    const line = acq.done ? -1 : acq.lastDisplayRow;
    for (let y = 0; y < n; y++) {
      const got = acq.acquiredRows[y] === 1, cur = y === line;
      for (let x = 0; x < n; x++) {
        const p = (y * n + x) * 4;
        if (cur) { d[p] = ar; d[p + 1] = ag; d[p + 2] = ab; }
        else {
          const v = got ? Math.pow(kd[y * n + x]!, 1.6) * 255 : (x + y) % 8 === 0 ? 28 : 0;
          d[p] = d[p + 1] = d[p + 2] = v;
        }
        d[p + 3] = 255;
      }
    }
    kctx.putImageData(ki, 0, 0);
  }
}

/**
 * Drag to window/level, as on a radiology workstation: horizontal changes the
 * window width, vertical the level. Mouse and pen only, so touch still scrolls.
 * Double-click resets.
 */
export function enableWindowing(v: Viewport, onChange: (w: number, l: number) => void) {
  const el = v.canvas;
  let start: { x: number; y: number; w: number; l: number } | null = null;
  el.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch') return;
    start = { x: e.clientX, y: e.clientY, w: v.win, l: v.level };
    el.setPointerCapture(e.pointerId);
    el.classList.add('is-windowing');
  });
  el.addEventListener('pointermove', (e) => {
    if (!start) return;
    v.win = Math.min(3, Math.max(0.05, start.w * Math.exp((e.clientX - start.x) * 0.006)));
    v.level = Math.min(1.5, Math.max(-0.5, start.l - (e.clientY - start.y) * 0.003));
    v.draw();
    onChange(v.win, v.level);
  });
  const end = () => { start = null; el.classList.remove('is-windowing'); };
  el.addEventListener('pointerup', end);
  el.addEventListener('pointercancel', end);
  el.addEventListener('dblclick', () => { v.win = 1; v.level = 0.5; v.draw(); onChange(1, 0.5); });
}

/** Load and play a viewport once it scrolls into view. */
export function playWhenVisible(v: Viewport, duration: number, opts: { hoverReplay?: boolean } = {}) {
  const io = new IntersectionObserver((entries) => {
    if (!entries[0]!.isIntersecting) return;
    io.disconnect();
    v.load().then(() => v.play(duration));
  }, { rootMargin: '0px 0px 10% 0px' });
  io.observe(v.canvas);
  if (opts.hoverReplay && !reduced) {
    const host = v.canvas.closest<HTMLElement>('[data-replay-host]') ?? v.canvas;
    host.addEventListener('pointerenter', () => v.play(duration * 0.8));
  }
}

export function initScans(root: ParentNode = document) {
  const vps: Viewport[] = [];
  root.querySelectorAll<HTMLCanvasElement>('canvas[data-scan]:not([data-manual])').forEach((c) => {
    const v = new Viewport(c);
    vps.push(v);
    playWhenVisible(v, Number(c.dataset['duration'] ?? 1400), { hoverReplay: c.dataset['hover'] === 'replay' });
  });
  return vps;
}
