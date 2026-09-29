import type { CollectionEntry } from 'astro:content';

const PROTOCOLS = ['T1w', 'T2w', 'FLAIR', 'PDw', 'T2*w'] as const;

/**
 * The thumbnail parameters PaperCard uses, so a paper's image is the same on
 * the home page, the publications list and its own page.
 */
export function tileParams(entry: CollectionEntry<'publications'>) {
  return {
    kind: entry.data.modality,
    seed: entry.id,
    protocol: PROTOCOLS[entry.id.length % PROTOCOLS.length]!,
    z: 0.02 + (entry.id.length % 5) * 0.06,
    modalityLabel: { mri: 'MR', ultrasound: 'US', photonics: 'FDTD' }[entry.data.modality],
  };
}
