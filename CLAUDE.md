# PhysioAntoniaScheiber.at — Project Context

## What this is
A static homepage for a physiotherapist named Antonia, plus Impressum/Datenschutz pages. No build tools, no framework, no dependencies. Opens directly in a browser via `file://`.

## Files
```
index.html      — homepage content and structure
style.css       — all styles (imported by every page)
script.js       — language toggle, mobile nav drawer, nav active-section
                  tracking, consent banner, contact form handler, call bar
impressum.html  — legal notice (§ 5 ECG), German only
datenschutz.html — privacy policy (DSGVO), German only
img/            — optimized site images (hero photo etc.)
fonts/          — self-hosted Schibsted Grotesk + Source Sans 3 woff2 files
README.md       — repo overview for humans
PRODUCT.md      — product context (audiences, positioning, evidence) for design work
DESIGN.md       — the visual system ("Porträt"): tokens, components, rules
robots.txt      — allows all crawlers, points at sitemap.xml
sitemap.xml     — single-URL sitemap for Google Search Console
.claude/skills/ — reference-only design skills (see "Design skills" below)
```

## Tech constraints
- **No npm, no bundler, no framework.** Keep it plain HTML/CSS/JS.
- Fonts (Schibsted Grotesk + Source Sans 3, variable woff2, latin + latin-ext) are **self-hosted** in `fonts/` via `@font-face` at the top of `style.css`. Don't reintroduce the Google Fonts `<link>` — it sends visitors' IPs to Google without consent (cf. the 2022 Google-Fonts warning-letter wave in AT/DE).
- **Cookie/consent banner gates Google Maps** (logic in `script.js`): the site sets no cookies itself; the only third-party content, the Google Maps iframe, carries `data-src` and gets its `src` only after the visitor clicks "Akzeptieren" in the banner (`#consentBanner`). "Ablehnen" and "Akzeptieren" are styled identically on purpose (DSB/EDPB: declining must be as easy as accepting). The choice is stored in `localStorage` under `physioantonia-consent-maps` ("granted"/"denied"); the footer's "Cookie-Einstellungen" button reopens the banner, and `datenschutz.html` §5 has a revoke button. Without consent the map area shows a placeholder whose "Cookie-Einstellungen" link (`[data-consent-open]`, delegated click handler) reopens the banner — there is deliberately no "Karte laden" button that loads the map directly; consent always goes through the banner. Any new third-party embed must go through the same consent — never load it on page view.
- **Contact form → Web3Forms**: `#contactFormEl` posts via `fetch` to `api.web3forms.com/submit` (handler in `script.js`), which emails submissions to Antonia. The access key in the hidden `access_key` input is public by design (it only allows sending to the configured inbox). Web3Forms rejects server-side requests, so test from a real browser (e.g. the PR preview), not curl. Data only leaves the browser on submit; `datenschutz.html` §2 documents it.
- **Cache-busting**: GitHub Pages serves files with `max-age=600`, so a browser can pair a fresh `index.html` with a stale `script.js` and break. Every page links `style.css?v=N` / `script.js?v=N` — bump `N` on all three HTML pages whenever `style.css` or `script.js` changes.
- No emoji anywhere — use inline SVG icons (Lucide style: `stroke="currentColor"`, `fill="none"`, `stroke-width="1.8"–"2.5"`).

## SEO
- `index.html` `<head>` carries a keyword-led `<title>` ("Physiotherapie Innsbruck – …"), meta description, `rel="canonical"` to `https://physioantoniascheiber.at/` (keeps PR previews from competing as duplicates), and a `schema.org/Physiotherapy` JSON-LD block. Keep its name/address/phone identical to the Google Business Profile and the visible contact section — if one changes, change all.
- Section headings name the city ("… in Innsbruck") on purpose — don't strip it in copy edits.
- `impressum.html` / `datenschutz.html` are `noindex` on purpose.

