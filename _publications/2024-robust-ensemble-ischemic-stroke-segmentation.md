---
title: "A Robust Ensemble Algorithm for Ischemic Stroke Lesion Segmentation: Generalizability and Clinical Utility Beyond the ISLES Challenge"
collection: publications
permalink: /publication/2024-robust-ensemble-ischemic-stroke-segmentation
excerpt: 'This paper presents a robust ensemble algorithm for ischemic stroke lesion segmentation, demonstrating generalizability and clinical utility beyond the ISLES Challenge.'
date: 2024-03-29
venue: 'arXiv'
paperurl: 'https://arxiv.org/abs/2403.19425'
citation: 'de la Rosa, E., et al. (including Chalcroft, L.) (2024). A Robust Ensemble Algorithm for Ischemic Stroke Lesion Segmentation: Generalizability and Clinical Utility Beyond the ISLES Challenge. <i>arXiv preprint</i>. arXiv:2403.19425.'
---

## Abstract
Diffusion-weighted MRI (DWI) is essential for stroke diagnosis, treatment decisions, and prognosis. However, image and disease variability hinder the development of generalizable AI algorithms with clinical value. We address this gap by presenting a novel ensemble algorithm derived from the 2022 Ischemic Stroke Lesion Segmentation (ISLES) challenge. Our ensemble model combines the strengths of top-performing algorithms and achieved superior ischemic lesion detection and segmentation accuracy (median Dice score: 0.82, median lesion-wise F1 score: 0.86) on our internal test set compared to individual algorithms. This accuracy generalized well across diverse image and disease variables. Validation using a real-world external dataset (N=1686) confirmed the model's generalizability. The algorithm's outputs also demonstrated strong correlations with clinical scores (admission NIHSS and 90-day mRS) on par with or exceeding expert-derived results, underlining its clinical relevance. Notably, in a Turing-like test, neuroradiologists consistently preferred the algorithm's segmentations over manual expert efforts, highlighting increased comprehensiveness and precision.

**Code:** [ISLES22_Ensemble](https://github.com/Tabrisrei/ISLES22_Ensemble)

## Key Figures
![ISLES Ensemble Results]({{ site.baseurl }}/images/isles_ensemble.png)

## Summary
This study presents two key findings:

1. A robust ensemble algorithm that detects and segments ischemic stroke lesions on DWI across diverse scenarios on par with expert (neuro)radiologists. The algorithm demonstrates strong generalization across various factors including imaging center, lesion size, stroke phase, and stroke pattern.

2. The potential for biomedical challenge outputs to extend beyond the challenge's initial objectives, demonstrating their real-world clinical applicability. The ensemble algorithm, derived from the ISLES 2022 challenge, shows excellent performance on a large external dataset and correlates well with clinical scores.

The publicly available algorithm [ISLES22_Ensemble](https://github.com/Tabrisrei/ISLES22_Ensemble) has the potential to significantly improve stroke diagnosis and patient care. This work highlights the value of collaborative efforts in medical image analysis challenges and their potential impact on clinical practice.

[Download paper here](https://arxiv.org/abs/2403.19425)
