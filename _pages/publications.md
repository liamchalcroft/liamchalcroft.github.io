---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

{% if author.googlescholar %}
  You can also find my articles on <u><a href="{{author.googlescholar}}">my Google Scholar profile</a>.</u>
{% endif %}

{% include base_path %}

<h2>Pre-prints</h2>

<ul>
  <li>
    E. de la Rosa, et al. (including L. Chalcroft), "<a href="/publication/2024-robust-ensemble-ischemic-stroke-segmentation">A Robust Ensemble Algorithm for Ischemic Stroke Lesion Segmentation: Generalizability and Clinical Utility Beyond the ISLES Challenge</a>." arXiv preprint, 2024. <a href="https://arxiv.org/abs/2403.19425">[Full text available]</a> <a href="https://github.com/Tabrisrei/ISLES22_Ensemble">[Code]</a>
  </li>
  <li>
    L. Chalcroft, I. Pappas, C.J. Price, J. Ashburner, "<a href="/publication/2024-synthetic-data-stroke-segmentation">Synthetic Data for Robust Stroke Segmentation</a>." arXiv preprint, 2024. <a href="http://arxiv.org/abs/2404.01946v1">[Full text available]</a> <a href="https://github.com/liamchalcroft/SynthStroke">[Code]</a>
  </li>
</ul>

<h2>Conference Papers</h2>

<ul>
  <li>
    L.F.Chalcroft, et al., "<a href="/publication/2023-lka-brain-lesion-segmentation">LKA: Large-kernel Attention for Efficient and Robust Brain Lesion Segmentation</a>." 37th Conference on Neural Information Processing Systems (NeurIPS), 2023. <a href="https://arxiv.org/pdf/2308.07251">[Full text available as pre-print]</a> <a href="https://github.com/liamchalcroft/MDUNet">[Code]</a>
  </li>
  <li>
    L.F.Chalcroft, et al., "<a href="/publication/2021-intraoperative-ultrasound-segmentation">Development and evaluation of intraoperative ultrasound segmentation with negative image frames and multiple observer labels</a>." ASMUS/MICCAI, 2021. <a href="https://arxiv.org/pdf/2108.04114">[Full text available as pre-print]</a> <a href="https://github.com/liamchalcroft/RectAngle">[Code]</a>
  </li>
</ul>

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}
