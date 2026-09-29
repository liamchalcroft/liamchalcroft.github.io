---
title: "Domain-Agnostic Stroke Lesion Segmentation Using Physics-Constrained Synthetic Data"
shortTitle: "qSynth"
date: 2025-09-19
authors:
  - "L. Chalcroft"
  - "J. Crinion"
  - "C.J. Price"
  - "J. Ashburner"
venue: "Medical Image Computing and Computer Assisted Intervention (MICCAI) 2025"
venueShort: "MICCAI 2025"
kind: conference
modality: mri
selected: true
links:
  paper: "https://link.springer.com/chapter/10.1007/978-3-032-04965-0_16"
  code: "https://github.com/liamchalcroft/qsynth"
doi: "10.1007/978-3-032-04965-0_16"
bib:
  type: "inproceedings"
  container: "Medical Image Computing and Computer Assisted Intervention (MICCAI) 2025"
  pages: "163–173"
  publisher: "Springer"
---

Segmenting stroke lesions in MRI is challenging due to diverse acquisition protocols that limit model generalisability. In this work, we introduce two physics-constrained approaches to generate synthetic quantitative MRI (qMRI) images that improve segmentation robustness across heterogeneous domains. Our first method, qATLAS, trains a neural network to estimate qMRI maps from standard MPRAGE images, enabling the simulation of varied MRI sequences with realistic tissue contrasts. The second method, qSynth, synthesises qMRI maps directly from tissue labels using label-conditioned Gaussian mixture models, ensuring physical plausibility. Extensive experiments on multiple out-of-domain datasets show that both methods outperform a baseline UNet, with qSynth notably surpassing previous synthetic data approaches. These results highlight the promise of integrating MRI physics into synthetic data generation for robust, generalisable stroke lesion segmentation.
