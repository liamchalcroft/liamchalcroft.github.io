---
title: "Domain-Agnostic Stroke Lesion Segmentation Using Physics-Constrained Synthetic Data"
collection: publications
permalink: /publication/2025-domain-agnostic-stroke-lesion-segmentation
date: 2025-09-19
citation: 'Chalcroft, L., Crinion, J., Price, C.J., & Ashburner, J. (2025). Domain-Agnostic Stroke Lesion Segmentation Using Physics-Constrained Synthetic Data. In <i>Medical Image Computing and Computer Assisted Intervention (MICCAI) 2025</i> (pp. 163-173). Springer.'
authors: 'L. Chalcroft, J. Crinion, C.J. Price, J. Ashburner'
venue: 'Medical Image Computing and Computer Assisted Intervention (MICCAI) 2025'
paperurl: 'https://link.springer.com/chapter/10.1007/978-3-032-04965-0_16'
code: 'https://github.com/liamchalcroft/qsynth'
---

Segmenting stroke lesions in MRI is challenging due to diverse acquisition protocols that limit model generalisability. In this work, we introduce two physics-constrained approaches to generate synthetic quantitative MRI (qMRI) images that improve segmentation robustness across heterogeneous domains. Our first method, qATLAS, trains a neural network to estimate qMRI maps from standard MPRAGE images, enabling the simulation of varied MRI sequences with realistic tissue contrasts. The second method, qSynth, synthesises qMRI maps directly from tissue labels using label-conditioned Gaussian mixture models, ensuring physical plausibility. Extensive experiments on multiple out-of-domain datasets show that both methods outperform a baseline UNet, with qSynth notably surpassing previous synthetic data approaches. These results highlight the promise of integrating MRI physics into synthetic data generation for robust, generalisable stroke lesion segmentation.
