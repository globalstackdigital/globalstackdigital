/**
 * components.js — Global Header & Footer
 * Inject the shared nav and footer into every sub-page.
 * Usage: add <div id="nav-root"></div> and <div id="footer-root"></div>
 * in the page body, then include this script.
 */
(function () {

  /* ─────────────────────────────────────────
     NAV + MOBILE MENU HTML
  ───────────────────────────────────────── */
  const NAV_HTML = `
    <nav id="mainNav">
      <a href="../" class="nav-logo">
        <img class="logo-mark" width="36" height="36" src="../assets/image.png" alt="Global Stack Digital Logo">
        <div class="logo-wordmark">Global<em>Stack</em> Digital</div>
      </a>
      <ul class="nav-links">
        <li class="nav-has-dropdown">
          <a href="../#services" class="nav-dropdown-trigger">Services
            <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <div class="nav-dropdown">
            <a href="../digital-marketing/" class="nav-dd-item">
              <div class="nav-dd-icon blue">📢</div>
              <div><div class="nav-dd-title">Digital Marketing</div><div class="nav-dd-sub">SEO · Paid Growth · Lead Generation</div></div>
            </a>
            <a href="../qa-intelligence/" class="nav-dd-item">
              <div class="nav-dd-icon green">✅</div>
              <div><div class="nav-dd-title">QA Intelligence</div><div class="nav-dd-sub">Testing · UX · Performance Analysis</div></div>
            </a>
            <a href="../growth-strategy/" class="nav-dd-item">
              <div class="nav-dd-icon orange">🚀</div>
              <div><div class="nav-dd-title">Growth Strategy</div><div class="nav-dd-sub">Funnel · Retention · User Growth</div></div>
            </a>
          </div>
        </li>
        <li><a href="../#why">Why Us</a></li>
        <li><a href="../#process">Process</a></li>
        <li><a href="../#contact">Contact</a></li>
      </ul>
      <div class="nav-right">
        <a href="../#contact" class="nav-cta">Get Free Consultation →</a>
        <button class="hamburger" id="hamburger" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>

    <div class="mobile-menu" id="mobileMenu">
      <div class="mob-services-wrap">
        <button class="mob-services-trigger">
          Services
          <svg class="mob-chevron" width="13" height="13" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="mob-services-sub" id="mobServicesSub">
          <a href="../digital-marketing/" class="mob-sub-link">📢 Digital Marketing</a>
          <a href="../qa-intelligence/" class="mob-sub-link">✅ QA Intelligence</a>
          <a href="../growth-strategy/" class="mob-sub-link">🚀 Growth Strategy</a>
        </div>
      </div>
      <a href="../#why" class="mob-link">Why Us</a>
      <a href="../#process" class="mob-link">Process</a>
      <a href="../#contact" class="mob-link">Contact</a>
      <a href="../#contact" class="mob-cta">Get Free Consultation →</a>
    </div>
  `;


  /* ─────────────────────────────────────────
     FOOTER HTML
  ───────────────────────────────────────── */
  const FOOTER_HTML = `
    <footer>
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-logo-wrap">
            <img class="logo-mark" width="34" height="34" src="../assets/image.png" alt="Logo"/>
            <div class="footer-logo-text">Global<em>Stack</em> Digital</div>
          </div>
          <p>A growth-focused digital partner providing marketing, QA intelligence, and scalable business solutions designed to improve visibility, performance, and customer experience.</p>
          <div class="footer-social-wrap">
            <div style="font-size:0.75rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-bottom:0.75rem">Connect With Us</div>
            <div class="footer-socials">
              <a href="mailto:globalstackdigital@gmail.com" class="social-btn" title="Email" target="_blank" rel="noopener noreferrer">✉</a>
              <a href="https://www.linkedin.com/in/global-stack-digital-107208406/" class="social-btn" title="LinkedIn" target="_blank" rel="noopener noreferrer">in</a>
              <a href="https://x.com/globalstackhq" class="social-btn" title="Twitter/X" target="_blank" rel="noopener noreferrer">𝕏</a>
              <a href="https://www.instagram.com/globalstackdigital/" class="social-btn" title="Instagram" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>

        <div class="footer-col">
          <h4>Services</h4>
          <ul>
            <li><a href="../digital-marketing/">Digital &amp; Performance Marketing</a></li>
            <li><a href="../qa-intelligence/">QA Intelligence &amp; Strategy</a></li>
            <li><a href="../growth-strategy/">Product Growth Strategy</a></li>
            <li><a href="../#services">SEO Strategy</a></li>
            <li><a href="../#services">Lead Generation</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="../">Home</a></li>
            <li><a href="../#services">Services</a></li>
            <li><a href="../#why">Why Us</a></li>
            <li><a href="../#process">Process</a></li>
            <li><a href="../#contact">Contact</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:globalstackdigital@gmail.com">globalstackdigital@gmail.com</a></li>
            <li><a href="../#contact">Ahmedabad, Gujarat, India</a></li>
            <li><a href="../#contact">Available 24/7</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <span class="footer-copy">© 2026 Global Stack Digital. All rights reserved.</span>
        <div class="footer-badge">
          <span style="width:6px;height:6px;background:#00d68f;border-radius:50%;display:inline-block"></span>
          Serving Globally
        </div>
      </div>
    </footer>
  `;

  /* ─────────────────────────────────────────
     INJECT
  ───────────────────────────────────────── */
  function injectNav() {
    const root = document.getElementById('nav-root');
    if (root) root.innerHTML = NAV_HTML;
  }

  function injectFooter() {
    const root = document.getElementById('footer-root');
    if (root) root.innerHTML = FOOTER_HTML;
  }

  /* ─────────────────────────────────────────
     NAV BEHAVIOUR
  ───────────────────────────────────────── */
  function initNav() {
    window.addEventListener('scroll', () => {
      const nav = document.getElementById('mainNav');
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
    });

    // Hamburger
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
      });
      document.querySelectorAll('.mob-link, .mob-cta').forEach(el => {
        el.addEventListener('click', () => {
          hamburger.classList.remove('open');
          mobileMenu.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }

    // Mobile Services accordion toggle
    const trigger = document.querySelector('.mob-services-trigger');
    const sub     = document.getElementById('mobServicesSub');
    if (trigger && sub) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = sub.classList.toggle('open');
        trigger.classList.toggle('open', isOpen);
      });
    }
  }

  /* ─────────────────────────────────────────
     SCROLL REVEAL
  ───────────────────────────────────────── */
  function initReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  /* ─────────────────────────────────────────
     BOOT
  ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    injectNav();
    injectFooter();
    initNav();
    initReveal();
  });

})();
