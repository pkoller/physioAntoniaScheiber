# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary audiences (confirmed, equally important):

- **Rehab after surgery or injury.** Adults after knee, shoulder, ankle or foot operations, fractures, ligament/tendon/muscle injuries. They usually arrive with a doctor's referral (Verordnung) and are looking for a physiotherapist in Innsbruck who can take them on.
- **Older people and house visits.** Seniors with fall risk, gait or balance insecurity, or limited mobility who cannot easily come to the practice. Visits happen at home, in a care home or in another facility, within Innsbruck city only. Relatives or care facilities may be the ones reading the site and calling on their behalf.

Secondary (served, but not what the site leads with): athletes returning to sport, and people with chronic or overuse pain (back, neck, shoulder impingement).

The visitor is typically in pain, recovering, or worried about someone who is; they want to know quickly whether Antonia treats their problem, whether she comes to them, what the insurance situation is, and how to reach her.

## Product Purpose

The single-page site for Antonia Scheiber's independent physiotherapy practice in Innsbruck. It exists so that people in the audiences above find her (search: "Physiotherapie Innsbruck", "Hausbesuche Innsbruck"), trust her, understand the cost situation, and get in touch.

Success = a **phone call**. Calling is the preferred action; the contact form and email are the fallback, not an equal alternative.

## Positioning

- Physiotherapist **and** sports scientist (FH Joanneum Graz 2014–2017; sports science, Universität Innsbruck 2018–2021).
- **Physiotherapist of the ÖSV women's alpine ski team, 2021–2024.** Confirmed as something the site may feature prominently, not only inside the CV list.
- Brings elite-sport rehab rigour to everyday patients: active, movement-based rehab toward strength, mobility and confidence in daily life.
- Does **house visits** in Innsbruck city, backed by senior-specific training (Seniorenvitalcoach, intensive course on dementia).

## Operating Context

- Practice: Therapiezentrum Anichstraße (TZA), Anichstraße 34, 6020 Innsbruck. Antonia works there self-employed since 2025; the TZA site (`tzaphysio.at`) and her `@tzaphysio.at` email are part of her setup.
- She is a **Wahltherapeutin** (non-contracted): a doctor's referral is required before therapy; the health insurer reimburses only part of the cost, the rest is self-paid or covered by supplementary/accident insurance. Some insurers require approval, especially for house visits, and a house visit must be explicitly noted on the referral to be reimbursed.
- Austrian market: German is the default language, English is offered via the DE/EN toggle. Legal pages (Impressum, Datenschutz) are German-only.

## Capabilities and Constraints

- Static site: plain HTML/CSS/JS, no framework, no build step, no dependencies; hosted on GitHub Pages at `physioantoniascheiber.at`. See `CLAUDE.md` for the full technical and design-token rules.
- Every visible text on `index.html` is bilingual via `data-de` / `data-en`.
- Privacy is a hard constraint (AT/DE legal climate): self-hosted fonts only; no third-party content on page view; Google Maps loads only after consent through the cookie banner; the contact form (Web3Forms) sends data only on submit and asks visitors not to send health data.
- Phone `0664 75081432`, address and email must stay identical across the visible contact section, the JSON-LD block and the Google Business Profile.
- No prices, insurer-specific amounts or insurer links are published (insurer links were removed deliberately). Do not add them.
- Not offered via the site: online booking, opening hours. Treat both as undecided/absent; do not invent them.

## Brand Commitments

- Name: **PhysioAntoniaScheiber.at** / "Physio Antonia Scheiber".
- Voice: personal first person ("Ich begleite Sie…"), formal "Sie" address in German, warm and plain; medical terms explained with everyday examples.
- Section headings name the city ("… in Innsbruck") for local SEO.
- No emoji anywhere.

## Evidence on Hand

- Photos: `img/hero1.jpg` (hero), `img/antonia.jpg` (portrait), `img/hausbesuche.jpg` (house visits), `img/og-preview.jpg` (social preview), `img/tza-logo.png` (practice logo).
- Real career and training list (see the "Über mich" section of `index.html`), including the ÖSV role.
- **Absent, must not be fabricated:** patient testimonials or reviews, star ratings, case studies, patient counts, prices, further photos.

## Product Principles

1. **One call away.** Every part of the page should make phoning Antonia the obvious, easy next step.
2. **Answer the worried visitor's questions in order:** does she treat my problem → does she come to me → what will insurance cover → how do I reach her.
3. **Credibility through facts, not claims.** The ÖSV role, education and training carry trust; no invented proof or superlatives.
4. **Legible for older readers and people in pain.** Clarity and calm over cleverness.
5. **Privacy by default.** Nothing leaves the visitor's browser without their action or consent.

## Accessibility & Inclusion

- WCAG AA contrast on all text (already enforced by the design tokens in `CLAUDE.md`).
- A primary audience is older and/or mobility-impaired: keep text comfortably large, tap targets generous, the phone number and call button easy to find and use on mobile, and motion gated by `prefers-reduced-motion`.
