import type { Project } from './types';

export const libraries: Project[] = [
  {
    name: 'medrs',
    url: 'https://github.com/liamchalcroft/med-rs',
    tags: ['Rust', 'Python'],
    html: 'Medical imaging I/O and processing for throughput-critical deep learning pipelines. Memory-mapped NIfTI reading, crop-first loading of sub-volumes, and a lazily evaluated transform pipeline that fuses consecutive axis operations. The repository is named <code>med-rs</code> and the package is published as <code>medrs</code> on <a href="https://crates.io/crates/medrs">crates.io</a> and <a href="https://pypi.org/project/medrs/">PyPI</a>.',
  },
  {
    name: 'gaze',
    url: 'https://github.com/liamchalcroft/gaze',
    tags: ['Python'],
    html: 'Agentic framework for medical vision-language models: viewer-level image tools, multi-turn tool use, and literature retrieval from PubMed and Open-i. Published on <a href="https://pypi.org/project/gaze-vlm/">PyPI</a> as <code>gaze-vlm</code>.',
    paper: '2026-gaze-grounded-agentic-zero-shot-evaluation',
  },
];

export const paperCode: Project[] = [
  {
    name: 'SynthStroke',
    url: 'https://github.com/liamchalcroft/SynthStroke',
    tags: ['Python', 'MELBA 2025'],
    html: 'Code and pretrained weights for stroke lesion segmentation trained entirely on synthetic data, with no sequence-specific training images. Also packaged as an <a href="https://github.com/liamchalcroft/SynthStrokeSPM">SPM12 toolbox</a> for use without a Python environment.',
    paper: '2024-synthetic-data-stroke-segmentation',
  },
  {
    name: 'qsynth',
    url: 'https://github.com/liamchalcroft/qsynth',
    tags: ['Python', 'MICCAI 2025'],
    html: 'Physics-constrained synthetic qMRI generation for domain-agnostic lesion segmentation. Implements qATLAS, which estimates qMRI maps from MPRAGE, and qSynth, which synthesises them directly from tissue labels.',
    paper: '2025-domain-agnostic-stroke-lesion-segmentation',
  },
  {
    name: 'contrast-squared',
    url: 'https://github.com/liamchalcroft/contrast-squared',
    tags: ['Python', 'SASHIMI 2025'],
    html: 'Sequence-invariant contrastive pre-training for 3D MRI. A single encoder transfers across segmentation and denoising tasks and across sites. Weights are on <a href="https://huggingface.co/collections/liamchalcroft/midl-2025-678ccdb0162e0dc0a8b40960">Hugging Face</a>.',
    paper: '2025-unified-3d-mri-representations',
  },
  {
    name: 'MDUNet',
    url: 'https://github.com/liamchalcroft/MDUNet',
    tags: ['Python', 'NeurIPS 2023 workshop'],
    html: 'All-convolutional transformer block for 3D brain lesion segmentation, giving transformer-like long-range modelling at CNN parameter cost.',
    paper: '2023-lka-brain-lesion-segmentation',
  },
  {
    name: 'RectAngle',
    url: 'https://github.com/liamchalcroft/RectAngle',
    tags: ['Python', 'MICCAI 2021 workshop'],
    html: 'Segmentation and classification for trans-rectal B-mode ultrasound, including the pre-screening classifier that suppresses false positives on frames with no region of interest.',
    paper: '2021-intraoperative-ultrasound-segmentation',
  },
];

export const upstream: Project[] = [
  {
    name: 'Project-MONAI/MONAI',
    url: 'https://github.com/Project-MONAI/MONAI',
    tags: [],
    html: 'Fixed dtype conversion and <code>Spacing</code> inverse-transform bugs affecting MONAI Label.',
  },
  {
    name: 'balbasty/nitorch',
    url: 'https://github.com/balbasty/nitorch',
    tags: [],
    html: 'Added Google Colab support.',
  },
  {
    name: 'balbasty/cornucopia',
    url: 'https://github.com/balbasty/cornucopia',
    tags: [],
    html: 'Fixed a <code>randint</code> call in the geometric augmentation layers.',
  },
];
