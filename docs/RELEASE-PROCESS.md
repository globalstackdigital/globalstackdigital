# Release process

The site deploys automatically from `main` through GitHub Pages. Nothing is built.

## Steps

1. Work on the `release` branch (never commit straight to `main`).
2. Test locally. Serve a folder that contains the repo under a `globalstackdigital` name so the sub-path works, for example:
   ```
   mkdir /tmp/serve && ln -s "$(pwd)" /tmp/serve/globalstackdigital
   cd /tmp/serve && python3 -m http.server 8000
   ```
   Open http://localhost:8000/globalstackdigital/ and check the changed pages (desktop and 375px wide, light and dark theme, no console errors).
3. Open a pull request from `release` to `main`. Fill in the pull request template checklist.
4. The repository admin reviews and merges (see `.github/CODEOWNERS`).
5. GitHub Pages deploys after the merge (usually within a couple of minutes).
6. Run the post-deploy checklist below.

## Post-deploy checklist

- [ ] Home page and the 3 service pages load and look right (light and dark theme)
- [ ] The 4 legal pages load: /privacy-policy/, /terms-of-service/, /cookie-policy/, /security/
- [ ] An unknown URL shows the custom 404 page
- [ ] /robots.txt, /sitemap.xml and /googlecb6151a79db7080f.html return 200 with unchanged content
- [ ] /assets/image.png and /assets/og-card.png return 200
- [ ] No 404s in the browser network panel; no console errors
- [ ] Mixpanel library request is made and `window.mixpanel` exists on every page
- [ ] Contact form shows its validation and success states (do not send test spam; use the browser devtools or a dummy once, agreed with the owner)
- [ ] Theme toggle, mobile menu, marquee and skip link work
- [ ] Hard refresh and a private window both look correct (CDN caches HTML for about 10 minutes)

## Rollback

Open a revert pull request: in GitHub, open the merged PR and press "Revert", then merge the generated PR into `main`. Pages redeploys the previous state. Do not force-push `main`.

## Legacy file removal (follow-up)

After a restructure, the legacy root files listed in `docs/STRUCTURE.md` stay for a transition period. Remove them in their own small PR once the cache window has passed, and run the post-deploy checklist again.
