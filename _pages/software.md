---
layout: archive
title: "Software"
permalink: /software/
excerpt: "Open-source libraries, models and paper code."
redirect_from:
  - /open-source
  - /open-source/
  - /open-source.html
---

Everything below is on [GitHub](https://github.com/liamchalcroft) under a permissive licence.

## Libraries

<ul class="projects">
  <li class="project">
    <div class="project__head">
      <h3 class="project__name"><a href="https://github.com/liamchalcroft/med-rs">medrs</a></h3>
      <span class="project__tag">Rust &middot; Python</span>
    </div>
    <p class="project__desc">Medical imaging I/O and processing for throughput-critical deep learning pipelines. Memory-mapped NIfTI reading, crop-first loading of sub-volumes, and a lazily evaluated transform pipeline that fuses consecutive axis operations. The repository is named <code>med-rs</code> and the package is published as <code>medrs</code> on <a href="https://crates.io/crates/medrs">crates.io</a> and <a href="https://pypi.org/project/medrs/">PyPI</a>.</p>
  </li>
  <li class="project">
    <div class="project__head">
      <h3 class="project__name"><a href="https://github.com/liamchalcroft/gaze">gaze</a></h3>
      <span class="project__tag">Python</span>
    </div>
    <p class="project__desc">Agentic framework for medical vision-language models: viewer-level image tools, multi-turn tool use, and literature retrieval from PubMed and Open-i. Published on <a href="https://pypi.org/project/gaze-vlm/">PyPI</a> as <code>gaze-vlm</code>.</p>
  </li>
</ul>

## Models and paper code

<ul class="projects">
  <li class="project">
    <div class="project__head">
      <h3 class="project__name"><a href="https://github.com/liamchalcroft/SynthStroke">SynthStroke</a></h3>
      <span class="project__tag">Python &middot; MELBA 2025</span>
    </div>
    <p class="project__desc">Code and pretrained weights for stroke lesion segmentation trained entirely on synthetic data, with no sequence-specific training images. Also packaged as an <a href="https://github.com/liamchalcroft/SynthStrokeSPM">SPM12 toolbox</a> for use without a Python environment.</p>
  </li>
  <li class="project">
    <div class="project__head">
      <h3 class="project__name"><a href="https://github.com/liamchalcroft/qsynth">qsynth</a></h3>
      <span class="project__tag">Python &middot; MICCAI 2025</span>
    </div>
    <p class="project__desc">Physics-constrained synthetic qMRI generation for domain-agnostic lesion segmentation. Implements qATLAS, which estimates qMRI maps from MPRAGE, and qSynth, which synthesises them directly from tissue labels.</p>
  </li>
  <li class="project">
    <div class="project__head">
      <h3 class="project__name"><a href="https://github.com/liamchalcroft/contrast-squared">contrast-squared</a></h3>
      <span class="project__tag">Python &middot; SASHIMI 2025</span>
    </div>
    <p class="project__desc">Sequence-invariant contrastive pre-training for 3D MRI. A single encoder transfers across segmentation and denoising tasks and across sites. Weights are on <a href="https://huggingface.co/collections/liamchalcroft/midl-2025-678ccdb0162e0dc0a8b40960">Hugging Face</a>.</p>
  </li>
  <li class="project">
    <div class="project__head">
      <h3 class="project__name"><a href="https://github.com/liamchalcroft/MDUNet">MDUNet</a></h3>
      <span class="project__tag">Python &middot; NeurIPS 2023 workshop</span>
    </div>
    <p class="project__desc">All-convolutional transformer block for 3D brain lesion segmentation, giving transformer-like long-range modelling at CNN parameter cost.</p>
  </li>
  <li class="project">
    <div class="project__head">
      <h3 class="project__name"><a href="https://github.com/liamchalcroft/RectAngle">RectAngle</a></h3>
      <span class="project__tag">Python &middot; MICCAI 2021 workshop</span>
    </div>
    <p class="project__desc">Segmentation and classification for trans-rectal B-mode ultrasound, including the pre-screening classifier that suppresses false positives on frames with no region of interest.</p>
  </li>
</ul>

## Upstream contributions

<ul class="projects">
  <li class="project">
    <div class="project__head">
      <h3 class="project__name"><a href="https://github.com/Project-MONAI/MONAI">Project-MONAI/MONAI</a></h3>
    </div>
    <p class="project__desc">Fixed dtype conversion and <code>Spacing</code> inverse-transform bugs affecting MONAI Label.</p>
  </li>
  <li class="project">
    <div class="project__head">
      <h3 class="project__name"><a href="https://github.com/balbasty/nitorch">balbasty/nitorch</a></h3>
    </div>
    <p class="project__desc">Added Google Colab support.</p>
  </li>
  <li class="project">
    <div class="project__head">
      <h3 class="project__name"><a href="https://github.com/balbasty/cornucopia">balbasty/cornucopia</a></h3>
    </div>
    <p class="project__desc">Fixed a <code>randint</code> call in the geometric augmentation layers.</p>
  </li>
</ul>
