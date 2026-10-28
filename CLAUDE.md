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
fonts/          — self-hosted Bricolage Grotesque + Source Sans 3 woff2 files
README.md       — repo overview for humans
PRODUCT.md      — product context (audiences, positioning, evidence) for design work
robots.txt      — allows all crawlers, points at sitemap.xml
sitemap.xml     — single-URL sitemap for Google Search Console
.claude/skills/ — reference-only design skills (see "Design skills" below)
```

## Tech constraints
- **No npm, no bundler, no framework.** Keep it plain HTML/CSS/JS.
- Fonts (Bricolage Grotesque + Source Sans 3, variable woff2, latin + latin-ext) are **self-hosted** in `fonts/` via `@font-face` at the top of `style.css`. Don't reintroduce the Google Fonts `<link>` — it sends visitors' IPs to Google without consent (cf. the 2022 Google-Fonts warning-letter wave in AT/DE).
- **Cookie/consent banner gates Google Maps** (logic in `script.js`): the site sets no cookies itself; the only third-party content, the Google Maps iframe, carries `data-src` and gets its `src` only after the visitor clicks "Akzeptieren" in the banner (`#consentBanner`). "Ablehnen" and "Akzeptieren" are styled identically on purpose (DSB/EDPB: declining must be as easy as accepting). The choice is stored in `localStorage` under `physioantonia-consent-maps` ("granted"/"denied"); the footer's "Cookie-Einstellungen" button reopens the banner, and `datenschutz.html` §5 has a revoke button. Without consent the map area shows a placeholder whose "Cookie-Einstellungen" link (`[data-consent-open]`, delegated click handler) reopens the banner — there is deliberately no "Karte laden" button that loads the map directly; consent always goes through the banner. Any new third-party embed must go through the same consent — never load it on page view.
- **Contact form → Web3Forms**: `#contactFormEl` posts via `fetch` to `api.web3forms.com/submit` (handler in `script.js`), which emails submissions to Antonia. The access key in the hidden `access_key` input is public by design (it only allows sending to the configured inbox). Web3Forms rejects server-side requests, so test from a real browser (e.g. the PR preview), not curl. Data only leaves the browser on submit; `datenschutz.html` §2 documents it.
- **Cache-busting**: GitHub Pages serves files with `max-age=600`, so a browser can pair a fresh `index.html` with a stale `script.js` and break. Every page links `style.css?v=N` / `script.js?v=N` — bump `N` on all three HTML pages whenever `style.css` or `script.js` changes.
- No emoji anywhere — use inline SVG icons (Lucide style: `stroke="currentColor"`, `fill="none"`, `stroke-width="1.8"–"2.5"`).

## SEO
- `index.html` `<head>` carries a keyword-led `<title>` ("Physiotherapie Innsbruck – …"), meta description, `rel="canonical"` to `https://physioantoniascheiber.at/` (keeps PR previews from competing as duplicates), and a `schema.org/Physiotherapy` JSON-LD block. Keep its name/address/phone identical to the Google Business Profile and the visible contact section — if one changes, change all.
- Section headings name the city ("… in Innsbruck") on purpose — don't strip it in copy edits.
- `impressum.html` / `datenschutz.html` are `noindex` on purpose.

