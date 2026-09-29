/// <reference lib="webworker" />
import { makeNoise3 } from './noise';
import { NL, lesionMask, makeAnatomy, sliceFractions, type Anatomy } from './phantom';
import { makeProtocol, subjectTissues, synthesise, type ProtocolName } from './physics';
import { mulberry32 } from './prng';

export interface Job { id: number; seed: number; z: number; n: number; protocol: ProtocolName; noise: number }

export interface Result {
  id: number;
  n: number;
  img: Float32Array;
  mask: Uint8Array;
  /** Dominant tissue label per pixel. */
  labels: Uint8Array;
  /** Value that maps to white. */
  white: number;
}

const anatomies = new Map<number, Anatomy>();
const anatomy = (seed: number) => {
  let a = anatomies.get(seed);
  if (!a) { a = makeAnatomy(seed); anatomies.set(seed, a); }
  return a;
};

self.onmessage = (e: MessageEvent<Job>) => {
  const job = e.data;
  const frac = sliceFractions(anatomy(job.seed), job.z, job.n);
  const bn = makeNoise3(job.seed ^ 0xb1a5);
  const img = synthesise(frac, job.n, {
    protocol: makeProtocol(mulberry32(job.seed ^ 0x51), job.protocol),
    tissues: subjectTissues(job.seed),
    noise: job.noise,
    seed: job.seed ^ Math.round(job.z * 1000),
  }, (x, y) => 1 + 0.18 * bn(x * 1.2, y * 1.2, job.z));
  const labels = new Uint8Array(job.n * job.n);
  for (let p = 0; p < job.n * job.n; p++) {
    let best = 0;
    for (let l = 1; l < NL; l++) if (frac[p * NL + l]! > frac[p * NL + best]!) best = l;
    labels[p] = best;
  }
  const sorted = Float32Array.from(img).sort();
  const white = sorted[Math.floor((sorted.length - 1) * 0.995)]! || 1;
  const mask = lesionMask(frac, job.n);
  const res: Result = { id: job.id, n: job.n, img, mask, labels, white };
  (self as unknown as Worker).postMessage(res, [img.buffer, mask.buffer, labels.buffer]);
};
