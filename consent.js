/* consent.js - LEGACY shim for cached pages (transition only; see docs/STRUCTURE.md). No UI. Loads the analytics loader from assets/js/analytics.js. */
(function () {
  try {
    if (window.__gsdAnalytics) return;
    var cs = document.currentScript, s = document.createElement("script");
    s.src = new URL("assets/js/analytics.js", cs && cs.src ? cs.src : location.href).href; s.async = true;
    (document.head || document.documentElement).appendChild(s);
  } catch (e) {}
})();
