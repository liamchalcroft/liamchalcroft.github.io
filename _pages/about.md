---
permalink: /
title: "Liam Chalcroft"
hide_title: true
excerpt: "Founding Computer Vision Scientist at Prospectral. PhD in machine learning for medical imaging, University College London."
redirect_from:
  - /about/
  - /about.html
---

<div class="lede" markdown="1">

# Liam Chalcroft
{: .lede__name}

Founding Computer Vision Scientist, [Prospectral](https://www.prospectral.tech)<br>
PhD in Machine Learning, University College London<br>
London, UK
{: .lede__role}

<div class="lede__intro" markdown="1">
I build imaging models that hold up outside the data they were trained on. Most of my research has been on brain lesion segmentation in routine clinical scans, where contrast, resolution and artefacts vary far more than in curated benchmarks. I now work on the same problem in spectral imaging.
</div>

<ul class="profile-links">
  <li><a href="mailto:liamchalcroft@gmail.com">Email</a></li>
  <li><a href="https://scholar.google.com/citations?user=u3EHJ0gAAAAJ&hl=en">Google Scholar</a></li>
  <li><a href="https://github.com/liamchalcroft">GitHub</a></li>
  <li><a href="https://orcid.org/0000-0003-3363-6454">ORCID</a></li>
  <li><a href="https://www.linkedin.com/in/liamchalcroft">LinkedIn</a></li>
</ul>

</div>

## Research

My PhD, supervised by [John Ashburner](https://scholar.google.com/citations?user=UWi2lukAAAAJ&hl=en) and [Cathy Price](https://scholar.google.com/citations?user=gyfMndoAAAAJ&hl=en), asked how a stroke lesion segmentation model can be made to work on scans it has never seen: a different scanner, a different sequence, a resolution nobody would choose for research. The answer that held up was to stop training on real images. Generating training data from tissue labels under MRI physics constraints, rather than augmenting a fixed dataset, produced models that transfer to out-of-domain clinical data without sequence-specific retraining.

At Prospectral I lead machine learning and its integration into the wider product, applying the same generalisation questions to spectral imaging, where the physics is better specified and the labelled data is scarcer still.

<ul class="keywords">
  <li>Domain generalisation</li>
  <li>Synthetic data</li>
  <li>Self-supervised learning</li>
  <li>Generative modelling</li>
  <li>Physics-informed AI</li>
  <li>Spectral imaging</li>
  <li>3D medical image segmentation</li>
</ul>

## Selected publications

<ul class="entries">
  <li class="entry">
    <div class="entry__year">2026</div>
    <div class="entry__body">
      <h3 class="entry__title"><a href="/publication/2026-gaze-grounded-agentic-zero-shot-evaluation">GAZE: Grounded Agentic Zero-shot Evaluation with Viewer-Level Tools and Literature Retrieval on Rare Brain MRI</a><span class="badge">Oral</span></h3>
      <p class="entry__authors">D. Alim, M. Alim, <span class="self">L. Chalcroft</span></p>
      <p class="entry__venue">International Conference on Artificial Intelligence in Healthcare (AIiH) 2026</p>
      <ul class="entry__links">
        <li><a href="https://arxiv.org/abs/2605.00876" aria-label="arXiv: GAZE: Grounded Agentic Zero-shot Evaluation with Viewer-Level Tools and Literature Retrieval on Rare Brain MRI">arXiv</a></li>
        <li><a href="https://github.com/liamchalcroft/gaze" aria-label="Code: GAZE: Grounded Agentic Zero-shot Evaluation with Viewer-Level Tools and Literature Retrieval on Rare Brain MRI">Code</a></li>
      </ul>
    </div>
  </li>
  <li class="entry">
    <div class="entry__year">2026</div>
    <div class="entry__body">
      <h3 class="entry__title"><a href="/publication/2026-gradient-manifold-alignment-scheduling">Gradient-manifold alignment scheduling for physics-guided diffusion</a></h3>
      <p class="entry__authors"><span class="self">L. Chalcroft</span>, E. Camarillo Abad, P. Christopher, O. Burton, T. Albrow-Owen</p>
      <p class="entry__venue">Machine Learning in Photonics II, SPIE Photonics Europe 2026</p>
      <ul class="entry__links">
        <li><a href="https://doi.org/10.1117/12.3105598" aria-label="Paper: Gradient-manifold alignment scheduling for physics-guided diffusion">Paper</a></li>
      </ul>
    </div>
  </li>
  <li class="entry">
    <div class="entry__year">2025</div>
    <div class="entry__body">
      <h3 class="entry__title"><a href="/publication/2025-domain-agnostic-stroke-lesion-segmentation">Domain-Agnostic Stroke Lesion Segmentation Using Physics-Constrained Synthetic Data</a></h3>
      <p class="entry__authors"><span class="self">L. Chalcroft</span>, J. Crinion, C.J. Price, J. Ashburner</p>
      <p class="entry__venue">MICCAI 2025</p>
      <ul class="entry__links">
        <li><a href="https://link.springer.com/chapter/10.1007/978-3-032-04965-0_16" aria-label="Paper: Domain-Agnostic Stroke Lesion Segmentation Using Physics-Constrained Synthetic Data">Paper</a></li>
        <li><a href="https://github.com/liamchalcroft/qsynth" aria-label="Code: Domain-Agnostic Stroke Lesion Segmentation Using Physics-Constrained Synthetic Data">Code</a></li>
      </ul>
    </div>
  </li>
  <li class="entry">
    <div class="entry__year">2025</div>
    <div class="entry__body">
      <h3 class="entry__title"><a href="/publication/2024-robust-ensemble-ischemic-stroke-segmentation">DeepISLES: a clinically validated ischemic stroke segmentation model from the ISLES'22 challenge</a></h3>
      <p class="entry__authors">E. de la Rosa, M. Reyes, S.-L. Liew, et al., including <span class="self">L. Chalcroft</span></p>
      <p class="entry__venue">Nature Communications</p>
      <ul class="entry__links">
        <li><a href="https://www.nature.com/articles/s41467-025-62373-x" aria-label="Paper: DeepISLES: a clinically validated ischemic stroke segmentation model from the ISLES&#x27;22 challenge">Paper</a></li>
        <li><a href="https://github.com/ezequieldlrosa/DeepIsles" aria-label="Code: DeepISLES: a clinically validated ischemic stroke segmentation model from the ISLES&#x27;22 challenge">Code</a></li>
      </ul>
    </div>
  </li>
  <li class="entry">
    <div class="entry__year">2025</div>
    <div class="entry__body">
      <h3 class="entry__title"><a href="/publication/2024-synthetic-data-stroke-segmentation">Synthetic Data for Robust Stroke Segmentation</a></h3>
      <p class="entry__authors"><span class="self">L. Chalcroft</span>, I. Pappas, C.J. Price, J. Ashburner</p>
      <p class="entry__venue">Journal of Machine Learning for Biomedical Imaging (MELBA)</p>
      <ul class="entry__links">
        <li><a href="https://www.melba-journal.org/papers/2025:014.html" aria-label="Paper: Synthetic Data for Robust Stroke Segmentation">Paper</a></li>
        <li><a href="https://github.com/liamchalcroft/SynthStroke" aria-label="Code: Synthetic Data for Robust Stroke Segmentation">Code</a></li>
      </ul>
    </div>
  </li>
</ul>

<div class="btn-row">
  <a class="btn" href="/publications/">All publications</a>
  <a class="btn" href="/software/">Software</a>
  <a class="btn" href="/cv/">CV</a>
</div>
