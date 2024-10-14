---
title: "LKA: Large-kernel Attention for Efficient and Robust Brain Lesion Segmentation"
collection: publications
permalink: /publication/2023-lka-brain-lesion-segmentation
excerpt: 'This paper introduces LKA for efficient and robust brain lesion segmentation.'
date: 2023-12-01
venue: '37th Conference on Neural Information Processing Systems (NeurIPS)'
paperurl: 'https://arxiv.org/pdf/2308.07251'
citation: 'Chalcroft, L.F., et al. (2023). LKA: Large-kernel Attention for Efficient and Robust Brain Lesion Segmentation. In <i>37th Conference on Neural Information Processing Systems (NeurIPS)</i>.'
---

## Abstract
Vision transformers are effective deep learning models for
vision tasks, including medical image segmentation. However, they lack
efficiency and translational invariance, unlike convolutional neural net-
works (CNNs). To model long-range interactions in 3D brain lesion seg-
mentation, we propose an all-convolutional transformer block variant of
the U-Net architecture. We demonstrate that our model provides the
greatest compromise in three factors: performance competitive with the
state-of-the-art; parameter efficiency of a CNN; and the favourable in-
ductive biases of a transformer.

**Code:** [MDUNet](https://github.com/liamchalcroft/MDUNet)

## Key Figures
![LKA Architecture]({{ site.baseurl }}/images/lka_arch.png)

Figure 1: Architecture of the proposed Large-kernel Attention (LKA) module for efficient and robust brain lesion segmentation.

## Summary
This paper presents a novel approach to brain lesion segmentation using Large-kernel Attention (LKA), a hybrid convolutional-attention model. The main contributions and findings include:

1. Introduction of an all-convolutional transformer block variant of the U-Net architecture for 3D brain lesion segmentation.

2. Demonstration that the proposed LKA model provides a balance between performance, parameter efficiency, and favorable inductive biases.

3. Evaluation on three datasets (ISLES, ATLAS, and BraTS) showing competitive or superior performance compared to CNN and transformer baselines.

4. Evidence of improved robustness to domain shifts, particularly when tested on unseen MRI sequences.

5. Empirical analysis suggesting that LKA models may provide similar inductive biases to attention models at the computational cost of a CNN.

6. Demonstration of a larger effective receptive field in early layers compared to CNN and Swin-UNETR baselines.

7. Indication that LKA models have a stronger shape bias compared to texture bias, similar to transformer models, which may contribute to improved robustness.

The study concludes that LKA offers a promising approach for efficient and robust brain lesion segmentation, combining the strengths of both CNNs and transformers.

[Download paper here](https://arxiv.org/pdf/2308.07251)
