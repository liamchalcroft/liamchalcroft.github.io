---
title: "GAZE: Grounded Agentic Zero-shot Evaluation with Viewer-Level Tools and Literature Retrieval on Rare Brain MRI"
shortTitle: "GAZE"
date: 2026-08-26
authors:
  - "D. Alim"
  - "M. Alim"
  - "L. Chalcroft"
venue: "International Conference on Artificial Intelligence in Healthcare (AIiH) 2026"
venueShort: "AIiH 2026"
kind: conference
modality: mri
selected: true
badge: "Oral"
note: "Oral presentation."
links:
  arxiv: "https://arxiv.org/abs/2605.00876"
  code: "https://github.com/liamchalcroft/gaze"
bib:
  type: "inproceedings"
  container: "International Conference on Artificial Intelligence in Healthcare (AIiH) 2026"
---

Vision-language models (VLMs) read an image and produce text in a single forward pass, whereas radiologists typically inspect an image several times and consult the literature before writing a report. We introduce GAZE (Grounded Agentic Zero-shot Evaluation), a framework that lets a medical VLM work in this iterative way by calling viewer-level tools (zoom, windowing, contrast, edge detection) and two retrieval tools backed by the U.S. National Library of Medicine (PubMed for medical literature, Open-i for radiological images), with structured outputs validated against a schema and full tool-call traces recorded for auditability. On NOVA, a benchmark of 906 brain MRI cases covering 281 rare neurological conditions, GAZE reaches 58.2 mean average precision (mAP) at intersection-over-union (IoU) 0.3 for lesion localisation and 34.9% Top-1 diagnostic accuracy under a joint protocol that scores captioning, diagnosis, and localisation from the image alone, without task-specific fine-tuning. Before any tool is used, structured prompting and schema-validated outputs already improve over the published Gemini 2.0 Flash baseline (20.2 to 29.4 mAP@0.3), so framework design is itself an experimental variable. Tool use helps rare pathologies disproportionately: the fraction of cases with IoU > 0.3 rises from 17% to 58% for diagnoses with three or fewer examples versus 25% to 68% for common conditions (at least 10 cases), with gains tracking engagement. Retrieval ablations additionally reveal a model-dependent trade-off in which gains in diagnosis can coincide with losses in localisation, reinforcing the case for joint evaluation of diagnosis, localisation, and captioning in medical VLMs.