## Design system — "Porträt"
A physiotherapy practice is a person, so the page opens inside Antonia's own portrait (`img/antonia.jpg`): its slate backdrop is sampled as `--slate` and used for the hero, header, contact section and footer, so the photo and the page read as one field. Her name is the headline; her phone number closes the page as its biggest type. Full reference: `DESIGN.md`. Tokens live in `:root` in `style.css`:

| Token | Value | Use |
|-------|-------|-----|
| `--slate` | `#1B2326` | Portrait backdrop colour: hero, header, contact, drawer |
| `--slate-deep` / `--slate-line` / `--slate-hover` | `#141A1C` / `#334043` / `#2A3639` | Footer / hairlines on slate / hover on slate buttons |
| `--ice` / `--ice-soft` | `#EEF3F3` / `#B4C2C4` | Text on slate (≥14:1) / secondary text on slate (≥8.5:1) |
| `--apricot` / `--apricot-hover` | `#F2BC8D` / `#F7CDA8` | **The only accent**: call buttons, header phone, mobile call bar, active-nav underline, hero role line |
| `--paper` / `--mist` | `#FAFAF8` / `#EDF2F2` | Light reading sections (neutral, not cream) / alternate sections |
| `--ink` / `--ink-soft` | `#1B2326` / `#4F5B5F` | Text on light grounds (≥15:1 / ≥6.5:1) |
| `--rule` / `--input-border` / `--error` | `#D3DCDC` / `#7C888B` / `#B3261E` | Hairlines / form field outline (≥3.5:1 on white) / form errors |
| `--font-display` | Schibsted Grotesk (variable) | Name, headings, index terms, buttons, numbers |
| `--font-body` | Source Sans 3 (variable) | All running text (base 20px; plain zero, good for older readers) |
| `--radius` / `--radius-lg` | `12px` / `22px` | Inputs / photos, form panel, map. Buttons are pills (`999px`) |
| `--ease-out` / `--ease-in-out` | `cubic-bezier(0.23, 1, 0.32, 1)` / `cubic-bezier(0.77, 0, 0.175, 1)` | Entrances, presses / on-screen movement |

**Rules:** display tracking never below −0.04em (the closing number uses −0.035em). Slate + paper/mist + one apricot accent — don't add a second accent colour. Lists open with a 2px ink rule and separate rows with `--rule` hairlines; no cards, no drop shadows (the consent dialog is the one exception), no gradients except the portrait's edge mask, no uppercase tracked labels, no eyebrows above headings, no "A · B" meta strings, no "→" suffixes on links. Every text colour must reach WCAG AA (4.5:1, 3:1 for large text). Nothing is conveyed by colour alone (active nav = apricot underline + brighter text + `aria-current`; invalid inputs = thicker border + message). Use `.num` (lining, tabular figures) on phone numbers and years.

Breakpoints: 360 / 400 / 768 / 900 / 1000 / 1180 (inline nav from 1180, drawer below; hero two-column from 1000).

## Layout
- **Header** (sticky, slate, `--header-h`): wordmark (`.logo`: name + "Physiotherapie in Innsbruck"), five text links, apricot phone pill, DE/EN. Below 1180px the nav (`#nav`) becomes a full-screen slate drawer with large links and a call button, toggled by `#hamburger` (Escape / outside click / link click close it).
- **Centered container** (`.container`, max `--max` 1240px). The old fixed-left sidebar and left-aligned container are gone.
- **Hero** (`.hero`, slate): from 1000px a two-column grid — text left, `figure.hero__photo` right, bleeding to the window edge with a left `mask-image` fade into the slate. Below 1000px the portrait comes first, full-width, fading downward, and the text overlaps its lower edge. The hero photo is `img/antonia.jpg`; `img/hero1.jpg` (treatment) is used in Über mich, `img/hausbesuche.jpg` in Hausbesuche.
- **Photo language**: like the hero portrait, the Hausbesuche and Über-mich photos have no rounded frame and run to the window edge on their outer side (full-bleed on phones), so the page stays one field. `img/antonia.jpg` is only 648px tall — the hero caps its height so it isn't upscaled much; a higher-resolution original would sharpen it.
- **Sticky columns** from 1000px: the Physiotherapie intro and the Über-mich photo stay in view next to their long lists.
- **Anchor scrolling**: nav links point at the section headings (`#leistungen-title`, `#hausbesuche-title`, `#ueber-uns-title`, `#kosten-title`, `#kontakt-title`); `html { scroll-padding-top }` keeps them clear of the sticky header. Never put a nav anchor on a transformed element (Safari/iOS overshoots).
- **Consent banner**: bottom-left full width on phones, bottom-right from 768px so it never covers the hero call button.

