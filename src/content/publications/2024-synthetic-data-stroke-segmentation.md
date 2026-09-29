---
title: "Synthetic Data for Robust Stroke Segmentation"
shortTitle: "SynthStroke"
date: 2025-01-01
authors:
  - "L. Chalcroft"
  - "I. Pappas"
  - "C.J. Price"
  - "J. Ashburner"
venue: "Journal of Machine Learning for Biomedical Imaging (MELBA)"
venueShort: "MELBA 2025"
kind: journal
modality: mri
selected: true
links:
  paper: "https://www.melba-journal.org/papers/2025:014.html"
  code: "https://github.com/liamchalcroft/SynthStroke"
  extra:
    - label: "SPM toolbox"
      url: "https://github.com/liamchalcroft/SynthStrokeSPM"
bib:
  type: "article"
  container: "Machine Learning for Biomedical Imaging"
  number: "2025:014"
figure:
  src: "/images/synth_preds.png"
  width: 1400
  height: 1075
  alt: "Four rows of brain scans, each showing the same case in T1, T2, FLAIR and DWI alongside the synthetic label map. Ground truth, baseline and synthetic-trained predictions are drawn as green, blue and red outlines. The synthetic-trained contours track the ground truth closely across all four sequences, including cases where the baseline diverges."
---

Deep learning-based semantic segmentation in neuroimaging currently requires high-resolution scans and extensive annotated datasets, posing significant barriers to clinical applicability. We present a novel synthetic framework for the task of lesion segmentation, extending the capabilities of the established SynthSeg approach to accommodate large heterogeneous pathologies with lesion-specific augmentation strategies. Our method trains deep learning models, demonstrated here with the UNet architecture, using label maps derived from healthy and stroke datasets, facilitating the segmentation of both healthy tissue and pathological lesions without sequence-specific training data. Evaluated against in-domain and out-of-domain (OOD) datasets, our framework demonstrates robust performance, rivaling current methods within the training domain and significantly outperforming them on OOD data. This contribution holds promise for advancing medical imaging analysis in clinical settings, especially for stroke pathology, by enabling reliable segmentation across varied imaging sequences with reduced dependency on large annotated corpora.
