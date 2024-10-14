---
title: "Synthetic Data for Robust Stroke Segmentation"
collection: publications
permalink: /publication/2024-synthetic-data-stroke-segmentation
excerpt: 'This paper explores the use of synthetic data for robust stroke segmentation.'
date: 2024-04-02
venue: 'arXiv'
paperurl: 'http://arxiv.org/abs/2404.01946v1'
citation: 'Chalcroft, L., Pappas, I., Price, C.J., & Ashburner, J. (2024). Synthetic Data for Robust Stroke Segmentation. <i>arXiv preprint</i>. arXiv:2404.01946v1.'
---

## Abstract
Deep learning-based semantic segmentation in neuroimaging
currently requires high-resolution scans and extensive annotated datasets,
posing significant barriers to clinical applicability. We present a novel
synthetic framework for the task of lesion segmentation, extending the
capabilities of the established SynthSeg approach to accommodate large
heterogeneous pathologies with lesion-specific augmentation strategies.
Our method trains deep learning models, demonstrated here with the
UNet architecture, using label maps derived from healthy and stroke
datasets, facilitating the segmentation of both healthy tissue and patho-
logical lesions without sequence-specific training data. Evaluated against
in-domain and out-of-domain (OOD) datasets, our framework demon-
strates robust performance, rivaling current methods within the training
domain and significantly outperforming them on OOD data. This contri-
bution holds promise for advancing medical imaging analysis in clinical
settings, especially for stroke pathology, by enabling reliable segmenta-
tion across varied imaging sequences with reduced dependency on large
annotated corpora. Code and weights available at (https://github.com/liamchalcroft/SynthStroke).

## Key Figures
[Insert figure descriptions and images here]

## Summary
[Provide a brief summary of the paper's main contributions and findings]

[Download paper here](http://arxiv.org/abs/2404.01946v1)
