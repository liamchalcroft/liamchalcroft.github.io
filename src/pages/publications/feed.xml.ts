import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { site } from '../../lib/site';

export async function GET(context: APIContext) {
  const pubs = (await getCollection('publications')).sort((a, b) => +b.data.date - +a.data.date);
  return rss({
    title: `${site.title}: publications`,
    description: 'Papers and thesis by Liam Chalcroft on medical imaging, synthetic data and spectral vision.',
    site: context.site ?? site.url,
    items: pubs.map((p) => ({
      title: p.data.title,
      link: `/publication/${p.id}/`,
      pubDate: p.data.date,
      description: `${p.data.authors.join(', ')}${p.data.etAl ? ', et al.' : ''}. ${p.data.venue}.`,
      categories: [p.data.kind],
    })),
    customData: '<language>en-gb</language>',
  });
}
