/**
 * Canvas Fullscreen Toggle — auto-injects a fullscreen button into .canvas-wrapper
 * Include this script at end of <body> in all module pages.
 */
(function () {
  'use strict';
  const wrapper = document.getElementById('canvas-container');
  if (!wrapper) return;

  // Create fullscreen button
  const btn = document.createElement('button');
  btn.className = 'canvas-fullscreen-btn';
  btn.setAttribute('aria-label', 'Toàn màn hình');
  btn.setAttribute('title', 'Toàn màn hình');

  const EXPAND_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>';
  const SHRINK_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14h6v6m10-10h-6V4m0 6l7-7M3 21l7-7"/></svg>';

  btn.innerHTML = EXPAND_ICON;
  wrapper.appendChild(btn);

  function isFullscreen() {
    return document.fullscreenElement === wrapper ||
           document.webkitFullscreenElement === wrapper;
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (isFullscreen()) {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    } else {
      if (wrapper.requestFullscreen) wrapper.requestFullscreen();
      else if (wrapper.webkitRequestFullscreen) wrapper.webkitRequestFullscreen();
    }
  });

  function onFsChange() {
    if (isFullscreen()) {
      btn.innerHTML = SHRINK_ICON;
      btn.setAttribute('aria-label', 'Thoát toàn màn hình');
      // Trigger p5 resize
      setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
    } else {
      btn.innerHTML = EXPAND_ICON;
      btn.setAttribute('aria-label', 'Toàn màn hình');
      setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
    }
  }

  document.addEventListener('fullscreenchange', onFsChange);
  document.addEventListener('webkitfullscreenchange', onFsChange);
})();
