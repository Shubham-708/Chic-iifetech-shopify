/* CHIC – scroll-reveal animations (global, respects reduced motion) */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('chic-anim');

  var SELECTORS = [
    '.chic-hero__text > *',
    '.chic-sec-head',
    '.chic-features__item',
    '.chic-cat',
    '.chic-prod',
    '.chic-promo',
    '.chic-trust__item',
    '.chic-about__img',
    '.chic-about__txt',
    '.chic-ingredients__card',
    '.chic-story__img',
    '.chic-story__txt',
    '.chic-rcard',
    '.chic-reels__card',
    '.chic-blog',
    '.chic-instagram__item',
    '.chic-instagram__center',
  ].join(',');

  function init() {
    var items = document.querySelectorAll(SELECTORS);
    if (!items.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('chic-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    items.forEach(function (el) {
      if (el.classList.contains('chic-reveal')) return;
      el.classList.add('chic-reveal');
      // stagger siblings that share a parent
      var siblings = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.setProperty('--chic-reveal-delay', Math.min(siblings % 8, 5) * 80 + 'ms');
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // re-run for sections re-rendered in the theme editor
  document.addEventListener('shopify:section:load', init);
})();
