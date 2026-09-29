/**
 * Procedural images for the non-MRI papers. These are illustrations, not
 * simulations, and every caption on the site says so.
 */

import { makeNoise3 } from './noise';
import { gaussian, mulberry32, range } from './prng';

/** B-mode ultrasound: a sector with Rayleigh speckle and a hypoechoic gland. */
export function ultrasound(seed: number, n: number): Float32Array {
  const r = mulberry32(seed);
  const noise = makeNoise3(seed);
  const img = new Float32Array(n * n);
  const half = (range(r, 32, 38) * Math.PI) / 180;
  const gland = { x: range(r, -0.08, 0.08), y: range(r, 0.5, 0.6), rx: range(r, 0.2, 0.26), ry: range(r, 0.13, 0.18) };
  // Speckle is correlated along the beam, so draw it in polar space.
  const speckle = (a: number, d: number) => {
    const g1 = noise(a * 95, d * 70, 1), g2 = noise(a * 95 + 50, d * 70, 2);
    return Math.hypot(g1, g2) * 1.6;
  };
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    const x = (i + 0.5) / n - 0.5, y = (j + 0.5) / n - 0.04;
    const d = Math.hypot(x, y), a = Math.atan2(x, y);
    if (y <= 0 || Math.abs(a) > half || d < 0.1 || d > 0.95) continue;
    const gx = (x - gland.x) / gland.rx, gy = (y - gland.y) / gland.ry;
    const gd = Math.hypot(gx, gy) + 0.08 * noise(x * 8, y * 8, 3);
    let echo = 0.42 + 0.12 * noise(x * 4, y * 4, 4);
    if (gd < 1) echo = 0.2 + 0.08 * noise(x * 10, y * 10, 5);
    echo += 0.55 * Math.exp(-Math.pow((gd - 1) / 0.05, 2)); // capsule
    echo += 0.35 * Math.exp(-Math.pow((y - 0.12 - 0.02 * noise(x * 6, 0, 6)) / 0.012, 2)); // near-field interface
    const att = Math.exp(-1.1 * d);
    img[j * n + i] = Math.min(1, echo * speckle(a, d) * att * 1.4 + 0.02 * gaussian(r));
  }
  return img;
}

/**
 * Inverse-designed photonic structure: a mirror-symmetric binary pattern with a
 * minimum feature size, fed by a waveguide from below, with the field intensity
 * radiating from the input port and slowed inside the material.
 */
export function photonics(seed: number, n: number): Float32Array {
  const r = mulberry32(seed);
  const noise = makeNoise3(seed);
  const img = new Float32Array(n * n);
  const k = range(r, 70, 90);
  const box = { x0: 0.16, x1: 0.84, y0: 0.2, y1: 0.74 };
  const ports = [0.3, 0.5, 0.7];
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    const x = (i + 0.5) / n, y = (j + 0.5) / n;
    const mx = 0.5 - Math.abs(x - 0.5); // mirror symmetry about the axis
    const inBox = x > box.x0 && x < box.x1 && y > box.y0 && y < box.y1;
    let eps = 0;
    if (inBox) {
      const v = noise(mx * 11, y * 11, 0) + 0.45 * noise(mx * 23, y * 23, 1);
      const edge = Math.min(x - box.x0, box.x1 - x, y - box.y0, box.y1 - y);
      eps = v + 0.25 * Math.exp(-edge * 60) > 0.04 ? 1 : 0;
    } else if (y >= box.y1 && Math.abs(x - 0.5) < 0.035) eps = 1;
    else if (y <= box.y0 && ports.some((c) => Math.abs(x - c) < 0.025)) eps = 1;
    // Cylindrical wave from the input port; the material raises the index, so fringes tighten there.
    const dx = x - 0.5, dy = box.y1 - y;
    const rr = Math.hypot(dx * 1.4, dy) + 0.05 * noise(x * 6, y * 6, 3);
    const phase = k * rr * (eps ? 1.35 : 1);
    let env = 0;
    if (inBox) env = Math.exp(-rr * 1.2) * (0.7 + 0.5 * noise(x * 5, y * 5, 2));
    else if (eps) env = 0.9;
    const field = env * Math.pow(Math.cos(phase), 2);
    img[j * n + i] = 0.06 + (eps ? 0.3 : 0) + 0.62 * field;
  }
  return img;
}
