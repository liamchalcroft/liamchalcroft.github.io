export const site = {
  name: 'Liam Chalcroft',
  title: 'Dr Liam Chalcroft',
  url: 'https://liamchalcroft.github.io',
  description:
    'Founding Computer Vision Scientist at Prospectral. PhD in machine learning for medical imaging, University College London. I train imaging models on scans that were never acquired.',
  email: 'liamchalcroft@gmail.com',
  links: {
    scholar: 'https://scholar.google.com/citations?user=u3EHJ0gAAAAJ&hl=en',
    github: 'https://github.com/liamchalcroft',
    orcid: 'https://orcid.org/0000-0003-3363-6454',
    linkedin: 'https://www.linkedin.com/in/liamchalcroft',
  },
  nav: [
    { href: '/', label: 'Index', code: '00' },
    { href: '/publications/', label: 'Papers', code: '01' },
    { href: '/software/', label: 'Code', code: '02' },
    { href: '/cv/', label: 'CV', code: '03' },
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
