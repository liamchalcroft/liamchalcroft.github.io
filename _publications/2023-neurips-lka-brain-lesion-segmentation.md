---
title: "LKA: Large-kernel Attention for Efficient and Robust Brain Lesion Segmentation"
collection: publications
permalink: /publication/2023-lka-brain-lesion-segmentation
date: 2023-12-01
citation: 'Chalcroft, L.F., et al. (2023). LKA: Large-kernel Attention for Efficient and Robust Brain Lesion Segmentation. In <i>Medical Imaging meets NeurIPS 2023 Workshop</i>.'
authors: "L. Chalcroft, R.L. Pereira, M. Brudfors, A.S. Kayser, M. D'Esposito, C.J. Price, J. Ashburner"
venue: 'Medical Imaging meets NeurIPS 2023 Workshop'
arxiv: 'https://arxiv.org/abs/2308.07251'
code: 'https://github.com/liamchalcroft/MDUNet'
paperurl: 'https://arxiv.org/abs/2308.07251'
paperlabel: 'Paper'
figure: '/images/lka_arch.png'
figure_width: 1400
figure_height: 1127
figure_alt: >-
  Block diagrams of the LKA architecture. Three sub-blocks are shown: LKA (depthwise, dilated depthwise and pointwise convolutions combined multiplicatively), attention (pointwise convolution, GELU, LKA, pointwise convolution with a residual connection), and a convolutional feed-forward block. Below, these compose into the full LKA block: overlapping patch embedding, then N repeats of batch norm plus attention and batch norm plus feed-forward, each with residual connections, ending in layer norm.
---

Vision transformers are effective deep learning models for vision tasks, including medical image segmentation. However, they lack efficiency and translational invariance, unlike convolutional neural networks (CNNs). To model long-range interactions in 3D brain lesion segmentation, we propose an all-convolutional transformer block variant of the U-Net architecture. We demonstrate that our model provides the greatest compromise in three factors: performance competitive with the state-of-the-art; parameter efficiency of a CNN; and the favourable inductive biases of a transformer.
