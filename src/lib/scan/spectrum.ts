/**
 * Wavelength to sRGB, via the Wyman–Sloan–Shirley (2013) multi-lobe fit to the
 * CIE 1931 2° colour-matching functions. This is the only source of colour on the site.
 */

const g = (x: number, mu: number, s1: number, s2: number) => {
  const t = (x - mu) / (x < mu ? s1 : s2);
  return Math.exp(-0.5 * t * t);
};

export function cie1931(nm: number): [number, number, number] {
  const x = 1.056 * g(nm, 599.8, 37.9, 31.0) + 0.362 * g(nm, 442.0, 16.0, 26.7) - 0.065 * g(nm, 501.1, 20.4, 26.2);
  const y = 0.821 * g(nm, 568.8, 46.9, 40.5) + 0.286 * g(nm, 530.9, 16.3, 31.1);
  const z = 1.217 * g(nm, 437.0, 11.8, 36.0) + 0.681 * g(nm, 459.0, 26.0, 13.8);
  return [x, y, z];
}

const gamma = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055);

/** Monochromatic light is outside the sRGB gamut; desaturate towards white until it fits, then normalise. */
export function wavelengthToRgb(nm: number): [number, number, number] {
  const [X, Y, Z] = cie1931(nm);
  let r = 3.2406 * X - 1.5372 * Y - 0.4986 * Z;
  let gg = -0.9689 * X + 1.8758 * Y + 0.0415 * Z;
  let b = 0.0557 * X - 0.204 * Y + 1.057 * Z;
  const w = -Math.min(0, r, gg, b);
  r += w; gg += w; b += w;
  const m = Math.max(r, gg, b) || 1;
  return [r / m, gg / m, b / m].map((c) => Math.round(255 * gamma(c))) as [number, number, number];
}

export const wavelengthToCss = (nm: number) => `rgb(${wavelengthToRgb(nm).join(' ')})`;

/** A CSS gradient sampling the visible spectrum, for the one spectral rule on each page. */
export function spectrumGradient(from = 400, to = 700, stops = 24): string {
  const parts: string[] = [];
  for (let i = 0; i <= stops; i++) {
    const nm = from + ((to - from) * i) / stops;
    parts.push(`${wavelengthToCss(nm)} ${((100 * i) / stops).toFixed(1)}%`);
  }
  return `linear-gradient(90deg, ${parts.join(', ')})`;
}
