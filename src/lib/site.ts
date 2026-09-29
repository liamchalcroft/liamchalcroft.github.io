export const site = {
  name: 'Liam Chalcroft',
  title: 'Dr Liam Chalcroft',
  url: 'https://liamchalcroft.github.io',
  description:
    'Liam Chalcroft is a machine learning researcher working on medical and spectral imaging, and founding computer vision scientist at Prospectral. PhD, University College London.',
  email: 'liamchalcroft@gmail.com',
  links: {
    scholar: 'https://scholar.google.com/citations?user=u3EHJ0gAAAAJ&hl=en',
    github: 'https://github.com/liamchalcroft',
    orcid: 'https://orcid.org/0000-0003-3363-6454',
    linkedin: 'https://www.linkedin.com/in/liamchalcroft',
    twitter: 'https://twitter.com/chalcroft_liam',
  },
  /** Google Scholar snapshot. Update by hand; Scholar can't be fetched at build time. */
  citations: { count: 78, asOf: 'September 2026' },
  nav: [
    { href: '/publications/', label: 'Papers' },
    { href: '/software/', label: 'Code' },
    { href: '/cv/', label: 'CV' },
  ],
} as const;

export const SELF = 'L. Chalcroft';

/** Author list as HTML with Liam's name marked up. */
export function authorsHtml(authors: string[], etAl = false): string {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const names = authors.map((a) => (a === SELF ? `<span class="self">${esc(a)}</span>` : esc(a)));
  return names.join(', ') + (etAl ? ', et al.' : '');
}

export const year = (d: Date) => d.getUTCFullYear();
