---
title: "Synthetic Data for Robust Stroke Segmentation"
collection: publications
permalink: /publication/2024-synthetic-data-stroke-segmentation
date: 2025-01-01
citation: 'Chalcroft, L., Pappas, I., Price, C.J., & Ashburner, J. (2025). Synthetic Data for Robust Stroke Segmentation. <i>Journal of Machine Learning for Biomedical Imaging (MELBA)</i>, 2025:014.'
authors: 'L. Chalcroft, I. Pappas, C.J. Price, J. Ashburner'
venue: 'Journal of Machine Learning for Biomedical Imaging (MELBA)'
paperurl: 'https://www.melba-journal.org/papers/2025:014.html'
code: 'https://github.com/liamchalcroft/SynthStroke'
figure: '/images/synth_preds.png'
figure_width: 1400
figure_height: 1075
figure_alt: >-
  Four rows of brain scans, each showing the same case in T1, T2, FLAIR and DWI alongside the synthetic label map. Ground truth, baseline and synthetic-trained predictions are drawn as green, blue and red outlines. The synthetic-trained contours track the ground truth closely across all four sequences, including cases where the baseline diverges.
---

Deep learning-based semantic segmentation in neuroimaging currently requires high-resolution scans and extensive annotated datasets, posing significant barriers to clinical applicability. We present a novel synthetic framework for the task of lesion segmentation, extending the capabilities of the established SynthSeg approach to accommodate large heterogeneous pathologies with lesion-specific augmentation strategies. Our method trains deep learning models, demonstrated here with the UNet architecture, using label maps derived from healthy and stroke datasets, facilitating the segmentation of both healthy tissue and pathological lesions without sequence-specific training data. Evaluated against in-domain and out-of-domain (OOD) datasets, our framework demonstrates robust performance, rivaling current methods within the training domain and significantly outperforming them on OOD data. This contribution holds promise for advancing medical imaging analysis in clinical settings, especially for stroke pathology, by enabling reliable segmentation across varied imaging sequences with reduced dependency on large annotated corpora.
