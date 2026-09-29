/// <reference lib="webworker" />
import { fft2 } from './fft';
import { photonics, ultrasound } from './modalities';
import { makeNoise3 } from './noise';
import { lesionMask, makeAnatomy, sliceFractions, type Anatomy } from './phantom';
import { makeProtocol, subjectTissues, synthesise, type ProtocolName } from './physics';
import { mulberry32 } from './prng';

export type Job =
  | { id: number; kind: 'mri'; seed: number; z: number; n: number; protocol: ProtocolName; protocolSeed: number; noise: number }
  | { id: number; kind: 'ultrasound' | 'photonics'; seed: number; n: number };

export interface Result {
  id: number;
  n: number;
  img: Float32Array;
  kre: Float64Array;
  kim: Float64Array;
  /** Lesion mask, MRI only. */
  mask: Uint8Array | null;
  /** Value that maps to white, so partial reconstructions share the final image's scale. */
  white: number;
}

const anatomies = new Map<number, Anatomy>();
const anatomy = (seed: number) => {
  let a = anatomies.get(seed);
  if (!a) { a = makeAnatomy(seed); anatomies.set(seed, a); }
  return a;
};

function percentile(a: Float32Array, q: number) {
  const s = Float32Array.from(a).sort();
  return s[Math.floor((s.length - 1) * q)]! || 1;
}

self.onmessage = (e: MessageEvent<Job>) => {
  const job = e.data;
  let img: Float32Array, mask: Uint8Array | null = null;
  if (job.kind === 'mri') {
    const an = anatomy(job.seed);
    const frac = sliceFractions(an, job.z, job.n);
    const bn = makeNoise3(job.seed ^ 0xb1a5);
    const bias = (x: number, y: number) => 1 + 0.18 * bn(x * 1.2, y * 1.2, job.z);
    img = synthesise(frac, job.n, {
      protocol: makeProtocol(mulberry32(job.protocolSeed), job.protocol),
      tissues: subjectTissues(job.seed),
      noise: job.noise,
      seed: job.seed ^ Math.round(job.z * 1000),
    }, bias);
    mask = lesionMask(frac, job.n);
  } else {
    img = job.kind === 'ultrasound' ? ultrasound(job.seed, job.n) : photonics(job.seed, job.n);
  }
  const white = percentile(img, 0.995);
  const k = fft2(img, job.n);
  const res: Result = { id: job.id, n: job.n, img, kre: k.re, kim: k.im, mask, white };
  (self as unknown as Worker).postMessage(res, [img.buffer, k.re.buffer, k.im.buffer, ...(mask ? [mask.buffer] : [])]);
};
