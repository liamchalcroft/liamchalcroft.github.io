# liamchalcroft.github.io

Personal site of Dr Liam Chalcroft. Astro + TypeScript, deployed to GitHub Pages by GitHub Actions.

The design is called *Timesteps*. The site is set in one typeface, [Redaction](https://github.com/jeremymickel/Redaction), which comes in seven levels of bitmap degradation. Display text is sampled from noise glyph by glyph (`src/scripts/denoise.ts`):

- Every glyph gets its own offset in the noise schedule from a seeded PRNG, so words resolve unevenly, as a real diffusion sample does.
- The hero sentence is sampled when the page opens. Headings follow their scroll position, so they are noisy low on the screen and clean by mid-screen.
- Hovering a heading resamples it. Clicking an internal link runs the forward process before navigating.
- The clean text always holds the layout, and noisy glyphs are drawn as overlays, so lines never reflow. With JS off, or with reduced motion, text is simply clean.
- Append `?seed=84cb3841` to reproduce a sample.

The home page's one figure, `src/components/SynthFigure.astro`, is a live version of the PhD method:

1. A procedural brain phantom is generated as tissue labels (`src/lib/scan/phantom.ts`).
2. It is pushed through an MRI signal equation, or through random SynthSeg-style intensities (`src/lib/scan/physics.ts`).
3. This runs in a Web Worker.

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
