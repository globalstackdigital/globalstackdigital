# Repository structure

Global Stack Digital is a static site (plain HTML, CSS and vanilla JS) published by GitHub Pages from the `main` branch at https://globalstackdigital.github.io/globalstackdigital/. There is no build step, no package manager and no framework.

## Layout

```
/
  index.html                      Home page (public URL /)
  404.html                        Custom not-found page (GitHub Pages serves it for unknown URLs)
  robots.txt                      Crawler rules and sitemap pointer
  sitemap.xml                     Submitted to Google Search Console
  googlecb6151a79db7080f.html     Google Search Console verification file
  README.md                       Project overview

  digital-marketing/index.html    Service page
  qa-intelligence/index.html      Service page
  growth-strategy/index.html      Service page
  privacy-policy/index.html       Legal page
  terms-of-service/index.html     Legal page
  cookie-policy/index.html        Legal page
  security/index.html             Legal page

  assets/
    css/styles.css                Shared design system (all pages)
    css/legal.css                 Extra prose layout, loaded only by the 4 legal pages
    js/main.js                    Theme toggle, drawer, marquee, contact form, draft autosave
    js/analytics.js               Mixpanel loader (token and config live here only)
    image.png                     Logo, favicon, JSON-LD logo   (NEVER MOVE OR RENAME)
    og-card.png                   Open Graph / social card      (NEVER MOVE OR RENAME)

  docs/                           Plain markdown documentation (this folder)
  .github/                        CODEOWNERS, SECURITY.md, pull_request_template.md

  LEGACY (transition only, see below):
  styles.css  legal.css  main.js  analytics.js  consent.js
```

## Why this layout

- Page folders stay at the root because each folder name is a public URL slug. Moving one would change a URL.
- Shared code lives under `assets/`, grouped by type (`css/`, `js/`). The two images stay directly in `assets/` because their URLs are cached by social platforms and used in JSON-LD and favicons.
- Documentation sits in `docs/` as plain markdown. Folders starting with an underscore are not used, because GitHub Pages runs default Jekyll and would skip them.

## Legacy root files (transition only)

`styles.css`, `legal.css`, `main.js`, `analytics.js` and `consent.js` at the repository root are LEGACY. They exist only so that old HTML cached by visitors or a CDN (which still points at the old root paths) keeps working.

- `styles.css`, `legal.css`, `main.js`, `analytics.js` are byte-identical copies of the files in `assets/css` and `assets/js`. Do not edit them and no HTML may reference them.
- `consent.js` is a tiny shim that loads `assets/js/analytics.js` (guarded by `window.__gsdAnalytics`, so analytics can never initialise twice). It is kept for very old cached pages.
- Planned removal: in a follow-up PR, after the cache window has passed (suggested: at least a few days after the restructure goes live), delete these five files. Before deleting, confirm no HTML references them: `grep -rnE '(href|src)="[^"]*(styles|legal)\.css|(main|analytics|consent)\.js' --include=*.html .` should show only `assets/` paths.
- Until removal, any change to a shared CSS/JS file is made in `assets/` only. The legacy copies stay frozen (cached old HTML pairs with old code).

## Rules for adding a page

1. Create `<slug>/index.html` at the root (lowercase, hyphenated slug). The slug becomes the public URL and must never change later.
2. Copy an existing page of the same type as the starting point (service page or legal page) so the head, header, footer, skip link and JSON-LD stay consistent.
3. Use relative paths: from a subfolder, `../assets/css/styles.css`, `../assets/js/main.js`, `../assets/js/analytics.js`, `../assets/image.png`. Legal pages also add `../assets/css/legal.css`.
4. Set the canonical URL, Open Graph tags and JSON-LD for the new URL; make sure JSON-LD parses.
5. Add the URL to `sitemap.xml` and `docs/URL-MAP.md`. Link it from the header or footer where appropriate.
6. Write the brand as the full name "Global Stack Digital". Use no personal names, no emojis and no em dashes in site copy. Only make claims that are true.
7. If the page adds tracking, forms or a new third-party tool, update the legal pages first (see `docs/LEGAL-PAGES.md`).

## What must never move or change

| Item | Why |
| --- | --- |
| Page folder names and `index.html` inside them | They are the public URLs |
| `index.html`, `404.html` at the root | GitHub Pages serves them from there |
| `googlecb6151a79db7080f.html` at the root | Search Console ownership verification |
| `robots.txt`, `sitemap.xml` at the root | Crawlers expect these exact URLs; the sitemap is submitted |
| `assets/image.png`, `assets/og-card.png` | Cached by social platforms; used by favicon and JSON-LD |
| Canonical URLs and JSON-LD URLs | Changing them hurts search results |
| No files or folders starting with `_`, no `.nojekyll`, no Jekyll config, no front matter | GitHub Pages builds with default Jekyll |
| 404.html uses absolute `/globalstackdigital/...` paths | It is served from any URL depth. Update them if the site moves to a custom domain root |
