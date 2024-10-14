---
title: "Development and evaluation of intraoperative ultrasound segmentation with negative image frames and multiple observer labels"
collection: publications
permalink: /publication/2021-intraoperative-ultrasound-segmentation
excerpt: 'This paper focuses on intraoperative ultrasound segmentation techniques.'
date: 2021-09-01
venue: 'ASMUS/MICCAI'
paperurl: 'https://arxiv.org/pdf/2108.04114'
citation: 'Chalcroft, L.F., et al. (2021). Development and evaluation of intraoperative ultrasound segmentation with negative image frames and multiple observer labels. In <i>ASMUS/MICCAI</i>.'
---

## Abstract
When developing deep neural networks for segmenting in-
traoperative ultrasound images, several practical issues are encountered
frequently, such as the presence of ultrasound frames that do not contain
regions of interest and the high variance in ground-truth labels. In this
study, we evaluate the utility of a pre-screening classification network
prior to the segmentation network. Experimental results demonstrate
that such a classifier, minimising frame classification errors, was able to
directly impact the number of false positive and false negative frames.
Importantly, the segmentation accuracy on the classifier-selected frames,
that would be segmented, remains comparable to or better than those
from standalone segmentation networks. Interestingly, the eﬃcacy of the
pre-screening classifier was aﬀected by the sampling methods for train-
ing labels from multiple observers, a seemingly independent problem.
We show experimentally that a previously proposed approach, combin-
ing random sampling and consensus labels, may need to be adapted
to perform well in our application. Furthermore, this work aims to share
practical experience in developing a machine learning application that as-
sists highly variable interventional imaging for prostate cancer patients,
to present robust and reproducible open-source implementations, and
to report a set of comprehensive results and analysis comparing these
practical, yet important, options in a real-world clinical application.

**Code:** [RectAngle](https://github.com/liamchalcroft/RectAngle)

## Key Figures
![Pre-screening classifier architecture]({{ site.baseurl }}/images/asmus_prescreen.png)

Figure 1: Architecture of the pre-screening classifier used to identify ultrasound frames containing regions of interest prior to segmentation.

## Summary
This paper addresses two key challenges in developing deep learning models for intraoperative ultrasound segmentation:

1. Presence of negative frames (without regions of interest)
2. High variability in ground truth labels from multiple observers

Key contributions:

1. Evaluation of a pre-screening classification network to identify frames containing regions of interest before segmentation.

2. Investigation of different label sampling strategies when working with multiple observer annotations.

3. Comparison of different loss functions for handling frame-level classification within the segmentation network.

Main findings:

1. The pre-screening classifier improved segmentation accuracy by removing false positive frames, especially for the mean label strategy.

2. A combination of 25% consensus labels and 75% random labels during training led to better and more stable performance (mean Dice of 0.87 ± 0.17).

3. The pre-screening classifier provided better flexibility to control frame-level accuracy at test time compared to modified loss functions.

4. Label sampling methods and the frame classification strategy showed potential correlation, suggesting these seemingly independent problems may be interrelated.

5. The study provides practical insights for developing machine learning applications for variable interventional imaging in prostate cancer patients.

Overall, the paper demonstrates the potential benefits of using a pre-screening classifier to improve segmentation accuracy and reduce false positives in intraoperative ultrasound segmentation tasks.

[Download paper here](https://arxiv.org/pdf/2108.04114)
