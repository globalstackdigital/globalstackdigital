# Legal pages

Four public pages describe how Global Stack Digital handles visitor data. They are plain HTML, styled by `assets/css/styles.css` and `assets/css/legal.css`.

| Page | URL | Source file | Covers |
| --- | --- | --- | --- |
| Privacy Policy | /privacy-policy/ | `privacy-policy/index.html` | What personal data is collected (contact form details, analytics data), why, who processes it, retention, visitor rights, and how to contact Global Stack Digital |
| Terms of Service | /terms-of-service/ | `terms-of-service/index.html` | Terms for using the website and engaging Global Stack Digital services |
| Cookie Policy | /cookie-policy/ | `cookie-policy/index.html` | Cookies and browser storage used by the site (theme preference, form draft, Mixpanel analytics) and how visitors can limit tracking |
| Security & Data Handling | /security/ | `security/index.html` | How data is handled and how to report a vulnerability |

The only contact address used is globalstackdigital@gmail.com.

## When they must be updated

Update the relevant legal page in the same pull request whenever you:

- add, remove or reconfigure analytics or tracking (for example changing anything in `assets/js/analytics.js`, adding a pixel, or adding a consent banner);
- add or change a form, its fields, or the service that receives submissions (currently Web3Forms);
- add any third-party script, font, embed or storage key;
- change how long data is kept or who it is shared with;
- change the contact address or business details.

Also check the footer links and `docs/URL-MAP.md`. Do not claim certifications, compliance badges or security controls that are not in place.
