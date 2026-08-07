# liamchalcroft.github.io

Personal academic site for Liam Chalcroft, built with Jekyll and deployed by GitHub Pages.

Originally forked from [academicpages](https://github.com/academicpages/academicpages.github.io), which derives from the [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) theme (© 2016 Michael Rose, MIT). The theme layer has since been replaced; see `LICENSE`.

## Structure

| Path | Contents |
| --- | --- |
| `_pages/` | Home, publications, software, CV, sitemap, 404 |
| `_publications/` | One file per paper. Front matter drives the listing and detail pages |
| `_data/navigation.yml` | Top navigation |
| `_layouts/`, `_includes/` | Page shell |
| `_sass/` | `_tokens` (design tokens), `_base`, `_layout`, `_components`, `_syntax`, `_print` |
| `assets/css/main.scss` | Stylesheet entry point |

## Running locally

GitHub Pages pins Jekyll 3.x, which needs Ruby 3.3 or older. Ruby 3.4 removed `csv` and `base64` from the standard library and Ruby 3.2 removed `Object#tainted?`, which the pinned Liquid version calls.

```sh
brew install ruby@3.3
export PATH="/opt/homebrew/opt/ruby@3.3/bin:$PATH"
bundle install
bundle exec jekyll serve
```

The site is then at <http://127.0.0.1:4000>.

## Adding a publication

Create `_publications/<year>-<slug>.md`:

```yaml
---
title: "Paper title"
collection: publications
permalink: /publication/<year>-<slug>
date: 2026-01-01
authors: 'A. Author, L. Chalcroft'
venue: 'Venue name'
paperurl: 'https://...'
arxiv: 'https://arxiv.org/abs/...'
code: 'https://github.com/...'
citation: 'Full citation.'
---

Abstract text.
```

Then add a matching `<li class="entry">` block to `_pages/publications.md`, and to `_pages/about.md` if it belongs in the selected list.
