/**
 * A procedural brain phantom: tissue label maps generated from a seed, the way
 * SynthSeg-style methods start from labels rather than images.
 *
 * Coordinates are normalised head space: x left–right, y posterior–anterior
 * (anterior is +y, drawn at the top of an axial slice), z inferior–superior.
 * Every structure is a signed-distance-ish field, so boundaries can be given a
 * soft width and the output carries partial-volume fractions, not hard labels.
 */

import { makeNoise3, type Noise3 } from './noise';
import { mulberry32, range, type Rng } from './prng';

export const LABELS = ['air', 'scalp', 'skull', 'csf', 'gm', 'wm', 'deep', 'lesion'] as const;
export type Label = (typeof LABELS)[number];
export const NL = LABELS.length;
const [AIR, SCALP, SKULL, CSF, GM, WM, DEEP, LESION] = [0, 1, 2, 3, 4, 5, 6, 7] as const;

export interface Anatomy {
  seed: number;
  noise: Noise3;
  head: { c: V3; r: V3 };
  scalp: number;
  skull: number;
  /** Extra CSF around and inside the brain: 0 is young, 1 is marked atrophy. */
  atrophy: number;
  cortex: number;
  sulcusFreq: number;
  sulcusDepth: number;
  ventricleScale: number;
  lesion: { c: V3; r: V3; roughness: number } | null;
}

type V3 = [number, number, number];

export function makeAnatomy(seed: number): Anatomy {
  const r: Rng = mulberry32(seed ^ 0x5eed);
  const atrophy = Math.pow(r(), 1.6);
  const side = r() < 0.5 ? -1 : 1;
  const hasLesion = r() > 0.12;
  const lr = range(r, 0.05, 0.15);
  return {
    seed,
    noise: makeNoise3(seed),
    head: {
      c: [0, -0.03, -0.12],
      r: [0.74 * range(r, 0.95, 1.04), 0.92 * range(r, 0.96, 1.04), 0.9],
    },
    scalp: range(r, 0.035, 0.055),
    skull: range(r, 0.04, 0.06),
    atrophy,
    cortex: range(r, 0.024, 0.032),
    sulcusFreq: range(r, 8, 9.5),
    sulcusDepth: range(r, 0.13, 0.17),
    ventricleScale: 1 + 1.1 * atrophy + range(r, -0.1, 0.15),
    lesion: hasLesion
      ? {
          c: [side * range(r, 0.26, 0.44), range(r, -0.34, 0.34), range(r, -0.05, 0.36)],
          r: [lr * range(r, 0.7, 1.2), lr * range(r, 0.8, 1.6), lr * range(r, 0.7, 1.3)],
          roughness: range(r, 0.02, 0.05),
        }
      : null,
  };
}

/** Inigo Quilez's ellipsoid distance bound; negative inside. */
function ellipsoid(x: number, y: number, z: number, c: V3, r: V3): number {
  const px = x - c[0], py = y - c[1], pz = z - c[2];
  const k0 = Math.hypot(px / r[0], py / r[1], pz / r[2]);
  const k1 = Math.hypot(px / (r[0] * r[0]), py / (r[1] * r[1]), pz / (r[2] * r[2]));
  return k1 === 0 ? -Math.min(...r) : (k0 * (k0 - 1)) / k1;
}

const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
/** Soft inside-ness: 1 well inside (d << 0), 0 well outside, over a band of width w. */
const inside = (d: number, w: number) => {
  const t = clamp01(0.5 - d / w);
  return t * t * (3 - 2 * t);
};
const over = (base: number, a: number) => base * (1 - a);

/**
 * Tissue fractions at one point, written into `out` (length NL, sums to 1).
 * `w` is the partial-volume band width, about one pixel in normalised units.
 */
