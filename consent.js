/* consent.js - legacy shim for cached pages. No UI. Loads analytics.js from the same folder. */
(function () {
  try {
    if (window.__gsdAnalytics) return;
    var cs = document.currentScript, s = document.createElement("script");
    s.src = new URL("analytics.js", cs && cs.src ? cs.src : location.href).href; s.async = true;
    (document.head || document.documentElement).appendChild(s);
  } catch (e) {}
})();
