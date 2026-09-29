/**
 * Raster reveal: marked elements appear top to bottom in discrete bands, like a
 * readout, the first time they enter the viewport. The hidden state is only
 * applied once this runs, so nothing stays hidden if scripts fail.
 */
export function initRaster() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const els = document.querySelectorAll<HTMLElement>('.raster');
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('raster--on');
      io.unobserve(e.target);
    }
  }, { rootMargin: '0px 0px -6% 0px' });
  els.forEach((el) => {
    // Anything already on screen at load reveals straight away, in document order.
    el.classList.add('raster--armed');
    io.observe(el);
  });
}
