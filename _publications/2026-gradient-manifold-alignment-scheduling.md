---
title: "Gradient-manifold alignment scheduling for physics-guided diffusion"
collection: publications
permalink: /publication/2026-gradient-manifold-alignment-scheduling
date: 2026-05-27
authors: 'L. Chalcroft, E. Camarillo Abad, P. Christopher, O. Burton, T. Albrow-Owen'
venue: 'Machine Learning in Photonics II, SPIE Photonics Europe 2026'
paperurl: 'https://doi.org/10.1117/12.3105598'
citation: 'Chalcroft, L., Camarillo Abad, E., Christopher, P., Burton, O., & Albrow-Owen, T. (2026). Gradient-manifold alignment scheduling for physics-guided diffusion. In <i>Machine Learning in Photonics II</i> (Vol. 14104, 141040H). SPIE. doi:10.1117/12.3105598'
---

Physics-guided diffusion models combine learned priors over valid designs with physics-based objectives for inverse design. A key challenge is scheduling the guidance strength across the iterative generation process. We propose alignment scheduling, a sample-dependent guidance rule based on the relative magnitude of the projected physics gradient and the raw physics gradient. Under the approximate manifold-projection view of diffusion denoisers, this ratio indicates how much of the physics update lies in directions the model can follow while staying near realistic designs. The method uses quantities already computed during sampling and adds minimal overhead. We evaluate on two photonic inverse design tasks, a colour router for CMOS image sensors and a waveguide bend, using differentiable FDTD simulation. In an exploratory study across three fabrication classes and two guidance strengths, alignment achieves the strongest colour-router performance at the higher setting, while constant guidance remains strongest on the waveguide task. These mixed results suggest alignment scheduling is most beneficial at higher guidance strength for the colour-router task and that task-dependent tuning remains important.
