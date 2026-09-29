/** Milestones that aren't papers or talks. Papers and talks are merged in automatically. */
export interface LogEntry { date: string; text: string; href?: string }

export const milestones: LogEntry[] = [
  { date: '2026', text: 'PhD awarded, University College London' },
  { date: '2025', text: 'Joined Prospectral as Founding Computer Vision Scientist', href: 'https://www.prospectral.tech' },
  { date: '2024', text: 'Computer Vision Researcher, Tractive' },
];