## Motion & interaction conventions
Distilled from Emil Kowalski's design-engineering principles and a taste/anti-slop audit — the deeper reference lives in `.claude/skills/` (see below); this is the everyday summary.

- **Press feedback**: buttons `scale(0.97)` on `:active` via `var(--ease-out)` ~160ms. Never `transition: all` — name the exact properties.
- **Only animate `transform` and `opacity`** (plus colour/underline changes on hover). Never animate `padding`, `width`, `height`, `top`/`left`.
- **Hover states are gated off touch devices** (`@media (hover: none)`) so a tap doesn't leave a hover state stuck.
- **One motion moment**: the hero portrait fades in once on load (`@keyframes emerge`). There are deliberately **no scroll reveals** — don't add per-section entrance animations. Everything is gated by `prefers-reduced-motion`.
- **Nav active-state tracks the whole `<section>`** (IntersectionObserver over sections via a `WeakMap` section → link), not the heading a link scrolls to (which lands under the sticky header, outside the "in view" band). Scrolling back into the hero clears it.
- **Typography**: `text-wrap: balance` on headings, `text-wrap: pretty` on body paragraphs; display type is set tight (`letter-spacing` −0.02 to −0.05em) and heavy, body stays at ≥18px.
- **No eyebrows/kickers above headings**, no uppercase labels — the heading carries its own weight.
- **Keyboard-triggered or very-frequent actions get no animation** (e.g. the language toggle).

## Design skills
`.claude/skills/` carries reference-only design skills, invoked deliberately (not auto-loaded) when doing a deeper design pass:
- **emil-design-eng** — full animation-timing tables, easing curves, spring-physics guidance beyond the summary above.
- **design-taste-frontend** / **redesign-existing-projects** — anti-slop / de-templating audit checklists. (The current "Porträt" world was chosen by prototyping three structures and comparing screenshots; see `PRODUCT.md` / `DESIGN.md`.)

These are large reference docs — read the everyday summary above first; reach for the skills themselves only when doing a substantial redesign pass, not for routine edits.

## Bilingual system (DE/EN)
Every visible text element on `index.html` that differs between languages carries both:
```html
<h2 data-de="German text" data-en="English text">German text</h2>
```
`script.js` reads `html.lang` and swaps `textContent` (or `innerHTML` for elements with `<br>`) on all `[data-de]` elements when the toggle is clicked. Default language is German (`<html lang="de">`).

**Rules:**
- Always add both `data-de` and `data-en` to any new text element on `index.html`.
- `script.js` swaps via `innerHTML` for strings that contain markup (`<br>`, `<a>`), `textContent` otherwise. Inside `data-de`/`data-en`, write attribute quotes as `&quot;`.
- The language toggle button in the header (`#langToggle`) is wired up in `script.js` — no changes needed there.
- `impressum.html` and `datenschutz.html` are **German-only by design** — legal text isn't bilingual, don't add `data-de`/`data-en` there.

