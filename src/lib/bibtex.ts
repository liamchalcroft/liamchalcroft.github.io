import type { CollectionEntry } from 'astro:content';

const STOP = new Set(['a', 'an', 'the', 'of', 'on', 'for', 'and', 'in', 'to', 'with', 'via', 'using', 'from', 'by']);

/** Strip diacritics and anything that is not a letter or digit. */
const ascii = (s: string) =>
  s
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9]/g, '')
    .toLowerCase();

/** Escape characters that are special inside a BibTeX field value. */
function esc(s: string): string {
  return s
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/([{}])/g, '\\$1')
    .replace(/([&%$#_])/g, '\\$1')
    .replace(/\^/g, '\\^{}')
    .replace(/~/g, '\\~{}');
}

/** Protect capitalisation of the title without escaping the braces we add. */
const titleField = (t: string) => `{${esc(t)}}`;

/** "L. Chalcroft" -> { surname: "Chalcroft", initials: "L." } */
function splitName(name: string): { surname: string; initials: string } {
  const parts = name.trim().split(/\s+/);
  // Initials are leading tokens that look like "A." / "A.B." / "S.-L." / "C.J."
  let i = 0;
  while (i < parts.length - 1 && /^(?:[A-Z]\.?-?)+$/.test(parts[i]!)) i++;
  if (i === 0) {
    // Full given names: use first letters.
    const surname = parts[parts.length - 1]!;
    const initials = parts.slice(0, -1).map((p) => p[0] + '.').join(' ');
    return { surname, initials };
  }
  return { surname: parts.slice(i).join(' '), initials: parts.slice(0, i).join(' ') };
}

function formatAuthor(name: string): string {
  const { surname, initials } = splitName(name);
  return initials ? `${esc(surname)}, ${esc(initials)}` : esc(surname);
}

function citeKey(entry: CollectionEntry<'publications'>): string {
  const { surname } = splitName(entry.data.authors[0]!);
  const year = entry.data.date.getUTCFullYear();
  const word =
    entry.data.title
      .split(/[\s:\-–—]+/)
      .map(ascii)
      .find((w) => w.length > 0 && !STOP.has(w)) ?? 'paper';
  return `${ascii(surname)}${year}${word}`;
}

export function toBibtex(entry: CollectionEntry<'publications'>): string {
  const d = entry.data;
  const b = d.bib;
  const fields: [string, string][] = [];
  const add = (k: string, v: string | undefined) => {
    if (v) fields.push([k, v]);
  };

  const authors = d.authors.map(formatAuthor).join(' and ') + (d.etAl ? ' and others' : '');
  add('author', `{${authors}}`);
  add('title', titleField(d.title));

  if (b.type === 'article') add('journal', `{${esc(b.container)}}`);
  else if (b.type === 'inproceedings') add('booktitle', `{${esc(b.container)}}`);
  else add('school', `{${esc(b.school ?? b.container)}}`);

  add('year', `{${d.date.getUTCFullYear()}}`);
  if (b.volume) add('volume', `{${esc(b.volume)}}`);
  if (b.number) add('number', `{${esc(b.number)}}`);
  if (b.pages) add('pages', `{${esc(b.pages.replace(/\s*[-–—]+\s*/g, '--'))}}`);
  if (b.publisher) add('publisher', `{${esc(b.publisher)}}`);
  if (d.doi) add('doi', `{${d.doi}}`);
  const url = d.links.paper ?? d.links.arxiv ?? d.links.pdf;
  if (url) add('url', `{${url}}`);

  const body = fields.map(([k, v]) => `  ${k.padEnd(10)}= ${v}`).join(',\n');
  return `@${b.type}{${citeKey(entry)},\n${body}\n}\n`;
}
