# liamchalcroft.github.io

Personal site of Dr Liam Chalcroft. Astro + TypeScript, deployed to GitHub Pages by GitHub Actions.

Every scan on the site is synthesised in the visitor's browser. Each visit gets a random 32-bit subject seed, and that seed fixes:

1. **Anatomy.** A procedural brain phantom built as tissue labels with partial-volume fractions: cortex with radial sulci, white matter, deep grey matter, ventricles, and usually a stroke lesion (`src/lib/scan/phantom.ts`).
2. **Contrast.** Per-tissue proton density and T1/T2/T2\* go through the signal equation for a sampled protocol (SPGR, FSE, FLAIR), or through random per-tissue intensities in SynthSeg style (`src/lib/scan/physics.ts`).
3. **Acquisition.** The image is Fourier transformed and re-acquired one phase-encode line at a time, with an O(N²)-per-line incremental reconstruction (`src/lib/scan/acquire.ts`).
4. **Colour.** The only colour on the site is one wavelength between 450 and 650 nm, converted with the CIE 1931 colour-matching functions (`src/lib/scan/spectrum.ts`).

Append `?subject=84cb3841&protocol=FLAIR` to any URL to reproduce a subject. The paper thumbnails are seeded by their slug, so they're the same for everyone.

## Working on it

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # type-checks, then builds to dist/
```

- **Add a paper:** create `src/content/publications/<slug>.md` (the schema is in `src/content.config.ts`; the filename is the URL). The home page, publications page, detail page, BibTeX, Scholar meta tags, feed and sitemap all update from that file. Set `selected: true` to put it on the home page.
- **Add a talk:** edit `src/data/talks.ts`.
- **CV, software, milestones:** `src/data/cv.ts`, `src/data/software.ts`, `src/data/log.ts`.

## Deploying

`.github/workflows/deploy.yml` builds on every push and PR, and deploys pushes to `master`.
**One-time setup:** in the repository's *Settings → Pages*, set *Source* to **GitHub Actions**. Until then GitHub keeps trying to build the repo with Jekyll.

See [docs/custom-domain.md](docs/custom-domain.md) for moving to a custom domain.
