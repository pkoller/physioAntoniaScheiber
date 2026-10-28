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
        // Use innerHTML for elements that contain markup (<br>, <a>)
        if (text.includes('<')) {
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

  // ===== MOBILE NAV (drawer below 1180px) =====
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  function setNavOpen(open) {
    nav.classList.toggle('is-open', open);
    hamburger.classList.toggle('is-open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  }

  hamburger.addEventListener('click', () => {
    setNavOpen(!nav.classList.contains('is-open'));
  });

  // Close the drawer when a link is clicked, on outside click and on Escape
  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => setNavOpen(false));
  });
  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) setNavOpen(false);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setNavOpen(false);
      hamburger.focus();
    }
  });

  // Logo scrolls to top. The header it points to (#top) is sticky, so it's
  // always "in view" and the native anchor jump never actually scrolls.
  document.querySelectorAll('.logo').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // ===== FOOTER YEAR =====
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== CONSENT (Google Maps) =====
  // The site itself sets no cookies; the only third-party content is the
  // Google Maps embed, which loads only after the visitor agrees in the
  // banner. The choice is kept in localStorage (strictly necessary to
  // remember it — no consent needed for that) and can be changed via
  // "Cookie-Einstellungen" in the footer or the link in the map placeholder.
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
    const openConsent = () => {
      consentBanner.hidden = false;
      document.getElementById('consentAccept').focus();
    };
    document.getElementById('consentOpen').addEventListener('click', openConsent);
    // The map placeholder's link lives in data-de/data-en markup that the
    // language toggle re-renders via innerHTML, so listen on the placeholder.
    if (mapPlaceholder) {
      mapPlaceholder.addEventListener('click', e => {
        if (e.target.closest('[data-consent-open]')) openConsent();
      });
    }
  }

  // ===== CONTACT FORM (Web3Forms) =====
  // Posts to api.web3forms.com via fetch; Web3Forms emails the message on.
  // Without JS the form's action/method still submit it the classic way.
  // On success the form is swapped for a confirmation panel; the panel and
  // the error box are static markup, so the language toggle covers them.
  const contactForm = document.getElementById('contactFormEl');
  if (contactForm) {
    const formTitle = document.getElementById('formTitle');
    const formError = document.getElementById('formError');
    const formSuccess = document.getElementById('formSuccess');
    const formReset = document.getElementById('formReset');
    const submitBtn = contactForm.querySelector('[type="submit"]');

    // Own validation instead of the browser's pop-ups, so the messages
    // follow the site's DE/EN toggle rather than the browser language.
    // Email check: local@domain.tld, no spaces, TLD at least 2 chars.
    const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[^\s@.]{2,}$/;
    const fields = [
      { input: document.getElementById('name'),    error: document.getElementById('nameError'),    isValid: v => v !== '' },
      { input: document.getElementById('email'),   error: document.getElementById('emailError'),   isValid: v => EMAIL_RE.test(v) },
      { input: document.getElementById('message'), error: document.getElementById('messageError'), isValid: v => v !== '' }
    ];
    const validateField = field => {
      const valid = field.isValid(field.input.value.trim());
      field.input.setAttribute('aria-invalid', String(!valid));
      field.error.hidden = valid;
      return valid;
    };
    const clearFieldErrors = () => fields.forEach(field => {
      field.input.removeAttribute('aria-invalid');
      field.error.hidden = true;
    });
    fields.forEach(field => {
      // Check when leaving a filled field; once flagged, re-check while typing
      field.input.addEventListener('blur', () => {
        if (field.input.value.trim()) validateField(field);
      });
      field.input.addEventListener('input', () => {
        if (field.input.getAttribute('aria-invalid') === 'true') validateField(field);
      });
    });

    const setSending = sending => {
      submitBtn.disabled = sending;
      submitBtn.classList.toggle('is-sending', sending);
      const label = html.lang === 'de' ? submitBtn.dataset.de : submitBtn.dataset.en;
      submitBtn.textContent = sending ? (html.lang === 'de' ? 'Wird gesendet …' : 'Sending …') : label;
    };
    const showForm = show => {
      contactForm.hidden = !show;
      formTitle.hidden = !show;
      formSuccess.hidden = show;
    };

    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      const invalid = fields.filter(field => !validateField(field));
      if (invalid.length) {
        invalid[0].input.focus();
        return;
      }
      formError.hidden = true;
      setSending(true);
      try {
        const res = await fetch(contactForm.action, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(contactForm)
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.success) throw new Error(data.message || res.status);
        contactForm.reset();
        clearFieldErrors();
        showForm(false);
        formSuccess.focus();
      } catch (err) {
        formError.hidden = false;
      } finally {
        setSending(false);
      }
    });

    formReset.addEventListener('click', () => {
      showForm(true);
      contactForm.querySelector('input:not([type="hidden"]):not(.form-honeypot)').focus();
    });
  }

  // ===== NAV ACTIVE SECTION =====
  // Observe the whole <section>, not just the heading a link scrolls to —
  // a nav click lands the heading right under the sticky header, which sits
  // outside a narrow "currently in view" band and would never light up.
  const navLinks = Array.from(document.querySelectorAll('#nav .nav__link'));
  let activeLink = null;

  function setActive(link) {
    if (link === activeLink) return;
    activeLink = link;
    navLinks.forEach(l => {
      const on = l === link;
      l.classList.toggle('is-active', on);
      if (on) l.setAttribute('aria-current', 'location');
      else l.removeAttribute('aria-current');
    });
  }

  if ('IntersectionObserver' in window) {
    const linkForSection = new WeakMap();
    const sections = [];
    navLinks.forEach(link => {
      const target = document.querySelector(link.getAttribute('href'));
      const section = target && target.closest('section');
      if (section) {
        linkForSection.set(section, link);
        sections.push(section);
      }
    });

    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(linkForSection.get(entry.target));
      });
    }, { rootMargin: '-80px 0px -55% 0px' });
    sections.forEach(section => sectionObserver.observe(section));

    // Back in the hero: no section is active
    const hero = document.querySelector('.hero');
    if (hero) {
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive(null);
      }, { rootMargin: '-80px 0px -55% 0px' }).observe(hero);
    }
  }

  // ===== CALL BAR: only show once the hero call plate has scrolled away =====
  const fab = document.querySelector('.fab');
  const heroCtas = document.querySelector('.hero__ctas');
  if (fab && heroCtas && 'IntersectionObserver' in window) {
    fab.classList.add('is-hidden');
    new IntersectionObserver(([entry]) => {
      fab.classList.toggle('is-hidden', entry.isIntersecting || entry.boundingClientRect.top > 0);
    }).observe(heroCtas);
  }

})();
