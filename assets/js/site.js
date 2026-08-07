(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Reveal entries and sections as they scroll into view. The hiding class is
     applied from JS so content stays visible if any of this fails. */
  function initReveal() {
    if (reduced || !('IntersectionObserver' in window)) return;

    var targets = document.querySelectorAll(
      '.prose > h2, .entry, .project, .cv-row, .keywords, .btn-row, .plate, .citation'
    );
    if (!targets.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    var groupIndex = 0;
    var previousParent = null;

    targets.forEach(function (el) {
      // Stagger only within a run of siblings, so each list animates in sequence
      // but a new section restarts the count.
      if (el.parentElement !== previousParent) {
        groupIndex = 0;
        previousParent = el.parentElement;
      }
      el.style.setProperty('--reveal-delay', Math.min(groupIndex, 5) * 55 + 'ms');
      groupIndex++;

      el.classList.add('js-reveal');
      observer.observe(el);
    });
  }

  /* Shadow under the masthead once the page leaves the top. */
  function initMasthead() {
    var masthead = document.querySelector('.masthead');
    if (!masthead) return;

    var sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:1px';
    document.body.prepend(sentinel);

    if (!('IntersectionObserver' in window)) return;

    new IntersectionObserver(function (entries) {
      masthead.classList.toggle('is-stuck', !entries[0].isIntersecting);
    }).observe(sentinel);
  }

  function init() {
    initReveal();
    initMasthead();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
