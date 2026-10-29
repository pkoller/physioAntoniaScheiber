(function () {
  'use strict';

  const html = document.documentElement;

  // ===== LANGUAGE TOGGLE =====
  const langToggle = document.getElementById('langToggle');
  const langLabel = document.getElementById('langLabel');
  const langOther = document.getElementById('langOther');

  function setLang(lang) {
    html.lang = lang;
    const isDE = lang === 'de';
    // Fixed "DE / EN" order; only the emphasis moves to the active language
    langLabel.className = isDE ? 'lang-toggle__active' : 'lang-toggle__inactive';
    langOther.className = isDE ? 'lang-toggle__inactive' : 'lang-toggle__active';
    langToggle.setAttribute('aria-label', isDE ? 'Switch to English' : 'Auf Deutsch umschalten');

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
    document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      setLang(html.lang === 'de' ? 'en' : 'de');
    });
  }

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
    const consentOpen = document.getElementById('consentOpen');
    if (consentOpen) consentOpen.addEventListener('click', openConsent);
    // Placeholder links live in data-de/data-en markup that the language
    // toggle re-renders via innerHTML, so delegate from the document.
    document.addEventListener('click', e => {
      if (e.target.closest('[data-consent-open]')) openConsent();
    });
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
      if (formTitle) formTitle.hidden = !show;
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

  // ===== CALL BAR: only once the first call button has scrolled away =====
  const fab = document.querySelector('.fab');
  const fabAnchor = document.querySelector('[data-fab-anchor]');
  if (fab && fabAnchor && 'IntersectionObserver' in window) {
    fab.classList.add('is-hidden');
    new IntersectionObserver(([entry]) => {
      fab.classList.toggle('is-hidden', entry.isIntersecting || entry.boundingClientRect.top > 0);
    }).observe(fabAnchor);
  }

  // ===== SPRECHSTUNDE: questions are asked, answers arrive =====
  // Every answer is in the HTML (no-JS visitors and search engines see the
  // whole page); with JS, unasked ones wait until their chip is tapped. Each
  // asked question moves to the end of the thread, so the conversation reads
  // in the order the visitor asked.
  const thread = document.getElementById('thread');
  const composer = document.getElementById('composer');
  if (thread && composer) {
    html.classList.add('js');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const chips = Array.from(composer.querySelectorAll('.chip'));
    const composerDone = document.getElementById('composerDone');
    const showAll = document.getElementById('showAll');
    const asked = new Set();

    const arrive = el => {
      el.classList.remove('is-arriving');
      void el.offsetWidth; // restart the animation
      el.classList.add('is-arriving');
      el.addEventListener('animationend', () => el.classList.remove('is-arriving'), { once: true });
    };

    const ask = (key, { animate = true, scroll = true } = {}) => {
      const qa = thread.querySelector(`.qa[data-q="${key}"]`);
      if (!qa || asked.has(key)) return qa;
      asked.add(key);
      thread.appendChild(qa);
      qa.classList.add('is-asked');
      chips.forEach(chip => { if (chip.dataset.ask === key) chip.hidden = true; });
      if (asked.size === chips.length) {
        composerDone.hidden = false;
        showAll.hidden = true;
      }

      const question = qa.querySelector('.turn--you');
      const answer = qa.querySelector('.turn--her');
      if (animate && !reduceMotion) {
        arrive(question);
        let typing = answer.querySelector('.typing');
        if (!typing) {
          typing = document.createElement('span');
          typing.className = 'typing';
          typing.setAttribute('aria-hidden', 'true');
          typing.innerHTML = '<i></i><i></i><i></i>';
          answer.prepend(typing);
        }
        answer.classList.add('is-typing');
        setTimeout(() => {
          answer.classList.remove('is-typing');
          arrive(answer);
        }, 700);
      }
      if (scroll) {
        qa.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      }
      return qa;
    };

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const qa = ask(chip.dataset.ask);
        // The chip disappears, so hand focus to the question it asked
        const heading = qa && qa.querySelector('h2');
        if (heading) {
          heading.setAttribute('tabindex', '-1');
          heading.focus({ preventScroll: true });
        }
      });
    });

    showAll.addEventListener('click', () => {
      chips.forEach(chip => ask(chip.dataset.ask, { animate: false, scroll: false }));
    });

    // A link or URL hash pointing into an unasked answer asks it first
    const openTarget = id => {
      const target = id && document.getElementById(id);
      const qa = target && target.closest('.qa');
      if (qa && !qa.classList.contains('is-asked')) ask(qa.dataset.q, { animate: false, scroll: false });
      return target;
    };
    if (location.hash) {
      const target = openTarget(decodeURIComponent(location.hash.slice(1)));
      if (target) target.scrollIntoView();
    }
    document.addEventListener('click', e => {
      const link = e.target.closest('a[href^="#"]');
      if (link) openTarget(link.getAttribute('href').slice(1));
    });
  }
})();
