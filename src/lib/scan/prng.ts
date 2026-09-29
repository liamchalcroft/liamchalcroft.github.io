/** Seeded randomness. Everything generative on the site is a pure function of a 32-bit seed. */

export type Rng = () => number;

export function mulberry32(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** FNV-1a, for turning slugs into seeds. */
export function hashString(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export const range = (r: Rng, lo: number, hi: number) => lo + (hi - lo) * r();
export const pick = <T>(r: Rng, xs: readonly T[]): T => xs[Math.floor(r() * xs.length)]!;

/** Standard normal via Box-Muller. */
export function gaussian(r: Rng): number {
  const u = Math.max(r(), 1e-12);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r());
}

export const formatSeed = (seed: number) => (seed >>> 0).toString(16).padStart(8, '0');
export const parseSeed = (s: string | null): number | null =>
  s && /^[0-9a-f]{1,8}$/i.test(s) ? parseInt(s, 16) >>> 0 : null;
