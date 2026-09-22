(function () {
  'use strict';
  var body = document.body;
  var drawer = document.getElementById('drawer');
  var overlay = document.querySelector('.c-overlay');
  var openBtn = document.querySelector('[data-drawer-open]');

  function openDrawer() {
    if (!drawer) return;
    drawer.hidden = false;
    overlay.hidden = false;
    body.classList.add('is-locked');
    openBtn.setAttribute('aria-expanded', 'true');
    var first = drawer.querySelector('a, button');
    if (first) first.focus();
  }
  function closeDrawer() {
    if (!drawer || drawer.hidden) return;
    drawer.hidden = true;
    overlay.hidden = true;
    body.classList.remove('is-locked');
    openBtn.setAttribute('aria-expanded', 'false');
    openBtn.focus();
  }
  if (openBtn) openBtn.addEventListener('click', openDrawer);
  document.querySelectorAll('[data-drawer-close]').forEach(function (el) {
    el.addEventListener('click', closeDrawer);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDrawer();
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1000) closeDrawer();
  });

  var jump = document.querySelector('[data-jump]');
  if (jump && 'IntersectionObserver' in window) {
    var links = Array.prototype.slice.call(jump.querySelectorAll('a'));
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('is-active'); });
        var a = byId[en.target.id];
        if (a) {
          a.classList.add('is-active');
          if (a.scrollIntoView) a.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    Object.keys(byId).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) obs.observe(sec);
    });
  }
})();
