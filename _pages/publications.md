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

<h2>Conference Papers</h2>

<ul>
  <li>
    L.F.Chalcroft, et al., "LKA: Large-kernel Attention for Efficient and Robust Brain Lesion Segmentation." 37th Conference on Neural Information Processing Systems (NeurIPS), 2023. <a href="https://arxiv.org/pdf/2308.07251">[Full text available as pre-print]</a>
  </li>
  <li>
    L.F.Chalcroft, et al., "Development and evaluation of intraoperative ultrasound segmentation with negative image frames and multiple observer labels." ASMUS/MICCAI, 2021. <a href="https://arxiv.org/pdf/2108.04114">[Full text available as pre-print]</a>
  </li>
</ul>

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}
