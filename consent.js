/**
 * consent.js - Global Stack Digital
 * Cookie / analytics consent banner + consent-gated Mixpanel loader.
 * Self-contained, no dependencies. Mixpanel is NOT requested and nothing
 * Mixpanel-related is stored until the visitor accepts analytics.
 * Public API: window.gsdConsent = { open(), get() }.
 * Any element with [data-cookie-settings] opens the preferences panel.
 * (Intentionally not "use strict": the vendor stub below assigns implicit globals.)
 */
(function () {
  var KEY = "gsd-consent", VERSION = 1;

  /* ---- where am I? resolves the Cookie Policy link from any folder / base path ---- */
  var scriptSrc = "";
  try {
    var cs = document.currentScript;
    if (cs && cs.src) scriptSrc = cs.src;
    if (!scriptSrc) {
      var ss = document.getElementsByTagName("script");
      for (var i = 0; i < ss.length; i++) if (/consent\.js(\?|#|$)/.test(ss[i].src)) { scriptSrc = ss[i].src; break; }
    }
  } catch (e) {}
  var POLICY_URL = "cookie-policy/";
  try { if (scriptSrc) POLICY_URL = new URL("cookie-policy/", scriptSrc).href; } catch (e) {}

  /* ---- privacy signals: default analytics OFF ---- */
  var privacySignal = false;
  try { privacySignal = navigator.globalPrivacyControl === true || navigator.doNotTrack === "1" || window.doNotTrack === "1"; } catch (e) {}

  /* ---- storage helpers (never throw) ---- */
  function readChoice() {
    try {
      var o = JSON.parse(localStorage.getItem(KEY));
      if (o && typeof o.analytics === "boolean" && o.v === VERSION) return o;
    } catch (e) {}
    return null;
  }
  var memChoice = null; /* used only if localStorage is unavailable */
  function writeChoice(analytics) {
    var o = { analytics: !!analytics, ts: Date.now(), v: VERSION };
    memChoice = o;
    try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {}
    return o;
  }
  function current() { return readChoice() || memChoice; }

  function purgeMixpanelStorage() {
    var re = /mixpanel|^mp_|^__mp/i;
    [window.localStorage, window.sessionStorage].forEach(function (st) {
      try {
        var del = [];
        for (var i = 0; i < st.length; i++) { var k = st.key(i); if (k && re.test(k)) del.push(k); }
        del.forEach(function (k) { st.removeItem(k); });
      } catch (e) {}
    });
    try {
      document.cookie.split(";").forEach(function (c) {
        var n = c.split("=")[0].replace(/^\s+/, "");
        if (re.test(n)) {
          document.cookie = n + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
          var parts = location.hostname.split(".");
          for (var j = 0; j < parts.length - 1; j++)
            document.cookie = n + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=." + parts.slice(j).join(".");
        }
      });
    } catch (e) {}
  }

  /* ---- Mixpanel (same library URL, token and config as the former inline snippet) ---- */
  var mpRequested = false;
  function loadMixpanel() {
    if (mpRequested) return;
    mpRequested = true;
    (function(f,b){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e,f,c){function g(a,d){var b=d.split(".");2==b.length&&(a=a[b[0]],d=b[1]);a[d]=function(){a.push([d].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;"undefined"!==typeof c?a=b[c]=[]:c="mixpanel";a.people=a.people||[];a.toString=function(a){var d="mixpanel";"mixpanel"!==c&&(d+="."+c);a||(d+=" (stub)");return d};a.people.toString=function(){return a.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
for(h=0;h<i.length;h++)g(a,i[h]);var j="set set_once union unset remove delete".split(" ");a.get_group=function(){function b(c){d[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));a.push([e,call2])}}for(var d={},e=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<j.length;c++)b(j[c]);return d};b._i.push([e,f,c])};b.__SV=1.2;e=f.createElement("script");e.type="text/javascript";e.async=!0;e.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?
MIXPANEL_CUSTOM_LIB_URL:"file:"===f.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";g=f.getElementsByTagName("script")[0];g.parentNode.insertBefore(e,g)}})(document,window.mixpanel||[]);
mixpanel.init('83b49795e27ffab350b75fdd1769f779', {debug: false, track_pageview: true, persistence: 'localStorage'});
    try {
      var tags = document.getElementsByTagName("script");
      for (var i = 0; i < tags.length; i++) {
        if (/mixpanel-2-latest/.test(tags[i].src)) {
          tags[i].addEventListener("load", function () {
            var c = current(); /* consent withdrawn while the library was loading */
            if (!(c && c.analytics)) stopMixpanel();
          });
        }
      }
    } catch (e) {}
  }
  function stopMixpanel() {
    var mp = window.mixpanel;
    try { if (mp && mp.__loaded) { if (typeof mp.opt_out_tracking === "function") mp.opt_out_tracking({ clear_persistence: true, delete_user: false }); if (typeof mp.disable === "function") mp.disable(); } } catch (e) {}
    purgeMixpanelStorage();
  }

  function applyConsent(on, wasOn) {
    if (on) {
      if (mpRequested && wasOn === false && window.mixpanel && window.mixpanel.__loaded) { location.reload(); return; } /* re-enable after withdrawal in same page view: start clean */
      loadMixpanel();
    } else {
      if (mpRequested) stopMixpanel(); else purgeMixpanelStorage();
    }
  }

  /* ---- UI ---- */
  var root, viewBanner, viewPrefs, toggle, lastFocus = null, built = false;

  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    for (var k in attrs) if (Object.prototype.hasOwnProperty.call(attrs, k)) {
      if (k === "text") n.textContent = attrs[k]; else n.setAttribute(k, attrs[k]);
    }
    (kids || []).forEach(function (c) { n.appendChild(c); });
    return n;
  }
  function btn(label, cls, fn, id) {
    var b = el("button", { type: "button", "class": "btn " + cls, text: label });
    if (id) b.id = id;
    b.addEventListener("click", fn);
    return b;
  }
  function policyLink() { return el("a", { href: POLICY_URL, text: "Cookie Policy" }); }

  function build() {
    if (built || !document.body) return;
    built = true;
    var bannerText = el("p", { id: "gsd-cc-desc" });
    if (privacySignal && !current()) {
      bannerText.appendChild(document.createTextNode("Your browser sends a Do Not Track or Global Privacy Control signal, so analytics (Mixpanel) is off and we will not load it unless you turn it on in Preferences. See our "));
    } else {
      bannerText.appendChild(document.createTextNode("We use analytics (Mixpanel) to understand how visitors use this site. We load it only if you accept. See our "));
    }
    bannerText.appendChild(policyLink());
    bannerText.appendChild(document.createTextNode("."));

    var actions = el("div", { "class": "cc-actions" });
    if (privacySignal) {
      actions.appendChild(btn("Keep analytics off", "btn-fill", function () { decide(false); }));
    } else {
      actions.appendChild(btn("Accept analytics", "btn-fill", function () { decide(true); }));
      actions.appendChild(btn("Reject", "btn-line", function () { decide(false); }));
    }
    actions.appendChild(btn("Preferences", "btn-line", function () { openPrefs(); }, "gsd-cc-prefs-btn"));
    viewBanner = el("div", { "data-cc": "banner" }, [bannerText, actions]);

    toggle = el("input", { type: "checkbox", role: "switch", id: "gsd-cc-analytics" });
    var swLabel = el("label", { "class": "cc-switch", "for": "gsd-cc-analytics" });
    var wrap = el("span", { "class": "cc-sw-wrap" }, [toggle, el("span", { "class": "cc-track", "aria-hidden": "true" })]);
    swLabel.appendChild(wrap);
    swLabel.appendChild(el("span", { "class": "cc-sw-text", text: "Analytics" }));

    var essential = el("div", { "class": "cc-opt" }, [
      el("div", {}, [el("strong", { text: "Essential" }), el("span", { "class": "cc-d", text: "Remembers your theme preference, a draft of the contact form and this choice, on your device." })]),
      el("span", { "class": "cc-sw-text", text: "Always on" })
    ]);
    var analytics = el("div", { "class": "cc-opt" }, [
      el("div", {}, [el("strong", { text: "Analytics (Mixpanel)" }), el("span", { "class": "cc-d", text: "Helps us understand how visitors use this site. Off until you accept." })]),
      swLabel
    ]);
    var intro = el("p", {}, [document.createTextNode("Choose what this site may store. Read our ")]);
    intro.appendChild(policyLink());
    intro.appendChild(document.createTextNode(" for details."));
    var prefsActions = el("div", { "class": "cc-actions" }, [
      btn("Save", "btn-fill", function () { decide(!!toggle.checked); }),
      btn("Cancel", "btn-line", function () { closePrefs(); })
    ]);
    viewPrefs = el("div", { "data-cc": "prefs", hidden: "" }, [el("p", { "class": "cc-title", text: "Cookie preferences" }), intro, essential, analytics, prefsActions]);

    root = el("div", { "class": "cc", id: "gsd-cc", role: "dialog", "aria-label": "Cookie consent", "aria-describedby": "gsd-cc-desc", hidden: "" }, [viewBanner, viewPrefs]);
    root.addEventListener("keydown", function (e) {
      if ((e.key === "Escape" || e.key === "Esc") && !viewPrefs.hidden) { e.preventDefault(); closePrefs(); }
    });
    document.body.appendChild(root);
  }

  function showBannerView() {
    viewPrefs.hidden = true; viewBanner.hidden = false;
    root.setAttribute("aria-label", "Cookie consent"); root.setAttribute("aria-describedby", "gsd-cc-desc");
    root.hidden = false;
  }
  function hideAll() { if (root) root.hidden = true; }

  function openPrefs() {
    build();
    if (!root) return;
    if (root.hidden) lastFocus = document.activeElement;
    var c = current();
    toggle.checked = !!(c && c.analytics);
    viewBanner.hidden = true; viewPrefs.hidden = false;
    root.setAttribute("aria-label", "Cookie preferences"); root.removeAttribute("aria-describedby");
    root.hidden = false;
    toggle.focus();
  }
  function closePrefs() {
    if (!root) return;
    if (!current()) { /* no decision yet: back to the banner, nothing is accepted */
      showBannerView();
      var b = document.getElementById("gsd-cc-prefs-btn"); if (b) b.focus();
    } else {
      hideAll(); restoreFocus();
    }
  }
  function restoreFocus() {
    try { if (lastFocus && document.contains(lastFocus) && typeof lastFocus.focus === "function") lastFocus.focus(); } catch (e) {}
    lastFocus = null;
  }

  function decide(analytics) {
    var prev = current();
    writeChoice(analytics);
    applyConsent(analytics, prev ? prev.analytics : undefined);
    hideAll();
    restoreFocus();
  }

  function init() {
    var c = current();
    if (c && c.analytics) applyConsent(true);
    else applyConsent(false);
    if (!c) { build(); if (root) showBannerView(); }
  }

  document.addEventListener("click", function (e) {
    var t = e.target && e.target.closest ? e.target.closest("[data-cookie-settings]") : null;
    if (t) { e.preventDefault(); openPrefs(); }
  });

  window.gsdConsent = {
    open: function () { openPrefs(); },
    get: function () { var c = current(); return c ? { analytics: c.analytics, ts: c.ts, v: c.v } : null; }
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
