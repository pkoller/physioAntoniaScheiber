# PhysioAntoniaScheiber.at — Project Context

## What this is
A static homepage for a physiotherapist named Antonia, plus Impressum/Datenschutz pages. No build tools, no framework, no dependencies. Opens directly in a browser via `file://`.

## Files
```
index.html      — homepage content and structure
style.css       — all styles (imported by every page)
script.js       — language toggle, mobile nav drawer, "Sie sind hier" plate,
                  nav active-section tracking, contact form handler, call bar
impressum.html  — legal notice (§ 5 ECG), German only
datenschutz.html — privacy policy (DSGVO), German only
img/            — optimized site images (hero photo etc.)
fonts/          — self-hosted Barlow Condensed + Atkinson Hyperlegible Next woff2 files
README.md       — repo overview for humans
PRODUCT.md      — product context (audiences, positioning, evidence) for the impeccable design skill
DESIGN.md       — the visual system (Tiroler Wegweiser): tokens, components, rules
robots.txt      — allows all crawlers, points at sitemap.xml
sitemap.xml     — single-URL sitemap for Google Search Console
.claude/skills/ — reference-only design skills (see "Design skills" below)
```

## Tech constraints
- **No npm, no bundler, no framework.** Keep it plain HTML/CSS/JS.
- Fonts (Barlow Condensed 600/700 + Atkinson Hyperlegible Next variable, woff2, latin + latin-ext) are **self-hosted** in `fonts/` via `@font-face` at the top of `style.css`. Don't reintroduce the Google Fonts `<link>` — it sends visitors' IPs to Google without consent (cf. the 2022 Google-Fonts warning-letter wave in AT/DE).
- **Cookie/consent banner gates Google Maps** (logic in `script.js`): the site sets no cookies itself; the only third-party content, the Google Maps iframe, carries `data-src` and gets its `src` only after the visitor clicks "Akzeptieren" in the banner (`#consentBanner`). "Ablehnen" and "Akzeptieren" are styled identically on purpose (DSB/EDPB: declining must be as easy as accepting). The choice is stored in `localStorage` under `physioantonia-consent-maps` ("granted"/"denied"); the footer's "Cookie-Einstellungen" button reopens the banner, and `datenschutz.html` §5 has a revoke button. Without consent the map area shows a placeholder whose "Cookie-Einstellungen" link (`[data-consent-open]`, delegated click handler) reopens the banner — there is deliberately no "Karte laden" button that loads the map directly; consent always goes through the banner. Any new third-party embed must go through the same consent — never load it on page view.
- **Contact form → Web3Forms**: `#contactFormEl` posts via `fetch` to `api.web3forms.com/submit` (handler in `script.js`), which emails submissions to Antonia. The access key in the hidden `access_key` input is public by design (it only allows sending to the configured inbox). Web3Forms rejects server-side requests, so test from a real browser (e.g. the PR preview), not curl. Data only leaves the browser on submit; `datenschutz.html` §2 documents it.
- **Cache-busting**: GitHub Pages serves files with `max-age=600`, so a browser can pair a fresh `index.html` with a stale `script.js` and break. Every page links `style.css?v=N` / `script.js?v=N` — bump `N` on all three HTML pages whenever `style.css` or `script.js` changes.
- No emoji anywhere — use inline SVG icons (Lucide style: `stroke="currentColor"`, `fill="none"`, `stroke-width="1.8"–"2.5"`).

## SEO
- `index.html` `<head>` carries a keyword-led `<title>` ("Physiotherapie Innsbruck – …"), meta description, `rel="canonical"` to `https://physioantoniascheiber.at/` (keeps PR previews from competing as duplicates), and a `schema.org/Physiotherapy` JSON-LD block. Keep its name/address/phone identical to the Google Business Profile and the visible contact section — if one changes, change all.
- Section headings name the city ("… in Innsbruck") on purpose — don't strip it in copy edits.
- `impressum.html` / `datenschutz.html` are `noindex` on purpose.

## Design system — "Tiroler Wegweiser"
The page is one Tyrolean trail signpost: an anthracite post (`.post::before`) runs down the left edge of every section's container, each section heading hangs off it as a yellow arrow plate (`.plate--heading`) with its route number in a red-white-red trail blaze (`.blaze`), and the phone number is the destination. Full reference: `DESIGN.md`. Tokens live in `:root` in `style.css`:

