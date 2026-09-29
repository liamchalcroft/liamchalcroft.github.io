import type { CvEntry } from './types';

export const experience: CvEntry[] = [
  {
    when: '2025–present',
    role: 'Founding Computer Vision Scientist',
    org: 'Prospectral',
    orgUrl: 'https://www.prospectral.tech',
    place: 'London',
    points: [
      'Lead machine learning research and its integration into the wider product.',
      'Build production systems spanning spectral sensing, computer vision and model deployment.',
      'Own technical strategy for spectral imaging AI.',
    ],
  },
  {
    when: '2024',
    role: 'Computer Vision Researcher',
    org: 'Tractive',
    orgUrl: 'https://www.tractive.ai',
    place: 'London',
    points: [
      'Led ML research at an a16z-backed pre-seed startup applying 3D generative AI to retopology.',
      'Trained transformers at scale with PyTorch and FSDP on Google Cloud.',
      'Wrote production backend code in C++ and Rust.',
    ],
  },
  {
    when: '2021–2026',
    role: 'PhD Researcher',
    org: 'Wellcome Centre for Human Neuroimaging, University College London',
    points: [
      'Built a physics-constrained synthetic data framework for stroke lesion segmentation that transfers to unseen clinical scanners and sequences.',
      'Designed convolutional attention architectures for 3D segmentation, presented at NeurIPS 2023.',
      'Developed sequence-invariant contrastive pre-training for 3D MRI encoders.',
      "Contributed to the ISLES'22 challenge ensemble published in <em>Nature Communications</em>.",
    ],
  },
  {
    when: '2020–2021',
    role: 'MRes Researcher',
    org: 'University College London',
    points: [
      'Built hypernetwork-based segmentation conditioned on imaging domain.',
      'Studied image-level false positives in segmentation, published at MICCAI 2021.',
    ],
  },
  {
    when: '2018–2019',
    role: 'Research Scientist, Intern',
    org: 'Schlumberger Cambridge Research',
    place: 'Cambridge',
    points: [
      'Characterised non-Newtonian drilling fluids by rheology and diffusing-wave spectroscopy.',
    ],
  },
];

export const education: CvEntry[] = [
  {
    when: '2021–2026',
    role: 'PhD, Machine Learning',
    org: 'University College London',
    points: [
      'Thesis: <a href="https://discovery.ucl.ac.uk/id/eprint/10220048/">Robust Deep Learning for Stroke Detection in Clinical Neuroimaging</a>.',
      'Supervised by Prof. John Ashburner and Prof. Cathy J. Price FRS.',
    ],
  },
  {
    when: '2020–2021',
    role: 'MRes, Medical Imaging',
    org: 'University College London',
    place: 'Distinction',
  },
  {
    when: '2016–2020',
    role: 'MSci, Chemical Physics',
    org: 'University of Bristol',
    place: 'First Class Honours',
  },
];

export const teaching: CvEntry[] = [
  { when: '2023–2024', role: 'Fellowship Project Supervisor', org: 'Fatima Fellowship' },
  { when: '2022–2026', role: 'MSc Project and Research Supervisor', org: 'University College London' },
  { when: '2022–2024', role: 'Tutor, Machine Learning and Data Science', org: 'Cambridge Spark' },
  { when: '2022', role: 'Outreach Project Supervisor', org: 'In2Research and University College London' },
  {
    when: '2021',
    role: 'Teaching Assistant and Guest Lecturer',
    org: 'COMP0090 Introduction to Deep Learning, University College London',
  },
];

export const skills: Record<string, string[]> = {
  Languages: ['Python', 'Rust', 'C++', 'MATLAB'],
  Frameworks: ['PyTorch', 'MONAI', 'SPM'],
  Domains: [
    'Medical image analysis',
    'domain generalisation',
    'synthetic data',
    'self-supervised learning',
    'generative modelling',
    'spectral imaging',
  ],
};
