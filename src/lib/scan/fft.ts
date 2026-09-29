/** In-place iterative radix-2 FFT on split real/imaginary arrays. `inverse` omits the 1/N scale. */
export function fft(re: Float64Array, im: Float64Array, inverse = false): void {
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      [re[i], re[j]] = [re[j]!, re[i]!];
      [im[i], im[j]] = [im[j]!, im[i]!];
    }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = ((inverse ? 2 : -2) * Math.PI) / len;
    const wr = Math.cos(ang), wi = Math.sin(ang);
    for (let i = 0; i < n; i += len) {
      let cr = 1, ci = 0;
      for (let k = 0; k < len / 2; k++) {
        const a = i + k, b = a + len / 2;
        const tr = re[b]! * cr - im[b]! * ci;
        const ti = re[b]! * ci + im[b]! * cr;
        re[b] = re[a]! - tr; im[b] = im[a]! - ti;
        re[a] = re[a]! + tr; im[a] = im[a]! + ti;
        const t = cr * wr - ci * wi;
        ci = cr * wi + ci * wr;
        cr = t;
      }
    }
  }
}

/** 2D forward FFT of a real n×n image. Returns row-major complex k-space (unshifted). */
export function fft2(img: Float32Array, n: number): { re: Float64Array; im: Float64Array } {
  const re = new Float64Array(n * n), im = new Float64Array(n * n);
  re.set(img);
  const rr = new Float64Array(n), ri = new Float64Array(n);
  for (let y = 0; y < n; y++) {
    rr.set(re.subarray(y * n, y * n + n)); ri.fill(0);
    fft(rr, ri);
    re.set(rr, y * n); im.set(ri, y * n);
  }
  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) { rr[y] = re[y * n + x]!; ri[y] = im[y * n + x]!; }
    fft(rr, ri);
    for (let y = 0; y < n; y++) { re[y * n + x] = rr[y]!; im[y * n + x] = ri[y]!; }
  }
  return { re, im };
}
