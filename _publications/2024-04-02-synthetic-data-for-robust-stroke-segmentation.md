---
title: "Synthetic Data for Robust Stroke Segmentation"
collection: publications
permalink: /publication/2024-synthetic-data-stroke-segmentation
excerpt: 'This paper explores the use of synthetic data for robust stroke segmentation.'
date: 2025-01-01
venue: 'Journal of Machine Learning for Biomedical Imaging (MELBA)'
paperurl: 'https://www.melba-journal.org/papers/2025:014.html'
citation: 'Chalcroft, L., Pappas, I., Price, C.J., & Ashburner, J. (2025). Synthetic Data for Robust Stroke Segmentation. <i>Journal of Machine Learning for Biomedical Imaging (MELBA)</i>, 2025:014.'
---

## Abstract
Deep learning-based semantic segmentation in neuroimaging currently requires high-resolution scans and extensive annotated datasets, posing significant barriers to clinical applicability. We present a novel synthetic framework for the task of lesion segmentation, extending the capabilities of the established SynthSeg approach to accommodate large heterogeneous pathologies with lesion-specific augmentation strategies. Our method trains deep learning models, demonstrated here with the UNet architecture, using label maps derived from healthy and stroke datasets, facilitating the segmentation of both healthy tissue and pathological lesions without sequence-specific training data. Evaluated against in-domain and out-of-domain (OOD) datasets, our framework demonstrates robust performance, rivaling current methods within the training domain and significantly outperforming them on OOD data. This contribution holds promise for advancing medical imaging analysis in clinical settings, especially for stroke pathology, by enabling reliable segmentation across varied imaging sequences with reduced dependency on large annotated corpora.

[Full text](https://www.melba-journal.org/papers/2025:014.html) | [Code](https://github.com/liamchalcroft/SynthStroke)
