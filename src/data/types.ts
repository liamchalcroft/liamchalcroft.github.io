export interface Link {
  label: string;
  url: string;
}

export interface CvEntry {
  /** Display range, e.g. "2021–2026". Use an en dash. */
  when: string;
  role: string;
  org: string;
  orgUrl?: string;
  place?: string;
  points?: string[];
}

export interface Project {
  name: string;
  url: string;
  /** Languages or venue, e.g. ["Rust", "Python"] or ["Python", "MICCAI 2025"]. */
  tags: string[];
  /** One or two sentences. May contain inline HTML links and <code>. */
  html: string;
  /** Slug of the related publication, if any. */
  paper?: string;
}

export interface Talk {
  date: string; // ISO yyyy-mm-dd
  title: string;
  event: string;
  place?: string;
  kind: 'oral' | 'invited' | 'poster' | 'seminar';
  url?: string;
}
