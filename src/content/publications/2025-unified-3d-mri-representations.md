---
title: "Unified 3D MRI Representations via Sequence-Invariant Contrastive Learning"
shortTitle: "Sequence-invariant SSL"
date: 2025-09-21
authors:
  - "L. Chalcroft"
  - "J. Crinion"
  - "C.J. Price"
  - "J. Ashburner"
venue: "Simulation and Synthesis in Medical Imaging (SASHIMI), MICCAI 2025 Workshop"
venueShort: "SASHIMI 2025"
kind: workshop
modality: mri
links:
  paper: "https://link.springer.com/chapter/10.1007/978-3-032-05573-6_7"
  arxiv: "https://arxiv.org/abs/2501.12057"
  code: "https://github.com/liamchalcroft/contrast-squared"
doi: "10.1007/978-3-032-05573-6_7"
bib:
  type: "inproceedings"
  container: "Simulation and Synthesis in Medical Imaging"
  pages: "63–74"
  publisher: "Springer"
---

Self-supervised deep learning has accelerated 2D natural image analysis but remains difficult to translate into 3D MRI, where data are scarce and pre-trained 2D backbones cannot capture volumetric context. We present a sequence-invariant self-supervised framework leveraging quantitative MRI (qMRI). By simulating multiple MRI contrasts from a single 3D qMRI scan and enforcing consistent representations across these contrasts, we learn anatomy-centric rather than sequence-specific features. The result is a single 3D encoder that excels across tasks and protocols. Experiments on healthy brain segmentation (IXI), stroke lesion segmentation (ARC), and MRI denoising show significant gains over baseline SSL approaches, especially in low-data settings (up to +8.3% Dice, +4.2 dB PSNR). It also generalises to unseen sites, supporting scalable clinical use.