| Token | Value | Use |
|-------|-------|-----|
| `--yellow` | `#F5C400` | Sign plates, call actions, header phone, mobile call bar, the Kosten board |
| `--ink` | `#17191B` | Lettering, plate frames, rules (10.8:1 on yellow) |
| `--ink-soft` | `#3B4044` | Secondary text (≥6.4:1 on yellow, ≥8:1 on the grounds) |
| `--blaze` / `--blaze-text` | `#C8102E` / `#A50D26` | Trail-blaze stripes and focus ring on white / error text |
| `--white` | `#FFFFFF` | Zusatztafeln (supplementary plates), logo plate, form panel |
| `--ground` / `--ground-deep` | `#E4E5E0` / `#D6D8D1` | Limestone page ground / alternate section |
| `--post` / `--post-deep` | `#2A2D30` / `#1D1F21` | The post, map placeholder / contact section + footer |
| `--on-post` / `--on-post-soft` | `#F1F2EE` / `#B8BDB9` | Text on the dark colours |
| `--font-sign` | Barlow Condensed (600/700) | Headings, plates, labels, buttons — mixed case, never all-caps headings |
| `--font-body` | Atkinson Hyperlegible Next | All running text (built for low-vision readers; base 19px) |
| `--post-w` / `--post-gap` / `--post-off` | `10px` / fluid / sum | Post geometry; content inside `.post` is offset by `--post-off` |
| `--tip` | `0.62em` | Arrow-tip depth of plates (scales with font size) |
| `--frame` | `2px` | Ink frame of plates, Zusatztafeln, inputs, buttons |
| `--ease-out` / `--ease-in-out` | as before | Entrances, presses / on-screen movement |

**Components:** `.plate` (arrow plate: the element's own background is the ink frame, `::after` paints the face via `--face`, clipped to the same polygon), `.plate--white`, `.plate--call` (phone, primary action), `.plate--route` (hero route sign, equal-length plates), `.plate--heading` (section h2); plates inside a `.post` are mounted on it via a negative left margin. `.blaze` (route number on the white band; stripes on `::before` so the number's real background is white). `.zusatz` (white rectangular supplementary plate for short facts, key | value). `.btn` (rectangular, yellow or `--outline` white) for form, consent and legal pages.

