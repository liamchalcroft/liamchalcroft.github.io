---
title: "DeepISLES: a clinically validated ischemic stroke segmentation model from the ISLES'22 challenge"
collection: publications
permalink: /publication/2024-robust-ensemble-ischemic-stroke-segmentation
excerpt: 'This paper presents DeepISLES, a clinically validated ischemic stroke segmentation model developed from the ISLES'22 challenge.'
date: 2025-08-09
venue: 'Nature Communications'
paperurl: 'https://www.nature.com/articles/s41467-025-62373-x'
citation: 'de la Rosa, E., Reyes, M., Liew, S.L., et al. (including Chalcroft, L.) (2025). DeepISLES: a clinically validated ischemic stroke segmentation model from the ISLES'22 challenge. <i>Nature Communications</i>, 16, 7357.'
---

## Abstract
Diffusion-weighted MRI (DWI) is essential for stroke diagnosis, treatment decisions, and prognosis. However, image and disease variability hinder the development of generalizable AI algorithms with clinical value. We address this gap by presenting a novel ensemble algorithm derived from the 2022 Ischemic Stroke Lesion Segmentation (ISLES) challenge. Our ensemble model combines the strengths of top-performing algorithms and achieved superior ischemic lesion detection and segmentation accuracy (median Dice score: 0.82, median lesion-wise F1 score: 0.86) on our internal test set compared to individual algorithms. This accuracy generalized well across diverse image and disease variables. Validation using a real-world external dataset (N=1686) confirmed the model's generalizability. The algorithm's outputs also demonstrated strong correlations with clinical scores (admission NIHSS and 90-day mRS) on par with or exceeding expert-derived results, underlining its clinical relevance. Notably, in a Turing-like test, neuroradiologists consistently preferred the algorithm's segmentations over manual expert efforts, highlighting increased comprehensiveness and precision.

**Code:** [DeepISLES](https://github.com/ezequieldlrosa/DeepIsles)

## Key Figures
![ISLES Ensemble Results]({{ site.baseurl }}/images/isles_ensemble.png)

## Summary
This study presents two key findings:

1. A robust ensemble algorithm that detects and segments ischemic stroke lesions on DWI across diverse scenarios on par with expert (neuro)radiologists. The algorithm demonstrates strong generalization across various factors including imaging center, lesion size, stroke phase, and stroke pattern.

2. The potential for biomedical challenge outputs to extend beyond the challenge's initial objectives, demonstrating their real-world clinical applicability. The ensemble algorithm, derived from the ISLES 2022 challenge, shows excellent performance on a large external dataset and correlates well with clinical scores.

The publicly available algorithm [DeepISLES](https://github.com/ezequieldlrosa/DeepIsles) has the potential to significantly improve stroke diagnosis and patient care. This work highlights the value of collaborative efforts in medical image analysis challenges and their potential impact on clinical practice.

[Download paper here](https://www.nature.com/articles/s41467-025-62373-x)
