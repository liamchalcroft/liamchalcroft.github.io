---
title: "Unified 3D MRI Representations via Sequence-Invariant Contrastive Learning"
collection: publications
permalink: /publication/2025-unified-3d-mri-representations
excerpt: 'This paper presents a sequence-invariant self-supervised framework leveraging quantitative MRI for learning unified 3D representations across different MRI contrasts.'
date: 2025-09-21
venue: 'Simulation and Synthesis in Medical Imaging (SASHIMI 2025) - MICCAI Workshop'
paperurl: 'https://link.springer.com/chapter/10.1007/978-3-032-05573-6_7'
citation: 'Chalcroft, L., Crinion, J., Price, C.J., & Ashburner, J. (2025). Unified 3D MRI Representations via Sequence-Invariant Contrastive Learning. In <i>Simulation and Synthesis in Medical Imaging</i> (pp. 63-74). Springer.'
---

## Abstract
Self-supervised deep learning has accelerated 2D natural image analysis but remains difficult to translate into 3D MRI, where data are scarce and pre-trained 2D backbones cannot capture volumetric context. We present a sequence-invariant self-supervised framework leveraging quantitative MRI (qMRI). By simulating multiple MRI contrasts from a single 3D qMRI scan and enforcing consistent representations across these contrasts, we learn anatomy-centric rather than sequence-specific features. The result is a single 3D encoder that excels across tasks and protocols. Experiments on healthy brain segmentation (IXI), stroke lesion segmentation (ARC), and MRI denoising show significant gains over baseline SSL approaches, especially in low-data settings (up to +8.3% Dice, +4.2 dB PSNR). It also generalises to unseen sites, supporting scalable clinical use.

**Code:** Available publicly

## Summary
This workshop paper presents a novel self-supervised learning approach for 3D MRI analysis. The key contributions and findings include:

1. **Novel SSL Framework**: Introduction of a sequence-invariant self-supervised learning framework that leverages quantitative MRI (qMRI) to learn unified 3D representations.

2. **Physics-Based Augmentation**: By simulating multiple MRI contrasts from a single qMRI scan, the method learns anatomy-centric features rather than sequence-specific patterns.

3. **Cross-Task Performance**: Demonstration of a single 3D encoder that performs well across multiple tasks including:
   - Healthy brain segmentation (IXI dataset)
   - Stroke lesion segmentation (ARC dataset) 
   - MRI denoising

4. **Low-Data Efficacy**: Significant improvements in low-data settings with gains of up to +8.3% Dice score for segmentation and +4.2 dB PSNR for denoising.

5. **Generalization**: Strong performance on unseen sites and imaging protocols, supporting scalable clinical deployment.

6. **3D Volumetric Context**: Address the limitation that pre-trained 2D backbones cannot capture the full volumetric context critical for 3D medical imaging.

The work represents an important advancement in self-supervised learning for medical imaging by incorporating MRI physics to create more robust and generalizable representations for 3D analysis tasks.

[Download paper here](https://link.springer.com/chapter/10.1007/978-3-032-05573-6_7)