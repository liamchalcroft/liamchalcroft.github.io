/**
 * Line-by-line k-space acquisition with incremental reconstruction.
 *
 * A scanner fills k-space one phase-encode line at a time. Adding line ky to
 * the reconstruction adds a single 2D complex exponential band, so we never
 * redo a full inverse FFT: image += e^{2πi·ky·y/N} · IFFT_x(row ky) / N².
 * Each line costs O(N log N + N²). The partial image is shown as magnitude,
 * which is what a scanner shows, ringing and all.
 */

import { fft } from './fft';

export type Order = 'linear' | 'centric';

export class KSpaceAcquisition {
  readonly n: number;
  readonly order: number[];
  private kre: Float64Array;
  private kim: Float64Array;
  private rre: Float64Array;
  private rim: Float64Array;
  private cos: Float64Array;
  private sin: Float64Array;
  private rowR: Float64Array;
  private rowI: Float64Array;
  acquired = 0;
  /** Log-magnitude of k-space, centred, normalised to [0,1], for display. */
  readonly kDisplay: Float32Array;
  readonly acquiredRows: Uint8Array;

  constructor(k: { re: Float64Array; im: Float64Array }, n: number, order: Order) {
    this.n = n;
    this.kre = k.re; this.kim = k.im;
    this.rre = new Float64Array(n * n); this.rim = new Float64Array(n * n);
    this.cos = new Float64Array(n); this.sin = new Float64Array(n);
    for (let i = 0; i < n; i++) { this.cos[i] = Math.cos((2 * Math.PI * i) / n); this.sin[i] = Math.sin((2 * Math.PI * i) / n); }
    this.rowR = new Float64Array(n); this.rowI = new Float64Array(n);
    this.acquiredRows = new Uint8Array(n);

    // Frequencies in display order are -n/2 .. n/2-1 top to bottom; index ky = (f + n) % n.
    const freqs = Array.from({ length: n }, (_, i) => i - n / 2);
    if (order === 'centric') freqs.sort((a, b) => Math.abs(a) - Math.abs(b) || a - b);
    this.order = freqs.map((f) => (f + n) % n);

    this.kDisplay = new Float32Array(n * n);
    let max = 0;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const sy = (y + n / 2) % n, sx = (x + n / 2) % n;
      const v = Math.log1p(Math.hypot(k.re[sy * n + sx]!, k.im[sy * n + sx]!));
      this.kDisplay[y * n + x] = v;
      if (v > max) max = v;
    }
    for (let i = 0; i < n * n; i++) this.kDisplay[i]! /= max;
  }

  get done() { return this.acquired >= this.n; }

  /** Display row (0 = top of the centred k-space panel) of the line acquired most recently. */
  get lastDisplayRow(): number {
    if (this.acquired === 0) return -1;
    return (this.order[this.acquired - 1]! + this.n / 2) % this.n;
  }

  step(lines = 1): void {
    const { n } = this;
    for (let s = 0; s < lines && !this.done; s++) {
      const ky = this.order[this.acquired++]!;
      this.acquiredRows[(ky + n / 2) % n] = 1;
      this.rowR.set(this.kre.subarray(ky * n, ky * n + n));
      this.rowI.set(this.kim.subarray(ky * n, ky * n + n));
      fft(this.rowR, this.rowI, true);
      const inv = 1 / (n * n);
      for (let y = 0; y < n; y++) {
        const ph = (ky * y) % n;
        const c = this.cos[ph]! * inv, sn = this.sin[ph]! * inv;
        const o = y * n;
        for (let x = 0; x < n; x++) {
          const a = this.rowR[x]!, b = this.rowI[x]!;
          this.rre[o + x]! += c * a - sn * b;
          this.rim[o + x]! += sn * a + c * b;
        }
      }
    }
  }

  /** Current magnitude image. */
  magnitude(out: Float32Array): Float32Array {
    for (let i = 0; i < out.length; i++) out[i] = Math.hypot(this.rre[i]!, this.rim[i]!);
    return out;
  }
}