**Rules:** three inks only (yellow, ink, blaze red) plus white on the limestone/anthracite grounds; no cards, drop shadows (the consent dialog is the one exception), gradients (except the blaze's hard stripes), rounded corners or pills. Every text colour must reach WCAG AA (4.5:1, 3:1 for large text); `--blaze` is never body text on the grounds. Nothing is conveyed by colour alone (active nav = thick underline + bold + `aria-current`; invalid inputs = thicker border + message). Photos are square-cornered.

Breakpoints: 420 / 768 / 900 / 1000 / 1280 (inline nav from 1280, drawer below).

## Layout
- **Header** (sticky, `--header-h`): white Standort plate as logo (`.logo`, name + address), inline nav with route blazes 1–5 from 1280px, yellow phone, DE/EN toggle. Below 1280px the nav (`#nav`) becomes a full-screen drawer of yellow arrow plates on a post, toggled by `#hamburger` (Escape / outside click / link click close it), and a white "Sie sind hier" plate (`#here`) hangs under the header naming the current section.
- **Centered container** (`.container`, max 1240px). The old "left-aligned, no centering" rule no longer applies; the signpost post sits at the container's left edge.
- **The post**: every section container carries `.post`; its `::before` extends through the section's own padding (`--sec-pad`) so adjacent sections join into one continuous post. The contact section uses `.post--end` (the post ends at the heading). New sections must use the same pattern or the post breaks.
- **Hero**: 7/5 grid from 1000px; left column = H1, sub, call plate, "Termin anfragen" plate, ÖSV Zusatztafel, route sign (`nav.routes`, five plates linking the sections); right column = photo, sticky, bleeding to the right window edge.
- **Anchor scrolling**: nav and route links point at the section headings (`#leistungen-title`, `#hausbesuche-title`, `#ueber-uns-title`, `#kosten-title`, `#kontakt-title`); `html { scroll-padding-top }` keeps them clear of the sticky header. Never put a nav anchor on a transformed element (Safari/iOS overshoots).

## Motion & interaction conventions
Distilled from Emil Kowalski's design-engineering principles and a taste/anti-slop audit — the deeper reference lives in `.claude/skills/` (see below); this is the everyday summary.

- **Press feedback**: buttons `scale(0.97)` on `:active`; plates nudge along their arrow on hover (`translateX(6px)`) and press (`translateX(3px) scale(0.98)`), via `var(--ease-out)` ~180–220ms. Never `transition: all` — name the exact properties.
- **Only animate `transform` and `opacity`** (GPU-accelerated). Never animate `padding`, `width`, `height`, `top`/`left`.
- **Hover nudges are gated off touch devices** (`@media (hover: none)`) so a tap doesn't leave a hover state stuck.
- **One authored motion moment**: on load the hero's plates slide onto the post (`@keyframes mount`, ~70ms stagger, `animation-fill-mode: backwards` so hover transforms still work afterwards). There are deliberately **no scroll reveals** any more — don't add per-section entrance animations back. Everything is gated by `prefers-reduced-motion`.
- **Nav active-state tracks the whole `<section>`** (IntersectionObserver over sections via a `WeakMap` section → link), not the heading a link scrolls to (which lands under the sticky header, outside the "in view" band). The active link also feeds the "Sie sind hier" plate; scrolling back into the hero clears it.
- **Typography**: `text-wrap: balance` on headings, `text-wrap: pretty` on body paragraphs.
- **No eyebrows/kickers above headings.** The heading plate carries its own weight; the old "In Bewegung bleiben" / "Mobil & flexibel" eyebrows were removed in the redesign.
- **Keyboard-triggered or very-frequent actions get no animation** (e.g. the language toggle).

## Design skills
`.claude/skills/` carries reference-only design skills, invoked deliberately (not auto-loaded) when doing a deeper design pass:
- **emil-design-eng** — full animation-timing tables, easing curves, spring-physics guidance beyond the summary above.
- **design-taste-frontend** / **redesign-existing-projects** — anti-slop / de-templating audit checklists (earlier passes; the current world was chosen with the impeccable skill — see `PRODUCT.md`/`DESIGN.md`).

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
1. **Header** — sticky: Standort-plate logo, nav 1–5 (drawer below 1280px), phone, DE/EN; "Sie sind hier" plate underneath on small screens
2. **Hero** — H1 + sub, call plate (primary action), "Termin anfragen" plate, ÖSV Zusatztafel, route sign to all five sections; photo right (after the route sign on small screens)
3. **1 Physiotherapie** (`#leistungen`) — heading plate, lead, treatment list with blaze bullets (2 columns from 900px), sports-science statement
4. **2 Hausbesuche** (`#hausbesuche`, deep ground) — heading plate, wide photo, lead + note + Zusatztafeln (Radius: Innsbruck Stadt / Verordnung mit Vermerk „Hausbesuch“)
5. **3 Über mich** (`#ueber-uns`) — heading plate, wide portrait, career as stages (ÖSV years highlighted in yellow), Weiterbildungen as stacked Zusatztafeln
6. **4 Kostenübernahme** (`#kosten`, yellow board) — white heading plate, the three paragraphs as numbered steps
7. **5 Kontakt** (`#kontakt`, dark) — heading plate, second call plate, address/email/website + TZA logo, white form panel, consent-gated Google Maps full width below
8. **Footer** — copyright + Impressum/Datenschutz + Cookie-Einstellungen
9. **Call bar** (`.fab`) — full-width yellow bar at the bottom, mobile only, appears once the hero call plate has scrolled away

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
`.gitignore`: `media/`, `.agents/`, `skills-lock.json`, `_pr-preview-src/` and `.impeccable/` (Impeccable's local working files: screenshots, surface brief — the deploy publishes the repo root, so they must not be committed) are ignored; `.claude/` is ignored except `.claude/skills/{emil-design-eng,design-taste-frontend,redesign-existing-projects}`, which are tracked on purpose (see "Design skills" above).

## What NOT to do
- Don't introduce a framework or build step.
- Don't use emoji — inline SVG only.
- Don't add new CSS outside `style.css`.
- Don't change the bilingual pattern — extend it, don't replace it.
- Don't hardcode colors or easing curves — use the CSS variables.
- Don't push directly to `master` — it's protected; use a branch + PR.
- Don't break the signpost post: section containers carry `.post`, and plates inside it stay mounted on it.
