---
title: "Domain-Agnostic Stroke Lesion Segmentation Using Physics-Constrained Synthetic Data"
collection: publications
permalink: /publication/2025-domain-agnostic-stroke-lesion-segmentation
excerpt: 'This paper introduces physics-constrained approaches to generate synthetic quantitative MRI images for robust stroke lesion segmentation across heterogeneous domains.'
date: 2025-09-19
venue: 'Medical Image Computing and Computer Assisted Intervention – MICCAI 2025'
paperurl: 'https://link.springer.com/chapter/10.1007/978-3-032-04965-0_16'
citation: 'Chalcroft, L., Crinion, J., Price, C.J., & Ashburner, J. (2025). Domain-Agnostic Stroke Lesion Segmentation Using Physics-Constrained Synthetic Data. In <i>Medical Image Computing and Computer Assisted Intervention – MICCAI 2025</i> (pp. 163-173). Springer.'
---

## Abstract
Segmenting stroke lesions in MRI is challenging due to diverse acquisition protocols that limit model generalisability. In this work, we introduce two physics-constrained approaches to generate synthetic quantitative MRI (qMRI) images that improve segmentation robustness across heterogeneous domains. Our first method, qATLAS, trains a neural network to estimate qMRI maps from standard MPRAGE images, enabling the simulation of varied MRI sequences with realistic tissue contrasts. The second method, qSynth, synthesises qMRI maps directly from tissue labels using label-conditioned Gaussian mixture models, ensuring physical plausibility. Extensive experiments on multiple out-of-domain datasets show that both methods outperform a baseline UNet, with qSynth notably surpassing previous synthetic data approaches. These results highlight the promise of integrating MRI physics into synthetic data generation for robust, generalisable stroke lesion segmentation.

**Code:** [qSynth](https://github.com/liamchalcroft/qsynth)

## Key Contributions

1. **qATLAS**: A neural network approach that estimates quantitative MRI maps from standard MPRAGE images, enabling simulation of diverse MRI sequences with realistic tissue contrasts.

2. **qSynth**: A physics-based method that synthesises qMRI maps directly from tissue labels using label-conditioned Gaussian mixture models, ensuring physical plausibility.

3. **Comprehensive evaluation**: Extensive experiments on multiple out-of-domain datasets demonstrating superior performance over baseline approaches.

4. **Physics integration**: Novel integration of MRI physics principles into synthetic data generation for improved domain generalisation.

## Summary
This paper addresses the challenge of stroke lesion segmentation across diverse MRI acquisition protocols. The key contributions include:

1. Introduction of two novel physics-constrained synthetic data generation methods that improve cross-domain robustness for stroke segmentation.

2. qATLAS method that learns to estimate quantitative MRI parameters from anatomical images, enabling realistic simulation of multiple MRI contrasts.

3. qSynth approach that directly synthesises physically plausible qMRI maps from anatomical labels using probabilistic models.

4. Demonstration that physics-constrained synthetic data significantly outperforms traditional synthetic approaches and baseline methods on out-of-domain evaluation datasets.

5. Evidence that integrating MRI physics principles into data generation leads to more robust and generalisable deep learning models for medical image segmentation.

The work represents an important step toward domain-agnostic medical image analysis by leveraging the underlying physics of MRI acquisition to generate more realistic and diverse training data.

[Download paper here](https://link.springer.com/chapter/10.1007/978-3-032-04965-0_16)