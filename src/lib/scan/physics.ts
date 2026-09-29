/**
 * Quantitative MRI: each tissue gets proton density and relaxation times, and a
 * sequence's signal equation turns them into image contrast. The same labels
 * can therefore produce a T1-weighted, a FLAIR, or a contrast no scanner makes.
 */

import { NL } from './phantom';
import { gaussian, mulberry32, pick, range, type Rng } from './prng';

export interface Tissue { pd: number; t1: number; t2: number; t2s: number }

/** Approximate 3T values, ms. Order matches LABELS. */
const BASE: Tissue[] = [
  { pd: 0, t1: 1, t2: 1, t2s: 1 }, // air
  { pd: 0.9, t1: 380, t2: 70, t2s: 35 }, // scalp (mostly fat)
  { pd: 0.12, t1: 400, t2: 40, t2s: 8 }, // skull
  { pd: 1.0, t1: 4000, t2: 2000, t2s: 450 }, // csf
  { pd: 0.8, t1: 1330, t2: 110, t2s: 66 }, // gm
  { pd: 0.69, t1: 830, t2: 80, t2s: 53 }, // wm
  { pd: 0.78, t1: 1100, t2: 90, t2s: 45 }, // deep gm
  { pd: 0.9, t1: 2200, t2: 320, t2s: 160 }, // lesion (chronic infarct)
];

export type Protocol =
  | { kind: 'spgr'; name: string; tr: number; te: number; fa: number }
  | { kind: 'fse'; name: string; tr: number; te: number }
  | { kind: 'flair'; name: string; tr: number; te: number; ti: number }
  | { kind: 'gmm'; name: string; means: number[] };

export const PROTOCOL_NAMES = ['T1w', 'PDw', 'T2*w', 'T2w', 'FLAIR', 'Synthetic'] as const;
export type ProtocolName = (typeof PROTOCOL_NAMES)[number];

export function makeProtocol(r: Rng, name: ProtocolName = pick(r, PROTOCOL_NAMES)): Protocol {
  const round = (v: number, d = 0) => Number(v.toFixed(d));
  switch (name) {
    case 'T1w': return { kind: 'spgr', name, tr: round(range(r, 14, 22), 1), te: round(range(r, 2.5, 4.9), 1), fa: round(range(r, 18, 30)) };
    case 'PDw': return { kind: 'spgr', name, tr: round(range(r, 25, 40), 1), te: round(range(r, 2.5, 4), 1), fa: round(range(r, 4, 6)) };
    case 'T2*w': return { kind: 'spgr', name, tr: round(range(r, 600, 900)), te: round(range(r, 25, 35)), fa: round(range(r, 18, 25)) };
    case 'T2w': return { kind: 'fse', name, tr: round(range(r, 4000, 6500)), te: round(range(r, 85, 110)) };
    case 'FLAIR': return { kind: 'flair', name, tr: 9000, te: round(range(r, 100, 130)), ti: round(range(r, 2450, 2650)) };
    case 'Synthetic': {
      // SynthSeg-style: an arbitrary intensity per tissue, no physics at all.
      const means = Array.from({ length: NL }, () => r());
      means[0] = 0;
      return { kind: 'gmm', name, means };
    }
  }
}

export function describeProtocol(p: Protocol): string {
  switch (p.kind) {
    case 'spgr': return `SPGR  TR ${p.tr}  TE ${p.te}  FA ${p.fa}°`;
    case 'fse': return `FSE  TR ${p.tr}  TE ${p.te}`;
    case 'flair': return `IR-FSE  TR ${p.tr}  TI ${p.ti}  TE ${p.te}`;
    case 'gmm': return `GMM  random tissue means`;
  }
}

export function signal(t: Tissue, p: Protocol, label: number): number {
  switch (p.kind) {
    case 'spgr': {
      const a = (p.fa * Math.PI) / 180;
      const e1 = Math.exp(-p.tr / t.t1);
      return (t.pd * Math.sin(a) * (1 - e1)) / (1 - Math.cos(a) * e1) * Math.exp(-p.te / t.t2s);
    }
    case 'fse': return t.pd * (1 - Math.exp(-p.tr / t.t1)) * Math.exp(-p.te / t.t2);
    case 'flair':
      return t.pd * Math.abs(1 - 2 * Math.exp(-p.ti / t.t1) + Math.exp(-p.tr / t.t1)) * Math.exp(-p.te / t.t2);
    case 'gmm': return p.means[label]!;
  }
}

/** Per-subject tissue properties: the base values with a few percent of biological variation. */
export function subjectTissues(seed: number): Tissue[] {
  const r = mulberry32(seed ^ 0x71553e);
  return BASE.map((t, i) => {
    const j = (s: number) => 1 + s * gaussian(r);
    const les = i === 7;
    return {
      pd: t.pd * j(0.03),
      t1: t.t1 * (les ? range(r, 0.75, 1.4) : j(0.05)),
      t2: t.t2 * (les ? range(r, 0.6, 1.6) : j(0.05)),
      t2s: t.t2s * j(0.06),
    };
  });
}

export interface Acquisition {
  protocol: Protocol;
  tissues: Tissue[];
  /** Rician noise as a fraction of the brightest tissue. */
  noise: number;
  seed: number;
}

/**
 * Fractions to image: partial-volume mix of tissue signals, a smooth receive
 * bias field, then Rician noise (the magnitude of complex Gaussian noise).
 */
export function synthesise(frac: Float32Array, n: number, acq: Acquisition, bias: (x: number, y: number) => number): Float32Array {
  const s = acq.tissues.map((t, i) => signal(t, acq.protocol, i));
  const peak = Math.max(...s.slice(1));
  const r = mulberry32(acq.seed ^ 0xa11ce);
  const sigma = acq.noise * peak;
  const img = new Float32Array(n * n);
  for (let p = 0; p < n * n; p++) {
    let v = 0;
    for (let l = 0; l < NL; l++) v += frac[p * NL + l]! * s[l]!;
    v *= bias((p % n) / n, Math.floor(p / n) / n);
    const re = v + sigma * gaussian(r);
    const im = sigma * gaussian(r);
    img[p] = Math.hypot(re, im) / peak;
  }
  return img;
}
