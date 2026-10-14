(function () {
  'use strict';

  // ===== LANGUAGE TOGGLE =====
  const html = document.documentElement;
  const langToggle = document.getElementById('langToggle');
  const langLabel = document.getElementById('langLabel');
  const langOther = document.getElementById('langOther');

  function setLang(lang) {
    html.lang = lang;
    const isDE = lang === 'de';
    langLabel.textContent = isDE ? 'DE' : 'EN';
    langOther.textContent = isDE ? 'EN' : 'DE';

    document.querySelectorAll('[data-de]').forEach(el => {
      const text = isDE ? el.dataset.de : el.dataset.en;
      if (text !== undefined) {
        // Use innerHTML for elements that may contain <br> tags
        if (text.includes('<br')) {
          el.innerHTML = text;
        } else {
          el.textContent = text;
        }
      }
    });
  }

  langToggle.addEventListener('click', () => {
    setLang(html.lang === 'de' ? 'en' : 'de');
  });

  // ===== MOBILE NAV =====
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    hamburger.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close nav when a link is clicked (nav links or the logo)
  nav.querySelectorAll('.nav__link, .logo').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Logo scrolls to top. The header it points to (#top) is sticky, so it's
  // always "in view" and the native anchor jump never actually scrolls.
  document.querySelectorAll('.logo').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Close nav on outside click
  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
      nav.classList.remove('is-open');
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // ===== FOOTER YEAR =====
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== CONSENT (Google Maps) =====
  // The site itself sets no cookies; the only third-party content is the
  // Google Maps embed, which loads only after the visitor agrees. The choice
  // is kept in localStorage (strictly necessary to remember it — no consent
  // needed for that) and can be changed via "Cookie-Einstellungen" in the footer.
  const CONSENT_KEY = 'physioantonia-consent-maps';
  const consentBanner = document.getElementById('consentBanner');
  const mapFrame = document.querySelector('.map[data-src]');
  const mapPlaceholder = document.getElementById('mapPlaceholder');

  function readConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }

  function saveConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (e) { /* private mode — choice lasts this page view */ }
  }

  function applyConsent(granted) {
    if (!mapFrame) return;
    if (granted) {
      if (!mapFrame.src) mapFrame.src = mapFrame.dataset.src;
      mapFrame.hidden = false;
      mapPlaceholder.hidden = true;
    } else {
      mapFrame.removeAttribute('src');
      mapFrame.hidden = true;
      mapPlaceholder.hidden = false;
    }
  }

  function setConsent(granted) {
    saveConsent(granted ? 'granted' : 'denied');
    applyConsent(granted);
    consentBanner.hidden = true;
  }

  if (consentBanner) {
    const stored = readConsent();
    applyConsent(stored === 'granted');
    if (stored === null) consentBanner.hidden = false;

    document.getElementById('consentAccept').addEventListener('click', () => setConsent(true));
    document.getElementById('consentDeny').addEventListener('click', () => setConsent(false));
    document.getElementById('consentOpen').addEventListener('click', () => {
      consentBanner.hidden = false;
      document.getElementById('consentAccept').focus();
    });
    document.getElementById('mapLoad').addEventListener('click', () => setConsent(true));
  }

  // ===== CONTACT FORM (Web3Forms) =====
  const contactForm = document.getElementById('contactFormEl');
  if (contactForm) {
    const WEB3FORMS_URL = 'https://api.web3forms.com/submit';
    // Practical check: local@domain.tld, no spaces, TLD at least 2 chars
    const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[^\s@.]{2,}$/;

    const fields = [
      { input: document.getElementById('name'),    error: document.getElementById('nameError'),    isValid: el => el.value.trim() !== '' },
      { input: document.getElementById('email'),   error: document.getElementById('emailError'),   isValid: el => EMAIL_RE.test(el.value.trim()) },
      { input: document.getElementById('message'), error: document.getElementById('messageError'), isValid: el => el.value.trim() !== '' },
      { input: document.getElementById('consent'), error: document.getElementById('consentError'), isValid: el => el.checked },
    ];
    const btn = contactForm.querySelector('[type="submit"]');
    const status = document.getElementById('formStatus');

    function validateField(field) {
      const valid = field.isValid(field.input);
      field.input.setAttribute('aria-invalid', String(!valid));
      field.error.hidden = valid;
      return valid;
    }

    fields.forEach(field => {
      // Check when leaving a filled field; once flagged, re-check live
      field.input.addEventListener('blur', () => {
        if (field.input.type !== 'checkbox' && field.input.value.trim()) validateField(field);
      });
      field.input.addEventListener(field.input.type === 'checkbox' ? 'change' : 'input', () => {
        if (field.input.getAttribute('aria-invalid') === 'true') validateField(field);
      });
    });

    // Message carries both languages so the language toggle keeps working
    function showStatus(type, de, en) {
      status.dataset.de = de;
      status.dataset.en = en;
      status.textContent = html.lang === 'de' ? de : en;
      status.className = 'form-status form-status--' + type;
      status.hidden = false;
    }

    function setSending(sending) {
      btn.disabled = sending;
      const isDE = html.lang === 'de';
      btn.textContent = sending ? (isDE ? 'Wird gesendet …' : 'Sending …') : (isDE ? 'Senden' : 'Send');
    }

    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      status.hidden = true;

      const invalid = fields.filter(field => !validateField(field));
      if (invalid.length) {
        invalid[0].input.focus();
        return;
      }

      // Honeypot ticked: pretend success, send nothing
      if (contactForm.elements.botcheck.checked) {
        contactForm.reset();
        return;
      }

      setSending(true);
      try {
        const data = Object.fromEntries(new FormData(contactForm));
        data.replyto = data.email.trim();
        const res = await fetch(WEB3FORMS_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.message);

        contactForm.reset();
        fields.forEach(field => field.input.removeAttribute('aria-invalid'));
        showStatus('success',
          'Vielen Dank! Ihre Nachricht wurde gesendet. Ich melde mich so bald wie möglich.',
          'Thank you! Your message has been sent. I will get back to you as soon as possible.');
      } catch (err) {
        showStatus('error',
          'Die Nachricht konnte leider nicht gesendet werden. Bitte versuchen Sie es erneut oder rufen Sie mich an: 0664 75081432',
          'Sorry, your message could not be sent. Please try again or call me: +43 664 75081432');
      } finally {
        setSending(false);
      }
    });
  }

  // ===== SCROLL REVEALS =====
  // Fade-up section content as it enters the viewport (CSS gates this
  // behind prefers-reduced-motion, so reduced-motion users see it static)
  if ('IntersectionObserver' in window) {
    // Only elements without absolutely-positioned descendants — a transform
    // on an ancestor would re-anchor the divider panels
    const revealSelector = [
      '.section .section__eyebrow',
      '.section .section__title',
      '.section .section__sub',
      '.section .about__credentials',
      '.section .section__subhead',
      '.about__text > p',
      '.contact-info',
      '.contact-form-wrap',
      '.map-wrap'
    ].join(',');

    const revealTargets = Array.from(document.querySelectorAll(revealSelector));
    const staggerIndex = new Map();
    revealTargets.forEach(el => {
      const section = el.closest('section');
      const i = staggerIndex.get(section) || 0;
      el.classList.add('reveal');
      el.style.setProperty('--reveal-delay', Math.min(i, 3) * 70 + 'ms');
      staggerIndex.set(section, i + 1);
    });

    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(el => revealObserver.observe(el));

    // ===== NAV ACTIVE SECTION =====
    // Observe the whole <section>, not just the small anchor target it
    // scrolls to — a nav click lands the anchor right under the sticky
    // header, which sits outside a narrow "currently in view" band and
    // would otherwise never light up.
    const navLinks = Array.from(document.querySelectorAll('.sidebar .nav__link'));
    const linkForSection = new WeakMap();

    navLinks.forEach(link => {
      const target = document.querySelector(link.getAttribute('href'));
      const section = target && target.closest('section');
      if (section) linkForSection.set(section, link);
    });

    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const link = linkForSection.get(entry.target);
        if (!link) return;
        navLinks.forEach(l => l.classList.remove('is-active'));
        link.classList.add('is-active');
      });
    }, { rootMargin: '-72px 0px -55% 0px' });

    navLinks.forEach(link => {
      const target = document.querySelector(link.getAttribute('href'));
      const section = target && target.closest('section');
      if (section) sectionObserver.observe(section);
    });
  }

  // ===== FAB: only show once the hero call buttons have scrolled away =====
  const fab = document.querySelector('.fab');
  const heroCtas = document.querySelector('.hero__ctas');
  if (fab && heroCtas && 'IntersectionObserver' in window) {
    fab.classList.add('is-hidden');
    new IntersectionObserver(([entry]) => {
      fab.classList.toggle('is-hidden', entry.isIntersecting || entry.boundingClientRect.top > 0);
    }).observe(heroCtas);
  }

  // ===== HEADER SCROLL SHADOW =====
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 8
      ? '0 4px 24px rgba(38,70,83,0.12)'
      : '0 4px 24px rgba(38,70,83,0.08)';
  }, { passive: true });

})();