export function tissueAt(an: Anatomy, x: number, y: number, z: number, w: number, out: Float32Array) {
  const n = an.noise;
  const { head } = an;

  const dHead =
    ellipsoid(x, y, z, head.c, head.r) + 0.022 * n(x * 1.3, y * 1.3, z * 1.3 + 40) + 0.03 * Math.max(0, -y - 0.5);
  const aHead = inside(dHead, w);
  const aSkull = inside(dHead + an.scalp, w);
  const aInner = inside(dHead + an.scalp + an.skull, w);

  // Brain envelope sits inside the skull, narrowing towards the frontal pole.
  const gap = 0.012 + 0.03 * an.atrophy;
  const frontal = Math.max(0, y) * 0.07;
  const dBrain = dHead + an.scalp + an.skull + gap + frontal * Math.abs(x) + 0.006 * n(x * 9, y * 9 + 3, z * 9);
  const aBrain = inside(dBrain, w);
  const depth = -dBrain;

  // Sulci are zero-crossings of noise sampled by direction from the brain centre,
  // so the sheets run radially like real sulci; a little depth term lets them bend.
  const f = an.sulcusFreq;
  const qx = x - head.c[0], qy = (y - head.c[1]) * 0.85, qz = z - head.c[2] - 0.1;
  const ql = Math.hypot(qx, qy, qz) || 1;
  const bend = depth * 4;
  const wx = 0.6 * n(x * 2.4 + 11, y * 2.4, z * 2.4);
  const wy = 0.6 * n(x * 2.4, y * 2.4 + 23, z * 2.4);
  const nv =
    n((qx / ql) * f + wx + bend, (qy / ql) * f + wy, (qz / ql) * f + bend * 0.5) +
    0.25 * n((qx / ql) * f * 2.1 + 5, (qy / ql) * f * 2.1, (qz / ql) * f * 2.1 + bend);
  // Convert noise units to distance: angular frequency f over the local radius.
  const dSulc = (Math.abs(nv) * ql) / (f * 0.9);
  // Sulcal depth varies: some cut deep into white matter, others barely dent the surface.
  const sDepth = an.sulcusDepth * (0.55 + 0.9 * (0.5 + n(x * 3.1 + 70, y * 3.1, z * 3.1)));
  const taper = clamp01(1 - depth / sDepth);
  const sulcW = (0.0035 + 0.007 * an.atrophy) * Math.pow(taper, 0.5);
  const wall = an.cortex * clamp01((sDepth + an.cortex - depth) / an.cortex);

  // Interhemispheric fissure, stopped by the callosal/deep core.
  const fx = Math.abs(x - 0.012 * n(0, y * 3, z * 3 + 7));
  const dCore = ellipsoid(x, y, z, [0, -0.04, -0.02], [0.3, 0.4, 0.2]);
  const coreStop = clamp01(dCore / 0.04);
  const fisW = (0.005 + 0.006 * an.atrophy) * coreStop;
  const fisWall = an.cortex * coreStop;

  const csfSulc = Math.max(inside(dSulc - sulcW, w) * (taper > 0 ? 1 : 0), inside(fx - fisW, w) * (fisW > 0.0005 ? 1 : 0));
  const gmWall = Math.max(
    inside(dSulc - sulcW - wall, w) * clamp01(wall / (0.3 * an.cortex)),
    inside(fx - fisW - fisWall, w) * coreStop,
  );
  const aWm = inside(Math.max(an.cortex - depth, -0.001), w) * (1 - gmWall);

  // Lateral ventricles: two curved tubes that diverge posteriorly, split by a septum.
  const vs = an.ventricleScale;
  const cx = 0.055 + 0.13 * clamp01(-(y + 0.05) / 0.4);
  const cz = 0.07 + 0.05 * clamp01(y / 0.3) - 0.08 * clamp01(-(y + 0.3) / 0.2);
  const ly = Math.max(0, Math.abs(y + 0.07) - 0.3);
  const dVent =
    (Math.hypot((Math.abs(x) - cx) / (0.04 * vs), (z - cz) / (0.06 * Math.sqrt(vs)), ly / 0.07) - 1) * 0.04 * vs;
  const septum = inside(Math.abs(x) - 0.004, w * 0.6);
  const dThird = ellipsoid(x, y, z, [0, -0.05, -0.12], [0.008 * vs, 0.12, 0.07]);
  const aVent = Math.max(inside(dVent, w) * (1 - septum), inside(dThird, w));

  // Deep grey matter: caudate, putamen, thalamus (both sides).
  const ax = Math.abs(x);
  const dDeep = Math.min(
    ellipsoid(ax, y, z, [0.095 + 0.01 * vs, 0.13, 0.05], [0.04, 0.09, 0.08]),
    ellipsoid(ax, y, z, [0.23, 0.03, -0.03], [0.045, 0.13, 0.09]),
    ellipsoid(ax, y, z, [0.08, -0.13, -0.04], [0.06, 0.1, 0.08]),
  );
  const aDeep = inside(dDeep, w);

  let aLes = 0;
  if (an.lesion) {
    const L = an.lesion;
    const d = ellipsoid(x, y, z, L.c, L.r) + L.roughness * n(x * 9 + 3, y * 9, z * 9);
    aLes = inside(d, w) * (1 - aVent);
  }

  // Composite from the outside in.
  out.fill(0);
  out[AIR] = 1 - aHead;
  out[SCALP] = aHead - aSkull;
  out[SKULL] = aSkull - aInner;
  const csfOuter = aInner - aBrain;

  // Inside the brain, layer: gm/wm base, deep gm, sulcal csf, lesion, ventricles.
  let gm = 1 - aWm, wm = aWm, deep = 0, csf = 0, les = 0;
  const layer = (a: number) => { gm = over(gm, a); wm = over(wm, a); deep = over(deep, a); csf = over(csf, a); les = over(les, a); };
  layer(aDeep); deep += aDeep;
  layer(csfSulc); csf += csfSulc;
  layer(aLes); les += aLes;
  layer(aVent); csf += aVent;

  out[CSF] = csfOuter + aBrain * csf;
  out[GM] = aBrain * gm;
  out[WM] = aBrain * wm;
  out[DEEP] = aBrain * deep;
  out[LESION] = aBrain * les;
}

/** Fractions for an n×n axial slice at height z: Float32Array of n*n*NL, pixel-major. */
export function sliceFractions(an: Anatomy, z: number, n: number): Float32Array {
  const out = new Float32Array(n * n * NL);
  const px = new Float32Array(NL);
  const span = 2.05; // field of view in normalised units
  const w = (1.2 * span) / n;
  for (let j = 0; j < n; j++) {
    const y = span / 2 - ((j + 0.5) * span) / n - 0.04;
    for (let i = 0; i < n; i++) {
      const x = ((i + 0.5) * span) / n - span / 2;
      tissueAt(an, x, y, z, w, px);
      out.set(px, (j * n + i) * NL);
    }
  }
  return out;
}

/** Hard lesion mask from fractions, for drawing a "model prediction" outline. */
export function lesionMask(frac: Float32Array, n: number): Uint8Array {
  const m = new Uint8Array(n * n);
  for (let i = 0; i < n * n; i++) m[i] = frac[i * NL + LESION]! > 0.5 ? 1 : 0;
  return m;
}
