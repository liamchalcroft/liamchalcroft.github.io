---
title: "DeepISLES: a clinically validated ischemic stroke segmentation model from the ISLES'22 challenge"
collection: publications
permalink: /publication/2024-robust-ensemble-ischemic-stroke-segmentation
date: 2025-08-09
citation: "de la Rosa, E., Reyes, M., Liew, S.-L., et al. (including Chalcroft, L.) (2025). DeepISLES: a clinically validated ischemic stroke segmentation model from the ISLES'22 challenge. <i>Nature Communications</i>, 16, 7357."
authors: 'E. de la Rosa, M. Reyes, S.-L. Liew, et al., including L. Chalcroft'
venue: 'Nature Communications'
paperurl: 'https://www.nature.com/articles/s41467-025-62373-x'
code: 'https://github.com/ezequieldlrosa/DeepIsles'
figure: '/images/isles_ensemble.png'
figure_width: 1116
figure_height: 836
figure_alt: >-
  Four box plots comparing the ensemble against twelve individual challenge algorithms on the unseen test set, for Dice similarity coefficient, lesion-wise F1, absolute volume difference and absolute lesion count difference. The ensemble, drawn in blue at the left of each panel, has a higher median and a tighter spread than every individual team on the two accuracy metrics and among the lowest error on the two difference metrics.
---

Diffusion-weighted MRI (DWI) is essential for stroke diagnosis, treatment decisions, and prognosis. However, image and disease variability hinder the development of generalizable AI algorithms with clinical value. We address this gap by presenting a novel ensemble algorithm derived from the 2022 Ischemic Stroke Lesion Segmentation (ISLES) challenge. Our ensemble model combines the strengths of top-performing algorithms and achieved superior ischemic lesion detection and segmentation accuracy (median Dice score: 0.82, median lesion-wise F1 score: 0.86) on our internal test set compared to individual algorithms. This accuracy generalized well across diverse image and disease variables. Validation using a real-world external dataset (N=1686) confirmed the model's generalizability. The algorithm's outputs also demonstrated strong correlations with clinical scores (admission NIHSS and 90-day mRS) on par with or exceeding expert-derived results, underlining its clinical relevance. Notably, in a Turing-like test, neuroradiologists consistently preferred the algorithm's segmentations over manual expert efforts, highlighting increased comprehensiveness and precision.
