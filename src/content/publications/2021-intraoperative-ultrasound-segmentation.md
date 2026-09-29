---
title: "Development and evaluation of intraoperative ultrasound segmentation with negative image frames and multiple observer labels"
shortTitle: "Intraoperative ultrasound"
date: 2021-09-01
authors:
  - "L. Chalcroft"
  - "J. Qu"
  - "S.A. Martin"
  - "I.J.M.B. Gayo"
  - "G.V. Minore"
  - "I.R.D. Singh"
  - "S.U. Saeed"
  - "Q. Yang"
  - "Z.M.C. Baum"
  - "A. Altmann"
  - "Y. Hu"
etAl: false
venue: "Advances in Simplifying Medical Ultrasound (ASMUS), MICCAI 2021 Workshop"
venueShort: "ASMUS 2021"
kind: workshop
modality: ultrasound
links:
  arxiv: "https://arxiv.org/abs/2108.04114"
  code: "https://github.com/liamchalcroft/RectAngle"
bib:
  type: "inproceedings"
  container: "ASMUS - MICCAI 2021 Workshop"
figure:
  src: "/images/asmus_prescreen.png"
  width: 964
  height: 901
  alt: "Three trans-rectal ultrasound frames overlaid with prostate outlines from three observers in green, red and blue, showing close agreement, partial disagreement in extent, and disagreement on whether the prostate is present. Below, a flowchart in which each input frame passes through a classification network, and only frames scoring above a threshold reach the segmentation network; the rest are rejected."
---

When developing deep neural networks for segmenting intraoperative ultrasound images, several practical issues are encountered frequently, such as the presence of ultrasound frames that do not contain regions of interest and the high variance in ground-truth labels. In this study, we evaluate the utility of a pre-screening classification network prior to the segmentation network. Experimental results demonstrate that such a classifier, minimising frame classification errors, was able to directly impact the number of false positive and false negative frames. Importantly, the segmentation accuracy on the classifier-selected frames, that would be segmented, remains comparable to or better than those from standalone segmentation networks. Interestingly, the efficacy of the pre-screening classifier was affected by the sampling methods for training labels from multiple observers, a seemingly independent problem. We show experimentally that a previously proposed approach, combining random sampling and consensus labels, may need to be adapted to perform well in our application. Furthermore, this work aims to share practical experience in developing a machine learning application that assists highly variable interventional imaging for prostate cancer patients, to present robust and reproducible open-source implementations, and to report a set of comprehensive results and analysis comparing these practical, yet important, options in a real-world clinical application.