## Design system — "Bewegung"
Editorial and photo-led: full-bleed photographs carry the page (movement in the hero, Antonia's portrait as a band in Über mich), a large expressive headline ("In Bewegung bleiben.") overlaps the hero photo's lower edge, cool limestone ground, green-black ink and one moss green for every action. Tokens live in `:root` in `style.css`:

| Token | Value | Use |
|-------|-------|-----|
| `--ground` / `--glacier` / `--white` | `#F4F5F2` / `#DCE9E5` / `#FFFFFF` | Limestone page ground (cool, not cream) / Hausbesuche band / inputs, consent |
| `--ink` / `--ink-soft` / `--rule` | `#141B17` / `#4A544E` / `#D2D8D3` | Text (≥16:1) / secondary text (≥6:1 on glacier) / hairlines |
| `--moss` / `--moss-hover` | `#2F5D4E` / `#244A3E` | **The only accent**: buttons, links, active nav, role line, ÖSV row, statement (≥7:1 on ground) |
| `--moss-deep` / `--moss-night` / `--on-moss` / `--on-moss-soft` | `#1A3A30` / `#11261F` / `#F4F5F2` / `#BFD3CB` | Contact section / footer / text on them |
| `--input-border` / `--error` | `#7B867F` / `#B3261E` | Form field outline / form errors |
| `--font-display` | Bricolage Grotesque (variable) | Headline, headings, index terms, numbers |
| `--font-body` | Source Sans 3 (variable) | Running text (base 20px) |
| `--radius` | `8px` | Photos, form panel, map; buttons are pills |
| `--ease-out` / `--ease-in-out` | `cubic-bezier(0.23, 1, 0.32, 1)` / `cubic-bezier(0.77, 0, 0.175, 1)` | Entrances, presses / drawer |

**Rules:** one accent (moss). Display tracking never below −0.04em. No cards, no eyebrows, no uppercase labels, no "A · B" meta strings. Every text colour must reach WCAG AA; nothing is conveyed by colour alone. Use `.num` on phone numbers and years.

Breakpoints: 360 / 400 / 768 / 900 / 1000 / 1180 (inline nav from 1180, drawer below).

## Layout
- **Header** (sticky, limestone): wordmark, five text links, moss phone pill, DE/EN (fixed order, active language bold); drawer below 1180px.
- **Centered container** (`.container`, max 1240px). The old sidebar is gone.
- **Hero**: `figure.hero__photo` full-bleed (`img/hausbesuche.jpg`), then `.hero__band` whose `h1` sits on a limestone box pulled up over the photo's lower edge (negative margin) — "In Bewegung bleiben." + "Physiotherapie in Innsbruck mit Antonia Scheiber"; sub + call button + "Termin anfragen"; ÖSV line.
- **Physiotherapie**: sticky treatment photo (`img/hero1.jpg`) left, intro + two-column index + statement right.
- **Über mich**: full-bleed portrait band (`.band`, `img/antonia.jpg`) at the top of the section, then timeline + Weiterbildungen.
- **Anchor scrolling**: nav links point at section headings; `scroll-padding-top` keeps them clear of the sticky header.
- **Consent banner**: compact bottom sheet on phones, bottom-right card from 768px.

## Motion & interaction conventions
Distilled from Emil Kowalski's design-engineering principles and a taste/anti-slop audit — the deeper reference lives in `.claude/skills/` (see below); this is the everyday summary.

- **Press feedback**: buttons `scale(0.97)` on `:active` (~160ms, `var(--ease-out)`). Never `transition: all`.
- **One motion moment**: the hero photo settles from a slight zoom on load (`@keyframes settle`). No scroll reveals. Gated by `prefers-reduced-motion`.
- **Hover states are gated off touch devices** (`@media (hover: none)`).
- **Nav active-state tracks the whole `<section>`** (IntersectionObserver + `WeakMap` section → link).
- **Typography**: `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs.
- **No eyebrows/kickers above headings**, no uppercase labels.

## Design skills
`.claude/skills/` carries reference-only design skills, invoked deliberately (not auto-loaded) when doing a deeper design pass:
- **emil-design-eng** — full animation-timing tables, easing curves, spring-physics guidance beyond the summary above.
- **design-taste-frontend** / **redesign-existing-projects** — anti-slop / de-templating audit checklists (the current "Bewegung" approach is one of three prototyped redesign directions).

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
1. **Header** — sticky limestone bar: wordmark, nav (drawer below 1180px), moss phone pill, DE/EN
2. **Hero** — full-bleed movement photo; "In Bewegung bleiben." headline box overlapping it; sub, call button, "Termin anfragen"; ÖSV line
3. **Physiotherapie** (`#leistungen`) — sticky treatment photo + heading, lead, two-column index (short term + original sentence), statement in moss
4. **Hausbesuche** (`#hausbesuche`, glacier band) — heading left, lead + referral note right
5. **Über mich** (`#ueber-uns`) — full-bleed portrait band, timeline (ÖSV row in moss), Weiterbildungen
6. **Kostenübernahme** (`#kosten`) — three columns: Verordnung / Wahltherapeutin / Bewilligung
7. **Kontakt** (`#kontakt`, deep moss) — the phone number as giant type, address / email / Praxis, form panel, consent-gated map
8. **Footer** (moss-night) — copyright + Impressum / Datenschutz / Cookie-Einstellungen
9. **Call bar** (`.fab`) — full-width moss bar, mobile only, after the hero call button scrolls away

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
`.gitignore`: `media/`, `.agents/`, `skills-lock.json`, `_pr-preview-src/` and `.impeccable/` (local design-tool working files) are ignored; `.claude/` is ignored except `.claude/skills/{emil-design-eng,design-taste-frontend,redesign-existing-projects}`, which are tracked on purpose (see "Design skills" above).

## What NOT to do
- Don't introduce a framework or build step.
- Don't use emoji — inline SVG only.
- Don't add new CSS outside `style.css`.
- Don't change the bilingual pattern — extend it, don't replace it.
- Don't hardcode colors or easing curves — use the CSS variables.
- Don't push directly to `master` — it's protected; use a branch + PR.
- Don't add a second accent colour or reintroduce card grids, eyebrows or uppercase labels.