## Page sections (top → bottom, index.html)
1. **Header** — sticky slate bar: wordmark, Physiotherapie / Hausbesuche / Über mich / Kosten / Kontakt (drawer below 1180px), apricot phone pill, DE/EN
2. **Hero** (slate) — `h1` = "Antonia Scheiber" + "Physiotherapie in Innsbruck", sub, apricot call button with the number, "Termin anfragen" link, ÖSV line; portrait right (on top on mobile)
3. **Physiotherapie** (`#leistungen`) — heading + lead (sticky), index of the eight treatments (short term + original full sentence), sports-science statement set large
4. **Hausbesuche** (`#hausbesuche`, mist) — photo + heading, lead, note about the referral
5. **Über mich** (`#ueber-uns`) — treatment photo (sticky) + heading, timeline (ÖSV row emphasised with an apricot dot), Weiterbildungen in two columns
6. **Kostenübernahme** (`#kosten`, mist) — three columns: Verordnung / Wahltherapeutin / Bewilligung, each with the original paragraph
7. **Kontakt** (`#kontakt`, slate) — heading, the phone number as giant type (`.bignumber`), address / email / Praxis (TZA) + logo, form on a paper panel, consent-gated Google Maps full width
8. **Footer** (slate-deep) — copyright + Impressum / Datenschutz / Cookie-Einstellungen
9. **Call bar** (`.fab`) — full-width apricot bar, mobile only, appears once the hero call button has scrolled away

## Placeholder content still to replace
- Phone (`0664 75081432`, `tel:+4366475081432`) is real — appears in header, hero, contact section, mobile call bar, Impressum, Datenschutz
- Address (Anichstraße 34, 6020 Innsbruck), email (`antonia@tzaphysio.at`), and the Google Maps embed are already real
- `impressum.html` and `datenschutz.html` carry the final legal text — no placeholders left
- Website links: the homepage contact section links to the TZA practice site (`tzaphysio.at`); the Impressum and everything else use `physioantoniascheiber.at`

## GitHub & Hosting
Public repo: `https://github.com/pkoller/physioAntoniaScheiber`. **`master` is protected — no direct pushes.** Always work on a branch and open a PR:
```bash
git checkout -b my-change
git add <files>
git commit -m "..."
git push -u origin my-change
gh pr create --base master --head my-change --title "..." --body "..."
```
Live site: `https://physioantoniascheiber.at` (custom domain; `pkoller.github.io/physioAntoniaScheiber` redirects there). DNS is at GoDaddy: four A + four AAAA records on `@` pointing at GitHub Pages, plus `www` CNAME → `pkoller.github.io`. GitHub Pages is served from the `gh-pages` branch, published by `.github/workflows/pages-deploy.yml` on every push to `master` (it sets `cname: physioantoniascheiber.at` so the `CNAME` file on `gh-pages` is rewritten on every deploy — don't remove it or the domain detaches; that workflow also needs `permissions: contents: write` — without it the push silently 403s and the branch is never updated; this has broken production before).
Every pull request also gets a live preview at `https://pkoller.github.io/physioAntoniaScheiber/pr-preview/pr-<number>/`, deployed by `.github/workflows/pr-preview.yml` via `rossjrw/pr-preview-action`, and torn down when the PR closes. That workflow stages files into an isolated `_pr-preview-src/` directory before deploying — don't change it back to `source-dir: ./` (repo root), that previously caused the deploy action's own temp worktree to get recursively copied into itself on every run.
`.gitignore`: `media/`, `.agents/`, `skills-lock.json`, `_pr-preview-src/` and `.impeccable/` (local design-tool working files — the deploy publishes the repo root, so they must not be committed) are ignored; `.claude/` is ignored except `.claude/skills/{emil-design-eng,design-taste-frontend,redesign-existing-projects}`, which are tracked on purpose (see "Design skills" above).

## What NOT to do
- Don't introduce a framework or build step.
- Don't use emoji — inline SVG only.
- Don't add new CSS outside `style.css`.
- Don't change the bilingual pattern — extend it, don't replace it.
- Don't hardcode colors or easing curves — use the CSS variables.
- Don't push directly to `master` — it's protected; use a branch + PR.
- Don't add a second accent colour or reintroduce card grids, eyebrows or uppercase labels.
