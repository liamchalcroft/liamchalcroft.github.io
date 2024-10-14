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
![Sample predictions with ensembling method]({{ site.baseurl }}/images/synth_preds.png)

Figure 3: Sample predictions with ensembling method in the ISLES 2015 dataset. Color code in predicted Synth labels: dark-blue=GM, light-blue=WM, green=PV, amber=CSF, red=stroke.

## Summary
This paper presents a novel synthetic framework for robust stroke lesion segmentation, extending the SynthSeg approach to accommodate large heterogeneous pathologies. The key contributions and findings include:

1. A method that combines synthetic data generation with real data from the ATLAS dataset to train deep learning models for stroke lesion segmentation.

2. The use of lesion-specific augmentation strategies, including simulating varying grades of infarction and stitching lesions into surrounding tissue structures.

3. Evaluation on both in-domain (ATLAS) and out-of-domain (ISLES 2015 and ISLES 2022) datasets, demonstrating the model's robustness and generalizability.

4. Competitive performance with baseline models on in-domain data and significant improvements on out-of-domain data.

5. The ability to perform multi-modal ensembling, which outperforms single-modality predictions and reduces the likelihood of mislabeling irrelevant hyperintensities.

6. Potential applicability to other similar domains such as hemorrhage and glioblastoma.

The study demonstrates that it is possible to augment a SynthSeg-style training procedure to include large, heterogeneous lesions, potentially advancing medical imaging analysis in clinical settings by enabling reliable segmentation across varied imaging sequences with reduced dependency on large annotated datasets.

[Download paper here](http://arxiv.org/abs/2404.01946v1)
